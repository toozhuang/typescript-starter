/** 20/1/2021
 *   作者: Wang
 *   功能: Pocket Book  类型
 */

export class CreatePocketbookDto {
  readonly note_name: string; // pocket book name

  readonly creator: string; //  创建者(的email)

  readonly cover: string;

  readonly generatedId?: string;

  //  目前好像只需要 name 就可以了
  // 后面要做成 one  to many records
}

export interface UpdatePocketBookDto {
  readonly note_name: string; // pocket book name

  creator: string; //  创建者(的email), 不使用 readonly 的原因是会在中间层的时候进行update

  readonly cover: string;

  readonly description: string;

  readonly id: string;
}
