import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkUserSession();
  }

  checkUserSession() {
    if (!localStorage.getItem('currentUser')) {
      this.router.navigateByUrl('/login');
    }
  }

}
