import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { IUser } from '../types/types';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const matchPassword = await argon2.verify(user.password, pass);
    if (user && matchPassword) {
      return user;
    }
    throw new BadRequestException('Credentials are incorrect');
  }

  async login(user: IUser) {
    const { email, id } = user;
    return {
      id,
      email,
      access_token: this.jwtService.sign({ id, email }),
    };
  }
}
