import { Router } from "@angular/router";
import { User } from "./../../models/User";
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { Tag } from '../../models/Tag';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {

  nickname: string;
  alertHide: boolean;
  alertText: string;
  tags: Tag[];

  constructor(private UserService: UserService, private router: Router) {}

  ngOnInit() {
    this.alertHide = true;
    this.alertText = "";
  }

  onRegister() {
    if (this.getNicknameInputState() || (this.tags === undefined || this.tags.length === 0)) {
      this.alertText = this.getNicknameInputState() ? "The nickname can't be empty" : "At least one tag is necesary";
      this.alertHide = false;
    } else {
      var user = new User();
      user.nickname = this.nickname;
      user.status = true;

      this.alertHide = true;
      this.alertText = "";

      this.UserService.createUser(user).subscribe(
        userResponse => {
          console.log(userResponse);
          this.UserService.addTagsToUser(this.tags, userResponse.body.id).subscribe(response => {

            localStorage.setItem(
              "currentUser",
              JSON.stringify(userResponse.body)
            );
            this.router.navigateByUrl("/");
          });
        },
        err => {
          this.alertText = err.message;
          this.alertHide = false;
        }
      );
    }
  }

  tagsChangedHandler(tags: Tag[]) {
    this.tags = tags;
  }

  getNicknameInputState(): boolean {
    return (this.nickname === "" || this.nickname === undefined || this.nickname === null);
  }

  createTags(userId) {
    console.log(this.tags);
    this.UserService.addTagsToUser(this.tags, userId ).subscribe(response => {
      console.log(response);
    });
  }
}
