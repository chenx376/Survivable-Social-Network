import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../../services/user/user.service';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  private router: Router;
  private route: ActivatedRoute;
  private userService: UserService;
  private chatService: ChatService;

  constructor(router: Router,
              route: ActivatedRoute,
              userService: UserService,
              chatService: ChatService) {
    this.router = router;
    this.route = route;
    this.userService = userService;
    this.chatService = chatService;
  }

  ngOnInit() {
    if (!this.userService.isUserLoggedIn()) {
      this.router.navigateByUrl('login');
    } else {
      this.chatService.subscribeMe();
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
