"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SpecifyTimeModal_model_1 = require("../../specify-time-modal/SpecifyTimeModal.model");
var SpecifyTimeModal_helper_1 = require("../../specify-time-modal/SpecifyTimeModal.helper");
var SDMSpecifyTimeModalModel = (function (_super) {
    __extends(SDMSpecifyTimeModalModel, _super);
    function SDMSpecifyTimeModalModel(component) {
        _super.call(this);
        this.component = component;
    }
    SDMSpecifyTimeModalModel.prototype.timeSelected = function () {
        var cd = this.component.curDestination;
        cd.sdm_specifyTime = SpecifyTimeModal_helper_1.SpecifyTimeModalHelper.getSpecifyTimeName(cd.stm_pattern, cd.stm_hour, cd.stm_minute);
    };
    SDMSpecifyTimeModalModel.PROVIDER = "SpecifyTimeModal";
    return SDMSpecifyTimeModalModel;
}(SpecifyTimeModal_model_1.SpecifyTimeModalModel));
exports.SDMSpecifyTimeModalModel = SDMSpecifyTimeModalModel;
//# sourceMappingURL=SDMSpecifyTimeModal.model.js.map