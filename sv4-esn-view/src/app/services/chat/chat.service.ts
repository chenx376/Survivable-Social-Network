import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as io from 'socket.io-client';
import { UserService } from '../user/user.service';

import { Observable } from "rxjs";

@Injectable()
export class ChatService {

  private http: Http;
  private userService: UserService;

  private endpoint: string = "http://localhost:3000";

  private socket = io(this.endpoint);

  constructor(http: Http, userService: UserService) {
    this.http = http;
    this.userService = userService;
  }

  broadcastMessage = (content: string) => {
    let payload = {
      jwt: localStorage.getItem('jwt'),
      data: {
        message: {
          sender: null, //This is populated by Socket.io before saving message
          message: content,
          receivers: null,
          broadcast: true,
          sent_at: new Date()
        }
      }
    }

    this.socket.emit('public-msg', payload);
  };

  retrievePersistedMessages = (done) => {
    this.http.get(this.endpoint + '/messages')
      .map(res => res.json())
      .subscribe(res => {
        done(res);
    });
  };

  getMessages = () => {
    let observable = new Observable(observer => {
      this.socket.on('public-msg-broadcast', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
