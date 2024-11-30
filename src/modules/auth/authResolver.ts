import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { CreateUserInput } from '../users/dto/create-user.input';
import { plainToInstance } from 'class-transformer';
import { AuthService } from './auth.service';
import { UserLoginInput } from './dto/user-login.input';
import { LoginResponse } from './dto/login-respons.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async register(@Args('userInput') userData: CreateUserInput) {
    return this.authService.register(userData);
  }

  @Mutation(() => LoginResponse)
  async login(@Args('loginInput') userData: UserLoginInput) {
    return this.authService.login(userData);
  }
}
