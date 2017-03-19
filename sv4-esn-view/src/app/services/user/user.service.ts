import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
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

  isUserLoggedIn = (): boolean => this.userId != undefined;

  login = (username: string, password: string): Observable<void> => {
    return this.httpService.post('/login', { username, password })
      .do(json => {
        this.userId = json.id;
        this.httpService.jwt = json.token;
        localStorage.setItem('jwt', json.token);
        localStorage.setItem('user_id', json.id);

        this.getUserInfo(this.userId);
      });
  };

  logout = (): Observable<void> => {
    return this.httpService.put(`/users/${this.userId}`, { id: this.user.userId, online: false })
      .do(json => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user_id');
        this.userId = null;
        this.user = null;
        this.httpService.jwt = null;
      });
  };

  createUser = (username: string, password: string): Observable<void> => {
    return this.httpService.post('/users', { username, password });
  };

  getUserList = (): Observable<[User]> => {
    return this.httpService.get('/users/')
      .map(json => json.map(userJson => new User(userJson)));
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

  getAvatarUrl = (username: string): string => `assets/img/avatar/avatar_tile_${username.charAt(0).toLowerCase()}_56.png`;

}
