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
var common_service_1 = require("../../../service/common.service");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var SF00308_data_1 = require("./SF00308.data");
var SF00308Req_1 = require("./request/SF00308Req");
var message_1 = require("../../../helper/message");
var message_2 = require("../../../helper/message");
var SF00308Service = (function (_super) {
    __extends(SF00308Service, _super);
    function SF00308Service(http, router) {
        _super.call(this, http, router);
    }
    SF00308Service.prototype.getInitData = function (dealCode) {
        var _this = this;
        this.pageData = new SF00308_data_1.SF00308Data();
        return this.getApi('SF0030801/' + dealCode).then(function (res) {
            _this.pageData.setSF00308Data(res.data);
        }).catch(function (err) {
            throw err;
        });
    };
    SF00308Service.prototype.saveData = function (answers) {
        var _this = this;
        var req = new SF00308Req_1.SF00308Req();
        req.answers = answers;
        App.loader('show');
        return this.postApi('SF0030802', req).then(function (res) {
            // delete all items in old array
            if (res.data["answers"] !== undefined) {
                for (var i = 0; i < res.data["answers"].length; i++) {
                    var answer = res.data["answers"][i];
                    _this.pageData.answersMap[answer.questionCode] = answer;
                }
                _this.pageData.refreshDefault1009Date();
            }
            App.loader('hide');
            $.notify({ message: message_1.default.get(message_2.MSG.SF00308.INF001) }, { type: 'info' });
        }).catch(function (err) {
            $.notify({ message: message_1.default.get(message_2.MSG.SF00308.ERR001) }, { type: 'danger' });
        });
    };
    SF00308Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00308Service);
    return SF00308Service;
}(common_service_1.CommonService));
exports.SF00308Service = SF00308Service;
//# sourceMappingURL=SF00308.service.js.map