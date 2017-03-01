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

  constructor(json: any) {
    this.userId = json._id;
    this.username = json.username;
  }

}
