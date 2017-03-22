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
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs";
var HttpService = (function () {
    function HttpService(http) {
        var _this = this;
        this.http = http;
        this.baseUri = "https://sv4-esn-services.herokuapp.com";
        //baseUri = "http://localhost:3000";
        this.jwt = localStorage.getItem('jwt');
        this.get = function (path, params) {
            var requestUri = "" + _this.baseUri + path;
            var requestOptions = new RequestOptions();
            if (params) {
                var urlSearchParams_1 = new URLSearchParams();
                Object.keys(params).forEach(function (key) {
                    urlSearchParams_1.set(key, params[key]);
                });
                requestOptions.search = urlSearchParams_1;
            }
            if (_this.jwt) {
                var headers = new Headers({ 'Authorization': "JWT " + _this.jwt });
                requestOptions.headers = headers;
            }
            return _this.http.get(requestUri, requestOptions)
                .map(function (res) { return res.json(); })
                .catch(_this.handleError);
        };
        this.post = function (path, params) {
            var requestUri = encodeURI("" + _this.baseUri + path);
            var requestOptions = new RequestOptions();
            requestOptions.headers = new Headers({ 'Content-Type': 'application/json' });
            if (_this.jwt) {
                requestOptions.headers.append('Authorization', "JWT " + _this.jwt);
            }
            return _this.http.post(requestUri, JSON.stringify(params), requestOptions)
                .map(function (res) { return res.json(); })
                .catch(_this.handleError);
        };
        this.put = function (path, params) {
            var requestUri = encodeURI("" + _this.baseUri + path);
            var requestOptions = new RequestOptions();
            requestOptions.headers = new Headers({ 'Content-Type': 'application/json' });
            if (_this.jwt) {
                requestOptions.headers.append('Authorization', "JWT " + _this.jwt);
            }
            return _this.http.put(requestUri, JSON.stringify(params), requestOptions)
                .map(function (res) { return res.json(); })
                .catch(_this.handleError);
        };
        this.delete = function (path, params) {
            var requestUri = "" + _this.baseUri + path;
            var requestOptions = new RequestOptions();
            if (params) {
                var urlSearchParams_2 = new URLSearchParams();
                Object.keys(params).forEach(function (key) {
                    urlSearchParams_2.set(key, params[key]);
                });
                requestOptions.search = urlSearchParams_2;
            }
            if (_this.jwt) {
                var headers = new Headers({ 'Authorization': "JWT " + _this.jwt });
                requestOptions.headers = headers;
            }
            return _this.http.delete(requestUri, requestOptions)
                .map(function (res) { return res.json(); })
                .catch(_this.handleError);
        };
        this.handleError = function (error) {
            return Observable.throw(error.json());
        };
    }
    return HttpService;
}());
HttpService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], HttpService);
export { HttpService };
//# sourceMappingURL=/Users/macbookpro/development/cmu/fse/s17-ESN-SV4/sv4-esn-view/src/app/services/http/http.service.js.map