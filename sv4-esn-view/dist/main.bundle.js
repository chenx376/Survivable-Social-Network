webpackJsonp([1,4],{

/***/ 1030:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "sidenav_header_background.3cd94db1e185b6fcb3d5.jpg";

/***/ }),

/***/ 1034:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1035:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(518);


/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_dialog_dialog_component__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_alert_alert_component__ = __webpack_require__(452);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DialogService = (function () {
    function DialogService(dialog) {
        this.dialog = dialog;
    }
    DialogService.prototype.openDialogue = function (viewContainerRef, title, content, cancelButtonTitle, confirmButtonTitle) {
        if (cancelButtonTitle === void 0) { cancelButtonTitle = 'Cancel'; }
        if (confirmButtonTitle === void 0) { confirmButtonTitle = 'OK'; }
        var dialogRef;
        var config = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdDialogConfig */]();
        config.viewContainerRef = viewContainerRef;
        dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_2__components_dialog_dialog_component__["a" /* DialogComponent */], config);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.content = content;
        dialogRef.componentInstance.cancelButtonTitle = cancelButtonTitle;
        dialogRef.componentInstance.confirmButtonTitle = confirmButtonTitle;
        return dialogRef.afterClosed();
    };
    DialogService.prototype.openAlert = function (viewContainerRef, title, content) {
        var dialogRef;
        var config = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdDialogConfig */]();
        config.viewContainerRef = viewContainerRef;
        dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_3__components_alert_alert_component__["a" /* AlertComponent */], config);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.content = content;
        return dialogRef.afterClosed();
    };
    return DialogService;
}());
DialogService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */]) === "function" && _a || Object])
], DialogService);

var _a;
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/dialog.service.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UserStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["Undefined"] = 0] = "Undefined";
    UserStatus[UserStatus["OK"] = 1] = "OK";
    UserStatus[UserStatus["Help"] = 2] = "Help";
    UserStatus[UserStatus["Emergency"] = 3] = "Emergency";
})(UserStatus || (UserStatus = {}));
var User = (function () {
    function User(json) {
        var _this = this;
        this.status = UserStatus.Undefined;
        this.online = false;
        this.userStatusString = function () {
            switch (_this.status) {
                case UserStatus.Undefined: return 'Undefined';
                case UserStatus.OK: return 'OK';
                case UserStatus.Help: return 'Help';
                case UserStatus.Emergency: return 'Emergency';
            }
        };
        this.userId = json._id;
        this.username = json.username;
        this.status = json.status;
        this.statusInformation = json.status_information;
        this.online = json.online;
    }
    return User;
}());

//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/user.model.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HttpService = (function () {
    function HttpService(http) {
        var _this = this;
        this.http = http;
        //baseUri = "https://sv4-esn-services.herokuapp.com";
        this.baseUri = "http://localhost:3000";
        this.jwt = localStorage.getItem('jwt');
        this.get = function (path, params) {
            var requestUri = "" + _this.baseUri + path;
            var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]();
            if (params) {
                var urlSearchParams_1 = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* URLSearchParams */]();
                Object.keys(params).forEach(function (key) {
                    urlSearchParams_1.set(key, params[key]);
                });
                requestOptions.search = urlSearchParams_1;
            }
            if (_this.jwt) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Headers */]({ 'Authorization': "JWT " + _this.jwt });
                requestOptions.headers = headers;
            }
            return _this.http.get(requestUri, requestOptions)
                .map(function (res) { return res.json(); })
                .catch(_this.handleError);
        };
        this.post = function (path, params) {
            var requestUri = encodeURI("" + _this.baseUri + path);
            var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]();
            requestOptions.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Headers */]({ 'Content-Type': 'application/json' });
            if (_this.jwt) {
                requestOptions.headers.append('Authorization', "JWT " + _this.jwt);
            }
            return _this.http.post(requestUri, JSON.stringify(params), requestOptions)
                .map(function (res) { return res.json(); })
                .catch(_this.handleError);
        };
        this.put = function (path, params) {
            var requestUri = encodeURI("" + _this.baseUri + path);
            var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]();
            requestOptions.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Headers */]({ 'Content-Type': 'application/json' });
            if (_this.jwt) {
                requestOptions.headers.append('Authorization', "JWT " + _this.jwt);
            }
            return _this.http.put(requestUri, JSON.stringify(params), requestOptions)
                .map(function (res) { return res.json(); })
                .catch(_this.handleError);
        };
        this.delete = function (path, params) {
            var requestUri = "" + _this.baseUri + path;
            var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]();
            if (params) {
                var urlSearchParams_2 = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* URLSearchParams */]();
                Object.keys(params).forEach(function (key) {
                    urlSearchParams_2.set(key, params[key]);
                });
                requestOptions.search = urlSearchParams_2;
            }
            if (_this.jwt) {
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Headers */]({ 'Authorization': "JWT " + _this.jwt });
                requestOptions.headers = headers;
            }
            return _this.http.delete(requestUri, requestOptions)
                .map(function (res) { return res.json(); })
                .catch(_this.handleError);
        };
        this.handleError = function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(error.json());
        };
    }
    return HttpService;
}());
HttpService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], HttpService);

