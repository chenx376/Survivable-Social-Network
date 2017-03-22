var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { AlertComponent } from '../../components/alert/alert.component';
var DialogService = (function () {
    function DialogService(dialog) {
        this.dialog = dialog;
    }
    DialogService.prototype.openDialogue = function (viewContainerRef, title, content, cancelButtonTitle, confirmButtonTitle) {
        if (cancelButtonTitle === void 0) { cancelButtonTitle = 'Cancel'; }
        if (confirmButtonTitle === void 0) { confirmButtonTitle = 'OK'; }
        var dialogRef;
        var config = new MdDialogConfig();
        config.viewContainerRef = viewContainerRef;
        dialogRef = this.dialog.open(DialogComponent, config);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.content = content;
        dialogRef.componentInstance.cancelButtonTitle = cancelButtonTitle;
        dialogRef.componentInstance.confirmButtonTitle = confirmButtonTitle;
        return dialogRef.afterClosed();
    };
    DialogService.prototype.openAlert = function (viewContainerRef, title, content) {
        var dialogRef;
        var config = new MdDialogConfig();
        config.viewContainerRef = viewContainerRef;
        dialogRef = this.dialog.open(AlertComponent, config);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.content = content;
        return dialogRef.afterClosed();
    };
    return DialogService;
}());
DialogService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [MdDialog])
], DialogService);
export { DialogService };
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/services/dialog/dialog.service.js.map