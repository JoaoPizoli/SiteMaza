import { Controller, Get, Post, Query } from '@nestjs/common';
import { LojaService } from './loja.service';
import {
  GeocodePendingLojasQueryDto,
  ListLojasQueryDto,
  NearbyLojasQueryDto,
  SyncLojasQueryDto,
} from './dto/loja-query.dto';
import {
  GeocodePendingLojasResponseDto,
  LojaResponseDto,
  SyncLojasResponseDto,
} from './dto/loja-response.dto';

@Controller('loja')
export class LojaController {
  constructor(private readonly lojaService: LojaService) {}

  @Get()
  async getLojas(
    @Query() query: ListLojasQueryDto,
  ): Promise<LojaResponseDto[]> {
    return this.lojaService.findAll(
      query.limit,
      query.offset,
      query.apenasGeolocalizadas,
    );
  }

  @Get('proximas')
  async getLojasProximas(
    @Query() query: NearbyLojasQueryDto,
  ): Promise<LojaResponseDto[]> {
    return this.lojaService.findNearby(query);
  }

  @Post('sincronizar')
  async sincronizar(
    @Query() query: SyncLojasQueryDto,
  ): Promise<SyncLojasResponseDto> {
    return this.lojaService.syncFromErp(query.limit);
  }

  @Post('geolocalizar-pendentes')
  async geolocalizarPendentes(
    @Query() query: GeocodePendingLojasQueryDto,
  ): Promise<GeocodePendingLojasResponseDto> {
    return this.lojaService.geocodePending(query.limit);
  }
}