var _a;
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/http.service.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client__ = __webpack_require__(1025);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__http_http_service__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_message_model__ = __webpack_require__(682);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChatService = (function () {
    function ChatService(httpService, userService) {
        var _this = this;
        this.httpService = httpService;
        this.userService = userService;
        //private endpoint = "https://sv4-esn-services.herokuapp.com";
        this.endpoint = "http://localhost:3000";
        this.socket = __WEBPACK_IMPORTED_MODULE_2_socket_io_client__(this.endpoint);
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
                .map(function (json) { return json.map(function (messageJson) { return new __WEBPACK_IMPORTED_MODULE_5__models_message_model__["a" /* Message */](messageJson); }); });
        };
        this.getPrivateMessages = function (targetUserId) {
            return _this.httpService.get("/messages/" + _this.userService.userId + "/" + targetUserId)
                .map(function (json) { return json.map(function (messageJson) { return new __WEBPACK_IMPORTED_MODULE_5__models_message_model__["a" /* Message */](messageJson); }); });
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
            return new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"](function (observer) {
                _this.socket.on('public-msg-sent', function (json) {
                    observer.next(new __WEBPACK_IMPORTED_MODULE_5__models_message_model__["a" /* Message */](json));
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
            return new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"](function (observer) {
                _this.socket.on('private-msg-sent', function (json) {
                    observer.next(new __WEBPACK_IMPORTED_MODULE_5__models_message_model__["a" /* Message */](json));
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__http_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__http_http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__user_user_service__["a" /* UserService */]) === "function" && _b || Object])
], ChatService);

var _a, _b;
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/chat.service.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(170);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlertComponent = (function () {
    function AlertComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return AlertComponent;
}());
AlertComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'app-alert',
        template: __webpack_require__(766),
        styles: [__webpack_require__(752)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MdDialogRef */]) === "function" && _a || Object])
], AlertComponent);

var _a;
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/alert.component.js.map

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(170);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DialogComponent = (function () {
    function DialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return DialogComponent;
}());
DialogComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'app-dialog',
        template: __webpack_require__(769),
        styles: [__webpack_require__(755)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MdDialogRef */]) === "function" && _a || Object])
], DialogComponent);

var _a;
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/dialog.component.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__http_http_service__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_announcement_model__ = __webpack_require__(681);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_user_service__ = __webpack_require__(59);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnouncementsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AnnouncementsService = (function () {
    function AnnouncementsService(httpService, userService) {
        var _this = this;
        this.httpService = httpService;
        this.userService = userService;
        this.getAnnouncements = function () {
            return _this.httpService.get('/announces/')
                .map(function (json) { return json.map(function (announcementsJson) { return new __WEBPACK_IMPORTED_MODULE_2__models_announcement_model__["a" /* Announcement */](announcementsJson); }); });
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__http_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__http_http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__user_user_service__["a" /* UserService */]) === "function" && _b || Object])
], AnnouncementsService);

var _a, _b;
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/announcements.service.js.map

/***/ }),

/***/ 517:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 517;


/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(683);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(673);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/main.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_http_service__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_user_model__ = __webpack_require__(176);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserService = (function () {
    function UserService(httpService) {
        var _this = this;
        this.httpService = httpService;
        this.userId = localStorage.getItem('user_id');
        this.isUserLoggedInSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](false);
        this.userInfoSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["ReplaySubject"](1);
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
                .map(function (json) { return json.map(function (userJson) { return new __WEBPACK_IMPORTED_MODULE_3__models_user_model__["a" /* User */](userJson); }); });
        };
        this.getUserInfo = function (userId) {
            _this.httpService.get("/users/" + userId)
                .subscribe(function (json) {
                _this.user = new __WEBPACK_IMPORTED_MODULE_3__models_user_model__["a" /* User */](json);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__http_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__http_http_service__["a" /* HttpService */]) === "function" && _a || Object])
], UserService);

