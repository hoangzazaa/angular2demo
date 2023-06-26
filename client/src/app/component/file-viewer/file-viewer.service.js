"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var common_service_1 = require("../../service/common.service");
var FileViewerService = (function (_super) {
    __extends(FileViewerService, _super);
    function FileViewerService(http, router, route) {
        _super.call(this, http, router);
    }
    FileViewerService.prototype.checkResource = function (url) {
        var self = this;
        return new Promise(function (resolve, reject) {
            if (!url)
                return reject();
            self.http.get(url)
                .toPromise()
                .then(function (res) {
                var hasImage = res.headers.get("content-type").includes("image");
                hasImage ? resolve() : reject();
            })
                .catch(function () {
                reject();
            });
        })
            .then(function () { return true; })
            .catch(function () { return false; });
    };
    FileViewerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, router_1.ActivatedRoute])
    ], FileViewerService);
    return FileViewerService;
}(common_service_1.CommonService));
exports.FileViewerService = FileViewerService;
//# sourceMappingURL=file-viewer.service.js.map