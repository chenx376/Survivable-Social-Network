import { User } from './user.model';

export class Announcement {

  announcementId: string;
  content: string;
  date: Date;
  publisher: User;

  constructor(json: any) {
    this.announcementId = json._id;
    this.content = json.content;
    this.date = new Date(json.created_at);
    this.publisher = new User(json.announcer);
  }

}
