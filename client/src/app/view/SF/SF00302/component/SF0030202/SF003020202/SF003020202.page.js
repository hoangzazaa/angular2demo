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
/**
 * Created by VuPT on 5/9/2017.
 */
var SF00302_data_1 = require("../../../SF00302.data");
var SF00302_service_1 = require("../../../SF00302.service");
var core_1 = require("@angular/core");
var SF003020202_helper_1 = require("./SF003020202.helper");
var router_1 = require("@angular/router");
var Header_provider_1 = require("../../../../SF00100/Header.provider");
var constants_1 = require("../../../../../../helper/constants");
var Deal_model_1 = require("../../../../../../model/core/Deal.model");
var data_util_1 = require("../../../../../../util/data-util");
var MstData_1 = require("../../../../../../model/MstData");
var message_1 = require("../../../../../../helper/message");
var ProductPropertyChangedTracker_1 = require("../../../helper/ProductPropertyChangedTracker");
var ProductCommonFee_model_1 = require("../../../../../../model/core/ProductCommonFee.model");
var Product_model_1 = require("../../../../../../model/core/Product.model");
var DealProduct_model_1 = require("../../../../../../model/core/DealProduct.model");
var format_util_1 = require("../../../../../../util/format-util");
var paper_model_1 = require("../../../model/paper.model");
var ProductOutput_model_1 = require("../../../../../../model/core/ProductOutput.model");
var Offer_model_1 = require("../../../../../../model/core/Offer.model");
var AbstractSF00302_page_1 = require("../../../AbstractSF00302.page");
var SF00302_PAGE_TITLE = "製品情報";
var TYPE_FRONT = 100, TYPE_B = 101, TYPE_MEDIUM = 102, TYPE_A = 103, TYPE_BACK = 104;
/**
 * 製品情報(A式以外段ボール)
 */
