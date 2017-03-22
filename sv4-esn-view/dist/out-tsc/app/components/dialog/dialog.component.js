var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
var DialogComponent = (function () {
    function DialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return DialogComponent;
}());
DialogComponent = __decorate([
    Component({
        selector: 'app-dialog',
        templateUrl: './dialog.component.html',
        styleUrls: ['./dialog.component.css']
    }),
    __metadata("design:paramtypes", [MdDialogRef])
], DialogComponent);
export { DialogComponent };
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/components/dialog/dialog.component.js.map