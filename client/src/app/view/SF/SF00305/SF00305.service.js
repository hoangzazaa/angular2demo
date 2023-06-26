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
var common_service_1 = require("../../../service/common.service");
var SF00305_data_1 = require("./SF00305.data");
var SF00305Service = (function (_super) {
    __extends(SF00305Service, _super);
    function SF00305Service(http, router) {
        _super.call(this, http, router);
    }
    /**
     * Get init SF00305
     *
     * @param quotationCode
     * @returns {Promise<void>}
     */
    SF00305Service.prototype.getInit = function (quotationCode) {
        var _this = this;
        return this.getApi("SF0030501/" + quotationCode).then(function (res) {
            _this.pageData = new SF00305_data_1.SF00305Data();
            _this.pageData.setSF00305Data(res.data);
        }).catch(function (err) {
            throw err;
        });
    };
    /**
     * Send mail request
     */
    SF00305Service.prototype.sendMail = function (pageData) {
        var data = {
            dealCode: pageData.dealCode,
            recipients: pageData.recipients,
            cc: pageData.cc,
            subject: pageData.subject,
            mailContent: pageData.mailContent,
            attachFiles: pageData.attachFiles,
            mimeTypes: pageData.mimeTypes,
            quotationCode: pageData.quotationCode,
            timestamp: pageData.timestamp
        };
        return this.postApi("SF0030502", data).catch(function (err) {
            throw err;
        });
    };
    SF00305Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00305Service);
    return SF00305Service;
}(common_service_1.CommonService));
exports.SF00305Service = SF00305Service;
//# sourceMappingURL=SF00305.service.js.map