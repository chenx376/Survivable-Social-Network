import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import * as io from 'socket.io-client';
import { HttpService } from '../http/http.service';
import { UserService } from '../user/user.service';
import { Message } from '../../models/message.model';

@Injectable()
export class ChatService {

  //private endpoint = "https://sv4-esn-services.herokuapp.com";
  private endpoint = "http://localhost:3000";

  private socket = io(this.endpoint);

  constructor(private httpService: HttpService,
              private userService: UserService) { }

  subscribeMe = () => {
    let payload = {
      jwt: this.httpService.jwt,
      data: { myself: this.userService.userId }
    };
    this.socket.emit('subscribe', payload);
  };

  getPublicMessages = (): Observable<[Message]> => {
    return this.httpService.get('/messages')
      .map(json => json.map(messageJson => new Message(messageJson)));
  };

  getPrivateMessages = (targetUserId: string): Observable<[Message]> => {
    return this.httpService.get(`/messages/${this.userService.userId}/${targetUserId}`)
      .map(json => json.map(messageJson => new Message(messageJson)));
  };

  sendPublicMessage = (content: string) => {
    let payload = {
      jwt: this.httpService.jwt,
      data: {
        message: {
          sender: this.userService.userId,
          message: content,
          receiver: null,
          broadcast: true,
          sent_at: new Date()
        }
      }
    };
    this.socket.emit('public-msg', payload);
  };

  receivePublicMessage = (): Observable<Message> => {
    return new Observable(observer => {
      this.socket.on('public-msg-sent', json => {
        observer.next(new Message(json));
      });
      return () => {
        this.socket.disconnect();
      };
    });
  };

  sendPrivateMessage = (content: string, targetUserId: string) => {
    let payload = {
      jwt: this.httpService.jwt,
      data: {
        message: {
          sender: this.userService.userId,
          message: content,
          receiver: targetUserId,
          broadcast: false,
          sent_at: new Date()
        }
      }
    };
    this.socket.emit('private-msg', payload);
  };

  receivePrivateMessage = (): Observable<Message> => {

    /**
     * Important NOTICE!
     * This event will only be received if the
     * method subscribeMe( MYSELF_ID ) has been called first.
     *
     * The backend websockets system will orchestrate the notification
     * for specific "CHANNEL_IDS" which in this case is the RECEIVER_ID
     *
     * For our purpose here in the FSE ESN we should call first
     * subscribeMe( loggedUser id )
     *
     * and then expect to receive messages using the private-msg-sent event...
     *
     */
    return new Observable(observer => {
      this.socket.on('private-msg-sent', json => {
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
