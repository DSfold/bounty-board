import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (existingUser)
      throw new BadRequestException('This email already in use');
    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
    });
    const email = user.email;
    const id = user.id;
    const access_token = this.jwtService.sign({ email: createUserDto.email });
    return { email, id, access_token };
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
