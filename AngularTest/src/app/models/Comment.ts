import { User } from './User';
import { Post } from './Post';
export class Comment {
  commentId: number;
  user: User;
  post: Post;
  text: string;
  createdDateTime: Date;
}
