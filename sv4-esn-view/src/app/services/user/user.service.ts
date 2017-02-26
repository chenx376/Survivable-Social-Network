import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import { User } from '../../models/user.model'

@Injectable()
export class UserService {

  private http: Http;

  private token: string;
  private user: User;

  constructor(http: Http) {
    this.http = http;
  }

  // login = (username: string, password: string): Observable<User> => {
  login = (username: string, password: string) => {
    let headers: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://172.29.93.189:3000/login', `username=${username}&password=${password}`, options)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
      });
  };

  validateSessionId = (sessionId: string) => {

  };

  // private handleError = (error: any): Observable<any> => {
  //   console.error('An error occurred', error);
  //   return Promise.reject(error.message || error);
  // }

}
