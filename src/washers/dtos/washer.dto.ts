import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Partner } from 'src/partners/models/partner.entity';

export class WasherDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features: string[];

  @IsObject()
  owner: Partner;

  @IsOptional()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  working_hours: string;

  @IsOptional()
  @IsString()
  working_days: string;
}
