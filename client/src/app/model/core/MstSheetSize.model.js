/**
 * Contain master sheet size
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
var MstSheetSize = (function (_super) {
    __extends(MstSheetSize, _super);
    function MstSheetSize() {
        _super.apply(this, arguments);
    }
    MstSheetSize.prototype.setMstSheetSize = function (data) {
        if (!!data) {
            this.setData(data);
            this.name = data["name"];
            this.width = data["width"];
            this.height = data["height"];
            this.paperId = data["paperId"];
            this.paperCode = data["paperCode"];
            this.grain = data["grain"];
            this.popular = data["popular"];
            this.wastePaperFlag = data["wastePaperFlag"];
            this.specialSizeFlag = data["specialSizeFlag"];
        }
    };
    return MstSheetSize;
}(BaseModel_model_1.BaseModel));
exports.MstSheetSize = MstSheetSize;
//# sourceMappingURL=MstSheetSize.model.js.map