"use strict";
var constants_1 = require("../../../helper/constants");
var message_1 = require("../../../helper/message");
var Mail_model_1 = require("../../../model/common/Mail.model");
var DealModel_1 = require("../COMMON/dealinfo/model/DealModel");
var DepartmentModel_1 = require("../COMMON/model/DepartmentModel");
var UserModel_1 = require("../COMMON/model/UserModel");
var format_util_1 = require("../../../util/format-util");
var SF00306Helper = (function () {
    function SF00306Helper() {
    }
    SF00306Helper.cloneMailModel = function (email) {
        var mail = new Mail_model_1.MailModel();
        mail.addressTo = email.addressTo.map(function (item) { return item; });
        mail.addressCc = email.addressCc.map(function (item) { return item; });
        mail.content = email.content;
        mail.subject = email.subject;
        return mail;
    };
    SF00306Helper.indexItem = function (users, user) {
        var index = null;
        if (users) {
            index = users.findIndex(function (item) {
                return item.id == user.id;
            });
        }
        return index;
    };
    SF00306Helper.cloneDepartmentModel = function (departments) {
        var departmentNews = [];
        if (!!departments) {
            departments.forEach(function (department) {
                var departmentModel = new DepartmentModel_1.DepartmentModel();
                departmentModel.id = department.id;
                departmentModel.department = department.department;
                departmentModel.mailGroupFlag = department.mailGroupFlag;
                // clone users
                if (department.users) {
                    departmentModel.users = SF00306Helper.cloneUserModel(department.users);
                }
                departmentNews.push(departmentModel);
            });
        }
        return departmentNews;
    };
    SF00306Helper.cloneUserModel = function (userModels) {
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
    SF00306Helper.updateMailContent = function (dealInfo, products) {
        if (dealInfo === void 0) { dealInfo = new DealModel_1.DealInfoModel(); }
        if (products === void 0) { products = []; }
        var newContent = "";
        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            var numberColor = format_util_1.FormatUtil.formatColorsViaPrintMethod(product);
            newContent += "\n(" + (i + 1) + ")\n" + "製品：" + product.productName
                + "\n使用色数：" + (numberColor != "印刷なし" ? numberColor : "なし")
                + "\nロット数：" + (product.requestLot != undefined ? product.requestLot : "")
                + "\n品目C：XXXXXXX （" + product.productCode + "の製品番号）\n";
        }
        var location = window.location.origin + "/home/deal/" + dealInfo.dealCode;
        return message_1.default.get(message_1.MSG.SF00306.BODY_MAIL_CONTENT, dealInfo.saleName, dealInfo.dealCode, dealInfo.dealName, dealInfo.customerCode, dealInfo.customerName, newContent, moment(dealInfo.deliveryDate).format(constants_1.Constants.DEFAULT_DATE_FORMAT), location);
    };
    return SF00306Helper;
}());
exports.SF00306Helper = SF00306Helper;
//# sourceMappingURL=SF00306.helper.js.map