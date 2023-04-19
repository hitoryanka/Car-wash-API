import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreatePartnerDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
