import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private router: Router;
  private userService: UserService;

  username: string;
  password: string;

  constructor(router: Router, userService: UserService) {
    this.router = router;
    this.userService = userService;
  }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.router.navigateByUrl('chat');
    }
  };

  isFormValid = (): boolean => this.isUsernameValid() && this.isPasswordValid();

  private isUsernameValid = (): boolean => {
    return this.username != undefined;
  };

  private isPasswordValid = (): boolean => {
    return this.password != undefined;
  };

  loginButtonClicked = () => {
    this.userService.login(this.username, this.password)
      .subscribe(() => {
        this.router.navigateByUrl('chat');
        console.log("success");
      }, error => {
        console.log("error");
      });
  };

}
