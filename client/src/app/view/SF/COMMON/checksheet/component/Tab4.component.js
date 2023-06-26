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
var number_format_pipe_1 = require("../../../../../pipe/number-format.pipe");
var format_util_1 = require("../../../../../util/format-util");
var Tab4Component = (function () {
    function Tab4Component() {
        // implement method get question tab 4
        this.numberFormat = new number_format_pipe_1.NumberFormatPipe();
    }
    Object.defineProperty(Tab4Component.prototype, "question4001_Text", {
        get: function () {
            var question = this.dataTab.answerMap(4002);
            var text = '';
            if (question.radioButton == 1) {
                if (question.textArea1) {
                    text = 'あり (' + this.numberFormat.transform(question.textArea1, 0) + ' 枚）';
                }
                else {
                    text = 'あり';
                }
            }
            else if (question.radioButton == 2) {
                text = 'なし（適量)';
            }
            return text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab4Component.prototype, "question4002_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(4003);
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
    Object.defineProperty(Tab4Component.prototype, "question4003_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(4004);
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
    Object.defineProperty(Tab4Component.prototype, "question4004_Text", {
        get: function () {
            var question = this.dataTab.answerMap(4005);
            var text = '';
            if (question.radioButton == 1) {
                if (question.textArea1) {
                    text = 'あり' + '(' + question.textArea1 + ')';
                }
                else {
                    text = 'あり';
                }
            }
            else if (question.radioButton == 2) {
                text = 'なし';
            }
            return text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab4Component.prototype, "question4005_Text", {
        get: function () {
            var question = this.dataTab.answerMap(4006);
            return question.textArea1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab4Component.prototype, "question4006_Select", {
        get: function () {
            var question = this.dataTab.answerMap(4007);
            if (question.selectBox1 == 1) {
                return 'なし（社用）';
            }
            else if (question.selectBox1 == 2) {
                return 'あり（専用）';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab4Component.prototype, "question4007_Text", {
        get: function () {
            var question = this.dataTab.answerMap(4008);
            return question.textArea1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab4Component.prototype, "question4008_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(4009);
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
    Object.defineProperty(Tab4Component.prototype, "question4009_CheckBox", {
        get: function () {
            var question = this.dataTab.answerMap(4010);
            var checkBox1 = '';
            var checkBox2 = '';
            var checkBox3 = '';
            if (question.checkBox1) {
                checkBox1 = "10ｔ";
            }
            if (question.checkBox2) {
                checkBox2 = "4ｔ";
            }
            if (question.checkBox3) {
                checkBox3 = "2ｔ";
            }
            return format_util_1.FormatUtil.getAnswer(checkBox1, checkBox2, checkBox3);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab4Component.prototype, "question4010_Text", {
        get: function () {
            var question = this.dataTab.answerMap(4011);
            if (question.textArea1)
                return question.textArea1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab4Component.prototype, "question4011_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(4012);
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
    Object.defineProperty(Tab4Component.prototype, "question4012_Text", {
        get: function () {
            var question = this.dataTab.answerMap(4013);
            var text1 = '';
            if (question.textArea1) {
                text1 = this.numberFormat.transform(question.textArea1, 0) + '㎡';
            }
            return text1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab4Component.prototype, "question4013_Text", {
        get: function () {
            var question = this.dataTab.answerMap(4014);
            var text1 = '';
            if (question.textArea1) {
                text1 = question.textArea1;
            }
            return text1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab4Component.prototype, "question4014_Text", {
        get: function () {
            var question = this.dataTab.answerMap(4015);
            var text1 = '';
            var text2 = '';
            if (question.textArea1) {
                text1 = this.numberFormat.transform(question.textArea1, 0) + ' X ';
            }
            if (question.textArea2) {
                text2 = this.numberFormat.transform(question.textArea2, 0) + '㎜';
            }
            return text1 + text2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab4Component.prototype, "question4015_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(4016);
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
    Object.defineProperty(Tab4Component.prototype, "question4016_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(4017);
            if (question.radioButton == 1) {
                return 'あり';
            }
            else if (question.radioButton == 2) {
                return 'なし';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab4Component.prototype, "question4017_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(4018);
            if (question.radioButton == 1) {
                return '可能';
            }
            else if (question.radioButton == 2) {
                return '不可';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab4Component.prototype, "question4018_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(4019);
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
    ], Tab4Component.prototype, "dataTab", void 0);
    Tab4Component = __decorate([
        core_1.Component({
            selector: '[component-tab4]',
            templateUrl: 'Tab4.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], Tab4Component);
    return Tab4Component;
}());
exports.Tab4Component = Tab4Component;
//# sourceMappingURL=Tab4.component.js.map