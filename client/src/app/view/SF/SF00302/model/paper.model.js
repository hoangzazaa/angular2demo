"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
var MstSheetSize_model_1 = require('../../../../model/core/MstSheetSize.model');
/**
 * Created by hoangtd on 4/22/2017.
 */
var PaperModel = (function (_super) {
    __extends(PaperModel, _super);
    function PaperModel() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PaperModel.prototype, "paper2903", {
        /**
         * 特殊原紙かどうか
         *
         * @return true: 特殊原紙, false: 一般原紙
         */
        get: function () {
            if (!!this.paperSizeW && !!this.paperSizeH)
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * MstSheetSize に変換する
     */
    PaperModel.prototype.toMstSheetSize = function () {
        if (!this.paper2903) {
            throw new Error('Invalid usage. Must be special paper.');
        }
        var sheetSize = new MstSheetSize_model_1.MstSheetSize();
        sheetSize.id = this.paperSizeId;
        sheetSize.width = this.paperSizeW;
        sheetSize.height = this.paperSizeH;
        sheetSize.paperId = this.id;
        return sheetSize;
    };
    return PaperModel;
}(BaseModel_model_1.BaseModel));
exports.PaperModel = PaperModel;
//# sourceMappingURL=paper.model.js.map