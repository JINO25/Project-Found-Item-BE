/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemTypeService } from './item-type.service';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Roles } from 'src/auth/enums/role.enum';

@Controller('item-types')
export class ItemTypeController {
  constructor(private readonly itemTypeService: ItemTypeService) {}

  @Post()
  @Auth([Roles.Admin])
  create(@Body() dto: CreateItemTypeDto) {
    return this.itemTypeService.create(dto);
  }

  @Get()
  findAll() {
    return this.itemTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemTypeService.findOne(+id);
  }

  @Auth([Roles.Admin])
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateItemTypeDto) {
    return this.itemTypeService.update(+id, dto);
  }

  @Auth([Roles.Admin])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemTypeService.remove(+id);
  }
}
