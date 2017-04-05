export enum UserStatus {
  Undefined = 0,
  OK = 1,
  Help = 2,
  Emergency = 3,
}

export class User {

  userId: string;
  username: string;
  status: UserStatus = UserStatus.Undefined;
  statusInformation: string;
  online: boolean = false;

  constructor(json: any) {
    this.userId = json._id;
    this.username = json.username;
    this.status = json.status;
    this.statusInformation = json.status_information;
    this.online = json.online;
  }

}
