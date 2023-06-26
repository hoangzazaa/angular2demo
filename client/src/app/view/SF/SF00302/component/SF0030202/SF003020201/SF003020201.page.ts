/**
 * Created by VuPT on 5/9/2017.
 */
import {SF00302Data} from "../../../SF00302.data";
import {SF00302Service} from "../../../SF00302.service";
import {AfterViewInit, Component, OnInit} from "@angular/core";
import {HeaderProvider} from "../../../../SF00100/Header.provider";
import {ActivatedRoute, Router} from "@angular/router";
import ValidatorUtil from "../../../../../../util/validator-util";
import {Deal} from "../../../../../../model/core/Deal.model";
import {ProductOutput} from "../../../../../../model/core/ProductOutput.model";
import {Offer} from "../../../../../../model/core/Offer.model";
import {DealProduct} from "../../../../../../model/core/DealProduct.model";
import {Product} from "../../../../../../model/core/Product.model";
import {ProductCommonFee} from "../../../../../../model/core/ProductCommonFee.model";
import Messages, {MSG} from "../../../../../../helper/message";
import {MstData} from "../../../../../../model/MstData";
import DataUtil from "../../../../../../util/data-util";
import {Constants} from "../../../../../../helper/constants";
import {PaperModel} from "../../../model/paper.model";
import {HightlightedPropertyTracker} from "../../../helper/ProductPropertyChangedTracker";
import {SF003020201Helper} from "./SF003020201.helper";
import {FormatUtil} from "../../../../../../util/format-util";
import {Eastasianwidth} from "../../../../../../helper/eastasianwidth";
import { AbstractSF00302Page } from "../../../AbstractSF00302.page";

declare let App: any;
const SF00302_PAGE_TITLE: string = "製品情報";
const TYPE_FRONT = 100, TYPE_B = 101, TYPE_MEDIUM = 102, TYPE_A = 103, TYPE_BACK = 104;

/** 
 * 製品情報(段ボール)
 */
@Component({
    selector: "SF003-020201",
    templateUrl: "./SF003020201.page.html",
    providers: [SF00302Data, SF00302Service]
})
export class SF003020201Page extends AbstractSF00302Page<SF003020201Helper> implements AfterViewInit, OnInit {
    checkValidateBorder: boolean = false;
    // create constructor
    constructor(route: ActivatedRoute, router: Router, headerProvider: HeaderProvider, public sv00302Service: SF00302Service) {
        super(router, route, headerProvider);
        this.helper = new SF003020201Helper;
        this.helper.sf00302Data = new SF00302Data;
        this.helper.sf00302Data.product.productType = 1;
    }

    protected initBreadcrumb(): void {
        let self = this;
        self.headerProvider.reset();
        self.headerProvider.pageName = SF00302_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(Constants.TOP, [Constants.SLASH]);
        self.headerProvider.addBreadCrumb(Constants.DEAL_OVERVIEW_BREADCRUMB, ["/home/deal/" + this.route.snapshot.params["dealCode"]]);
        self.headerProvider.addBreadCrumb(SF00302_PAGE_TITLE);
    }

    ngAfterViewInit(): void {
        // closed modal when back
        $(window).on('hashchange', function (event) {
            if (window.location.hash != "#upload-form") {
                $('#upload-form').modal('hide');
                $('#paperModal').modal('hide');
            }
        });
        App.initHelpers(['magnific-popup', 'slick', 'datepicker', 'datetimepicker', 'slimscroll']);

    }

    get pageData(): SF00302Data {
        return this.helper.getSF00302Data();
    }

    ngOnInit(): void {
        this.sv00302Service.navigateTo("製品情報(A式ダンボール)", this.router.url);
        let dealCode = this.route.snapshot.params['dealCode'];
        let dataDeal = this.route.parent.snapshot.data["deal"];
        let sf00302Data = this.route.parent.snapshot.data["sf00302Data"];

        this.initDataScreen(dealCode, dataDeal, sf00302Data);
    }

