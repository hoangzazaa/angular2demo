"use strict";
var SF00502_constants_1 = require("./SF00502.constants");
var data_util_1 = require("../../../util/data-util");
var SF00502DataRepo = (function () {
    function SF00502DataRepo() {
        // data map
        this.dataRepo = {};
    }
    //region staff: departmentid - staff[]
    SF00502DataRepo.prototype.getStaffs = function (departmentId) {
        return data_util_1.default.getData(this.dataRepo, [], SF00502_constants_1.SF00502Constants.MAP_DEPARTMENT, departmentId);
    };
    SF00502DataRepo.prototype.addStaff = function (staff, departmentId) {
        var staffs = data_util_1.default.getData(this.dataRepo, undefined, SF00502_constants_1.SF00502Constants.MAP_DEPARTMENT, departmentId);
        if (staffs == undefined) {
            staffs = [];
            data_util_1.default.pushData(this.dataRepo, staffs, departmentId, SF00502_constants_1.SF00502Constants.MAP_DEPARTMENT);
        }
        staffs.push(staff);
    };
    //endregion
    //region summary: year - month - staffId - note
    SF00502DataRepo.prototype.getSummary = function (year, month, staffId) {
        return data_util_1.default.getData(this.dataRepo, undefined, SF00502_constants_1.SF00502Constants.MAP_SUMMARY, year, month, staffId);
    };
    SF00502DataRepo.prototype.setSummary = function (summary, year, month, staffId) {
        data_util_1.default.pushData(this.dataRepo, summary, staffId, SF00502_constants_1.SF00502Constants.MAP_SUMMARY, year, month);
    };
    //endregion
    //region increase customers: year - month - staffId - note[]
    SF00502DataRepo.prototype.getIncreaseCustomers = function (year, month, staffId) {
        var list = data_util_1.default.getData(this.dataRepo, undefined, SF00502_constants_1.SF00502Constants.MAP_CUSTOMER_INCREASE, year, month, staffId);
        if (list == undefined) {
            return [];
        }
        else {
            return list;
        }
    };
    SF00502DataRepo.prototype.setIncreaseCustomers = function (notes, year, month, staffId) {
        data_util_1.default.pushData(this.dataRepo, notes, staffId, SF00502_constants_1.SF00502Constants.MAP_CUSTOMER_INCREASE, year, month);
    };
    //endregion
    //region decrease customers: year - month - staffId - note[]
    SF00502DataRepo.prototype.getDecreaseCustomers = function (year, month, staffId) {
        var list = data_util_1.default.getData(this.dataRepo, undefined, SF00502_constants_1.SF00502Constants.MAP_CUSTOMER_DECREASE, year, month, staffId);
        if (list == undefined) {
            return [];
        }
        else {
            return list;
        }
    };
    SF00502DataRepo.prototype.setDecreaseCustomers = function (notes, year, month, staffId) {
        data_util_1.default.pushData(this.dataRepo, notes, staffId, SF00502_constants_1.SF00502Constants.MAP_CUSTOMER_DECREASE, year, month);
    };
    //endregion
    //region staff customer: staffId - customer[]
    SF00502DataRepo.prototype.getCustomers = function (staffId) {
        var list = data_util_1.default.getData(this.dataRepo, undefined, SF00502_constants_1.SF00502Constants.MAP_STAFF_CUSTOMER, staffId);
        if (list == undefined) {
            return [];
        }
        else {
            return list;
        }
    };
    SF00502DataRepo.prototype.addCustomer = function (customer, staffId) {
        var customers = data_util_1.default.getData(this.dataRepo, undefined, SF00502_constants_1.SF00502Constants.MAP_STAFF_CUSTOMER, staffId);
        if (customers == undefined) {
            customers = [];
            data_util_1.default.pushData(this.dataRepo, customers, staffId, SF00502_constants_1.SF00502Constants.MAP_STAFF_CUSTOMER);
        }
        customers.push(customer);
    };
    //endregion
    //region customerId customer: customerId - customer
    SF00502DataRepo.prototype.getCustomer = function (customerId) {
        return data_util_1.default.getData(this.dataRepo, undefined, SF00502_constants_1.SF00502Constants.MAP_CUSTOMER, customerId);
    };
    SF00502DataRepo.prototype.setCustomer = function (customer, customerId) {
        data_util_1.default.pushData(this.dataRepo, customer, customerId, SF00502_constants_1.SF00502Constants.MAP_CUSTOMER);
    };
    //endregion
    //region customer note: year - month - customerId - note
    SF00502DataRepo.prototype.getCustomerNote = function (year, month, customerId) {
        return data_util_1.default.getData(this.dataRepo, undefined, SF00502_constants_1.SF00502Constants.MAP_CUSTOMER_NOTE, year, month, customerId);
    };
    SF00502DataRepo.prototype.setCustomerNote = function (note, year, month, customerId) {
        data_util_1.default.pushData(this.dataRepo, note, customerId, SF00502_constants_1.SF00502Constants.MAP_CUSTOMER_NOTE, year, month);
    };
    SF00502DataRepo.prototype.getCustomerNotes = function (year, month) {
        var notes = [];
        var noteMap = data_util_1.default.getData(this.dataRepo, undefined, SF00502_constants_1.SF00502Constants.MAP_CUSTOMER_NOTE, year, month);
        if (noteMap != undefined) {
            for (var customerId in noteMap) {
                var note = noteMap[customerId];
                notes.push(note);
            }
        }
        return notes;
    };
    //endregion
    // clear department data
    SF00502DataRepo.prototype.clearDepartmentData = function () {
        // clear summary
        data_util_1.default.pushData(this.dataRepo, undefined, SF00502_constants_1.SF00502Constants.MAP_SUMMARY);
        // clear increase customers
        data_util_1.default.pushData(this.dataRepo, undefined, SF00502_constants_1.SF00502Constants.MAP_CUSTOMER_INCREASE);
        // clear decrease customers
        data_util_1.default.pushData(this.dataRepo, undefined, SF00502_constants_1.SF00502Constants.MAP_CUSTOMER_DECREASE);
        // clear staff
        data_util_1.default.pushData(this.dataRepo, undefined, SF00502_constants_1.SF00502Constants.MAP_STAFF_CUSTOMER);
        // clear customer
        data_util_1.default.pushData(this.dataRepo, undefined, SF00502_constants_1.SF00502Constants.MAP_CUSTOMER);
        // clear customer note
        data_util_1.default.pushData(this.dataRepo, undefined, SF00502_constants_1.SF00502Constants.MAP_CUSTOMER_NOTE);
    };
    return SF00502DataRepo;
}());
exports.SF00502DataRepo = SF00502DataRepo;
//# sourceMappingURL=SF00502.datarepo.js.map