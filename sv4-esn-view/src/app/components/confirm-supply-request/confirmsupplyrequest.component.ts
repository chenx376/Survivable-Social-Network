import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import {UserService} from "../../services/user/user.service";
import {ChatService} from "../../services/chat/chat.service";
import { DialogService } from '../../services/dialog/dialog.service';

declare var google: any;

@Component({
  selector: 'app-confirmsupplyrequest',
  templateUrl: 'confirmsupplyrequest.component.html',
  styleUrls: ['confirmsupplyrequest.component.css']
})
export class ConfirmSupplyRequest implements OnInit {

  requestedSuppliesMap = {}; //user -> EmergencySupply map

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private chatService: ChatService,
              private dialogService: DialogService,
              private viewContainerRef: ViewContainerRef,
  ) {

  }

  ngOnInit() {

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: {lat: 37.4103612, lng: -122.0605276}
    });

    var bounds = new google.maps.LatLngBounds();

    this.route.params
      .map(params => params.reqjson)
      .subscribe(reqjson => {
        let input = JSON.parse(reqjson);
        for (var property in input) {
          if (input.hasOwnProperty(property)) {
            //This map will contain a grouped version of the supplies by user
            let arr = this.requestedSuppliesMap[input[property].supplier.userId];
            if(!arr)
              arr = [];
            arr.push(input[property]);
            this.requestedSuppliesMap[input[property].supplier.userId] = arr;

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

  mapKeys= () => {
    return Object.keys(this.requestedSuppliesMap);
  }

  confirmRequest= () => {
    // console.log(
    //   'confirming'
    // );
    for(let i in this.requestedSuppliesMap) {

         //I HAVE EVERYTHING I NEED TO COMPLETE YOUR REQUEST
         console.log(this.requestedSuppliesMap);
         if (this.requestedSuppliesMap.hasOwnProperty(i)) {
            //console.log(this.requestedSuppliesMap[i]);
           let msg = `Hi, I saw you have some emergency supplies available for sharing. <br /> <br /> I am interested in the following items: <br /> <br />`;
           let targetUsr = this.requestedSuppliesMap[i][0].supplier.userId;
             for(let k in this.requestedSuppliesMap[i])
               msg += `<md-list-item>- ` + this.requestedSuppliesMap[i][k].supplyname + `</md-list-item><br />`;

           this.chatService.sendPrivateMessage(msg, targetUsr);
         }
       }
    this.dialogService.openDialogue(this.viewContainerRef,
      'Success',
      `Howdy! All set, we contacted the suppliers, expect to hear from them soon.`)
      .filter(result => result === true)
      .subscribe(() => this.router.navigateByUrl(`request-supplies`))

  }

}
