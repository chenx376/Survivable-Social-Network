import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { EmailService } from '../../services/email/email.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from "rxjs";

@Component({
  selector: 'app-email-selection',
  templateUrl: './email-selection.component.html',
  styleUrls: ['./email-selection.component.css']
})
export class EmailSelectionComponent implements OnInit {

    private statuses = [];
    private statusChosen = 1;

    constructor(private router: Router,
                private route: ActivatedRoute,
                ) { }

    ngOnInit() {
        this.statuses = [
            {id: 1, name:'OK'},
            {id: 2, name:'Help'},
            {id: 3, name:'Emergency'},
            {id: 0, name:'Undefined'},
        ];
    }

}
