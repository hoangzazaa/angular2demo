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
var SF0030804Component = (function () {
    function SF0030804Component() {
        this.emitCancel = new core_1.EventEmitter();
        this.emitSave = new core_1.EventEmitter();
        this.mstSelect4001 = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SELECT_4001);
    }
    SF0030804Component.prototype.cancelTab4 = function () {
        this.emitCancel.emit();
    };
    SF0030804Component.prototype.saveTab4 = function () {
        this.emitSave.emit(this.pageData.TAB_4);
    };
    Object.defineProperty(SF0030804Component.prototype, "question4002_Radio", {
        get: function () {
            var question = this.pageData.answerMap(4002);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030804Component.prototype._question4002_Radio = function (value) {
        var question = this.pageData.answerMap(4002);
        if (value != 1) {
            question.textArea1 = '';
        }
        question.radioButton = value;
    };
    Object.defineProperty(SF0030804Component.prototype, "question4002_Text", {
        get: function () {
            var question = this.pageData.answerMap(4002);
            return format_util_1.FormatUtil.isNaN(parseInt(question.textArea1));
        },
        set: function (value) {
            var question = this.pageData.answerMap(4002);
            question.textArea1 = value + '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030804Component.prototype, "question4003_Radio", {
        get: function () {
            var question = this.pageData.answerMap(4003);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030804Component.prototype._question4003_Radio = function (value) {
        var question = this.pageData.answerMap(4003);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030804Component.prototype, "question4004_Radio", {
        get: function () {
            var question = this.pageData.answerMap(4004);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030804Component.prototype._question4004_Radio = function (value) {
        var question = this.pageData.answerMap(4004);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030804Component.prototype, "question4005_Radio", {
        get: function () {
            var question = this.pageData.answerMap(4005);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030804Component.prototype._question4005_Radio = function (value) {
        var question = this.pageData.answerMap(4005);
        if (value != 1) {
            question.textArea1 = '';
        }
        question.radioButton = value;
    };
    Object.defineProperty(SF0030804Component.prototype, "question4005_Text", {
        get: function () {
            var question = this.pageData.answerMap(4005);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(4005);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030804Component.prototype, "question4006_Text", {
        get: function () {
            var question = this.pageData.answerMap(4006);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(4006);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030804Component.prototype, "question4007_Select", {
        get: function () {
            var question = this.pageData.answerMap(4007);
            if (question.selectBox1 == null || question.selectBox1 == undefined) {
                question.selectBox1 = 1;
            }
            return question.selectBox1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(4007);
            question.selectBox1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030804Component.prototype, "question4008_Text", {
        get: function () {
            var question = this.pageData.answerMap(4008);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(4008);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030804Component.prototype, "question4009_Radio", {
        get: function () {
            var question = this.pageData.answerMap(4009);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030804Component.prototype._question4009_Radio = function (value) {
        var question = this.pageData.answerMap(4009);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030804Component.prototype, "question4010_CheckBox1", {
        get: function () {
            var question = this.pageData.answerMap(4010);
            return format_util_1.FormatUtil.convertDataCheckBox(question.checkBox1);
        },
        set: function (value) {
            var question = this.pageData.answerMap(4010);
            question.checkBox1 = format_util_1.FormatUtil.convertDataCheckBox(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030804Component.prototype, "question4010_CheckBox2", {
        get: function () {
            var question = this.pageData.answerMap(4010);
            return format_util_1.FormatUtil.convertDataCheckBox(question.checkBox2);
        },
        set: function (value) {
            var question = this.pageData.answerMap(4010);
            question.checkBox2 = format_util_1.FormatUtil.convertDataCheckBox(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030804Component.prototype, "question4010_CheckBox3", {
        get: function () {
            var question = this.pageData.answerMap(4010);
            return format_util_1.FormatUtil.convertDataCheckBox(question.checkBox3);
        },
        set: function (value) {
            var question = this.pageData.answerMap(4010);
            question.checkBox3 = format_util_1.FormatUtil.convertDataCheckBox(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030804Component.prototype, "question4011_Text", {
        get: function () {
            var question = this.pageData.answerMap(4011);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(4011);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030804Component.prototype, "question4012_Radio", {
        get: function () {
            var question = this.pageData.answerMap(4012);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030804Component.prototype._question4012_Radio = function (value) {
        var question = this.pageData.answerMap(4012);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030804Component.prototype, "question4013_Text", {
        get: function () {
            var question = this.pageData.answerMap(4013);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(4013);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030804Component.prototype, "question4014_Number", {
        get: function () {
            var question = this.pageData.answerMap(4014);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(4014);
            question.textArea1 = value + '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030804Component.prototype, "question4015_Text01", {
        get: function () {
            var question = this.pageData.answerMap(4015);
            return format_util_1.FormatUtil.isNaN(parseInt(question.textArea1));
        },
        set: function (value) {
            var question = this.pageData.answerMap(4015);
            question.textArea1 = value + '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030804Component.prototype, "question4015_Text02", {
        get: function () {
            var question = this.pageData.answerMap(4015);
            return format_util_1.FormatUtil.isNaN(parseInt(question.textArea2));
        },
        set: function (value) {
            var question = this.pageData.answerMap(4015);
            question.textArea2 = value + '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030804Component.prototype, "question4016_Radio", {
        get: function () {
            var question = this.pageData.answerMap(4016);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030804Component.prototype._question4016_Radio = function (value) {
        var question = this.pageData.answerMap(4016);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030804Component.prototype, "question4017_Radio", {
        get: function () {
            var question = this.pageData.answerMap(4017);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030804Component.prototype._question4017_Radio = function (value) {
        var question = this.pageData.answerMap(4017);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030804Component.prototype, "question4018_Radio", {
        get: function () {
            var question = this.pageData.answerMap(4018);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030804Component.prototype._question4018_Radio = function (value) {
        var question = this.pageData.answerMap(4018);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030804Component.prototype, "question4019_Radio", {
        get: function () {
            var question = this.pageData.answerMap(4019);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030804Component.prototype._question4019_Radio = function (value) {
        var question = this.pageData.answerMap(4019);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030804Component.prototype, "question4020_Text", {
        get: function () {
            var question = this.pageData.answerMap(4020);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(4020);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    SF0030804Component.prototype.checkInput = function (evt) {
        if (evt.which == 45) {
            evt.preventDefault();
            return;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF00308_data_1.SF00308Data)
    ], SF0030804Component.prototype, "pageData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030804Component.prototype, "emitCancel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030804Component.prototype, "emitSave", void 0);
    SF0030804Component = __decorate([
        core_1.Component({
            selector: 'div[sf0030804]',
            templateUrl: 'SF0030804.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030804Component);
    return SF0030804Component;
}());
exports.SF0030804Component = SF0030804Component;
//# sourceMappingURL=SF0030804.component.js.map