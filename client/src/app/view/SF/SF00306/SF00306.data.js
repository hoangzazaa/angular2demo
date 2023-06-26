"use strict";
var SF00306Data = (function () {
    function SF00306Data() {
        // message
        this.messageMail = "";
        this.messageRequest = "";
        this.message = "";
        this.checkSheets = [];
        this.productBoxs = [];
        this.departments = [];
        this.userDepartments = [];
        this.listDepartmentScreen = [];
        this.listPicSearch = [];
        this.listPicScreen = [];
        this.userPicModals = [];
        this.mstLaminations = [];
    }
    Object.defineProperty(SF00306Data.prototype, "selectedProducts", {
        get: function () {
            return (this.productBoxs || []).filter(function (item) { return item.checked; }).map(function (item) { return item.product; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00306Data.prototype, "checkEnabled", {
        get: function () {
            var anyProductbox = (this.productBoxs || []).find(function (item) { return item.checked; });
            return !!anyProductbox;
        },
        enumerable: true,
        configurable: true
    });
    return SF00306Data;
}());
exports.SF00306Data = SF00306Data;
//# sourceMappingURL=SF00306.data.js.map