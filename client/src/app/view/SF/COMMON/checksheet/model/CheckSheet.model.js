"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../../model/core/BaseModel.model");
var CheckSheetModel = (function (_super) {
    __extends(CheckSheetModel, _super);
    function CheckSheetModel() {
        _super.apply(this, arguments);
    }
    CheckSheetModel.prototype.setCheckSheet = function (data) {
        if (!data)
            return;
        //set basic info & binding value to properties
        this.setData(data);
        this.questionCode = data["questionCode"];
        this.textArea1 = data["textArea1"];
        this.textArea2 = data["textArea2"];
        this.radioButton = data["radioButton"];
        this.selectBox1 = data["selectBox1"];
        this.selectBox2 = data["selectBox2"];
        this.selectBox3 = data["selectBox3"];
        this.dealId = data["dealId"];
        this.checkBox1 = data["checkBox1"];
        this.checkBox2 = data["checkBox2"];
        this.checkBox3 = data["checkBox3"];
    };
    return CheckSheetModel;
}(BaseModel_model_1.BaseModel));
exports.CheckSheetModel = CheckSheetModel;
//# sourceMappingURL=CheckSheet.model.js.map