"use strict";
var constants_1 = require("../../helper/constants");
var validator_util_1 = require("../../util/validator-util");
/**
 * Contain common columns used in all table
 * @author vupt
 */
var BaseModel = (function () {
    function BaseModel() {
    }
    BaseModel.prototype.setData = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = !!data["createdDate"] ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = !!data["updatedDate"] ? new Date(data["updatedDate"]) : undefined;
    };
    /* get updatedDate, if updatedDate not defined then get createdDate else get updatedDate*/
    BaseModel.prototype.getUpdatedDate = function (pattern) {
        var date = this.updatedDate;
        if (date === undefined)
            date = this.createdDate;
        //new Date(date).toISOString().slice(0, 10);
        return moment(date).format(validator_util_1.default.isNotEmpty(pattern) ? pattern : constants_1.Constants.DEFAULT_DATE_FORMAT);
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;
//# sourceMappingURL=BaseModel.model.js.map