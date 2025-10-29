/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FacilityRoomService } from './facility-room.service';
import { CreateFacilityDto } from './dto/req/create-facility.dto';
import { UpdateFacilityDto } from './dto/req/update-facility.dto';
import { CreateRoomDto } from './dto/req/create-room.dto';
import { UpdateRoomDto } from './dto/req/update-room.dto';


@Controller('facility-room')
export class FacilityRoomController {
  constructor(private readonly service: FacilityRoomService) {}


  @Post('facility')
  @HttpCode(HttpStatus.CREATED)
  async createFacility(@Body() dto: CreateFacilityDto) {
    const data = await this.service.createFacility(dto);
    return { message: 'Facility created successfully', data };
  }

  @Get('facility')
  async getAllFacilities() {
    const data = await this.service.findAllFacilities();
    return { message: 'Facilities retrieved successfully', data };
  }

  @Get('facility/:id')
  async getFacilityById(@Param('id') id: string) {
    const data = await this.service.findFacilityById(Number(id));
    return { message: 'Facility retrieved successfully', data };
  }

  @Patch('facility/:id')
  async updateFacility(@Param('id') id: string, @Body() dto: UpdateFacilityDto) {
    const data = await this.service.updateFacility(Number(id), dto);
    return { message: 'Facility updated successfully', data };
  }

  @Delete('facility/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204, không cần trả body
  async deleteFacility(@Param('id') id: string) {
    await this.service.deleteFacility(Number(id));
  }


  @Post('room')
  @HttpCode(HttpStatus.CREATED)
  async createRoom(@Body() dto: CreateRoomDto) {
    const data = await this.service.createRoom(dto);
    return { message: 'Room created successfully', data };
  }

  @Get('room')
  async getAllRooms() {
    const data = await this.service.findAllRooms();
    return { message: 'Rooms retrieved successfully', data };
  }

  @Get('room/:id')
  async getRoomById(@Param('id') id: string) {
    const data = await this.service.findRoomById(Number(id));
    return { message: 'Room retrieved successfully', data };
  }

  @Patch('room/:id')
  async updateRoom(@Param('id') id: string, @Body() dto: UpdateRoomDto) {
    const data = await this.service.updateRoom(Number(id), dto);
    return { message: 'Room updated successfully', data };
  }

  @Delete('room/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRoom(@Param('id') id: string) {
    await this.service.deleteRoom(Number(id));
  }
}
