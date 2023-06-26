"use strict";
var math_util_1 = require("../../../util/math-util");
/**
 * Created by hoangtd on 9/25/2017.
 */
var SF00503Helper = (function () {
    function SF00503Helper() {
    }
    SF00503Helper.convertYenToThousanYen = function (value) {
        return math_util_1.default.round(value / 1000, 0);
    };
    return SF00503Helper;
}());
exports.SF00503Helper = SF00503Helper;
//# sourceMappingURL=SF00503.helper.js.map