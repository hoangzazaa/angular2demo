"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
/**
 * Contain customer address
 * @author vupt
 */
var ShippingDestinationModel = (function (_super) {
    __extends(ShippingDestinationModel, _super);
    function ShippingDestinationModel() {
        _super.apply(this, arguments);
        this.saveToDennoFlag = 0;
        this.defaultFlag = 0;
    }
    Object.defineProperty(ShippingDestinationModel.prototype, "selectName", {
        get: function () {
            return ("000" + this.id).slice(-3) + "：" + this.abbreviation;
        },
        enumerable: true,
        configurable: true
    });
    ShippingDestinationModel.prototype.setShippingDestination = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.deliveryName = data["deliveryName"];
        this.deliveryAddress1 = data["deliveryAddress1"];
        this.tel = data["tel"];
        this.fax = data["fax"];
        this.availableVehicleSize = data["availableVehicleSize"];
        this.requiredTime = data["requiredTime"];
        this.extraWork = data["extraWork"];
        this.extraMethod = data["extraMethod"];
        this.memo1 = !!data["memo2"] ? (data["memo1"] || "") + "\n" + (data["memo2"]) : data["memo1"] || "";
        this.saveToDennoFlag = data["saveToDennoFlag"];
        this.customerId = data["customerId"];
        this.districtCode = data["districtCode"];
        this.abbreviation = data["abbreviation"];
        this.furigana = data["furigana"];
        this.abbrFurigana = data["abbrFurigana"];
        this.postalCode = data["postalCode"];
        this.deliveryAddress2 = data["deliveryAddress2"];
        this.extension = data["extension"];
        this.timePermission = data["timePermission"];
        this.defaultFlag = data["defaultFlag"];
        this.dennoPartnerCode = data["dennoPartnerCode"];
        this.deptName = data["deptName"];
        this.salerName = data["salerName"];
        this.formNameId = data["formNameId"];
    };
    return ShippingDestinationModel;
}(BaseModel_model_1.BaseModel));
exports.ShippingDestinationModel = ShippingDestinationModel;
//# sourceMappingURL=ShippingDestination.model.js.map