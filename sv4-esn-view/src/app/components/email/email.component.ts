import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { EmailService } from '../../services/email/email.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from "rxjs";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

    private targetUserId: string;
    private title: string;
    private content: string;
    private isGroup = false;
    private statusId: number;
    private receivers_group = ["58f552d0861f08cff81f057a"];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private emailService: EmailService,
                private dialogService: DialogService,
                private viewContainerRef: ViewContainerRef,
                private elementRef: ElementRef) { }

    ngOnInit() {
        this.route.url
          .map(url => url[url.length - 2].path)
          .filter(path => path === 'status')
          .subscribe(() => this.isGroup = true);
        this.route.params
          .map(params => params.userId)
          .subscribe(targetUserId => this.targetUserId = targetUserId);
    }

    sendEmailButtonClicked = () => {
        if(this.isGroup) {
            this.emailService.sendGroupEmail(this.title, this.content, this.receivers_group)
              .subscribe(
                () => {
                  this.title = '';
                  this.content = '';
                  this.dialogService.openAlert(this.viewContainerRef, 'Success', 'Success')
                    .subscribe(() => setTimeout(() => this.elementRef.nativeElement.scrollTop = 0, 0));
                },
                err => this.dialogService.openAlert(this.viewContainerRef, 'Error', err.message)
              );
        }
        else {
            this.emailService.sendIndividualEmail(this.title, this.content, this.targetUserId)
              .subscribe(
                () => {
                  this.title = '';
                  this.content = '';
                  this.dialogService.openAlert(this.viewContainerRef, 'Success', 'Success')
                    .subscribe(() => setTimeout(() => this.elementRef.nativeElement.scrollTop = 0, 0));
                },
                err => this.dialogService.openAlert(this.viewContainerRef, 'Error', err.message)
              );
        }
    }
}
