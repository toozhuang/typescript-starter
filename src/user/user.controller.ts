import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './user.entity';
import { UserDecorator } from './user.decorator';
import { User } from './interface/user.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  // Note: 后面这里还可以添加功能是 根据用户的角色, 如果是 admin 就返回所有的信息
  // 这个就是 guard 派上用场的时候了
  @Get('user/info')
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

    const errors = { User: '用户名错误或者密码错误' };

    if (!hasUser) throw new HttpException({ errors: errors.User }, 401);

    const token = await this.userService.generateJWT(hasUser);

    const { email, username } = hasUser;

    return {
      token,
      email,
      username,
    };
  }
}
