import { User } from './user.model';

export class Announcement {

  announcementId: string;
  content: string;
  date: Date;
  publisher: User;

  constructor(json: any) {

    if(!json)
      throw 'You are trying to create Announcement Model with a null JSON';

    this.announcementId = json._id;
    this.content = json.content;
    this.date = new Date(json.created_at);

    if(json.announcer)
      this.publisher = new User(json.announcer);
    else
     this.publisher = null;
  }

}
