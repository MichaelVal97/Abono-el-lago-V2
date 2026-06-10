import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { environment } from '../config/environment';
import { AuthUser } from '../shared/types/auth-user.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    return;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(
    @Req() req: { user: AuthUser & { name?: string; avatarUrl?: string | null } },
    @Res() res: Response,
  ) {
    const result = await this.authService.googleLogin(req.user);
    const redirectUrl = new URL(environment.frontendUrl);
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('token', result.accessToken);
    return res.redirect(redirectUrl.toString());
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: { user: { sub: string; email: string; role: string } }) {
    return req.user;
  }
}
