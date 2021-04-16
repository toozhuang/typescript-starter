import { Controller, Get } from '@nestjs/common';
import { PhoenixEatService } from './phoenix-eat.service';

@Controller('phoenix-eat')
export class PhoenixEatController {
  constructor(private readonly phoenixService: PhoenixEatService) {}

  @Get('list')
  async listAllLunch() {
    return this.phoenixService.listAllLunch();
  }
}
