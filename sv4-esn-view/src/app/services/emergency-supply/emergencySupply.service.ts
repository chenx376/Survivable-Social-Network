import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { HttpService } from '../http/http.service';
import { EmergencySupply } from '../../models/emergencySupply.model'
import { UserService } from '../user/user.service';

@Injectable()
export class EmergencySupplyService {

  private endpoint = "https://sv4-esn-services.herokuapp.com";

  private socket = io(this.endpoint);


  constructor(private httpService: HttpService,
              private userService: UserService) { }

  allEmergencySupplies = (): Observable<[EmergencySupply]> => {
    return this.httpService.get('/supplies/')
      .map(json => json.map(supplyJson => new EmergencySupply(supplyJson)));
  };

  mySharedSupplies = (): Observable<[EmergencySupply]> => {
    return this.httpService.get('/supplies/user/' + this.userService.userId)
      .map(json => json.map(supplyJson => new EmergencySupply(supplyJson)));
  };

  registerEmergencySupply = (content: any): Observable<void> => {
    content.supplier = this.userService.userId;
    return this.httpService.post('/supplies/', content);
  };

  deleteEmergencySupply = (idToDelete: any): Observable<void> => {
    return this.httpService.delete('/supplies/' + idToDelete);
  }

  formatDate = (date: Date): string => {
    let hour = ('0' + date.getHours()).slice(-2);
    let minute = ('0' + date.getMinutes()).slice(-2);
    let second = ('0' + date.getSeconds()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return `${date.getFullYear()}/${month}/${day} ${hour}:${minute}:${second}`;
  }

}
