import { PostService } from './../../services/post.service';
import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../models/Comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() public comment: Comment;

  constructor(private postService: PostService) { }

  ngOnInit() {
    console.log(this.comment);
  }



}
