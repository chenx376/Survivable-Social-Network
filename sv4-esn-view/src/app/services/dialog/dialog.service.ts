import { Injectable, ViewContainerRef } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Observable } from 'rxjs';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { AlertComponent } from '../../components/alert/alert.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog) { }

  public openDialogue(viewContainerRef: ViewContainerRef,
                      title: string,
                      content: string,
                      cancelButtonTitle: string = 'Cancel',
                      confirmButtonTitle: string = 'OK'): Observable<boolean> {
    let dialogRef: MdDialogRef<DialogComponent>;
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(DialogComponent, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.content = content;
    dialogRef.componentInstance.cancelButtonTitle = cancelButtonTitle;
    dialogRef.componentInstance.confirmButtonTitle = confirmButtonTitle;

    return dialogRef.afterClosed();
  }

  public openAlert(viewContainerRef: ViewContainerRef,
                   title: string,
                   content: string): Observable<boolean> {
    let dialogRef: MdDialogRef<AlertComponent>;
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(AlertComponent, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.content = content;

    return dialogRef.afterClosed();
  }

}
