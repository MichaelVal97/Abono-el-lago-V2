import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { environment } from '../../config/environment';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: environment.googleClientId,
      clientSecret: environment.googleClientSecret,
      callbackURL: environment.googleCallbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    const email = profile.emails?.[0]?.value ?? '';
    const avatarUrl = profile.photos?.[0]?.value;
    return this.authService.validateGoogleUser({
      email,
      name: profile.displayName,
      googleId: profile.id,
      avatarUrl,
    });
  }
}