var SF003020202Page = (function (_super) {
    __extends(SF003020202Page, _super);
    function SF003020202Page(route, router, headerProvider, sv00302Service) {
        _super.call(this, router, route, headerProvider);
        this.sv00302Service = sv00302Service;
        this.helper = new SF003020202_helper_1.SF003020202Helper;
        this.helper.sf00302Data = new SF00302_data_1.SF00302Data;
        this.helper.sf00302Data.product.productType = 1;
        this.helper.sf00302Data.product.cartonShippingType = 1;
    }
    SF003020202Page.prototype.initBreadcrumb = function () {
        var self = this;
        self.headerProvider.reset();
        self.headerProvider.pageName = SF00302_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(constants_1.Constants.TOP, [constants_1.Constants.SLASH]);
        self.headerProvider.addBreadCrumb(constants_1.Constants.DEAL_OVERVIEW_BREADCRUMB, ["/home/deal/" + this.route.snapshot.params["dealCode"]]);
        self.headerProvider.addBreadCrumb(SF00302_PAGE_TITLE);
    };
    Object.defineProperty(SF003020202Page.prototype, "pageData", {
        get: function () {
            return this.helper.getSF00302Data();
        },
        enumerable: true,
        configurable: true
    });
    SF003020202Page.prototype.ngAfterViewInit = function () {
        // closed modal when back
        $(window).on('hashchange', function (event) {
            if (window.location.hash != "#upload-form") {
                $('#upload-form').modal('hide');
                $('#paperModal').modal('hide');
            }
        });
        App.initHelpers(['magnific-popup', 'slick', 'datepicker', 'datetimepicker', 'slimscroll']);
    };
    SF003020202Page.prototype.ngOnInit = function () {
        this.sv00302Service.navigateTo("製品情報(A式以外ダンボール)", this.router.url);
        var dealCode = this.route.snapshot.params['dealCode'];
        var dataDeal = this.route.parent.snapshot.data["deal"];
        var sf00302Data = this.route.parent.snapshot.data["sf00302Data"];
        this.initDataScreen(dealCode, dataDeal, sf00302Data);
    };
    SF003020202Page.prototype.initDataScreen = function (dealCode, dataDeal, sf00302Data) {
        this.pageData.mstLaminations = [];
        this.pageData.mstLaminationsHeader = [];
        // deal code
        if (!!dealCode) {
            this.pageData.dealCode = dealCode;
        }
        // deal
        var deal = new Deal_model_1.Deal;
        if (!!dataDeal) {
            Object.assign(deal, dataDeal);
            this.pageData.deal = deal;
            this.pageData.isView = this.isTemplateDeal(deal) || deal.dealStatus >= 4 || deal.isClosed;
        }
        // sf00302data
        if (!!sf00302Data) {
            if (sf00302Data.dealProduct != undefined
                && sf00302Data.dealProduct.product != undefined) {
                this.pageData.productFiles = sf00302Data.dealProduct.product.productFiles;
                this.assignDealProduct(sf00302Data.dealProduct);
                this.refeshIndexingObjects();
                var tmpProduct = sf00302Data.dealProduct.product;
                this.pageData.zCheck = false;
                this.pageData.xCheck = (tmpProduct.createdDate == tmpProduct.updatedDate);
                this.pageData.yCheck = false;
            }
            else {
                this.pageData.product.pasteSpecialFormFlag = 0;
                // init empty output
                for (var i = 0; i < 5; i++) {
                    this.pageData.productOutputs.push(new ProductOutput_model_1.ProductOutput());
                    this.pageData.offers.push(new Offer_model_1.Offer());
                }
                //CheckType
                this.pageData.zCheck = true;
                this.pageData.xCheck = true;
                this.pageData.yCheck = false;
            }
            // get list mst paper
            this.parseDataPaper(sf00302Data);
            // get master data
            this.assignMstDatas(sf00302Data);
        }
        this.pageData.highlightedTracker.initializeDone();
        //Set default value of check save
        this.pageData.checkInputSave = false;
        this.pageData.checkOutputSave = false;
        this.pageData.checkCommonSave = false;
    };
    SF003020202Page.prototype.parseDataPaper = function (sf00302Data) {
        // get list mst paper
        var laminations = sf00302Data["mstLamination"];
        var laminationsHead = sf00302Data["mstLaminationHead"];
        this.addMstLamination(laminations, laminationsHead);
    };
    SF003020202Page.prototype.isTemplateDeal = function (deal) {
        return deal.isTemplate || (!this.isCreat && this.pageData.deal.dealStatus >= 4);
    };
    SF003020202Page.prototype.assignDealProduct = function (source) {
        //assign dealProduct into data
        var dealProduct = new DealProduct_model_1.DealProduct();
        dealProduct.setDealProduct(source);
        this.pageData.dealProduct = dealProduct;
        //assign product into data
        var product = new Product_model_1.Product();
        product.setProduct(source.product);
        this.pageData.productOld = product;
        this.pageData.product = data_util_1.default.cloneObject(this.pageData.productOld);
        //assign productOuputs into data
        var productOutputs = [];
        Object.assign(productOutputs, source.product.productOutputs);
        this.pageData.productOutputsOld = productOutputs;
        this.pageData.productOutputs = data_util_1.default.cloneObject(this.pageData.productOutputsOld);
        //assign product common fee
        var fee = new ProductCommonFee_model_1.ProductCommonFee();
        Object.assign(fee, source.product.productCommon);
        this.pageData.productCommonFee = fee;
        //assign offers into data
        var offers = [];
        Object.assign(offers, source.offers);
        this.pageData.offersOld = offers;
        this.pageData.offers = data_util_1.default.cloneObject(this.pageData.offersOld);
        // init backup data - lot
        for (var i = 0; i < 5; i++) {
            if (source.product.productOutputs[i] == undefined) {
                this.pageData.bkProductLots.push(undefined);
            }
            else {
                this.pageData.bkProductLots.push(source.product.productOutputs[i].lot);
            }
        }
        // init backup data - offer
        for (var i = 0; i < 5; i++) {
            if (source.offers[i] == undefined) {
                this.pageData.bkProductOffers.push(undefined);
            }
            else {
                this.pageData.bkProductOffers.push(source.offers[i].unitPrice);
            }
        }
    };
    SF003020202Page.prototype.addMstLamination = function (laminations, laminationsHead) {
        //3.parse mstPapers
        if (!!laminations) {
            for (var _i = 0, laminations_1 = laminations; _i < laminations_1.length; _i++) {
                var paper = laminations_1[_i];
                var paperTmp = this.parsePaperLamination(paper);
                this.pageData.mstLaminations.push(paperTmp);
            }
        }
        //4.parse papersHead
        if (!!laminationsHead) {
            for (var _a = 0, laminationsHead_1 = laminationsHead; _a < laminationsHead_1.length; _a++) {
                var paper = laminationsHead_1[_a];
                var paperTmp = this.parsePaperLamination(paper);
                this.pageData.mstLaminationsHeader.push(paperTmp);
            }
        }
    };
    SF003020202Page.prototype.refeshIndexingObjects = function () {
        if (this.pageData.productOutputs[0] != undefined) {
            this.pageData.productOutput = this.pageData.productOutputs[0];
        }
        if (this.pageData.productCommonFee != undefined) {
            this.pageData.indexProductCommonFee = this.pageData.productCommonFee;
        }
        if (this.pageData.offers[0] != undefined) {
            this.pageData.indexOffer = this.pageData.offers[0];
        }
    };
    SF003020202Page.prototype.parsePaperLamination = function (paper) {
        var paperTmp = new paper_model_1.PaperModel();
        paperTmp.setData(paper);
        paperTmp.basicWeight = paper["laminationWeight"];
        paperTmp.paperId = paper["paperId"];
        paperTmp.factoryId = paper["factoryId"];
        paperTmp.normValue = format_util_1.FormatUtil.isNaN(paper["laminationThroughWage"]) != 0 ? format_util_1.FormatUtil.isNaN(paper["laminationThroughWage"])
            : format_util_1.FormatUtil.isNaN(paper["sagaNormValue"]);
        paperTmp.paperName = paper["laminationName"];
        paperTmp.hiddenFlag = paper["hiddenFlag"];
        paperTmp.commonFlag = paper["commonFlag"];
        return paperTmp;
    };
    Object.defineProperty(SF003020202Page.prototype, "isView", {
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
    Object.defineProperty(SF003020202Page.prototype, "isCreat", {
        get: function () {
            return this.pageData.product == null || this.pageData.product.id == null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Page.prototype, "hasProduct", {
        // check product undefined
        get: function () {
            return this.pageData.product != null && this.pageData.product.id != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Page.prototype, "isDeleteEnable", {
        get: function () {
            var isDeleteEnable = false;
            if (this.pageData.deal.dealStatus != undefined && this.pageData.deal.dealStatus != 1) {
                isDeleteEnable = true;
            }
            return isDeleteEnable;
        },
        enumerable: true,
        configurable: true
    });
    /** @inheritDoc */
    SF003020202Page.prototype.doSaveProduct = function () {
        // this.helper.checkChangeDataProduct();
        var _this = this;
        var product = new Product_model_1.Product();
        product.setProduct(this.pageData.product);
        if (this.isCreat) {
            var dealCode_1 = this.route.snapshot.params["dealCode"];
            var productOutputs = [];
            Object.assign(productOutputs, this.pageData.productOutputs);
            product.productOutputs = productOutputs;
            // push product offer
            for (var i = 0; i < 5; i++) {
                product.productOutputs[i].offers = [];
                product.productOutputs[i].offers.push(this.pageData.offers[i]);
            }
            var productCommonFee = new ProductCommonFee_model_1.ProductCommonFee();
            product.productCommon = Object.assign(productCommonFee, this.pageData.productCommonFee);
            this.sv00302Service
                .sv0030202CreateDealProduct(dealCode_1, product)
                .then(function (data) {
                var productCode = data.dealProduct.product.productCode;
                _this.router
                    .navigate(['/home/deal', dealCode_1, 'product', productCode, 'carton-not-a'], { replaceUrl: true })
                    .then(function (res) {
                    // update data sf00302Data
                    _this.ngOnInit();
                    // message save success
                    $.notify({ message: message_1.default.get(message_1.MSG.SF00302.INF005) }, { type: 'info' });
                    _this.helper.getSF00302Data().productOld = data_util_1.default.cloneObject(_this.helper.sf00302Data.product);
                    _this.pageData.checkInputSave = false;
                    _this.pageData.checkOutputSave = false;
                });
            });
        }
        else {
            this.pageData.checkInputSave = true; //（変更チェックを外す。一旦暫定対応。）
            if (this.pageData.checkInputSave) {
                this.sv00302Service.sv003012UpdateProductInput(product, this.pageData.paperModelNews).then(function (data) {
                    if (_this.pageData.product.productName.length > 40) {
                        _this.pageData.product.productName = _this.pageData.product.productName.slice(0, 40);
                    }
                    if (_this.pageData.product.memo1 != undefined && _this.pageData.product.memo1.length > 60) {
                        _this.pageData.product.memo1 = _this.pageData.product.memo1.slice(0, 60);
                    }
                    if (_this.pageData.product.memo2 != undefined && _this.pageData.product.memo2.length > 60) {
                        _this.pageData.product.memo2 = _this.pageData.product.memo2.slice(0, 60);
                    }
                    if (_this.pageData.product.memo3 != undefined && _this.pageData.product.memo3.length > 60) {
                        _this.pageData.product.memo3 = _this.pageData.product.memo3.slice(0, 60);
                    }
                    if (_this.pageData.product.packingNote != undefined && _this.pageData.product.packingNote.length > 60) {
                        _this.pageData.product.packingNote = _this.pageData.product.packingNote.slice(0, 60);
                    }
                    $.notify({ message: message_1.default.get(message_1.MSG.SF00302.INF006) }, { type: 'info' });
                    _this.pageData.checkInputSave = false;
                    // check validate border
                    _this.pageData.product.createdDate = new Date();
                    // update paper laminationId
                    var product = data["product"];
                    //set id paper new
                    _this.pageData.product.laminationBId = product["laminationBId"];
                    _this.pageData.product.laminationFrontId = product["laminationFrontId"];
                    _this.pageData.product.laminationAId = product["laminationAId"];
                    _this.pageData.product.laminationMediumId = product["laminationMediumId"];
                    _this.pageData.product.laminationBackId = product["laminationBackId"];
                    // reset old data to validate - follow 3057
                    _this.helper.getSF00302Data().productOld = data_util_1.default.cloneObject(_this.helper.sf00302Data.product);
                    // reset list paper model news
                    _this.pageData.paperModelNews = [];
                    //check reset paper tmp
                    _this.removeDataPaperTmp();
                });
            }
            else {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00302.INF019) }, { type: 'info' });
            }
        }
    };
    /** @inheritDoc */
    SF003020202Page.prototype.doDuplicateProduct = function (type) {
        var _this = this;
        var dealProduct = new DealProduct_model_1.DealProduct();
        dealProduct.setDealProduct(this.pageData.dealProduct);
        // set offers
        var offers = [];
        Object.assign(offers, this.pageData.offers);
        dealProduct.offers = offers;
        // set product
        var product = new Product_model_1.Product();
        product.setProduct(this.pageData.product);
        if (product.pasteId == 0) {
            product.pasteId = null;
        }
        if (product.stampingId == 0) {
            product.stampingId = null;
        }
        if (product.paperId == 0) {
            product.paperId = null;
        }
        if (product.surfaceTreatmentIdF == 0) {
            product.surfaceTreatmentIdF = null;
        }
        if (product.surfaceTreatmentIdB == 0) {
            product.surfaceTreatmentIdB = null;
        }
        if (product.packingId == 0) {
            product.packingId = null;
        }
        if (product.shippingCostId == 0) {
            product.shippingCostId = null;
        }
        dealProduct.product = product;
        // set product common fee
        var fee = new ProductCommonFee_model_1.ProductCommonFee();
        fee.setProductCommonFee(this.pageData.productCommonFee);
        product.productCommon = fee;
        // set product output
        var productOutputs = [];
        Object.assign(productOutputs, this.pageData.productOutputs);
        product.productOutputs = productOutputs;
        // cal service duplidate deal product
        this.sv00302Service
            .sv0030204DuplicateProductForDeal(dealProduct, type, this.pageData.paperModelNews)
            .then(function (data) {
            var productCode = data.dealProduct.product.productCode;
            _this.router
                .navigate(['/home/deal', _this.pageData.dealCode, 'product', productCode, 'carton-not-a'])
                .then(function (res) {
                var tracker = new ProductPropertyChangedTracker_1.HightlightedPropertyTracker();
                Object.keys(tracker).forEach(function (key) {
                    if (tracker.hasOwnProperty(key)) {
                        tracker[key] = true;
                    }
                });
                tracker.initialized = false;
                _this.pageData.highlightedTracker = tracker;
                _this.pageData.product.requestDesignFlag = null;
                // update data
                _this.ngOnInit();
                _this.initDataMst();
                //reset paper news
                _this.pageData.paperModelNews = [];
                // message duplicate success
                $.notify({ message: message_1.default.get(message_1.MSG.SF00302.INF007) }, { type: 'info' });
            });
        });
    };
    /*Cancel product*/
    SF003020202Page.prototype.cancelProduct = function () {
        // check history
        // if (document.referrer.includes("product")) {
        //     window.history.back();
        // } else {
        //     this.router.navigate(['/home/deal/' + this.pageData.dealCode]);
        // }
        var message = "";
        var check = false;
        this.helper.checkChangeDataProduct();
        this.helper.checkChangeDataProductOutput();
        this.helper.checkChangeDataOffer();
        if (this.pageData.checkInputSave) {
            message = message_1.default.get(message_1.MSG.SF00302.ERR014);
            check = true;
        }
        if (this.pageData.checkOutputSave) {
            message = message_1.default.get(message_1.MSG.SF00302.ERR015);
            check = true;
        }
        if (this.pageData.checkCommonSave) {
            message = message_1.default.get(message_1.MSG.SF00302.ERR016);
            check = true;
        }
        if (this.pageData.checkInputSave && this.pageData.checkOutputSave) {
            message = message_1.default.get(message_1.MSG.SF00302.ERR017);
            check = true;
        }
        if (this.pageData.checkInputSave && this.pageData.checkCommonSave) {
            message = message_1.default.get(message_1.MSG.SF00302.ERR018);
            check = true;
        }
        if (this.pageData.checkOutputSave && this.pageData.checkCommonSave) {
            message = message_1.default.get(message_1.MSG.SF00302.ERR019);
            check = true;
        }
        if (this.pageData.checkInputSave && this.pageData.checkOutputSave && this.pageData.checkCommonSave) {
            message = message_1.default.get(message_1.MSG.SF00302.ERR020);
            check = true;
        }
        var self = this;
        if (check) {
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00302.INF004),
                closeOnConfirm: true
            }, function () {
                self.backProduct();
            });
        }
        else {
            self.backProduct();
        }
    };
    SF003020202Page.prototype.backProduct = function () {
        var _this = this;
        this.router.navigateByUrl('/blank').then(function () {
            _this.router.navigate(['/home/deal/' + _this.pageData.dealCode], { replaceUrl: true });
        });
    };
    SF003020202Page.prototype.deleteDealProduct = function () {
        var self = this;
        swal({
            title: constants_1.Constants.BLANK,
            text: message_1.default.get(message_1.MSG.SF00302.INF014),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d26a5c",
            confirmButtonText: message_1.default.get(message_1.MSG.SF00302.INF004),
            closeOnConfirm: true
        }, function () {
            self.sv00302Service
                .sv0030205DeleteDealProduct(self.helper.getSF00302Data().dealProduct.id)
                .then(function (res) {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00302.INF003) }, { type: 'success' });
                return self.router.navigate(['home/deal', self.helper.getSF00302Data().dealCode]);
            }).catch(function (err) {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00302.ERR002) }, { type: 'danger' });
            });
        });
    };
    /*Get mst data*/
    SF003020202Page.prototype.assignMstDatas = function (data) {
        // Call service to get master data from server
        // Set up paper master data
        this.pageData.mstData = new MstData_1.MstData();
        var mstPaperModel = {};
        data["mstPaper"].forEach(function (paper) {
            data_util_1.default.pushData(mstPaperModel, paper["normValue"], "normValue", paper["factoryId"], paper["nameId"], paper["basicWeight"]);
            data_util_1.default.pushData(mstPaperModel, paper["id"], "paperId", paper["factoryId"], paper["nameId"], paper["basicWeight"]);
            data_util_1.default.pushData(mstPaperModel, paper["name"], "name", paper["factoryId"], paper["nameId"], paper["basicWeight"], paper["id"]);
        });
        var mstPaperHeadModel = {};
        data["mstPaperHead"].forEach(function (paper) {
            data_util_1.default.pushData(mstPaperHeadModel, paper["normValue"], "normValue", paper["factoryId"], paper["nameId"], paper["basicWeight"]);
            data_util_1.default.pushData(mstPaperHeadModel, paper["id"], "paperId", paper["factoryId"], paper["nameId"], paper["basicWeight"]);
        });
        // Set up color master data
        var mstColorModel = {};
        data["mstColor"].forEach(function (color) {
            if (color["productType"] == 3) {
                data_util_1.default.pushData(mstColorModel, color["basicCost"], "basicCost", color["colorOption"]);
            }
        });
        // Set up surface treatment master data
        var mstSurfaceTreatmentModel = {};
        data["mstSurfaceTreatment"].forEach(function (surfaceTreatment) {
            data_util_1.default.pushData(mstSurfaceTreatmentModel, surfaceTreatment["size"], "size", surfaceTreatment["varnishType"]);
            data_util_1.default.pushData(mstSurfaceTreatmentModel, surfaceTreatment["throughNumber"], "throughNumber", surfaceTreatment["varnishType"], surfaceTreatment["size"]);
            data_util_1.default.pushData(mstSurfaceTreatmentModel, surfaceTreatment["basicCost"], "basicCost", surfaceTreatment["varnishType"], surfaceTreatment["size"], surfaceTreatment["throughNumber"]);
            data_util_1.default.pushData(mstSurfaceTreatmentModel, surfaceTreatment["throughWage"], "throughWage", surfaceTreatment["varnishType"], surfaceTreatment["size"], surfaceTreatment["throughNumber"]);
        });
        // Set up stamping master data
        var mstStampingModel = {};
        data["mstStamping"].forEach(function (stamping) {
            data_util_1.default.pushData(mstStampingModel, stamping["blank"], "blank", stamping["processingType"]);
            data_util_1.default.pushData(mstStampingModel, stamping["basicCost"], "basicCost", stamping["processingType"], stamping["blank"]);
            data_util_1.default.pushData(mstStampingModel, stamping["throughWage"], "throughWage", stamping["processingType"], stamping["blank"]);
        });
        // Set up window master data
        var mstWindowMarginModel = {};
        data["mstWindow"].forEach(function (windowMargin) {
            data_util_1.default.pushData(mstWindowMarginModel, windowMargin["windowLot"], "windowLot", windowMargin["windowSize"]);
            data_util_1.default.pushData(mstWindowMarginModel, windowMargin["windowMaterial"], "windowMaterial", windowMargin["windowSize"], windowMargin["windowLot"]);
            data_util_1.default.pushData(mstWindowMarginModel, windowMargin["windowPreparationFee"], "windowPreparationFee", windowMargin["windowSize"], windowMargin["windowLot"], windowMargin["windowMaterial"]);
            data_util_1.default.pushData(mstWindowMarginModel, windowMargin["windowThroughWage"], "windowThroughWage", windowMargin["windowSize"], windowMargin["windowLot"], windowMargin["windowMaterial"]);
        });
        // Set up die cutting master data
        var mstDieCutting = {};
        data["mstDieCutting"].forEach(function (striking) {
            data_util_1.default.pushData(mstDieCutting, striking["size"], "size", striking["paperboardType"]);
            data_util_1.default.pushData(mstDieCutting, striking["impositionNumber"], "impositionNumber", striking["paperboardType"], striking["size"]);
            data_util_1.default.pushData(mstDieCutting, striking["throughNumber"], "throughNumber", striking["paperboardType"], striking["size"], striking["impositionNumber"]);
            data_util_1.default.pushData(mstDieCutting, striking["basicCost"], "basicCost", striking["paperboardType"], striking["size"], striking["impositionNumber"], striking["throughNumber"]);
            data_util_1.default.pushData(mstDieCutting, striking["throughWage"], "throughWage", striking["paperboardType"], striking["size"], striking["impositionNumber"], striking["throughNumber"]);
        });
        // Set up paste master data
        var mstPasteModel = {};
        data["mstPaste"].forEach(function (paste) {
            data_util_1.default.pushData(mstPasteModel, paste["form"], "form", paste["paperType"]);
            data_util_1.default.pushData(mstPasteModel, paste["blankSize"], "blankSize", paste["paperType"], paste["form"]);
            data_util_1.default.pushData(mstPasteModel, paste["basicCost"], "basicCost", paste["paperType"], paste["form"], paste["blankSize"]);
            data_util_1.default.pushData(mstPasteModel, paste["throughWage"], "throughWage", paste["paperType"], paste["form"], paste["blankSize"]);
        });
        // Set up packing master data
        var mstPackingModel = {};
        data["mstPacking"].forEach(function (packing) {
            data_util_1.default.pushData(mstPackingModel, packing["lot"], "lot", packing["method"]);
            data_util_1.default.pushData(mstPackingModel, packing["percent"], "percent", packing["method"], packing["lot"]);
        });
        // Set up shipping cost master data
        var mstShippingCostModel = {};
        data["mstShippingCost"].forEach(function (shippingCost) {
            data_util_1.default.pushData(mstShippingCostModel, shippingCost["distance"], "distance", shippingCost["factoryId"]);
            data_util_1.default.pushData(mstShippingCostModel, shippingCost["weight"], "weight", shippingCost["factoryId"], shippingCost["distance"]);
            data_util_1.default.pushData(mstShippingCostModel, shippingCost["cost"], "cost", shippingCost["factoryId"], shippingCost["distance"], shippingCost["weight"]);
        });
        //Set master decorative
        var mstDecorativeModel = {};
        data["mstDecorative"].forEach(function (decorative) {
            data_util_1.default.pushData(mstDecorativeModel, decorative["lossPercent"], "lossPercent", decorative["throughNumber"]);
            data_util_1.default.pushData(mstDecorativeModel, decorative["stepWage"], "stepWage", decorative["throughNumber"]);
            data_util_1.default.pushData(mstDecorativeModel, decorative["throughWage"], "throughWage", decorative["throughNumber"]);
            data_util_1.default.pushData(mstDecorativeModel, decorative["fare"], "fare", decorative["throughNumber"], decorative["laminationType"]);
        });
        var mstLaminationModel = {};
        data["mstLamination"].forEach(function (lamination) {
            data_util_1.default.pushData(mstLaminationModel, lamination["laminationThroughWage"], "throughWage", lamination["laminationId"], lamination["laminationWeight"]);
        });
        var mstCartonFluteModel = {};
        data["mstCartonFlute"].forEach(function (cartonFlute) {
            data_util_1.default.pushData(mstCartonFluteModel, cartonFlute["cartonLong"], "long", cartonFlute["fluteType"]);
            data_util_1.default.pushData(mstCartonFluteModel, cartonFlute["cartonShort"], "short", cartonFlute["fluteType"]);
            data_util_1.default.pushData(mstCartonFluteModel, cartonFlute["shippingLoss"], "loss", cartonFlute["fluteType"], cartonFlute["shippingType"]);
            data_util_1.default.pushData(mstCartonFluteModel, cartonFlute["pasteWage"], "pasteWage", cartonFlute["fluteType"], cartonFlute["shippingType"]);
            data_util_1.default.pushData(mstCartonFluteModel, cartonFlute["shipFare"], "shipFare", cartonFlute["fluteType"], cartonFlute["shippingType"]);
        });
        var mstCartonShipping = {};
        data["mstCartonShipping"].forEach(function (cartonShipping) {
            data_util_1.default.pushData(mstCartonShipping, cartonShipping["cost"], cartonShipping["distance"], cartonShipping["fluteType"]);
        });
        // Binding data to mstData model
        this.pageData.mstData.mstPaper = mstPaperModel;
        this.pageData.mstData.mstPaperNormal = mstPaperModel;
        this.pageData.mstData.mstPaperHead = mstPaperHeadModel;
        this.pageData.mstData.mstSurfaceTreatment = mstSurfaceTreatmentModel;
        this.pageData.mstData.mstWindow = mstWindowMarginModel;
        this.pageData.mstData.mstColor = mstColorModel;
        this.pageData.mstData.mstPaste = mstPasteModel;
        this.pageData.mstData.mstStamping = mstStampingModel;
        this.pageData.mstData.mstPacking = mstPackingModel;
        this.pageData.mstData.mstDieCutting = mstDieCutting;
        this.pageData.mstData.mstShippingCost = mstShippingCostModel;
        this.pageData.mstData.mstDecorative = mstDecorativeModel;
        this.pageData.mstData.mstLamination = mstLaminationModel;
        this.pageData.mstData.mstCartonFlute = mstCartonFluteModel;
        this.pageData.mstData.mstCartonShipping = mstCartonShipping;
        this.pageData.mstData.mstShapes = data["shapes"];
    };
    Object.defineProperty(SF003020202Page.prototype, "productType", {
        get: function () {
            return this.pageData.product.productType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF003020202Page.prototype, "isRequestDesign", {
        get: function () {
            return this.pageData.isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    SF003020202Page.prototype.initDataMst = function () {
        var _this = this;
        if (this.pageData.product.id) {
            if (this.pageData.product.laminationPaperTypeFront == TYPE_FRONT) {
                var paperModel = this.pageData.mstLaminations.find(function (item) {
                    return item.id == _this.pageData.product.laminationFrontId
                        && item.factoryId == _this.pageData.product.factoryId;
                });
                if (!!paperModel) {
                    this.pageData.addPaperModel(paperModel, TYPE_FRONT);
                }
            }
            if (this.pageData.product.laminationPaperTypeMedium == TYPE_MEDIUM) {
                var paperModel = this.pageData.mstLaminations.find(function (item) {
                    return item.id == _this.pageData.product.laminationMediumId
                        && item.factoryId == _this.pageData.product.factoryId;
                });
                if (!!paperModel) {
                    this.pageData.addPaperModel(paperModel, TYPE_MEDIUM);
                }
            }
            if (this.pageData.product.laminationPaperTypeBack == TYPE_BACK) {
                var paperModel = this.pageData.mstLaminations.find(function (item) {
                    return item.id == _this.pageData.product.laminationBackId
                        && item.factoryId == _this.pageData.product.factoryId;
                });
                if (!!paperModel) {
                    this.pageData.addPaperModel(paperModel, TYPE_BACK);
                }
            }
        }
    };
    SF003020202Page.prototype.removeDataPaperTmp = function () {
        if (this.pageData.product.laminationPaperTypeFront != 100) {
            this.pageData.paperTmp1 = new paper_model_1.PaperModel();
        }
        if (this.pageData.product.laminationPaperTypeB != 101) {
            this.pageData.paperTmp2 = new paper_model_1.PaperModel();
        }
        if (this.pageData.product.laminationPaperTypeMedium != 102) {
            this.pageData.paperTmp3 = new paper_model_1.PaperModel();
        }
        if (this.pageData.product.laminationPaperTypeA != 103) {
            this.pageData.paperTmp4 = new paper_model_1.PaperModel();
        }
        if (this.pageData.product.laminationPaperTypeBack != 104) {
            this.pageData.paperTmp5 = new paper_model_1.PaperModel();
        }
    };
    SF003020202Page = __decorate([
        core_1.Component({
            selector: "SF003-020202",
            templateUrl: "./SF003020202.page.html",
            providers: [SF00302_data_1.SF00302Data, SF00302_service_1.SF00302Service]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, Header_provider_1.HeaderProvider, SF00302_service_1.SF00302Service])
    ], SF003020202Page);
    return SF003020202Page;
}(AbstractSF00302_page_1.AbstractSF00302Page));
exports.SF003020202Page = SF003020202Page;
//# sourceMappingURL=SF003020202.page.js.map