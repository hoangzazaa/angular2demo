"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var activity_model_1 = require("../../../../component/activity/model/activity.model");
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
/**
 * Created by manhnv on 6/14/2017.
 */
var SF00205Deal = (function (_super) {
    __extends(SF00205Deal, _super);
    function SF00205Deal() {
        _super.apply(this, arguments);
        this.products = [];
        this.laminations = [];
        /* deal activity list */
        this.activity = new activity_model_1.Activity();
    }
    return SF00205Deal;
}(BaseModel_model_1.BaseModel));
exports.SF00205Deal = SF00205Deal;
//# sourceMappingURL=SF00205_Deal.model.js.map