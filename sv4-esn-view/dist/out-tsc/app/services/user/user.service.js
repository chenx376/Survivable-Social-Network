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
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { HttpService } from '../http/http.service';
import { User } from '../../models/user.model';
var UserService = (function () {
    function UserService(httpService) {
        var _this = this;
        this.httpService = httpService;
        this.userId = localStorage.getItem('user_id');
        this.isUserLoggedInSubject = new BehaviorSubject(false);
        this.userInfoSubject = new ReplaySubject(1);
        this.isUserLoggedIn = function () { return _this.userId != null; };
        this.login = function (username, password) {
            return _this.httpService.post('/login', { username: username, password: password })
                .do(function (json) {
                _this.userId = json.id;
                _this.httpService.jwt = json.token;
                localStorage.setItem('jwt', json.token);
                localStorage.setItem('user_id', json.id);
                _this.isUserLoggedInSubject.next(true);
                _this.getUserInfo(_this.userId);
            });
        };
        this.logout = function () {
            return _this.httpService.put("/users/" + _this.userId, { online: false })
                .do(function () {
                localStorage.removeItem('jwt');
                localStorage.removeItem('user_id');
                _this.userId = null;
                _this.user = null;
                _this.httpService.jwt = null;
                _this.isUserLoggedInSubject.next(false);
            });
        };
        this.createUser = function (username, password) {
            return _this.httpService.post('/users', { username: username, password: password });
        };
        this.getUserList = function () {
            return _this.httpService.get('/users/')
                .map(function (json) { return json.map(function (userJson) { return new User(userJson); }); });
        };
        this.getUserInfo = function (userId) {
            _this.httpService.get("/users/" + userId)
                .subscribe(function (json) {
                _this.user = new User(json);
                _this.userInfoSubject.next(_this.user);
            });
        };
        this.getAvatarUrl = function (username) { return "assets/img/avatar/avatar_tile_" + username.charAt(0).toLowerCase() + "_56.png"; };
        this.shareStatus = function (status, information) {
            return _this.httpService.put("/users/" + _this.userId, { status: status, status_information: information });
        };
        if (this.isUserLoggedIn()) {
            this.isUserLoggedInSubject.next(true);
            this.getUserInfo(this.userId);
        }
    }
    return UserService;
}());
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpService])
], UserService);
export { UserService };
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/services/user/user.service.js.map