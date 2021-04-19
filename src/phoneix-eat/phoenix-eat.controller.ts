import { Controller, Get, Param } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PhoenixEatService } from './phoenix-eat.service';
import { ParamPathCheckPipe } from '../shared/param-check.pipe';
import { DataPhrasePipe } from '../shared/data-phrase.pipe';
import { PhoenixFoodDto } from './dto/phoenix-food.dto';
import { IsDate } from 'class-validator';

@Controller('phoenix-eat')
export class PhoenixEatController {
  constructor(private readonly phoenixService: PhoenixEatService) {
  }

  /***
   *
   * @param selectedDate
   * @param week 星期， 这个是写死的， 通过这种 ？ 的形式 + ParamPathPipe 来控制传入的参数必须要
   * 是 week 才可以。
   * 这样写的目的是为了灵活的使用一个controller来解决业务输入的逻辑
   */
  @Get('list/:week?/:selectedDate?')
  async listLunch(
    @Param('selectedDate', DataPhrasePipe) selectedDate: any,
    @Param('week', ParamPathCheckPipe) week: string,
  ) {
    return this.phoenixService.listAllLunch(selectedDate);
  }
}
