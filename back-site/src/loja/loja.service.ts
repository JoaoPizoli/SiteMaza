import { Injectable, Logger } from '@nestjs/common';
import { GoogleGeocoderService } from 'src/common/maps/maps.service';
import { ErpConnectionService } from 'src/common/erp/erp-connection.service';
import { InjectRepository } from '@nestjs/typeorm';
import { LojaEntity } from './entities/loja.entity';
import { Repository } from 'typeorm';
import {
  GeocodePendingLojasResponseDto,
  LojaResponseDto,
  SyncLojasResponseDto,
} from './dto/loja-response.dto';

type ErpLojaRow = {
  codcli: string | null;
  nomcli: string | null;
  status: string | null;
  endere: string | null;
  bairro: string | null;
  cidade: string | null;
  uf: string | null;
  c_e_p_: string | null;
  email_: string | null;
  codrep: string | null;
  nomrep: string | null;
};

type NearbySearch = {
  lat: number;
  lng: number;
  limit?: number;
  raioKm?: number;
};

type BoundingBox = {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
};

const EARTH_RADIUS_KM = 6371;
const DEFAULT_NEARBY_LIMIT = 20;
const DEFAULT_LIST_LIMIT = 50;
const DEFAULT_GEOCODE_BATCH = 50;

@Injectable()
export class LojaService {
  private readonly logger = new Logger(LojaService.name);

  constructor(
    @InjectRepository(LojaEntity)
    private readonly lojaRepository: Repository<LojaEntity>,
    private readonly geocodeService: GoogleGeocoderService,
    private readonly erpService: ErpConnectionService,
  ) {}

  async syncFromErp(limit?: number): Promise<SyncLojasResponseDto> {
    const params: number[] = [];
    const limitSql = limit ? 'LIMIT ?' : '';

    if (limit) {
      params.push(limit);
    }

    const rows = await this.erpService.query<ErpLojaRow>(
      `
        SELECT
          TRIM(CODCLI) AS codcli,
          TRIM(NOMCLI) AS nomcli,
          TRIM(STATUS) AS status,
          TRIM(ENDERE) AS endere,
          TRIM(BAIRRO) AS bairro,
          TRIM(CIDADE) AS cidade,
          TRIM(UF) AS uf,
          TRIM(C_E_P_) AS c_e_p_,
          TRIM(EMAIL_) AS email_,
          TRIM(CODREP) AS codrep,
          TRIM(NOMREP) AS nomrep
        FROM VW_CLIENTES_ATIVOS
        WHERE STATUS = 'ATIVO'
          AND CODCLI IS NOT NULL
          AND TRIM(CODCLI) <> ''
        ORDER BY NOMCLI
        ${limitSql};
      `,
      params,
    );

    const existingStores = await this.lojaRepository.find({
      select: {
        id: true,
        codcli: true,
        latitude: true,
        longitude: true,
        geocodedAt: true,
        geocodeError: true,
      },
    });
    const existingByCode = new Map(
      existingStores.map((store) => [store.codcli, store]),
    );
    const seen = new Set<string>();
    const storesToSave: LojaEntity[] = [];
    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const row of rows) {
      const codcli = this.fit(this.clean(row.codcli), 8);

      if (!codcli || seen.has(codcli)) {
        skipped += 1;
        continue;
      }

      seen.add(codcli);
      const existing = existingByCode.get(codcli);

      if (existing) {
        updated += 1;
      } else {
        created += 1;
      }

      storesToSave.push(
        this.lojaRepository.create({
          ...(existing ? { id: existing.id } : {}),
          codcli,
          name: this.fit(this.clean(row.nomcli), 60) ?? codcli,
          status: this.fit(this.clean(row.status), 7),
          address: this.fit(this.clean(row.endere), 60),
          neighborhood: this.fit(this.clean(row.bairro), 60),
          city: this.fit(this.clean(row.cidade), 40),
          state: this.fit(this.clean(row.uf)?.toUpperCase() ?? null, 2),
          zipCode: this.fit(this.clean(row.c_e_p_), 9),
          email: this.fit(this.clean(row.email_), 255),
          representativeCode: this.fit(this.clean(row.codrep), 3),
          representativeName: this.fit(this.clean(row.nomrep), 30),
          latitude: existing?.latitude ?? null,
          longitude: existing?.longitude ?? null,
          geocodedAt: existing?.geocodedAt ?? null,
          geocodeError: existing?.geocodeError ?? null,
        }),
      );
    }

