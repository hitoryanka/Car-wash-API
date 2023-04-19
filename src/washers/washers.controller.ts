import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

@Controller('washers')
export class WashersController {
  @Get()
  findAll() {
    return 'returns all washers';
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return `return washer with id: ${id}`;
  }

  @Post(':id')
  create(@Param('id') id: number, @Body() body: any) {
    console.log(body);
    return `create washer with id: ${id}`;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    console.log(body);
    return `updates washer with id: ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return `deletes washer with id: ${id}`;
  }
}

// TODO partner provides washer_id on registration
// TODO if id to connect partner to a washer was not provided - create new washer
