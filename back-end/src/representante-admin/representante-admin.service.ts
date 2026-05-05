import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { RepresentanteCidadeEntity } from './entities/representante-cidade.entity';
import { ErpConnectionService } from '../common/erp/erp-connection.service';
import {
  CreateRepresentanteCidadeDto,
  UpdateRepresentanteCidadeDto,
} from './dto/representante-cidade.dto';

const BRAZIL_UFS = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

type ErpRepresentanteRow = {
  nome?: string | null;
  empresa?: string | null;
  telefone?: string | null;
  email?: string | null;
};

type ErpRepresentanteOption = {
  nome: string;
  empresa: string;
  telefone: string;
  email: string;
  adicionado?: boolean;
};

@Injectable()
export class RepresentanteAdminService {
  private readonly logger = new Logger(RepresentanteAdminService.name);

  constructor(
    @InjectRepository(RepresentanteCidadeEntity)
    private readonly repository: Repository<RepresentanteCidadeEntity>,
    private readonly erpConnectionService: ErpConnectionService,
  ) {}

  async list(filter: { uf?: string; search?: string } = {}) {
    const where: Record<string, unknown> = {};
    if (filter.uf) {
      where.uf = filter.uf.toUpperCase();
    }
    if (filter.search) {
      const term = `%${filter.search}%`;
      const rows = await this.repository.find({
        where: [
          { ...where, cidade: ILike(term) },
          { ...where, nome: ILike(term) },
          { ...where, empresa: ILike(term) },
        ],
        order: { uf: 'ASC', cidade: 'ASC', nome: 'ASC' },
      });
      return rows;
    }
    return this.repository.find({
      where,
      order: { uf: 'ASC', cidade: 'ASC', nome: 'ASC' },
    });
  }

  async listErpCities(uf: string) {
    const rows = await this.erpConnectionService.query<{ cidade: string }>(
      `
        SELECT DISTINCT TRIM(CIDADE) AS cidade
        FROM VW_CLIENTES_ATIVOS
        WHERE UF = ?
          AND STATUS = 'ATIVO'
          AND CIDADE IS NOT NULL
          AND TRIM(CIDADE) <> ''
        ORDER BY cidade ASC;
      `,
      [uf.trim().toUpperCase()],
    );

    return rows
      .map((row) => row.cidade?.trim())
      .filter((cidade): cidade is string => Boolean(cidade));
  }

  async listErpRepresentantes(uf: string, cidade: string) {
    const normalizedUf = uf.trim().toUpperCase();
    const normalizedCidade = cidade.trim();
    const [representantes, adicionados] = await Promise.all([
      this.fetchAllRepresentantesFromErp(),
      this.repository.find({
        where: {
          uf: normalizedUf,
          cidade: ILike(normalizedCidade),
        },
        select: { nome: true },
      }),
    ]);

    const nomesAdicionados = new Set(
      adicionados.map((item) => this.normalizeRepresentativeName(item.nome)),
    );

    return representantes.map((representante) => ({
      ...representante,
      adicionado: nomesAdicionados.has(
        this.normalizeRepresentativeName(representante.nome),
      ),
    }));
  }

  async findById(id: number) {
    const row = await this.repository.findOne({ where: { id } });
    if (!row) {
      throw new NotFoundException('Representante nao encontrado');
    }
    return row;
  }

  async findByCity(cidade: string) {
    return this.repository.find({
      where: { cidade: ILike(cidade.trim()) },
      order: { nome: 'ASC' },
    });
  }

  async create(dto: CreateRepresentanteCidadeDto) {
    await this.ensureRepresentativeIsAvailableForCity(
      dto.uf,
      dto.cidade,
      dto.nome,
    );

    const entity = this.repository.create({
      uf: dto.uf.toUpperCase(),
      cidade: dto.cidade,
      nome: dto.nome,
      empresa: dto.empresa ?? null,
      telefone: dto.telefone ?? null,
      email: dto.email ?? null,
    });
    return this.repository.save(entity);
  }

  async update(id: number, dto: UpdateRepresentanteCidadeDto) {
    const row = await this.findById(id);
    const nextUf = dto.uf?.toUpperCase() ?? row.uf;
    const nextCidade = dto.cidade ?? row.cidade;
    const nextNome = dto.nome ?? row.nome;

    await this.ensureRepresentativeIsAvailableForCity(
      nextUf,
      nextCidade,
      nextNome,
      id,
    );

    if (dto.uf !== undefined) row.uf = dto.uf.toUpperCase();
    if (dto.cidade !== undefined) row.cidade = dto.cidade;
    if (dto.nome !== undefined) row.nome = dto.nome;
    if (dto.empresa !== undefined) row.empresa = dto.empresa || null;
    if (dto.telefone !== undefined) row.telefone = dto.telefone || null;
    if (dto.email !== undefined) row.email = dto.email || null;

    return this.repository.save(row);
  }

