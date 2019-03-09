import { PostService } from './../../services/post.service';
import { Comment } from './../../models/Comment';
import { User } from './../../models/User';
import { HttpResponse } from '@angular/common/http';
import { LikeService } from './../../services/like.service';
import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/Post';
import { Like } from '../../models/Like';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  likeButtonText: string;
  likeButtonClass: string;
  likeButtonState: boolean;
  like: Like;
  newComment: Comment;
  comments: Comment[];

  constructor(private likeService: LikeService, private postService: PostService) { }

  ngOnInit() {
    this.newComment = new Comment();
    this.getPostComments();
    this.checkIfIsLiked();
  }

  toggleLikeButton() {
    if (this.likeButtonState) {
      this.dislikePost();
    } else {
      this.likePost();
    }
  }

  likePost() {
    let like: Like = new Like();
    like.post = this.post;
    like.user = JSON.parse(localStorage.getItem('currentUser'));
    this.likeService.createLike(like).subscribe(response => {
      console.log(response);
      this.like = response.body;
      this.likeButtonState = true;
      this.likeButtonClass = "success";
      this.likeButtonText = "You like this";
    });
  }

  dislikePost() {
    console.log(this.like);
    this.likeService.deleteLike(this.like).subscribe(response => {
      console.log(response);
      this.like = null;
      this.likeButtonState = false;
      this.likeButtonClass = "primary";
      this.likeButtonText = "Like";
    });
  }

  checkIfIsLiked() {
    let localUser = JSON.parse(localStorage.getItem('currentUser'));
    let userId = localUser.id;
    this.likeService.isLiked(userId, this.post.postId).subscribe(response => {
      if (response.ok) {
        this.like = new Like();
        console.log(response.body);
        this.like.id = response.body.id;
        console.log(this.like.id);
        this.like.user = localUser;
        this.like.post = this.post;
        this.likeButtonState = true;
        this.likeButtonClass = "success";
        this.likeButtonText = "You like this";
      }
    },
      err => {
        console.log("error");
        this.like = null;
        this.likeButtonState = false;
        this.likeButtonClass = "primary";
        this.likeButtonText = "Like";
      });
  }

  createCommnet() {
    this.newComment.post = this.post;
    this.newComment.user = JSON.parse(localStorage.getItem('currentUser'));
    this.postService.addComment(this.newComment).subscribe(response => {
      this.newComment = response.body;
      this.postService.addCommentToPost(this.post.postId, this.newComment).subscribe(r => {
          this.newComment = new Comment();
          this.getPostComments();
      });
    });
  }

  getPostComments() {
    this.postService.getPostComments(this.post.postId).subscribe(response => {
      this.comments = response;
    });
  }

}
