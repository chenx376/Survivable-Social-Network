import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';

import { User } from '../../models/user.model'

@Injectable()
export class UserService {

  private httpService: HttpService;

  userId: string = localStorage.getItem('user_id');
  user: User;

  constructor(httpService: HttpService) {
    this.httpService = httpService;

    if (this.isUserLoggedIn()) {
      this.getUserInfo(this.userId);
    }
  }

  login = (username: string, password: string): Observable<void> => {
    return this.httpService.post('/login', { username, password })
      .do(json => {
        this.userId = json.id;
        this.httpService.jwt = json.token;
        localStorage.setItem('jwt', json.token);
        localStorage.setItem('user_id', json.id);

        // emit socket "login"

      })
      .map(json => json.id)
      .flatMap(this.getUserInfo);
  };

  private getUserInfo = (userId: string): Observable<void> => {
    return this.httpService.get(`/users/${userId}`)
      .do(json => this.user = new User(json));
  };


  isUserLoggedIn(): boolean {
    return this.userId != undefined;
  }

//   retrieveAll = (): Observable<User> => {
//      return this.http.get(this.endpoint + '/users/').map(res => res.json());
//   }

//   update = (user): Observable<void> => {
//     return this.http.put(this.endpoint + '/users', user).map(res => res.json());
//   }

//   create = (user): Observable<void> => {
//     return this.http.post(this.endpoint + '/users', user).map(res => res.json());
//   }

}
