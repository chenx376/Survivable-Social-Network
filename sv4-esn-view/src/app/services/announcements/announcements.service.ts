import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { Announcement } from '../../models/announcement.model'
import { UserService } from '../user/user.service';

@Injectable()
export class AnnouncementsService {

  constructor(private httpService: HttpService,
              private userService: UserService) { }

  getAnnouncements = (): Observable<[Announcement]> => {
    return this.httpService.get('/announces/')
      .map(json => json.map(announcementsJson => new Announcement(announcementsJson)));
  };

  publishAnnouncement = (content: string): Observable<void> => {
    return this.httpService.post('/announces/', { content, announcer: this.userService.userId });
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
