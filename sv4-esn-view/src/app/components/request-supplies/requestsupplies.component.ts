import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';

import { EmergencySupplyService } from '../../services/emergency-supply/emergencySupply.service';
import {EmergencySupply} from "../../models/emergencySupply.model";
import {SearchEmergencySupplyService} from "../../services/search-emergency-supplies/search-emergency-supply.service";

import {Router} from '@angular/router';

@Component({
  selector: 'app-requestsupplies',
  templateUrl: './requestsupplies.component.html',
  styleUrls: ['./requestsupplies.component.css']
})
export class RequestSuppliesComponent implements OnInit {

  selectedMap = {};
  requestSupplies = {};

  constructor(private suppliesService: EmergencySupplyService,
              private dialogService: DialogService,
              private viewContainerRef: ViewContainerRef,
              private elementRef: ElementRef,
              private searchEmergencySupplyService: SearchEmergencySupplyService,
              private router: Router
  ) {

  }

  ngOnInit() {
    this.suppliesService.allEmergencySupplies()
      .subscribe(supplies => {
        this.searchEmergencySupplyService.reset();
        this.searchEmergencySupplyService.emergencySupplies = supplies;
        this.searchEmergencySupplyService.updateSearch();
      });
  }

  toggleSelection(supply) {
    /*if(this.selectedSuppliesDict[supply.supplyId]) {
      console.log('Unselecting... ' + supply.supplyId);
      delete this.selectedSuppliesDict[supply.supplyId];
    } else {
      console.log('Selecting... ' + supply.supplyId);
      this.selectedSuppliesDict[supply.supplyId] = supply;
    }*/
    console.log(this.selectedMap[supply.supplyId]);
    if(this.selectedMap[supply.supplyId])
      this.requestSupplies[supply.supplyId] = supply;
    else
      this.requestSupplies[supply.supplyId] = null;
  }


  doCheckout = () => {

    let filtered = {};
    for (var property in this.selectedMap) {
      if (this.selectedMap.hasOwnProperty(property)) {
        // do stuff
        if(this.selectedMap[property] === true)
          filtered[property] = this.requestSupplies[property];
      }
    }

    //A6
    if(Object.keys(filtered).length > 0) {
      this.router.navigate(['confirm-supplyreq/' + JSON.stringify(filtered)]);
    } else {
      this.dialogService.openAlert(this.viewContainerRef, 'Error', 'Select one emergency supply to proceed.').subscribe();
    }



  }

}
