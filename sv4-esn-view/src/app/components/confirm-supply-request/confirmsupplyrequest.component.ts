import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-confirmsupplyrequest',
  templateUrl: 'confirmsupplyrequest.component.html',
  styleUrls: ['confirmsupplyrequest.component.css']
})
export class ConfirmSupplyRequest implements OnInit {

  constructor(/*private suppliesService: MySharedSuppliesService*/) { }

  ngOnInit() {

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: {lat: -25.363, lng: 131.044}
    });

    var marker = new google.maps.Marker({
      position: {lat: -25.363, lng: 131.044},
      map: map
    });


  }

}
