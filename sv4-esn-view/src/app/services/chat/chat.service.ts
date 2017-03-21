import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { Observable } from "rxjs";
import * as io from 'socket.io-client';
import { HttpService } from '../http/http.service';
import { UserService } from '../user/user.service';
import { Message } from '../../models/message.model';

@Injectable()
export class ChatService {

  private router: Router;
  private httpService: HttpService;
  private userService: UserService;

  //private endpoint = "https://sv4-esn-services.herokuapp.com";
  private endpoint = "http://localhost:3000";

  private socket = io(this.endpoint);

  constructor(router: Router,
              httpService: HttpService,
              userService: UserService) {
    this.router = router;
    this.httpService = httpService;
    this.userService = userService;
  }

  getPublicMessages = (): Observable<[Message]> => {
    return this.httpService.get('/messages')
      .map(json => json.map(messageJson => new Message(messageJson)));
  };

  getPrivateMessages = (targetUserId: string): Observable<[Message]> => {
    return this.httpService.get(`/messages/${this.userService.userId}/${targetUserId}`)
      .map(json => json.map(messageJson => new Message(messageJson)));
  };

  broadcastMessage = (content: string) => {
    let payload = {
      jwt: this.httpService.jwt,
      data: {
        message: {
          sender: this.userService.userId,
          message: content,
          receivers: null,
          broadcast: true,
          sent_at: new Date()
        }
      }
    };
    this.socket.emit('public-msg', payload);
  };

  receiveMessage = (): Observable<Message> => {
    return new Observable(observer => {
      this.socket.on('public-msg-sent', json => {
        observer.next(new Message(json));
      });
      return () => {
        this.socket.disconnect();
      };
    });
  };

  formatDate = (date: Date):string => {
    let hour = ('0' + date.getHours()).slice(-2);
    let minute = ('0' + date.getMinutes()).slice(-2);
    let second = ('0' + date.getSeconds()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return `${date.getFullYear()}/${month}/${day} ${hour}:${minute}:${second}`;
  }

}
