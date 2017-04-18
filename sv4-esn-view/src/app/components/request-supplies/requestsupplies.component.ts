import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';

import { EmergencySupplyService } from '../../services/emergency-supply/emergencySupply.service';
import {EmergencySupply} from "../../models/emergencySupply.model";
import {SearchEmergencySupplyService} from "../../services/search-emergency-supplies/search-emergency-supply.service";

@Component({
  selector: 'app-requestsupplies',
  templateUrl: './requestsupplies.component.html',
  styleUrls: ['./requestsupplies.component.css']
})
export class RequestSuppliesComponent implements OnInit {

  selectedSuppliesDict = {};

  constructor(private suppliesService: EmergencySupplyService,
              private dialogService: DialogService,
              private viewContainerRef: ViewContainerRef,
              private elementRef: ElementRef,
              private searchEmergencySupplyService: SearchEmergencySupplyService,
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
    console.log(this.selectedSuppliesDict);
  }

}
