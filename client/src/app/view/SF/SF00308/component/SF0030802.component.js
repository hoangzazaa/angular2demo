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
/** バーコード: JAN */
var QUESTION_CODE_BARCODE_JAN = 2061;
/** バーコード: ITF */
var QUESTION_CODE_BARCODE_ITF = 2062;
/** バーコード: GTIN */
var QUESTION_CODE_BARCODE_GTIN = 2063;
/** バーコード: UPC */
var QUESTION_CODE_BARCODE_UPC = 2064;
/** バーコード: その他 */
var QUESTION_CODE_BARCODE_OTHER = 2065;
/** バーコード質問コードの配列 */
var QUESTION_CODE_LIST_BARCODE = [
    QUESTION_CODE_BARCODE_JAN,
    QUESTION_CODE_BARCODE_ITF,
    QUESTION_CODE_BARCODE_GTIN,
    QUESTION_CODE_BARCODE_UPC,
    QUESTION_CODE_BARCODE_OTHER
];
/**
 * Created by hoangtd on 3/16/2017.
 */
var SF0030802Component = (function () {
    function SF0030802Component() {
        this.emitCancel = new core_1.EventEmitter();
        this.emitSave = new core_1.EventEmitter();
        this.mstSelect2001 = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SELECT_2001);
    }
    SF0030802Component.prototype.cancelTab2 = function () {
        this.emitCancel.emit();
    };
    SF0030802Component.prototype.saveTab2 = function () {
        this.emitSave.emit(this.pageData.TAB_2);
    };
    Object.defineProperty(SF0030802Component.prototype, "question2001_Select", {
        get: function () {
            var question = this.pageData.answerMap(2001);
            return question.selectBox1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(2001);
            question.selectBox1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question2002_Radio", {
        get: function () {
            var question = this.pageData.answerMap(2002);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030802Component.prototype._question2002_Radio = function (value) {
        var question = this.pageData.answerMap(2002);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030802Component.prototype, "question2003_Radio", {
        get: function () {
            var question = this.pageData.answerMap(2003);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030802Component.prototype._question2003_Radio = function (value) {
        var question = this.pageData.answerMap(2003);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030802Component.prototype, "question2004_Radio", {
        get: function () {
            var question = this.pageData.answerMap(2004);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030802Component.prototype._question2004_Radio = function (value) {
        var question = this.pageData.answerMap(2004);
        if (value == 2) {
            question.textArea1 = '';
        }
        question.radioButton = value;
    };
    Object.defineProperty(SF0030802Component.prototype, "question2004_Text", {
        get: function () {
            var question = this.pageData.answerMap(2004);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(2004);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question2005_Radio", {
        get: function () {
            var question = this.pageData.answerMap(2005);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030802Component.prototype._question2005_Radio = function (value) {
        var question = this.pageData.answerMap(2005);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030802Component.prototype, "question2006_Checkbox", {
        get: function () {
            var question = this.pageData.answerMap(2006);
            return format_util_1.FormatUtil.convertDataCheckBox(question.checkBox1);
        },
        set: function (value) {
            var question = this.pageData.answerMap(2006);
            question.checkBox1 = format_util_1.FormatUtil.convertDataCheckBox(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question20061_Text", {
        get: function () {
            var question = this.pageData.answerMap(2061);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(2061);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question20061_TextBorderStyle", {
        get: function () {
            return this.get_question2006_style(2061);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question20061_Checkbox", {
        get: function () {
            var question = this.pageData.answerMap(2061);
            return format_util_1.FormatUtil.convertDataCheckBox(question.checkBox1);
        },
        set: function (value) {
            var question = this.pageData.answerMap(2061);
            question.checkBox1 = format_util_1.FormatUtil.convertDataCheckBox(value);
            if (question.checkBox1 == 0) {
                question.textArea1 = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question20062_Text", {
        get: function () {
            var question = this.pageData.answerMap(2062);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(2062);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question20062_TextBorderStyle", {
        get: function () {
            return this.get_question2006_style(2062);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question20062_Checkbox", {
        get: function () {
            var question = this.pageData.answerMap(2062);
            return format_util_1.FormatUtil.convertDataCheckBox(question.checkBox1);
        },
        set: function (value) {
            var question = this.pageData.answerMap(2062);
            question.checkBox1 = format_util_1.FormatUtil.convertDataCheckBox(value);
            if (question.checkBox1 == 0) {
                question.textArea1 = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question20063_Text", {
        get: function () {
            var question = this.pageData.answerMap(2063);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(2063);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question20063_TextBorderStyle", {
        get: function () {
            return this.get_question2006_style(2063);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question20063_Checkbox", {
        get: function () {
            var question = this.pageData.answerMap(2063);
            return format_util_1.FormatUtil.convertDataCheckBox(question.checkBox1);
        },
        set: function (value) {
            var question = this.pageData.answerMap(2063);
            question.checkBox1 = format_util_1.FormatUtil.convertDataCheckBox(value);
            if (question.checkBox1 == 0) {
                question.textArea1 = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question20064_Text", {
        get: function () {
            var question = this.pageData.answerMap(2064);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(2064);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question20064_TextBorderStyle", {
        get: function () {
            return this.get_question2006_style(2064);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question20064_Checkbox", {
        get: function () {
            var question = this.pageData.answerMap(2064);
            return format_util_1.FormatUtil.convertDataCheckBox(question.checkBox1);
        },
        set: function (value) {
            var question = this.pageData.answerMap(2064);
            question.checkBox1 = format_util_1.FormatUtil.convertDataCheckBox(value);
            if (question.checkBox1 == 0) {
                question.textArea1 = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question20065_Text", {
        /** @return バーコードその他の入力値 */
        get: function () {
            var question = this.pageData.answerMap(2065);
            return question.textArea1;
        },
        /** @param value バーコードその他の入力値 */
        set: function (value) {
            var question = this.pageData.answerMap(2065);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question20065_TextBorderStyle", {
        /** @return バーコードその他のボーダースタイル */
        get: function () {
            return this.get_question2006_style(2065);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question20065_Checkbox", {
        /** @return バーコードその他のチェックボックス */
        get: function () {
            var question = this.pageData.answerMap(2065);
            return format_util_1.FormatUtil.convertDataCheckBox(question.checkBox1);
        },
        /** @param value バーコードその他のチェックボックス */
        set: function (value) {
            var question = this.pageData.answerMap(2065);
            question.checkBox1 = format_util_1.FormatUtil.convertDataCheckBox(value);
            if (question.checkBox1 == 0) {
                question.textArea1 = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    SF0030802Component.prototype.get_question2006_style = function (value) {
        var question = this.pageData.answerMap(value);
        if (question.checkBox1 == 1 && (question.textArea1 == undefined || question.textArea1 == null || question.textArea1 == "")) {
            // return "solid 2px #FF0000";
            return 'solid 2px #5c90d2';
        }
        return "";
    };
    /**
     * バーコードのチェックボックスを無効化するかどうか判定する
     *
     * @param questionCode 質問コード
     * @returns true: 無効, false: 有効
     */
    SF0030802Component.prototype.checkboxBarcodeDisabled = function (questionCode) {
        // 表示モード時は常に disable
        if (this.pageData.isView) {
            return false;
        }
        // チェックが入っている or 値が入力されていれば常に有効
        var question = this.pageData.answerMap(questionCode);
        if (hasBarcodeValue(question)) {
            return false;
        }
        // 既に 3 項目入力されていれば無効
        var barcodeCounts = 0;
        for (var _i = 0, QUESTION_CODE_LIST_BARCODE_1 = QUESTION_CODE_LIST_BARCODE; _i < QUESTION_CODE_LIST_BARCODE_1.length; _i++) {
            var code = QUESTION_CODE_LIST_BARCODE_1[_i];
            if (code != questionCode && hasBarcodeValue(this.pageData.answerMap(code))) {
                ++barcodeCounts;
            }
        }
        return barcodeCounts >= 3;
    };
    Object.defineProperty(SF0030802Component.prototype, "question2007_Text01", {
        get: function () {
            var question = this.pageData.answerMap(2007);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(2007);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question2007_Text02", {
        get: function () {
            var question = this.pageData.answerMap(2007);
            return question.textArea2;
        },
        set: function (value) {
            var question = this.pageData.answerMap(2007);
            question.textArea2 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030802Component.prototype, "question2008_Radio", {
        get: function () {
            var question = this.pageData.answerMap(2008);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030802Component.prototype._question2008_Radio = function (value) {
        var question = this.pageData.answerMap(2008);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030802Component.prototype, "question2009_Radio", {
        get: function () {
            var question = this.pageData.answerMap(2009);
            return question.radioButton;
        },
        enumerable: true,
        configurable: true
    });
    SF0030802Component.prototype._question2009_Radio = function (value) {
        var question = this.pageData.answerMap(2009);
        question.radioButton = value;
    };
    Object.defineProperty(SF0030802Component.prototype, "question2010_Text", {
        get: function () {
            var question = this.pageData.answerMap(2010);
            return question.textArea1;
        },
        set: function (value) {
            var question = this.pageData.answerMap(2010);
            question.textArea1 = value;
        },
        enumerable: true,
        configurable: true
    });
    SF0030802Component.prototype.checkInput = function (evt) {
        if (evt.which == 45) {
            evt.preventDefault();
            return;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF00308_data_1.SF00308Data)
    ], SF0030802Component.prototype, "pageData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030802Component.prototype, "emitCancel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030802Component.prototype, "emitSave", void 0);
    SF0030802Component = __decorate([
        core_1.Component({
            selector: 'div[sf0030802]',
            templateUrl: 'SF0030802.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030802Component);
    return SF0030802Component;
}());
exports.SF0030802Component = SF0030802Component;
/**
 * チェックシートバーコード欄に値が入っているかどうか判定する
 *
 * @param question チェックシートバーコード欄
 * @returns true: 入力されている, false: 入力されていない
 */
function hasBarcodeValue(question) {
    return !!(question.checkBox1 || (question.textArea1 && question.textArea1.length));
}
//# sourceMappingURL=SF0030802.component.js.map