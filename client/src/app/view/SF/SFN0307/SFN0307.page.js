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
var Header_provider_1 = require("../SF00100/Header.provider");
var router_1 = require("@angular/router");
var common_page_1 = require("../COMMON/common.page");
var SFN0307_service_1 = require("./SFN0307.service");
var SFN0307_data_1 = require("./SFN0307.data");
var message_1 = require("../../../helper/message");
var CC00100_service_1 = require("../../CC/CC00100/CC00100.service");
var constants_1 = require("../../../helper/constants");
var OrderItem_model_1 = require("./model/OrderItem.model");
var SFN0307_constants_1 = require("./SFN0307.constants");
var ShippingPlan_model_1 = require("./model/ShippingPlan.model");
var SFN0307_helper_1 = require("./SFN0307.helper");
var mst_data_type_1 = require("../../../helper/mst-data-type");
var path_util_1 = require("../../../util/path-util");
var SFN0307Page = (function (_super) {
    __extends(SFN0307Page, _super);
    //region Initialize page
    function SFN0307Page(router, route, headerProvider, service, authService) {
        _super.call(this, router, route, headerProvider);
        this.router = router;
        this.route = route;
        this.headerProvider = headerProvider;
        this.service = service;
        // check deal repeat or order revision -> 3367
        this.isRepeatOrOderRevision = false;
        // init page data
        this.pageData = new SFN0307_data_1.SFN0307Data();
        service.pageData = this.pageData;
        // get current user
        this.user = authService.user;
        this.orderBtnEnable = true;
    }
    // init breadcrumb
    SFN0307Page.prototype.initBreadcrumb = function () {
        var self = this;
        var sf0301Path = "/home/deal/" + self.route.snapshot.params["dealCode"];
        self.headerProvider.reset();
        self.headerProvider.pageName = "受注登録（製造・出荷指示）";
        self.headerProvider.addBreadCrumb(constants_1.Constants.TOP, [constants_1.Constants.SLASH]); //Dashboard
        self.headerProvider.addBreadCrumb(constants_1.Constants.DEAL_OVERVIEW_BREADCRUMB, [sf0301Path]); //SF003-01
        self.headerProvider.addBreadCrumb("受注登録");
    };
    //endregion
    // get data on page load
    SFN0307Page.prototype.ngOnInit = function () {
        var _this = this;
        this.service.navigateTo("受注登録（製造・出荷指示）", this.router.url);
        this.pageData.dealCode = this.route.snapshot.params["dealCode"];
        // check for repeat mode
        this.isRepeat = false;
        var paths = this.route.snapshot.pathFromRoot;
        if (paths.length > 1) {
            var checkpath = paths[paths.length - 2];
            var urls = checkpath.url;
            if (urls.length > 0) {
                if (urls[0].path == "repeat-order") {
                    this.isRepeat = true;
                }
            }
        }
        // check for add shipping mode
        this.isShipping = false;
        var productCode = this.route.snapshot.queryParams[SFN0307_constants_1.SFN0307Constants.PARAM_PRODUCT];
        var stockNumberStr = this.route.snapshot.queryParams[SFN0307_constants_1.SFN0307Constants.PARAM_STOCK];
        if (stockNumberStr != undefined) {
            var stockNumber = +stockNumberStr;
            if (!isNaN(stockNumber)) {
                this.pageData.shippingStock = stockNumber;
                this.pageData.shippingProduct = productCode;
                this.isShipping = true;
            }
        }
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        var notify = $.notify({
            message: message_1.MSG.SFN0307.INF001
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        notify.update("progress", 10);
        // load data
        this.service.SFN030701().then(function () {
            // done
            _this.notifyDone(notify);
            // verify can order deal
            var dealInfo = _this.pageData.dealInfo;
            if (dealInfo.closedFlag == 1
                || dealInfo.templateFlag == 1
                || dealInfo.dealStatus < mst_data_type_1.DEAL_STATUS_VALUES.DESIGN_CONFIRMED) {
                swal({
                    title: "",
                    text: message_1.default.get(message_1.MSG.SFN0307.ERR003),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d26a5c",
                    confirmButtonText: "Yes",
                    closeOnConfirm: true
                }, function (res) { return _this.goBack(); });
                return;
            }
            // setup orders
            for (var i = 0; i < _this.pageData.orders.length; i++) {
                _this.pageData.orders[i] = _this.generateOrderProduct(_this.pageData.orders[i].productId);
            }
            // set checked if only 1 order
            if (_this.pageData.orders.length == 1) {
                _this.pageData.orders[0].checked = true;
            }
            // set default screen mode
            if (_this.isRepeat) {
                _this.pageData.screenMode = SFN0307_constants_1.SFN0307Constants.MODE_CREATE;
                _this.pageData.canChangeMode = false;
                _this.isRepeatOrOderRevision = true;
            }
            else {
                if (dealInfo.dealStatus == mst_data_type_1.DEAL_STATUS_VALUES.DESIGN_CONFIRMED) {
                    _this.pageData.screenMode = SFN0307_constants_1.SFN0307Constants.MODE_CREATE;
                }
                else {
                    _this.pageData.screenMode = SFN0307_constants_1.SFN0307Constants.MODE_UPDATE;
                    if (dealInfo.dealStatus == mst_data_type_1.DEAL_STATUS_VALUES.ORDER_CONFIRMED
                        || dealInfo.dealStatus == mst_data_type_1.DEAL_STATUS_VALUES.SHIPPED) {
                        // this.pageData.canChangeMode = false;
                        _this.isRepeatOrOderRevision = true;
                    }
                    else {
                        _this.pageData.canChangeMode = true;
                    }
                }
            }
        });
    };
    Object.defineProperty(SFN0307Page.prototype, "orders", {
        get: function () {
            return this.pageData.orders;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN0307Page.prototype, "screenMode", {
        get: function () {
            return this.pageData.screenMode;
        },
        set: function (value) {
            this.pageData.screenMode = value;
            // change screen by mode
            this.initScreen();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN0307Page.prototype, "isModeChangable", {
        get: function () {
            return this.pageData.canChangeMode;
        },
        enumerable: true,
        configurable: true
    });
    //region Actions
    SFN0307Page.prototype.goBack = function () {
        this.navigate2(["home/deal", this.pageData.dealInfo.dealCode]).then(null);
    };
    SFN0307Page.prototype.viewProductInfo = function (index) {
        var dealCode = this.pageData.dealInfo.dealCode;
        var product = this.pageData.orders[index].product;
        var productType = product.type;
        var shapeId = product.shapeId;
        var productCode = product.code;
        var cartonShippingType = product.cartonShippingType;
        path_util_1.PathUtil.redirectToPageProduct(this.router, dealCode, productCode, productType, shapeId, cartonShippingType);
    };
    SFN0307Page.prototype.initScreen = function () {
        // note screen real mode
        if (this.pageData.screenMode == SFN0307_constants_1.SFN0307Constants.MODE_CREATE
            && this.pageData.dealInfo.dealStatus > mst_data_type_1.DEAL_STATUS_VALUES.ORDER_CONFIRMED) {
            this.isRepeat = true;
        }
        else {
            this.isRepeat = false;
        }
        // setup orders
        for (var i = 0; i < this.pageData.orders.length; i++) {
            this.pageData.orders[i] = this.generateOrderProduct(this.pageData.orders[i].productId);
        }
        // set checked if only 1 order
        if (this.pageData.orders.length == 1) {
            this.pageData.orders[0].checked = true;
        }
    };
    SFN0307Page.prototype.saveDestination = function (destination) {
        var _this = this;
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        var notify = $.notify({
            message: message_1.MSG.SFN0307.INF004
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 140000,
            z_index: 2000
        });
        notify.update("progress", 10);
        return this.service.SFN030702(destination).then(function () {
            _this.notifyDone(notify);
        }, function (err) {
            _this.notifyError(notify);
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.MSG.SFN0307.ERR005,
                confirmButtonColor: '#66ccff',
                confirmButtonText: "閉じる",
            }, function () {
                _this.goBack();
            });
        });
    };
    SFN0307Page.prototype.exportPdf = function (index) {
        var productId = this.pageData.orders[index].productId;
        this.service.SFN030704(productId)
            .then(function (result) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00307.INF002) }, { type: 'success' });
            var link = document.createElement('a');
            link.setAttribute('target', '_blank');
            link.href = result.filePath;
            link.click();
        })
            .catch(function (err) {
            swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00307.ERR004), "error");
        });
    };
    SFN0307Page.prototype.addOrder = function () {
        var _this = this;
        // validate input
        var validated = this.validate();
        if (!validated) {
            return;
        }
        // do order
        this.orderBtnEnable = false;
        // call service to create/update
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        var notify = $.notify({
            message: message_1.MSG.SFN0307.INF003
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 140000,
            z_index: 2000
        });
        notify.update("progress", 10);
        // call service
        this.service.SFN030703().then(function () {
            // re-enable button
            _this.orderBtnEnable = true;
            // show success
            _this.notifyDone(notify);
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.MSG.SFN0307.INF002,
                confirmButtonColor: '#66ccff',
                confirmButtonText: "閉じる",
                customClass: "order-success-msg"
            }, function () {
                _this.reloadPage();
            });
        }, function (err) {
            _this.notifyError(notify);
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.MSG.SFN0307.ERR004,
                confirmButtonColor: '#66ccff',
                confirmButtonText: "閉じる",
            }, function () {
                _this.goBack();
            });
        });
    };
    SFN0307Page.prototype.reloadPage = function () {
        var _this = this;
        this.router.navigateByUrl('/blank', { skipLocationChange: true }).then(function () {
            _this.navigate2(['/home/deal', _this.pageData.dealInfo.dealCode, 'order'], { replaceUrl: true });
        });
    };
    //endregion
    //region functions
    SFN0307Page.prototype.notifyDone = function (notify) {
        // notify update and close
        notify.update("progress", 100);
        notify.update("type", "success");
        setTimeout(function (ntf) {
            ntf.close();
        }, 1000, notify);
        // hide content loader
        OneUI.contentLoader('hide');
    };
    SFN0307Page.prototype.notifyError = function (notify) {
        // notify update and close
        notify.update("progress", 100);
        notify.update("type", "danger");
        setTimeout(function (ntf) {
            ntf.close();
        }, 1000, notify);
        // hide content loader
        OneUI.contentLoader('hide');
    };
    SFN0307Page.prototype.generateOrderProduct = function (productId) {
        var order = new OrderItem_model_1.OrderItemModel();
        // productId
        order.productId = productId;
        // product
        var product = this.pageData.dataRepo.getProduct(productId);
        order.product = product;
        // order
        var oldOrder = this.pageData.dataRepo.getOrder(productId);
        if (oldOrder == undefined) {
            // first time
            // checked
            order.checked = false;
            // quantity
            order.quantity = product.lot;
            // default shipping plan
            var shippingPlan = SFN0307_helper_1.SFN0307Helper.createNewShipping(order, this.pageData);
            order.shippings = [shippingPlan];
            // no
            shippingPlan.no = 0;
            // productionSpecs
            if (!SFN0307_helper_1.SFN0307Helper.isRevProduct(product)) {
                order.productionSpecs = 1;
            }
            else {
                order.productionSpecs = 2;
            }
            //http://fridaynight.vnext.vn/issues/2998
            if (this.pageData.dealInfo.dealType == 2) {
                order.productionSpecs = 2;
            }
            // printVersion
            order.printVersion = 2;
            // wooden
            order.wooden = 2;
            // mold
            order.mold = 1;
            // passageOrder
            order.passageOrder = "";
            // sampleLift
            order.sampleLift = 0;
            // sampleSales
            order.sampleSales = 0;
            // sampleCustomer
            order.sampleCustomer = 0;
            // sampleItem
            order.sampleItem = 0;
            // sampleProduct
            order.sampleProduct = 0;
            order.pib_customerManagedId = "";
            order.customerManagedId = "";
        }
        else {
            // not first time
            // checked
            order.checked = true;
            // quantity
            order.quantity = oldOrder.quantity;
            // unit price (trigger calculate)
            order.unitPrice = oldOrder.unitPrice;
            order.pib_unitPrice = oldOrder.unitPrice;
            order.orderCode = oldOrder.orderCode;
            order.orderCode2 = oldOrder.orderCode2;
            // 相手管理No
            order.pib_customerManagedId = oldOrder.pib_customerManagedId;
            order.customerManagedId = oldOrder.customerManagedId;
            var shippings = [];
            order.shippings = shippings;
            if (!this.isRepeat) {
                // update
                order.id = oldOrder.id;
                // productionSpecs
                order.productionSpecs = oldOrder.productionSpecs;
                // printVersion
                order.printVersion = oldOrder.printVersion;
                // wooden
                order.wooden = oldOrder.wooden;
                // mold
                order.mold = oldOrder.mold;
                // passageOrder
                order.passageOrder = oldOrder.passageOrder;
                // sampleLift
                order.sampleLift = oldOrder.sampleLift;
                // sampleSales
                order.sampleSales = oldOrder.sampleSales;
                // sampleCustomer
                order.sampleCustomer = oldOrder.sampleCustomer;
                // sampleItem
                order.sampleItem = oldOrder.sampleItem;
                // sampleProduct
                order.sampleProduct = oldOrder.sampleProduct;
                // shipping
                for (var _i = 0, _a = oldOrder.shippings; _i < _a.length; _i++) {
                    var oldShipping = _a[_i];
                    var shipping = new ShippingPlan_model_1.ShippingPlanModel();
                    shippings.push(shipping);
                    // id
                    shipping.id = oldShipping.id;
                    // no
                    shipping.no = oldShipping.no;
                    // shippingDate
                    shipping.shippingDate = oldShipping.shippingDate;
                    // deliveryDate
                    shipping.deliveryDate = oldShipping.deliveryDate;
                    // loadingAddressId
                    shipping.loadingAddressId = oldShipping.loadingAddressId;
                    // loadingAddressName
                    shipping.loadingAddressName = oldShipping.loadingAddressName;
                    // quantity
                    shipping.quantity = oldShipping.quantity;
                    // shippingCompany
                    shipping.shippingCompany = oldShipping.shippingCompany;
                    // specifyTime
                    shipping.specifyTime = oldShipping.specifyTime;
                    // specifyTimeHour
                    shipping.specifyTimeHour = oldShipping.specifyTimeHour;
                    // specifyTimeMinute
                    shipping.specifyTimeMinute = oldShipping.specifyTimeMinute;
                    // specifyTimePeriod
                    shipping.specifyTimePeriod = oldShipping.specifyTimePeriod;
                    // destinationId
                    shipping.destinationId = oldShipping.destinationId;
                    // specifyTimeStr
                    shipping.specifyTimeStr = oldShipping.specifyTimeStr;
                }
                // shipping stock
                if (this.isShipping) {
                    // check for right product
                    if (this.pageData.shippingProduct == product.code) {
                        // add new shipping
                        var shipping = SFN0307_helper_1.SFN0307Helper.createNewShipping(order, this.pageData);
                        shipping.quantity = this.pageData.shippingStock;
                        shippings.push(shipping);
                    }
                }
            }
            else {
                // repeat
                // productionSpecs
                order.productionSpecs = 4;
                // printVersion
                order.printVersion = 4;
                // wooden
                order.wooden = 4;
                // mold
                order.mold = 1;
                // passageOrder
                // issue 3367
                order.passageOrder = oldOrder.passageOrder;
                // sampleLift
                order.sampleLift = 0;
                // sampleSales
                order.sampleSales = 0;
                // sampleCustomer
                order.sampleCustomer = 0;
                // sampleItem
                order.sampleItem = 0;
                // sampleProduct
                order.sampleProduct = 0;
                // shipping
                for (var _b = 0, _c = oldOrder.shippings; _b < _c.length; _b++) {
                    var oldShipping = _c[_b];
                    var shipping = new ShippingPlan_model_1.ShippingPlanModel();
                    shippings.push(shipping);
                    // no
                    shipping.no = oldShipping.no;
                    // quantity
                    shipping.quantity = oldShipping.quantity;
                    // specifyTimeHour
                    shipping.specifyTimeHour = oldShipping.specifyTimeHour;
                    // specifyTimeMinute
                    shipping.specifyTimeMinute = oldShipping.specifyTimeMinute;
                    // specifyTimePeriod
                    shipping.specifyTimePeriod = oldShipping.specifyTimePeriod;
                    // issue 3367
                    // loadingAddressId
                    shipping.loadingAddressId = oldShipping.loadingAddressId;
                    shipping.loadingAddressName = oldShipping.loadingAddressName;
                    // shippingCompany
                    shipping.shippingCompany = oldShipping.shippingCompany;
                    // specifyTime
                    shipping.specifyTime = oldShipping.specifyTime;
                    // specifyTimeStr
                    shipping.specifyTimeStr = oldShipping.specifyTimeStr;
                    // destinationId
                    shipping.destinationId = oldShipping.destinationId;
                }
                // create default shipping if no shipping plan (IF mistake)
                if (shippings.length == 0) {
                    // default shipping plan
                    var shippingPlan = SFN0307_helper_1.SFN0307Helper.createNewShipping(order, this.pageData);
                    order.shippings = [shippingPlan];
                    // no
                    shippingPlan.no = 0;
                }
            }
            // re-sort shipping by no
            shippings.sort(function (s1, s2) {
                return s1.no - s2.no;
            });
        }
        return order;
    };
    SFN0307Page.prototype.validate = function () {
        // require
        if ($(".input-required").length > 0) {
            // illegal way
            $.notify({ message: message_1.default.get(message_1.MSG.SFN0307.ERR001) }, { type: 'danger' });
            return false;
        }
        // order number
        var checkedNumber = this.orders.filter(function (order) { return order.checked; }).length;
        if (checkedNumber == 0) {
            $.notify({ message: message_1.default.get(message_1.MSG.SFN0307.ERR002) }, { type: 'danger' });
            return false;
        }
        return true;
    };
    SFN0307Page = __decorate([
        core_1.Component({
            templateUrl: "SFN0307.page.html",
            styleUrls: ["SFN0307.page.css"],
            providers: [SFN0307_service_1.SFN0307Service],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, SFN0307_service_1.SFN0307Service, CC00100_service_1.CC00100Service])
    ], SFN0307Page);
    return SFN0307Page;
}(common_page_1.CommonPage));
exports.SFN0307Page = SFN0307Page;
//# sourceMappingURL=SFN0307.page.js.map