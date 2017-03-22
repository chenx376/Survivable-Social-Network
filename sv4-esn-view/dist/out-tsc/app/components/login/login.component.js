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
import { DialogService } from '../../services/dialog/dialog.service';
var LoginComponent = (function () {
    function LoginComponent(router, userService, dialogService, viewContainerRef) {
        var _this = this;
        this.router = router;
        this.userService = userService;
        this.dialogService = dialogService;
        this.viewContainerRef = viewContainerRef;
        this.loginButtonClicked = function () {
            _this.userService.login(_this.username, _this.password)
                .subscribe(function () { return _this.router.navigateByUrl('home'); }, function (err) {
                if (err.message === 'No such user') {
                    _this.dialogService.openDialogue(_this.viewContainerRef, 'Register', "User " + _this.username + " does not exist. Do you want to register as a new user?")
                        .filter(function (result) { return result === true; })
                        .flatMap(function () { return _this.userService.createUser(_this.username, _this.password); })
                        .flatMap(function () { return _this.userService.login(_this.username, _this.password); })
                        .subscribe(function () { return _this.router.navigateByUrl('home'); }, function (err) { return console.error(err); });
                }
                else {
                    _this.dialogService.openAlert(_this.viewContainerRef, 'Error', err.message);
                }
            });
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.userService.isUserLoggedIn()) {
            this.router.navigateByUrl('home');
        }
    };
    ;
    return LoginComponent;
}());
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    __metadata("design:paramtypes", [Router,
        UserService,
        DialogService,
        ViewContainerRef])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/components/login/login.component.js.map