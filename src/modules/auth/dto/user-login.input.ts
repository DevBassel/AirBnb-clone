import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class UserLoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(8)
  password: string;
}
