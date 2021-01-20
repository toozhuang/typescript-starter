import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './user.entity';
import { UserDecorator } from './user.decorator';
import { User } from './interface/user.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  async findMe(@UserDecorator('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @Post('users/register')
  async createUser(@Body('user') User: CreateUserDto) {
    return this.userService.create(User);
  }

  @Post('users/login')
  async login(@Body('user') user: LoginUserDto) {
    const hasUser: UserEntity = await this.userService.findOne(user);

    const errors = { User: 'not found' };

    if (!hasUser) throw new HttpException({ errors: errors }, 401);

    const token = await this.userService.generateJWT(hasUser);

    const { email, username } = hasUser;

    return {
      token,
      email,
      username,
    };
  }
}
