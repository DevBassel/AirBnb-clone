import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { CreateUserInput } from '../users/dto/create-user.input';
import { plainToInstance } from 'class-transformer';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLoginInput } from './dto/user-login.input';
import { compare } from 'bcrypt';
import { LoginResponse } from './dto/login-respons.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userData: CreateUserInput) {
    const user = await this.userService.create(userData);
    return plainToInstance(User, user);
  }

  async login({ email, password }: UserLoginInput): Promise<LoginResponse> {
    const checkUser = await this.userService.findOneByIdOrEmail({ email });
    // validate user
    if (!(await compare(password, checkUser.password)))
      throw new ForbiddenException('email or passwor is wrong!!');
    const accessToken = this.jwtService.sign({
      sub: checkUser.id,
      email: checkUser.email,
    });
    return {
      accessToken,
      name: checkUser.name,
      id: checkUser.id,
      role: checkUser.role,
      expiresIn: this.jwtService.decode(accessToken)['exp'],
    };
  }
}
