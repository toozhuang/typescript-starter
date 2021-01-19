import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {


  constructor(private readonly userService: UserService) {
  }

  @Post('register')
  async createUser(@Body('user') User: CreateUserDto) {
    return this.userService.create(User);
  }
}


