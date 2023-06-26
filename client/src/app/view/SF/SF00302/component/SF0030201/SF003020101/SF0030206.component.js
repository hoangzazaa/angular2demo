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
var validator_util_1 = require("../../../../../../util/validator-util");
var math_util_1 = require("../../../../../../util/math-util");
var paper_model_1 = require("../../../model/paper.model");
var format_util_1 = require("../../../../../../util/format-util");
var master_option_1 = require("../../../helper/master-option");
var PAPER_1 = 1, TAB_1 = 1, TAB_2 = 2;
/**
 * 紙器の製品情報入力フォーム
 * @author DungTQ
 */
var SF0030206Component = (function () {
    function SF0030206Component() {
        this._paperOptions = {};
    }
    Object.defineProperty(SF0030206Component.prototype, "paperTmp", {
        get: function () {
            return this.pageData.paperTmp;
        },
        enumerable: true,
        configurable: true
    });
    SF0030206Component.prototype.ngOnInit = function () {
        this.pageData.paperTmp = new paper_model_1.PaperModel();
        // init data
        this.initDataMst();
        // issue 2344
        // find index by paperSizeW và paperSizeH
        this.pageData.mstSheetSizeDisplay = [];
        // init sheetSize
        this.initSheetSize();
    };
    /**
     * シートサイズの初期化
     */
    SF0030206Component.prototype.initSheetSize = function () {
        var sheetSizeList = this.helper.createSheetSizeList();
        this.pageData.mstSheetSizeDisplay = sheetSizeList.sheetSizes;
        this.pageData._sheetSize = sheetSizeList.selectedIndex != null ? sheetSizeList.selectedIndex + 1 : 0;
    };
    SF0030206Component.prototype.changePaperSheetSize = function (paperNameId) {
        this.pageData.mstSheetSizeDisplay = [];
        // check neu la paper new va khong phai paper clone se coi nhu la moi
        if (paperNameId == 100 && !!this.paperTmp.isNew && this.paperTmp.isPaperClone != 1) {
            this.pageData._sheetSize = 0;
            this.pageData.product.specialSizeFlag = 1;
            return;
        }
        // 原紙サイズ手入力フラグを落とす
        this.pageData.product.specialSizeFlag = 0;
        // get list mst sheetSize
        if (paperNameId == 100 && this.paperTmp.tabNumber == 2) {
            // 特殊原紙の場合
            var sheetSize = this.pageData.paperTmp.toMstSheetSize();
            this.pageData._sheetSize = 1;
            this.pageData.mstSheetSizeDisplay.push(sheetSize);
        }
        else {
            var paperId_1 = this.pageData.product.paperId;
            var sheetSizes = this.mstSheetSizes.filter(function (item) {
                return item.paperId != undefined && item.paperId == paperId_1;
            });
            this.pageData.mstSheetSizeDisplay = sheetSizes;
            var sheetSize = sheetSizes[0];
            if (!!sheetSizes && sheetSizes.length > 0) {
                this.pageData._sheetSize = 1;
                this.pageData.product.sheetSizeId = sheetSize.id;
                this.pageData.product.paperSizeW = sheetSize.width;
                this.pageData.product.paperSizeH = sheetSize.height;
            }
            else {
                this.pageData._sheetSize = 0;
            }
        }
    };
    Object.defineProperty(SF0030206Component.prototype, "sheetSize", {
        get: function () {
            return this.pageData._sheetSize;
        },
        set: function (value) {
            if (value != 0) {
                // DB に登録されているシートサイズの場合
                this.pageData.product.specialSizeFlag = 0;
                var mstSheetSize = this.pageData.mstSheetSizeDisplay[value - 1];
                this.paperSizeW = mstSheetSize.width;
                this.paperSizeH = mstSheetSize.height;
                this.pageData.product.sheetSizeId = mstSheetSize.id;
            }
            else {
                // その他のサイズの場合
                this.pageData.product.specialSizeFlag = 1;
            }
            this.pageData._sheetSize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030206Component.prototype, "mstPapersBackground", {
        get: function () {
            return this.pageData.mstPapersBackgroundTab1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030206Component.prototype, "mstPapersBackgroundTab2", {
        get: function () {
            return this.pageData.mstPapersBackgroundTab2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030206Component.prototype, "stateProductMaterial", {
        /**
         * Get state if Product Material Accordion is filled with data or not
         * */
        get: function () {
            return this.pageData.product.paperSizeW != undefined
                && this.pageData.product.paperSizeH != undefined
                && this.pageData.product.cutPaperSizeH != undefined
                && this.pageData.product.cutPaperSizeW != undefined
                && this.pageData.product.impositionNumber != undefined
                && this.pageData.product.takenNumber != undefined
                && this.pageData.product.paperNameId != undefined
                && this.pageData.product.paperNameId != 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030206Component.prototype, "mstSheetSizes", {
        get: function () {
            return this.pageData.mstSheetSizes;
        },
        enumerable: true,
        configurable: true
    });
    SF0030206Component.prototype.isNumeric = function ($event) {
        return validator_util_1.default.isNumeric($event);
    };
    Object.defineProperty(SF0030206Component.prototype, "isView", {
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
    Object.defineProperty(SF0030206Component.prototype, "isRequestDesign", {
        get: function () {
            return this.pageData.isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030206Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.pageData.isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    SF0030206Component.prototype.isHighlighted = function (input) {
        return this.pageData.highlightedTracker.isHighlightedProperty(input);
    };
    Object.defineProperty(SF0030206Component.prototype, "paperNameId", {
        get: function () {
            //http://fridaynight.vnext.vn/issues/1887
            if (this.pageData.product.paperNameId == 99) {
                // get data paper with paperNameId = 99
                this.setPaperIdConcealed(99);
            }
            if (this.pageData.product.id && this.pageData.product.paperNameId == 100) {
                return this.pageData.product.paperNameId;
            }
            this.calcPaperWeightOptions();
            if (this.pageData.product.paperWeight != undefined) {
                this.setPaperWeightConcealed(this.pageData.product.paperWeight);
            }
            return this.pageData.product.paperNameId;
        },
        set: function (value) {
            // set paperIdTmp
            this.idSelectedTmp = data_util_1.default.cloneObject(this.pageData.product).paperNameId;
            this.paperWeightTmp = data_util_1.default.cloneObject(this.pageData.product).paperWeight;
            if (value == 99) {
                // reset paper model
                this.pageData.paperModel = new paper_model_1.PaperModel();
                // update status selectbox
                this.pageData.product.paperNameId = 99;
                this.pageData.mstPapersBackgroundTab1 = [];
                this.inputPaperOption = PAPER_1;
                this.pageData.showModal2903 = true;
                //push data
                this.modalShow();
            }
            else {
                this.setPaperIdConcealed(value);
                this.changePaperSheetSize(value);
            }
            //this.helper.validateForm();
        },
        enumerable: true,
        configurable: true
    });
    SF0030206Component.prototype.setPaperIdConcealed = function (value) {
        this.pageData.product.paperNameId = value;
        this.calcPaperWeightOptions();
        if (this._paperOptions != undefined) {
            this.setPaperWeightConcealed(+Object.keys(this._paperOptions)[0]);
        }
    };
    Object.defineProperty(SF0030206Component.prototype, "paperWeight", {
        get: function () {
            return format_util_1.FormatUtil.isNaN(this.pageData.product.paperWeight);
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('paper');
            this.setPaperWeightConcealed(value);
            //this.helper.validateForm();
        },
        enumerable: true,
        configurable: true
    });
    SF0030206Component.prototype.setPaperWeightConcealed = function (value) {
        //http://fridaynight.vnext.vn/issues/1887
        if (value != 99 && this._paperOptions && Object.keys(this._paperOptions).indexOf(value.toString()) > 0) {
            this.pageData.product.paperWeight = value;
        }
        else {
            // check this._paperOptions == 0
            if (!!this._paperOptions) {
                this.pageData.product.paperWeight = +Object.keys(this._paperOptions)[0];
            }
            else {
                this.pageData.product.paperWeight = +0;
            }
        }
        if (this.pageData.product.paperNameId != 100 && this.pageData.product.paperNameId != 99) {
            this.pageData.product.paperId = data_util_1.default.getData(this.pageData.mstData.mstPaper, 0, this.pageData.product.factoryId, this.pageData.product.paperNameId, this.pageData.product.paperWeight, "paperId");
        }
        else if (this.pageData.product.paperNameId == 100) {
            if (this.pageData.paperTmp.id != null) {
                this.pageData.product.paperId = data_util_1.default.cloneObject(this.pageData.paperTmp).id;
            }
        }
        this.helper.calcPaperActualWeight();
        this.helper.calcShippingCost();
    };
    SF0030206Component.prototype.calcPaperWeightOptions = function () {
        if (this.pageData.product.paperNameId != undefined) {
            this._paperOptions = data_util_1.default.getData(this.pageData.mstData.mstPaper, 0, this.pageData.product.factoryId, this.pageData.product.paperNameId);
        }
        else {
            this._paperOptions = {};
        }
    };
    Object.defineProperty(SF0030206Component.prototype, "paperOptions", {
        get: function () {
            if (this.pageData.product.paperNameId == 100) {
                var result = [];
                result.push(this.pageData.product.paperWeight);
                return result;
            }
            if (this._paperOptions != undefined) {
                return Object.keys(this._paperOptions);
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030206Component.prototype, "paperNormValue", {
        get: function () {
            if (this.pageData.mstData != undefined && this.pageData.product.paperNameId != undefined) {
                var value = data_util_1.default.getData(this.pageData.mstData.mstPaper, 0, this.pageData.product.factoryId, this.pageData.product.paperNameId, this.pageData.product.paperWeight, "normValue");
                return format_util_1.FormatUtil.isNaN(value);
            }
            else if (this.pageData.product.paperNameId == undefined) {
                // Bug 1567
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030206Component.prototype, "paperSizeW", {
        get: function () {
            return this.pageData.product.paperSizeW;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('paperSize');
            this.setPaperSizeWConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030206Component.prototype.setPaperSizeWConcealed = function (value) {
        this.pageData.product.paperSizeW = value;
        this.helper.calcPaperActualWeight();
    };
    SF0030206Component.prototype.changeValueSheetSize = function () {
        var self = this;
        setTimeout(function () {
            var index = self.pageData.mstSheetSizeDisplay.findIndex(function (item) {
                return item.width == self.pageData.product.paperSizeW
                    && item.height == self.pageData.product.paperSizeH;
            });
            if (index > -1) {
                self.pageData._sheetSize = index + 1;
            }
            else {
                self.pageData._sheetSize = 0;
            }
        }, 60);
    };
    Object.defineProperty(SF0030206Component.prototype, "paperSizeH", {
        get: function () {
            return this.pageData.product.paperSizeH;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('paperSize');
            this.setPaperSizeHConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030206Component.prototype.setPaperSizeHConcealed = function (value) {
        this.pageData.product.paperSizeH = value;
        this.helper.calcPaperActualWeight();
    };
    Object.defineProperty(SF0030206Component.prototype, "cutPaperSizeW", {
        get: function () {
            return this.pageData.product.cutPaperSizeW;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('cutPaperSize');
            this.pageData.product.cutPaperSizeW = value;
            this.helper.calcSurfaceBasicCost(1);
            this.helper.calcSurfaceBasicCost(2);
            this.helper.calcSurfaceBasicCost(3);
            this.helper.calcSurfaceThroughWage(1);
            this.helper.calcSurfaceThroughWage(2);
            this.helper.calcSurfaceThroughWage(3);
            this.helper.calcDieCuttingBasicCost();
            this.helper.calcDieCuttingThroughWage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030206Component.prototype, "cutPaperSizeH", {
        get: function () {
            return this.pageData.product.cutPaperSizeH;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('cutPaperSize');
            this.pageData.product.cutPaperSizeH = value;
            this.helper.calcSurfaceBasicCost(1);
            this.helper.calcSurfaceBasicCost(2);
            this.helper.calcSurfaceBasicCost(3);
            this.helper.calcSurfaceThroughWage(1);
            this.helper.calcSurfaceThroughWage(2);
            this.helper.calcSurfaceThroughWage(3);
            this.helper.calcDieCuttingBasicCost();
            this.helper.calcDieCuttingThroughWage();
            //this.helper.validateForm();
            this.pageData.checkInputSave = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030206Component.prototype, "impositionNumber", {
        get: function () {
            this.pageData.product.impositionNumber = math_util_1.default.checkNaN(this.pageData.product.impositionNumber);
            return this.pageData.product.impositionNumber;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('impositionNumber');
            this.pageData.product.impositionNumber = value;
            if (math_util_1.default.checkNaN(this.pageData.product.specialDieCuttingNumberFlag) == 0) {
                this.pageData.product.dieCuttingThroughNumber = value;
            }
            this.helper.calcLaminationTotalCost();
            this.helper.calcSurfaceBasicCost(1);
            this.helper.calcSurfaceThroughWage(1);
            this.helper.calcSurfaceTotalCost(1);
            this.helper.calcSurfaceBasicCost(2);
            this.helper.calcSurfaceThroughWage(2);
            this.helper.calcSurfaceTotalCost(2);
            this.helper.calcSurfaceBasicCost(3);
            this.helper.calcSurfaceThroughWage(3);
            this.helper.calcSurfaceTotalCost(3);
            this.helper.calcDieCuttingBasicCost();
            this.helper.calcDieCuttingThroughWage();
            this.helper.calcDieCuttingTotalCost();
            this.helper.calcPasteBasicCost();
            this.helper.calcPasteThroughWage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030206Component.prototype, "takenNumber", {
        get: function () {
            this.pageData.product.takenNumber = math_util_1.default.checkNaN(this.pageData.product.takenNumber);
            return this.pageData.product.takenNumber;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('takenNumber');
            this.pageData.product.takenNumber = value;
            this.helper.calcPaperTotalCost();
            //this.helper.validateForm();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030206Component.prototype, "paperHeadApprovalFlag", {
        get: function () {
            if (this.pageData.product.paperHeadApprovalFlag > 0) {
                this.pageData.mstData.mstPaper = this.pageData.mstData.mstPaperHead;
                return true;
            }
            this.pageData.mstData.mstPaper = this.pageData.mstData.mstPaperNormal;
            return false;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('paperApprovalFlag');
            this.setPaperHeadApprovalConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030206Component.prototype.setPaperHeadApprovalConcealed = function (value) {
        if (value) {
            this.pageData.product.paperHeadApprovalFlag = 1;
            this.pageData.mstData.mstPaper = this.pageData.mstData.mstPaperHead;
        }
        else {
            this.pageData.product.paperHeadApprovalFlag = 0;
            this.pageData.mstData.mstPaper = this.pageData.mstData.mstPaperNormal;
        }
    };
    Object.defineProperty(SF0030206Component.prototype, "checkImposition", {
        get: function () {
            if (math_util_1.default.checkNaN(this.pageData.productOutput.lot / this.pageData.product.impositionNumber) >= 10000) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030206Component.prototype, "paperCoalBallOption", {
        get: function () {
            return master_option_1.PAPER_COAT_BALL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030206Component.prototype, "paperCardBOption", {
        get: function () {
            return master_option_1.PAPER_CARD;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030206Component.prototype, "checkBorderPaperNameId", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSavePaperName) {
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
    Object.defineProperty(SF0030206Component.prototype, "checkBorderPaperWeight", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSavePaperWeight) {
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
    Object.defineProperty(SF0030206Component.prototype, "checkBorderPaperSheetSize", {
        get: function () {
            // giai đoạn sau khi tạo product xong
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                // giai đoạn khởi tạo sau khi create product
                if (this.pageData.yCheck) {
                    if (!this.pageData.productRequiredItem.isSavePaperSizeW) {
                        // giai đoạn sau khi save lần tiếp theo
                        if (this.pageData.xCheck) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                    else {
                        return this.pageData.noneFieldBorderCss;
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
    Object.defineProperty(SF0030206Component.prototype, "checkBorderPaperSizeW", {
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
                        // chỉ trường hợp đã nhập vào "その他/ Others" ở pulldown thì 2 item bên dưới mới có thể nhập và nằm trong khung màu xanh.
                        if (this.pageData.xCheck && this.pageData._sheetSize == 0) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    // chỉ trường hợp đã nhập vào "その他/ Others" ở pulldown thì 2 item bên dưới mới có thể nhập và nằm trong khung màu xanh.
                    if (this.pageData.xCheck && this.pageData._sheetSize == 0) {
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
    Object.defineProperty(SF0030206Component.prototype, "checkBorderPaperSizeH", {
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
                        // chỉ trường hợp đã nhập vào "その他/ Others" ở pulldown thì 2 item bên dưới mới có thể nhập và nằm trong khung màu xanh.
                        if (this.pageData.xCheck && this.pageData._sheetSize == 0) {
                            return this.pageData.defaultFieldBorderCss;
                        }
                        else {
                            return this.pageData.noneFieldBorderCss;
                        }
                    }
                }
                else {
                    // chỉ trường hợp đã nhập vào "その他/ Others" ở pulldown thì 2 item bên dưới mới có thể nhập và nằm trong khung màu xanh.
                    if (this.pageData.xCheck && this.pageData._sheetSize == 0) {
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
    Object.defineProperty(SF0030206Component.prototype, "checkBorderCutPaperSizeW", {
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
    Object.defineProperty(SF0030206Component.prototype, "checkBorderCutPaperSizeH", {
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
    Object.defineProperty(SF0030206Component.prototype, "checkBorderTakenNumber", {
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
    Object.defineProperty(SF0030206Component.prototype, "checkBorderImpositionNumber", {
        get: function () {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            }
            else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveImpositionNumber) {
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
    // TODO:start http://fridaynight.vnext.vn/issues/2408
    // closed modal
    SF0030206Component.prototype.closedModal = function () {
        this.pageData.product.paperNameId = this.idSelectedTmp;
        if (this.idSelectedTmp == 100) {
            this.pageData.product.paperWeight = this.paperWeightTmp;
            this.helper.calcPaperActualWeight();
            this.helper.calcShippingCost();
        }
        this.modalHide();
    };
    // calculator data result SF0030222
    SF0030206Component.prototype.setPaperModalResult = function (paperModel) {
        // 1.set paper_weight ->
        this.pageData.paperTmp = new paper_model_1.PaperModel();
        if (!!paperModel.paperId && !paperModel.isNew) {
            this.paperNameId = paperModel.paperId;
            this.paperWeight = paperModel.basicWeight;
            this.pageData.product.specialSizeFlag = 0;
        }
        else {
            // add paper new
            this.addNewPaper(paperModel);
            // set option input
            paperModel.optionId = this.inputPaperOption;
            // set paper_name -> khong goi ham tinh
            // issue 2344
            this.pageData.paperTmp.isNew = paperModel.isNew;
            this.pageData.paperTmp.paperName = paperModel.paperName;
            this.pageData.paperTmp.id = paperModel.id;
            this.pageData.paperTmp.basicWeight = paperModel.basicWeight;
            this.pageData.paperTmp.isPaperClone = paperModel.isPaperClone;
            this.pageData.paperTmp.tabNumber = paperModel.tabNumber;
            this.pageData.paperTmp.paperSizeId = paperModel.paperSizeId;
            this.pageData.product.paperId = data_util_1.default.cloneObject(this.pageData.paperTmp).id;
            this.pageData.product.paperNameId = 100;
            this.pageData.product.paperWeight = paperModel.basicWeight;
            this.pageData.product.sheetSizeId = paperModel.paperSizeId;
            // 2903
            if (paperModel.paper2903) {
                this.pageData.paperTmp.paperSizeW = paperModel.paperSizeW;
                this.pageData.paperTmp.paperSizeH = paperModel.paperSizeH;
                this.pageData.product.paperSizeW = paperModel.paperSizeW;
                this.pageData.product.paperSizeH = paperModel.paperSizeH;
                this.pageData.checkPaper2903 = true;
            }
            else {
                this.pageData.checkPaper2903 = false;
            }
            this.pageData.addPaperModel(paperModel, 100, PAPER_1);
            this.helper.calcPaperActualWeight();
            this.helper.calcShippingCost();
            // get mst sheetSize
            this.changePaperSheetSize(100);
        }
        //2. hide modal
        this.modalHide();
        //3. Dong thoi neu da chon thi phai xu ly phan highlightedTracker.touch
        this.pageData.highlightedTracker.touch('paperNameId');
    };
    SF0030206Component.prototype.modalShow = function () {
        this.getDataMstLaminations();
        setTimeout(function () {
            //scoll userPic
            $('.table-body-paperOther').scrollTop(0);
        }, 300);
        $("#paperModal").modal('show');
        $('.modal-body').css('overflow-y', 'auto');
        $('.modal-body').css('max-height', $(window).height() * 0.86);
    };
    SF0030206Component.prototype.getDataMstLaminations = function () {
        var _this = this;
        // reset paper model
        this.pageData.paperModel = new paper_model_1.PaperModel();
        // tab1
        this.pageData.mstPapersBackgroundTab1 = [];
        var mstPapers = this.pageData.mstPapers;
        if (this.pageData.product.paperHeadApprovalFlag == 1) {
            mstPapers = this.pageData.mstPapersHeader;
        }
        this.pageData.mstPapersBackgroundTab1 = mstPapers.filter(function (item) {
            return item.factoryId == _this.pageData.product.factoryId
                && item.tabNumber == TAB_1
                && item.commonFlag != 1
                && item.commonFlag != undefined;
        }).map(function (item) {
            var paper = data_util_1.default.cloneObject(item);
            if (paper.factoryId != _this.pageData.product.factoryId) {
                paper.normValue = 0;
            }
            return paper;
        });
        // tab2
        this.pageData.mstPapersBackgroundTab2 = [];
        this.pageData.mstPapersBackgroundTab2 = mstPapers.filter(function (item) {
            return item.factoryId == _this.pageData.product.factoryId
                && item.tabNumber == TAB_2
                && item.commonFlag != 1
                && item.commonFlag != undefined;
        }).map(function (item) {
            var paper = data_util_1.default.cloneObject(item);
            if (paper.factoryId != _this.pageData.product.factoryId) {
                paper.normValue = 0;
            }
            return paper;
        });
        // update status selectbox
        switch (this.inputPaperOption) {
            //中芯（g/㎡）
            case PAPER_1:
                this.pageData.product.paperNameId = 99;
                break;
            default:
                break;
        }
    };
    SF0030206Component.prototype.modalHide = function () {
        this.pageData.showModal2903 = false;
        $("#paperModal").modal('hide');
    };
    Object.defineProperty(SF0030206Component.prototype, "pageData", {
        //ISSUE: http://fridaynight.vnext.vn/issues/2408
        get: function () {
            return this.helper.getSF00302Data();
        },
        enumerable: true,
        configurable: true
    });
    SF0030206Component.prototype.addNewPaper = function (paperModel) {
        // nếu là clone thì sẽ set list sheetsize vào paper
        // 3090
        if (paperModel.isPaperClone == 1) {
            paperModel.sheetSizeClone = [];
            if (!!paperModel.paperSizeH && !!paperModel.paperSizeW) {
                var sheetSize = this.pageData.mstSheetSizes.filter(function (item) {
                    return item.width == paperModel.paperSizeW
                        && item.height == paperModel.paperSizeH
                        && item.paperId == paperModel.id;
                });
                if (!!sheetSize) {
                    paperModel.sheetSizeClone.push(sheetSize[0]);
                }
            }
            else if (!!paperModel.id) {
                paperModel.sheetSizeClone = this.pageData.mstSheetSizes.filter(function (item) {
                    return item.paperId == paperModel.id;
                });
            }
        }
        // nếu nó khác thì sẽ push thêm vào list, nếu nó đã có thì cập nhật vào list paperModel
        var index = this.pageData.paperModelNews.findIndex(function (item) {
            return paperModel.optionId == item.optionId;
        });
        // nếu không có -> sẽ add vào list new
        if (index < 0 && !!paperModel.isNew) {
            this.pageData.paperModelNews.push(paperModel);
        }
        else if (index > 0) {
            // thay thế thằng cũ tại vị trí index, thay thế 1, và paperModel
            this.pageData.paperModelNews.splice(index, 1, paperModel);
        }
    };
    // init data
    SF0030206Component.prototype.initDataMst = function () {
        var product = this.pageData.product;
        // 原紙がモーダルで選択されていない場合は何もしない
        if (!product.id || product.paperNameId != 100) {
            return; // Do nothing
        }
        var PAPER = 1;
        var paperModel;
        // 選択されている原紙を検索する
        var paperModels = this.pageData.mstPapers.filter(function (item) { return item.id == product.paperId && item.factoryId == product.factoryId; });
        if (paperModels.length == 1) {
            paperModel = paperModels[0];
        }
        else if (product.sheetSizeId) {
            // 原紙サイズ ID を元に検索する
            paperModel = paperModels.find(function (item) { return item.paperSizeId == product.sheetSizeId; });
        }
        else {
            // 原紙サイズを元に検索する
            paperModel = paperModels.find(function (item) {
                return item.paperSizeW == product.paperSizeW
                    && item.paperSizeH == product.paperSizeH;
            });
        }
        if (!!paperModel) {
            this.pageData.paperTmp = paperModel;
            this.pageData.addPaperModel(paperModel, 100, PAPER);
        }
    };
    Object.defineProperty(SF0030206Component.prototype, "disabledIssue2344", {
        get: function () {
            if (!!!this.pageData.product.paperNameId) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030206Component.prototype, "helper", void 0);
    SF0030206Component = __decorate([
        core_1.Component({
            templateUrl: "SF0030206.component.html",
            selector: 'sf0030206'
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030206Component);
    return SF0030206Component;
}());
exports.SF0030206Component = SF0030206Component;
//# sourceMappingURL=SF0030206.component.js.map