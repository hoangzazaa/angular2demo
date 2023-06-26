import {Injectable} from "@angular/core";
import {ProductFile} from "../../../model/core/ProductFile.model";
import {Product} from "../../../model/core/Product.model";
import {ProductOutput} from "../../../model/core/ProductOutput.model";
import {Offer} from "../../../model/core/Offer.model";
import {ProductCommonFee} from "../../../model/core/ProductCommonFee.model";
import {DealProduct} from "../../../model/core/DealProduct.model";
import {MstData} from "../../../model/MstData";
import {File} from "../../../model/core/File.model";
import {Deal} from "../../../model/core/Deal.model";
import {HightlightedPropertyTracker} from "./helper/ProductPropertyChangedTracker";
import {PaperModel} from "./model/paper.model";
import {MSG} from "../../../helper/message";
import {ProductRequiredItem} from "./helper/product-required-item";
import {MstSheetSize} from "../../../model/core/MstSheetSize.model";
import DataUtil from "../../../util/data-util";

/** 製品名の最大文字数(CP932 バイト数) */
export const MAX_PRODUCT_CP932_BYTES = 40;

/**
 * Component class to binding data on SF003-02 screen.
 * @author DungTQ
 */
@Injectable()
export class SF00302Data {
    /* Decorative Sheet */
    DECORATIVE_ID: number = 98;
    ONE_STAGE:number = 100;

    fileUploadInProgress: boolean = false;
    /* map object to track property chanaged after dupplicate deal */
    highlightedTracker: HightlightedPropertyTracker = new HightlightedPropertyTracker();
    //Check mode view
    isView: boolean                                 = false;
    /*Deal code*/
    dealCode: string;
    /*File*/
    file: File = new File();
    /*Product file*/
    productFile: ProductFile = new ProductFile();
    /*Deal*/
    deal: Deal = new Deal();
    /*Deal product*/
    //TODO: Chỉ dùng id cho delete, xem xét sửa để màn hình nhẹ hơn
    dealProduct: DealProduct = new DealProduct();
    /*Master data*/
    mstData: MstData = new MstData();
    /*Master data*/
    mstSheetSizes: MstSheetSize[];
    /*Offers*/
    offers: Offer[]    = [];
    offersOld: Offer[] = [];
    /*Offer used to reset*/
    indexOffer: Offer = new Offer();
    /*Product*/
    product: Product    = new Product();
    productOld: Product = new Product();
    /*Product Output used to calculate*/
    productOutput: ProductOutput = new ProductOutput();
    /*Product file*/
    productFiles: ProductFile[] = [];
    /*List Product Output*/
    productOutputs: ProductOutput []    = [];
    productOutputsOld: ProductOutput [] = [];
    /*Product common fee*/
    productCommonFee: ProductCommonFee = new ProductCommonFee();
    /*Product common fee tmp*/
    indexProductCommonFee: ProductCommonFee = new ProductCommonFee();
    /*Check create product file*/
    checkCreateUpload: boolean = false;
    /*Index item*/
    indexProductFile: number;
    /* Index output view */
    indexOutput: number = 0;
    /*Check create dropzone */
    checkCreateDropzone: boolean = false;

    paperNormValue: number    = 0;
    paperNormValueOld: number = 0;

    /* backup Product Lot */
    bkProductLots: any = [];
    /* backup Product Lot */
    bkProductOffers: any = [];

    checkInputSave = false;

    checkOutputSave = false;

    checkCommonSave = false;

    /* Check to display mesage */
    checkOverWeight = false;

    /* Paper in modal */
    mstPapers: PaperModel[]       = [];
    mstPapersHeader: PaperModel[] = [];

    indexPaperTab1: number;
    mstPapersBackgroundTab1: PaperModel[] = [];

    indexPaperTab2: number;
    mstPapersBackgroundTab2: PaperModel[] = [];

    checkPaper2903: boolean = false;
    showModal2903: boolean  = false;
    // paperTmp paper
    paperTmp: PaperModel;
    // paperTmp lamination
    paperTmp1: PaperModel   = new PaperModel;
    paperTmp2: PaperModel   = new PaperModel;
    paperTmp3: PaperModel   = new PaperModel;
    paperTmp4: PaperModel   = new PaperModel;
    paperTmp5: PaperModel   = new PaperModel;

    mstLaminations: PaperModel[]       = [];
    mstLaminationsHeader: PaperModel[] = [];

    //http://fridaynight.vnext.vn/issues/2409
    paperModel: PaperModel                   = new PaperModel;
    paperModelNews: PaperModel[]             = [];
    productRequiredItem: ProductRequiredItem = new ProductRequiredItem;

