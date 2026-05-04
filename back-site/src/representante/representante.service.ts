import { Injectable } from '@nestjs/common';
import { ErpConnectionService } from 'src/common/erp/erp-connection.service';
import { RepreResponseDto } from './dto/repre-response.dto';

@Injectable()
export class RepresentanteService {
  constructor(private readonly erpConnectionService: ErpConnectionService) {}

  private removeUfDoNome(nome: string): string {
    return nome
      .replace(
        /[\s\u00a0]*[\(\uff08]\s*(?:RP\s*(?:[-\u2010-\u2015/]\s*)?)?(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)\s*[\)\uff09][\s\u00a0]*$/i,
        '',
      )
      .trim();
  }

  async getRepresentantes(cidade: string): Promise<RepreResponseDto[]> {
    const representantes =
      await this.erpConnectionService.query<RepreResponseDto>(
        `
            SELECT DISTINCT
                CASE
                    WHEN SUBSTRING(RIGHT(TRIM(ca.NOMREP), 7), 1, 1) = '('
                    AND UPPER(SUBSTRING(RIGHT(TRIM(ca.NOMREP), 7), 2, 3)) = 'RP-'
                    AND SUBSTRING(RIGHT(TRIM(ca.NOMREP), 7), 7, 1) = ')'
                    AND UPPER(SUBSTRING(RIGHT(TRIM(ca.NOMREP), 7), 5, 2)) IN (
                        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
                        'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
                        'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
                    )
                    THEN TRIM(LEFT(TRIM(ca.NOMREP), CHAR_LENGTH(TRIM(ca.NOMREP)) - 7))
                    WHEN SUBSTRING(RIGHT(TRIM(ca.NOMREP), 4), 1, 1) = '('
                    AND SUBSTRING(RIGHT(TRIM(ca.NOMREP), 4), 4, 1) = ')'
                    AND UPPER(SUBSTRING(RIGHT(TRIM(ca.NOMREP), 4), 2, 2)) IN (
                        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
                        'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
                        'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
                    )
                    THEN TRIM(LEFT(TRIM(ca.NOMREP), CHAR_LENGTH(TRIM(ca.NOMREP)) - 4))
                    ELSE TRIM(ca.NOMREP)
                END AS name,
                ra.NOME_FORNECEDOR AS company,
                ra.TELEFONE_01 AS phone,
                ra.OPERADOR_EMAIL AS email
            FROM VW_CLIENTES_ATIVOS ca
            INNER JOIN VW_REPRESENTANTES_ATIVOS ra
                ON ra.NOME_OPERADOR = ca.NOMREP
            WHERE ca.CIDADE = ?
            AND ca.NOMREP NOT LIKE '%DESL%'
            AND ca.NOMREP NOT LIKE '%MAZA ( DIRETO )%';
        `,
        [cidade.trim()],
      );

    return representantes.map((representante) => ({
      ...representante,
      name: this.removeUfDoNome(representante.name),
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
