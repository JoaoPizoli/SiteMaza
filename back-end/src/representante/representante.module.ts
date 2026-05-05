import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepresentanteService } from './representante.service';
import { ErpModule } from 'src/common/erp/erp.module';
import { RepresentanteController } from './representante.controller';
import { RepresentanteCidadeEntity } from '../representante-admin/entities/representante-cidade.entity';

@Module({
  imports: [
    ErpModule,
    TypeOrmModule.forFeature([RepresentanteCidadeEntity]),
  ],
  providers: [RepresentanteService],
  controllers: [RepresentanteController],
})
export class RepresentanteModule {}
