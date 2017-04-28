import { User } from './user.model';

export class Note {

  noteId: string;
  content: string;
  date: Date;
  sender: User;
  note_title: string;

  constructor(json: any) {
    this.noteId = json._id;
    this.content = json.content;
    this.note_title = json.note_title;
    this.date = new Date(json.created_at);
    this.sender = new User(json.sender);
  }
}


