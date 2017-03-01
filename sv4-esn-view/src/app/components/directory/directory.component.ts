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
    this.userService.getUserList().subscribe(users => this.users = users);
  }

}
