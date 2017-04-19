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

    constructor(private router: Router,
                private route: ActivatedRoute,
                private emailService: EmailService,
                private dialogService: DialogService,
                private viewContainerRef: ViewContainerRef,
                private elementRef: ElementRef) { }

    ngOnInit() {
        this.route.params
          .map(params => params.userId)
          .subscribe(targetUserId => this.targetUserId = targetUserId);
    }

    sendEmailButtonClicked = () => {
        this.emailService.sendEmail(this.title, this.content, this.targetUserId)
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
