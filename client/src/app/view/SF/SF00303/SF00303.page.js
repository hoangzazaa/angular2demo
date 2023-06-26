"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var router_1 = require("@angular/router");
var Header_provider_1 = require("../SF00100/Header.provider");
var SF00303_data_1 = require("./SF00303.data");
var message_1 = require("../../../helper/message");
var constants_1 = require("../../../helper/constants");
var Quotation_model_1 = require("../../../model/core/Quotation.model");
var QuotationItem_model_1 = require("../../../model/core/QuotationItem.model");
var SF00303_service_1 = require("./SF00303.service");
var screen_url_1 = require("../../../helper/screen-url");
var validator_util_1 = require("../../../util/validator-util");
var format_util_1 = require("../../../util/format-util");
var common_page_1 = require("../COMMON/common.page");
var enum_type_1 = require("../../../helper/enum-type");
var data_util_1 = require("../../../util/data-util");
var mst_data_type_1 = require("../../../helper/mst-data-type");
var SF00303_PAGE_TITLE = "見積情報";
/**
 * TOP &gt; 案件概況 &gt; 見積情報
 *
 * <pre>
 * Component                 内容
 * --------------------------------------------------------------------------------
 * SF0030302-Component       見積もり明細表示・入力セクション
 * sf0030301-rows            見積もり明細の1行
 * </pre>
 * @author hoangtd
 * */
