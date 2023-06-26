"use strict";
var Mail_model_1 = require("../../../model/common/Mail.model");
// import {RequestModel} from "./model/request.model";
var UserModel_1 = require("../COMMON/model/UserModel");
var DepartmentModel_1 = require("../COMMON/model/DepartmentModel");
/**
 * Created by ASUS on 5/8/2017.
 */
var SF00309Helper = (function () {
    function SF00309Helper() {
    }
    /*method static calculator and cloneObject*/
    SF00309Helper.cloneMailModel = function (email) {
        var mail = new Mail_model_1.MailModel();
        mail.addressTo = email.addressTo.map(function (item) { return item; });
        mail.addressCc = email.addressCc.map(function (item) { return item; });
        mail.content = email.content;
        mail.subject = email.subject;
        return mail;
    };
    // static cloneRequestModel(newRequestModel: RequestModel) {
    //     let requestModel = new RequestModel();
    //
    //     requestModel.packagingClassification = newRequestModel.packagingClassification;
    //     requestModel.inclusion               = newRequestModel.inclusion;
    //     requestModel.inclusion_text          = newRequestModel.inclusion_text;
    //     requestModel.other                   = newRequestModel.other;
    //     requestModel.endUser                 = newRequestModel.endUser;
    //     requestModel.preservationMethod      = newRequestModel.preservationMethod;
    //     requestModel.distributionRange       = newRequestModel.distributionRange;
    //     requestModel.includedWeightPerUnit   = newRequestModel.includedWeightPerUnit;
    //     requestModel.includedCount           = newRequestModel.includedCount;
    //     requestModel.salesEstimate           = newRequestModel.salesEstimate;
    //     requestModel.contactState            = newRequestModel.contactState;
    //     requestModel.material                = newRequestModel.material;
    //     requestModel.fillingMethod           = newRequestModel.fillingMethod;
    //     requestModel.material_other          = newRequestModel.material_other;
    //     requestModel.simultaneousRequestFax  = newRequestModel.simultaneousRequestFax;
    //     requestModel.simultaneousRequestPDF  = newRequestModel.simultaneousRequestPDF;
    //     requestModel.simultaneousRequestEPS  = newRequestModel.simultaneousRequestEPS;
    //     requestModel.simultaneousRequestDXF  = newRequestModel.simultaneousRequestDXF;
    //     requestModel.deliveryDate            = newRequestModel.deliveryDate;
    //     requestModel.desired                 = newRequestModel.desired;
    //     requestModel.desiredNumber           = newRequestModel.desiredNumber;
    //     requestModel.memo                    = newRequestModel.memo;
    //     requestModel.directDestination       = newRequestModel.directDestination;
    //
    //     return requestModel;
    // }
    SF00309Helper.indexItem = function (users, user) {
        var index = null;
        if (users) {
            index = users.findIndex(function (item) {
                return item.id == user.id;
            });
        }
        return index;
    };
    SF00309Helper.cloneDepartmentModel = function (departments) {
        var departmentNews = [];
        if (!!departments) {
            departments.forEach(function (department) {
                var departmentModel = new DepartmentModel_1.DepartmentModel();
                departmentModel.id = department.id;
                departmentModel.department = department.department;
                departmentModel.mailGroupFlag = department.mailGroupFlag;
                // clone users
                if (department.users) {
                    departmentModel.users = SF00309Helper.cloneUserModel(department.users);
                }
                departmentNews.push(departmentModel);
            });
        }
        return departmentNews;
    };
    SF00309Helper.cloneUserModel = function (userModels) {
        var userNews = [];
        if (!!userModels) {
            userModels.forEach(function (user) {
                var userModel = new UserModel_1.UserModel();
                userModel.id = user.id;
                userModel.username = user.username;
                userModel.departmentId = user.departmentId;
                userModel.email = user.email;
                userNews.push(userModel);
            });
        }
        return userNews;
    };
    return SF00309Helper;
}());
exports.SF00309Helper = SF00309Helper;
//# sourceMappingURL=SF00309.helper.js.map