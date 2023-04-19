import {
  IsEmail,
  IsStrongPassword,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export class UserDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
