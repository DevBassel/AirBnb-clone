import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { GraphQLUserRole, UserRole } from '../enums/user.roles';
@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  phone: string;

  @Field(() => GraphQLUserRole)
  @IsEnum(GraphQLUserRole)
  role: UserRole;

  @Field()
  @IsString()
  @Length(8, 15)
  password: string;
}
