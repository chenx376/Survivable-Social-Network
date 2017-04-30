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
  locationName: string;
  locationDescription: string;
  latitude: number;
  longitude: number;
  active: boolean;
  role: string;
  password: string;

  constructor(json: any) {
    this.userId = json._id;
    this.username = json.username;
    this.status = json.status;
    this.statusInformation = json.status_information;
    this.online = json.online;
    this.locationName = json.locationName;
    this.locationDescription = json.locationDescription;
    this.latitude = json.latitude;
    this.longitude = json.longitude;
    this.active = json.active;
    this.role = json.role;
    this.password = json.password;
  }

}
