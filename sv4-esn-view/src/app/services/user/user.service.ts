import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpService } from '../http/http.service';
import * as createHash from 'sha.js';

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
    let sha256 = createHash('sha256');
    let hashedPassword = sha256.update(password, 'utf8').digest('hex');
    return this.httpService.post('/login', { username, password: hashedPassword })
      .do(json => {
        this.userId = json.id;
        this.httpService.jwt = json.token;
        localStorage.setItem('jwt', json.token);
        localStorage.setItem('user_id', json.id);

        this.getUserInfo(this.userId);
      });
  };

  createUser = (username: string, password: string): Observable<void> => {
    let sha256 = createHash('sha256');
    let hashedPassword = sha256.update(password, 'utf8').digest('hex');
    return this.httpService.post('/users', { username, password: hashedPassword });
  };

  getUserInfo = (userId: string): ReplaySubject<User> => {
    let replaySubject = new ReplaySubject<User>(1);
    this.httpService.get(`/users/${userId}`)
      .subscribe(json => {
        this.user = new User(json);
        replaySubject.next(this.user);
      });
    return replaySubject;
  };

  isUserLoggedIn = (): boolean => this.userId != undefined;

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
