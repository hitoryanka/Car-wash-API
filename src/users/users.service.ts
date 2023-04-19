import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  createUser(userData: CreateUserDto) {
    const newUser = this.usersRepository.create(userData);
    return this.usersRepository.save(newUser);
  }

  getUser(id: number) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateUser(id: number, attrs: Partial<User>) {
    const user = await this.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.usersRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.getUser(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.usersRepository.remove(user);
  }
}
