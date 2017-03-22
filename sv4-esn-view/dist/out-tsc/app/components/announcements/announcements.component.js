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
import { AnnouncementsService } from '../../services/announcements/announcements.service';
import { DialogService } from '../../services/dialog/dialog.service';
var AnnouncementsComponent = (function () {
    function AnnouncementsComponent(announcementsService, dialogService, viewContainerRef) {
        var _this = this;
        this.announcementsService = announcementsService;
        this.dialogService = dialogService;
        this.viewContainerRef = viewContainerRef;
        this.publishAnnouncementButtonClicked = function () {
            _this.announcementsService.publishAnnouncement(_this.announcementContent)
                .subscribe(function () {
                _this.announcementContent = '';
                _this.dialogService.openAlert(_this.viewContainerRef, 'Success', 'Success');
            }, function (err) { return _this.dialogService.openAlert(_this.viewContainerRef, 'Error', err.message); });
        };
    }
    AnnouncementsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.announcementsService.getAnnouncements()
            .subscribe(function (announcements) { return _this.announcements = announcements; });
    };
    return AnnouncementsComponent;
}());
AnnouncementsComponent = __decorate([
    Component({
        selector: 'app-announcements',
        templateUrl: './announcements.component.html',
        styleUrls: ['./announcements.component.css']
    }),
    __metadata("design:paramtypes", [AnnouncementsService,
        DialogService,
        ViewContainerRef])
], AnnouncementsComponent);
export { AnnouncementsComponent };
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/components/announcements/announcements.component.js.map