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

  username: string;
  password: string;

  constructor(private router: Router,
              private userService: UserService,
              private dialogService: DialogService,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.router.navigateByUrl('home');
    }
  };

  loginButtonClicked = () => {
    this.userService.login(this.username, this.password)
      .subscribe(
        () => this.router.navigateByUrl('home'),
        err => {
          if (err.message === 'No such user') {
            this.dialogService.openDialogue(this.viewContainerRef,
              'Register',
              `User ${this.username} does not exist. Do you want to register as a new user?`)
              .filter(result => result === true)
              .flatMap(() => this.userService.createUser(this.username, this.password))
              .flatMap(() => this.userService.login(this.username, this.password))
              .subscribe(
                () => this.router.navigateByUrl('home'),
                err => console.error(err))
          } else {
            this.dialogService.openAlert(this.viewContainerRef, 'Error', err.message);
          }
        });
  };

}
