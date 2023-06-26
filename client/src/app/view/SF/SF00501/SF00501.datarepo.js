"use strict";
var data_util_1 = require("../../../util/data-util");
var SF00501_constants_1 = require("./SF00501.constants");
var SF00501DataRepo = (function () {
    function SF00501DataRepo() {
        // data map
        this.dataRepo = {};
    }
    //region staff: departmentid - staff[]
    SF00501DataRepo.prototype.getStaffs = function (departmentId) {
        return data_util_1.default.getData(this.dataRepo, [], SF00501_constants_1.SF00501Constants.MAP_DEPARTMENT_STAFF, departmentId);
    };
    SF00501DataRepo.prototype.addStaff = function (staff, departmentId) {
        var staffs = data_util_1.default.getData(this.dataRepo, undefined, SF00501_constants_1.SF00501Constants.MAP_DEPARTMENT_STAFF, departmentId);
        if (staffs == undefined) {
            staffs = [];
            data_util_1.default.pushData(this.dataRepo, staffs, departmentId, SF00501_constants_1.SF00501Constants.MAP_DEPARTMENT_STAFF);
        }
        staffs.push(staff);
    };
    //endregion
    //region staff: dateUnit - SelectDate[]
    SF00501DataRepo.prototype.getSelectDates = function (dateUnit) {
        var list = data_util_1.default.getData(this.dataRepo, undefined, SF00501_constants_1.SF00501Constants.MAP_DATE_SELECT, dateUnit);
        if (list == undefined) {
            return [];
        }
        else {
            return list;
        }
    };
    SF00501DataRepo.prototype.setSelectDates = function (notes, dateUnit) {
        data_util_1.default.pushData(this.dataRepo, notes, dateUnit, SF00501_constants_1.SF00501Constants.MAP_DATE_SELECT);
    };
    //endregion
    //region staff: departmentid - DepartmentModel
    SF00501DataRepo.prototype.getAgent = function (agentId) {
        return data_util_1.default.getData(this.dataRepo, undefined, SF00501_constants_1.SF00501Constants.MAP_AGENT, agentId);
    };
    SF00501DataRepo.prototype.setAgent = function (agent, agentId) {
        data_util_1.default.pushData(this.dataRepo, agent, agentId, SF00501_constants_1.SF00501Constants.MAP_AGENT);
    };
    SF00501DataRepo.prototype.clearAgents = function () {
        data_util_1.default.pushData(this.dataRepo, undefined, SF00501_constants_1.SF00501Constants.MAP_AGENT);
    };
    return SF00501DataRepo;
}());
exports.SF00501DataRepo = SF00501DataRepo;
//# sourceMappingURL=SF00501.datarepo.js.map