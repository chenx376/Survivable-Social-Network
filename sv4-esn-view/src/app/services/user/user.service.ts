import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { HttpService } from '../http/http.service';
import { User, UserStatus } from '../../models/user.model'

@Injectable()
export class UserService {

  userId: string = localStorage.getItem('user_id');
  user: User;

  isUserLoggedInSubject = new BehaviorSubject<boolean>(false);
  userInfoSubject = new ReplaySubject<User>(1);

  constructor(private httpService: HttpService) {
    if (this.isUserLoggedIn()) {
      this.isUserLoggedInSubject.next(true);
      this.getUserInfo(this.userId);
    }
  }

  isUserLoggedIn = (): boolean => this.userId !== null;

  login = (username: string, password: string): Observable<void> => {
    return this.httpService.post('/login', { username, password })
      .do(json => {
        this.userId = json.id;
        this.httpService.jwt = json.token;
        localStorage.setItem('jwt', json.token);
        localStorage.setItem('user_id', json.id);

        this.isUserLoggedInSubject.next(true);
        this.getUserInfo(this.userId);
      });
  };

  logout = (): Observable<void> => {
    return this.httpService.put(`/users/${this.userId}`, { online: false })
      .do(() => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user_id');
        this.userId = null;
        this.user = null;
        this.httpService.jwt = null;

        this.isUserLoggedInSubject.next(false);
      });
  };

  createUser = (username: string, password: string): Observable<void> => {
    return this.httpService.post('/users', { username, password });
  };

  getUserList = (): Observable<[User]> => {
    return this.httpService.get('/users/')
      .map(json => json.map(userJson => new User(userJson)));
  };

  getUserInfo = (userId: string) => {
    this.httpService.get(`/users/${userId}`)
      .subscribe(json => {
        this.user = new User(json);
        this.userInfoSubject.next(this.user);
      });
  };

  getAvatarUrl = (username: string): string => `assets/img/avatar/avatar_tile_${username.charAt(0).toLowerCase()}_56.png`;

  shareStatus = (status: UserStatus, information: string): Observable<void> => {
    return this.httpService.put(`/users/${this.userId}`, { status, status_information: information });
  };

  updateLocation = (name: string, description: string, latitude: number, longitude: number): Observable<void> => {
    return this.httpService.put(`/users/${this.userId}`, { locationName: name, locationDescription: description, latitude, longitude });
  };

  updateSettings = (email: string, subscription: boolean): Observable<void> => {
    return this.httpService.put(`/users/${this.userId}`, { email: email, subscription: subscription });
  }

}
