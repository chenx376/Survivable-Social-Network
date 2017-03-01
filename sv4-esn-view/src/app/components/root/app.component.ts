import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  private router: Router;
  private userService: UserService;

  constructor(router: Router, userService: UserService) {
    this.router = router;
    this.userService = userService;
  }

  ngOnInit() {
    if (!this.userService.isUserLoggedIn()) {
      this.router.navigateByUrl('login');
    } else {
      this.router.navigateByUrl('home');
    }
  }

  logoutButtonClicked = (sidenav: any) => {
    sidenav.close();
    this.userService.logout()
      .subscribe(json => {
        this.router.navigateByUrl('login');
      });
  }

}
