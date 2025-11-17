/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createItemTypeDto: CreateItemTypeDto) {
    const newType = await this.prisma.type.create({
      data: {
        name: createItemTypeDto.type,
      },
    });

    return newType;
  }

  async findAll() {
    return await this.prisma.type.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const type = await this.prisma.type.findUnique({
      where: { id },
    });

    if (!type) {
      throw new NotFoundException(`ItemType #${id} not found`);
    }

    return type;
  }

  async update(id: number, updateItemTypeDto: UpdateItemTypeDto) {
    await this.findOne(id);

    const updatedType = await this.prisma.type.update({
      where: { id },
      data: {
        name: updateItemTypeDto.type,
      },
    });

    return updatedType;
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.type.delete({
      where: { id },
    });

    return { message: `ItemType #${id} removed successfully` };
  }
}
