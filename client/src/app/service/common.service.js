"use strict";
var http_1 = require("@angular/http");
/**
 * Created by Teddy on 18/09/2016.
 */
var CommonService = (function () {
    function CommonService(http, router) {
        this.http = http;
        this.router = router;
    }
    CommonService.prototype.getApi = function (webApi) {
        var _this = this;
        var self = this;
        return new Promise(function (resolve, reject) {
            self.http.get(webApi)
                .toPromise()
                .then(function (response) {
                var body = response.json();
                resolve(body);
            })
                .catch(function (err) {
                reject(err);
            });
        })
            .then(function (body) {
            if (body["error"] == undefined) {
                return body["res"];
            }
            else {
                throw body["error"];
            }
        }, function (err) {
            App.loader('hide');
            if (err.status == 500) {
                _this.navigateTo("500 error", "/error/500");
                return _this.router.navigate(['/error/500']);
            }
            throw err;
        });
    };
    CommonService.prototype.postApi = function (webApi, data) {
        var _this = this;
        var self = this;
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return new Promise(function (resolve, reject) {
            self.http.post(webApi, JSON.stringify(data), { headers: headers })
                .toPromise()
                .then(function (response) {
                var body = response.json();
                resolve(body);
            })
                .catch(function (err) {
                reject(err);
            });
        })
            .then(function (body) {
            if (body["error"] == undefined) {
                return body["res"];
            }
            else {
                throw body["error"];
            }
        }, function (err) {
            App.loader('hide');
            if (err.status == 500) {
                _this.navigateTo("500 error", "/error/500");
                return _this.router.navigate(['/error/500']);
            }
            throw err;
        });
    };
    CommonService.prototype.navigateTo = function (functionName, path) {
        var self = this;
        var req = {
            function: functionName,
            transitionPath: path
        };
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        self.http.post("/CC0010102", JSON.stringify(req), { headers: headers })
            .toPromise().then().catch();
    };
    return CommonService;
}());
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map