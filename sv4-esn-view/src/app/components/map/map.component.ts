import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../../services/user/user.service';
declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {

    navigator.geolocation.getCurrentPosition(position => {
      let center = { lat: position.coords.latitude, lng: position.coords.longitude };

      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: center
      });

      this.userService.getUserList()
        .subscribe(users => {
          users
            .filter(user => user.latitude !== 0 && user.longitude !== 0)
            .forEach(user => {
              let marker = new google.maps.Marker({ position: { lat: user.latitude, lng: user.longitude }, label: user.username, map: map });
              marker.addListener('click', () => {
                this.router.navigateByUrl(`chat/${user.userId}`);
              });
            });
        });
    });

  }

}
