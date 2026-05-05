import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RepresentanteAdminService } from './representante-admin.service';
import {
  CreateRepresentanteCidadeDto,
  UpdateRepresentanteCidadeDto,
} from './dto/representante-cidade.dto';
import { ListRepresentantesAdminQueryDto } from './dto/list-representantes.query.dto';
import {
  ErpCitiesQueryDto,
  ErpRepresentantesQueryDto,
} from './dto/erp-options.query.dto';

@Controller('representante-admin')
@UseGuards(JwtAuthGuard)
export class RepresentanteAdminController {
  constructor(
    private readonly representanteAdminService: RepresentanteAdminService,
  ) {}

  @Get()
  list(@Query() query: ListRepresentantesAdminQueryDto) {
    return this.representanteAdminService.list(query);
  }

  @Get('opcoes/cidades')
  listErpCities(@Query() query: ErpCitiesQueryDto) {
    return this.representanteAdminService.listErpCities(query.uf);
  }

  @Get('opcoes/representantes')
  listErpRepresentantes(@Query() query: ErpRepresentantesQueryDto) {
    return this.representanteAdminService.listErpRepresentantes(
      query.uf,
      query.cidade,
    );
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.representanteAdminService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateRepresentanteCidadeDto) {
    return this.representanteAdminService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRepresentanteCidadeDto,
  ) {
    return this.representanteAdminService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.representanteAdminService.delete(id);
  }

  @Post('sincronizar')
  @HttpCode(HttpStatus.OK)
  sync() {
    return this.representanteAdminService.syncFromErp();
  }
}
