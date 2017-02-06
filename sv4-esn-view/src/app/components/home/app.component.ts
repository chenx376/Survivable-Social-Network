import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService]
})

export class AppComponent {
    
    users: Array<{}>;

    constructor(private _usersService: UsersService) {

    }

    ngOnInit() {
        this._usersService.retrieveAll(function(data){
          this.users = data;
        });
    }
}
