import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import * as io from 'socket.io-client';
import { HttpService } from '../http/http.service';
import { UserService } from '../user/user.service';
import { Message } from '../../models/message.model';

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

  getPublicMessages = (): Observable<[Message]> => {
    return this.httpService.get('/messages')
      .do(json => console.log(json))
      .map(json => json.map(messageJson => new Message(messageJson)));
  };

  broadcastMessage = (content: string) => {
    let payload = {
      jwt: this.httpService.jwt,
      data: {
        message: {
          sender: this.httpService.jwt,
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

}
