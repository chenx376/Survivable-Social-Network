enum UserStatus {
  Undefined = 0,
  OK = 1,
  Help = 2,
  Emergency = 3,
}

export class User {

  userId: string;
  username: string;
  status: UserStatus = UserStatus.Undefined;
  online: boolean = false;

  constructor(json: any) {
    this.userId = (json._id)?json._id:null;
    this.username = json.username;
    this.status = json.status;
    this.online = json.online;
  }

  userStatusString = (): string => {
    switch (this.status) {
      case UserStatus.Undefined: return 'Undefined';
      case UserStatus.OK: return 'OK';
      case UserStatus.Help: return 'Help';
      case UserStatus.Emergency: return 'Emergency';
    }
  }

}
