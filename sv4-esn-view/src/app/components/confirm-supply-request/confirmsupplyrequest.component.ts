import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

declare var google: any;

@Component({
  selector: 'app-confirmsupplyrequest',
  templateUrl: 'confirmsupplyrequest.component.html',
  styleUrls: ['confirmsupplyrequest.component.css']
})
export class ConfirmSupplyRequest implements OnInit {

  requestedSupplies = {};

  constructor(private router: Router,
              private route: ActivatedRoute,
              ) { }

  ngOnInit() {

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: {lat: -25.363, lng: 131.044}
    });

    var marker = new google.maps.Marker({
      position: {lat: -25.363, lng: 131.044},
      map: map
    });

    this.route.params
      .map(params => params.reqjson)
      .subscribe(reqjson => this.requestedSupplies = JSON.parse(reqjson));

  }

}
