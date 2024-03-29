import { User } from './../../models/User';
import { PostService } from './../../services/post.service';
import { Post } from "../../models/Post"
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts: Post[];
  filterType: number;


  constructor(private router: Router, private postService: PostService ) { }

  ngOnInit() {
    this.filterType = 1;
    this.checkUserSession();
    this.loadPosts();
  }

  checkUserSession() {
    if (!localStorage.getItem('currentUser')) {
      this.router.navigateByUrl('/login');
    }
  }

  closeSession() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  loadPosts() {
    var userStored = JSON.parse(localStorage.getItem('currentUser'));
    this.posts = [];
    this.postService.getPosts(userStored.id, this.filterType).subscribe(responseTags => {
      this.posts = responseTags;
    });
  }

  postChangedHandler(newPost: boolean) {
    console.log(newPost);
    this.loadPosts();
  }

  filterChanged(filter: number) {
    this.filterType = filter;
    this.loadPosts();
  }

}
