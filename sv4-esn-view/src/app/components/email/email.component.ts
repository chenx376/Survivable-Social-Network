import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { EmailService } from '../../services/email/email.service';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

    constructor(private dialogService: DialogService,
                private viewContainerRef: ViewContainerRef,
                private elementRef: ElementRef) { }

    ngOnInit() {
    }
}
