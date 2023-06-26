/**
 * Contain customer address
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Customer_model_1 = require('./Customer.model');
var BaseModel_model_1 = require("./BaseModel.model");
var ShippingDestinationImage_model_1 = require('./ShippingDestinationImage.model');
var ShippingDestination = (function (_super) {
    __extends(ShippingDestination, _super);
    function ShippingDestination() {
        _super.apply(this, arguments);
    }
    ShippingDestination.prototype.setShippingDestination = function (data) {
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
        this.memo1 = data["memo1"];
        this.memo2 = data["memo2"];
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
        this.specifyTime = data["specifyTime"];
        this.specifyTimeHour = data["specifyTimeHour"];
        this.specifyTimeMinute = data["specifyTimeMinute"];
        this.specifyTimePeriod = data["specifyTimePeriod"];
        if (data["customer"] !== undefined) {
            this.customer = new Customer_model_1.Customer();
            this.customer.setCustomer(data["customer"]);
        }
        // ShippingDestinationDetailJson 分
        this.deliveryCompany = data["deliveryCompany"];
        this.specifyVehicle = data["specifyVehicle"];
        this.specifyVehicleOthers = data["specifyVehicleOthers"];
        this.deliveryTime = data["deliveryTime"];
        this.telBeforeDelivery = data["telBeforeDelivery"];
        this.attachmentEbo = data["attachmentEbo"];
        this.deliveryInCaseOfBadWeather = data["deliveryInCaseOfBadWeather"];
        this.stretchFilm = data["stretchFilm"];
        this.upstairs = data["upstairs"];
        this.upstairsDetail = data["upstairsDetail"];
        this.upstairsDetailOthers = data["upstairsDetailOthers"];
        this.paletteDelivery = data["paletteDelivery"];
        this.paletteTakeBack = data["paletteTakeBack"];
        this.limitQuantity = data["limitQuantity"];
        this.unloadingPlace = data["unloadingPlace"];
        this.parkingPlace = data["parkingPlace"];
        this.liftUserInUnloading = data["liftUserInUnloading"];
        this.unloadForm = data["unloadForm"];
        this.attention = data["attention"];
        if (data["imageList"]) {
            this.imageList
                = data["imageList"]
                    .map(function (imageJson) {
                    var model = new ShippingDestinationImage_model_1.ShippingDestinationImage();
                    model.setShippingDestinationImage(imageJson);
                    return model;
                });
        }
        else {
            this.imageList = [];
        }
    };
    /**
     * JSON 形式に変換する
     */
    ShippingDestination.prototype.toShippingDestinationDetailJson = function () {
        return {
            // BaseJson
            id: this.id,
            createdUser: null,
            updatedUser: null,
            createdDate: null,
            updatedDate: null,
            // SimpleShippingDestinationJson
            deliveryName: this.deliveryName,
            // ShippingDestinationJson
            deliveryAddress1: this.deliveryAddress1,
            tel: this.tel,
            fax: this.fax,
            availableVehicleSize: this.availableVehicleSize,
            extraWork: this.extraWork,
            extraMethod: this.extraMethod,
            memo1: this.memo1,
            memo2: this.memo2,
            customerId: this.customerId,
            districtCode: this.districtCode,
            abbreviation: this.abbreviation,
            furigana: this.furigana,
            abbrFurigana: this.abbrFurigana,
            postalCode: this.postalCode,
            deliveryAddress2: this.deliveryAddress2,
            extension: this.extension,
            defaultFlag: this.defaultFlag != null && this.defaultFlag != undefined ? String(this.defaultFlag) : null,
            dennoPartnerCode: this.dennoPartnerCode,
            customer: null,
            deptName: null,
            salerName: null,
            specifyTime: this.specifyTime,
            specifyTimeHour: this.specifyTimeHour,
            specifyTimeMinute: this.specifyTimeMinute,
            specifyTimePeriod: this.specifyTimePeriod,
            // ShippingDestinationDetailJson
            deliveryCompany: this.deliveryCompany,
            specifyVehicle: this.specifyVehicle,
            specifyVehicleOthers: this.specifyVehicleOthers,
            deliveryTime: this.deliveryTime,
            telBeforeDelivery: this.telBeforeDelivery,
            attachmentEbo: this.attachmentEbo,
            deliveryInCaseOfBadWeather: this.deliveryInCaseOfBadWeather,
            stretchFilm: this.stretchFilm,
            upstairs: this.upstairs,
            upstairsDetail: this.upstairsDetail,
            upstairsDetailOthers: this.upstairsDetailOthers,
            paletteDelivery: this.paletteDelivery,
            paletteTakeBack: this.paletteTakeBack,
            limitQuantity: this.limitQuantity,
            unloadingPlace: this.unloadingPlace,
            parkingPlace: this.parkingPlace,
            liftUserInUnloading: this.liftUserInUnloading,
            unloadForm: this.unloadForm,
            attention: this.attention,
            imageList: this.imageList
                ? this.imageList.map(function (image) { return image.toShippingDestinationImageJson(); })
                : null
        };
    };
    return ShippingDestination;
}(BaseModel_model_1.BaseModel));
exports.ShippingDestination = ShippingDestination;
//# sourceMappingURL=ShippingDestination.model.js.map