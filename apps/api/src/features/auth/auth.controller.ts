import { Get, Req, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { AuthRequest } from './types';

@Controller('auth')
export class AuthController {
	@UseGuards(AuthGuard('jwt'))
	@Get('profile')
	async create(@Req() req: AuthRequest) {
		return {
			...req.user,
		};
	}
}
