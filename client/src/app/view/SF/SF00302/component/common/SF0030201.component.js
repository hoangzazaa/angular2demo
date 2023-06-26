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
var master_option_1 = require("../../helper/master-option");
var data_util_1 = require("../../../../../util/data-util");
var validator_util_1 = require("../../../../../util/validator-util");
var format_util_1 = require("../../../../../util/format-util");
var SF0030201Component = (function () {
    function SF0030201Component() {
        this.productTypeOption = data_util_1.default.toSelectBoxDataSource(master_option_1.PRODUCT_TYPE);
    }
    SF0030201Component.prototype.ngOnInit = function () {
        var result = data_util_1.default.toSelectBoxDataSource(master_option_1.FACTORY_ID);
        if (this.productTypeInt() == 1) {
            result.splice(2, 1);
        }
        else if (this.productTypeInt() == 2) {
            result.splice(1, 2);
        }
        else if (this.productTypeInt() == 3) {
            result.splice(0, 2);
        }
        this.factoryOption = result;
    };
    Object.defineProperty(SF0030201Component.prototype, "isPaperbox", {
        get: function () {
            if (!!!this.sf00302Data.product.productType && !!!this.sf00302Data.product.shapeId)
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "sf00302Data", {
        get: function () {
            return this.helper.getSF00302Data();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "isRequestDesign", {
        /*check if request design or not */
        get: function () {
            return this.sf00302Data.isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "isView", {
        /* Check Mode view */
        get: function () {
            if (this.isRequestDesign) {
                return false;
            }
            else {
                return this.sf00302Data.isView;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "customerProductCode", {
        // customerProductCode
        get: function () {
            return this.sf00302Data.product.customerProductCode;
        },
        set: function (value) {
            this.sf00302Data.product.customerProductCode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "productCode", {
        //  productCode
        get: function () {
            return this.sf00302Data.product.productCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "productName", {
        // productName
        get: function () {
            return this.sf00302Data.product.productName;
        },
        set: function (value) {
            this.sf00302Data.product.productName = value;
            //this.helper.validateForm();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "productType", {
        // productType
        get: function () {
            return this.sf00302Data.product.productType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "woodenCode1", {
        // wooden number
        get: function () {
            if (this.sf00302Data.product.woodenCode != undefined) {
                var woodenCode = this.sf00302Data.product.woodenCode;
                return woodenCode;
            }
            return null;
        },
        set: function (value) {
            this.sf00302Data.product.woodenCode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "woodenCode2", {
        get: function () {
            if (this.sf00302Data.product.woodenCode2 != undefined) {
                var woodenCode = this.sf00302Data.product.woodenCode2;
                return woodenCode;
            }
            return null;
        },
        set: function (value) {
            this.sf00302Data.product.woodenCode2 = value;
        },
        enumerable: true,
        configurable: true
    });
    //shareWoodenFlag1
    SF0030201Component.prototype.shareWoodenFlag1Checked = function () {
        if (this.sf00302Data.product.shareWoodenFlag1 == 1) {
            return true;
        }
        return false;
    };
    SF0030201Component.prototype.shareWoodenFlag1 = function (event) {
        var value = event.target.checked;
        if (!!value)
            this.sf00302Data.product.shareWoodenFlag1 = 1;
        else
            this.sf00302Data.product.shareWoodenFlag1 = 0;
    };
    //shareWoodenFlag1
    SF0030201Component.prototype.shareWoodenFlag2Checked = function () {
        if (this.sf00302Data.product.shareWoodenFlag2 == 1) {
            return true;
        }
        return false;
    };
    SF0030201Component.prototype.shareWoodenFlag2 = function (event) {
        var value = event.target.checked;
        if (!!value)
            this.sf00302Data.product.shareWoodenFlag2 = 1;
        else
            this.sf00302Data.product.shareWoodenFlag2 = 0;
    };
    Object.defineProperty(SF0030201Component.prototype, "application", {
        // application
        get: function () {
            return this.sf00302Data.product.application;
        },
        set: function (value) {
            this.sf00302Data.product.application = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "filmNumber", {
        // filmNumber
        get: function () {
            return this.sf00302Data.product.filmCode;
        },
        set: function (value) {
            this.sf00302Data.product.filmCode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "requestProduction", {
        // requestProduction
        get: function () {
            if (this.sf00302Data.product.factoryId == undefined) {
                if (this.sf00302Data.product.productType == 0) {
                    this.sf00302Data.product.factoryId = 1;
                }
                else {
                    this.sf00302Data.product.factoryId = 3;
                }
            }
            return this.sf00302Data.product.factoryId;
        },
        set: function (value) {
            this.sf00302Data.product.factoryId = value;
            //Reset Shipping distance
            this.sf00302Data.product.shippingCostId = 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "woodenExpiredDate", {
        // woodenExpiredDate
        get: function () {
            if (this.sf00302Data.product.wooden != null) {
                return this.sf00302Data.product.wooden.woodenExpiredDate;
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "itemCode", {
        // itemCode
        get: function () {
            if (this.sf00302Data.product.itemCode != null
                && this.sf00302Data.product.denno == 1) {
                return this.sf00302Data.product.itemCode;
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "memo1", {
        // memo1
        get: function () {
            return this.sf00302Data.product.memo1;
        },
        set: function (value) {
            this.sf00302Data.product.memo1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "memo2", {
        // memo2
        get: function () {
            return this.sf00302Data.product.memo2;
        },
        set: function (value) {
            this.sf00302Data.product.memo2 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "memo3", {
        // memo3
        get: function () {
            return this.sf00302Data.product.memo3;
        },
        set: function (value) {
            this.sf00302Data.product.memo3 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "copyType", {
        get: function () {
            // if it is a request design will be return 1, can edit
            if (this.isRequestDesign) {
                return 1;
            }
            else {
                return this.sf00302Data.product.copyType;
            }
        },
        enumerable: true,
        configurable: true
    });
    /* Get Product Type to make condition display factory */
    SF0030201Component.prototype.productTypeInt = function () {
        if (this.sf00302Data.product.productType == 0) {
            if (this.sf00302Data.product.shapeId != this.sf00302Data.DECORATIVE_ID) {
                return 1; //Normal Product
            }
            else {
                return 2; //Decorative
            }
        }
        else if (this.sf00302Data.product.productType == 1) {
            return 3; // Carton
        }
        return 1;
    };
    Object.defineProperty(SF0030201Component.prototype, "checkBorderProductName", {
        get: function () {
            if (validator_util_1.default.isNotEmpty(this.sf00302Data.product.id)) {
                if (this.sf00302Data.productRequiredItem.isSaveProductName) {
                    return this.sf00302Data.errFieldBorderCss;
                }
                else {
                    return this.sf00302Data.noneFieldBorderCss;
                }
            }
            else {
                if (this.sf00302Data.productRequiredItem.isSaveProductName) {
                    return this.sf00302Data.errFieldBorderCss;
                }
                else {
                    return this.sf00302Data.defaultFieldBorderCss;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "checkBorderFactoryId", {
        get: function () {
            if (validator_util_1.default.isNotEmpty(this.sf00302Data.product.id)) {
                if (this.sf00302Data.productRequiredItem.isSaveFactoryId) {
                    return this.sf00302Data.errFieldBorderCss;
                }
                else {
                    return this.sf00302Data.noneFieldBorderCss;
                }
            }
            else {
                if (this.sf00302Data.productRequiredItem.isSaveFactoryId) {
                    return this.sf00302Data.errFieldBorderCss;
                }
                else {
                    return this.sf00302Data.defaultFieldBorderCss;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "sampleNo", {
        // sampleNo
        get: function () {
            return this.sf00302Data.product.sampleNo;
        },
        set: function (value) {
            this.sf00302Data.product.sampleNo = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030201Component.prototype, "isCarton", {
        get: function () {
            return format_util_1.FormatUtil.isCarton3458(this.sf00302Data.product);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030201Component.prototype, "helper", void 0);
    SF0030201Component = __decorate([
        core_1.Component({
            templateUrl: "SF0030201.component.html",
            selector: 'sf0030201'
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030201Component);
    return SF0030201Component;
}());
exports.SF0030201Component = SF0030201Component;
//# sourceMappingURL=SF0030201.component.js.map