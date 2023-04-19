import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './models/partner.entity';
import { Washer } from '../washers/models/washer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Partner, Washer])],
  providers: [PartnersService],
  controllers: [PartnersController],
})
export class PartnersModule {}
