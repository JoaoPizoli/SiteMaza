import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { ErpConnectionService } from 'src/common/erp/erp-connection.service';
import { RepreResponseDto } from './dto/repre-response.dto';
import { RepresentanteCidadeEntity } from '../representante-admin/entities/representante-cidade.entity';

@Injectable()
export class RepresentanteService {
  constructor(
    private readonly erpConnectionService: ErpConnectionService,
    @InjectRepository(RepresentanteCidadeEntity)
    private readonly repCidadeRepository: Repository<RepresentanteCidadeEntity>,
  ) {}

  async getRepresentantes(cidade: string): Promise<RepreResponseDto[]> {
    const rows = await this.repCidadeRepository.find({
      where: { cidade: ILike(cidade.trim()) },
      order: { nome: 'ASC' },
    });

    return rows.map((row) => ({
      name: row.nome,
      company: row.empresa ?? '',
      phone: row.telefone ?? '',
      email: row.email ?? '',
    }));
  }

  async getCidades(uf: string) {
    return await this.erpConnectionService.query(
      `
            SELECT DISTINCT CIDADE AS cidade
            FROM VW_CLIENTES_ATIVOS
            WHERE UF = ?
            AND STATUS = 'ATIVO';
        `,
      [uf.trim().toUpperCase()],
    );
  }
}
