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
var SF00302_data_1 = require("../../SF00302.data");
var data_util_1 = require("../../../../../util/data-util");
var master_option_1 = require("../../helper/master-option");
var math_util_1 = require("../../../../../util/math-util");
var util_1 = require("util");
var format_util_1 = require("../../../../../util/format-util");
var unicode_util_1 = require("../../../../../util/unicode-util");
var SF0030220Component = (function () {
    function SF0030220Component(sf00302Data) {
        this.sf00302Data = sf00302Data;
        this.select2Option = {
            tags: true,
            language: {
                noResults: function () {
                    return "No color";
                }
            },
            escapeMarkup: function (markup) {
                return markup;
            },
            createTag: function (params) {
                return {
                    id: unicode_util_1.default.truncBySjisByte(params.term, 8),
                    text: unicode_util_1.default.truncBySjisByte(params.term, 8),
                    newOption: true
                };
            },
            templateResult: function (data) {
                var $result = $("<span style='font-size:11px!important'></span>");
                $result.text(data.text);
                if (data.newOption) {
                    $result.append(" <em>(new)</em>");
                }
                return $result;
            },
            placeholder: "",
            minimumResultsForSearch: 0,
        };
        this.colorOption = data_util_1.default.toSelectBoxDataSource(master_option_1.CARTON_COLOR);
        this.waterRepellentOption = data_util_1.default.toSelectBoxDataSource(master_option_1.CARTON_WATER_REPELLENT);
        this.handTypeOption = data_util_1.default.toSelectBoxDataSource(master_option_1.HAND_TYPE);
        this.otherMethodOption = data_util_1.default.toSelectBoxDataSource(master_option_1.OTHER_METHOD);
    }
    Object.defineProperty(SF0030220Component.prototype, "isRequestDesign", {
        get: function () {
            return this.helper.getSF00302Data().isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.helper.getSF00302Data().isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    SF0030220Component.prototype.ngAfterViewInit = function () {
        this.handleColorOption();
    };
    SF0030220Component.prototype.handleColorOption = function () {
        var _this = this;
        var self = this;
        self.colorFText1Options = [];
        self.colorFText2Options = [];
        self.colorFText3Options = [];
        // Assign data
        master_option_1.CARTON_COLOR_MEMO.forEach(function (data) {
            self.colorFText1Options.push(data);
            self.colorFText2Options.push(data);
            self.colorFText3Options.push(data);
        });
        //Add memo to list if not exist
        if (!util_1.isNullOrUndefined(self.colorFText1) && self.colorFText1 != "" && self.colorFText1 != "　　") {
            if (!self.colorFText1Options.find(function (item) { return item == self.colorFText1; })) {
                self.colorFText1Options.unshift(self.colorFText1);
            }
        }
        if (!util_1.isNullOrUndefined(self.colorFText2) && self.colorFText2 != "" && self.colorFText2 != "　　") {
            if (!self.colorFText2Options.find(function (item) { return item == self.colorFText2; })) {
                self.colorFText2Options.unshift(self.colorFText2);
            }
        }
        if (!util_1.isNullOrUndefined(self.colorFText3) && self.colorFText3 != "" && self.colorFText3 != "　　") {
            if (!self.colorFText3Options.find(function (item) { return item == self.colorFText3; })) {
                self.colorFText3Options.unshift(self.colorFText3);
            }
        }
        //Assign variables for dom
        var $colorFText1 = $("#colorFText1");
        var $colorFText2 = $("#colorFText2");
        var $colorFText3 = $("#colorFText3");
        //assign select2
        setTimeout(function () {
            $colorFText1
                .select2(self.select2Option)
                .on("select2:select", function (event) {
                self.helper.getSF00302Data().product.colorFText1 = event.target.value;
                _this.helper.getSF00302Data().highlightedTracker.touch('colorIdF');
            })
                .val(self.helper.getSF00302Data().product.colorFText1)
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
        }, 50);
        setTimeout(function () {
            $colorFText2
                .select2(self.select2Option)
                .on("select2:select", function (event) {
                self.helper.getSF00302Data().product.colorFText2 = event.target.value;
                _this.helper.getSF00302Data().highlightedTracker.touch('colorIdF');
            })
                .val(self.helper.getSF00302Data().product.colorFText2)
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
        }, 50);
        setTimeout(function () {
            $colorFText3
                .select2(self.select2Option)
                .on("select2:select", function (event) {
                self.helper.getSF00302Data().product.colorFText3 = event.target.value;
                _this.helper.getSF00302Data().highlightedTracker.touch('colorIdF');
            })
                .val(self.helper.getSF00302Data().product.colorFText3)
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
        }, 50);
    };
    SF0030220Component.prototype.isHighlighted = function (input) {
        return this.helper.getSF00302Data().highlightedTracker.isHighlightedProperty(input);
    };
    Object.defineProperty(SF0030220Component.prototype, "colorIdF", {
        get: function () {
            if (this.helper.getSF00302Data().product.colorIdF == undefined) {
                this.helper.getSF00302Data().product.colorIdF = 0;
            }
            // this.setColorIdIfConcealed(this.helper.getSF00302Data().product.colorIdF);
            return this.helper.getSF00302Data().product.colorIdF;
        },
        set: function (value) {
            this.setColorIdFTouched();
            this.setColorIdIfConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030220Component.prototype.setColorIdIfConcealed = function (value) {
        this.helper.getSF00302Data().product.colorIdF = value;
        this.helper.calcUsageColorCostCarton();
    };
    SF0030220Component.prototype.setColorIdFTouched = function () {
        this.helper.getSF00302Data().highlightedTracker.touch('colorIdF');
    };
    Object.defineProperty(SF0030220Component.prototype, "colorFText1", {
        get: function () {
            return this.helper.getSF00302Data().product.colorFText1;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.colorFText1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "colorFText2", {
        get: function () {
            return this.helper.getSF00302Data().product.colorFText2;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.colorFText2 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "colorFText3", {
        get: function () {
            return this.helper.getSF00302Data().product.colorFText3;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.colorFText3 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "cartonTapeCutting", {
        get: function () {
            this.helper.getSF00302Data().product.cartonTapeCutting = math_util_1.default.checkNaN(this.helper.getSF00302Data().product.cartonTapeCutting);
            if (this.helper.getSF00302Data().product.cartonTapeCutting > 0) {
                return true;
            }
            else {
                return false;
            }
        },
        set: function (value) {
            if (value) {
                if (this.helper.getSF00302Data().product.blankPaperSizeH == undefined || this.helper.getSF00302Data().product.blankPaperSizeW == undefined) {
                    this.helper.getSF00302Data().product.cartonTapeCutting = 0;
                }
                else if (this.helper.getSF00302Data().product.blankPaperSizeH > this.helper.getSF00302Data().product.blankPaperSizeW) {
                    this.helper.getSF00302Data().product.cartonTapeCutting = this.helper.getSF00302Data().product.blankPaperSizeH;
                }
                else {
                    this.helper.getSF00302Data().product.cartonTapeCutting = this.helper.getSF00302Data().product.blankPaperSizeW;
                }
            }
            else {
                this.helper.getSF00302Data().product.cartonTapeCutting = 0;
            }
            this.helper.getSF00302Data().highlightedTracker.touch('tapeCutting');
            this.helper.calcTapeCutCarton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "cartonLinerCutting", {
        get: function () {
            this.helper.getSF00302Data().product.cartonLinerCutting = math_util_1.default.checkNaN(this.helper.getSF00302Data().product.cartonLinerCutting);
            return this.helper.getSF00302Data().product.cartonLinerCutting;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('linerCutting');
            this.helper.getSF00302Data().product.cartonLinerCutting = value;
            this.helper.calcLinerCutCarton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "waterRepellent", {
        get: function () {
            if (this.helper.getSF00302Data().product.waterRepellentFlag == undefined) {
                this.helper.getSF00302Data().product.waterRepellentFlag = 0;
            }
            return this.helper.getSF00302Data().product.waterRepellentFlag;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('waterRepellent');
            this.helper.getSF00302Data().product.waterRepellentFlag = value;
            this.helper.calcWaterRepellentCarton();
        },
        enumerable: true,
        configurable: true
    });
    SF0030220Component.prototype.setHandProcessingFlag = function (value) {
        this.handProcessingFlag = value;
    };
    Object.defineProperty(SF0030220Component.prototype, "handProcessingFlag", {
        get: function () {
            if (this.helper.getSF00302Data().product.handProcessingFlag == undefined) {
                this.helper.getSF00302Data().product.handProcessingFlag = 0;
            }
            return this.helper.getSF00302Data().product.handProcessingFlag;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('handProcessing');
            this.helper.getSF00302Data().product.handProcessingFlag = value;
            this.helper.calcCartonHandProcessingCarton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "isView", {
        get: function () {
            if (this.isRequestDesign) {
                return false;
            }
            else {
                return this.helper.getSF00302Data().isView;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "stateProductPrint", {
        get: function () {
            if (this.helper.getSF00302Data().product.cartonTapeCutting != undefined && this.helper.getSF00302Data().product.cartonTapeCutting.toString() != "" &&
                this.helper.getSF00302Data().product.cartonLinerCutting != undefined && this.helper.getSF00302Data().product.cartonLinerCutting.toString() != ""
                && this.helper.getSF00302Data().product.handProcessingFlag != undefined) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "colorOptions", {
        get: function () {
            if (this.helper.getSF00302Data().product.shapeId == 100) {
                return this.colorOption.slice(0, 5);
            }
            else {
                return this.colorOption;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "handPosition", {
        get: function () {
            this.helper.getSF00302Data().product.handPosition = math_util_1.default.checkNaN(this.helper.getSF00302Data().product.handPosition);
            return this.helper.getSF00302Data().product.handPosition;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.handPosition = value;
            this.helper.getSF00302Data().highlightedTracker.touch('handProcessing');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "handType", {
        get: function () {
            if (!util_1.isNullOrUndefined(this.helper.getSF00302Data().product.handType)) {
                this.helper.getSF00302Data().product.handType = math_util_1.default.checkNaN(this.helper.getSF00302Data().product.handType);
            }
            else {
                this.helper.getSF00302Data().product.handType = 2;
            }
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().product.handType);
        },
        set: function (value) {
            this.helper.getSF00302Data().product.handType = value;
            this.helper.getSF00302Data().highlightedTracker.touch('handProcessing');
            this.helper.getSF00302Data().product.handSize = 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "handSize", {
        get: function () {
            if (!util_1.isNullOrUndefined(this.helper.getSF00302Data().product.handSize)) {
                this.helper.getSF00302Data().product.handSize = math_util_1.default.checkNaN(this.helper.getSF00302Data().product.handSize);
            }
            else {
                this.helper.getSF00302Data().product.handSize = 1;
            }
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().product.handSize);
        },
        set: function (value) {
            this.helper.getSF00302Data().product.handSize = value;
            this.helper.getSF00302Data().highlightedTracker.touch('handProcessing');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "handSizeOption", {
        get: function () {
            if (!util_1.isNullOrUndefined(this.handType) && this.handType != 0) {
                return master_option_1.HAND_SIZE[this.handType];
            }
            else {
                return [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "otherMethod1", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().product.otherMethod1);
        },
        set: function (value) {
            this.helper.getSF00302Data().product.otherMethod1 = value;
            this.helper.getSF00302Data().highlightedTracker.touch('otherMethod');
            this.setMemo1();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "otherMethod2", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().product.otherMethod2);
        },
        set: function (value) {
            this.helper.getSF00302Data().product.otherMethod2 = value;
            this.helper.getSF00302Data().highlightedTracker.touch('otherMethod');
            this.setMemo1();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "upperFlapChange", {
        get: function () {
            var result = math_util_1.default.checkNaN(this.helper.getSF00302Data().product.upperFlap - this.defaultFlap);
            if (result > 0) {
                return "+" + format_util_1.FormatUtil.formatNumber(math_util_1.default.round(result, 1), 1);
            }
            else if (result < 0) {
                return format_util_1.FormatUtil.formatNumber(math_util_1.default.round(result, 1), 1);
            }
            return result.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "lowerFlapChange", {
        get: function () {
            var result = math_util_1.default.checkNaN(this.helper.getSF00302Data().product.lowerFlap - this.defaultFlap);
            if (result > 0) {
                return "+" + format_util_1.FormatUtil.formatNumber(math_util_1.default.round(result, 1), 1);
            }
            else if (result < 0) {
                return format_util_1.FormatUtil.formatNumber(math_util_1.default.round(result, 1), 1);
            }
            return result.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "defaultFlap", {
        get: function () {
            return this.helper.calcFlap(this.helper.getSF00302Data().product.cartonShippingType, this.helper.getSF00302Data().product.laminationFlute, this.helper.getSF00302Data().product.sizeD);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030220Component.prototype, "cartonShippingType", {
        get: function () {
            return this.helper.getSF00302Data().product.cartonShippingType;
        },
        enumerable: true,
        configurable: true
    });
    SF0030220Component.prototype.setMemo1 = function () {
        if (this.helper.getSF00302Data().product.specialNote1Flag != 1) {
            var method1 = master_option_1.OTHER_METHOD[this.helper.getSF00302Data().product.otherMethod1];
            if (this.helper.getSF00302Data().product.otherMethod1 == 4) {
                method1 = method1 + "上" + this.upperFlapChange + "mm" + "下" + this.lowerFlapChange + "mm";
            }
            var method2 = master_option_1.OTHER_METHOD[this.helper.getSF00302Data().product.otherMethod2];
            if (this.helper.getSF00302Data().product.otherMethod2 == 4) {
                method2 = method2 + "上" + this.upperFlapChange + "mm" + "下" + this.lowerFlapChange + "mm";
            }
            if (method1 == "なし") {
                if (method2 != undefined && method2 != "なし") {
                    this.helper.getSF00302Data().product.memo1 = method2;
                }
                else {
                    this.helper.getSF00302Data().product.memo1 = "";
                }
            }
            else {
                if (method2 != undefined && method2 != "なし") {
                    this.helper.getSF00302Data().product.memo1 = method1 + "／" + method2;
                }
                else {
                    this.helper.getSF00302Data().product.memo1 = method1;
                }
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030220Component.prototype, "helper", void 0);
    SF0030220Component = __decorate([
        core_1.Component({
            selector: "sf0030220",
            templateUrl: "SF0030220.component.html",
            styleUrls: ["SF0030220.component.css"]
        }), 
        __metadata('design:paramtypes', [SF00302_data_1.SF00302Data])
    ], SF0030220Component);
    return SF0030220Component;
}());
exports.SF0030220Component = SF0030220Component;
//# sourceMappingURL=SF0030220.component.js.map