"use strict";
var data_util_1 = require("../../../util/data-util");
var SFN0506_constants_1 = require("./SFN0506.constants");
var SFN0506DataRepo = (function () {
    function SFN0506DataRepo() {
        // data map
        this.dataRepo = {};
    }
    //region user: departmentid - user[]
    SFN0506DataRepo.prototype.getUsers = function (departmentId) {
        return data_util_1.default.getData(this.dataRepo, [], SFN0506_constants_1.SFN0506Constants.MAP_DEPARTMENT, departmentId);
    };
    SFN0506DataRepo.prototype.addUser = function (user, departmentId) {
        var users = data_util_1.default.getData(this.dataRepo, undefined, SFN0506_constants_1.SFN0506Constants.MAP_DEPARTMENT, departmentId);
        if (users == undefined) {
            users = [];
            data_util_1.default.pushData(this.dataRepo, users, departmentId, SFN0506_constants_1.SFN0506Constants.MAP_DEPARTMENT);
        }
        users.push(user);
    };
    return SFN0506DataRepo;
}());
exports.SFN0506DataRepo = SFN0506DataRepo;
//# sourceMappingURL=SFN0506.datarepo.js.map