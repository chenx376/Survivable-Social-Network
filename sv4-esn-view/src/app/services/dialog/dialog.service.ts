import { Injectable, ViewContainerRef } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Observable } from 'rxjs';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Injectable()
export class DialogService {

  private dialog: MdDialog;

  constructor(dialog: MdDialog) {
    this.dialog = dialog;
  }

  public open(title: string, content: string, viewContainerRef: ViewContainerRef): Observable<boolean> {
    let dialogRef: MdDialogRef<DialogComponent>;
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(DialogComponent, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.content = content;

    return dialogRef.afterClosed();
  }

}
