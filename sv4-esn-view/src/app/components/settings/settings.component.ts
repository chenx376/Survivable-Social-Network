import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { UserStatus } from '../../models/user.model';

@Component({
  selector: 'app-share-status',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  subscriptionChosen = false;
  emailAddress = '';

  constructor(private userService: UserService,
              private dialogService: DialogService,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {

  }

  updateSettingsButtonClicked = () => {
    this.userService.updateSettings(this.emailAddress, this.subscriptionChosen)
      .subscribe(
        () => {
          this.emailAddress = '';
          this.dialogService.openAlert(this.viewContainerRef, 'Success', 'Success');
        },
        err => this.dialogService.openAlert(this.viewContainerRef, 'Error', err.message)
      );
  }

}
