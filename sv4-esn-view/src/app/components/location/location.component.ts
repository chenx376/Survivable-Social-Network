import { Component, OnInit, NgZone, ViewContainerRef } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { DialogService } from '../../services/dialog/dialog.service';
declare let google: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  locationName = '';
  locationDescription = '';
  private latitude = 0;
  private longgitude = 0;

  constructor(private userService: UserService,
              private dialogService: DialogService,
              private zone: NgZone,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.latitude = position.coords.latitude;
      this.longgitude = position.coords.longitude;

      let center = { lat: this.latitude, lng: this.longgitude };
      let geocoder = new google.maps.Geocoder;
      geocoder.geocode({ 'location': center }, (results: object[], status: string) => {
        if (status === 'OK' && results.length > 0) {
          this.zone.run(() => this.locationName = results[0]['formatted_address']);
        }
      });
    });
  }

  updateLocationButtonClicked = () => {
    this.userService.updateLocation(this.locationName, this.locationDescription, this.latitude, this.longgitude)
      .subscribe(
        () => {
          this.locationName = '';
          this.locationDescription = '';
          this.dialogService.openAlert(this.viewContainerRef, 'Success', 'Success');
        },
        err => this.dialogService.openAlert(this.viewContainerRef, 'Error', err.message)
      );
  }

}
