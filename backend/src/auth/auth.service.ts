import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private signToken(user: { id: string; email: string; role: string }) {
    return this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
  }

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new BadRequestException('Email already registered');

    const passwordHash = await hash(dto.password, 10);
    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
      avatarUrl: dto.avatarUrl,
    });

    return {
      user,
      accessToken: this.signToken(user),
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !user.passwordHash) throw new UnauthorizedException('Invalid credentials');
    const valid = await compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return {
      user,
      accessToken: this.signToken(user),
    };
  }

  async validateGoogleUser(profile: { email: string; name: string; googleId: string; avatarUrl?: string }) {
    const existing = await this.usersService.findByEmail(profile.email);
    if (existing) {
      return existing;
    }

    return this.usersService.create({
      name: profile.name,
      email: profile.email,
      googleId: profile.googleId,
      avatarUrl: profile.avatarUrl,
    });
  }

  async googleLogin(user: { id: string; email: string; role: string }) {
    return {
      user,
      accessToken: this.signToken(user),
    };
  }
}
