import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { HttpService } from '../http/http.service';
import { Email } from '../../models/email.model'
import { UserService } from '../user/user.service';

@Injectable()
export class EmailService {

  private endpoint = "http://localhost:3000";
  // private endpoint = "https://sv4-esn-services.herokuapp.com";

  constructor(private httpService: HttpService,
              private userService: UserService) { }

  sendEmail = (title: string, content: string, targetUserId: string): Observable<void> => {
    return this.httpService.post('/emails/', { title: title, content: content, sender: this.userService.userId, receivers_group: [targetUserId] });
  };
}
