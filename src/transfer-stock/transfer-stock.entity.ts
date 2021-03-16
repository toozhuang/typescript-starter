/** 5/3/2021
 *   作者: Wang
 *   功能: 股票交易表，
 *   用来记录每一笔操作
 *   todo: 后期可能会拆分成两个表； 买入表 和 卖出表
 *   但目前这样是够用的， 先运行一段时间，查缺补漏即可
 */

import { Column, Entity, ManyToOne, ObjectIdColumn, OneToOne } from 'typeorm';

@Entity('transfer-stock')
export class TransferStockEntity {
  @ObjectIdColumn()
  id: number;

  @Column()
  name: string; //  股票名称

  @Column()
  buyPrice: number; // 购买价格

  @Column()
  amount: number; // 购买数量

  @Column()
  transacation_type: string; // 操作类型 购买/卖出

  @Column()
  expect_price: number; // 预期卖出价格

  @Column()
  sell_price: number; //卖出价格

  @Column()
  note: string;

  @Column({ type: 'date' })
  t_date: Date;
}
