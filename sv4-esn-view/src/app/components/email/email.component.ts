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

    constructor(private router: Router,
                private route: ActivatedRoute,
                private emailService: EmailService,
                private dialogService: DialogService,) { }

    ngOnInit() {
        this.route.params
          .map(params => params.userId)
          .subscribe(targetUserId => this.targetUserId = targetUserId);
    }

    sendEmail() {
        
    }
}
