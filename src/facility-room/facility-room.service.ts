/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFacilityDto } from './dto/req/create-facility.dto';
import { FacilityResponseDto } from './dto/res/facility-response.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateFacilityDto } from './dto/req/update-facility.dto';
import { RoomResponseDto } from './dto/res/room-response.dto';
import { CreateRoomDto } from './dto/req/create-room.dto';
import { UpdateRoomDto } from './dto/req/update-room.dto';

@Injectable()
export class FacilityRoomService {
  constructor(private readonly prisma: PrismaService) {}

  async createFacility(dto: CreateFacilityDto): Promise<FacilityResponseDto> {
    const facility = await this.prisma.facility.create({
      data: { name: dto.name },
      include: { room: true },
    });

    return plainToInstance(FacilityResponseDto, facility, {
      excludeExtraneousValues: true,
    });
  }

  async findAllFacilities(): Promise<FacilityResponseDto[]> {
    const facilities = await this.prisma.facility.findMany({
      include: { room: true },
      orderBy: { id: 'asc' },
    });

    const formatted = facilities.map((f) => ({
      ...f,
      room: f.room.map((r) => ({
        ...r,
        latitude: r.latitude ? Number(r.latitude) : null,
        longitude: r.longitude ? Number(r.longitude) : null,
      })),
    }));

    return plainToInstance(FacilityResponseDto, formatted, {
      excludeExtraneousValues: true,
    });
  }

  async findFacilityById(id: number): Promise<FacilityResponseDto> {
    const facility = await this.prisma.facility.findUnique({
      where: { id },
      include: { room: true },
    });
    if (!facility)
      throw new NotFoundException(`Facility with ID ${id} not found`);

    const formatted = {
        ...facility,
        room:facility.room.map((r)=>({
            ...r,
        latitude: r.latitude ? Number(r.latitude) : null,
        longitude: r.longitude ? Number(r.longitude) : null,
        }))
    }

    return plainToInstance(FacilityResponseDto, formatted, {
      excludeExtraneousValues: true,
    });
  }

  async updateFacility(
    id: number,
    dto: UpdateFacilityDto,
  ): Promise<FacilityResponseDto> {
    const facility = await this.prisma.facility.findUnique({ where: { id } });
    if (!facility)
      throw new NotFoundException(`Facility with ID ${id} not found`);

    const updated = await this.prisma.facility.update({
      where: { id },
      data: { name: dto.name ?? facility.name },
      include: { room: true },
    });

    return plainToInstance(FacilityResponseDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async deleteFacility(id: number): Promise<void> {
    const facility = await this.prisma.facility.findUnique({ where: { id } });
    if (!facility)
      throw new NotFoundException(`Facility with ID ${id} not found`);

    await this.prisma.facility.delete({ where: { id } });
  }

  async createRoom(dto: CreateRoomDto): Promise<RoomResponseDto> {
    const facility = await this.prisma.facility.findUnique({
      where: { id: dto.facility_id },
    });
    if (!facility)
      throw new NotFoundException(`Facility ${dto.facility_id} not found`);

    const room = await this.prisma.room.create({
      data: {
        name: dto.name,
        latitude: dto.latitude,
        longitude: dto.longitude,
        facility: { connect: { id: dto.facility_id } },
      },
    });

    const formatted = {
      ...room,
      latitude: room.latitude ? Number(room.latitude) : null,
      longitude: room.longitude ? Number(room.longitude) : null,
    };

    return plainToInstance(RoomResponseDto, formatted, {
      excludeExtraneousValues: true,
    });
  }

  async findAllRooms(): Promise<RoomResponseDto[]> {
    const rooms = await this.prisma.room.findMany({
      orderBy: { id: 'asc' },
    });

    const formatted = rooms.map((r) => ({
      ...r,
      latitude: r.latitude ? Number(r.latitude) : null,
      longitude: r.longitude ? Number(r.longitude) : null,
    }));

    return plainToInstance(RoomResponseDto, formatted, {
      excludeExtraneousValues: true,
    });
  }

  async findRoomById(id: number): Promise<RoomResponseDto> {
    const room = await this.prisma.room.findUnique({ where: { id } });
    if (!room) throw new NotFoundException(`Room with ID ${id} not found`);

    const formatted = {
      ...room,
      latitude: room.latitude ? Number(room.latitude) : null,
      longitude: room.longitude ? Number(room.longitude) : null,
    };

    return plainToInstance(RoomResponseDto, formatted, {
      excludeExtraneousValues: true,
    });
  }

  async updateRoom(id: number, dto: UpdateRoomDto): Promise<RoomResponseDto> {
    const room = await this.prisma.room.findUnique({ where: { id } });
    if (!room) throw new NotFoundException(`Room with ID ${id} not found`);

    if (dto.facility_id) {
      const facility = await this.prisma.facility.findUnique({
        where: { id: dto.facility_id },
      });
      if (!facility)
        throw new NotFoundException(`Facility ${dto.facility_id} not found`);
    }

    const updated = await this.prisma.room.update({
      where: { id },
      data: {
        name: dto.name ?? room.name,
        latitude: dto.latitude ?? room.latitude,
        longitude: dto.longitude ?? room.longitude,
        facility: dto.facility_id
          ? { connect: { id: dto.facility_id } }
          : undefined,
      },
    });  

    const formatted = {
      ...updated,
      latitude: updated.latitude ? Number(updated.latitude) : null,
      longitude: updated.longitude ? Number(updated.longitude) : null,
    };

    return plainToInstance(RoomResponseDto, formatted, {
      excludeExtraneousValues: true,
    });
  }

  async deleteRoom(id: number): Promise<void> {
    const room = await this.prisma.room.findUnique({ where: { id } });
    if (!room) throw new NotFoundException(`Room with ID ${id} not found`);

    await this.prisma.room.delete({ where: { id } });
  }
}
