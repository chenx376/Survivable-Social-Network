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
  }

}
