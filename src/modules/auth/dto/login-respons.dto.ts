import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserRole } from 'src/modules/users/enums/user.roles';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => Int)
  id: number;

  @Field()
  role: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  expiresIn?: number;
}
