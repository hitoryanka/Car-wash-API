import {
  Injectable,
  Body,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartnerDto } from './partners/dtos/create-partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from './partners/models/partner.entity';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './users/dtos/CreateUser.dto';
import { User } from './users/models/user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnersRepository: Repository<Partner>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async signupPartner(@Body() createPartnerDto: CreatePartnerDto) {
    const existingPartner = await this.partnersRepository.findOne({
      where: {
        email: createPartnerDto.email,
      },
    });
    if (existingPartner)
      throw new BadRequestException('Partner with this email already exists');

    const result = await hashPassword(createPartnerDto);

    const newPartner = this.partnersRepository.create({
      ...createPartnerDto,
      password: result,
    });
    return this.partnersRepository.save(newPartner);
  }

  async signupUser(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (existingUser)
      throw new BadRequestException('User with this email already exists');

    const result = await hashPassword(createUserDto);

    const newPartner = this.partnersRepository.create({
      ...createUserDto,
      password: result,
    });
    return this.usersRepository.save(newPartner);
  }

  async signin(email: string, password: string, role: 'partner' | 'user') {
    let existingUserOrPartner;
    if (role === 'partner') {
      existingUserOrPartner = await this.partnersRepository.findOne({
        where: {
          email,
        },
      });
    } else if (role === 'user') {
      existingUserOrPartner = await this.usersRepository.findOne({
        where: {
          email,
        },
      });
    }

    if (!existingUserOrPartner)
      throw new NotFoundException(`${role} with such email not found`);

    const [storedHash, salt] = existingUserOrPartner.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('wrong password');

    return existingUserOrPartner;
  }
}

async function hashPassword(createPartnerDto: CreatePartnerDto) {
  const salt = randomBytes(8).toString('hex');
  // Hash the salt and password together
  const hash = (await scrypt(createPartnerDto.password, salt, 32)) as Buffer;
  // Add salt to a result
  const result = hash.toString('hex') + '.' + salt;
  return result;
}
