import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { Email } from '../../models/email.model'
import { UserService } from '../user/user.service';
import { User, UserStatus } from '../../models/user.model'

@Injectable()
export class EmailService {

  private endpoint = "http://localhost:3000";
  // private endpoint = "https://sv4-esn-services.herokuapp.com";

  constructor(private httpService: HttpService,
              private userService: UserService) { }

  sendIndividualEmail = (title: string, content: string, targetUserId: string): Observable<void> => {
    return this.httpService.post('/emails/', { title: title, content: content, sender: this.userService.userId, receivers_group: [targetUserId] });
  };

  sendGroupEmail = (title: string, content: string, receivers_group): Observable<void> => {
    return this.httpService.post('/emails/', { title: title, content: content, sender: this.userService.userId, receivers_group: receivers_group });
  };

  getReceiversGroupInStatus = (statusId: number): Observable<[User]> => {
    return this.httpService.get('/users/status/' + statusId)
      .map(json => json.map(userJson => new User(userJson)));
  };

  getReceiversGroupInSubscription = (): Observable<[User]> => {
    return this.httpService.get('/users/subscription/true')
      .map(json => json.map(userJson => new User(userJson)));
  }

}
