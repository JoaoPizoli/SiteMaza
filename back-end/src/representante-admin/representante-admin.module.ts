import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepresentanteCidadeEntity } from './entities/representante-cidade.entity';
import { RepresentanteAdminService } from './representante-admin.service';
import { RepresentanteAdminController } from './representante-admin.controller';
import { ErpModule } from '../common/erp/erp.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RepresentanteCidadeEntity]),
    ErpModule,
    AuthModule,
  ],
  providers: [RepresentanteAdminService],
  controllers: [RepresentanteAdminController],
  exports: [RepresentanteAdminService, TypeOrmModule],
})
export class RepresentanteAdminModule {}
