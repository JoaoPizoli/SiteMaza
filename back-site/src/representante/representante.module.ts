import { Module } from '@nestjs/common';
import { RepresentanteService } from './representante.service';
import { ErpModule } from 'src/common/erp/erp.module';
import { RepresentanteController } from './representante.controller';

@Module({
  imports: [ErpModule],
  providers: [RepresentanteService],
  controllers: [RepresentanteController]
})
export class RepresentanteModule {}
