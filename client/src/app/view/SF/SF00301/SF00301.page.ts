import {Location} from "@angular/common";
import {AfterViewInit, Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Constants} from "../../../helper/constants";
import Messages, {MSG} from "../../../helper/message";
import {ScreenUrl} from "../../../helper/screen-url";
import {File} from "../../../model/core/File.model";
import DataUtil from "../../../util/data-util";
import {PathUtil} from "../../../util/path-util";
import {CommonPage} from "../COMMON/common.page";
import {HeaderProvider} from "../SF00100/Header.provider";
import {SF00301_Deal} from "./model/SF00301_Deal.model";
import {SF00301_DealFile} from "./model/SF00301_DealFile.model";
import {SF00301_FileItem} from "./model/SF00301_Modal.modal";
import {SF00301_Product} from "./model/SF00301_Product.model";
import {SF00301_ProductFile} from "./model/SF00301_ProductFile.model";
import {SF00301_Quotation} from "./model/SF00301_Quotation.model";
import {SF00301Data} from "./SF00301.data";
import {SF00301Service} from "./SF00301.service";

const SF00301_PAGE_TITLE: string = "案件概況";
declare let $: JQueryStatic;
declare let App: any;

@Component({
    templateUrl: "SF00301.page.html",
    styleUrls: ['SF00301.page.css']
})
export class SF00301Page extends CommonPage implements AfterViewInit, OnInit {

    public get CATEGORY_ANY(): symbol {
        return SF00301Data.CATEGORY.ANY
    }

    public get CATEGORY_PRODUCT(): symbol {
        return SF00301Data.CATEGORY.PRODUCT
    }

    public get CATEGORY_QUOTATION(): symbol {
        return SF00301Data.CATEGORY.QUOTATION
    }

    public get CATEGORY_PRODUCT_FILE(): symbol {
        return SF00301Data.CATEGORY.PRODUCT_FILE
    }

    public get CATEGORY_DEAL_FILE(): symbol {
        return SF00301Data.CATEGORY.DEAL_FILE
    }


    public get CATEGORY_ANY_FILE(): symbol {
        return SF00301Data.CATEGORY.ANY_FILE
    }

    private static DANGER_RED = "#d26a5c";

    private static ACCEPTED_EXTENSIONS = ["JPG", "JPEG", "PNG", "PDF"];
    private dropzone: any;
    private $fileDialog: any;
    private $dropzone: any;

    constructor(router: Router, route: ActivatedRoute,
                private sf00301Service: SF00301Service,
                headerProvider: HeaderProvider,
                private location: Location) {
        super(router, route, headerProvider);

        route.params.subscribe(val => {
            // ルート切り替え後の処理
            this.sf00301Service.loadMore(10);
            App.loader('hide');
          });
    }

    protected pageTile(): string {
        return SF00301_PAGE_TITLE;
    }

    ngOnInit(): void {
        this.sf00301Service.navigateTo("案件概況", this.router.url);
    }

