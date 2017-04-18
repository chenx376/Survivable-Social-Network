import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { HttpService } from '../http/http.service';
import { EmergencySupply } from '../../models/emergencySupply.model'
import { UserService } from '../user/user.service';

@Injectable()
export class EmergencySupplyService {

  // private endpoint = "https://sv4-esn-services.herokuapp.com";
  private endpoint = "http://192.168.0.111:3000";

  private socket = io(this.endpoint);


  constructor(private httpService: HttpService,
              private userService: UserService) { }

  getEmergencySupplies = (): Observable<[EmergencySupply]> => {
    return this.httpService.get('/supplies/')
      .map(json => json.map(supplyJson => new EmergencySupply(supplyJson)));
  };

  registerEmergencySupply = (content: any): Observable<void> => {
    content.supplier = this.userService.userId;
    return this.httpService.post('/supplies/', content);
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
