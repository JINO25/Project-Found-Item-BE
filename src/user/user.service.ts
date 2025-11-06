/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { role, user } from '@prisma/client';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { CreateUserDto } from './dto/req/create-user.dto';
import { EmailAlreadyExistsException } from 'src/common/exceptions/EmailAlreadyExistsException ';
import { UserRole } from './enums/user-role.enum';
import { plainToInstance } from 'class-transformer';
import { UserDTORes } from './dto/res/user-res.dto';
import { UpdateUserDTO } from './dto/req/update-user.dto';
import { ImageService } from 'src/image/image.service';

type UserWithRole = user & { role: role };

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    private readonly imageService: ImageService,
  ) {}

  async findAllUsers() {
    // const users = await this.prisma.user.findMany();
    // return users;
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        create_At: true,
      },
    });
  }

  async findOneByEmail(email: string): Promise<UserWithRole | null> {
    return await this.prisma.user.findFirst({
      where: { email },
      include: { role: true },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        role: true,
      },
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser)
      throw new EmailAlreadyExistsException('Email already exists');

    let defaultRole = await this.prisma.role.findUnique({
      where: { role: UserRole.USER },
    });

    if (!defaultRole) {
      defaultRole = await this.prisma.role.create({
        data: { role: UserRole.USER },
      });
    }

    const hashedPassword = await this.hashingProvider.hashPassword(
      createUserDto.password,
    );

    const savedUser = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: hashedPassword,
        phone: createUserDto.phone,
        create_At: new Date(),
        role: { connect: { id: defaultRole.id } },
      },
      include: { role: true },
    });

    return plainToInstance(UserDTORes, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  async createAdmin(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser)
      throw new EmailAlreadyExistsException('Email already exists');

    let defaultRole = await this.prisma.role.findUnique({
      where: { role: UserRole.ADMIN },
    });

    if (!defaultRole) {
      defaultRole = await this.prisma.role.create({
        data: { role: UserRole.ADMIN },
      });
    }

    const hashedPassword = await this.hashingProvider.hashPassword(
      createUserDto.password,
    );

    const savedUser = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: hashedPassword,
        phone: createUserDto.phone,
        create_At: new Date(),
        role: { connect: { id: defaultRole.id } },
      },
      include: { role: true },
    });

    return plainToInstance(UserDTORes, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDTO,
    file: Express.Multer.File,
  ) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User not found with id: ${id}`);
    }

    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const emailTaken = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });
      if (emailTaken) {
        throw new EmailAlreadyExistsException('Email already exists');
      }
    }

    let hashedPassword = existingUser.password;
    if (updateUserDto.password) {
      hashedPassword = await this.hashingProvider.hashPassword(
        updateUserDto.password,
      );
    }

    let url;
    if (file) {
      url = await this.imageService.uploadAvatar(file);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        email: updateUserDto.email ?? existingUser.email,
        name: updateUserDto.name ?? existingUser.name,
        phone: updateUserDto.phone ?? existingUser.phone,
        avatar: url ?? existingUser.avatar,
        password: hashedPassword,
      },
      include: { role: true },
    });

    return plainToInstance(UserDTORes, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException(`User not found with id: ${id}`);

    await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }
}
