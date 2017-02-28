import { User } from './user.model';

export class Message {

  constructor(json: any) {

  }

  messageId: string;
  sender: User;
  receivers: [string];
  content: string;
  date: Date;

}
