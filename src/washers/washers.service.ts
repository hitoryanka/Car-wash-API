import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Washer } from './models/washer.entity';
import { CreateWasherDto } from './dtos/create-washer.dto';

@Injectable()
export class WashersService {
  constructor(
    @InjectRepository(Washer)
    private washerRepository: Repository<Washer>,
  ) {}

  findAll() {
    return this.washerRepository.find();
  }

  async findOne(id: number) {
    const existingWasher = await this.washerRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingWasher)
      throw new NotFoundException("washer with provided id wasn't found");

    return existingWasher;
  }

  async update(id: number, updateWasherDto: Partial<CreateWasherDto>) {
    const existingWasher = await this.washerRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingWasher)
      throw new NotFoundException("washer with provided id wasn't found");

    return this.washerRepository.save({
      ...existingWasher,
      ...updateWasherDto,
    });
  }

  async create(name: string, owner_id: number) {
    const existingPartner = await this.washerRepository.findOne({
      where: {
        id: owner_id,
      },
    });

    if (!existingPartner)
      throw new NotFoundException('partner with provided id was not found');

    const newWasher = this.washerRepository.create({
      name,
      owner: existingPartner,
    });
    return this.washerRepository.save(newWasher);
  }

  async remove(id: number) {
    const existingWasher = await this.washerRepository.findOne({
      where: {
        id,
      },
    });

    return this.washerRepository.remove(existingWasher);
  }
}
