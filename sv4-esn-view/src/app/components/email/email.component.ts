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
        this.route.params
          .map(params => params.statusId)
          .subscribe(statusId => this.statusId = statusId);
    }

    sendEmailButtonClicked = () => {
        if(this.isGroup) {
            this.emailService.getReceiversGroupInStatus(this.statusId)
                .map(users => users.sort((user1, user2) => {
                  if (user1.online && !user2.online) {
                    return -1;
                  } else if (!user1.online && user2.online) {
                    return 1;
                  } else {
                    if (user1.username > user2.username) {
                      return 1;
                    } else if (user1.username < user2.username) {
                      return -1;
                    } else {
                      return 0;
                    }
                  }
                }))
                .subscribe(users => {
                  console.log(users);
                  var m_receivers_group = [];
                  users.forEach(function(user){
                      m_receivers_group.push(user.userId);
                  })
                  this.emailService.sendGroupEmail(this.title, this.content, m_receivers_group)
                    .subscribe(
                      () => {
                        this.title = '';
                        this.content = '';
                        this.dialogService.openAlert(this.viewContainerRef, 'Success', 'Success')
                          .subscribe(() => setTimeout(() => this.elementRef.nativeElement.scrollTop = 0, 0));
                      },
                      err => this.dialogService.openAlert(this.viewContainerRef, 'Partial Success', err.message)
                    );
                });
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
