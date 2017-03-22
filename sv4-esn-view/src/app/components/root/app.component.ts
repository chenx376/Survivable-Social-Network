import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../../services/user/user.service';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService,
              private chatService: ChatService) { }

  ngOnInit() {
    if (!this.userService.isUserLoggedIn()) {
      this.router.navigateByUrl('login');
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
