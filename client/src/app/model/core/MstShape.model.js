/**
 * Contain
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
var MstShape = (function (_super) {
    __extends(MstShape, _super);
    function MstShape() {
        _super.apply(this, arguments);
    }
    MstShape.prototype.setMstShape = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.name = data["name"];
        this.note = data["note"];
        this.width = data["width"];
        this.height = data["height"];
        this.depth = data["depth"];
        this.flap = data["flap"];
        this.insertion = data["insertion"];
        this.grain = data["grain"];
        this.developmentWidth = data["developmentWidth"];
        this.developmentHeight = data["developmentHeight"];
        this.minWidth = data["minWidth"];
        this.minHeight = data["minHeight"];
        this.maxWidth = data["maxWidth"];
        this.maxHeight = data["maxHeight"];
        this.minDepth = data["minDepth"];
        this.maxDepth = data["maxDepth"];
        this.fileId = data["fileId"];
    };
    return MstShape;
}(BaseModel_model_1.BaseModel));
exports.MstShape = MstShape;
//# sourceMappingURL=MstShape.model.js.map