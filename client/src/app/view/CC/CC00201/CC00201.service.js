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
require("rxjs/add/operator/toPromise");
var common_1 = require("@angular/common");
var common_service_1 = require("../../../service/common.service");
/**
 * This service use to recover password.
 */
var CC00201Service = (function (_super) {
    __extends(CC00201Service, _super);
    function CC00201Service(http, router, location) {
        _super.call(this, http, router);
        this.location = location;
    }
    CC00201Service.prototype.recoverPassword = function (email) {
        return this.postApi("/CC00201", {
            email: email
        });
    };
    CC00201Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, common_1.Location])
    ], CC00201Service);
    return CC00201Service;
}(common_service_1.CommonService));
exports.CC00201Service = CC00201Service;
//# sourceMappingURL=CC00201.service.js.map