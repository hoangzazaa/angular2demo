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
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var constants_1 = require("../../../helper/constants");
var message_1 = require("../../../helper/message");
var screen_url_1 = require("../../../helper/screen-url");
var File_model_1 = require("../../../model/core/File.model");
var data_util_1 = require("../../../util/data-util");
var path_util_1 = require("../../../util/path-util");
var common_page_1 = require("../COMMON/common.page");
var Header_provider_1 = require("../SF00100/Header.provider");
var SF00301_DealFile_model_1 = require("./model/SF00301_DealFile.model");
var SF00301_Modal_modal_1 = require("./model/SF00301_Modal.modal");
var SF00301_Product_model_1 = require("./model/SF00301_Product.model");
var SF00301_ProductFile_model_1 = require("./model/SF00301_ProductFile.model");
var SF00301_Quotation_model_1 = require("./model/SF00301_Quotation.model");
var SF00301_data_1 = require("./SF00301.data");
var SF00301_service_1 = require("./SF00301.service");
var SF00301_PAGE_TITLE = "案件概況";
var SF00301Page = (function (_super) {
    __extends(SF00301Page, _super);
    function SF00301Page(router, route, sf00301Service, headerProvider, location) {
        var _this = this;
        _super.call(this, router, route, headerProvider);
        this.sf00301Service = sf00301Service;
        this.location = location;
        route.params.subscribe(function (val) {
            // ルート切り替え後の処理
            _this.sf00301Service.loadMore(10);
            App.loader('hide');
        });
    }
    Object.defineProperty(SF00301Page.prototype, "CATEGORY_ANY", {
        get: function () {
            return SF00301_data_1.SF00301Data.CATEGORY.ANY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301Page.prototype, "CATEGORY_PRODUCT", {
        get: function () {
            return SF00301_data_1.SF00301Data.CATEGORY.PRODUCT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301Page.prototype, "CATEGORY_QUOTATION", {
        get: function () {
            return SF00301_data_1.SF00301Data.CATEGORY.QUOTATION;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301Page.prototype, "CATEGORY_PRODUCT_FILE", {
        get: function () {
            return SF00301_data_1.SF00301Data.CATEGORY.PRODUCT_FILE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301Page.prototype, "CATEGORY_DEAL_FILE", {
        get: function () {
            return SF00301_data_1.SF00301Data.CATEGORY.DEAL_FILE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301Page.prototype, "CATEGORY_ANY_FILE", {
        get: function () {
            return SF00301_data_1.SF00301Data.CATEGORY.ANY_FILE;
        },
        enumerable: true,
        configurable: true
    });
    SF00301Page.prototype.pageTile = function () {
        return SF00301_PAGE_TITLE;
    };
    SF00301Page.prototype.ngOnInit = function () {
        this.sf00301Service.navigateTo("案件概況", this.router.url);
    };
    SF00301Page.prototype.ngAfterViewInit = function () {
        var self = this;
        self.$fileDialog = $('#dealFile-form');
        self.$dropzone = $("#sf00301Dropzone");
        $(window).on('hashchange', function () {
            if (window.location.hash != "#dealFile-form") {
                self.$fileDialog.modal('hide');
            }
        });
        if (this.pageData.screenMode == SF00301_service_1.SF00301Service.MODE_OPEN && this.deal.isImmutableDeal) {
            $("#value").css("resize", "none");
        }
        this.$dropzone
            .dropzone({
            url: "/CM0010101",
            uploadMultiple: false,
            parallelUploads: 1,
            dictDefaultMessage: "ファイルをドロップしてください",
            dictFileTooBig: "fileTooBig",
            maxFiles: 1,
            maxFilesize: 10,
            thumbnailWidth: constants_1.Constants.THUMBNAIL_WIDTH,
            thumbnailHeight: constants_1.Constants.THUMBNAIL_HEIGHT,
            init: function () {
                this.on("addedfile", function (file) {
                    if (this.getQueuedFiles().length > 0 || this.getUploadingFiles().length > 0) {
                        self.dropzone.removeAllFiles(true); // ... and cancel uploading files
                        self.dropzone.addFile(file);
                    }
                });
                this.on("uploadprogress", function () {
                    self.pageData.fileUploadInProgress = true;
                });
                this.on("success", function (file, response) {
                    var res = JSON.parse(response + '').res;
                    if (!!res && res.messageCode != "CC00101_ERR002" &&
                        !!res.data && !!res.data.fileName && self.$fileDialog.hasClass('in')) {
                        self.pageData.stagingFileItem.objectFileId = file.name;
                        self.pageData.stagingFileItem.originalName = file.name;
                        if (!!res.data.thumbnail) {
                            self.pageData.stagingFileItem.srcImg = res.data.thumbnail;
                            self.dropzone.emit('thumbnail', file, "/CM0010102/" + res.data.thumbnail);
                        }
                        // parse data to jsonFileName
                        self.pageData.file.fileCode = res.data.fileName;
                    }
                    else if (!!res && res.messageCode == "CC00101_ERR002") {
                        swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00301.ERR003), "error");
                    }
                    else if (!!res && res.messageCode == "CC00101_ERR003") {
                        swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.COM.ERR001), "error");
                    }
                });
                this.on("complete", function () {
                    self.pageData.fileUploadInProgress = false;
                });
                this.on("canceled", function () {
                    self.pageData.fileUploadInProgress = false;
                });
                this.on("maxfilesexceeded", function (file) {
                    // check file accept file then update file
                    if (self.accceptedFile(file.name)) {
                        self.dropzone.removeAllFiles(file); // ... and cancel uploading files
                        self.dropzone.addFile(file);
                    }
                });
                this.on("error", function (file, errorMessage) {
                    if (errorMessage === "fileTooBig") {
                        swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00301.INF016), "error");
                        self.dropzone.removeFile(file);
                        return;
                    }
                    if (!self.accceptedFile(file.name)) {
                        swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00301.INF015), "error");
                        self.dropzone.removeFile(file);
                        return;
                    }
                });
                self.dropzone = this;
            },
            accept: function (file, done) {
                if (!self.accceptedFile(file.name)) {
                    self.dropzone.removeFile(file);
                    swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00301.INF015), "error");
                }
                done();
            }
        });
    };
    SF00301Page.prototype.accceptedFile = function (fileName) {
        var ext = (fileName + "").split(".").pop().toUpperCase();
        return SF00301Page.ACCEPTED_EXTENSIONS.find(function (el) { return el == ext; }) != null;
    };
    Object.defineProperty(SF00301Page.prototype, "pageData", {
        get: function () {
            return this.sf00301Service.pageData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301Page.prototype, "deal", {
        get: function () {
            return this.pageData.deal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301Page.prototype, "canSelectCustomer", {
        get: function () {
            return !(this.pageData.screenMode === SF00301_service_1.SF00301Service.MODE_OPEN && this.deal.isImmutableDeal);
        },
        enumerable: true,
        configurable: true
    });
    SF00301Page.prototype.assignCustomer = function (deal) {
        var customer = deal.customer;
        if (deal.isSaved) {
            $.notify({
                message: message_1.default.get(message_1.MSG.SF00301.ERR002)
            }, {
                type: 'danger'
            });
            return;
        }
        $.notify({ message: 'Search customer unimplement' }, { type: 'info' });
    };
    SF00301Page.prototype.requestOrder = function (optionOrder) {
        if (!this.deal.isSaved) {
            $.notify({
                message: message_1.default.get(message_1.MSG.SF00301.ERR001)
            }, {
                type: 'danger'
            });
            return;
        }
        //http://fridaynight.vnext.vn/issues/3245
        var hasSavedCustomer = true;
        if (this.deal.customer == undefined || this.deal.customer.id == undefined || this.deal.customer.id < 0) {
            // for new customer
            hasSavedCustomer = false;
        }
        else {
            // for available customer select from list customer selected before saved into db
            if (!this.deal.hasRegisteredCustomer)
                hasSavedCustomer = false;
        }
        if (!hasSavedCustomer) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00301.WRN005) }, { type: 'danger' });
            return;
        }
        //end 3245
        if (optionOrder == "REQUEST_ORDER") {
            this.router.navigate(['/home/deal', this.deal.dealCode, 'order']).then(null);
        }
        else if (optionOrder == "REPEAT_ORDER") {
            this.router.navigate(['/home/deal', this.deal.dealCode, 'repeat-order']).then(null);
        }
    };
    SF00301Page.prototype.requestDesign = function () {
        var self = this;
        if (this.pageData.isUpdated) {
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message_1.MSG.SF00301.INF006),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
                closeOnConfirm: true
            }, function () {
                if (self.deal.isTemplate || self.deal.isConfirmedOrder) {
                    return;
                }
                //#2206
                var hasSavedCustomer = true;
                if (self.deal.customer == undefined || self.deal.customer.id == undefined || self.deal.customer.id < 0) {
                    // for new customer
                    hasSavedCustomer = false;
                }
                else {
                    // for available customer select from list customer selected before saved into db
                    if (!self.deal.hasRegisteredCustomer)
                        hasSavedCustomer = false;
                }
                if (!hasSavedCustomer) {
                    $.notify({ message: message_1.default.get(message_1.MSG.SF00301.WRN001) }, { type: 'danger' });
                    return;
                }
                var url = '/home/deal/' + self.deal.dealCode + '/request-design';
                return self.navigate(url);
            });
        }
        else {
            if (this.deal.isTemplate || this.deal.isConfirmedOrder) {
                return;
            }
            //#2206
            var hasSavedCustomer = true;
            if (this.deal.customer == undefined || this.deal.customer.id == undefined || this.deal.customer.id < 0) {
                // for new customer
                hasSavedCustomer = false;
            }
            else {
                // for available customer select from list customer selected before saved into db
                if (!this.deal.hasRegisteredCustomer)
                    hasSavedCustomer = false;
            }
            if (!hasSavedCustomer) {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00301.WRN001) }, { type: 'danger' });
                return;
            }
            var url = '/home/deal/' + this.deal.dealCode + '/request-design';
            return this.navigate(url);
        }
    };
    /**
     * Create/Updat/Dupplicate deal
     */
    SF00301Page.prototype.submitDeal = function () {
        var _this = this;
        var self = this;
        if (!this.deal.isSaved || this.pageData.screenMode == SF00301_service_1.SF00301Service.MODE_COPY) {
            this.sf00301Service
                .createDeal()
                .then(function (dealCode) { return self.router.navigate([("home/deal/" + dealCode)]).then(function () {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00301.INF018) }, { type: 'info' });
            }); })
                .catch(function () {
                swal({
                    title: constants_1.Constants.BLANK,
                    text: message_1.default.get(message_1.MSG.SF00301.ERR002),
                    type: "error",
                    showCancelButton: true,
                    confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
                    closeOnConfirm: true
                }, function () {
                    self.router.navigate([screen_url_1.ScreenUrl.SF00201]).then(null);
                });
            });
        }
        else if (this.pageData.screenMode = SF00301_service_1.SF00301Service.MODE_OPEN) {
            this.sf00301Service
                .updateDeal()
                .then(function () {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00301.INF002) }, { type: 'success' });
                _this.pageData.isUpdated = false;
                // http://fridaynight.vnext.vn/issues/2795
                _this.pageData.departmentIdTmp = data_util_1.default.cloneObject(_this.deal).saler.department.id;
                _this.pageData.customerTmp = data_util_1.default.cloneObject(_this.deal.customer);
            })
                .catch(function () {
                swal({
                    title: constants_1.Constants.BLANK,
                    text: message_1.default.get(message_1.MSG.SF00301.ERR002),
                    type: "error",
                    showCancelButton: true,
                    confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
                    closeOnConfirm: true
                }, function () {
                    self.router.navigate(["/home/deal"], screen_url_1.ScreenUrl.SF00201).then(null);
                });
            });
        }
    };
    /**
     * reset rule filter, tracker and show very first items
     */
    SF00301Page.prototype.onFilterChanged = function (category) {
        this.pageData.filter = category;
        this.pageData.concernsItems = [];
        this.sf00301Service.loadMore(10);
    };
    SF00301Page.prototype.addNewPaperWareLamination = function () {
        var self = this;
        if (this.pageData.isUpdated) {
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message_1.MSG.SF00301.INF006),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
                closeOnConfirm: true
            }, function () {
                self.router.navigate([("/home/deal/" + self.deal.dealCode + "/product/0")]).then(null);
            });
        }
        else {
            this.router.navigate([("/home/deal/" + this.deal.dealCode + "/product/0")]).then(null);
        }
    };
    SF00301Page.prototype.addNewPaperWareDecorativeSheet = function () {
        var self = this;
        if (this.pageData.isUpdated) {
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message_1.MSG.SF00301.INF006),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
                closeOnConfirm: true
            }, function () {
                self.router.navigate([("/home/deal/" + self.deal.dealCode + "/product/0/decorative")]).then(null);
            });
        }
        else {
            this.router.navigate([("/home/deal/" + this.deal.dealCode + "/product/0/decorative")]).then(null);
        }
    };
    SF00301Page.prototype.addNewCarton = function () {
        var self = this;
        if (this.pageData.isUpdated) {
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message_1.MSG.SF00301.INF006),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
                closeOnConfirm: true
            }, function () {
                self.router.navigate([("/home/deal/" + self.deal.dealCode + "/product/0/carton")]).then(null);
            });
        }
        else {
            this.router.navigate([("/home/deal/" + this.deal.dealCode + "/product/0/carton")]).then(null);
        }
    };
    SF00301Page.prototype.addCartonNotA = function () {
        var self = this;
        if (this.pageData.isUpdated) {
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message_1.MSG.SF00301.INF006),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
                closeOnConfirm: true
            }, function () {
                self.router.navigate([("/home/deal/" + self.deal.dealCode + "/product/0/carton-not-a")]).then(null);
            });
        }
        else {
            this.router.navigate([("/home/deal/" + this.deal.dealCode + "/product/0/carton-not-a")]).then(null);
        }
    };
    SF00301Page.prototype.addOneStage = function () {
        var self = this;
        if (this.pageData.isUpdated) {
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message_1.MSG.SF00301.INF006),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
                closeOnConfirm: true
            }, function () {
                self.router.navigate([("/home/deal/" + self.deal.dealCode + "/product/0/one-stage")]).then(null);
            });
        }
        else {
            this.router.navigate([("/home/deal/" + this.deal.dealCode + "/product/0/one-stage")]).then(null);
        }
    };
    SF00301Page.prototype.searchProduct = function () {
        var self = this;
        if (this.pageData.isUpdated) {
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message_1.MSG.SF00301.INF006),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
                closeOnConfirm: true
            }, function () {
                self.router.navigate([("/home/deal/" + self.deal.dealCode + "/search-product")]).then(null);
            });
        }
        else {
            this.router.navigate([("/home/deal/" + this.deal.dealCode + "/search-product")]).then(null);
        }
    };
    /**
     * if current deal is saved, we can navigate to sf00303 in creation mode, to create a new quotation for current deal
     */
    SF00301Page.prototype.addNewQuotation = function () {
        var self = this;
        if (this.pageData.isUpdated) {
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message_1.MSG.SF00301.INF006),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
                closeOnConfirm: true
            }, function () {
                self.router.navigate([("/home/deal/" + self.deal.dealCode + "/quotation")]).then(null);
            });
        }
        else {
            this.router.navigate([("/home/deal/" + this.deal.dealCode + "/quotation")]).then(null);
        }
    };
    SF00301Page.prototype.saveItemModal = function (itemModal) {
        // save item in modal file by itemModal
        if (itemModal.category == this.CATEGORY_PRODUCT_FILE) {
            //1. product file
            var productFile = new SF00301_ProductFile_model_1.SF00301_ProductFile();
            //1.1 update data then itemModal
            productFile.id = itemModal.id;
            productFile.primaryFlag = itemModal.primaryFlag;
            productFile.createdDate = itemModal.createdDate;
            productFile.srcImg = itemModal.srcImg;
            productFile.originalName = itemModal.originalName;
            productFile.productName = itemModal.nameTmp;
            productFile.productFileId = itemModal.objectFileId;
            productFile.productFileName = itemModal.objectFileName;
            productFile.memo = itemModal.memo;
            productFile.productId = itemModal.parentId;
            productFile.fileId = itemModal.fileId;
            //1.2 update data product file
            this.updateProductFile(productFile);
        }
        else if (itemModal.category == this.CATEGORY_DEAL_FILE) {
            //2. deal file
            var dealFile = new SF00301_DealFile_model_1.SF00301_DealFile();
            //2.1 update data then itemModal
            dealFile.id = itemModal.id;
            dealFile.createdDate = new Date(itemModal.createdDate);
            dealFile.srcImg = itemModal.srcImg;
            dealFile.originalName = itemModal.originalName;
            dealFile.dealFileId = itemModal.objectFileId;
            dealFile.dealFileName = itemModal.objectFileName;
            dealFile.memo = itemModal.memo;
            dealFile.dealId = itemModal.parentId;
            dealFile.fileId = itemModal.fileId;
            //2.2 update data deal file
            if (!!dealFile.id) {
                this.updateDealFile(dealFile);
            }
            else {
                this.createDealFile(dealFile);
            }
        }
    };
    SF00301Page.prototype.saveDealFile = function (dealFile) {
        if (!!dealFile.id) {
            this.updateDealFile(dealFile);
        }
        else {
            this.createDealFile(dealFile);
        }
    };
    SF00301Page.prototype.updateProductFile = function (productFile) {
        var self = this;
        App.loader('show');
        self.sf00301Service
            .updateProductFile(productFile, self.pageData.file.fileCode)
            .then(function () {
            self.resetStagingFileAndCloseFileModal();
            App.loader('hide');
            $.notify({ message: message_1.default.get(message_1.MSG.SF00301.INF007) }, { type: 'success' });
        });
    };
    SF00301Page.prototype.updateDealFile = function (dealFile) {
        var self = this;
        App.loader('show');
        self.sf00301Service
            .updateDealFile(dealFile, self.pageData.file.fileCode)
            .then(function () {
            self.resetStagingFileAndCloseFileModal();
            App.loader('hide');
            $.notify({ message: message_1.default.get(message_1.MSG.SF00301.INF007) }, { type: 'success' });
        });
    };
    SF00301Page.prototype.createDealFile = function (dealFile) {
        var self = this;
        if (!this.pageData.file.fileCode) {
            swal("Upload File", message_1.default.get(message_1.MSG.SF00301.ERR009), "error");
            return;
        }
        App.loader('show');
        self.sf00301Service
            .createDealFile(dealFile, self.pageData.file.fileCode)
            .then(function () {
            self.resetStagingFileAndCloseFileModal();
            App.loader('hide');
            $.notify({ message: message_1.default.get(message_1.MSG.SF00301.INF007) }, { type: 'success' });
        });
    };
    SF00301Page.prototype.removeStagingFile = function () {
        var AND_CANCEL_UPLOADING = true;
        this.dropzone.removeAllFiles(AND_CANCEL_UPLOADING);
        this.pageData.stagingFileItem = new SF00301_Modal_modal_1.SF00301_FileItem();
        this.pageData.file = new File_model_1.File();
        this.pageData.fileUploadInProgress = false;
    };
    SF00301Page.prototype.closeFileModalIfShown = function () {
        if (this.$fileDialog.hasClass('in'))
            this.$fileDialog.modal('toggle');
    };
    SF00301Page.prototype.resetStagingFileAndCloseFileModal = function () {
        this.removeStagingFile();
        this.closeFileModalIfShown();
    };
    /*View detail product file*/
    SF00301Page.prototype.viewDealFileInfo = function (dealFile) {
        this.pageData.stagingFileItem = new SF00301_Modal_modal_1.SF00301_FileItem();
        this.pageData.stagingFileItem.id = dealFile.id;
        this.pageData.stagingFileItem.category = dealFile.category;
        this.pageData.stagingFileItem.createdDate = dealFile.createdDate;
        this.pageData.stagingFileItem.objectFileId = dealFile.dealFileId;
        this.pageData.stagingFileItem.fileId = dealFile.fileId;
        this.pageData.stagingFileItem.memo = dealFile.memo;
        this.pageData.stagingFileItem.objectFileName = dealFile.dealFileName;
        this.pageData.stagingFileItem.originalName = dealFile.originalName;
        this.pageData.stagingFileItem.parentId = dealFile.dealId;
        this.pageData.stagingFileItem.srcImg = dealFile.srcImg;
        this.pageData.stagingFileItem.fileType = "DEAL_FILE";
        this.viewDealFile(this.pageData.stagingFileItem);
    };
    SF00301Page.prototype.viewDealFile = function (item) {
        this.dropzone.setupEventListeners();
        this.$dropzone.css('cursor', 'pointer');
        // Create the mock file
        var mockFile = {
            name: item.objectFileId,
            size: 1024,
            accepted: true,
            kind: 'image'
        };
        // Call the default addedfile event handler
        this.dropzone.emit("addedfile", mockFile);
        this.dropzone.files.push(mockFile);
        var self = this;
        // And optionally show the thumbnail of the file
        this.dropzone.createThumbnailFromUrl(mockFile, item.srcImg, function () {
            // Make sure that there is no progress bar, etc...
            self.dropzone.emit("complete", mockFile);
        });
        if (this.deal.isImmutableDeal) {
            this.dropzone.removeEventListeners();
            this.$dropzone.css('cursor', 'not-allowed');
        }
        this.$fileDialog.modal('show');
        this.$dropzone.show();
    };
    /**
     * redirect to product screen to show given product's infomation
     * @param product
     */
    SF00301Page.prototype.viewProductInfo = function (product) {
        var self = this;
        if (this.pageData.isUpdated) {
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message_1.MSG.SF00301.INF006),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
                closeOnConfirm: true
            }, function () {
                if (!product || !product.productCode)
                    return;
                path_util_1.PathUtil.redirectToPageProduct(self.router, self.deal.dealCode, product.productCode, product.productType, product.shapeId, product.cartonShippingType);
            });
        }
        else {
            if (!product || !product.productCode)
                return;
            path_util_1.PathUtil.redirectToPageProduct(self.router, self.deal.dealCode, product.productCode, product.productType, product.shapeId, product.cartonShippingType);
        }
    };
    SF00301Page.prototype.viewCheckSheet = function () {
        var self = this;
        if (this.pageData.isUpdated) {
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message_1.MSG.SF00301.INF006),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
                closeOnConfirm: true
            }, function () {
                self.router
                    .navigate([("/home/deal/" + self.deal.dealCode + "/dealCheckSheet")]).then(null);
            });
        }
        else {
            this.router
                .navigate([("/home/deal/" + this.deal.dealCode + "/dealCheckSheet")]).then(null);
        }
    };
    SF00301Page.prototype.viewQuotationInfo = function (quotation) {
        var self = this;
        if (this.pageData.isUpdated) {
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message_1.MSG.SF00301.INF006),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
                closeOnConfirm: true
            }, function () {
                self.router.navigate([("/home/deal/" + self.deal.dealCode + "/quotation/" + quotation.quotationCode)]).then(null);
            });
        }
        else {
            this.router.navigate([("/home/deal/" + this.deal.dealCode + "/quotation/" + quotation.quotationCode)]).then(null);
        }
    };
    SF00301Page.prototype.requestMail = function (requestType) {
        var self = this;
        if (this.pageData.isUpdated) {
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message_1.MSG.SF00301.INF006),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
                closeOnConfirm: true
            }, function () {
                self.router.navigate([("/home/deal/" + self.deal.dealCode + "/request/" + requestType)]).then(null);
            });
        }
        else {
            this.router.navigate([("/home/deal/" + this.deal.dealCode + "/request/" + requestType)]).then(null);
        }
    };
    SF00301Page.prototype.viewProductFileInfo = function (productFile) {
        this.pageData.stagingFileItem = new SF00301_Modal_modal_1.SF00301_FileItem();
        this.pageData.stagingFileItem.id = productFile.id;
        this.pageData.stagingFileItem.category = productFile.category;
        this.pageData.stagingFileItem.primaryFlag = productFile.primaryFlag;
        this.pageData.stagingFileItem.createdDate = productFile.createdDate;
        this.pageData.stagingFileItem.objectFileId = productFile.productFileId;
        this.pageData.stagingFileItem.nameTmp = productFile.productName;
        this.pageData.stagingFileItem.fileId = productFile.fileId;
        this.pageData.stagingFileItem.memo = productFile.memo;
        this.pageData.stagingFileItem.originalName = productFile.originalName;
        this.pageData.stagingFileItem.objectFileName = productFile.productFileName;
        this.pageData.stagingFileItem.parentId = productFile.productId;
        this.pageData.stagingFileItem.srcImg = productFile.srcImg;
        this.pageData.stagingFileItem.fileType = "PRODUCT_FILE";
        this.dropzone.setupEventListeners();
        this.$dropzone.css('cursor', 'pointer');
        // Create the mock file
        var mockFile = {
            name: this.pageData.stagingFileItem.objectFileId,
            size: 1024,
            accepted: true,
            kind: 'image'
        };
        // Call the default addedfile event handler
        this.dropzone.emit("addedfile", mockFile);
        this.dropzone.files.push(mockFile);
        var self = this;
        // And optionally show the thumbnail of the file
        this.dropzone.createThumbnailFromUrl(mockFile, this.pageData.stagingFileItem.srcImg, function () {
            // Make sure that there is no progress bar, etc...
            self.dropzone.emit("complete", mockFile);
        });
        if (this.deal.isImmutableDeal) {
            this.dropzone.removeEventListeners();
            this.$dropzone.css('cursor', 'not-allowed');
        }
        this.$fileDialog.modal('show');
        this.$dropzone.show();
    };
    // remove dealProduct
    SF00301Page.prototype.detachProduct = function (product) {
        var self = this;
        swal({
            title: constants_1.Constants.BLANK,
            text: message_1.default.get(message_1.MSG.SF00301.INF003),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: SF00301Page.DANGER_RED,
            confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
            closeOnConfirm: true
        }, function () {
            //#2223
            return self.sf00301Service.detachProduct(product).then(function () {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00301.INF012) }, { type: 'success' });
            }).catch(function () {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00301.ERR008) }, { type: 'danger' });
            });
        });
    };
    SF00301Page.prototype.removeQuotation = function (quotation) {
        var self = this;
        swal({
            title: constants_1.Constants.BLANK,
            text: message_1.default.get(message_1.MSG.SF00301.INF004),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: SF00301Page.DANGER_RED,
            confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
            closeOnConfirm: true
        }, function () {
            self.sf00301Service
                .removeQuotation(quotation).then(function () {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00301.INF011) }, { type: 'success' });
            }).catch(function () {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00301.ERR010) }, { type: 'danger' });
            });
        });
    };
    SF00301Page.prototype.removeObjectFileByItemType = function (fileItem) {
        if (fileItem.category == this.CATEGORY_PRODUCT_FILE) {
            var productFile = new SF00301_ProductFile_model_1.SF00301_ProductFile();
            productFile.id = fileItem.id;
            productFile.productId = fileItem.parentId;
            this.removeProductFile(productFile);
        }
        else if (fileItem.category == this.CATEGORY_DEAL_FILE) {
            var dealFile = new SF00301_DealFile_model_1.SF00301_DealFile();
            dealFile.id = fileItem.id;
            this.removeDealFile(dealFile);
        }
    };
    SF00301Page.prototype.removeDealFile = function (dealFile) {
        var self = this;
        swal({
            title: constants_1.Constants.BLANK,
            text: message_1.default.get(message_1.MSG.SF00301.INF010),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: SF00301Page.DANGER_RED,
            confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
            closeOnConfirm: true
        }, function () {
            self.sf00301Service
                .removeDealFile(dealFile)
                .then(function () {
                self.resetStagingFileAndCloseFileModal();
                $.notify({ message: message_1.default.get(message_1.MSG.SF00301.INF014) }, { type: 'success' });
            }).catch(function () {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00301.ERR012) }, { type: 'danger' });
            });
        });
    };
    // remove productFile
    SF00301Page.prototype.removeProductFile = function (productFile) {
        var self = this;
        swal({
            title: constants_1.Constants.BLANK,
            text: message_1.default.get(message_1.MSG.SF00301.INF010),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: SF00301Page.DANGER_RED,
            confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
            closeOnConfirm: true
        }, function () {
            self.sf00301Service
                .removeProductFile(productFile).then(function () {
                self.resetStagingFileAndCloseFileModal();
                $.notify({ message: message_1.default.get(message_1.MSG.SF00301.INF013) }, { type: 'success' });
            }).catch(function () {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00301.ERR011) }, { type: 'danger' });
            });
        });
    };
    /**
     * Upload deal file
     * */
    SF00301Page.prototype.uploadDealFile = function () {
        // check product
        if (!this.deal.isSaved) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00301.ERR002) }, { type: 'danger' });
            return;
        }
        this.pageData.stagingFileItem.category = this.CATEGORY_DEAL_FILE;
        this.dropzone.setupEventListeners();
        this.$dropzone.css('cursor', 'pointer');
        this.$fileDialog.modal('show');
        this.$dropzone.show();
        $('#checkboxAvt').prop('checked', false);
        $('div.dz-success').remove();
        $(".dz-remove").eq(0).addClass("hidden");
        $(".dz-size").eq(0).addClass("hidden");
    };
    SF00301Page.prototype.showMoreItem = function () {
        this.sf00301Service.loadMore();
    };
    SF00301Page.prototype.updateHighLightFlag = function (item) {
        var _this = this;
        var itemType = '';
        var itemId = null;
        // check itemType
        if (item instanceof SF00301_Product_model_1.SF00301_Product) {
            itemType = constants_1.Constants.ITEM_PRODUCT;
            itemId = item.dealProductId;
        }
        else if (item instanceof SF00301_Quotation_model_1.SF00301_Quotation) {
            itemType = constants_1.Constants.ITEM_QUOTATION;
            itemId = item.id;
        }
        // check status item
        if (item.highlightFlag == constants_1.Constants.ONE) {
            item.highlightFlag = constants_1.Constants.ZERO;
        }
        else {
            item.highlightFlag = constants_1.Constants.ONE;
        }
        if (itemId) {
            //#2223
            // update highlightFlag call api
            this.sf00301Service.updateHighlightFlag(itemId, item.highlightFlag, itemType, this.deal.id).then(function (data) {
                item.highlightFlag = data['status'];
                _this.deal.dealStatus = data['dealStatus'];
            });
        }
    };
    /**
     * Delete Deal
     */
    SF00301Page.prototype.deleteDeal = function () {
        var _this = this;
        var self = this;
        swal({
            title: constants_1.Constants.BLANK,
            text: message_1.default.get(message_1.MSG.SF00301.INF019),
            type: "warning",
            showCancelButton: true,
            confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
            closeOnConfirm: true
        }, function () {
            App.loader("show");
            _this.sf00301Service
                .deleteDeal()
                .then(function () {
                self.router
                    .navigate(["/home/deal", 'select-from-deal'])
                    .then(function () { return $.notify(message_1.default.get(message_1.MSG.SF00301.INF020)); });
            })
                .catch(function () {
                App.loader("hide");
                swal({
                    title: constants_1.Constants.BLANK,
                    text: message_1.default.get(message_1.MSG.SF00301.ERR016),
                    type: "error",
                    showCancelButton: false,
                    confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
                    closeOnConfirm: true
                });
            });
        });
    };
    /**
     * Update req SF00301-08/06/2017
     */
    SF00301Page.prototype.closedDeal = function () {
        var self = this;
        swal({
            title: constants_1.Constants.BLANK,
            text: message_1.default.get(message_1.MSG.SF00301.INF022),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5bc0de",
            confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
            closeOnConfirm: true
        }, function () {
            self.sf00301Service
                .closedDeal()
                .then(function () {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00301.INF021) }, { type: 'success' });
            });
        });
    };
    /**
     * navigate to Dashboard
     */
    SF00301Page.prototype.backToDashboard = function () {
        var self = this;
        if (this.pageData.isUpdated) {
            swal({
                title: constants_1.Constants.BLANK,
                text: message_1.default.get(message_1.MSG.SF00301.INF006),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: message_1.default.get(message_1.MSG.SF00301.INF005),
                closeOnConfirm: true
            }, function () {
                self.router.navigate(["/home/deal", 'select-from-template']).then(null);
            });
        }
        else {
            this.router.navigate(["/home/deal", 'select-from-template']).then(null);
        }
    };
    SF00301Page.prototype.notifyDone = function () {
        var notify = $.notify({
            message: message_1.default.get(message_1.MSG.SF00301.INF016)
        }, {
            allow_dismiss: false,
            showProgressbar: false,
            delay: 0
        });
        notify.update("progress", 100);
        notify.update("type", "info");
        setTimeout(function (ntf) {
            ntf.close();
        }, 1000, notify);
    };
    SF00301Page.prototype.download = function (itemModal) {
        this.sf00301Service.downloadFile(itemModal)
            .then(function (result) {
            var link = document.createElement('a');
            link.setAttribute('download', result.fileName);
            link.href = result.filePath;
            link.click();
        }).catch(function (err) { console.log(err); });
    };
    Object.defineProperty(SF00301Page.prototype, "isDisabled", {
        // http://fridaynight.vnext.vn/issues/3115
        get: function () {
            return (this.pageData.totalComments <= 10 || this.pageData.totalComments == (this.pageData.comments || []).length);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301Page.prototype, "isDisabledShowMoreDealItem", {
        get: function () {
            return !this.sf00301Service.canShowMoreDealItem(this.pageData.concernsItems.length);
        },
        enumerable: true,
        configurable: true
    });
    SF00301Page.DANGER_RED = "#d26a5c";
    SF00301Page.ACCEPTED_EXTENSIONS = ["JPG", "JPEG", "PNG", "PDF"];
    SF00301Page = __decorate([
        core_1.Component({
            templateUrl: "SF00301.page.html",
            styleUrls: ['SF00301.page.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, SF00301_service_1.SF00301Service, Header_provider_1.HeaderProvider, common_1.Location])
    ], SF00301Page);
    return SF00301Page;
}(common_page_1.CommonPage));
exports.SF00301Page = SF00301Page;
//# sourceMappingURL=SF00301.page.js.map