"use strict";
var DealProduct_model_1 = require("../model/core/DealProduct.model");
var MstColor_model_1 = require("../model/core/MstColor.model");
var MstDieCutting_model_1 = require("../model/core/MstDieCutting.model");
var MstPacking_model_1 = require("../model/core/MstPacking.model");
var MstPaper_model_1 = require("../model/core/MstPaper.model");
var MstPaste_model_1 = require("../model/core/MstPaste.model");
var MstShippingCompany_model_1 = require("../model/core/MstShippingCompany.model");
var MstShippingCost_model_1 = require("../model/core/MstShippingCost.model");
var MstStamping_model_1 = require("../model/core/MstStamping.model");
var MstSurfaceTreatment_model_1 = require("../model/core/MstSurfaceTreatment.model");
var MstWindow_model_1 = require("../model/core/MstWindow.model");
var MstDecorative_model_1 = require("../model/core/MstDecorative.model");
var SF0030201Res = (function () {
    function SF0030201Res() {
        this.dealProduct = new DealProduct_model_1.DealProduct();
        // master data
        this.mstColor = new MstColor_model_1.MstColor();
        this.mstDieCutting = new MstDieCutting_model_1.MstDieCutting();
        this.mstPacking = new MstPacking_model_1.MstPacking();
        this.mstPaper = new MstPaper_model_1.MstPaper();
        this.mstPaperHead = new MstPaper_model_1.MstPaper();
        this.mstPaste = new MstPaste_model_1.MstPaste();
        this.mstShippingCompany = new MstShippingCompany_model_1.MstShippingCompany();
        this.mstShippingCost = new MstShippingCost_model_1.MstShippingCost();
        this.mstStamping = new MstStamping_model_1.MstStamping();
        this.mstSurfaceTreatment = new MstSurfaceTreatment_model_1.MstSurfaceTreatment();
        this.mstWindow = new MstWindow_model_1.MstWindow();
        this.mstDecorative = new MstDecorative_model_1.MstDecorative();
    }
    return SF0030201Res;
}());
exports.SF0030201Res = SF0030201Res;
//# sourceMappingURL=SF0030201.res.js.map