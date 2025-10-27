/* eslint-disable prettier/prettier */
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Roles } from '../../auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

export const AUTH_KEY = 'roles';

export function Auth(roles: Roles[] = []) {
  return applyDecorators(
    SetMetadata(AUTH_KEY, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
