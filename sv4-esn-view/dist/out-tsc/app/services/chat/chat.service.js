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
import { Observable } from "rxjs";
import * as io from 'socket.io-client';
import { HttpService } from '../http/http.service';
import { UserService } from '../user/user.service';
import { Message } from '../../models/message.model';
var ChatService = (function () {
    function ChatService(httpService, userService) {
        var _this = this;
        this.httpService = httpService;
        this.userService = userService;
        this.endpoint = "https://sv4-esn-services.herokuapp.com";
        //private endpoint = "http://localhost:3000";
        this.socket = io(this.endpoint);
        this.subscribeMe = function () {
            var payload = {
                jwt: _this.httpService.jwt,
                data: { myself: _this.userService.userId }
            };
            _this.socket.emit('subscribe', payload);
        };
        this.unsubscribeMe = function () {
            var payload = {
                jwt: _this.httpService.jwt,
                data: { myself: _this.userService.userId }
            };
            _this.socket.emit('unsubscribe', payload);
        };
        this.getPublicMessages = function () {
            return _this.httpService.get('/messages')
                .map(function (json) { return json.map(function (messageJson) { return new Message(messageJson); }); });
        };
        this.getPrivateMessages = function (targetUserId) {
            return _this.httpService.get("/messages/" + _this.userService.userId + "/" + targetUserId)
                .map(function (json) { return json.map(function (messageJson) { return new Message(messageJson); }); });
        };
        this.sendPublicMessage = function (content) {
            var payload = {
                jwt: _this.httpService.jwt,
                data: {
                    message: {
                        sender: _this.userService.userId,
                        message: content,
                        receiver: null,
                        broadcast: true,
                        sent_at: new Date()
                    }
                }
            };
            _this.socket.emit('public-msg', payload);
        };
        this.receivePublicMessage = function () {
            return new Observable(function (observer) {
                _this.socket.on('public-msg-sent', function (json) {
                    observer.next(new Message(json));
                });
            });
        };
        this.sendPrivateMessage = function (content, targetUserId) {
            var payload = {
                jwt: _this.httpService.jwt,
                data: {
                    message: {
                        sender: _this.userService.userId,
                        message: content,
                        receiver: targetUserId,
                        broadcast: false,
                        sent_at: new Date()
                    }
                }
            };
            _this.socket.emit('private-msg', payload);
        };
        this.receivePrivateMessage = function () {
            return new Observable(function (observer) {
                _this.socket.on('private-msg-sent', function (json) {
                    observer.next(new Message(json));
                });
            });
        };
        this.formatDate = function (date) {
            var hour = ('0' + date.getHours()).slice(-2);
            var minute = ('0' + date.getMinutes()).slice(-2);
            var second = ('0' + date.getSeconds()).slice(-2);
            var month = ('0' + (date.getMonth() + 1)).slice(-2);
            var day = ('0' + date.getDate()).slice(-2);
            return date.getFullYear() + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
        };
        this.userService.isUserLoggedInSubject
            .filter(function (isUserLoggedIn) { return isUserLoggedIn === true; })
            .subscribe(function () { return _this.subscribeMe(); });
        this.userService.isUserLoggedInSubject
            .filter(function (isUserLoggedIn) { return isUserLoggedIn === false; })
            .subscribe(function () { return _this.unsubscribeMe(); });
    }
    return ChatService;
}());
ChatService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpService,
        UserService])
], ChatService);
export { ChatService };
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/services/chat/chat.service.js.map