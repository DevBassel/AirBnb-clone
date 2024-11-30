import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';
import { CreateUserInput } from './dto/create-user.input';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(JwtGuard)
  async getUserById(@Args('id', { type: () => Int }) id: number) {
    const user = await this.userService.findOneByIdOrEmail({ id });
    return plainToInstance(User, user);
  }

  @Mutation(() => Number)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return id;
  }
}
