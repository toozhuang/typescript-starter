/**
 * @author 2Zhuan9
 * @date 27/4/2021
 * @Description: 返回生成 Pie 图的数据的接口对象
 * todo: 这个部分要改成 type + Partial 的形式来使用
 */

export interface MoneyRecordPieInterface {
  maxI: number;
  maxO: number;
  inAmount: number;
  outAmount: number;
  inlst: any[];
  outlst: Outlst[];
  symbol: string;
}

export class MoneyRecordPie implements MoneyRecordPieInterface {
  inAmount: number;
  inlst: any[];
  maxI: number;
  maxO: number;
  outAmount: number;
  outlst: Outlst[];
  symbol: string;

  constructor() {
    this.inAmount = 0;
    this.outAmount = 0;
    this.outlst = [];
    this.maxO = 0;
    this.maxI = 0;
  }


}

export interface Outlst {
  name: string;
  id: any;  // 不需要精确
  total: number;
  transaction_type: string;
  c?: Item[];
}

export interface Item {
  name: string;
  amount: number;
  id: number;
}