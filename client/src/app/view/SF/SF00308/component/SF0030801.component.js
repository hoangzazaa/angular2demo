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
var SF0030801Component = (function () {
    function SF0030801Component() {
        this.emitCancel = new core_1.EventEmitter();
        this.emitSave = new core_1.EventEmitter();
        this.mstDistances = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.DISTANCE);
        this.mstSelect1008_1 = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SELECT_1008_1);
        this.mstSelect1008_2 = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SELECT_1008_2);
        this.mstSelect1008_3 = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SELECT_1008_3);
        this.mstSelect1010 = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SELECT_1010);
        this.mstSelect1011_1 = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SELECT_1011_1);
        this.mstSelect1011_2 = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SELECT_1011_2);
    }
    SF0030801Component.prototype.cancelTab1 = function () {
        this.emitCancel.emit();
    };
    SF0030801Component.prototype.saveTab1 = function () {
        // emit save data tab number
        this.emitSave.emit(this.pageData.TAB_1);
    };
    Object.defineProperty(SF0030801Component.prototype, "question1001_Radio", {
        get: function () {
            var question = this.pageData.answerMap(1001);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030801Component.prototype._question1001_Radio = function (value) {
        var question = this.pageData.answerMap(1001);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030801Component.prototype, "question1002_Radio", {
        get: function () {
            var question = this.pageData.answerMap(1002);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030801Component.prototype._question1002_Radio = function (value) {
        var question = this.pageData.answerMap(1002);
        if (value === 1) {
            question.textArea1 = '';
        }
        question.radioButton = value;
    };
    Object.defineProperty(SF0030801Component.prototype, "question1002_Text", {
        get: function () {
            var question = this.pageData.answerMap(1002);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(1002);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030801Component.prototype, "question1003_Radio", {
        get: function () {
            var question = this.pageData.answerMap(1003);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030801Component.prototype._question1003_Radio = function (value) {
        var question = this.pageData.answerMap(1003);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030801Component.prototype, "question1004_Text1", {
        get: function () {
            var question = this.pageData.answerMap(1004);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(1004);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030801Component.prototype, "question1004_Text2", {
        get: function () {
            var question = this.pageData.answerMap(1004);
            return question.textArea2;
        },
        set: function (value) {
            var question = this.pageData.answerMap(1004);
            question.textArea2 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030801Component.prototype, "question1005_Radio", {
        get: function () {
            var question = this.pageData.answerMap(1005);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030801Component.prototype._question1005_Radio = function (value) {
        var question = this.pageData.answerMap(1005);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030801Component.prototype, "question1005_Select", {
        get: function () {
            var question = this.pageData.answerMap(1005);
            return question.selectBox1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(1005);
            question.selectBox1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030801Component.prototype, "question1006_Text1", {
        get: function () {
            var question = this.pageData.answerMap(1006);
            if (question.textArea1) {
                return new Date(question.textArea1);
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    SF0030801Component.prototype._question1006_Text1_Date = function (value) {
        var question = this.pageData.answerMap(1006);
        question.textArea1 = value;
    };
    Object.defineProperty(SF0030801Component.prototype, "question1006_Text2", {
        get: function () {
            var question = this.pageData.answerMap(1006);
            if (question.textArea2) {
                return new Date(question.textArea2);
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    SF0030801Component.prototype._question1006_Text2_Date = function (value) {
        var question = this.pageData.answerMap(1006);
        question.textArea2 = value;
    };
    Object.defineProperty(SF0030801Component.prototype, "question1007_Text", {
        get: function () {
            var question = this.pageData.answerMap(1007);
            return format_util_1.FormatUtil.isNaN(parseInt(question.textArea1));
        },
        set: function (value) {
            var question = this.pageData.answerMap(1007);
            question.textArea1 = value + '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030801Component.prototype, "question1008_Select1", {
        get: function () {
            var question = this.pageData.answerMap(1008);
            if (question.selectBox1 == null || question.selectBox1 == undefined) {
                // set default is x/x
                question.selectBox1 = 4;
            }
            return question.selectBox1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(1008);
            question.selectBox1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030801Component.prototype, "question1008_Number", {
        get: function () {
            var question = this.pageData.answerMap(1008);
            if (!question.textArea1)
                question.textArea1 = '0';
            return format_util_1.FormatUtil.isNaN(parseInt(question.textArea1));
        },
        set: function (value) {
            var question = this.pageData.answerMap(1008);
            var numberLimit = value;
            if (!numberLimit || numberLimit == undefined)
                numberLimit = 0;
            question.textArea1 = numberLimit + '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030801Component.prototype, "question1008_Select2", {
        get: function () {
            //http://fridaynight.vnext.vn/issues/1635
            var question = this.pageData.answerMap(1008);
            if (!question.selectBox2)
                question.selectBox2 = 0;
            return question.selectBox2;
        },
        set: function (value) {
            var question = this.pageData.answerMap(1008);
            question.selectBox2 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030801Component.prototype, "question1008_Select3", {
        get: function () {
            var question = this.pageData.answerMap(1008);
            return question.selectBox3;
        },
        set: function (value) {
            var question = this.pageData.answerMap(1008);
            question.selectBox3 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030801Component.prototype, "question1009_Number", {
        get: function () {
            var question = this.pageData.answerMap(1009);
            return format_util_1.FormatUtil.isNaN(parseInt(question.textArea1));
        },
        set: function (value) {
            var question = this.pageData.answerMap(1009);
            question.textArea1 = value + '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030801Component.prototype, "question1009_Date", {
        get: function () {
            var question = this.pageData.answerMap(1009);
            if (question.textArea2) {
                return new Date(question.textArea2);
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030801Component.prototype, "defaultQuestion1009_Date", {
        get: function () {
            return this.pageData.defaultQuestion1009_Date;
        },
        enumerable: true,
        configurable: true
    });
    SF0030801Component.prototype._question1009_Date = function (value) {
        var question = this.pageData.answerMap(1009);
        question.textArea2 = value;
    };
    Object.defineProperty(SF0030801Component.prototype, "question1010_Select", {
        get: function () {
            var question = this.pageData.answerMap(1010);
            return question.selectBox1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(1010);
            question.selectBox1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030801Component.prototype, "question1011_Select1", {
        get: function () {
            var question = this.pageData.answerMap(1011);
            return question.selectBox1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(1011);
            question.selectBox1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030801Component.prototype, "question1011_Radio", {
        get: function () {
            var question = this.pageData.answerMap(1011);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030801Component.prototype._question1011_Radio = function (value) {
        var question = this.pageData.answerMap(1011);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030801Component.prototype, "question1011_Select3", {
        get: function () {
            var question = this.pageData.answerMap(1011);
            return question.selectBox3;
        },
        set: function (value) {
            var question = this.pageData.answerMap(1011);
            question.selectBox3 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030801Component.prototype, "question1012_Select1", {
        get: function () {
            var question = this.pageData.answerMap(1011);
            return question.selectBox1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(1011);
            question.selectBox1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030801Component.prototype, "question1012", {
        get: function () {
            var question = this.pageData.answerMap(1012);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(1012);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030801Component.prototype, "question1011_Select2", {
        get: function () {
            var question = this.pageData.answerMap(1011);
            return question.selectBox2;
        },
        set: function (value) {
            var question = this.pageData.answerMap(1011);
            question.selectBox2 = value;
        },
        enumerable: true,
        configurable: true
    });
    SF0030801Component.prototype.checkInput = function (evt) {
        if (evt.which == 45) {
            evt.preventDefault();
            return;
        }
    };
    Object.defineProperty(SF0030801Component.prototype, "defaultStyle", {
        get: function () {
            return this.pageData.defaultFieldBorderCss;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF00308_data_1.SF00308Data)
    ], SF0030801Component.prototype, "pageData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030801Component.prototype, "emitCancel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030801Component.prototype, "emitSave", void 0);
    SF0030801Component = __decorate([
        core_1.Component({
            selector: 'div[sf0030801]',
            templateUrl: 'SF0030801.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030801Component);
    return SF0030801Component;
}());
exports.SF0030801Component = SF0030801Component;
//# sourceMappingURL=SF0030801.component.js.map