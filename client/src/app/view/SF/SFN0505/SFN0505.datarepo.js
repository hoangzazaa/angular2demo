"use strict";
var data_util_1 = require("../../../util/data-util");
var SFN0505_constants_1 = require("./SFN0505.constants");
var SFN0505DataRepo = (function () {
    function SFN0505DataRepo() {
        // data map
        this.dataRepo = {};
    }
    //region user: departmentid - user[]
    SFN0505DataRepo.prototype.getUsers = function (departmentId) {
        return data_util_1.default.getData(this.dataRepo, [], SFN0505_constants_1.SFN0505Constants.MAP_DEPARTMENT, departmentId);
    };
    SFN0505DataRepo.prototype.addUser = function (user, departmentId) {
        var users = data_util_1.default.getData(this.dataRepo, undefined, SFN0505_constants_1.SFN0505Constants.MAP_DEPARTMENT, departmentId);
        if (users == undefined) {
            users = [];
            data_util_1.default.pushData(this.dataRepo, users, departmentId, SFN0505_constants_1.SFN0505Constants.MAP_DEPARTMENT);
        }
        users.push(user);
    };
    return SFN0505DataRepo;
}());
exports.SFN0505DataRepo = SFN0505DataRepo;
//# sourceMappingURL=SFN0505.datarepo.js.map