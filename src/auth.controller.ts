import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Param,
  BadRequestException,
  Session,
  Get,
} from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { AuthService } from './auth.service';
import { CreatePartnerDto } from './partners/dtos/create-partner.dto';
import { CreateUserDto } from './users/dtos/CreateUser.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup/partner')
  async signupPartner(
    @Body() createPartnerDto: CreatePartnerDto,
    @Session() session: any,
  ) {
    const user = await this.authService.signupPartner(createPartnerDto);
    session.id = user.id;
    session.role = 'partner';

    return user;
  }

  @Post('signup/user')
  async signupUser(
    @Body() createUserDto: CreateUserDto,
    @Session() session: any,
  ) {
    const user = await this.authService.signupUser(createUserDto);
    session.id = user.id;
    session.role = 'user';

    return user;
  }

  @Post('signin/:role')
  async signin(
    @Param('role') role: 'user' | 'partner',
    @Body() body: any,
    @Session() session: any,
  ) {
    if (body.email === undefined || body.password === undefined)
      throw new BadRequestException(
        'not all required fields provided (email, password)',
      );
    const user = await this.authService.signin(body.email, body.password, role);
    session.id = user.id;
    session.role = role;

    return user;
  }

  @Get('current_user')
  currentUser(@Session() session: any) {
    return this.authService.currentUser(session.id, session.role);
  }

  @Post('signout')
  signout(@Session() session: any) {
    session.id = null;
    session.role = null;
  }
}
