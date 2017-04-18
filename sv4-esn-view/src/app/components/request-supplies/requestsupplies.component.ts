import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { UserStatus } from '../../models/user.model';
import { SearchUsersService } from '../../services/search-users/search-users.service';

@Component({
  selector: 'app-requestsupplies',
  templateUrl: './requestsupplies.component.html',
  styleUrls: ['./requestsupplies.component.css']
})
export class RequestSuppliesComponent implements OnInit {

  constructor(/*private suppliesService: MySharedSuppliesService*/) { }

  ngOnInit() {
    // this.userService.getUserList()
    //   .map(users => users.sort((user1, user2) => {
    //     if (user1.online && !user2.online) {
    //       return -1;
    //     } else if (!user1.online && user2.online) {
    //       return 1;
    //     } else {
    //       if (user1.username > user2.username) {
    //         return 1;
    //       } else if (user1.username < user2.username) {
    //         return -1;
    //       } else {
    //         return 0;
    //       }
    //     }
    //   }))
    //   .subscribe(users => {
    //     this.searchUsersService.reset();
    //     this.searchUsersService.users = users;
    //     this.searchUsersService.updateSearch();
    //   });
  }

}
