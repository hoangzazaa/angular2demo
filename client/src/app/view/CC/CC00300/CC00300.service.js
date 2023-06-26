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
require("rxjs/add/operator/toPromise");
var User_model_1 = require("../../../model/core/User.model");
var common_service_1 = require("../../../service/common.service");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var md5_1 = require('ts-md5/dist/md5');
/**
 * Service CC003 call webApi to change password.
 *
 * @author manhnv
 */
var CC00300Service = (function (_super) {
    __extends(CC00300Service, _super);
    function CC00300Service(http, router) {
        _super.call(this, http, router);
    }
    CC00300Service.prototype.changePassword = function (currentPassword, newPassword, confirmNewPassword) {
        var _this = this;
        return this.postApi("/CC00301", {
            currentPassword: md5_1.Md5.hashStr(currentPassword),
            newPassword: md5_1.Md5.hashStr(newPassword),
            confirmNewPassword: md5_1.Md5.hashStr(confirmNewPassword)
        })
            .then(function (res) {
            _this.user = new User_model_1.User();
            _this.user.id = res.data["id"];
            _this.user.username = res.data["username"];
            _this.user.role = res.data["role"];
            _this.user.email = res.data["email"];
            _this.user.departmentId = res.data["departmentId"];
        }, function (err) {
            throw err;
        });
    };
    CC00300Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], CC00300Service);
    return CC00300Service;
}(common_service_1.CommonService));
exports.CC00300Service = CC00300Service;
//# sourceMappingURL=CC00300.service.js.map