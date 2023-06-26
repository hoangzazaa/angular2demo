"use strict";
var ShippingDestinationModalHelper = (function () {
    function ShippingDestinationModalHelper() {
    }
    ShippingDestinationModalHelper.getDestinationExt = function (code) {
        if (code == undefined) {
            return "-";
        }
        else if (code.length == 7) {
            return "000";
        }
        else if (code.length == 10) {
            return code.substr(7);
        }
        else {
            return code;
        }
    };
    ShippingDestinationModalHelper.getDestinationName = function (ext, name) {
        var nameStr = "";
        if (ext != undefined) {
            nameStr += ext + ": ";
        }
        if (name != undefined) {
            nameStr += name;
        }
        return nameStr;
    };
    return ShippingDestinationModalHelper;
}());
exports.ShippingDestinationModalHelper = ShippingDestinationModalHelper;
//# sourceMappingURL=ShippingDestinationModal.helper.js.map