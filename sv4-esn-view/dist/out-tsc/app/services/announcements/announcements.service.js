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
import { HttpService } from '../http/http.service';
import { Announcement } from '../../models/announcement.model';
import { UserService } from '../user/user.service';
var AnnouncementsService = (function () {
    function AnnouncementsService(httpService, userService) {
        var _this = this;
        this.httpService = httpService;
        this.userService = userService;
        this.getAnnouncements = function () {
            return _this.httpService.get('/announces/')
                .map(function (json) { return json.map(function (announcementsJson) { return new Announcement(announcementsJson); }); });
        };
        this.publishAnnouncement = function (content) {
            return _this.httpService.post('/announces/', { content: content, announcer: _this.userService.userId });
        };
        this.formatDate = function (date) {
            var hour = ('0' + date.getHours()).slice(-2);
            var minute = ('0' + date.getMinutes()).slice(-2);
            var second = ('0' + date.getSeconds()).slice(-2);
            var month = ('0' + (date.getMonth() + 1)).slice(-2);
            var day = ('0' + date.getDate()).slice(-2);
            return date.getFullYear() + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
        };
    }
    return AnnouncementsService;
}());
AnnouncementsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpService,
        UserService])
], AnnouncementsService);
export { AnnouncementsService };
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/services/announcements/announcements.service.js.map