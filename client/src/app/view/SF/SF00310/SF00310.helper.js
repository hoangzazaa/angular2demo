"use strict";
var Mail_model_1 = require("../../../model/common/Mail.model");
var UserModel_1 = require("../COMMON/model/UserModel");
var DepartmentModel_1 = require("../COMMON/model/DepartmentModel");
/**
 * Created by ASUS on 5/8/2017.
 */
var SF00310Helper = (function () {
    function SF00310Helper() {
    }
    /*method static calculator and cloneObject*/
    SF00310Helper.cloneMailModel = function (email) {
        var mail = new Mail_model_1.MailModel();
        mail.addressTo = email.addressTo.map(function (item) { return item; });
        mail.addressCc = email.addressCc.map(function (item) { return item; });
        mail.content = email.content;
        mail.subject = email.subject;
        return mail;
    };
    SF00310Helper.indexItem = function (users, user) {
        var index = null;
        if (users) {
            index = users.findIndex(function (item) {
                return item.id == user.id;
            });
        }
        return index;
    };
    SF00310Helper.cloneDepartmentModel = function (departments) {
        var departmentNews = [];
        if (!!departments) {
            departments.forEach(function (department) {
                var departmentModel = new DepartmentModel_1.DepartmentModel();
                departmentModel.id = department.id;
                departmentModel.department = department.department;
                departmentModel.mailGroupFlag = department.mailGroupFlag;
                // clone users
                if (department.users) {
                    departmentModel.users = SF00310Helper.cloneUserModel(department.users);
                }
                departmentNews.push(departmentModel);
            });
        }
        return departmentNews;
    };
    SF00310Helper.cloneUserModel = function (userModels) {
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
    return SF00310Helper;
}());
exports.SF00310Helper = SF00310Helper;
//# sourceMappingURL=SF00310.helper.js.map