import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

declare var google: any;

@Component({
  selector: 'app-confirmsupplyrequest',
  templateUrl: 'confirmsupplyrequest.component.html',
  styleUrls: ['confirmsupplyrequest.component.css']
})
export class ConfirmSupplyRequest implements OnInit {

  requestedSupplies = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              ) { }

  ngOnInit() {

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      //center: {lat: -25.363, lng: 131.044}
    });

    /*var marker = new google.maps.Marker({
      position: {lat: -25.363, lng: 131.044},
      map: map
    }); */

    var bounds = new google.maps.LatLngBounds();

    this.route.params
      .map(params => params.reqjson)
      .subscribe(reqjson => {
        let input = JSON.parse(reqjson);
        for (var property in input) {
          if (input.hasOwnProperty(property)) {
            // do stuff
            this.requestedSupplies.push(input[property]);
            if(input[property].location_lat && input[property].location_lng) {
              let marker = new google.maps.Marker({
                position: {
                  lat: parseFloat(input[property].location_lat),
                  lng: parseFloat(input[property].location_lng)
                },
                map: map
              });
              bounds.extend(marker.getPosition());
            }
          }
        }
        map.fitBounds(bounds);
        map.setZoom(15);
      });
  }

}
