import { User } from './user.model';

export class Message {

  messageId: string;
  sender: User;
  receivers: [string];
  content: string;
  date: Date;
  broadcast: boolean;

  constructor(json: any) {
    this.messageId = json._id;
    this.sender = new User(json.sender);
    this.receivers = json.receivers;
    this.content = json.message;
    this.date = new Date(json.sent_at);
    this.broadcast = json.broadcast;
  }

}
