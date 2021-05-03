import { IsDate } from 'class-validator';

export class PhoenixFoodCommentDtoDto {
  // @IsDate()
  readonly lunchDate: Date;

  readonly commentId?: string;
  readonly comment: string;
}
