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
var Deal_model_1 = require("../../../../model/core/Deal.model");
var QuotationItem_model_1 = require("../../../../model/core/QuotationItem.model");
var enum_type_1 = require("../../../../helper/enum-type");
var Product_model_1 = require("../../../../model/core/Product.model");
var format_util_1 = require("../../../../util/format-util");
var math_util_1 = require("../../../../util/math-util");
var SF00303_data_1 = require("../SF00303.data");
var router_1 = require("@angular/router");
var mst_data_type_1 = require("../../../../helper/mst-data-type");
var path_util_1 = require("../../../../util/path-util");
/**
 * TOP &gt; 案件概況 &gt; 見積情報  見積もり明細表示/入力セクションの1行
 * @author hoangtd extends from haipt
 * */
var SF0030301Component = (function () {
    function SF0030301Component(element, pageData, router) {
        this.element = element;
        this.pageData = pageData;
        this.router = router;
        this.closedQuotationItemGroups = new core_1.EventEmitter();
        this.viewMode = true;
        this.isSelected = false;
        this.onRemove = new core_1.EventEmitter();
    }
    SF0030301Component.prototype.ngAfterViewInit = function () {
        $(document).delegate('textarea[maxlength]', 'keydown keyup paste change', function (e) {
            var limit = parseInt($(this).attr('maxlength'));
            var text = $(this).val();
            var chars = text.length;
            if (chars > limit) {
                e.preventDefault();
                $(this).val(text.substr(0, limit));
            }
        });
    };
    Object.defineProperty(SF0030301Component.prototype, "itemIndex", {
        /*find index item*/
        get: function () {
            this.itemData.itemIndex = $(this.element.nativeElement).index() + 1;
            return this.itemData.itemIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "isBlank", {
        get: function () {
            return ((this.itemData.itemType == enum_type_1.QuotationItemType.LINE) && (this.itemData.name == undefined));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "isHeading", {
        get: function () {
            return ((this.itemData.itemType == enum_type_1.QuotationItemType.LINE) && (this.itemData.name != undefined));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "isGroups", {
        get: function () {
            return this.itemData.itemType == enum_type_1.QuotationItemType.SET;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "isProduct", {
        get: function () {
            return this.itemData.itemType >= enum_type_1.QuotationItemType.PRODUCT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "isSetClose", {
        get: function () {
            return this.isGroups && (this.itemData.setClosedFlag == 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "isChildItemRow", {
        get: function () {
            return this.isProduct && (this.itemData.setClosedFlag != undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "isChildHidden", {
        get: function () {
            return this.isHeading && (this.itemData.setClosedFlag == 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "isEmptyUnit", {
        /**
         * 単位が空欄なら数量、提出単価、提出金額を空欄にする
         */
        get: function () {
            return this.productUnit.length == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "productUnit", {
        get: function () {
            if (!!this.productType && this.productType > 0)
                return mst_data_type_1.PRODUCT_UNIT[this.productType];
            return this.productTypeName;
        },
        enumerable: true,
        configurable: true
    });
    /*remove groups swal*/
    SF0030301Component.prototype.remove = function () {
        var self = this;
        if (this.isGroups) {
            swal({
                title: '',
                text: 'グループを削除してよろしいですか？',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d26a5c',
                confirmButtonText: 'はい',
                cancelButtonText: "いいえ",
                html: false
            }, function () {
                self.onRemove.emit(self.itemIndex);
            });
        }
        else {
            this.onRemove.emit(this.itemIndex);
        }
    };
    Object.defineProperty(SF0030301Component.prototype, "name", {
        get: function () {
            if (!!this.itemData.dealProductId)
                return this.itemData.dealProduct.product.productName;
            if (!!this.itemData.name && this.itemData.name.length > 20) {
                this.itemData.name = this.itemData.name.slice(0, 21);
            }
            return this.itemData.name;
        },
        set: function (value) {
            this.itemData.name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "quantity", {
        // quantity
        get: function () {
            return format_util_1.FormatUtil.isNaN(this.itemData.quantity);
        },
        set: function (value) {
            this.itemData.quantity = format_util_1.FormatUtil.isNaN(value);
            // update quantity then calculator data quotation info
            if (this.itemData.dealProductId > 0 && this.itemData.itemType == enum_type_1.QuotationItemType.PRODUCT) {
                this.pageData.calculatorQuantity();
            }
            else {
                // update total child
                this.itemData.total = format_util_1.FormatUtil.isNaN(this.itemData.submittedPrice) * format_util_1.FormatUtil.isNaN(this.itemData.quantity);
            }
            this.pageData.checkLotValue();
            // emit change calculator and update data parent
            this.emitChangeCalculatorData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "description", {
        //description
        get: function () {
            if (this.itemData.description == null) {
                this.itemData.description = '';
            }
            return this.itemData.description;
        },
        set: function (value) {
            this.itemData.description = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "productType", {
        // productType
        get: function () {
            return this.itemData.productType;
        },
        set: function (value) {
            this.itemData.productType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "productTypeName", {
        get: function () {
            return this.itemData.productTypeName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "submittedPrice", {
        // submittedPrice
        get: function () {
            // check undefined
            if (this.itemData.submittedPrice == undefined) {
                this.itemData.submittedPrice = 0;
            }
            // check product common fee and data common fee
            if (this.itemData.itemType >= enum_type_1.QuotationItemType.FEE_1) {
                this.updatePriceProductCommon();
            }
            return this.itemData.submittedPrice;
        },
        set: function (value) {
            this.itemData.submittedPrice = format_util_1.FormatUtil.isNaN(value);
            this.itemData.total = format_util_1.FormatUtil.isNaN(this.itemData.submittedPrice) * format_util_1.FormatUtil.isNaN(this.itemData.quantity);
            // update data total
            this.emitChangeCalculatorData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "no", {
        // no
        get: function () {
            return this.itemData.no;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "identity", {
        get: function () {
            return this.itemData.identity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "total", {
        // total
        get: function () {
            if (this.itemData.total == undefined || this.isEmptyUnit) {
                this.itemData.total = 0;
            }
            return math_util_1.default.round(this.itemData.total, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "dealProduct", {
        // get dealProduct
        get: function () {
            return this.dealData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "dealProductId", {
        // get dealProductId(){
        get: function () {
            return this.itemData.dealProductId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "product", {
        // get product
        get: function () {
            if (this.itemData.dealProduct != undefined) {
                return this.itemData.dealProduct.product;
            }
            else {
                return new Product_model_1.Product();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030301Component.prototype, "interestRate", {
        // interestRate
        get: function () {
            return this._interestRate;
        },
        enumerable: true,
        configurable: true
    });
    SF0030301Component.prototype.setInterestRate = function (offer) {
        var rate = math_util_1.default.roundDecimal(math_util_1.default.checkNaN((offer.unitPrice - offer.productOutput.estimatedUnitPrice) / offer.unitPrice) * 100, 2);
        this._interestRate = "" + rate + " %";
    };
    // Update product common fee
    SF0030301Component.prototype.updatePriceProductCommon = function () {
        if (this.itemData.itemType >= enum_type_1.QuotationItemType.FEE_1) {
            // check data itemType
            switch (this.itemData.itemType) {
                case 4:
                    this.itemData.submittedPrice = this.itemData.dealProduct.product.productCommon.designFee;
                    break;
                case 5:
                    this.itemData.submittedPrice = this.itemData.dealProduct.product.productCommon.plateMakingFee;
                    break;
                case 6:
                    this.itemData.submittedPrice = this.itemData.dealProduct.product.productCommon.woodenFee;
                    break;
                case 7:
                    this.itemData.submittedPrice = this.itemData.dealProduct.product.productCommon.moldFee;
                    break;
                case 8:
                    this.itemData.submittedPrice = this.itemData.dealProduct.product.productCommon.resinFee;
                    break;
                default:
                    this.itemData.submittedPrice = 0;
                    break;
            }
            // calculator total
            this.itemData.total = this.itemData.quantity * this.itemData.submittedPrice;
            // emit change calculator and update data parent
            this.emitChangeCalculatorData();
        }
    };
    // emit change calculator data quotation info
    SF0030301Component.prototype.emitChangeCalculatorData = function () {
        this.pageData.updateDataParent();
        this.pageData.getChangeCalculator();
    };
    SF0030301Component.prototype.eventChange = function () {
        this.pageData.checkEdit = true;
    };
    SF0030301Component.prototype.viewDetailProduct = function (product) {
        var dealCode = this.pageData.deal.dealCode;
        path_util_1.PathUtil.redirectToPageProduct(this.router, dealCode, product.productCode, product.productType, product.shapeId, product.cartonShippingType);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Deal_model_1.Deal)
    ], SF0030301Component.prototype, "dealData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', QuotationItem_model_1.QuotationItem)
    ], SF0030301Component.prototype, "itemData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SF0030301Component.prototype, "dataList", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030301Component.prototype, "closedQuotationItemGroups", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SF0030301Component.prototype, "viewMode", void 0);
    __decorate([
        core_1.HostBinding("class.blank"), 
        __metadata('design:type', Object)
    ], SF0030301Component.prototype, "isBlank", null);
    __decorate([
        core_1.HostBinding("class.heading"), 
        __metadata('design:type', Object)
    ], SF0030301Component.prototype, "isHeading", null);
    __decorate([
        core_1.HostBinding("class.group-heading"), 
        __metadata('design:type', Object)
    ], SF0030301Component.prototype, "isGroups", null);
    __decorate([
        core_1.HostBinding("class.tr-product"), 
        __metadata('design:type', Object)
    ], SF0030301Component.prototype, "isProduct", null);
    __decorate([
        core_1.HostBinding("class.group-heading-close"), 
        __metadata('design:type', Object)
    ], SF0030301Component.prototype, "isSetClose", null);
    __decorate([
        core_1.HostBinding("class.group-child"), 
        __metadata('design:type', Object)
    ], SF0030301Component.prototype, "isChildItemRow", null);
    __decorate([
        core_1.HostBinding("class.group-child-hidden"), 
        __metadata('design:type', Object)
    ], SF0030301Component.prototype, "isChildHidden", null);
    __decorate([
        core_1.HostBinding("class.empty-unit"), 
        __metadata('design:type', Object)
    ], SF0030301Component.prototype, "isEmptyUnit", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SF0030301Component.prototype, "onRemove", void 0);
    SF0030301Component = __decorate([
        core_1.Component({
            selector: "[sf0030301-rows]",
            templateUrl: "SF0030301.component.html"
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, SF00303_data_1.SF00303Data, router_1.Router])
    ], SF0030301Component);
    return SF0030301Component;
}());
exports.SF0030301Component = SF0030301Component;
//# sourceMappingURL=SF0030301.component.js.map