var _a;
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/user.service.js.map

/***/ }),

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs__ = __webpack_require__(761);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_root_app_component__ = __webpack_require__(679);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_login_login_component__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__ = __webpack_require__(677);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_chat_chat_component__ = __webpack_require__(675);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_directory_directory_component__ = __webpack_require__(676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_share_status_share_status_component__ = __webpack_require__(680);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_announcements_announcements_component__ = __webpack_require__(674);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_dialog_dialog_component__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_alert_alert_component__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_http_http_service__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_user_user_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_chat_chat_service__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_dialog_dialog_service__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_announcements_announcements_service__ = __webpack_require__(454);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_8__components_login_login_component__["a" /* LoginComponent */] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'chat', redirectTo: 'chat/public', pathMatch: 'full' },
    { path: 'chat/public', component: __WEBPACK_IMPORTED_MODULE_10__components_chat_chat_component__["a" /* ChatComponent */] },
    { path: 'chat/:userId', component: __WEBPACK_IMPORTED_MODULE_10__components_chat_chat_component__["a" /* ChatComponent */] },
    { path: 'directory', component: __WEBPACK_IMPORTED_MODULE_11__components_directory_directory_component__["a" /* DirectoryComponent */] },
    { path: 'share_status', component: __WEBPACK_IMPORTED_MODULE_12__components_share_status_share_status_component__["a" /* ShareStatusComponent */] },
    { path: 'announcements', component: __WEBPACK_IMPORTED_MODULE_13__components_announcements_announcements_component__["a" /* AnnouncementsComponent */] }
    // { path: '**', component: PageNotFoundComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__components_root_app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_chat_chat_component__["a" /* ChatComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_directory_directory_component__["a" /* DirectoryComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_share_status_share_status_component__["a" /* ShareStatusComponent */],
            __WEBPACK_IMPORTED_MODULE_13__components_announcements_announcements_component__["a" /* AnnouncementsComponent */],
            __WEBPACK_IMPORTED_MODULE_14__components_dialog_dialog_component__["a" /* DialogComponent */],
            __WEBPACK_IMPORTED_MODULE_15__components_alert_alert_component__["a" /* AlertComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_14__components_dialog_dialog_component__["a" /* DialogComponent */],
            __WEBPACK_IMPORTED_MODULE_15__components_alert_alert_component__["a" /* AlertComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */].forRoot(appRoutes),
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MaterialModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_16__services_http_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_17__services_user_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_18__services_chat_chat_service__["a" /* ChatService */],
            __WEBPACK_IMPORTED_MODULE_20__services_announcements_announcements_service__["a" /* AnnouncementsService */],
            __WEBPACK_IMPORTED_MODULE_19__services_dialog_dialog_service__["a" /* DialogService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__components_root_app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app.module.js.map

/***/ }),

/***/ 674:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_announcements_announcements_service__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_dialog_dialog_service__ = __webpack_require__(114);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnouncementsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'app-announcements',
        template: __webpack_require__(767),
        styles: [__webpack_require__(753)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_announcements_announcements_service__["a" /* AnnouncementsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_announcements_announcements_service__["a" /* AnnouncementsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_dialog_dialog_service__["a" /* DialogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_dialog_dialog_service__["a" /* DialogService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ViewContainerRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ViewContainerRef */]) === "function" && _c || Object])
], AnnouncementsComponent);

var _a, _b, _c;
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/announcements.component.js.map

/***/ }),

/***/ 675:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_user_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_chat_chat_service__ = __webpack_require__(270);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* ViewChild */])('messageList'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === "function" && _a || Object)
], ChatComponent.prototype, "messageList", void 0);
ChatComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'app-chat',
        template: __webpack_require__(768),
        styles: [__webpack_require__(754)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_user_user_service__["a" /* UserService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__services_chat_chat_service__["a" /* ChatService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_chat_chat_service__["a" /* ChatService */]) === "function" && _e || Object])
], ChatComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/chat.component.js.map

/***/ }),

