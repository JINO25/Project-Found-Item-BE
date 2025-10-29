/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/req/create-user.dto';
import { UpdateUserDTO } from './dto/req/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    const data = await this.userService.findAllUsers();
    return { message: 'Get all users successfully', data };
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return { message: 'User created successfully', data: user };
  }

  @Post('admin')
  async createUserForAdmin(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createAdmin(createUserDto);
    return { message: 'Admin created successfully', data: user };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(Number(id));
    return { message: 'Get user successfully', data: user };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    const updated = await this.userService.update(Number(id), updateUserDto);
    return { message: 'User updated successfully', data: updated };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.userService.deleteUser(Number(id));
  }
}
