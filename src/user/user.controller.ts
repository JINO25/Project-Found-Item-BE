/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/req/create-user.dto';
import { UpdateUserDTO } from './dto/req/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Roles } from 'src/auth/enums/role.enum';
import { GetUserID } from 'src/common/decorators/get-user-id.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth([Roles.User])
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
  
  @Auth([Roles.User])
  @Patch('update')
  @UseInterceptors(FileInterceptor('file'))
  async update(@GetUserID() userId: number, @Body() updateUserDto: UpdateUserDTO, @UploadedFile() file: Express.Multer.File) {
    const updated = await this.userService.update(userId, updateUserDto,file);
    return { message: 'User updated successfully', data: updated };
  }

  @Auth([Roles.Admin])
  @Post('admin')
  async createUserForAdmin(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createAdmin(createUserDto);
    return { message: 'Admin created successfully', data: user };
  }

  @Auth([Roles.Admin])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(Number(id));
    return { message: 'Get user successfully', data: user };
  }


  @Auth([Roles.Admin])
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.userService.deleteUser(Number(id));
  }
}
