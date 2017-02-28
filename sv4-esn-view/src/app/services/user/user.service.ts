import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import { User } from '../../models/user.model'

@Injectable()
export class UserService {

  private http: Http;

  private token: string;
  private user: User;

  private endpoint: string;

  constructor(http: Http) {
    this.http = http;
    this.endpoint = "http://localhost:3000";
  }

  // login = (username: string, password: string): Observable<User> => {
  login = (username: string, password: string) => {
    let headers: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.endpoint + '/login', `username=${username}&password=${password}`, options)
      .map(res => res.json())
      .subscribe(res => {
        //console.log(res);
        localStorage.setItem('current_jwt', res.token);
        localStorage.setItem('current_user_id', res.user.id)
      });
  };

  retrieveById = (user_id: string) => {
    return this.http.get(this.endpoint + '/users/'+user_id).map(res => res.json()).subscribe(res => {
      console.log(res);
    });
  }

  retrieveAll = (): Observable<User> => {
     return this.http.get(this.endpoint + '/users/').map(res => res.json());
  }

  update = (user): Observable<void> => {
    return this.http.put(this.endpoint + '/users', user).map(res => res.json());
  }

  create = (user): Observable<void> => {
    return this.http.post(this.endpoint + '/users', user).map(res => res.json());
  }


  // private handleError = (error: any): Observable<any> => {
  //   console.error('An error occurred', error);
  //   return Promise.reject(error.message || error);
  // }

}
