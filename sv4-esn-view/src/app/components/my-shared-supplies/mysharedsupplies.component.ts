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
    {type: 'Medicine'},
    {type: 'Food'},
    {type: 'Car'},
    {type: 'Utilities'},
    {type: 'General'}
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
    this.supplyContent.type = this.selectedType;
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
