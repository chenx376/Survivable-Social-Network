import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { UserService } from '../user/user.service';
import { HttpService } from '../http/http.service';

import { Observable } from "rxjs";

@Injectable()
export class ChatService {

  private httpService: HttpService;
  private userService: UserService;

  private endpoint: string = "http://localhost:3000";

  private socket = io(this.endpoint);

  constructor(httpService: HttpService, userService: UserService) {
    this.httpService = httpService;
    this.userService = userService;
  }

  broadcastMessage = (content: string) => {
    let payload = {
      jwt: localStorage.getItem('jwt'),
      data: {
        message: {
          sender: localStorage.getItem('user_id'), //This is populated by Socket.io before saving message
          message: content,
          receivers: null,
          broadcast: true,
          sent_at: new Date()
        }
      }
    };

    this.socket.emit('public-msg', payload);
  };

  retrievePersistedMessages = (done) => {
    this.httpService.get('/messages')
      .subscribe(res => {
        done(res);
      });
  };

  getMessages = () => {
    let observable = new Observable(observer => {
      this.socket.on('public-msg-sent', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
