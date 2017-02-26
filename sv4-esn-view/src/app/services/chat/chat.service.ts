import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from "rxjs";

import { User } from '../../models/user.model'

import * as io from 'socket.io-client';

@Injectable()
export class ChatService {

  private http: Http;

  private token: string;
  private user: User;

  private socket;

  private endpoint: string;

  constructor( http: Http) {
    this.http = http;
    this.endpoint = "http://localhost:3000";

  }

  // login = (username: string, password: string): Observable<User> => {
  broadcastMessage = (content: string) => {

    let loggedInUser = localStorage.getItem('current_user_id');

    this.http.get(this.endpoint + '/users/'+ loggedInUser).map(res => res.json()).subscribe(res => {

      let message = {
        sender: res,
        message: content,
        receivers: null,
        broadcast: true,
        sent_at: new Date()
      };

      this.socket.emit('public-msg', message);

    });

  };

  retrievePersistedMessages = (done) => {
    this.http.get(this.endpoint + '/messages').map(res => res.json()).subscribe(res => {

      done(res);

    });
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.endpoint);
      this.socket.on('public-msg-broadcast', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }


}
