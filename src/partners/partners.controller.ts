import {
  Controller,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreatePartnerDto } from './dtos/create-partner.dto';
import { PartnersService } from './partners.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Get()
  findAll() {
    return 'returns all partners';
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.partnersService.findOne(id);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: number,
    @Body() updatePartnerDto: Partial<CreatePartnerDto>,
  ) {
    return this.partnersService.update(id, updatePartnerDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.partnersService.remove(id);
  }
}
