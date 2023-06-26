"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var activity_model_1 = require("../../../../component/activity/model/activity.model");
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
/**
 * Created by ASUS on 6/5/2017.
 */
var DealModel = (function (_super) {
    __extends(DealModel, _super);
    function DealModel() {
        _super.apply(this, arguments);
        /* deal activity list */
        this.activity = new activity_model_1.Activity();
    }
    return DealModel;
}(BaseModel_model_1.BaseModel));
exports.DealModel = DealModel;
//# sourceMappingURL=SF001_Deal.js.map