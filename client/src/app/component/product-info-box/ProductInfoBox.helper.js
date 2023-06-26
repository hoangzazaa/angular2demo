"use strict";
var mst_data_type_1 = require("../../helper/mst-data-type");
var format_util_1 = require("../../util/format-util");
var constants_1 = require("../../helper/constants");
var ProductInfoBoxHelper = (function () {
    function ProductInfoBoxHelper() {
    }
    ProductInfoBoxHelper.isCommercialProduct = function (product) {
        return false;
    };
    ProductInfoBoxHelper.getProductTypeName = function (productType) {
        if (productType == 0) {
            return "紙器・貼合";
        }
        else if (productType == 1) {
            return "段ボール";
        }
        else {
            return "美粧シート";
        }
    };
    ProductInfoBoxHelper.getDimension = function (product) {
        return format_util_1.FormatUtil.getDimension(product);
    };
    ProductInfoBoxHelper.getMaterial = function (product, mstLamination) {
        var paperName = format_util_1.FormatUtil.getPaperName(product, mstLamination);
        var color = format_util_1.FormatUtil.formatColorsViaPrintMethod(product);
        var value = [];
        if (!!paperName) {
            value.push(paperName);
        }
        if (!!color) {
            value.push(color);
        }
        var material = value.join(constants_1.Constants.SPACE);
        return material;
    };
    ProductInfoBoxHelper.getMemo = function (memo1, memo2, memo3) {
        var memos = [];
        if (memo1 != undefined) {
            memos.push(memo1);
        }
        if (memo2 != undefined) {
            memos.push(memo2);
        }
        if (memo3 != undefined) {
            memos.push(memo3);
        }
        var sizeStr = memos.join("、");
        return sizeStr;
    };
    ProductInfoBoxHelper.getManufacture = function (factoryId) {
        var factory = mst_data_type_1.FACTORY[factoryId];
        if (factory == undefined) {
            return "";
        }
        else {
            return factory;
        }
    };
    return ProductInfoBoxHelper;
}());
exports.ProductInfoBoxHelper = ProductInfoBoxHelper;
//# sourceMappingURL=ProductInfoBox.helper.js.map