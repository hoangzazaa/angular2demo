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
var number_format_pipe_1 = require("../../../../../pipe/number-format.pipe");
var data_util_1 = require("../../../../../util/data-util");
var mst_data_type_1 = require("../../../../../helper/mst-data-type");
var format_util_1 = require("../../../../../util/format-util");
var CheckSheet_data_1 = require("../CheckSheet.data");
var Tab1Component = (function () {
    function Tab1Component() {
        // implement method get question tab 1
        this.numberFormat = new number_format_pipe_1.NumberFormatPipe();
    }
    Object.defineProperty(Tab1Component.prototype, "question1001_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(1001);
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
    Object.defineProperty(Tab1Component.prototype, "question1002_Text", {
        get: function () {
            var question = this.dataTab.answerMap(1002);
            if (question.radioButton == 1) {
                return '食品';
            }
            else if (question.radioButton == 2) {
                return format_util_1.FormatUtil.getAnswer('その他', question.textArea1);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab1Component.prototype, "question1003_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(1003);
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
    Object.defineProperty(Tab1Component.prototype, "question1004_Text", {
        get: function () {
            var question = this.dataTab.answerMap(1004);
            var text1 = '';
            if (question.textArea1) {
                text1 = this.numberFormat.transform(question.textArea1, 0) + 'g';
            }
            var text2 = '';
            if (question.textArea2) {
                text2 = this.numberFormat.transform(question.textArea2, 0) + '個';
            }
            return format_util_1.FormatUtil.getAnswer(text1, text2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab1Component.prototype, "question1005_Text", {
        get: function () {
            var question = this.dataTab.answerMap(1005);
            var value = '';
            if (question.radioButton == 1) {
                value = '常温';
            }
            else if (question.radioButton == 2) {
                value = '冷蔵';
            }
            else if (question.radioButton == 3) {
                value = '冷凍';
            }
            var distances = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.DISTANCE);
            var data = distances.find(function (item) {
                return item.id == question.selectBox1;
            });
            // get name
            return format_util_1.FormatUtil.getAnswer(value, this.dataTab.valueItem(data));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab1Component.prototype, "question1006_Text", {
        get: function () {
            var question = this.dataTab.answerMap(1006);
            var value1 = '';
            if (question.textArea1) {
                value1 += format_util_1.FormatUtil.formatDateToString(question.textArea1, 'yyyy/MM/dd');
            }
            var value2 = '';
            if (question.textArea2) {
                value2 += format_util_1.FormatUtil.formatDateToString(question.textArea2, 'yyyy/MM/dd');
            }
            return format_util_1.FormatUtil.getAnswer(value1, value2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab1Component.prototype, "question1007_Number", {
        get: function () {
            var question = this.dataTab.answerMap(1007);
            if (question.textArea1) {
                return this.formatStringToNumber(question.textArea1) + '個';
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab1Component.prototype, "question1008_Text", {
        get: function () {
            var question = this.dataTab.answerMap(1008);
            var distances1 = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SELECT_1008_1);
            // get name
            var data1 = distances1.find(function (item) {
                return item.id == question.selectBox1;
            });
            var distances2 = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SELECT_1008_2);
            var data2 = distances2.find(function (item) {
                return item.id == question.selectBox2;
            });
            // get name
            var distances3 = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SELECT_1008_3);
            var data3 = distances3.find(function (item) {
                return item.id == question.selectBox3;
            });
            return format_util_1.FormatUtil.getAnswer(this.dataTab.valueItem(data1), this.formatStringToNumber(question.textArea1)
                + this.dataTab.valueItem(data2)
                + this.dataTab.valueItem(data3));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab1Component.prototype, "question1009_Text", {
        get: function () {
            var question = this.dataTab.answerMap(1009);
            var date = '';
            if (question.textArea2)
                date = format_util_1.FormatUtil.formatDateToString(question.textArea2, 'yyyy/MM/dd');
            return format_util_1.FormatUtil.getAnswer(question.textArea1, date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab1Component.prototype, "question1010_Select", {
        get: function () {
            var question = this.dataTab.answerMap(1010);
            var distances = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SELECT_1010);
            var data = distances.find(function (item) {
                return item.id == question.selectBox1;
            });
            // get name
            return this.dataTab.valueItem(data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab1Component.prototype, "question1011_Select1", {
        get: function () {
            var question = this.dataTab.answerMap(1011);
            var distances = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SELECT_1011_1);
            var data = distances.find(function (item) {
                return item.id == question.selectBox1;
            });
            // get name
            return this.dataTab.valueItem(data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab1Component.prototype, "question1011_2", {
        get: function () {
            var question = this.dataTab.answerMap(1011);
            var answer = '';
            if (question.radioButton == 1) {
                answer = 'あり';
            }
            else if (question.radioButton == 2) {
                answer = 'なし';
            }
            else if (question.radioButton == 3) {
                answer = '容器以外及び対象外';
            }
            return answer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab1Component.prototype, "question1011_Select2", {
        get: function () {
            var question = this.dataTab.answerMap(1011);
            var distances = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SELECT_1011_2);
            var data = distances.find(function (item) {
                return item.id == question.selectBox2;
            });
            // get name
            return this.dataTab.valueItem(data);
        },
        enumerable: true,
        configurable: true
    });
    Tab1Component.prototype.formatStringToNumber = function (value) {
        var output = '';
        if (value != undefined) {
            output = this.numberFormat.transform(format_util_1.FormatUtil.isNaN(parseInt(value)));
        }
        return output;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', CheckSheet_data_1.CheckSheetData)
    ], Tab1Component.prototype, "dataTab", void 0);
    Tab1Component = __decorate([
        core_1.Component({
            selector: '[component-tab1]',
            templateUrl: 'Tab1.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], Tab1Component);
    return Tab1Component;
}());
exports.Tab1Component = Tab1Component;
//# sourceMappingURL=Tab1.component.js.map