  async delete(id: number) {
    const row = await this.findById(id);
    await this.repository.remove(row);
    return { id };
  }

  async syncFromErp(): Promise<{
    processed: number;
    created: number;
    updated: number;
    skipped: number;
    failedCities: Array<{ uf: string; cidade: string; error: string }>;
  }> {
    let created = 0;
    let updated = 0;
    let skipped = 0;
    let processed = 0;
    const failedCities: Array<{ uf: string; cidade: string; error: string }> =
      [];

    for (const uf of BRAZIL_UFS) {
      let cidades: string[] = [];
      try {
        cidades = await this.listErpCities(uf);
      } catch (error) {
        this.logger.warn(
          `Falha ao listar cidades da UF ${uf}: ${this.errorMessage(error)}`,
        );
        continue;
      }

      for (const cidade of cidades) {
        processed += 1;
        try {
          const erpReps = await this.fetchRepresentantesByCityFromErp(
            uf,
            cidade,
          );
          if (!erpReps.length) {
            skipped += 1;
            continue;
          }

          for (const erpRep of erpReps) {
            const existing = await this.repository.findOne({
              where: { uf, cidade, nome: ILike(erpRep.nome) },
            });

            if (existing) {
              existing.empresa = erpRep.empresa || existing.empresa;
              existing.telefone = erpRep.telefone || existing.telefone;
              existing.email = erpRep.email || existing.email;
              await this.repository.save(existing);
              updated += 1;
            } else {
              await this.repository.save(
                this.repository.create({
                  uf,
                  cidade,
                  nome: erpRep.nome,
                  empresa: erpRep.empresa || null,
                  telefone: erpRep.telefone || null,
                  email: erpRep.email || null,
                }),
              );
              created += 1;
            }
          }
        } catch (error) {
          failedCities.push({
            uf,
            cidade,
            error: this.errorMessage(error),
          });
        }
      }
    }

    this.logger.log(
      `Sync ERP: processed=${processed} created=${created} updated=${updated} skipped=${skipped} failed=${failedCities.length}`,
    );

    return { processed, created, updated, skipped, failedCities };
  }

