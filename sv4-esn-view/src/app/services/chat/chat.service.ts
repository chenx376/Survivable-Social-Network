import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import { User } from '../../models/user.model'

@Injectable()
export class ChatService {

  private http: Http;

  private token: string;
  private user: User;

  constructor(http: Http) {
    this.http = http;
  }

  // login = (username: string, password: string): Observable<User> => {
  broadcastMessage = (message: string) => {

    let loggedInUser = localStorage.getItem('loggedInUser');



  };

}
