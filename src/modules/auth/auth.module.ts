import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { AuthResolver } from './authResolver';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
