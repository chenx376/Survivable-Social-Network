import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Config} from '../app.config'

@Injectable()
export class UsersService {

  users: string;

  constructor(private http: Http) { }

  retrieveAll(callback) {
    this.http.get(Config.API_ENDPOINT)
      .map(res => res.text())
      .subscribe(
      data => this.users = data,
      err => console.log(err),
      () => callback(this.users)
      );
  }

  getUsers() {
    return this.users;
  }

}