  private async fetchRepresentantesByCityFromErp(
    uf: string,
    cidade: string,
  ): Promise<ErpRepresentanteOption[]> {
    const rows = await this.erpConnectionService.query<ErpRepresentanteRow>(
      `
        SELECT
          CASE
            WHEN SUBSTRING(RIGHT(TRIM(rep.NOMREP), 7), 1, 1) = '('
              AND UPPER(SUBSTRING(RIGHT(TRIM(rep.NOMREP), 7), 2, 3)) = 'RP-'
              AND SUBSTRING(RIGHT(TRIM(rep.NOMREP), 7), 7, 1) = ')'
              AND UPPER(SUBSTRING(RIGHT(TRIM(rep.NOMREP), 7), 5, 2)) IN (
                'AC','AL','AP','AM','BA','CE','DF','ES','GO',
                'MA','MT','MS','MG','PA','PB','PR','PE','PI',
                'RJ','RN','RS','RO','RR','SC','SP','SE','TO'
              )
            THEN TRIM(LEFT(TRIM(rep.NOMREP), CHAR_LENGTH(TRIM(rep.NOMREP)) - 7))
            WHEN SUBSTRING(RIGHT(TRIM(rep.NOMREP), 4), 1, 1) = '('
              AND SUBSTRING(RIGHT(TRIM(rep.NOMREP), 4), 4, 1) = ')'
              AND UPPER(SUBSTRING(RIGHT(TRIM(rep.NOMREP), 4), 2, 2)) IN (
                'AC','AL','AP','AM','BA','CE','DF','ES','GO',
                'MA','MT','MS','MG','PA','PB','PR','PE','PI',
                'RJ','RN','RS','RO','RR','SC','SP','SE','TO'
              )
            THEN TRIM(LEFT(TRIM(rep.NOMREP), CHAR_LENGTH(TRIM(rep.NOMREP)) - 4))
            ELSE TRIM(rep.NOMREP)
          END AS nome,
          ra.NOME_FORNECEDOR AS empresa,
          ra.TELEFONE_01 AS telefone,
          ra.OPERADOR_EMAIL AS email
        FROM (
          SELECT ca.NOMREP, COUNT(DISTINCT ca.CODCLI) AS client_count
          FROM VW_CLIENTES_ATIVOS ca
          WHERE ca.UF = ?
            AND ca.CIDADE = ?
            AND ca.STATUS = 'ATIVO'
            AND ca.NOMREP IS NOT NULL
            AND TRIM(ca.NOMREP) <> ''
            AND ca.NOMREP NOT LIKE '%DESL%'
            AND ca.NOMREP NOT LIKE '%MAZA ( DIRETO )%'
          GROUP BY ca.NOMREP
        ) rep
        INNER JOIN VW_REPRESENTANTES_ATIVOS ra
          ON ra.NOME_OPERADOR = rep.NOMREP
        ORDER BY nome ASC, rep.client_count DESC;
      `,
      [uf.trim().toUpperCase(), cidade.trim()],
    );

    const seen = new Set<string>();
    return rows
      .map((row) => ({
        nome: row.nome?.trim() ?? '',
        empresa: row.empresa?.trim() ?? '',
        telefone: row.telefone?.trim() ?? '',
        email: row.email?.trim() ?? '',
      }))
      .filter((row) => {
        if (!row.nome) return false;
        const key = `${row.nome}|${row.empresa}|${row.telefone}|${row.email}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  private async fetchAllRepresentantesFromErp(): Promise<
    ErpRepresentanteOption[]
  > {
    const rows = await this.erpConnectionService.query<ErpRepresentanteRow>(
      `
        SELECT
          CASE
            WHEN SUBSTRING(RIGHT(TRIM(ra.NOME_OPERADOR), 7), 1, 1) = '('
              AND UPPER(SUBSTRING(RIGHT(TRIM(ra.NOME_OPERADOR), 7), 2, 3)) = 'RP-'
              AND SUBSTRING(RIGHT(TRIM(ra.NOME_OPERADOR), 7), 7, 1) = ')'
              AND UPPER(SUBSTRING(RIGHT(TRIM(ra.NOME_OPERADOR), 7), 5, 2)) IN (
                'AC','AL','AP','AM','BA','CE','DF','ES','GO',
                'MA','MT','MS','MG','PA','PB','PR','PE','PI',
                'RJ','RN','RS','RO','RR','SC','SP','SE','TO'
              )
            THEN TRIM(LEFT(TRIM(ra.NOME_OPERADOR), CHAR_LENGTH(TRIM(ra.NOME_OPERADOR)) - 7))
            WHEN SUBSTRING(RIGHT(TRIM(ra.NOME_OPERADOR), 4), 1, 1) = '('
              AND SUBSTRING(RIGHT(TRIM(ra.NOME_OPERADOR), 4), 4, 1) = ')'
              AND UPPER(SUBSTRING(RIGHT(TRIM(ra.NOME_OPERADOR), 4), 2, 2)) IN (
                'AC','AL','AP','AM','BA','CE','DF','ES','GO',
                'MA','MT','MS','MG','PA','PB','PR','PE','PI',
                'RJ','RN','RS','RO','RR','SC','SP','SE','TO'
              )
            THEN TRIM(LEFT(TRIM(ra.NOME_OPERADOR), CHAR_LENGTH(TRIM(ra.NOME_OPERADOR)) - 4))
            ELSE TRIM(ra.NOME_OPERADOR)
          END AS nome,
          ra.NOME_FORNECEDOR AS empresa,
          ra.TELEFONE_01 AS telefone,
          ra.OPERADOR_EMAIL AS email
        FROM VW_REPRESENTANTES_ATIVOS ra
        WHERE ra.NOME_OPERADOR IS NOT NULL
          AND TRIM(ra.NOME_OPERADOR) <> ''
          AND ra.NOME_OPERADOR NOT LIKE '%DESL%'
          AND ra.NOME_OPERADOR NOT LIKE '%MAZA ( DIRETO )%'
        ORDER BY nome ASC;
      `,
    );

    return this.normalizeErpRepresentantes(rows);
  }

  private normalizeErpRepresentantes(rows: ErpRepresentanteRow[]) {
    const seen = new Set<string>();
    return rows
      .map((row) => ({
        nome: row.nome?.trim() ?? '',
        empresa: row.empresa?.trim() ?? '',
        telefone: row.telefone?.trim() ?? '',
        email: row.email?.trim() ?? '',
      }))
      .filter((row) => {
        if (!row.nome) return false;
        const key = this.normalizeRepresentativeName(row.nome);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  private async ensureRepresentativeIsAvailableForCity(
    uf: string,
    cidade: string,
    nome: string,
    ignoredId?: number,
  ) {
    const existing = await this.repository.findOne({
      where: {
        uf: uf.trim().toUpperCase(),
        cidade: ILike(cidade.trim()),
        nome: ILike(nome.trim()),
      },
    });

    if (existing && existing.id !== ignoredId) {
      throw new ConflictException(
        'Este representante ja esta cadastrado para essa cidade',
      );
    }
  }

  private normalizeRepresentativeName(nome: string) {
    return nome.trim().toLocaleLowerCase('pt-BR');
  }

  private errorMessage(error: unknown) {
    return error instanceof Error ? error.message : 'Erro desconhecido';
  }
}