    await this.lojaRepository.save(storesToSave, { chunk: 500 });

    return {
      imported: storesToSave.length,
      created,
      updated,
      skipped,
    };
  }

  async geocodePending(
    limit = DEFAULT_GEOCODE_BATCH,
  ): Promise<GeocodePendingLojasResponseDto> {
    const stores = await this.lojaRepository
      .createQueryBuilder('loja')
      .where('(loja.latitude IS NULL OR loja.longitude IS NULL)')
      .andWhere('loja.geocodeError IS NULL')
      .andWhere("(loja.status IS NULL OR UPPER(TRIM(loja.status)) = 'ATIVO')")
      .orderBy('loja.id', 'ASC')
      .take(limit)
      .getMany();

    let geocoded = 0;
    let failed = 0;
    const errors: GeocodePendingLojasResponseDto['errors'] = [];

    for (const store of stores) {
      const address = this.buildGeocodeAddress(store);

      if (!address) {
        const message = 'Endereco insuficiente para geolocalizar';
        await this.saveGeocodeFailure(store, message);
        failed += 1;
        errors.push({ codcli: store.codcli, message });
        continue;
      }

      try {
        const coordinates =
          await this.geocodeService.getLatLongByAddress(address);

        store.latitude = coordinates.lat;
        store.longitude = coordinates.lng;
        store.geocodedAt = new Date();
        store.geocodeError = null;
        await this.lojaRepository.save(store);
        geocoded += 1;
      } catch (error: unknown) {
        const message = this.errorMessage(error);
        await this.saveGeocodeFailure(store, message);
        failed += 1;
        errors.push({ codcli: store.codcli, message });
        this.logger.warn(
          `Falha ao geolocalizar loja ${store.codcli}: ${message}`,
        );
      }
    }

    return {
      processed: stores.length,
      geocoded,
      failed,
      pending: await this.countGeocodePending(),
      errors,
    };
  }

  async findAll(
    limit = DEFAULT_LIST_LIMIT,
    offset = 0,
    onlyGeocoded = true,
  ): Promise<LojaResponseDto[]> {
    const query = this.lojaRepository
      .createQueryBuilder('loja')
      .where("(loja.status IS NULL OR UPPER(TRIM(loja.status)) = 'ATIVO')")
      .orderBy('loja.name', 'ASC')
      .skip(offset)
      .take(limit);

    if (onlyGeocoded) {
      query
        .andWhere('loja.latitude IS NOT NULL')
        .andWhere('loja.longitude IS NOT NULL');
    }

    const stores = await query.getMany();

    return stores
      .filter((store) => this.hasCoordinates(store))
      .map((store) => this.toResponse(store));
  }

  async findNearby(search: NearbySearch): Promise<LojaResponseDto[]> {
    const limit = search.limit ?? DEFAULT_NEARBY_LIMIT;
    const candidates = await this.findNearbyCandidates(search);

    return candidates
      .map((store) => ({
        store,
        distanceKm: this.calculateDistanceKm(
          { lat: search.lat, lng: search.lng },
          { lat: store.latitude ?? 0, lng: store.longitude ?? 0 },
        ),
      }))
      .filter(({ distanceKm }) => !search.raioKm || distanceKm <= search.raioKm)
      .sort((left, right) => left.distanceKm - right.distanceKm)
      .slice(0, limit)
      .map(({ store, distanceKm }) =>
        this.toResponse(store, this.roundDistance(distanceKm)),
      );
  }

  private async findNearbyCandidates(search: NearbySearch) {
    const query = this.lojaRepository
      .createQueryBuilder('loja')
      .where('loja.latitude IS NOT NULL')
      .andWhere('loja.longitude IS NOT NULL')
      .andWhere("(loja.status IS NULL OR UPPER(TRIM(loja.status)) = 'ATIVO')");

    if (search.raioKm) {
      const box = this.getBoundingBox(search.lat, search.lng, search.raioKm);

      query
        .andWhere('loja.latitude BETWEEN :minLat AND :maxLat', {
          minLat: box.minLat,
          maxLat: box.maxLat,
        })
        .andWhere('loja.longitude BETWEEN :minLng AND :maxLng', {
          minLng: box.minLng,
          maxLng: box.maxLng,
        });
    }

    return query.getMany();
  }

  private async countGeocodePending() {
    return this.lojaRepository
      .createQueryBuilder('loja')
      .where('(loja.latitude IS NULL OR loja.longitude IS NULL)')
      .andWhere('loja.geocodeError IS NULL')
      .andWhere("(loja.status IS NULL OR UPPER(TRIM(loja.status)) = 'ATIVO')")
      .getCount();
  }

  private async saveGeocodeFailure(store: LojaEntity, message: string) {
    store.geocodeError = this.fit(message, 255);
    await this.lojaRepository.save(store);
  }

  private toResponse(store: LojaEntity, distanceKm?: number): LojaResponseDto {
    return {
      id: store.codcli,
      codcli: store.codcli,
      name: store.name,
      address: store.address ?? '',
      neighborhood: store.neighborhood ?? '',
      city: store.city ?? '',
      state: store.state ?? '',
      zipCode: store.zipCode ?? '',
      email: store.email ?? '',
      representativeCode: store.representativeCode ?? '',
      representativeName: store.representativeName ?? '',
      coordinates: {
        lat: store.latitude ?? 0,
        lng: store.longitude ?? 0,
      },
      ...(distanceKm !== undefined ? { distanceKm } : {}),
    };
  }

  private hasCoordinates(store: LojaEntity) {
    return (
      typeof store.latitude === 'number' &&
      Number.isFinite(store.latitude) &&
      typeof store.longitude === 'number' &&
      Number.isFinite(store.longitude)
    );
  }

  private buildGeocodeAddress(store: LojaEntity) {
    return [
      store.address,
      store.neighborhood,
      store.city,
      store.state,
      store.zipCode,
      'Brasil',
    ]
      .map((part) => part?.trim())
      .filter(Boolean)
      .join(', ');
  }

  private getBoundingBox(
    lat: number,
    lng: number,
    radiusKm: number,
  ): BoundingBox {
    const latDelta = radiusKm / 111.32;
    const lngDelta =
      radiusKm / (111.32 * Math.max(Math.cos(this.toRadians(lat)), 0.01));

    return {
      minLat: Math.max(lat - latDelta, -90),
      maxLat: Math.min(lat + latDelta, 90),
      minLng: Math.max(lng - lngDelta, -180),
      maxLng: Math.min(lng + lngDelta, 180),
    };
  }

  private calculateDistanceKm(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
  ) {
    const latDistance = this.toRadians(destination.lat - origin.lat);
    const lngDistance = this.toRadians(destination.lng - origin.lng);
    const originLat = this.toRadians(origin.lat);
    const destinationLat = this.toRadians(destination.lat);

    const a =
      Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
      Math.cos(originLat) *
        Math.cos(destinationLat) *
        Math.sin(lngDistance / 2) *
        Math.sin(lngDistance / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS_KM * c;
  }

  private roundDistance(distanceKm: number) {
    return Number(distanceKm.toFixed(distanceKm < 10 ? 2 : 1));
  }

  private toRadians(value: number) {
    return (value * Math.PI) / 180;
  }

  private clean(value: unknown) {
    if (value === null || value === undefined) {
      return null;
    }

    if (
      typeof value !== 'string' &&
      typeof value !== 'number' &&
      typeof value !== 'boolean'
    ) {
      return null;
    }

    const cleaned = `${value}`.trim();
    return cleaned.length > 0 ? cleaned : null;
  }

  private fit(value: string | null, max: number) {
    return value ? value.slice(0, max) : null;
  }

  private errorMessage(error: unknown) {
    return error instanceof Error ? error.message : 'Erro desconhecido';
  }
}
