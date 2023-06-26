"use strict";
var SF00307Data = (function () {
    function SF00307Data() {
    }
    Object.defineProperty(SF00307Data.prototype, "hasAtLeastOneProductChecked", {
        get: function () {
            return (this.productBoxs || []).find(function (item) { return item.checked; }) != null;
        },
        enumerable: true,
        configurable: true
    });
    return SF00307Data;
}());
exports.SF00307Data = SF00307Data;
//# sourceMappingURL=SF00307.data.js.map