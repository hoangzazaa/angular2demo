/**
 * Contain paste master data used for simulation
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
var MstPaste = (function (_super) {
    __extends(MstPaste, _super);
    function MstPaste() {
        _super.apply(this, arguments);
    }
    MstPaste.prototype.setMstPaste = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.paperType = data["paperType"];
        this.form = data["form"];
        this.blankSize = data["blankSize"];
        this.basicCost = data["basicCost"];
        this.throughWage = data["throughWage"];
    };
    return MstPaste;
}(BaseModel_model_1.BaseModel));
exports.MstPaste = MstPaste;
//# sourceMappingURL=MstPaste.model.js.map