/***/ 676:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_user_service__ = __webpack_require__(59);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectoryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'app-directory',
        template: __webpack_require__(770),
        styles: [__webpack_require__(756)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_user_user_service__["a" /* UserService */]) === "function" && _a || Object])
], DirectoryComponent);

var _a;
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/directory.component.js.map

/***/ }),

/***/ 677:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'app-home',
        template: __webpack_require__(771),
        styles: [__webpack_require__(757)]
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);

//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/home.component.js.map

/***/ }),

/***/ 678:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_user_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_dialog_dialog_service__ = __webpack_require__(114);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'app-login',
        template: __webpack_require__(772),
        styles: [__webpack_require__(758)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_user_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_dialog_dialog_service__["a" /* DialogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_dialog_dialog_service__["a" /* DialogService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ViewContainerRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ViewContainerRef */]) === "function" && _d || Object])
], LoginComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/login.component.js.map

/***/ }),

/***/ 679:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_user_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_chat_chat_service__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_dialog_dialog_service__ = __webpack_require__(114);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(773),
        styles: [__webpack_require__(759)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_user_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_chat_chat_service__["a" /* ChatService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_chat_chat_service__["a" /* ChatService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_dialog_dialog_service__["a" /* DialogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_dialog_dialog_service__["a" /* DialogService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ViewContainerRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ViewContainerRef */]) === "function" && _e || Object])
], AppComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app.component.js.map

/***/ }),

/***/ 680:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_user_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_dialog_dialog_service__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_user_model__ = __webpack_require__(176);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShareStatusComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ShareStatusComponent = (function () {
    function ShareStatusComponent(userService, dialogService, viewContainerRef) {
        var _this = this;
        this.userService = userService;
        this.dialogService = dialogService;
        this.viewContainerRef = viewContainerRef;
        this.selectedStatus = __WEBPACK_IMPORTED_MODULE_3__models_user_model__["b" /* UserStatus */].OK;
        this.statusOkSelected = function () { return _this.selectedStatus = __WEBPACK_IMPORTED_MODULE_3__models_user_model__["b" /* UserStatus */].OK; };
        this.statusHelpSelected = function () { return _this.selectedStatus = __WEBPACK_IMPORTED_MODULE_3__models_user_model__["b" /* UserStatus */].Help; };
        this.statusEmergencySelected = function () { return _this.selectedStatus = __WEBPACK_IMPORTED_MODULE_3__models_user_model__["b" /* UserStatus */].Emergency; };
        this.shareStatusButtonClicked = function () {
            _this.userService.shareStatus(_this.selectedStatus, _this.information)
                .subscribe(function () {
                _this.information = '';
                _this.dialogService.openAlert(_this.viewContainerRef, 'Success', 'Success');
            }, function (err) { return _this.dialogService.openAlert(_this.viewContainerRef, 'Error', err.message); });
        };
    }
    ShareStatusComponent.prototype.ngOnInit = function () {
    };
    return ShareStatusComponent;
}());
ShareStatusComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'app-share-status',
        template: __webpack_require__(774),
        styles: [__webpack_require__(760)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_user_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_dialog_dialog_service__["a" /* DialogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_dialog_dialog_service__["a" /* DialogService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ViewContainerRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ViewContainerRef */]) === "function" && _c || Object])
], ShareStatusComponent);

var _a, _b, _c;
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/share-status.component.js.map

/***/ }),

/***/ 681:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_model__ = __webpack_require__(176);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Announcement; });

var Announcement = (function () {
    function Announcement(json) {
        this.announcementId = json._id;
        this.content = json.content;
        this.date = new Date(json.created_at);
        this.publisher = new __WEBPACK_IMPORTED_MODULE_0__user_model__["a" /* User */](json.announcer);
    }
    return Announcement;
}());

//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/announcement.model.js.map

/***/ }),

/***/ 682:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_model__ = __webpack_require__(176);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });

var Message = (function () {
    function Message(json) {
        this.messageId = json._id;
        this.sender = new __WEBPACK_IMPORTED_MODULE_0__user_model__["a" /* User */](json.sender);
        this.receiver = json.receiver;
        this.content = json.message;
        this.date = new Date(json.sent_at);
        this.broadcast = json.broadcast;
        this.userStatus = json.user_status;
        this.userStatusInformation = json.user_status_information;
    }
    return Message;
}());

//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/message.model.js.map

/***/ }),

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/environment.js.map

