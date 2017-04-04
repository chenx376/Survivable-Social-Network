import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User, UserStatus } from '../../models/user.model';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  users: User[];
  filteredUsers: User[];

  searchTerm = '';
  selectedStatus = UserStatus.Undefined;

  constructor(private userService: UserService) { }

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
      .subscribe(users => {
        this.users = users;
        this.updateSearch();
      });
  }

  updateSearch = () => {
    this.filteredUsers = this.users
      .filter(user => {
        if (this.selectedStatus == UserStatus.Undefined) { return true; }
        return user.status == this.selectedStatus;
      })
      .filter(user => {
        if (this.searchTerm.trim().length == 0) { return true; }
        return user.username.includes(this.searchTerm.trim());
      });
  };

  statusOkSelected = () => {
    this.selectedStatus = UserStatus.OK;
    this.updateSearch();
  };

  statusHelpSelected = () => {
    this.selectedStatus = UserStatus.Help;
    this.updateSearch();
  };

  statusEmergencySelected = () => {
    this.selectedStatus = UserStatus.Emergency;
    this.updateSearch();
  };

  clearStatusSelection = () => {
    this.selectedStatus = UserStatus.Undefined;
    this.updateSearch();
  }

}
