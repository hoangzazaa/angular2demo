"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SpecifyTimeModal_model_1 = require("../../specify-time-modal/SpecifyTimeModal.model");
var SpecifyTimeModal_helper_1 = require("../../specify-time-modal/SpecifyTimeModal.helper");
var PIBSpecifyTimeModalModel = (function (_super) {
    __extends(PIBSpecifyTimeModalModel, _super);
    function PIBSpecifyTimeModalModel(component) {
        _super.call(this);
        this.component = component;
    }
    PIBSpecifyTimeModalModel.prototype.timeSelected = function () {
        var cd = this.component.data.tmpShipping;
        cd.pib_specifyTime = SpecifyTimeModal_helper_1.SpecifyTimeModalHelper.getSpecifyTimeName(cd.stm_pattern, cd.stm_hour, cd.stm_minute);
    };
    PIBSpecifyTimeModalModel.PROVIDER = "SpecifyTimeModal";
    return PIBSpecifyTimeModalModel;
}(SpecifyTimeModal_model_1.SpecifyTimeModalModel));
exports.PIBSpecifyTimeModalModel = PIBSpecifyTimeModalModel;
//# sourceMappingURL=PIBSpecifyTimeModal.model.js.map