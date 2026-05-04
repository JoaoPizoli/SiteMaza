import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { RepresentanteService } from './representante.service';
import { RepreResponseDto } from './dto/repre-response.dto';
import { CidadeResponseDto } from './dto/cidade-response.dto';

@Controller('representante')
export class RepresentanteController {
  constructor(private readonly representanteService: RepresentanteService) {}

  @Get()
  async getRepresentante(
    @Query('cidade') cidade: string,
  ): Promise<RepreResponseDto[]> {
    if (!cidade?.trim()) {
      throw new BadRequestException('Informe a cidade');
    }

    const repre = await this.representanteService.getRepresentantes(cidade);
    if (!repre.length) {
      throw new NotFoundException('Erro ao encontrar Representantes');
    }
    return repre;
  }

  @Get('cidades')
  async getCidades(@Query('uf') uf: string): Promise<CidadeResponseDto[]> {
    if (!uf?.trim()) {
      throw new BadRequestException('Informe a UF');
    }

    const cidades = await this.representanteService.getCidades(uf);
    if (!cidades.length) {
      throw new NotFoundException('Erro ao encontrar Cidades');
    }
    return cidades;
  }
}