/***/ }),

/***/ 752:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(26)();
// imports


// module
exports.push([module.i, ".mat-dialog-actions {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 753:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(26)();
// imports


// module
exports.push([module.i, ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding: 0 5vw;\n  height: calc(100vh - 60px);\n  overflow: scroll;\n}\n\n:host>* {\n  min-height: -webkit-min-content;\n  min-height: -moz-min-content;\n  min-height: min-content;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 754:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(26)();
// imports


// module
exports.push([module.i, ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 0 2vw;\n  height: calc(100vh - 60px);\n}\n\n.message-list {\n  overflow: scroll;\n  height: calc(100vh - 60px - 110px);\n  padding: 0 1vw;\n}\n\n.message {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin: 10px 0;\n  padding: 10px;\n}\n\n.avatar {\n  width: 36px;\n  min-width: 36px;\n  height: 36px;\n  border-radius: 50%;\n}\n\n.message-body {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  margin-left: 15px;\n}\n\n.user-header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 20px;\n}\n\n.username {\n  font-weight: bold;\n}\n\n.status-icon {\n  margin-left: 5px;\n  width: 20px;\n  font-size: 1.2em;\n}\n\n.status-ok {\n  color: #51b53f;\n}\n\n.status-help {\n  color: #b5a33f;\n}\n\n.status-emergency {\n  color: #b53f51;\n}\n\n.online-icon {\n  margin-left: 5px;\n  width: 20px;\n  font-size: 1.2em;\n  color: #51b53f;\n}\n\n.status-information {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  width: calc(100vw - 6vw - 20px - 36px - 15px);\n  font-size: 0.8em;\n  font-style: italic;\n  color: #666;\n}\n\n.message-date {\n  font-size: 0.8em;\n  font-style: italic;\n  color: #666;\n}\n\n.message-content {\n  margin-top: 5px;\n  word-wrap: break-word;\n  width: calc(100vw - 6vw - 20px - 36px - 15px);\n}\n\n.message-controls {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: end;\n      -ms-flex-align: end;\n          align-items: flex-end;\n  width: 94vw;\n  height: 110px;\n  padding: 0 1vw;\n}\n\n.message-input {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n\n.message-input textarea {\n  resize: none;\n}\n\n.message-send-button {\n  margin-left: 3vw;\n  margin-bottom: 20px;\n  background-color: #3f51b5;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 755:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(26)();
// imports


// module
exports.push([module.i, ".mat-dialog-actions {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 756:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(26)();
// imports


// module
exports.push([module.i, ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  width: 90vw;\n  height: calc(100vh - 60px);\n  overflow: scroll;\n}\n\n:host>* {\n  min-height: -webkit-min-content;\n  min-height: -moz-min-content;\n  min-height: min-content;\n}\n\n.user {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding: 10px 0;\n}\n\n.user+.user {\n  border-top: 1px solid #d9d9d9;\n}\n\n.avatar {\n  width: 36px;\n  min-width: 36px;\n  height: 36px;\n  border-radius: 50%;\n}\n\n.user-info {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  margin-left: 15px;\n}\n\n.user-header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 20px;\n}\n\n.username {\n  font-weight: bold;\n}\n\n.status-icon {\n  margin-left: 5px;\n  width: 20px;\n  font-size: 1.2em;\n}\n\n.status-ok {\n  color: #51b53f;\n}\n\n.status-help {\n  color: #b5a33f;\n}\n\n.status-emergency {\n  color: #b53f51;\n}\n\n.online-icon {\n  margin-left: 5px;\n  width: 20px;\n  font-size: 1.2em;\n  color: #51b53f;\n}\n\n.empty-status-information {\n  font-style: italic;\n  color: #666;\n}\n\n.status-information {\n\n}\n\n/*////*/\n\n.user-status {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: 5px;\n  padding: 2px 4px;\n}\n\n.user-status-icon {\n  height: auto;\n  width: auto;\n  font-size: 1em;\n}\n\n.user-status-text {\n  margin-left: 2px;\n  font-size: 0.8em;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 757:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(26)();
// imports


// module
exports.push([module.i, ":host {\n  width: 90%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 758:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(26)();
// imports


// module
exports.push([module.i, ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: 80vw;\n  padding-top: 20px;\n}\n\n.login-input {\n  width: 100%;\n}\n\n#login-button {\n  width: 100%;\n  margin-top: 10px;\n}\n\n#login-copyright {\n  margin-top: 40px;\n  font-size: 0.6em;\n  color: #90949c;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 759:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(26)();
// imports


// module
exports.push([module.i, ":host {\n\n}\n\n#sidenav-container {\n  width: 100vw;\n  height: 100vh;\n}\n\n#sidenav {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  width: 60vw;\n}\n\n#sidenav-header {\n  height: 150px;\n  width: 60vw;\n  margin-bottom: 10px;\n  background-image: url(" + __webpack_require__(1030) + ");\n  background-size: cover;\n}\n\n.sidenav-item {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding-left: 15px;\n  height: 50px;\n  color: #212121;\n}\n\n.sidenav-item.active * {\n  color: #3f51b5;\n}\n\n.sidenav-item-icon {\n  margin-right: 30px;\n  color: #757575;\n}\n\n#sidenav-content {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 100vh;\n}\n\n#app-header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: 100vw;\n  height: 60px;\n  min-height: 60px;\n  background-color: #3f51b5;\n}\n\n#header-left-button {\n  width: 10vw;\n  margin-left: 4vw;\n  margin-top: 3px;\n  border: none;\n  background-color: #3f51b5;\n  color: #ffffff;\n}\n\n#header-right-button {\n  width: 10vw;\n  margin-right: 4vw;\n  border: none;\n  background-color: #3f51b5;\n  color: #ffffff;\n}\n\n#app-title {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  text-align: center;\n  color: #ffffff;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 760:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(26)();
// imports


// module
exports.push([module.i, ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding: 0 5vw;\n  height: calc(100vh - 60px);\n  overflow: scroll;\n}\n\n:host>* {\n  min-height: -webkit-min-content;\n  min-height: -moz-min-content;\n  min-height: min-content;\n}\n\n.status {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-top: 15px;\n  padding: 10px 10px;\n  border: 2px solid #fff;\n}\n\n.status.selected {\n  border-color: #3f51b5;\n}\n\n.status-icon {\n  margin-top: 2px !important;\n}\n\n.status-ok .status-icon {\n  color: #51b53f;\n}\n\n.status-help .status-icon {\n  color: #b5a33f;\n}\n\n.status-emergency .status-icon {\n  color: #b53f51;\n}\n\n.status-info {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  margin-left: 10px;\n}\n\n.status-title {\n  font-weight: bold;\n}\n\n.status-desc {\n  margin-top: 5px;\n  font-size: 0.8em;\n  color: #666;\n}\n\n.information-input {\n  margin-top: 15px;\n}\n\n.information-input textarea {\n  resize: none;\n}\n\n#share-status-button {\n  margin-bottom: 15px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 766:
/***/ (function(module, exports) {

module.exports = "<h1 md-dialog-title>{{ title }}</h1>\n<md-dialog-content>{{ content }}</md-dialog-content>\n<md-dialog-actions class=\"mat-dialog-actions\">\n  <button md-button (click)=\"dialogRef.close()\">OK</button>\n</md-dialog-actions>\n"

/***/ }),

/***/ 767:
/***/ (function(module, exports) {

module.exports = "<md-card class=\"announcement\" *ngFor=\"let announcement of announcements\">\n  {{announcement.content}}\n  {{announcement.publisher.username}}\n\n</md-card>\n\n<md-input-container class=\"announcement-input\">\n    <textarea mdInput rows=\"1\"\n              mdTextareaAutosize mdAutosizeMaxRows=\"3\"\n              [(ngModel)]=\"announcementContent\">\n    </textarea>\n</md-input-container>\n\n<button md-raised-button id=\"publish-anncouncement-button\"\n        (click)=\"publishAnnouncementButtonClicked()\">Publish Announcement</button>\n"

/***/ }),

/***/ 768:
/***/ (function(module, exports) {

module.exports = "<div class=\"message-list\" #messageList>\n  <md-card class=\"message\" *ngFor=\"let message of messages\">\n    <img class=\"avatar\" src=\"{{ userService.getAvatarUrl(message.sender.username) }}\" />\n    <div class=\"message-body\">\n      <div class=\"user-header\">\n        <div class=\"username\">{{ message.sender.username }}</div>\n        <div [ngSwitch]=\"message.userStatus\">\n          <template [ngSwitchCase]=\"1\">\n            <md-icon class=\"status-icon status-ok\">check_circle</md-icon>\n          </template>\n          <template [ngSwitchCase]=\"2\">\n            <md-icon class=\"status-icon status-help\">error</md-icon>\n          </template>\n          <template [ngSwitchCase]=\"3\">\n            <md-icon class=\"status-icon status-emergency\">add_circle</md-icon>\n          </template>\n        </div>\n        <md-icon class=\"online-icon\"\n                 *ngIf=\"message.sender.online\">language</md-icon>\n      </div>\n      <div class=\"status-information\"\n           *ngIf=\"message.userStatusInformation != null && message.userStatusInformation.length != 0\">\n        {{ message.userStatusInformation }}\n      </div>\n      <div class=\"message-date\">{{ chatService.formatDate(message.date) }}</div>\n      <div class=\"message-content\">{{ message.content }}</div>\n    </div>\n  </md-card>\n</div>\n\n<div class=\"message-controls\">\n  <md-input-container class=\"message-input\">\n    <textarea mdInput rows=\"1\"\n              mdTextareaAutosize mdAutosizeMaxRows=\"3\"\n              [(ngModel)]=\"messageContent\">\n    </textarea>\n  </md-input-container>\n\n  <button md-mini-fab class=\"message-send-button\" (click)=\"sendMessage()\">\n    <md-icon>send</md-icon>\n  </button>\n</div>\n"

/***/ }),

/***/ 769:
/***/ (function(module, exports) {

module.exports = "<h1 md-dialog-title>{{ title }}</h1>\n<md-dialog-content>{{ content }}</md-dialog-content>\n<md-dialog-actions class=\"mat-dialog-actions\">\n  <button md-button (click)=\"dialogRef.close(false)\">{{ cancelButtonTitle }}</button>\n  <button md-button (click)=\"dialogRef.close(true)\">{{ confirmButtonTitle }}</button>\n</md-dialog-actions>\n"

/***/ }),

/***/ 770:
/***/ (function(module, exports) {

module.exports = "<div class=\"user\" *ngFor=\"let user of users\" routerLink=\"/chat/{{ user.userId }}\">\n  <img class=\"avatar\" src=\"{{ userService.getAvatarUrl(user.username) }}\" />\n  <div class=\"user-info\">\n    <div class=\"user-header\">\n      <div class=\"username\">{{ user.username }}</div>\n      <div [ngSwitch]=\"user.status\">\n        <template [ngSwitchCase]=\"1\">\n          <md-icon class=\"status-icon status-ok\">check_circle</md-icon>\n        </template>\n        <template [ngSwitchCase]=\"2\">\n          <md-icon class=\"status-icon status-help\">error</md-icon>\n        </template>\n        <template [ngSwitchCase]=\"3\">\n          <md-icon class=\"status-icon status-emergency\">add_circle</md-icon>\n        </template>\n      </div>\n      <md-icon class=\"online-icon\"\n               *ngIf=\"user.online\">language</md-icon>\n    </div>\n    <div class=\"empty-status-information\"\n         *ngIf=\"user.statusInformation === null || user.statusInformation.length === 0\">\n      No status information\n    </div>\n    <div class=\"status-information\"\n         *ngIf=\"user.statusInformation !== null && user.statusInformation.length !== 0\">\n      {{ user.statusInformation }}\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 771:
/***/ (function(module, exports) {

module.exports = "<h1>Welcome!</h1>\n<p>You can post status:</p>\n<ul>\n  <li>OK means \"I am OK, I do not need help.\"</li>\n  <li>Help means \"I need help, but this is not a life threatening emergency.\"</li>\n  <li>Emergency means \"I need help now, as this is a life threatening emergency!\"</li>\n  <li>Undefined means \"I am providing her status yet.\"</li>\n</ul>\n"

/***/ }),

/***/ 772:
/***/ (function(module, exports) {

module.exports = "<md-input-container class=\"login-input\">\n  <input mdInput [(ngModel)]=\"username\" placeholder=\"Username\" type=\"text\">\n</md-input-container>\n\n<md-input-container class=\"login-input\">\n  <input mdInput [(ngModel)]=\"password\" placeholder=\"Password\" type=\"password\">\n</md-input-container>\n\n<button md-raised-button id=\"login-button\" (click)=\"loginButtonClicked()\">Login</button>\n\n<span id=\"login-copyright\">Facepalm Special Entertainments ©2017</span>\n"

/***/ }),

/***/ 773:
/***/ (function(module, exports) {

module.exports = "<md-sidenav-container id=\"sidenav-container\">\n\n  <md-sidenav id=\"sidenav\" #sidenav>\n    <div id=\"sidenav-header\">\n\n    </div>\n    <div class=\"sidenav-item\"\n         routerLink=\"/home\" routerLinkActive=\"active\"\n         (click)=\"sidenav.close()\">\n      <md-icon class=\"sidenav-item-icon\">home</md-icon>\n      <span>Home</span>\n    </div>\n    <div class=\"sidenav-item\"\n         routerLink=\"/chat/public\" routerLinkActive=\"active\"\n         (click)=\"sidenav.close()\">\n      <md-icon class=\"sidenav-item-icon\">forum</md-icon>\n      <span>Public Chat</span>\n    </div>\n    <div class=\"sidenav-item\"\n         routerLink=\"/directory\" routerLinkActive=\"active\"\n         (click)=\"sidenav.close()\">\n      <md-icon class=\"sidenav-item-icon\">contacts</md-icon>\n      <span>User Directory</span>\n    </div>\n    <div class=\"sidenav-item\"\n         routerLink=\"/share_status\" routerLinkActive=\"active\"\n         (click)=\"sidenav.close()\">\n      <md-icon class=\"sidenav-item-icon\">create</md-icon>\n      <span>Share Status</span>\n    </div>\n    <div class=\"sidenav-item\"\n         routerLink=\"/announcements\" routerLinkActive=\"active\"\n         (click)=\"sidenav.close()\">\n      <md-icon class=\"sidenav-item-icon\">sms_failed</md-icon>\n      <span>Announcements</span>\n    </div>\n    <div class=\"sidenav-item\"\n         (click)=\"logoutButtonClicked(sidenav)\">\n      <md-icon class=\"sidenav-item-icon\">reply</md-icon>\n      <span>Log Out</span>\n    </div>\n  </md-sidenav>\n\n  <div id=\"sidenav-content\">\n\n    <div id=\"app-header\">\n      <button id=\"header-left-button\"\n              [class.invisible]=\"!userService.isUserLoggedIn()\"\n              (click)=\"sidenav.open()\">\n        <md-icon>menu</md-icon>\n      </button>\n      <span id=\"app-title\">Emergency Social Network</span>\n      <button id=\"header-right-button\" disabled></button>\n    </div>\n\n    <router-outlet></router-outlet>\n\n  </div>\n\n</md-sidenav-container>\n"

/***/ }),

/***/ 774:
/***/ (function(module, exports) {

module.exports = "<md-card class=\"status status-ok\"\n         [class.selected] = \"selectedStatus === 1\"\n         (click)=\"statusOkSelected()\">\n  <md-icon class=\"status-icon\">check_circle</md-icon>\n  <div class=\"status-info\">\n    <div class=\"status-title\">OK</div>\n    <div class=\"status-desc\">I am OK, I do not need help.</div>\n  </div>\n</md-card>\n\n<md-card class=\"status status-help\"\n         [class.selected] = \"selectedStatus === 2\"\n         (click)=\"statusHelpSelected()\">\n  <md-icon class=\"status-icon\">error</md-icon>\n  <div class=\"status-info\">\n    <div class=\"status-title\">Help</div>\n    <div class=\"status-desc\">I need help, but this is not a life threatening emergency.</div>\n  </div>\n</md-card>\n\n<md-card class=\"status status-emergency\"\n         [class.selected] = \"selectedStatus === 3\"\n         (click)=\"statusEmergencySelected()\">\n  <md-icon class=\"status-icon\">add_circle</md-icon>\n  <div class=\"status-info\">\n    <div class=\"status-title\">Emergency</div>\n    <div class=\"status-desc\">I need help now, as this is a life threatening emergency!</div>\n  </div>\n</md-card>\n\n<md-input-container class=\"information-input\">\n    <textarea mdInput placeholder=\"Additional Information\" rows=\"1\"\n              mdTextareaAutosize mdAutosizeMaxRows=\"3\"\n              [(ngModel)]=\"information\">\n    </textarea>\n</md-input-container>\n\n<button md-raised-button id=\"share-status-button\"\n        (click)=\"shareStatusButtonClicked()\">Share Status</button>\n"

/***/ })

},[1035]);
//# sourceMappingURL=main.bundle.js.map