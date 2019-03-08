import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nickname: string;
  alertHide: boolean;
  alertText: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.alertHide = true;
    this.alertText = "";
    this.nickname = "";
  }

  onLogIn() {
    this.userService.LogUser(this.nickname).subscribe(response => {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(response.body)
      );
      this.router.navigateByUrl("/");
    },
    err => {
      this.alertText = "Invalid login";
      this.alertHide = false;
    });
    this.nickname = "";
  }

}
