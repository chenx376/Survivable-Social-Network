import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent implements OnInit {

  private userService: UserService;

  username: string;
  password: string;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit() {

  }

  formValid = (): boolean => this.usernameValid() && this.passwordValid();

  private usernameValid = (): boolean => {
    return this.username != undefined;
  };

  private passwordValid = (): boolean => {
    return this.password != undefined;
  };

  loginButtonClicked = () => {
    this.userService.login(this.username, this.password);
  };

}
