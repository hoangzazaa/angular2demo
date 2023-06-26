"use strict";
var constants_1 = require("../../../../helper/constants");
var SF00205_Filter_model_1 = require("./SF00205_Filter.model");
/**
 * Created by manhnv on 6/20/2017.
 */
var SF00205Request = (function () {
    function SF00205Request() {
        this.indexFrom = constants_1.Constants.ZERO;
        this.indexTo = constants_1.Constants.PAGE_SIZE;
        this.filter = new SF00205_Filter_model_1.SF00205Filter();
    }
    return SF00205Request;
}());
exports.SF00205Request = SF00205Request;
//# sourceMappingURL=SF00205_Request.model.js.map