var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { ChatService } from '../../services/chat/chat.service';
var ChatComponent = (function () {
    function ChatComponent(router, route, userService, chatService) {
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.chatService = chatService;
        this.publicChat = false;
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.url
            .map(function (url) { return url[url.length - 1].path; })
            .filter(function (path) { return path === 'public'; })
            .subscribe(function () { return _this.publicChat = true; });
        this.route.params
            .map(function (params) { return params.userId; })
            .subscribe(function (targetUserId) { return _this.targetUserId = targetUserId; });
        if (this.targetUserId === this.userService.userId) {
            this.router.navigateByUrl('home');
            return;
        }
        if (this.publicChat) {
            this.chatService.getPublicMessages()
                .subscribe(function (messages) {
                _this.messages = messages;
                setTimeout(function () {
                    _this.messageList.nativeElement.scrollTop = _this.messageList.nativeElement.scrollHeight;
                }, 0);
                _this.socketConnection = _this.chatService.receivePublicMessage()
                    .subscribe(function (message) {
                    _this.messages.push(message);
                    setTimeout(function () {
                        _this.messageList.nativeElement.scrollTop = _this.messageList.nativeElement.scrollHeight;
                    }, 0);
                });
            });
        }
        else {
            this.chatService.getPrivateMessages(this.targetUserId)
                .subscribe(function (messages) {
                _this.messages = messages;
                setTimeout(function () {
                    _this.messageList.nativeElement.scrollTop = _this.messageList.nativeElement.scrollHeight;
                }, 0);
                _this.socketConnection = _this.chatService.receivePrivateMessage()
                    .filter(function (message) { return message.sender.userId === _this.userService.userId || _this.router.url === "/chat/" + message.sender.userId; })
                    .subscribe(function (message) {
                    _this.messages.push(message);
                    setTimeout(function () {
                        _this.messageList.nativeElement.scrollTop = _this.messageList.nativeElement.scrollHeight;
                    }, 0);
                });
            });
        }
    };
    ChatComponent.prototype.sendMessage = function () {
        if (this.publicChat) {
            this.chatService.sendPublicMessage(this.messageContent);
        }
        else {
            this.chatService.sendPrivateMessage(this.messageContent, this.targetUserId);
        }
        this.messageContent = '';
    };
    ChatComponent.prototype.ngOnDestroy = function () {
        if (this.socketConnection != null) {
            this.socketConnection.unsubscribe();
        }
    };
    return ChatComponent;
}());
__decorate([
    ViewChild('messageList'),
    __metadata("design:type", ElementRef)
], ChatComponent.prototype, "messageList", void 0);
ChatComponent = __decorate([
    Component({
        selector: 'app-chat',
        templateUrl: './chat.component.html',
        styleUrls: ['chat.component.css']
    }),
    __metadata("design:paramtypes", [Router,
        ActivatedRoute,
        UserService,
        ChatService])
], ChatComponent);
export { ChatComponent };
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/components/chat/chat.component.js.map