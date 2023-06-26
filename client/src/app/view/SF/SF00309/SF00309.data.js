"use strict";
var SF00309Data = (function () {
    function SF00309Data() {
        /*list model productBox*/
        this.productBoxs = [];
        /*check update data*/
        this.isUpdated = false;
        this.userDepartments = [];
        //search add pic
        this.userPicModals = [];
        //end search add pic
        this.mstLaminations = [];
    }
    Object.defineProperty(SF00309Data.prototype, "checkEnabled", {
        /*check enabled request*/
        get: function () {
            if (!!this.productBoxs) {
                var index = this.productBoxs.findIndex(function (item) { return item.checked; });
                return index >= 0;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00309Data.prototype, "selectedProducts", {
        get: function () {
            return (this.productBoxs || []).filter(function (item) { return item.checked; }).map(function (item) { return item.product; });
        },
        enumerable: true,
        configurable: true
    });
    SF00309Data.prototype.changeEditData = function () {
        this.isUpdated = true;
    };
    return SF00309Data;
}());
exports.SF00309Data = SF00309Data;
//# sourceMappingURL=SF00309.data.js.map