    ngAfterViewInit(): void {

        let self = this;

        self.$fileDialog = $('#dealFile-form');
        self.$dropzone = $("#sf00301Dropzone");

        $(window).on('hashchange', function () {
            if (window.location.hash != "#dealFile-form") {
                self.$fileDialog.modal('hide');
            }
        });
        if (this.pageData.screenMode == SF00301Service.MODE_OPEN && this.deal.isImmutableDeal) {
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
                maxFilesize: 10, // up to 10MB
                thumbnailWidth: Constants.THUMBNAIL_WIDTH,
                thumbnailHeight: Constants.THUMBNAIL_HEIGHT,
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
                        let res = JSON.parse(response + '').res;
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
                        } else if(!!res && res.messageCode == "CC00101_ERR002") {
                            swal(Constants.BLANK, Messages.get(MSG.SF00301.ERR003), "error");
                        } else if (!!res && res.messageCode == "CC00101_ERR003") {
                            swal(Constants.BLANK, Messages.get(MSG.COM.ERR001), "error");
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
                            swal(Constants.BLANK, Messages.get(MSG.SF00301.INF016), "error");
                            self.dropzone.removeFile(file);
                            return;
                        }
                        if (!self.accceptedFile(file.name)) {
                            swal(Constants.BLANK, Messages.get(MSG.SF00301.INF015), "error");
                            self.dropzone.removeFile(file);
                            return;
                        }
                    });

                    self.dropzone = this;
                },
                accept: function (file, done) {
                    if (!self.accceptedFile(file.name)) {
                        self.dropzone.removeFile(file);
                        swal(Constants.BLANK, Messages.get(MSG.SF00301.INF015), "error");
                    }
                    done();
                }
            });
    }

    private accceptedFile(fileName: string): boolean {
        let ext = (fileName + "").split(".").pop().toUpperCase();
        return SF00301Page.ACCEPTED_EXTENSIONS.find(el => el == ext) != null;
    }

    get pageData(): SF00301Data {
        return this.sf00301Service.pageData;
    }

    get deal(): SF00301_Deal {
        return this.pageData.deal;
    }

    get canSelectCustomer(): boolean {
        return !(this.pageData.screenMode === SF00301Service.MODE_OPEN && this.deal.isImmutableDeal);
    }

    assignCustomer(deal: SF00301_Deal): void {
        let customer = deal.customer;
        if (deal.isSaved) {
            $.notify({
                message: Messages.get(MSG.SF00301.ERR002)
            }, {
                type: 'danger'
            });
            return;
        }
        $.notify({message: 'Search customer unimplement'}, {type: 'info'});
    }

    requestOrder(optionOrder: string): void {
        if (!this.deal.isSaved) {
            $.notify({
                message: Messages.get(MSG.SF00301.ERR001)
            }, {
                type: 'danger'
            });
            return;
        }
        //http://fridaynight.vnext.vn/issues/3245
        let hasSavedCustomer: boolean = true;
        if (this.deal.customer == undefined || this.deal.customer.id == undefined || this.deal.customer.id < 0) {
            // for new customer
            hasSavedCustomer = false;
        } else {
            // for available customer select from list customer selected before saved into db
            if (!this.deal.hasRegisteredCustomer)
                hasSavedCustomer = false;
        }
        if (!hasSavedCustomer) {
            $.notify({message: Messages.get(MSG.SF00301.WRN005)}, {type: 'danger'});
            return;
        }
        //end 3245
        if(optionOrder == "REQUEST_ORDER"){
            this.router.navigate(['/home/deal', this.deal.dealCode, 'order']).then(null);
        }else if(optionOrder == "REPEAT_ORDER"){
            this.router.navigate(['/home/deal', this.deal.dealCode, 'repeat-order']).then(null);
        }
    }

    requestDesign(): void {
        let self = this;
        if (this.pageData.isUpdated) {
            swal({
                    title: Constants.BLANK,
                    text: Messages.get(MSG.SF00301.INF006),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText: Messages.get(MSG.SF00301.INF005),
                    closeOnConfirm: true
                },
                function () {
                    if (self.deal.isTemplate || self.deal.isConfirmedOrder) {
                        return;
                    }

                    //#2206
                    let hasSavedCustomer: boolean = true;
                    if (self.deal.customer == undefined || self.deal.customer.id == undefined || self.deal.customer.id < 0) {
                        // for new customer
                        hasSavedCustomer = false;
                    } else {
                        // for available customer select from list customer selected before saved into db
                        if (!self.deal.hasRegisteredCustomer)
                            hasSavedCustomer = false;
                    }
                    if (!hasSavedCustomer) {
                        $.notify({message: Messages.get(MSG.SF00301.WRN001)}, {type: 'danger'});
                        return;
                    }

                    let url = '/home/deal/' + self.deal.dealCode + '/request-design';
                    return self.navigate(url);
                });
        } else {
            if (this.deal.isTemplate || this.deal.isConfirmedOrder) {
                return;
            }

            //#2206
            let hasSavedCustomer: boolean = true;
            if (this.deal.customer == undefined || this.deal.customer.id == undefined || this.deal.customer.id < 0) {
                // for new customer
                hasSavedCustomer = false;
            } else {
                // for available customer select from list customer selected before saved into db
                if (!this.deal.hasRegisteredCustomer)
                    hasSavedCustomer = false;
            }
            if (!hasSavedCustomer) {
                $.notify({message: Messages.get(MSG.SF00301.WRN001)}, {type: 'danger'});
                return;
            }

            let url = '/home/deal/' + this.deal.dealCode + '/request-design';
            return this.navigate(url);
        }
    }

    /**
     * Create/Updat/Dupplicate deal
     */
    submitDeal(): void {
        let self = this;

        if (!this.deal.isSaved || this.pageData.screenMode == SF00301Service.MODE_COPY) {
            this.sf00301Service
                .createDeal()
                .then(dealCode => self.router.navigate([`home/deal/${dealCode}`]).then(() => {
                    $.notify({message: Messages.get(MSG.SF00301.INF018)}, {type: 'info'});
                }))
                .catch(() => {
                    swal({
                            title: Constants.BLANK,
                            text: Messages.get(MSG.SF00301.ERR002),
                            type: "error",
                            showCancelButton: true,
                            confirmButtonText: Messages.get(MSG.SF00301.INF005),
                            closeOnConfirm: true
                        },
                        () => {
                            self.router.navigate([ScreenUrl.SF00201],).then(null);
                        });
                });
        }
        else if (this.pageData.screenMode = SF00301Service.MODE_OPEN) {
            this.sf00301Service
                .updateDeal()
                .then(() => {
                    $.notify({message: Messages.get(MSG.SF00301.INF002)}, {type: 'success'});
                    this.pageData.isUpdated = false;
                    // http://fridaynight.vnext.vn/issues/2795
                    this.pageData.departmentIdTmp = DataUtil.cloneObject(this.deal).saler.department.id;
                    this.pageData.customerTmp = DataUtil.cloneObject(this.deal.customer);
                })
                .catch(() => {
                    swal({
                            title: Constants.BLANK,
                            text: Messages.get(MSG.SF00301.ERR002),
                            type: "error",
                            showCancelButton: true,
                            confirmButtonText: Messages.get(MSG.SF00301.INF005),
                            closeOnConfirm: true
                        },
                        () => {
                            self.router.navigate(["/home/deal"], ScreenUrl.SF00201).then(null);
                        });
                });
        }
    }

    /**
     * reset rule filter, tracker and show very first items
     */
    onFilterChanged(category: symbol) {
        this.pageData.filter = category;
        this.pageData.concernsItems = [];
        this.sf00301Service.loadMore(10);
    }

    addNewPaperWareLamination(): void {
        let self = this;
        if (this.pageData.isUpdated) {
            swal({
                    title: Constants.BLANK,
                    text: Messages.get(MSG.SF00301.INF006),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText: Messages.get(MSG.SF00301.INF005),
                    closeOnConfirm: true
                },
                function () {
                    self.router.navigate([`/home/deal/${self.deal.dealCode}/product/0`]).then(null);
                });
        } else {
            this.router.navigate([`/home/deal/${this.deal.dealCode}/product/0`]).then(null);
        }
    }

    addNewPaperWareDecorativeSheet(): void {
        let self = this;
        if (this.pageData.isUpdated) {
            swal({
                    title: Constants.BLANK,
                    text: Messages.get(MSG.SF00301.INF006),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText: Messages.get(MSG.SF00301.INF005),
                    closeOnConfirm: true
                },
                function () {
                    self.router.navigate([`/home/deal/${self.deal.dealCode}/product/0/decorative`]).then(null);
                });
        } else {
            this.router.navigate([`/home/deal/${this.deal.dealCode}/product/0/decorative`]).then(null);
        }
    }

    addNewCarton(): void {
        let self = this;
        if (this.pageData.isUpdated) {
            swal({
                    title: Constants.BLANK,
                    text: Messages.get(MSG.SF00301.INF006),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText: Messages.get(MSG.SF00301.INF005),
                    closeOnConfirm: true
                },
                function () {
                    self.router.navigate([`/home/deal/${self.deal.dealCode}/product/0/carton`]).then(null);
                });
        } else {
            this.router.navigate([`/home/deal/${this.deal.dealCode}/product/0/carton`]).then(null);
        }
    }

    addCartonNotA(): void {
        let self = this;
        if (this.pageData.isUpdated) {
            swal({
                    title: Constants.BLANK,
                    text: Messages.get(MSG.SF00301.INF006),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText: Messages.get(MSG.SF00301.INF005),
                    closeOnConfirm: true
                },
                function () {
                    self.router.navigate([`/home/deal/${self.deal.dealCode}/product/0/carton-not-a`]).then(null);
                });
        } else {
            this.router.navigate([`/home/deal/${this.deal.dealCode}/product/0/carton-not-a`]).then(null);
        }
    }

    addOneStage():void{
        let self = this;
        if (this.pageData.isUpdated) {
            swal({
                    title: Constants.BLANK,
                    text: Messages.get(MSG.SF00301.INF006),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText: Messages.get(MSG.SF00301.INF005),
                    closeOnConfirm: true
                },
                function () {
                    self.router.navigate([`/home/deal/${self.deal.dealCode}/product/0/one-stage`]).then(null);
                });
        } else {
            this.router.navigate([`/home/deal/${this.deal.dealCode}/product/0/one-stage`]).then(null);
        }
    }

    searchProduct(): void {
        let self = this;
        if (this.pageData.isUpdated) {
            swal({
                    title: Constants.BLANK,
                    text: Messages.get(MSG.SF00301.INF006),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText: Messages.get(MSG.SF00301.INF005),
                    closeOnConfirm: true
                },
                function () {
                    self.router.navigate([`/home/deal/${self.deal.dealCode}/search-product`]).then(null);
                });
        } else {
            this.router.navigate([`/home/deal/${this.deal.dealCode}/search-product`]).then(null);
        }
    }

    /**
     * if current deal is saved, we can navigate to sf00303 in creation mode, to create a new quotation for current deal
     */
    addNewQuotation() {
        let self = this;
        if (this.pageData.isUpdated) {
            swal({
                    title: Constants.BLANK,
                    text: Messages.get(MSG.SF00301.INF006),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText: Messages.get(MSG.SF00301.INF005),
                    closeOnConfirm: true
                },
                function () {
                    self.router.navigate([`/home/deal/${self.deal.dealCode}/quotation`]).then(null);
                });
        } else {
            this.router.navigate([`/home/deal/${this.deal.dealCode}/quotation`]).then(null);
        }
    }

    saveItemModal(itemModal: SF00301_FileItem) {
        // save item in modal file by itemModal
        if (itemModal.category == this.CATEGORY_PRODUCT_FILE) {
            //1. product file

            let productFile = new SF00301_ProductFile();
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
        } else if (itemModal.category == this.CATEGORY_DEAL_FILE) {
            //2. deal file
            let dealFile = new SF00301_DealFile();
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
            } else {
                this.createDealFile(dealFile);
            }
        }
    }

    saveDealFile(dealFile: SF00301_DealFile): void {
        if (!!dealFile.id) {
            this.updateDealFile(dealFile);
        } else {
            this.createDealFile(dealFile);
        }
    }

    private updateProductFile(productFile: SF00301_ProductFile): void {
        let self = this;
        App.loader('show');
        self.sf00301Service
            .updateProductFile(productFile, self.pageData.file.fileCode)
            .then(() => {
                self.resetStagingFileAndCloseFileModal();
                App.loader('hide');
                $.notify({message: Messages.get(MSG.SF00301.INF007)}, {type: 'success'});
            });
    }


    private updateDealFile(dealFile: SF00301_DealFile): void {
        let self = this;
        App.loader('show');
        self.sf00301Service
            .updateDealFile(dealFile, self.pageData.file.fileCode)
            .then(() => {
                self.resetStagingFileAndCloseFileModal();
                App.loader('hide');
                $.notify({message: Messages.get(MSG.SF00301.INF007)}, {type: 'success'});
            });
    }

    private createDealFile(dealFile: SF00301_DealFile): void {
        let self = this;

        if (!this.pageData.file.fileCode) {
            swal("Upload File", Messages.get(MSG.SF00301.ERR009), "error");
            return;
        }

        App.loader('show');

        self.sf00301Service
            .createDealFile(dealFile, self.pageData.file.fileCode)
            .then(() => {
                self.resetStagingFileAndCloseFileModal();
                App.loader('hide');
                $.notify({message: Messages.get(MSG.SF00301.INF007)}, {type: 'success'});
            });
    }

    private removeStagingFile(): void {
        const AND_CANCEL_UPLOADING = true;
        this.dropzone.removeAllFiles(AND_CANCEL_UPLOADING);
        this.pageData.stagingFileItem = new SF00301_FileItem();
        this.pageData.file = new File();
        this.pageData.fileUploadInProgress = false;
    }

    private closeFileModalIfShown(): void {
        if (this.$fileDialog.hasClass('in'))
            this.$fileDialog.modal('toggle');
    }

    resetStagingFileAndCloseFileModal() {
        this.removeStagingFile();
        this.closeFileModalIfShown();
    }

    /*View detail product file*/
    viewDealFileInfo(dealFile: SF00301_DealFile) {
        this.pageData.stagingFileItem = new SF00301_FileItem();
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
    }

    viewDealFile(item: SF00301_FileItem) {
        this.dropzone.setupEventListeners();
        this.$dropzone.css('cursor', 'pointer');

        // Create the mock file
        let mockFile = {
            name: item.objectFileId,
            size: 1024,
            accepted: true,
            kind: 'image'
        };

        // Call the default addedfile event handler
        this.dropzone.emit("addedfile", mockFile);
        this.dropzone.files.push(mockFile);

        let self = this;
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
    }

    /**
     * redirect to product screen to show given product's infomation
     * @param product
     */
    viewProductInfo(product: SF00301_Product): void {
        let self = this;
        if (this.pageData.isUpdated) {
            swal({
                    title: Constants.BLANK,
                    text: Messages.get(MSG.SF00301.INF006),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText: Messages.get(MSG.SF00301.INF005),
                    closeOnConfirm: true
                },
                function () {
                    if (!product || !product.productCode)
                        return;
                    PathUtil.redirectToPageProduct(self.router,self.deal.dealCode,product.productCode,product.productType,product.shapeId,product.cartonShippingType);
                });
        } else {
            if (!product || !product.productCode)
                return;

            PathUtil.redirectToPageProduct(self.router,self.deal.dealCode,product.productCode,product.productType,product.shapeId,product.cartonShippingType);
        }
    }

    viewCheckSheet(): void {
        let self = this;
        if (this.pageData.isUpdated) {
            swal({
                    title: Constants.BLANK,
                    text: Messages.get(MSG.SF00301.INF006),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText: Messages.get(MSG.SF00301.INF005),
                    closeOnConfirm: true
                },
                function () {
                    self.router
                        .navigate([`/home/deal/${self.deal.dealCode}/dealCheckSheet`]).then(null);
                });
        } else {
            this.router
                .navigate([`/home/deal/${this.deal.dealCode}/dealCheckSheet`]).then(null);
        }
    }

    viewQuotationInfo(quotation: SF00301_Quotation): void {
        let self = this;
        if (this.pageData.isUpdated) {
            swal({
                    title: Constants.BLANK,
                    text: Messages.get(MSG.SF00301.INF006),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText: Messages.get(MSG.SF00301.INF005),
                    closeOnConfirm: true
                },
                function () {
                    self.router.navigate([`/home/deal/${self.deal.dealCode}/quotation/${quotation.quotationCode}`]).then(null);
                });
        } else {
            this.router.navigate([`/home/deal/${this.deal.dealCode}/quotation/${quotation.quotationCode}`]).then(null);
        }
    }

    requestMail(requestType: number): void {
        let self = this;
        if (this.pageData.isUpdated) {
            swal({
                    title: Constants.BLANK,
                    text: Messages.get(MSG.SF00301.INF006),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText: Messages.get(MSG.SF00301.INF005),
                    closeOnConfirm: true
                },
                function () {
                    self.router.navigate([`/home/deal/${self.deal.dealCode}/request/${requestType}`]).then(null);
                });
        } else {
            this.router.navigate([`/home/deal/${this.deal.dealCode}/request/${requestType}`]).then(null);
        }
    }

    viewProductFileInfo(productFile: SF00301_ProductFile) {
        this.pageData.stagingFileItem = new SF00301_FileItem();
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
        let mockFile = {
            name: this.pageData.stagingFileItem.objectFileId,
            size: 1024,
            accepted: true,
            kind: 'image'
        };

        // Call the default addedfile event handler
        this.dropzone.emit("addedfile", mockFile);
        this.dropzone.files.push(mockFile);

        let self = this;
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
    }

    // remove dealProduct
    detachProduct(product: SF00301_Product) {
        let self = this;

        swal({
                title: Constants.BLANK,
                text: Messages.get(MSG.SF00301.INF003),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: SF00301Page.DANGER_RED,
                confirmButtonText: Messages.get(MSG.SF00301.INF005),
                closeOnConfirm: true
            },
            function () {
                //#2223
                return self.sf00301Service.detachProduct(product).then(() => {
                    $.notify({message: Messages.get(MSG.SF00301.INF012)}, {type: 'success'});
                }).catch(() => {
                    $.notify({message: Messages.get(MSG.SF00301.ERR008)}, {type: 'danger'});
                });
            });
    }

    removeQuotation(quotation: SF00301_Quotation) {
        let self = this;
        swal({
                title: Constants.BLANK,
                text: Messages.get(MSG.SF00301.INF004),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: SF00301Page.DANGER_RED,
                confirmButtonText: Messages.get(MSG.SF00301.INF005),
                closeOnConfirm: true
            },
            () => {
                self.sf00301Service
                    .removeQuotation(quotation).then(() => {
                    $.notify({message: Messages.get(MSG.SF00301.INF011)}, {type: 'success'});
                }).catch(() => {
                    $.notify({message: Messages.get(MSG.SF00301.ERR010)}, {type: 'danger'});
                });
            });
    }

    removeObjectFileByItemType(fileItem: SF00301_FileItem) {
        if (fileItem.category == this.CATEGORY_PRODUCT_FILE) {
            let productFile = new SF00301_ProductFile();
            productFile.id = fileItem.id;
            productFile.productId = fileItem.parentId;
            this.removeProductFile(productFile);
        } else if (fileItem.category == this.CATEGORY_DEAL_FILE) {
            let dealFile = new SF00301_DealFile();
            dealFile.id = fileItem.id;
            this.removeDealFile(dealFile);
        }
    }

    removeDealFile(dealFile: SF00301_DealFile) {
        let self = this;
        swal({
                title: Constants.BLANK,
                text: Messages.get(MSG.SF00301.INF010),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: SF00301Page.DANGER_RED,
                confirmButtonText: Messages.get(MSG.SF00301.INF005),
                closeOnConfirm: true
            },
            () => {
                self.sf00301Service
                    .removeDealFile(dealFile)
                    .then(() => {
                        self.resetStagingFileAndCloseFileModal();
                        $.notify({message: Messages.get(MSG.SF00301.INF014)}, {type: 'success'});
                    }).catch(() => {
                    $.notify({message: Messages.get(MSG.SF00301.ERR012)}, {type: 'danger'});
                });
            });
    }

    // remove productFile
    removeProductFile(productFile: SF00301_ProductFile): void {
        let self = this;
        swal({
                title: Constants.BLANK,
                text: Messages.get(MSG.SF00301.INF010),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: SF00301Page.DANGER_RED,
                confirmButtonText: Messages.get(MSG.SF00301.INF005),
                closeOnConfirm: true
            },
            () => {
                self.sf00301Service
                    .removeProductFile(productFile).then(() => {
                    self.resetStagingFileAndCloseFileModal();
                    $.notify({message: Messages.get(MSG.SF00301.INF013)}, {type: 'success'});
                }).catch(() => {
                    $.notify({message: Messages.get(MSG.SF00301.ERR011)}, {type: 'danger'});
                });
            });
    }

    /**
     * Upload deal file
     * */
    uploadDealFile(): void {
        // check product
        if (!this.deal.isSaved) {
            $.notify({message: Messages.get(MSG.SF00301.ERR002)}, {type: 'danger'});
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
    }

    showMoreItem() {
        this.sf00301Service.loadMore();
    }

    updateHighLightFlag(item: any) {
        let itemType = '';
        let itemId = null;
        // check itemType
        if (item instanceof SF00301_Product) {
            itemType = Constants.ITEM_PRODUCT;
            itemId = item.dealProductId;
        } else if (item instanceof SF00301_Quotation) {
            itemType = Constants.ITEM_QUOTATION;
            itemId = item.id;
        }
        // check status item
        if (item.highlightFlag == Constants.ONE) {
            item.highlightFlag = Constants.ZERO;
        } else {
            item.highlightFlag = Constants.ONE;
        }
        if (itemId) {
            //#2223
            // update highlightFlag call api
            this.sf00301Service.updateHighlightFlag(itemId, item.highlightFlag, itemType, this.deal.id).then(data => {
                item.highlightFlag = data['status'];
                this.deal.dealStatus = data['dealStatus'];
            });
        }
    }

    /**
     * Delete Deal
     */
    deleteDeal(): void {
        let self = this;

        swal({
                title: Constants.BLANK,
                text: Messages.get(MSG.SF00301.INF019),
                type: "warning",
                showCancelButton: true,
                confirmButtonText: Messages.get(MSG.SF00301.INF005),
                closeOnConfirm: true
            },
            () => {
                App.loader("show");
                this.sf00301Service
                    .deleteDeal()
                    .then(() => {
                        self.router
                            .navigate(["/home/deal", 'select-from-deal'])
                            .then(() => $.notify(Messages.get(MSG.SF00301.INF020)));
                    })
                    .catch(() => {
                        App.loader("hide");
                        swal({
                            title: Constants.BLANK,
                            text: Messages.get(MSG.SF00301.ERR016),
                            type: "error",
                            showCancelButton: false,
                            confirmButtonText: Messages.get(MSG.SF00301.INF005),
                            closeOnConfirm: true
                        });
                    });
            });

    }

    /**
     * Update req SF00301-08/06/2017
     */
    closedDeal() {
        let self = this;
        swal({
                title: Constants.BLANK,
                text: Messages.get(MSG.SF00301.INF022),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: Messages.get(MSG.SF00301.INF005),
                closeOnConfirm: true
            },
            function () {
                self.sf00301Service
                    .closedDeal()
                    .then(() => {
                        $.notify({message: Messages.get(MSG.SF00301.INF021)}, {type: 'success'});
                    });
            });
    }

    /**
     * navigate to Dashboard
     */
    backToDashboard(): void {
        let self = this;
        if (this.pageData.isUpdated) {
            swal({
                    title: Constants.BLANK,
                    text: Messages.get(MSG.SF00301.INF006),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText: Messages.get(MSG.SF00301.INF005),
                    closeOnConfirm: true
                },
                function () {
                    self.router.navigate(["/home/deal", 'select-from-template']).then(null);
                });
        } else {
            this.router.navigate(["/home/deal", 'select-from-template']).then(null);
        }
    }

    private notifyDone(): void {
        let notify = $.notify({
            message: Messages.get(MSG.SF00301.INF016)
        }, {
            allow_dismiss: false,
            showProgressbar: false,
            delay: 0
        });

        notify.update("progress", 100);
        notify.update("type", "info");
        setTimeout((ntf: NotifyReturn) => {
            ntf.close();
        }, 1000, notify);
    }

    download(itemModal: SF00301_FileItem) {
        this.sf00301Service.downloadFile(itemModal)
            .then(result => {
                let link = document.createElement('a');
                link.setAttribute('download', result.fileName);
                link.href = result.filePath;
                link.click();
            }).catch(err => {console.log(err)});
    }
    // http://fridaynight.vnext.vn/issues/3115
    get isDisabled(): boolean {
        return (this.pageData.totalComments <=10 || this.pageData.totalComments == (this.pageData.comments || []).length);
    }
    get isDisabledShowMoreDealItem(): boolean {
        return !this.sf00301Service.canShowMoreDealItem(this.pageData.concernsItems.length);
    }
}

