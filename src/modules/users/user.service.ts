import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/create-user.input';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(userDate: CreateUserInput) {
    userDate.password = await bcrypt.hash(userDate.password, 10);
    return await this.userRepo.save(userDate);
  }

  async findOneByIdOrEmail({ id, email }: { id?: number; email?: string }) {
    const user = await this.userRepo.findOneBy([{ id }, { email }]);
    if (!user) throw new NotFoundException();
    return user;
  }
}
