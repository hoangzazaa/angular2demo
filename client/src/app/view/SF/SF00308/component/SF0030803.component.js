"use strict";
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
var SF00308_data_1 = require("../SF00308.data");
var format_util_1 = require("../../../../util/format-util");
var mst_data_type_1 = require("../../../../helper/mst-data-type");
var data_util_1 = require("../../../../util/data-util");
/**
 * Created by hoangtd on 3/16/2017.
 */
var SF0030803Component = (function () {
    function SF0030803Component() {
        this.emitCancel = new core_1.EventEmitter();
        this.emitSave = new core_1.EventEmitter();
        this.mstSelect3002 = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SELECT_3002);
    }
    SF0030803Component.prototype.cancelTab3 = function () {
        this.emitCancel.emit();
    };
    SF0030803Component.prototype.saveTab3 = function () {
        this.emitSave.emit(this.pageData.TAB_3);
    };
    Object.defineProperty(SF0030803Component.prototype, "question3001_Radio", {
        get: function () {
            var question = this.pageData.answerMap(3001);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030803Component.prototype._question3001_Radio = function (value) {
        var question = this.pageData.answerMap(3001);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030803Component.prototype, "question3002_Select", {
        get: function () {
            var question = this.pageData.answerMap(3002);
            return question.selectBox1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(3002);
            question.selectBox1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030803Component.prototype, "question3003_Radio", {
        get: function () {
            var question = this.pageData.answerMap(3003);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030803Component.prototype._question3003_Radio = function (value) {
        var question = this.pageData.answerMap(3003);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030803Component.prototype, "question3004_Radio", {
        get: function () {
            var question = this.pageData.answerMap(3004);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030803Component.prototype._question3004_Radio = function (value) {
        var question = this.pageData.answerMap(3004);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030803Component.prototype, "question3005_Radio", {
        get: function () {
            var question = this.pageData.answerMap(3005);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030803Component.prototype._question3005_Radio = function (value) {
        var question = this.pageData.answerMap(3005);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030803Component.prototype, "question3006_Radio", {
        get: function () {
            var question = this.pageData.answerMap(3006);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030803Component.prototype._question3006_Radio = function (value) {
        var question = this.pageData.answerMap(3006);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030803Component.prototype, "question3007_Radio", {
        get: function () {
            var question = this.pageData.answerMap(3007);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030803Component.prototype._question3007_Radio = function (value) {
        var question = this.pageData.answerMap(3007);
        if (value != 1) {
            question.textArea1 = '';
        }
        question.radioButton = value;
    };
    Object.defineProperty(SF0030803Component.prototype, "question3007_Text", {
        get: function () {
            var question = this.pageData.answerMap(3007);
            return format_util_1.FormatUtil.isNaN(parseInt(question.textArea1));
        },
        set: function (value) {
            var question = this.pageData.answerMap(3007);
            question.textArea1 = value + '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030803Component.prototype, "question3008_Text", {
        get: function () {
            var question = this.pageData.answerMap(3008);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(3008);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    SF0030803Component.prototype.checkInput = function (evt) {
        if (evt.which == 45) {
            evt.preventDefault();
            return;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF00308_data_1.SF00308Data)
    ], SF0030803Component.prototype, "pageData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030803Component.prototype, "emitCancel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030803Component.prototype, "emitSave", void 0);
    SF0030803Component = __decorate([
        core_1.Component({
            selector: 'div[sf0030803]',
            templateUrl: 'SF0030803.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030803Component);
    return SF0030803Component;
}());
exports.SF0030803Component = SF0030803Component;
//# sourceMappingURL=SF0030803.component.js.map