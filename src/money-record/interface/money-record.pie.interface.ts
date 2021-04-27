/**
 * @author 2Zhuan9
 * @date 27/4/2021
 * @Description: 返回生成 Pie 图的数据的接口对象
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

export interface Outlst {
  name: string;
  id: number;
  total: number;
  c: Item[];
}

export interface Item {
  name: string;
  amount: number;
  id: number;
}