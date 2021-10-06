import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PhoenixEatService } from './phoenix-eat.service';
import { ParamPathCheckPipe } from '../shared/param-check.pipe';
import { DataPhrasePipe } from '../shared/data-phrase.pipe';
import { PhoenixFoodCommentDtoDto } from './dto/phoenix-food-comment.dto';

@Controller('phoenix-eat')
export class PhoenixEatController {
  constructor(private readonly phoenixService: PhoenixEatService) {}

  /***
   *
   * @param selectedDate
   * @param week 星期， 这个是写死的， 通过这种 ？ 的形式 + ParamPathPipe
   * 来控制传入的参数必须要是 week 才可以 .
   * 这样写的目的是为了灵活的使用一个controller来解决业务输入的逻辑
   */
  @Get('list/:week?/:selectedDate?')
  async listLunch(
    @Param('week', ParamPathCheckPipe) week: string,
    @Param('selectedDate', DataPhrasePipe) selectedDate: any,
  ) {
    return this.phoenixService.listAllLunch(week ? selectedDate : null);
  }

  @Post('comment/edit')
  async editComment(@Body('comment') comment: PhoenixFoodCommentDtoDto) {
    console.log(comment);
    return this.phoenixService.editComment(comment);
  }
}
