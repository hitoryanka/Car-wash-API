import { Module } from '@nestjs/common';
import { WashersService } from './washers.service';
import { WashersController } from './washers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Washer } from './models/washer.entity';
import { Partner } from 'src/partners/models/partner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Washer, Partner])],
  providers: [WashersService],
  controllers: [WashersController],
})
export class WashersModule {}
