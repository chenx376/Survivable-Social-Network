import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';

import { EmergencySupplyService } from '../../services/emergency-supply/emergencySupply.service';
import {EmergencySupply} from "../../models/emergencySupply.model";

@Component({
  selector: 'app-mysharedsupplies',
  templateUrl: './mysharedsupplies.component.html',
  styleUrls: ['./mysharedsupplies.component.css']
})
export class MySharedSuppliesComponent implements OnInit {

  supplyContent: any;
  mySupplies: EmergencySupply[];

  public types = [
    {value: '', viewValue: 'Select one'},
    {value: 'Medicine', viewValue: 'Medicine'},
    {value: 'Food', viewValue: 'Food'},
    {value: 'Car', viewValue: 'Car'},
    {value: 'Utilities', viewValue: 'Utilities'},
    {value: 'General', viewValue: 'General'}
  ];

  selectedType = '';

  constructor(private suppliesService: EmergencySupplyService,
              private dialogService: DialogService,
              private viewContainerRef: ViewContainerRef,
              private elementRef: ElementRef
  ) {
    this.supplyContent = {};
  }

  ngOnInit() {
    this.suppliesService.mySharedSupplies()
      .subscribe(supplies => {
        this.mySupplies = supplies;
      });

  }

  registerSupplyButtonClicked = () => {

    /**
     * VALIDATIONS
     */

    //A2
    if(this.supplyContent.type === null || this.supplyContent.type === 0 || this.supplyContent.type === 'Select' || this.supplyContent.type === undefined || this.supplyContent.type === '') {
      this.dialogService.openAlert(this.viewContainerRef, 'Error', 'Emergency supply must contain one category.').subscribe();
      return;
    }

    //A3
    for(let i in this.mySupplies) {
      console.log(i);
      if (this.supplyContent.supplyname === this.mySupplies[i].supplyname) {
        this.dialogService.openAlert(this.viewContainerRef, 'Error', 'You already share this item, repeated items are not allowed.').subscribe();
        return;
      }
    }

    //A4
    if(this.supplyContent.supplyname.length <= 3) {
      this.dialogService.openAlert(this.viewContainerRef, 'Error', 'Every supply must have a name containing more than three characters.').subscribe();
      return;
    }

    //EXTRA
    if(this.supplyContent.location_text.length == 0) {
      this.dialogService.openAlert(this.viewContainerRef, 'Error', 'Provide the location for your supply.').subscribe();
      return;
    }

    this.suppliesService.registerEmergencySupply(this.supplyContent)
      .subscribe(
        created => {
          //this.supplyContent;
          this.mySupplies.unshift(new EmergencySupply(created));
          this.dialogService.openAlert(this.viewContainerRef, 'Success', 'Success')
            .subscribe(() => setTimeout(() => this.elementRef.nativeElement.scrollTop = 0, 0));
        },
        err => this.dialogService.openAlert(this.viewContainerRef, 'Error', err.message)
      );
  }

}
