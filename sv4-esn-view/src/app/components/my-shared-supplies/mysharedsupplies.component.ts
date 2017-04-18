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

  supplyContent: EmergencySupply;

  public types = [
    {value: 'medicine', viewValue: 'Medicine'},
    {value: 'food', viewValue: 'Food'},
    {value: 'car', viewValue: 'Car'},
    {value: 'utilities', viewValue: 'Utilities'},
    {value: 'general', viewValue: 'General'}
  ];

  constructor(private suppliesService: EmergencySupplyService,
              private dialogService: DialogService,
              private viewContainerRef: ViewContainerRef,
              private elementRef: ElementRef
  ) {

  }

  ngOnInit() {
    // this.userService.getUserList()
    //   .map(users => users.sort((user1, user2) => {
    //     if (user1.online && !user2.online) {
    //       return -1;
    //     } else if (!user1.online && user2.online) {
    //       return 1;
    //     } else {
    //       if (user1.username > user2.username) {
    //         return 1;
    //       } else if (user1.username < user2.username) {
    //         return -1;
    //       } else {
    //         return 0;
    //       }
    //     }
    //   }))
    //   .subscribe(users => {
    //     this.searchUsersService.reset();
    //     this.searchUsersService.users = users;
    //     this.searchUsersService.updateSearch();
    //   });
  }


  registerSupplyButtonClicked = () => {
    this.suppliesService.registerEmergencySupply(this.supplyContent)
      .subscribe(
        () => {
          //this.supplyContent;
          this.dialogService.openAlert(this.viewContainerRef, 'Success', 'Success')
            .subscribe(() => setTimeout(() => this.elementRef.nativeElement.scrollTop = 0, 0));
        },
        err => this.dialogService.openAlert(this.viewContainerRef, 'Error', err.message)
      );
  }

}
