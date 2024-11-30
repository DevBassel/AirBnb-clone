import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLUserRole, UserRole } from '../enums/user.roles';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  phone: string;

  @Column()
  @HideField()
  @Exclude()
  password?: string;

  @Column({type: 'enum', enum: UserRole})
  @Field(() => GraphQLUserRole)
  role: UserRole;

  @CreateDateColumn()
  @Field({ nullable: true })
  created_at?: Date;

  @UpdateDateColumn()
  @Field({ nullable: true })
  updated_at?: Date;
}
