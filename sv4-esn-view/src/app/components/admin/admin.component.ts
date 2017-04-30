import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from "rxjs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    private targetUserId: string;
    private username: string;
    private password: string;
    private userStatus: boolean;
    private userPrivilege: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private userService: UserService,
                private dialogService: DialogService,
                private viewContainerRef: ViewContainerRef,
                private elementRef: ElementRef) { }

    ngOnInit() {
        this.route.params
          .map(params => params.userId)
          .subscribe(targetUserId => this.targetUserId = targetUserId);
        this.userService.getOneUserInfo(this.targetUserId)
          .subscribe(user => {
              this.username = user.username;
              this.userStatus = user.active;
              this.userPrivilege = user.role;
          });
    }

    updateUserButtonClicked = () => {
        this.userService.adminUserProfile(this.targetUserId, this.username, this.password, this.userStatus, this.userPrivilege)
        .subscribe(
          () => {
            this.dialogService.openAlert(this.viewContainerRef, 'Success', 'Success')
              .subscribe(() => setTimeout(() => this.elementRef.nativeElement.scrollTop = 0, 0));
          },
          err => this.dialogService.openAlert(this.viewContainerRef, 'Error', err.message)
        );
    }
}
