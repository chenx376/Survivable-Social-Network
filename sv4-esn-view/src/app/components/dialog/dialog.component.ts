import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  title: string;
  content: string;
  cancelButtonTitle: string;
  confirmButtonTitle: string;

  constructor(private dialogRef: MdDialogRef<DialogComponent>) { }

}
