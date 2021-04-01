/** 5/3/2021
 *   作者: Wang
 *   功能: 股票交易表，
 *   用来记录每一笔操作
 *   todo: 后期可能会拆分成两个表； 买入表 和 卖出表
 *   但目前这样是够用的， 先运行一段时间，查缺补漏即可
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mi_transfer_stock')
export class Mi_transfer_stockEntity {
  @PrimaryGeneratedColumn()
  mi_id: string;

  @Column()
  name_code: string;

  @Column()
  name: string; //  股票名称

  @Column({ nullable: false })
  transaction_price: number; // 购买价格

  @Column()
  amount: number;

  @Column()
  success_amount: string; // 购买数量

  @Column()
  transaction_type: string; // 操作类型 购买/卖出

  @Column({ type: 'date' })
  transaction_date: Date;
}
