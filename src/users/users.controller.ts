import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
@UsePipes(ValidationPipe)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }

  @Post('create')
  createUser(@Body() userData: CreateUserDto) {
    return this.usersService.createUser(userData);
  }

  @Patch('update/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: Partial<CreateUserDto>,
  ) {
    return this.usersService.updateUser(id, userData);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