    // Vùng input
    isUpdateAreaOne: boolean   = false;
    // Vùng product output
    isUpdateAreaTwo: boolean   = false;
    // Vùng common fee
    isUpdateAreaThree: boolean = false;

    xCheck: boolean;
    yCheck: boolean;
    zCheck: boolean;

    //start issues/2344
    mstSheetSizeDisplay: MstSheetSize[];
    _sheetSize: number;
    checkInit: boolean = false;

    // add paperModel to mst data
    addPaperModel(paperModel: PaperModel, optionPaper: number, paperType?: number) {
        if (paperType == 1) {
            let factoryID                               = 1;
            // For normal Staff, factory ID da dc chon factoryID=2
            this.mstData.mstPaperNormal[1][optionPaper] = undefined;
            DataUtil.pushData(this.mstData.mstPaperNormal, paperModel.paperName, "name", factoryID, optionPaper, paperModel.basicWeight, paperModel.id);
            DataUtil.pushData(this.mstData.mstPaperNormal, paperModel.normValue, "normValue", factoryID, optionPaper, paperModel.basicWeight);
            // For head staff, factory Id dc chon
            this.mstData.mstPaperHead[1][optionPaper] = undefined;
            DataUtil.pushData(this.mstData.mstPaperHead, paperModel.normValue, "normValue", factoryID, optionPaper, paperModel.basicWeight);
            DataUtil.pushData(this.mstData.mstPaperHead, paperModel.paperName, "name", factoryID, optionPaper, paperModel.basicWeight, paperModel.id);
            factoryID                                   = 2;
            // For normal Staff, factory ID da dc chon factoryID=1
            this.mstData.mstPaperNormal[2][optionPaper] = undefined;
            DataUtil.pushData(this.mstData.mstPaperNormal, paperModel.paperName, "name", factoryID, optionPaper, paperModel.basicWeight, paperModel.id);
            DataUtil.pushData(this.mstData.mstPaperNormal, paperModel.normValue, "normValue", factoryID, optionPaper, paperModel.basicWeight);
            // For head staff, factory Id dc chon
            this.mstData.mstPaperHead[2][optionPaper] = undefined;
            DataUtil.pushData(this.mstData.mstPaperHead, paperModel.normValue, "normValue", factoryID, optionPaper, paperModel.basicWeight);
            DataUtil.pushData(this.mstData.mstPaperHead, paperModel.paperName, "name", factoryID, optionPaper, paperModel.basicWeight, paperModel.id);
        } else {
            this.mstData.mstLamination[optionPaper] = undefined;
            DataUtil.pushData(this.mstData.mstLamination, paperModel.normValue, "throughWage", optionPaper, paperModel.basicWeight);
        }
    }

    //end 2344
    /** @deprecated Unused? */
    validateProductName() {
        if (!this.product.productName) {
            let $err = $("#productName-error");
            if ($err.length > 0) {
                return false;
            }

            $err                = jQuery('<div/>', {
                id  : "productName-error",
                text: MSG.SF00302.ERR013
            })
                .addClass("help-block text-right animated fadeInDown");
            let $productNameCol = $("#productName").parent().parent();
            $productNameCol.append($err);
            $productNameCol.parent().addClass("has-error");

            return false;
        } else if (this.product.productName.length > 30) {
            let $err = $("#productName-error");
            if ($err.length > 0) {
                return false;
            }

            $err                = jQuery('<div/>', {
                id  : "productName-error",
                text: MSG.SF00302.ERR014
            })
                .addClass("help-block text-right animated fadeInDown");
            let $productNameCol = $("#productName").parent().parent();
            $productNameCol.append($err);
            $productNameCol.parent().addClass("has-error");

            return false;
        } else {
            this.clearProductNameErrMsg();
            return true;
        }
    }

    clearProductNameErrMsg() {
        let errEl = $("#productName-error");
        errEl.parent().parent().removeClass("has-error");
        errEl.remove();
    }

    get isCreateNewProduct(): boolean {
        if (!!this.product.id) {
            return false;
        }
        return true;
    }

    get isRequestDesign(): boolean {
        return this.product.requestDesignFlag == 1;
    }

    // Validation
    get noneFieldBorderCss(): { style: string, radius: string } {
        return {style: "", radius: ""};
    }

    get defaultFieldBorderCss(): { style: string, radius: string } {
        return {style: "solid 2px #5c90d2", radius: "3px"};
    }

    get errFieldBorderCss(): { style: string, radius: string } {
        return {style: "solid 2px #FF0000", radius: "3px"};
    }

}
