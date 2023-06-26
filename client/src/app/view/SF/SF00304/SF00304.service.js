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
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var common_service_1 = require("../../../service/common.service");
var SF0030404Req_1 = require("../../../model/request/SF0030404Req");
var QuotationPrintTemplate_model_1 = require("../../../model/core/QuotationPrintTemplate.model");
/**
 * Created by haipt on 11/8/2016.
 */
var SF00304Service = (function (_super) {
    __extends(SF00304Service, _super);
    function SF00304Service(http, router) {
        _super.call(this, http, router);
    }
    SF00304Service.prototype.getAllQuotationTemplates = function () {
        return this.getApi("/SF0030401").then(function (res) {
            var req = new SF0030404Req_1.SF0030404Req();
            req.quotationTemplates = [];
            res.data["quotationTemplateJsons"].forEach(function (tmp) {
                var quotationTemplate = new QuotationPrintTemplate_model_1.QuotationPrintTemplate;
                quotationTemplate.setQuotationPrintTemplate(tmp);
                req.quotationTemplates.push(tmp);
            });
            return req;
        });
    };
    SF00304Service.prototype.exportFiles = function (quotationCode, option, fileName) {
        return this.getApi("/SF0030402/" + quotationCode + "/" + option + "/" + encodeURIComponent(fileName)).then(function (res) {
            return res.data;
        });
    };
    SF00304Service.prototype.exportPdf = function (quotationCode, option, fileName) {
        return this.getApi("/SF0030402/" + quotationCode + "/" + option + "/" + encodeURIComponent(fileName))
            .then(function (res) {
            return { pdfFilePath: res.data.pdfFilePath, pngFilePath: res.data.pngFilePath };
        })
            .catch(function (err) {
            throw err;
        });
    };
    SF00304Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00304Service);
    return SF00304Service;
}(common_service_1.CommonService));
exports.SF00304Service = SF00304Service;
//# sourceMappingURL=SF00304.service.js.map