"use strict";
var data_util_1 = require("../../../util/data-util");
var SFN0307_constants_1 = require("./SFN0307.constants");
var SFN0307DataRepo = (function () {
    function SFN0307DataRepo() {
        // data map
        this.dataRepo = {};
    }
    //region staff: departmentid - staff[]
    SFN0307DataRepo.prototype.getOrder = function (productId) {
        return data_util_1.default.getData(this.dataRepo, undefined, SFN0307_constants_1.SFN0307Constants.MAP_ORDER, productId);
    };
    SFN0307DataRepo.prototype.setOrder = function (orderItem, productId) {
        data_util_1.default.pushData(this.dataRepo, orderItem, productId, SFN0307_constants_1.SFN0307Constants.MAP_ORDER);
    };
    SFN0307DataRepo.prototype.clearOrder = function () {
        data_util_1.default.pushData(this.dataRepo, undefined, SFN0307_constants_1.SFN0307Constants.MAP_ORDER);
    };
    SFN0307DataRepo.prototype.getProduct = function (productId) {
        return data_util_1.default.getData(this.dataRepo, undefined, SFN0307_constants_1.SFN0307Constants.MAP_PRODUCT, productId);
    };
    SFN0307DataRepo.prototype.setProduct = function (product, productId) {
        data_util_1.default.pushData(this.dataRepo, product, productId, SFN0307_constants_1.SFN0307Constants.MAP_PRODUCT);
    };
    return SFN0307DataRepo;
}());
exports.SFN0307DataRepo = SFN0307DataRepo;
//# sourceMappingURL=SFN0307.datarepo.js.map