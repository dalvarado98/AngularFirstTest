import { User } from './../../models/User';
import { Tag } from './../../models/Tag';
import { Post } from './../../models/Post';
import { PostService } from './../../services/post.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OutletContext } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private postService: PostService, private modalService: NgbModal) { }

  post: Post = new Post();
  tags: Tag[];
  @Output() postChanged: EventEmitter<boolean> =   new EventEmitter();

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  createPost() {
    let user: User = JSON.parse(localStorage.getItem('currentUser'));
    this.post.user = user;

    this.postService.createPost(this.post).subscribe(response => {
      if (response.status === 201) {
        let idPost = response.body.postId;
        console.log(response.body);
        this.createTags(idPost);
        this.postChanged.emit(true);
      };
    });

    this.modalService.dismissAll();
    this.postChanged.emit(true);
    this.post = new Post();
  }

  createTags(idPost) {
    console.log(this.tags);
    this.postService.addTagsToPost(this.tags, idPost).subscribe(response => {
      console.log(response);
    });
  }

  tagsChangedHandler(tags: Tag[]) {
    this.tags = tags;
  }
}
