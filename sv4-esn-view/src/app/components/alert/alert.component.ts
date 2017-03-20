import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  title: string;
  content: string;

  dialogRef: MdDialogRef<AlertComponent>;

  constructor(dialogRef: MdDialogRef<AlertComponent>) {
    this.dialogRef = dialogRef;
  }

}
