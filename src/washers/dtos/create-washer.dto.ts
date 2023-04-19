import { IsString, IsNumber } from 'class-validator';
import { Partner } from 'src/partners/models/partner.entity';

export class CreateWasherDto {
  @IsString()
  name: string;

  @IsNumber()
  ownerId: number;
}
