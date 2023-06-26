"use strict";
var SF00310Data = (function () {
    function SF00310Data() {
        /*check update data*/
        this.isUpdated = false;
        this.userDepartments = [];
        //search add pic
        this.userPicModals = [];
    }
    Object.defineProperty(SF00310Data.prototype, "selectedProducts", {
        //end search add pic
        get: function () {
            return (this.productBoxs || []).filter(function (item) { return item.checked; }).map(function (item) { return item.product; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00310Data.prototype, "checkEnabled", {
        /*check enabled request*/
        get: function () {
            return this.selectedProducts.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    SF00310Data.prototype.changeEditData = function () {
        this.isUpdated = true;
    };
    return SF00310Data;
}());
exports.SF00310Data = SF00310Data;
//# sourceMappingURL=SF00310.data.js.map