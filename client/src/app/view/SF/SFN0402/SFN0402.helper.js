"use strict";
var MstPaper_model_1 = require("../COMMON/model/MstPaper.model");
var MstLamination_model_1 = require("../COMMON/model/MstLamination.model");
var format_util_1 = require("../../../util/format-util");
var math_util_1 = require("../../../util/math-util");
/**
 * Helper class for SFN0402
 * @author haipt
 */
var SFN0402Helper = (function () {
    function SFN0402Helper() {
    }
    SFN0402Helper.getHPInfoStr = function (hpInfo) {
        if (hpInfo == 0) {
            return "いいえ";
        }
        else if (hpInfo == 1) {
            return "はい";
        }
        else {
            return "";
        }
    };
    SFN0402Helper.getBillingMethodStr = function (billingMethod) {
        if (billingMethod == "A") {
            return "A： メール";
        }
        else if (billingMethod == "B") {
            return "B： 郵送";
        }
        else if (billingMethod == "C") {
            return "C： 個別対応";
        }
        else if (billingMethod == "D") {
            return "D： 計算センター対応不要";
        }
        else {
            return "";
        }
    };
    SFN0402Helper.getProductDescription = function (productData) {
        var product = {};
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
        var paper = new MstPaper_model_1.MstPaper();
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
        var laminations = productData["laminations"];
        var paperLaminations = [];
        if (!!laminations) {
            laminations.forEach(function (lamination) {
                var tmp = new MstLamination_model_1.MstLamination();
                tmp.setData(lamination);
                paperLaminations.push(tmp);
            });
        }
        product.laminations = paperLaminations;
        return format_util_1.FormatUtil.formatProductDescription(product, product.laminations);
    };
    SFN0402Helper.getTelStr = function (tel, ext) {
        var telStr = "";
        if (tel != undefined) {
            telStr += tel;
        }
        if (ext != undefined && ext != "") {
            telStr += " ( " + ext + " )";
        }
        return telStr;
    };
    SFN0402Helper.convertYenToThousanYen = function (value) {
        return math_util_1.default.round(value / 1000, 0);
    };
    return SFN0402Helper;
}());
exports.SFN0402Helper = SFN0402Helper;
//# sourceMappingURL=SFN0402.helper.js.map