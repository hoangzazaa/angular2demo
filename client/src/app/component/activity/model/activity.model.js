"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var constants_1 = require("../../../helper/constants");
var BaseModel_model_1 = require("../../../model/core/BaseModel.model");
var Activity = (function (_super) {
    __extends(Activity, _super);
    function Activity() {
        _super.apply(this, arguments);
    }
    Activity.prototype.setComment = function (data) {
        if (!data)
            return;
        //set basic info & binding value to properties
        this.setData(data);
        this.value = data["value"];
        this.userId = data["userId"];
        this.dealId = data["dealId"];
        this.username = (data["departmentName"] == undefined ? '' : data["departmentName"] + constants_1.Constants.SLASH_JP) + data["username"];
    };
    return Activity;
}(BaseModel_model_1.BaseModel));
exports.Activity = Activity;
//# sourceMappingURL=activity.model.js.map