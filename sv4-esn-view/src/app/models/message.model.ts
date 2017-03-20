import { User, UserStatus } from './user.model';

export class Message {

  messageId: string;
  sender: User;
  receivers: [string];
  content: string;
  date: Date;
  broadcast: boolean;
  userStatus: UserStatus;
  userStatusInformation: string;

  constructor(json: any) {
    this.messageId = json._id;
    this.sender = new User(json.sender);
    this.receivers = json.receivers;
    this.content = json.message;
    this.date = new Date(json.sent_at);
    this.broadcast = json.broadcast;
    this.userStatus = json.user_status;
    this.userStatusInformation = json.user_status_information;
  }

}
