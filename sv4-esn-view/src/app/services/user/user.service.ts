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
        this.userId = json.user.id;
        this.httpService.jwt = json.token;
        localStorage.setItem('jwt', json.token);
        localStorage.setItem('user_id', json.user.id);

        // emit socket "login"

      })
      .map(res => res.user.id)
      .flatMap(this.getUserInfo);
  };

  private getUserInfo = (userId: string): Observable<void> => {
    return this.httpService.get(`/users/${userId}`)
      .do(json => this.user = new User(json));
  };

  isUserLoggedIn(): boolean {
    return this.userId != undefined;
  }

}
