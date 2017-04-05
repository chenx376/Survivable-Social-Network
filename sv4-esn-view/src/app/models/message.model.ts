import { User, UserStatus } from './user.model';

export class Message {

  messageId: string;
  sender: User;
  receiver: User;
  content: string;
  date: Date;
  broadcast: boolean;
  userStatus: UserStatus;
  userStatusInformation: string;

  constructor(json: any) {
    this.messageId = json._id;
    if (json.sender) {
      this.sender = new User(json.sender);
    }
    if (json.receiver) {
      this.receiver = new User(json.receiver);
    }
    this.content = json.message;
    this.date = new Date(json.sent_at);
    this.broadcast = json.broadcast;
    this.userStatus = json.user_status;
    this.userStatusInformation = json.user_status_information;
  }

}
