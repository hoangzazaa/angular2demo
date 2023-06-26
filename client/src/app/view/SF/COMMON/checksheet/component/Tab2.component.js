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
/**
 * Created by manhnv on 3/21/2017.
 */
var core_1 = require("@angular/core");
var CheckSheet_data_1 = require("../CheckSheet.data");
var mst_data_type_1 = require("../../../../../helper/mst-data-type");
var data_util_1 = require("../../../../../util/data-util");
var format_util_1 = require("../../../../../util/format-util");
var Tab2Component = (function () {
    function Tab2Component() {
    }
    Object.defineProperty(Tab2Component.prototype, "question2001_Select", {
        // implement method get question tab 2
        get: function () {
            var question = this.dataTab.answerMap(2001);
            var distances = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SELECT_2001);
            var data = distances.find(function (item) {
                return item.id == question.selectBox1;
            });
            // get name
            return this.dataTab.valueItem(data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab2Component.prototype, "question2002_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(2002);
            if (question.radioButton == 1) {
                return 'はい';
            }
            else if (question.radioButton == 2) {
                return 'いいえ';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab2Component.prototype, "question2003_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(2003);
            if (question.radioButton == 1) {
                return 'コスト';
            }
            else if (question.radioButton == 2) {
                return '作業性';
            }
            else if (question.radioButton == 3) {
                return 'デザイン';
            }
            else if (question.radioButton == 4) {
                return 'その他';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab2Component.prototype, "question2004_Text", {
        get: function () {
            var question = this.dataTab.answerMap(2004);
            if (question.radioButton == 1 && question.textArea1) {
                var answer = null;
                if (question.textArea1 != undefined) {
                    answer = 'はい' + '(材料名 ' + question.textArea1 + ')';
                }
                return answer;
            }
            else if (question.radioButton == 2) {
                return 'いいえ';
            }
            return "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab2Component.prototype, "question2005_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(2005);
            if (question.radioButton == 1) {
                return 'はい';
            }
            else if (question.radioButton == 2) {
                return 'いいえ';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab2Component.prototype, "question2006_CheckBox", {
        get: function () {
            var question = this.dataTab.answerMap(2006);
            if (question.checkBox1 == 1) {
                return 'リサイクル';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab2Component.prototype, "question2061_Text", {
        get: function () {
            var question = this.dataTab.answerMap(2061);
            if (question.checkBox1)
                return format_util_1.FormatUtil.getAnswer('JAN', question.textArea1);
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab2Component.prototype, "question2062_Text", {
        get: function () {
            var question = this.dataTab.answerMap(2062);
            if (question.checkBox1)
                return format_util_1.FormatUtil.getAnswer('ITF', question.textArea1);
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab2Component.prototype, "question2063_Text", {
        get: function () {
            var question = this.dataTab.answerMap(2063);
            if (question.checkBox1)
                return format_util_1.FormatUtil.getAnswer('GTIN', question.textArea1);
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab2Component.prototype, "question2007_Text", {
        get: function () {
            var question = this.dataTab.answerMap(2007);
            var answer1 = '';
            if (question.textArea1) {
                answer1 = question.textArea1 + '色';
            }
            var answer2 = '';
            if (question.textArea2) {
                answer2 = question.textArea2 + '色（特殊色）';
            }
            return format_util_1.FormatUtil.getAnswer(answer1, answer2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab2Component.prototype, "question2008_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(2008);
            if (question.radioButton == 1) {
                return 'はい';
            }
            else if (question.radioButton == 2) {
                return 'いいえ';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab2Component.prototype, "question2009_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(2009);
            if (question.radioButton == 1) {
                return 'はい';
            }
            else if (question.radioButton == 2) {
                return 'いいえ';
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', CheckSheet_data_1.CheckSheetData)
    ], Tab2Component.prototype, "dataTab", void 0);
    Tab2Component = __decorate([
        core_1.Component({
            selector: '[component-tab2]',
            templateUrl: 'Tab2.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], Tab2Component);
    return Tab2Component;
}());
exports.Tab2Component = Tab2Component;
//# sourceMappingURL=Tab2.component.js.map