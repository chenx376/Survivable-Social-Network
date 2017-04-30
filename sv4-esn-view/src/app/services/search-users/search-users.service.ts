import { Injectable } from '@angular/core';
import { User, UserStatus } from '../../models/user.model';

@Injectable()
export class SearchUsersService {

  users: User[] = [];
  filteredUsers: User[] = [];

  searchTerm = '';
  selectedStatus = UserStatus.Undefined;

  currentLoggedInUser = '';
  currentLoggedInUserRole = 'CITIZEN';

  constructor() { }

  reset = () => {
    this.users = [];
    this.filteredUsers = [];
    this.searchTerm = '';
    this.selectedStatus = UserStatus.Undefined;
  };

  updateSearch = () => {
    this.filteredUsers = this.users
      .filter(user => (this.currentLoggedInUserRole == 'CITIZEN' && user.active == true) || (this.currentLoggedInUserRole == 'ADMIN') )
      .filter(user => this.selectedStatus === UserStatus.Undefined || user.status === this.selectedStatus)
      .filter(user => this.searchTerm.trim().length === 0 || user.username.includes(this.searchTerm.trim()));
  };

  statusOKSelected = () => {
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
