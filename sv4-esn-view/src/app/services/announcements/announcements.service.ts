import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { HttpService } from '../http/http.service';
import { Announcement } from '../../models/announcement.model'
import { UserService } from '../user/user.service';

@Injectable()
export class AnnouncementsService {


  private endpoint = "https://sv4-esn-services.herokuapp.com";
  // private endpoint = "http://localhost:3000";
  private socket = io(this.endpoint);

  constructor(private httpService: HttpService,
              private userService: UserService) { }

  getAnnouncements = (): Observable<[Announcement]> => {
    return this.httpService.get('/announces/')
      .map((json) => {
          return json.map((announcementsJson) => {
            return new Announcement(announcementsJson);
          });
      });
  };

  publishAnnouncement = (content: string): Observable<void> => {
    return this.httpService.post('/announces/', { content, announcer: this.userService.userId });
  };

  listenToAnnouncementEvent = (): Observable<Announcement> => {
    return new Observable(observer => {
      this.socket.on('public-announcement-sent', json => {
        observer.next(new Announcement(json));
      });
    });
  };

  formatDate = (date: Date): string => {
    let hour = ('0' + date.getHours()).slice(-2);
    let minute = ('0' + date.getMinutes()).slice(-2);
    let second = ('0' + date.getSeconds()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return `${date.getFullYear()}/${month}/${day} ${hour}:${minute}:${second}`;
  }

}
