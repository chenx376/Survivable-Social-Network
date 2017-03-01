import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  private userService: UserService;

  users: [User];

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit() {
    this.userService.getUserList()
      .map(users => users.sort((user1, user2) => {
        if (user1.online && !user2.online) {
          return -1;
        } else if (!user1.online && user2.online) {
          return 1;
        } else {
          if (user1.username > user2.username) {
            return 1;
          } else if (user1.username < user2.username) {
            return -1;
          } else {
            return 0;
          }
        }
      }))
      .subscribe(users => this.users = users);
  }

}
