import { IsNotEmpty } from 'class-validator';

export class TransferDto {
  //transaction_type,name_code,name,transaction_price,amount,status,success_amount,transaction_date
  @IsNotEmpty()
  readonly name_code: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly transaction_price: number;

  @IsNotEmpty()
  readonly amount: number;

  @IsNotEmpty()
  readonly status: string;

  @IsNotEmpty()
  readonly success_amount: string;

  @IsNotEmpty()
  readonly transaction_type: string;
  @IsNotEmpty()
  transaction_date: Date;

  // middleware 中添加
  mi_id: string;
}
