import { Controller, Post, Body, UseInterceptors, Param } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { AuthService } from './auth.service';
import { CreatePartnerDto } from './partners/dtos/create-partner.dto';
import { CreateUserDto } from './users/dtos/CreateUser.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup/partner')
  signupPartner(@Body() createPartnerDto: CreatePartnerDto) {
    return this.authService.signupPartner(createPartnerDto);
  }

  @Post('signup/user')
  signupUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.signupUser(createUserDto);
  }

  @Post('signin/:role')
  signin(
    @Param('role') role: 'user' | 'partner',
    @Body() { email, password }: { email: string; password: string },
  ) {
    return this.authService.signin(email, password, role);
  }
}

// TODO when not all fields provided app crashes with 500
