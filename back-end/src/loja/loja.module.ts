import { Module } from '@nestjs/common';
import { LojaService } from './loja.service';
import { LojaController } from './loja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LojaEntity } from './entities/loja.entity';
import { MapsModule } from 'src/common/maps/maps.module';
import { ErpModule } from 'src/common/erp/erp.module';

@Module({
  imports: [TypeOrmModule.forFeature([LojaEntity]), MapsModule, ErpModule],
  providers: [LojaService],
  controllers: [LojaController],
})
export class LojaModule {}
