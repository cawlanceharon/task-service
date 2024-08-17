import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(username: string, password?: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username, password },
    });
  
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async create(username: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { username } });

    if (existingUser) {
      throw new ConflictException(`User with username ${username} already exists`);
    }

    const newUser = this.userRepository.create({
      username,
      password,
    });

    return this.userRepository.save(newUser);
  }
}
