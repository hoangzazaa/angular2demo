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
var data_util_1 = require("../../../../../../util/data-util");
var master_option_1 = require("../../../helper/master-option");
var math_util_1 = require("../../../../../../util/math-util");
var SF0030225Component = (function () {
    function SF0030225Component() {
    }
    SF0030225Component.prototype.ngOnInit = function () {
        // [!] paperSize, cutPaperSizeの項目を追加したため、変更前の保存分について、paperSize = blankPaperSizeを適用しておく。
        var bw = this.pageData.product.blankPaperSizeW, bh = this.pageData.product.blankPaperSizeH;
        if (bw !== undefined && bw != 0) {
            if (this.pageData.product.paperSizeW === undefined)
                this.pageData.product.paperSizeW = bw;
            if (this.pageData.product.cutPaperSizeW === undefined)
                this.pageData.product.cutPaperSizeW = bw;
        }
        if (this.pageData.product.cutPaperSizeH === undefined && bh !== undefined && bh != 0) {
            this.pageData.product.cutPaperSizeH = bh;
        }
    };
    SF0030225Component.prototype.isHighlighted = function (input) {
        return this.pageData.highlightedTracker.isHighlightedProperty(input);
    };
    Object.defineProperty(SF0030225Component.prototype, "laminationFluteOption", {
        get: function () {
            var temp = Object.assign({}, master_option_1.CARTON_NOT_A_FLUTE); //"なしを除く"
            delete temp[0];
            return data_util_1.default.toSelectBoxDataSource(temp);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "pageData", {
        get: function () {
            return this.helper.getSF00302Data();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "checkBorderLaminationFulte", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                }
                else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "checkBorderPaperSizeW", {
        // 原紙寸法 (mm) * 一旦SF0030215Componentからコピー
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSavePaperSizeW) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "checkBorderPaperSizeH", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSavePaperSizeH) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "checkBorderCutPaperSizeW", {
        // シート寸法 (mm) * 一旦SF0030206Componentからコピー
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveCutSizeW) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "checkBorderCutPaperSizeH", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveCutSizeH) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "checkBorderBlankPaperSizeW", {
        // 展開寸法（mm） * SF0030217Componentを参照
        get: function () {
            return this.pageData.noneFieldBorderCss;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "checkBorderBlankPaperSizeH", {
        get: function () {
            return this.pageData.noneFieldBorderCss;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "checkBorderTakenNumber", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveTakenNumber) {
                        return this.pageData.errFieldBorderCss;
                    }
                    else {
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "laminationFlute", {
        get: function () {
            if (this.pageData.product.laminationFlute == undefined) {
                this.pageData.product.laminationFlute = 1;
            }
            return this.pageData.product.laminationFlute;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('laminationFlute');
            this.pageData.product.laminationFlute = value;
            this.helper.calcMaterialCostCarton();
            this.helper.calcDieCuttingThroughWage();
            this.helper.calcShipFareCarton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "paperSizeW", {
        get: function () {
            return this.pageData.product.paperSizeW;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('paperSize');
            this.pageData.product.paperSizeW = value;
            this.onChangePaperSize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "cutPaperSizeW", {
        get: function () {
            return this.pageData.product.cutPaperSizeW;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('cutPaperSize');
            this.pageData.product.cutPaperSizeW = value;
            this.onChangePaperSize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "cutPaperSizeH", {
        get: function () {
            return this.pageData.product.cutPaperSizeH;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('cutPaperSize');
            this.pageData.product.cutPaperSizeH = value;
            this.onChangePaperSize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "blankPaperSizeW", {
        get: function () {
            return this.pageData.product.blankPaperSizeW;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('blankPaperSize');
            this.pageData.product.blankPaperSizeW = value;
            if (this.pageData.product.cartonTapeCutting > 0) {
                if (this.pageData.product.blankPaperSizeH > this.pageData.product.blankPaperSizeW) {
                    this.pageData.product.cartonTapeCutting = this.pageData.product.blankPaperSizeH;
                }
                else {
                    this.pageData.product.cartonTapeCutting = this.pageData.product.blankPaperSizeW;
                }
            }
            this.onChangePaperSize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "blankPaperSizeH", {
        get: function () {
            return this.pageData.product.blankPaperSizeH;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('blankPaperSize');
            this.pageData.product.blankPaperSizeH = value;
            if (this.pageData.product.cartonTapeCutting > 0) {
                if (this.pageData.product.blankPaperSizeH > this.pageData.product.blankPaperSizeW) {
                    this.pageData.product.cartonTapeCutting = this.pageData.product.blankPaperSizeH;
                }
                else {
                    this.pageData.product.cartonTapeCutting = this.pageData.product.blankPaperSizeW;
                }
            }
            this.onChangePaperSize();
        },
        enumerable: true,
        configurable: true
    });
    // とりあえず全部計算させておく。
    SF0030225Component.prototype.onChangePaperSize = function () {
        this.helper.calcDieCuttingThroughWage();
        this.helper.calcPasteBasicCost();
        this.helper.calcPasteThroughWage();
        this.helper.calcAdditionFare();
        this.helper.calcTotalCarton();
    };
    Object.defineProperty(SF0030225Component.prototype, "takenNumber", {
        get: function () {
            this.pageData.product.takenNumber = math_util_1.default.checkNaN(this.pageData.product.takenNumber);
            return this.pageData.product.takenNumber;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('takenNumber');
            this.pageData.product.takenNumber = value;
            this.helper.calcPasteBasicCost();
            this.helper.calcAdditionFare();
            this.helper.calcCartonLotGap();
            this.helper.calcTotalCarton();
            //this.helper.validateForm();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "isView", {
        get: function () {
            if (this.isRequestDesign) {
                return false;
            }
            else {
                return this.pageData.isView;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.pageData.isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030225Component.prototype, "isRequestDesign", {
        get: function () {
            return this.pageData.isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030225Component.prototype, "helper", void 0);
    SF0030225Component = __decorate([
        core_1.Component({
            templateUrl: "SF0030225.component.html",
            selector: 'sf0030225'
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030225Component);
    return SF0030225Component;
}());
exports.SF0030225Component = SF0030225Component;
//# sourceMappingURL=SF0030225.component.js.map