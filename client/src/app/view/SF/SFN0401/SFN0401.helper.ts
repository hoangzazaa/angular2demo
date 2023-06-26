import {FilterModel} from "./model/SFN0401_Filter.model";
import {SFN0401Constants} from "./SFN0401.constants";
import {MstPaper} from "../COMMON/model/MstPaper.model";
import {MstLamination} from "../COMMON/model/MstLamination.model";
import {FormatUtil} from "../../../util/format-util";
/**
 * Helper class for SFN0401
 * @author haipt
 */
export class SFN0401Helper {

    static getDefaultFilter(screenMode: number): FilterModel {
        let filter = new FilterModel();

        // keywords
        filter.keywords = [];
        // filter type
        if (screenMode == SFN0401Constants.MODE_SUPPLIER) {
            filter.type = 2;
        } else {
            filter.type = 1;
        }
        // page
        filter.page = 1;

        return filter;
    }

    static getHPInfoStr(hpInfo: number): string {
        if (hpInfo == 0) {
            return "いいえ";
        } else if (hpInfo == 1) {
            return "はい";
        } else {
            return "";
        }
    }

    static getBillingMethodStr(billingMethod: string): string {
        if (billingMethod == "A") {
            return "A： メール";
        } else if (billingMethod == "B") {
            return "B： 郵送";
        } else if (billingMethod == "C") {
            return "C： 個別対応";
        } else if (billingMethod == "D") {
            return "D： 計算センター対応不要";
        } else {
            return "";
        }
    }

    static getProductDescription(productData: any): string {
        let product:any = {};
        product["productType"] = productData["type"];
        product["shapeId"] = productData["shapeId"];
        product["sizeH"] = productData["sizeH"];
        product["sizeD"] = productData["sizeD"];
        product["sizeW"] = productData["sizeW"];
        product["cartonShippingType"] = productData["cartonShippingType"];
        product["blankPaperSizeH"] = productData["blankPaperSizeH"];
        product["blankPaperSizeW"] = productData["blankPaperSizeW"];
        product["paperSizeH"] = productData["paperSizeH"];
        product["paperSizeW"] = productData["paperSizeW"];

        let paper = new MstPaper();
        paper.setData(productData["paper"]);
        product.paper = paper;

        product["laminationFlute"] = productData["laminationFlute"];
        product["paperNameId"] = productData["paperNameId"];
        product["paperWeight"] = productData["paperWeight"];
        product["laminationPaperTypeA"] = productData["laminationPaperTypeA"];
        product["laminationABasicWeight"] = productData["laminationABasicWeight"];
        product["laminationPaperTypeB"] = productData["laminationPaperTypeB"];
        product["laminationBBasicWeight"] = productData["laminationBBasicWeight"];
        product["laminationPaperTypeFront"] = productData["laminationPaperTypeFront"];
        product["laminationPaperTypeBack"] = productData["laminationPaperTypeBack"];
        product["laminationPaperTypeMedium"] = productData["laminationPaperTypeMedium"];
        product["laminationFrontBasicWeight"] = productData["laminationFrontBasicWeight"];
        product["laminationMediumBasicWeight"] = productData["laminationMediumBasicWeight"];
        product["laminationBackBasicWeight"] = productData["laminationBackBasicWeight"];
        product["printMethod"] = productData["printMethod"];
        product["colorIdF"] = productData["colorIdF"];
        product["specialColorF"] = productData["specialColorF"];
        product["colorIdB"] = productData["colorIdB"];
        product["specialColorB"] = productData["specialColorB"];
        product["laminationAId"] = productData["laminationAId"];
        product["laminationBId"] = productData["laminationBId"];
        product["laminationFrontId"] = productData["laminationFrontId"];
        product["laminationBackId"] = productData["laminationBackId"];
        product["laminationMediumId"] = productData["laminationMediumId"];

        let laminations =  productData["laminations"];
        let paperLaminations = [];
        if(!! laminations){

            laminations.forEach(lamination =>{
                let tmp =new MstLamination();
                tmp.setData(lamination);

                paperLaminations.push(tmp);
            })
        }
        product.laminations = paperLaminations;

        return FormatUtil.formatProductDescription(product,product.laminations);
    }

    static getTelStr(tel: string, ext: string): string {
        let telStr = "";
        if (tel != undefined) {
            telStr += tel;
        }
        if (ext != undefined && ext != "") {
            telStr += " ( " + ext + " )";
        }
        return telStr;
    }
}