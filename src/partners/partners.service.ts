import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dtos/create-partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from './models/partner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnersRepository: Repository<Partner>,
  ) {}

  findAll() {
    return this.partnersRepository.find();
  }

  async findOne(id: number) {
    const existingPartner = await this.partnersRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingPartner) throw new NotFoundException();

    return existingPartner;
  }

  async remove(id: number) {
    const existingPartner = await this.partnersRepository.findOne({
      where: {
        id,
      },
    });
    return this.partnersRepository.remove(existingPartner);
  }

  async update(id: number, updatePartnerDto: Partial<CreatePartnerDto>) {
    const existingPartner = await this.partnersRepository.findOne({
      where: {
        id,
      },
    });
    if (!existingPartner) throw new NotFoundException();

    const updatedPartner = {
      ...existingPartner,
      ...updatePartnerDto,
    };

    return this.partnersRepository.save(updatedPartner);
  }

  create(createPartnerDto: CreatePartnerDto) {
    const partner = this.partnersRepository.create(createPartnerDto);
    return this.partnersRepository.save(partner);
  }
}
