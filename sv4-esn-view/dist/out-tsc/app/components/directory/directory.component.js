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
import { UserService } from '../../services/user/user.service';
var DirectoryComponent = (function () {
    function DirectoryComponent(userService) {
        this.userService = userService;
    }
    DirectoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUserList()
            .map(function (users) { return users.sort(function (user1, user2) {
            if (user1.online && !user2.online) {
                return -1;
            }
            else if (!user1.online && user2.online) {
                return 1;
            }
            else {
                if (user1.username > user2.username) {
                    return 1;
                }
                else if (user1.username < user2.username) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
        }); })
            .subscribe(function (users) { return _this.users = users; });
    };
    return DirectoryComponent;
}());
DirectoryComponent = __decorate([
    Component({
        selector: 'app-directory',
        templateUrl: './directory.component.html',
        styleUrls: ['./directory.component.css']
    }),
    __metadata("design:paramtypes", [UserService])
], DirectoryComponent);
export { DirectoryComponent };
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/components/directory/directory.component.js.map