import { IsDate } from 'class-validator';

export class PhoenixFoodDto {
  @IsDate()
  menuDate: Date;

  readonly weekOfDay: string;
  readonly menuA: string;
  readonly menuB: string;
  readonly menuC: string;
  readonly menuAll: string;
}
