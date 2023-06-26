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
var data_util_1 = require("../../../../../util/data-util");
var mst_data_type_1 = require("../../../../../helper/mst-data-type");
var Tab3Component = (function () {
    function Tab3Component() {
        // implement method get question tab 3
        this.numberFormat = new number_format_pipe_1.NumberFormatPipe();
    }
    Object.defineProperty(Tab3Component.prototype, "question3001_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(3001);
            if (question.radioButton == 1) {
                return 'オフセット';
            }
            else if (question.radioButton == 2) {
                return 'グラビア';
            }
            else if (question.radioButton == 3) {
                return 'デジタル';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab3Component.prototype, "question3002_Select", {
        get: function () {
            var question = this.dataTab.answerMap(3002);
            var distances = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SELECT_3002);
            var data = distances.find(function (item) {
                return item.id == question.selectBox1;
            });
            // get name
            return this.dataTab.valueItem(data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab3Component.prototype, "question3003_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(3003);
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
    Object.defineProperty(Tab3Component.prototype, "question3004_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(3004);
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
    Object.defineProperty(Tab3Component.prototype, "question3005_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(3005);
            if (question.radioButton == 1) {
                return '手詰め';
            }
            else if (question.radioButton == 2) {
                return 'オートケーサー';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab3Component.prototype, "question3006_Radio", {
        get: function () {
            var question = this.dataTab.answerMap(3006);
            if (question.radioButton == 1) {
                return '事前胴貼り';
            }
            else if (question.radioButton == 2) {
                return 'ブランク納品';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab3Component.prototype, "question3007_Text", {
        get: function () {
            var question = this.dataTab.answerMap(3007);
            var text = '';
            if (question.radioButton == 1) {
                if (question.textArea1) {
                    text = 'あり (' + this.numberFormat.transform(question.textArea1, 0) + '枚）';
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', CheckSheet_data_1.CheckSheetData)
    ], Tab3Component.prototype, "dataTab", void 0);
    Tab3Component = __decorate([
        core_1.Component({
            selector: '[component-tab3]',
            templateUrl: 'Tab3.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], Tab3Component);
    return Tab3Component;
}());
exports.Tab3Component = Tab3Component;
//# sourceMappingURL=Tab3.component.js.map