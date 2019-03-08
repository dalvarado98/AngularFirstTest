import { Tag } from './Tag';
import { Comment } from './Comment';
import { User } from './User';
export class Post {

  postId: number;
  title: string;
  text: string;
  status: boolean;
  imageURL: string;
  createdDateTime: Date;
  user: User;
  comments: Comment[];
  tags: Tag[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
