/**
 * Created by xiaochen on 4/18/17.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { Note } from '../../models/note.model';
import { UserService } from '../user/user.service';

@Injectable()
export class NoteService {

  private endpoint = "http://localhost:3000";
  // private endpoint = "http://172.29.95.49:3000";

  constructor(private httpService: HttpService,
              private userService: UserService) { }

  getNotes = (): Observable<[Note]> => {
    return this.httpService.get(`/notes/user/${this.userService.userId}`)
      .map((json) => {
        return json.map((notesJson) => {
          return new Note(notesJson);
        });
      });
  };

  publishNote = (content: string): Observable<void> => {
    return this.httpService.post('/notes/', { content, sender: this.userService.userId });
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
