import { Tag } from './Tag';
export class User {

  userId: number;
  nickname: string;
  status: boolean;
  tags: Tag[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
