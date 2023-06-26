"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
var MstLamination = (function (_super) {
    __extends(MstLamination, _super);
    function MstLamination() {
        _super.apply(this, arguments);
    }
    MstLamination.prototype.setMstLamination = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.paperName = data["paperName"];
        this.weight = data["weight"];
        this.paperMaterialCode = data["paperMaterialCode"];
        this.paperCode = data["paperCode"];
        this.commonFlag = data["commonFlag"];
        this.abbr = data["abbr"];
        this.sagaNormValue = data["sagaNormValue"];
        this.sagaHeadValue = data["sagaHeadValue"];
        this.onoNormValue = data["onoNormValue"];
        this.onoHeadValue = data["onoHeadValue"];
        this.takuNormValue = data["takuNormValue"];
        this.takuHeadValue = data["takuHeadValue"];
        this.materialName = data["materialName"];
        this.paperId = data["paperId"];
    };
    return MstLamination;
}(BaseModel_model_1.BaseModel));
exports.MstLamination = MstLamination;
//# sourceMappingURL=MstLamination.model.js.map