    initDataScreen(dealCode: string, dataDeal: any, sf00302Data: any){
        this.pageData.mstLaminations = [];
        this.pageData.mstLaminationsHeader = [];
        // deal code
        if(!!dealCode){
            this.pageData.dealCode = dealCode;
        }

        // deal
        let deal: Deal = new Deal;
        if(!!dataDeal){
            Object.assign(deal, dataDeal);
            this.pageData.deal   = deal;
            this.pageData.isView = this.isTemplateDeal(deal) || deal.dealStatus >= 4 || deal.isClosed;
        }

        // sf00302data
        if(!!sf00302Data){
            if (sf00302Data.dealProduct != undefined
                && sf00302Data.dealProduct.product != undefined) {
                this.pageData.productFiles = sf00302Data.dealProduct.product.productFiles;
                this.assignDealProduct(sf00302Data.dealProduct);
                this.refeshIndexingObjects();

                let tmpProduct       = sf00302Data.dealProduct.product;
                this.pageData.zCheck = false;
                this.pageData.xCheck = (tmpProduct.createdDate == tmpProduct.updatedDate);
                this.pageData.yCheck = false;
            } else {
                this.pageData.product.pasteSpecialFormFlag = 0;

                // init empty output
                for (let i = 0; i < 5; i++) {
                    this.pageData.productOutputs.push(new ProductOutput());
                    this.pageData.offers.push(new Offer());
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
        this.pageData.checkInputSave  = false;
        this.pageData.checkOutputSave = false;
        this.pageData.checkCommonSave = false;

        // check validate border
        this.helper.checkProcessCase();
    }

    private parseDataPaper(sf00302Data: any) {
        // get list mst paper
        let laminations = sf00302Data["mstLamination"];
        let laminationsHead = sf00302Data["mstLaminationHead"];

        this.addMstLamination(laminations, laminationsHead);
    }

    public addMstLamination(laminations?: any, laminationsHead?: any){
        //3.parse mstPapers
        if(!!laminations){
            for (let paper of laminations) {
                let paperTmp = this.parsePaperLamination(paper);
                this.pageData.mstLaminations.push(paperTmp);
            }
        }

        //4.parse papersHead
        if(!!laminationsHead){
            for (let paper of laminationsHead) {
                let paperTmp = this.parsePaperLamination(paper);
                this.pageData.mstLaminationsHeader.push(paperTmp);
            }
        }
    }

    private assignDealProduct(source: DealProduct) {

        //assign dealProduct into data
        let dealProduct = new DealProduct();
        dealProduct.setDealProduct(source);
        this.pageData.dealProduct = dealProduct;

        //assign product into data
        let product = new Product();
        product.setProduct(source.product);
        this.pageData.productOld = product;
        this.pageData.product = DataUtil.cloneObject(this.pageData.productOld);

        //assign productOuputs into data
        let productOutputs = [];
        Object.assign(productOutputs, source.product.productOutputs);
        this.pageData.productOutputsOld = productOutputs;
        this.pageData.productOutputs = DataUtil.cloneObject(this.pageData.productOutputsOld);

        //assign product common fee
        let fee = new ProductCommonFee();
        Object.assign(fee, source.product.productCommon);
        this.pageData.productCommonFee = fee;

        //assign offers into data
        let offers = [];
        Object.assign(offers, source.offers);
        this.pageData.offersOld = offers;
        this.pageData.offers = DataUtil.cloneObject(this.pageData.offersOld);


        // init backup data - lot
        for (let i = 0; i < 5; i++) {
            if (source.product.productOutputs[i] == undefined) {
                this.pageData.bkProductLots.push(undefined);
            } else {
                this.pageData.bkProductLots.push(source.product.productOutputs[i].lot);
            }
        }
        // init backup data - offer
        for (let i = 0; i < 5; i++) {
            if (source.offers[i] == undefined) {
                this.pageData.bkProductOffers.push(undefined);
            } else {
                this.pageData.bkProductOffers.push(source.offers[i].unitPrice);
            }
        }
    }

    private refeshIndexingObjects() {
        if (this.pageData.productOutputs[0] != undefined) {
            this.pageData.productOutput = this.pageData.productOutputs[0];
        }
        if (this.pageData.productCommonFee != undefined) {
            this.pageData.indexProductCommonFee = this.pageData.productCommonFee;
        }
        if (this.pageData.offers[0] != undefined) {
            this.pageData.indexOffer = this.pageData.offers[0];
        }
    }

    get isView(): boolean {
        if (this.isRequestDesign) {
            return false;
        } else {
            return this.pageData.isView;
        }
    }

    get isCreat(): boolean {
        return this.pageData.product == null || this.pageData.product.id == null;
    }

    // check product undefined
    get hasProduct(): boolean {
        return this.pageData.product != null && this.pageData.product.id != null;
    }

    private isTemplateDeal(deal: Deal): boolean {
        return deal.isTemplate || (!this.isCreat && this.pageData.deal.dealStatus >= 4);
    }

    /** @inheritDoc */
    protected doSaveProduct(): void {
        this.pageData.product.updatedDate = new Date();
        // this.helper.checkChangeDataProduct();

        // 文字数チェック (保存時のみ)
        let isShowMessage: boolean = false;
        if(this.pageData.product.memo1 != undefined && Eastasianwidth.numberLength(this.pageData.product.memo1) > 60 && this.pageData.checkInputSave) {
            isShowMessage = true;
        }
        if(this.pageData.product.memo2 != undefined && Eastasianwidth.numberLength(this.pageData.product.memo2) > 60 && this.pageData.checkInputSave) {
            isShowMessage = true;
        }
        if(this.pageData.product.memo3 != undefined && Eastasianwidth.numberLength(this.pageData.product.memo3) > 60 && this.pageData.checkInputSave) {
            isShowMessage = true;
        }
        if(this.pageData.product.packingNote != undefined && Eastasianwidth.numberLength(this.pageData.product.packingNote) > 60 && this.pageData.checkInputSave) {
            isShowMessage = true;
        }

        if (isShowMessage) {
            $.notify({message: Messages.get(MSG.SF00301.WRN003)}, {type: 'warning'});
        }

        let product = new Product();
        product.setProduct(this.pageData.product);
        // comment to fixbug 3057
        /* if (product.pasteId == 0) {
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
        }*/
        if (this.isCreat) {
            let dealCode = this.route.snapshot.params["dealCode"];
            let productOutputs = [];
            Object.assign(productOutputs, this.pageData.productOutputs);
            product.productOutputs = productOutputs;
            // push product offer
            for (let i = 0; i < 5; i++) {
                product.productOutputs[i].offers = [];
                let offer = this.pageData.offers[i];
                offer.unitPrice = 0;
                product.productOutputs[i].offers.push(offer);
                product.productOutputs[i].lot = 0;
            }

            let productCommonFee = new ProductCommonFee();
            product.productCommon = Object.assign(productCommonFee, this.pageData.productCommonFee);
            this.sv00302Service
                .sv0030202CreateDealProduct(dealCode, product)
                .then(data => {
                    let productCode = data.dealProduct.product.productCode;
                    this.router
                        .navigate(['/home/deal', dealCode, 'product', productCode, 'carton'], {replaceUrl: true})
                        .then(res => {
                            // update data sf00302Data
                            this.ngOnInit();
                            // message save success
                            $.notify({message: Messages.get(MSG.SF00302.INF005)}, {type: 'info'});
                            this.pageData.checkInputSave = false;
                            this.pageData.checkOutputSave = false;
                            this.helper.getSF00302Data().productOld = DataUtil.cloneObject(this.helper.sf00302Data.product);
                        });
                });
        } else {
            this.pageData.checkInputSave = true;  //（変更チェックを外す。一旦暫定対応。）
            if (this.pageData.checkInputSave) {
                this.sv00302Service.sv003012UpdateProductInput(product, this.pageData.paperModelNews).then(data => {
                    if (this.pageData.product.productName.length> 40) {
                        this.pageData.product.productName = this.pageData.product.productName.slice(0, 40);
                    }
                    if (this.pageData.product.memo1 != undefined && this.pageData.product.memo1.length> 60) {
                        this.pageData.product.memo1 = this.pageData.product.memo1.slice(0, 60);
                    }
                    if (this.pageData.product.memo2 != undefined && this.pageData.product.memo2.length> 60) {
                        this.pageData.product.memo2 = this.pageData.product.memo2.slice(0, 60);
                    }
                    if (this.pageData.product.memo3 != undefined && this.pageData.product.memo3.length> 60) {
                        this.pageData.product.memo3 = this.pageData.product.memo3.slice(0, 60);
                    }
                    if (this.pageData.product.packingNote != undefined && this.pageData.product.packingNote.length> 60) {
                        this.pageData.product.packingNote = this.pageData.product.packingNote.slice(0, 60);
                    }
                    $.notify({message: Messages.get(MSG.SF00302.INF006)}, {type: 'info'});
                    this.pageData.checkInputSave = false;
                    // check validate border
                    this.pageData.product.createdDate = new Date();
                    this.checkValidateBorder = true;
                    this.helper.checkProcessCase();
                    // update paper laminationId
                    let product = data["product"];
                    //set id paper new
                    this.pageData.product.laminationBId = product["laminationBId"];
                    this.pageData.product.laminationFrontId = product["laminationFrontId"];
                    this.pageData.product.laminationAId = product["laminationAId"];
                    this.pageData.product.laminationMediumId = product["laminationMediumId"];
                    this.pageData.product.laminationBackId = product["laminationBackId"];

                    // reset old data to validate - follow 3057
                    this.helper.getSF00302Data().productOld = DataUtil.cloneObject(this.helper.sf00302Data.product);

                    // reset list paper model news
                    this.pageData.paperModelNews = [];
                    //check reset paper tmp
                    this.removeDataPaperTmp();
                });
            }else{
                $.notify({message: Messages.get(MSG.SF00302.INF019)}, {type: 'info'});
            }
        }
    }

    /** @inheritDoc */
    protected doDuplicateProduct(type: number): void {
        let isShowMessage: boolean = false;

        if(this.pageData.product.memo1 != undefined && Eastasianwidth.numberLength(this.pageData.product.memo1) > 60 && this.pageData.checkInputSave) {
            isShowMessage = true;
        }
        if(this.pageData.product.memo2 != undefined && Eastasianwidth.numberLength(this.pageData.product.memo2) > 60 && this.pageData.checkInputSave) {
            isShowMessage = true;
        }
        if(this.pageData.product.memo3 != undefined && Eastasianwidth.numberLength(this.pageData.product.memo3) > 60 && this.pageData.checkInputSave) {
            isShowMessage = true;
        }
        if(this.pageData.product.packingNote != undefined && Eastasianwidth.numberLength(this.pageData.product.packingNote) > 60 && this.pageData.checkInputSave) {
            isShowMessage = true;
        }
        if (isShowMessage) {
            $.notify({message: Messages.get(MSG.SF00301.WRN003)}, {type: 'warning'});
        }

        let dealProduct = new DealProduct();
        dealProduct.setDealProduct(this.pageData.dealProduct);

        // set offers
        let offers = [];
        Object.assign(offers, this.pageData.offers);
        dealProduct.offers = offers;

        // set product
        let product = new Product();
        product.setProduct(this.pageData.product)
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
        let fee = new ProductCommonFee();
        fee.setProductCommonFee(this.pageData.productCommonFee);
        product.productCommon = fee;

        // set product output
        let productOutputs = [];
        Object.assign(productOutputs, this.pageData.productOutputs);
        product.productOutputs = productOutputs;

        // cal service duplidate deal product
        this.sv00302Service
            .sv0030204DuplicateProductForDeal(dealProduct, type, this.pageData.paperModelNews)
            .then(data => {
                let productCode = data.dealProduct.product.productCode;
                this.router
                    .navigate(['/home/deal', this.pageData.dealCode, 'product', productCode, 'carton'])
                    .then(res => {
                        let tracker = new HightlightedPropertyTracker();
                        Object.keys(tracker).forEach(key => {
                            if (tracker.hasOwnProperty(key)) {
                                tracker[key] = true;
                            }
                        });
                        tracker.initialized = false;
                        this.pageData.highlightedTracker = tracker;

                        this.pageData.product.requestDesignFlag = null;
                        // update data
                        this.ngOnInit();
                        this.initDataMst();
                        //reset paper news
                        this.pageData.paperModelNews = [];
                        //check reset paper tmp
                        this.removeDataPaperTmp();
                        // message duplicate success
                        $.notify({message: Messages.get(MSG.SF00302.INF007)}, {type: 'info'});
                    });
            })
    }

    /*Cancel product*/
    cancelProduct() {

        let message = "";
        let check = false;
        this.helper.checkChangeDataProduct();
        this.helper.checkChangeDataProductOutput();
        this.helper.checkChangeDataOffer();
        if (this.pageData.checkInputSave) {
            message = Messages.get(MSG.SF00302.ERR014);
            check = true;
        }
        if (this.pageData.checkOutputSave) {
            message = Messages.get(MSG.SF00302.ERR015);
            check = true;
        }

        if (this.pageData.checkCommonSave) {
            message = Messages.get(MSG.SF00302.ERR016);
            check = true;
        }
        if (this.pageData.checkInputSave && this.pageData.checkOutputSave) {
            message = Messages.get(MSG.SF00302.ERR017);
            check = true;
        }
        if (this.pageData.checkInputSave && this.pageData.checkCommonSave) {
            message = Messages.get(MSG.SF00302.ERR018);
            check = true;
        }
        if (this.pageData.checkOutputSave && this.pageData.checkCommonSave) {
            message = Messages.get(MSG.SF00302.ERR019);
            check = true;
        }
        if (this.pageData.checkInputSave && this.pageData.checkOutputSave && this.pageData.checkCommonSave) {
            message = Messages.get(MSG.SF00302.ERR020);
            check = true;
        }

        var self = this;
        if (check) {
            swal({
                    title: Constants.BLANK,
                    text: Messages.get(message),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText: Messages.get(MSG.SF00302.INF004),
                    closeOnConfirm: true
                },
                function () {
                    self.backProduct();
                });
        } else {
            self.backProduct();
        }
    }

    backProduct() {
        this.router.navigateByUrl('/blank').then(() => {
            this.router.navigate(['/home/deal/' + this.pageData.dealCode], {replaceUrl: true});
        })
    }

    get shapeId() {
        return this.pageData.product.shapeId;
    }

    /*Delete deal product and delete product*/
    deleteDealProduct() {
        let self = this;
        swal({
                title: Constants.BLANK,
                text: Messages.get(MSG.SF00302.INF014),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d26a5c",
                confirmButtonText: Messages.get(MSG.SF00302.INF004),
                closeOnConfirm: true
            },
            function () {
                self.sv00302Service
                    .sv0030205DeleteDealProduct(self.helper.getSF00302Data().dealProduct.id)
                    .then(res => {
                        $.notify({message: Messages.get(MSG.SF00302.INF003)}, {type: 'success'});
                        return self.router.navigate(['home/deal', self.helper.getSF00302Data().dealCode]);
                    }).catch(err => {
                    $.notify({message: Messages.get(MSG.SF00302.ERR002)}, {type: 'danger'});
                });
            });
    }

    /*Get mst data*/
    private assignMstDatas(data: any) {
        // Call service to get master data from server
        // Set up paper master data
        this.pageData.mstData = new MstData();
        let mstPaperModel = {};
        data["mstPaper"].forEach((paper) => {
            DataUtil.pushData(mstPaperModel, paper["normValue"], "normValue", paper["factoryId"], paper["nameId"], paper["basicWeight"]);
            DataUtil.pushData(mstPaperModel, paper["id"], "paperId", paper["factoryId"], paper["nameId"], paper["basicWeight"]);
            DataUtil.pushData(mstPaperModel, paper["name"], "name", paper["factoryId"], paper["nameId"], paper["basicWeight"], paper["id"]);
        });

        let mstPaperHeadModel = {};
        data["mstPaperHead"].forEach((paper) => {
            DataUtil.pushData(mstPaperHeadModel, paper["normValue"], "normValue", paper["factoryId"], paper["nameId"], paper["basicWeight"]);
            DataUtil.pushData(mstPaperHeadModel, paper["id"], "paperId", paper["factoryId"], paper["nameId"], paper["basicWeight"]);
        });
        // Set up color master data
        let mstColorModel = {};
        data["mstColor"].forEach((color) => {
            if (color["productType"] == 1) {
                DataUtil.pushData(mstColorModel, color["basicCost"], "basicCost", color["colorOption"]);
            }
        });
        // Set up surface treatment master data
        let mstSurfaceTreatmentModel = {};
        data["mstSurfaceTreatment"].forEach((surfaceTreatment) => {
            DataUtil.pushData(mstSurfaceTreatmentModel, surfaceTreatment["size"], "size", surfaceTreatment["varnishType"]);
            DataUtil.pushData(mstSurfaceTreatmentModel, surfaceTreatment["throughNumber"], "throughNumber", surfaceTreatment["varnishType"], surfaceTreatment["size"]);
            DataUtil.pushData(mstSurfaceTreatmentModel, surfaceTreatment["basicCost"], "basicCost", surfaceTreatment["varnishType"], surfaceTreatment["size"], surfaceTreatment["throughNumber"]);
            DataUtil.pushData(mstSurfaceTreatmentModel, surfaceTreatment["throughWage"], "throughWage", surfaceTreatment["varnishType"], surfaceTreatment["size"], surfaceTreatment["throughNumber"]);
        });
        // Set up stamping master data
        let mstStampingModel = {};
        data["mstStamping"].forEach((stamping) => {
            DataUtil.pushData(mstStampingModel, stamping["blank"], "blank", stamping["processingType"]);
            DataUtil.pushData(mstStampingModel, stamping["basicCost"], "basicCost", stamping["processingType"], stamping["blank"]);
            DataUtil.pushData(mstStampingModel, stamping["throughWage"], "throughWage", stamping["processingType"], stamping["blank"]);
        });
        // Set up window master data
        let mstWindowMarginModel = {};
        data["mstWindow"].forEach((windowMargin) => {
            DataUtil.pushData(mstWindowMarginModel, windowMargin["windowLot"], "windowLot", windowMargin["windowSize"]);
            DataUtil.pushData(mstWindowMarginModel, windowMargin["windowMaterial"], "windowMaterial", windowMargin["windowSize"], windowMargin["windowLot"]);
            DataUtil.pushData(mstWindowMarginModel, windowMargin["windowPreparationFee"], "windowPreparationFee", windowMargin["windowSize"], windowMargin["windowLot"], windowMargin["windowMaterial"]);
            DataUtil.pushData(mstWindowMarginModel, windowMargin["windowThroughWage"], "windowThroughWage", windowMargin["windowSize"], windowMargin["windowLot"], windowMargin["windowMaterial"]);
        });
        // Set up die cutting master data
        let mstDieCutting = {};
        data["mstDieCutting"].forEach((striking) => {
            DataUtil.pushData(mstDieCutting, striking["size"], "size", striking["paperboardType"]);
            DataUtil.pushData(mstDieCutting, striking["impositionNumber"], "impositionNumber", striking["paperboardType"], striking["size"]);
            DataUtil.pushData(mstDieCutting, striking["throughNumber"], "throughNumber", striking["paperboardType"], striking["size"], striking["impositionNumber"]);
            DataUtil.pushData(mstDieCutting, striking["basicCost"], "basicCost", striking["paperboardType"], striking["size"], striking["impositionNumber"], striking["throughNumber"]);
            DataUtil.pushData(mstDieCutting, striking["throughWage"], "throughWage", striking["paperboardType"], striking["size"], striking["impositionNumber"], striking["throughNumber"]);
        });
        // Set up paste master data
        let mstPasteModel = {};
        data["mstPaste"].forEach((paste) => {
            DataUtil.pushData(mstPasteModel, paste["form"], "form", paste["paperType"]);
            DataUtil.pushData(mstPasteModel, paste["blankSize"], "blankSize", paste["paperType"], paste["form"]);
            DataUtil.pushData(mstPasteModel, paste["basicCost"], "basicCost", paste["paperType"], paste["form"], paste["blankSize"]);
            DataUtil.pushData(mstPasteModel, paste["throughWage"], "throughWage", paste["paperType"], paste["form"], paste["blankSize"]);
        });
        // Set up packing master data
        let mstPackingModel = {};
        data["mstPacking"].forEach((packing) => {
            DataUtil.pushData(mstPackingModel, packing["lot"], "lot", packing["method"]);
            DataUtil.pushData(mstPackingModel, packing["percent"], "percent", packing["method"], packing["lot"]);
        });
        // Set up shipping cost master data
        let mstShippingCostModel = {};
        data["mstShippingCost"].forEach((shippingCost) => {
            DataUtil.pushData(mstShippingCostModel, shippingCost["distance"], "distance", shippingCost["factoryId"]);
            DataUtil.pushData(mstShippingCostModel, shippingCost["weight"], "weight", shippingCost["factoryId"], shippingCost["distance"]);
            DataUtil.pushData(mstShippingCostModel, shippingCost["cost"], "cost", shippingCost["factoryId"], shippingCost["distance"], shippingCost["weight"]);
        });

        //Set master decorative
        let mstDecorativeModel = {};
        data["mstDecorative"].forEach((decorative) => {
            DataUtil.pushData(mstDecorativeModel, decorative["lossPercent"], "lossPercent", decorative["throughNumber"]);
            DataUtil.pushData(mstDecorativeModel, decorative["stepWage"], "stepWage", decorative["throughNumber"]);
            DataUtil.pushData(mstDecorativeModel, decorative["throughWage"], "throughWage", decorative["throughNumber"]);
            DataUtil.pushData(mstDecorativeModel, decorative["fare"], "fare", decorative["throughNumber"], decorative["laminationType"]);
        })
        let mstLaminationModel = {};
        data["mstLamination"].forEach((lamination) => {
            DataUtil.pushData(mstLaminationModel, lamination["laminationThroughWage"], "throughWage", lamination["laminationId"], lamination["laminationWeight"]);
        });
        let mstCartonFluteModel = {};
        data["mstCartonFlute"].forEach((cartonFlute) => {
            DataUtil.pushData(mstCartonFluteModel, cartonFlute["cartonLong"], "long", cartonFlute["fluteType"]);
            DataUtil.pushData(mstCartonFluteModel, cartonFlute["cartonShort"], "short", cartonFlute["fluteType"]);
            DataUtil.pushData(mstCartonFluteModel, cartonFlute["shippingLoss"], "loss", cartonFlute["fluteType"], cartonFlute["shippingType"]);
            DataUtil.pushData(mstCartonFluteModel, cartonFlute["pasteWage"], "pasteWage", cartonFlute["fluteType"], cartonFlute["shippingType"]);
            DataUtil.pushData(mstCartonFluteModel, cartonFlute["shipFare"], "shipFare", cartonFlute["fluteType"], cartonFlute["shippingType"]);
        });
        let mstCartonShipping = {};
        data["mstCartonShipping"].forEach((cartonShipping) => {
            DataUtil.pushData(mstCartonShipping, cartonShipping["cost"], cartonShipping["distance"], cartonShipping["fluteType"]);
        })
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
    }

    get productType() {
        return this.pageData.product.productType;
    }

    get isRequestDesign() {
        return this.pageData.isRequestDesign;
    }

    // init data
    initDataMst() {
        if (this.pageData.product.id) {
            if (this.pageData.product.laminationPaperTypeFront == TYPE_FRONT) {
                let paperModel = this.pageData.mstLaminations.find(item => {
                    return item.id == this.pageData.product.laminationFrontId;
                });

                if (!!paperModel) {
                    this.pageData.addPaperModel(paperModel, TYPE_FRONT);
                }
            }

            if (this.pageData.product.laminationPaperTypeMedium == TYPE_MEDIUM) {
                let paperModel = this.pageData.mstLaminations.find(item => {
                    return item.id == this.pageData.product.laminationMediumId;
                });
                if (!!paperModel) {
                    this.pageData.addPaperModel(paperModel, TYPE_MEDIUM);
                }
            }

            if (this.pageData.product.laminationPaperTypeBack == TYPE_BACK) {
                let paperModel = this.pageData.mstLaminations.find(item => {
                    return item.id == this.pageData.product.laminationBackId;
                });
                if (!!paperModel) {
                    this.pageData.addPaperModel(paperModel, TYPE_BACK);
                }
            }
        }

    }

    private parsePaperLamination(paper: any):PaperModel{
        let paperTmp = new PaperModel();
        paperTmp.setData(paper);
        paperTmp.basicWeight = paper["laminationWeight"];
        paperTmp.paperId = paper["paperId"];
        paperTmp.factoryId = paper["factoryId"];
        paperTmp.normValue = FormatUtil.isNaN(paper["laminationThroughWage"])!= 0?FormatUtil.isNaN(paper["laminationThroughWage"])
            :FormatUtil.isNaN(paper["sagaNormValue"]);
        paperTmp.paperName = paper["laminationName"];
        paperTmp.hiddenFlag = paper["hiddenFlag"];
        paperTmp.commonFlag = paper["commonFlag"];

        return paperTmp;
    }

    removeDataPaperTmp(){
        if(this.pageData.product.laminationPaperTypeFront != 100){
            this.pageData.paperTmp1 = new PaperModel();
        }

        if(this.pageData.product.laminationPaperTypeMedium != 102){
            this.pageData.paperTmp3 = new PaperModel();
        }

        if(this.pageData.product.laminationPaperTypeBack != 104){
            this.pageData.paperTmp5 = new PaperModel();
        }
    }
}