var SF00303Page = (function (_super) {
    __extends(SF00303Page, _super);
    /**
     * Default constructor
     * @param router
     * @param route
     * @param changeDetectorRef
     * @param headerProvider
     * @param sf00303Service
     */
    function SF00303Page(router, route, headerProvider, sf00303Service, pageData) {
        _super.call(this, router, route, headerProvider);
        this.sf00303Service = sf00303Service;
        this.pageData = pageData;
        this.DEFAULT_LOT = 5000;
    }
    SF00303Page.prototype.ngOnDestroy = function () {
        //closed modal when back open modal
        $('.estimateDate').modal('hide');
        swal.close();
    };
    SF00303Page.prototype.initBreadcrumb = function () {
        var self = this;
        self.headerProvider.reset();
        self.headerProvider.pageName = SF00303_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(constants_1.Constants.TOP, [constants_1.Constants.SLASH]);
        self.headerProvider.addBreadCrumb(constants_1.Constants.DEAL_OVERVIEW_BREADCRUMB, ["/home/deal/" + this.route.snapshot.params["dealCode"]]);
        self.headerProvider.addBreadCrumb(SF00303_PAGE_TITLE);
    };
    SF00303Page.prototype.ngOnInit = function () {
        this.sf00303Service.navigateTo("見積情報", this.router.url);
        // read data resolver
        this.deal = this.route.snapshot.data["sf00303Data"].deal;
        this.quotation = this.route.snapshot.data["sf00303Data"].quotation;
        this.dealProducts = this.route.snapshot.data["sf00303Data"].dealProducts;
        this.pageData.mstLaminations = this.route.snapshot.data["sf00303Data"].mstLaminations;
        if (this.deal != undefined
            && this.quotation != undefined
            && this.quotation.deal != undefined
            && this.deal.id != this.quotation.dealId) {
            var self_1 = this;
            var value = [this.deal.dealCode, this.quotation.deal.dealCode];
            swal({
                title: message_1.default.get(message_1.MSG.COM.WRN001),
                text: message_1.default.get(message_1.MSG.COM.WRN002, value.toString()),
                type: "warning",
                html: true,
                confirmButtonText: constants_1.Constants.BACK
            }, function () {
                return self_1.router.navigate([screen_url_1.ScreenUrl.SF00301, self_1.deal.dealCode]);
            });
            return;
        }
        this.quotationItems = this.route.snapshot.data["sf00303Data"].quotationItems;
        // check create quotation
        if (this.quotation.id == undefined) {
            // get data deal
            this.createQuotation();
        }
        else {
            this.pageData.calculatorQuantity();
            this.pageData.updateDataParent();
            this.pageData.getChangeCalculator();
            this.defaultEstimateDate = this.quotation.estimateDate;
            this.defaultInvoiceExpirationDate = this.quotation.invoiceExpirationDate;
        }
        // check deal template
        if (this.deal.templateFlag == constants_1.Constants.TEMPLATE
            || !!this.deal.closedFlag
            || this.deal.dealStatus >= mst_data_type_1.DEAL_STATUS_VALUES.ORDER_CONFIRMED) {
            this.pageData.view = true;
        }
    };
    Object.defineProperty(SF00303Page.prototype, "checkCreateQuotation", {
        get: function () {
            return !!this.quotation.quotationCode;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * method create quotation info
     * */
    SF00303Page.prototype.createQuotation = function () {
        var _this = this;
        this.quotation = new Quotation_model_1.Quotation();
        this.pageData.quotation.subject = this.pageData.deal.dealName;
        // set deal id
        this.quotation.dealId = this.pageData.deal.id;
        this.quotation.quotationType = constants_1.Constants.DEAL_DEFAULT;
        // set date default
        this.quotation.estimateDate = new Date();
        this.defaultEstimateDate = this.quotation.estimateDate;
        this.defaultInvoiceExpirationDate = this.quotation.invoiceExpirationDate;
        // set invoice and department sale pic by customer
        this.quotation.invoiceDeptName = constants_1.Constants.BLANK;
        this.quotation.invoicePic = this.route.snapshot.data["sf00303Data"].saleByCustomer.username;
        // set quotationItem default
        if (this.pageData.dealProducts && this.pageData.dealProducts[0]) {
            //http://fridaynight.vnext.vn/issues/2227
            //add list product highlight flag = 1
            this.pageData.dealProducts.filter(function (dealProduct) {
                //filter
                return dealProduct.highlightFlag == 1;
            }).forEach(function (dealProduct) {
                // add quotationItem
                _this.setQuotationDefault(dealProduct);
            });
        }
    };
    SF00303Page.prototype.setQuotationDefault = function (dealProduct) {
        var _this = this;
        var productItem = new QuotationItem_model_1.QuotationItem();
        productItem.itemType = enum_type_1.QuotationItemType.PRODUCT;
        productItem.productType = 3;
        productItem.setClosedFlag = undefined;
        // set name product
        if (!!dealProduct) {
            var product = dealProduct.product;
            productItem.name = product.productName;
            productItem.description = format_util_1.FormatUtil.formatProductDescription(dealProduct.product, this.pageData.mstLaminations).slice(0, 60);
            // dealProduct item is linked dealProduct
            var offers = dealProduct.offers;
            offers.forEach(function (offer) {
                var productOutput = offer.productOutput;
                // set max lot and set submit price and totalPrice
                productItem.quantity = productOutput.lot;
                productItem.submittedPrice = offer.unitPrice;
                productItem.total = productItem.quantity * productItem.submittedPrice;
                // add item to list
                // check total != 0
                if (format_util_1.FormatUtil.isNaN(productItem.quantity) > 0) {
                    // set dealProductId
                    _this.quotationItems.push(data_util_1.default.cloneObject(productItem));
                    // reset value quotationItem
                    productItem.quantity = undefined;
                    productItem.submittedPrice = undefined;
                    productItem.total = undefined;
                }
            });
            // find no
            this.pageData.updateDisplayNo();
            // update data by lot
            this.pageData.checkLotValue();
        }
    };
    /**
     * Delete quotation info by quotation code
     */
    SF00303Page.prototype.deleteQuotationInfo = function () {
        if (this.quotation.quotationCode == null) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00303.INF0010) }, { type: 'danger' });
            return;
        }
        else {
            var self_2 = this;
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message_1.MSG.SF00303.INF005),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d26a5c",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00303.INF003),
                closeOnConfirm: true
            }, function () {
                self_2.sf00303Service.deleteQuotation(self_2.quotation.quotationCode).then(function (data) {
                    return self_2.router.navigate([screen_url_1.ScreenUrl.SF00301, self_2.deal.dealCode]);
                });
            });
        }
    };
    /**
     * Cancel redirect page deal info
     */
    SF00303Page.prototype.cancelQuotation = function () {
        var self = this;
        if (self.pageData.checkEdit) {
            // back window
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message_1.MSG.SF00309.WRN001),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00303.INF003),
                closeOnConfirm: true
            }, function () {
                return self.router.navigate([screen_url_1.ScreenUrl.SF00301, self.deal.dealCode]);
            });
        }
        else {
            self.router.navigate([screen_url_1.ScreenUrl.SF00301, self.deal.dealCode]);
        }
    };
    /**
     * Save and copy quotation
     */
    SF00303Page.prototype.saveAndCopy = function () {
        var _this = this;
        if (!this.checkDateSubmit()) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00303.ERR004) }, { type: 'danger' });
            return;
        }
        if (this.quotation.quotationCode != null) {
            if ($('#SF00303-deal-info').valid()) {
                this.sf00303Service.duplicateQuotation(this.quotation, this.quotationItems).then(function (data) {
                    $.notify({ message: "見積ID: " + data.quotation.quotationCode + " として新しく保存しました。" }, { type: 'success' });
                    _this.pageData.checkEdit = false;
                    return _this.router.navigate(["/home/deal/", _this.deal.dealCode, "quotation",
                        data.quotation.quotationCode]).then(function () {
                        // Trigger OnInit manually
                        _this.ngOnInit();
                    });
                }).catch(function (err) {
                    $.notify({ message: message_1.default.get(message_1.MSG.SF00303.ERR005) }, { type: 'danger' });
                });
            }
            else {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00303.ERR006) }, { type: 'danger' });
            }
        }
        else {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00303.INF0010) }, { type: 'info' });
        }
    };
    /**
     * Save and update data
     * if quotation not created then create quotation
     * else update quotation
     */
    SF00303Page.prototype.saveQuotation = function () {
        var _this = this;
        if (!this.checkDateSubmit()) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00303.ERR004) }, { type: 'danger' });
            return;
        }
        if ($('#SF00303-deal-info').valid()) {
            this.sf00303Service.saveQuotation(this.quotation, this.quotationItems).then(function (data) {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00303.INF009) }, { type: 'success' });
                _this.pageData.checkEdit = false;
                return _this.router.navigate(["/home/deal/", _this.deal.dealCode, "quotation",
                    data.quotation.quotationCode]).then(function () {
                    // Trigger OnInit manually
                    _this.ngOnInit();
                });
            }, function (err) {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00303.ERR002) }, { type: 'danger' });
                return;
            });
        }
        else {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00303.ERR003) }, { type: 'danger' });
            return;
        }
    };
    /**
     * Redirect page SF00304
     */
    SF00303Page.prototype.redirectSF0304 = function () {
        var _this = this;
        if (!this.checkDateSubmit()) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00303.ERR004) }, { type: 'danger' });
            return;
        }
        this.sf00303Service.saveQuotation(this.quotation, this.quotationItems).then(function (data) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00303.INF009) }, { type: 'success' });
            // 見積りテンプレの並び順変更により、option値はは3でリダイレクト
            return _this.router.navigate(["/home/deal", _this.deal.dealCode, "exportQuotation", data.quotation.quotationCode, 3]);
        }, function (err) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00303.ERR002) }, { type: 'danger' });
            return;
        });
    };
    /* Check start, end Date*/
    SF00303Page.prototype.checkDateSubmit = function () {
        //A createDate/見積日
        //B invoiceExpirationDate/見積有効期限
        //C invoiceDeliveryDate/ 納期
        var createDate = this.pageData.quotation.createdDate;
        if (validator_util_1.default.isEmpty(createDate))
            createDate = new Date(); //system date
        // check A > B
        var A = format_util_1.FormatUtil.dateToMilliseconds(createDate);
        var expiredDate = this.pageData.quotation.invoiceExpirationDate;
        if (validator_util_1.default.isNotEmpty(expiredDate)) {
            var B = format_util_1.FormatUtil.dateToMilliseconds(expiredDate);
            if (A > B)
                return false;
        }
        return true;
    };
    Object.defineProperty(SF00303Page.prototype, "defaultEstimateDate", {
        get: function () {
            return this.pageData.defaultEstimateDate;
        },
        set: function (val) {
            this.pageData.defaultEstimateDate = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "defaultInvoiceExpirationDate", {
        get: function () {
            return this.pageData.defaultInvoiceExpirationDate;
        },
        set: function (val) {
            this.pageData.defaultInvoiceExpirationDate = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "isHasCustomer", {
        // check deal has customer
        get: function () {
            // check customerId or customerName
            return !!this.pageData.deal.customer.customerCode || !!this.deal.customerName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "deal", {
        // get and set item page
        get: function () {
            return this.pageData.deal;
        },
        set: function (value) {
            this.pageData.deal = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "dealProducts", {
        // dealProducts
        get: function () {
            return this.pageData.dealProducts;
        },
        set: function (value) {
            this.pageData.dealProducts = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "quotation", {
        // quotation
        get: function () {
            return this.pageData.quotation;
        },
        set: function (value) {
            this.pageData.quotation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "quotationItems", {
        //quotationItems
        get: function () {
            return this.pageData.quotationItems;
        },
        set: function (value) {
            this.pageData.quotationItems = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "quotationCode", {
        // quotation code
        get: function () {
            return this.pageData.quotation.quotationCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "subject", {
        // subject
        get: function () {
            return this.pageData.quotation.subject;
        },
        set: function (value) {
            this.pageData.quotation.subject = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "customerName", {
        //customer name
        get: function () {
            if (this.isHasCustomer) {
                if (this.pageData.deal.customer.customerCode) {
                    return this.pageData.deal.customer.name;
                }
                else {
                    return this.pageData.deal.customerName;
                }
            }
            return constants_1.Constants.BLANK;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "saleName", {
        // sale name
        get: function () {
            if (this.pageData.deal.sales != undefined) {
                if (this.pageData.deal.sales.department != undefined)
                    return this.pageData.deal.sales.department.department
                        + "／" + this.pageData.deal.sales.username;
                return this.pageData.deal.sales.username;
            }
            return constants_1.Constants.BLANK;
        },
        set: function (value) {
            this.pageData.deal.sales.username = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "estimateDate", {
        //estimate date
        get: function () {
            return this.pageData.quotation.estimateDate;
        },
        enumerable: true,
        configurable: true
    });
    SF00303Page.prototype._estimateDate = function (value) {
        this.pageData.checkEdit = true;
        this.pageData.quotation.estimateDate = value;
    };
    Object.defineProperty(SF00303Page.prototype, "memo", {
        //memo
        get: function () {
            return this.pageData.quotation.memo;
        },
        set: function (value) {
            this.pageData.quotation.memo = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "remark", {
        // remark
        get: function () {
            return this.pageData.quotation.remark;
        },
        set: function (value) {
            this.pageData.quotation.remark = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "invoiceDeliveryDate", {
        //invoiceDeliveryDate
        get: function () {
            return this.pageData.quotation.invoiceDeliveryDate;
        },
        set: function (val) {
            this.pageData.quotation.invoiceDeliveryDate = val;
        },
        enumerable: true,
        configurable: true
    });
    SF00303Page.prototype.parseInvoiceDeliveryDate = function () {
        var USE_STRICT_PARSING = true;
        var input = this.replaceFullwidthNumbers(this.pageData.quotation.invoiceDeliveryDate);
        var mo = moment(input, ["YYYYMMDD", "YYMMDD", "YYYY/MM/DD", "YY/MM/DD", "YYYY/M/D", "YY/M/D"], USE_STRICT_PARSING);
        if (mo.isValid()) {
            this.pageData.quotation.invoiceDeliveryDate = mo.format("YYYY年MM月DD日");
        }
    };
    SF00303Page.prototype.replaceFullwidthNumbers = function (input) {
        return input
            .replace(/０/g, "0")
            .replace(/１/g, "1")
            .replace(/２/g, "2")
            .replace(/３/g, "3")
            .replace(/４/g, "4")
            .replace(/５/g, "5")
            .replace(/６/g, "6")
            .replace(/７/g, "7")
            .replace(/８/g, "8")
            .replace(/９/g, "9");
    };
    Object.defineProperty(SF00303Page.prototype, "invoiceDeliveryPlace", {
        //invoiceDeliveryPlace
        get: function () {
            return this.pageData.quotation.invoiceDeliveryPlace;
        },
        set: function (value) {
            this.pageData.quotation.invoiceDeliveryPlace = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "invoicePaymentTerm", {
        // invoicePaymentTerm
        get: function () {
            return this.pageData.quotation.invoicePaymentTerm;
        },
        set: function (value) {
            this.pageData.quotation.invoicePaymentTerm = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "invoiceExpirationDate", {
        // invoiceExpirationDate
        get: function () {
            return this.pageData.quotation.invoiceExpirationDate;
        },
        enumerable: true,
        configurable: true
    });
    SF00303Page.prototype._invoiceExpirationDate = function (value) {
        this.pageData.checkEdit = true;
        this.pageData.quotation.invoiceExpirationDate = value;
    };
    Object.defineProperty(SF00303Page.prototype, "invoiceCustomerName", {
        //invoiceCustomerName
        get: function () {
            return this.pageData.quotation.invoiceCustomerName;
        },
        set: function (value) {
            this.pageData.quotation.invoiceCustomerName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "invoiceDeptName", {
        //invoiceDeptName
        get: function () {
            return this.pageData.quotation.invoiceDeptName;
        },
        set: function (value) {
            this.pageData.quotation.invoiceDeptName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "invoiceDeptNamePlaceholder", {
        get: function () {
            return this.pageData.deal.sales.department.department;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "invoicePic", {
        // invoicePic
        get: function () {
            return this.pageData.quotation.invoicePic;
        },
        set: function (value) {
            this.pageData.quotation.invoicePic = value;
        },
        enumerable: true,
        configurable: true
    });
    SF00303Page.prototype.isHasPicName = function () {
        return (this.pageData.deal.sales != undefined);
    };
    Object.defineProperty(SF00303Page.prototype, "invoicePicNamePlaceholder", {
        get: function () {
            return this.pageData.deal.sales.username;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "invoiceMailAddress", {
        // invoiceMailAddress
        get: function () {
            return this.pageData.quotation.invoiceMailAddress;
        },
        set: function (value) {
            this.pageData.quotation.invoiceMailAddress = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "invoiceAddress", {
        //invoiceAddress
        get: function () {
            return this.pageData.quotation.invoiceAddress;
        },
        set: function (value) {
            this.pageData.quotation.invoiceAddress = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "invoicePhoneNumber", {
        //invoicePhoneNumber
        get: function () {
            return this.pageData.quotation.invoicePhoneNumber;
        },
        set: function (value) {
            this.pageData.quotation.invoicePhoneNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "customerCode", {
        // customer code
        get: function () {
            // check customer null = true
            if (!this.isHasCustomer) {
                return '得意先ID';
            }
            else {
                // customer in deal != null
                if (!!this.deal.customer.customerCode) {
                    return this.pageData.deal.customer.customerCode;
                }
                else {
                    return 'New Customer';
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "dealType", {
        // deal type
        get: function () {
            return data_util_1.default.getData(mst_data_type_1.DEAL_TYPE, constants_1.Constants.BLANK, this.pageData.deal.dealType);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "stereoType1Flag", {
        //
        get: function () {
            if (this.pageData.quotation.stereoType1Flag == undefined) {
                this.pageData.quotation.stereoType1Flag = 1;
            }
            return this.pageData.quotation.stereoType1Flag;
        },
        set: function (value) {
            if (value) {
                this.pageData.quotation.stereoType1Flag = 1;
            }
            else {
                this.pageData.quotation.stereoType1Flag = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "stereoType2Flag", {
        get: function () {
            if (this.pageData.quotation.stereoType2Flag == undefined) {
                this.pageData.quotation.stereoType2Flag = 1;
            }
            return this.pageData.quotation.stereoType2Flag;
        },
        set: function (value) {
            if (value) {
                this.pageData.quotation.stereoType2Flag = 1;
            }
            else {
                this.pageData.quotation.stereoType2Flag = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "stereoType3Flag", {
        get: function () {
            if (this.pageData.quotation.stereoType3Flag == undefined) {
                this.pageData.quotation.stereoType3Flag = 1;
            }
            return this.pageData.quotation.stereoType3Flag;
        },
        set: function (value) {
            if (value) {
                this.pageData.quotation.stereoType3Flag = 1;
            }
            else {
                this.pageData.quotation.stereoType3Flag = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "stereoType4Flag", {
        get: function () {
            if (this.pageData.quotation.stereoType4Flag == undefined) {
                this.pageData.quotation.stereoType4Flag = 1;
            }
            return this.pageData.quotation.stereoType4Flag;
        },
        set: function (value) {
            if (value) {
                this.pageData.quotation.stereoType4Flag = 1;
            }
            else {
                this.pageData.quotation.stereoType4Flag = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Page.prototype, "title", {
        get: function () {
            return this.quotation.title;
        },
        enumerable: true,
        configurable: true
    });
    SF00303Page.prototype._title = function (value) {
        this.pageData.quotation.title = value;
    };
    Object.defineProperty(SF00303Page.prototype, "invoiceDeliveryMethod", {
        get: function () {
            this.pageData.checkLotValue();
            var value = this.quotation.deliveryMethod;
            if (value == null || value == undefined || value === "") {
                if (this.pageData.lotTotal <= this.DEFAULT_LOT) {
                    this.pageData.placeholder = "一括納品";
                }
                else {
                    this.pageData.placeholder = "ご希望に合わせて調整";
                }
            }
            return this.quotation.deliveryMethod;
        },
        set: function (value) {
            this.quotation.deliveryMethod = value;
            if (!value) {
                if (this.pageData.lotTotal <= this.DEFAULT_LOT) {
                    this.pageData.placeholder = "一括納品";
                }
                else {
                    this.pageData.placeholder = "ご希望に合わせて調整";
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    SF00303Page.prototype.eventChange = function () {
        this.pageData.checkEdit = true;
    };
    SF00303Page = __decorate([
        core_1.Component({
            templateUrl: "./SF00303.page.html",
            providers: [SF00303_data_1.SF00303Data]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, SF00303_service_1.SF00303Service, SF00303_data_1.SF00303Data])
    ], SF00303Page);
    return SF00303Page;
}(common_page_1.CommonPage));
exports.SF00303Page = SF00303Page;
//# sourceMappingURL=SF00303.page.js.map