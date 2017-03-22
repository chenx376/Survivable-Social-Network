var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { ChatService } from '../../services/chat/chat.service';
import { DialogService } from '../../services/dialog/dialog.service';
var AppComponent = (function () {
    function AppComponent(router, userService, chatService, dialogService, viewContainerRef) {
        var _this = this;
        this.router = router;
        this.userService = userService;
        this.chatService = chatService;
        this.dialogService = dialogService;
        this.viewContainerRef = viewContainerRef;
        this.logoutButtonClicked = function (sidenav) {
            sidenav.close();
            _this.userService.logout()
                .subscribe(function () {
                _this.router.navigateByUrl('login');
            });
        };
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.userService.isUserLoggedIn()) {
            this.router.navigateByUrl('login');
        }
        this.chatService.receivePrivateMessage()
            .filter(function (message) { return message.receiver === _this.userService.userId; })
            .filter(function (message) { return _this.router.url !== "/chat/" + message.sender.userId; })
            .subscribe(function (message) {
            _this.dialogService.openDialogue(_this.viewContainerRef, 'New Message', message.sender.username + " sent you a message. Would you like to see it?")
                .filter(function (result) { return result === true; })
                .subscribe(function () { return _this.router.navigateByUrl("chat/" + message.sender.userId); });
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [Router,
        UserService,
        ChatService,
        DialogService,
        ViewContainerRef])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/components/root/app.component.js.map