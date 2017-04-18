import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { UserStatus } from '../../models/user.model';
import { SearchUsersService } from '../../services/search-users/search-users.service';

@Component({
  selector: 'app-mysharedsupplies',
  templateUrl: './mysharedsupplies.component.html',
  styleUrls: ['./mysharedsupplies.component.css']
})
export class MySharedSuppliesComponent implements OnInit {

  public types = [
    {value: 'medicine', viewValue: 'Medicine'},
    {value: 'food', viewValue: 'Food'},
    {value: 'car', viewValue: 'Car'},
    {value: 'utilities', viewValue: 'Utilities'},
    {value: 'general', viewValue: 'General'}
  ];

  constructor(/*private suppliesService: MySharedSuppliesService*/) {

  }

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
