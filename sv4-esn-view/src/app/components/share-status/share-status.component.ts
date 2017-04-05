import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { UserStatus } from '../../models/user.model';

@Component({
  selector: 'app-share-status',
  templateUrl: './share-status.component.html',
  styleUrls: ['./share-status.component.css']
})
export class ShareStatusComponent implements OnInit {

  selectedStatus = UserStatus.OK;
  information = '';

  constructor(private userService: UserService,
              private dialogService: DialogService,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {

  }

  statusOKSelected = () => this.selectedStatus = UserStatus.OK;

  statusHelpSelected = () => this.selectedStatus = UserStatus.Help;

  statusEmergencySelected = () => this.selectedStatus = UserStatus.Emergency;

  shareStatusButtonClicked = () => {
    this.userService.shareStatus(this.selectedStatus, this.information)
      .subscribe(
        () => {
          this.information = '';
          this.dialogService.openAlert(this.viewContainerRef, 'Success', 'Success');
        },
        err => this.dialogService.openAlert(this.viewContainerRef, 'Error', err.message)
      );
  }

}
