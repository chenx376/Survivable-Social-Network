import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../../services/user/user.service';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private router: Router;
  private userService: UserService;
  private dialogService: DialogService;
  private viewContainerRef: ViewContainerRef;

  username: string;
  password: string;

  constructor(router: Router,
              userService: UserService,
              dialogService: DialogService,
              viewContainerRef: ViewContainerRef) {
    this.router = router;
    this.userService = userService;
    this.dialogService = dialogService;
    this.viewContainerRef = viewContainerRef;
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
      .subscribe(
        () => this.router.navigateByUrl('chat'),
        err => {
          if (err.message === 'No such user') {
            this.dialogService.open('Register',
              `User ${this.username} does not exist. Do you want to register as a new user?`,
              this.viewContainerRef)
              .filter(result => result == true)
              .flatMap(() => this.userService.createUser(this.username, this.password))
              .flatMap(() => this.userService.login(this.username, this.password))
              .subscribe(
                () => this.router.navigateByUrl('chat'),
                err => {
                  console.error(err);
                })
          }
        });
  };

}
