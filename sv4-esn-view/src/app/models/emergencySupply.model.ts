import { User } from './user.model';

export class EmergencySupply {

  supplyId: string;
  supplyname: string;
  location_text: string;
  location_lat: string;
  location_lng: string;
  type: string;
  created_at: Date;
  supplier: User;

  constructor(json: any) {
    this.supplyId = json._id;
    this.supplyname = json.supplyname;
    this.location_text = json.location_text;
    this.location_lat = json.location_lat;
    this.location_lng = json.location_lng;
    this.type = json.type;
    this.created_at = json.created_at;
    if (json.supplier) {
      this.supplier = new User(json.supplier);
    }
  }

}
