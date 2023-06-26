"use strict";
var data_util_1 = require("../../../util/data-util");
var SFN0504_constants_1 = require("./SFN0504.constants");
var SFN0504DataRepo = (function () {
    function SFN0504DataRepo() {
        // data map
        this.dataRepo = {};
    }
    //region user: departmentid - user[]
    SFN0504DataRepo.prototype.getUsers = function (departmentId) {
        return data_util_1.default.getData(this.dataRepo, [], SFN0504_constants_1.SFN0504Constants.MAP_DEPARTMENT, departmentId);
    };
    SFN0504DataRepo.prototype.addUser = function (user, departmentId) {
        var users = data_util_1.default.getData(this.dataRepo, undefined, SFN0504_constants_1.SFN0504Constants.MAP_DEPARTMENT, departmentId);
        if (users == undefined) {
            users = [];
            data_util_1.default.pushData(this.dataRepo, users, departmentId, SFN0504_constants_1.SFN0504Constants.MAP_DEPARTMENT);
        }
        users.push(user);
    };
    return SFN0504DataRepo;
}());
exports.SFN0504DataRepo = SFN0504DataRepo;
//# sourceMappingURL=SFN0504.datarepo.js.map