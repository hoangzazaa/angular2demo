"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var common_service_1 = require("../../../service/common.service");
var Department_model_1 = require("./model/Department.model");
var Staff_model_1 = require("./model/Staff.model");
var Customer_model_1 = require("./model/Customer.model");
var Note_model_1 = require("./model/Note.model");
var Revenue_model_1 = require("./model/Revenue.model");
var date_util_1 = require("../../../util/date-util");
var SF00502_constants_1 = require("./SF00502.constants");
var SF00502_helper_1 = require("./SF00502.helper");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var SF00502Service = (function (_super) {
    __extends(SF00502Service, _super);
    function SF00502Service(http, router) {
        _super.call(this, http, router);
    }
    /**
     * send SF0050201 get request
     * @returns {Promise<TResult>}
     */
    SF00502Service.prototype.sf0050201 = function () {
        var _this = this;
        return this.getApi("/SF0050201").then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // 1. departments
                var departmentList = [];
                _this.pageData.departments = departmentList;
                // 1.1 add all company option
                departmentList.push(SF00502_constants_1.SF00502Constants.OPTION_ALL_COMPANY);
                _this.pageData.dataRepo.addStaff(SF00502_constants_1.SF00502Constants.OPTION_ALL_STAFF, SF00502_constants_1.SF00502Constants.OPTION_ALL_COMPANY.id);
                // 1.2 add data from server
                var departments = data["departments"];
                for (var _i = 0, departments_1 = departments; _i < departments_1.length; _i++) {
                    var deparment = departments_1[_i];
                    var dept = new Department_model_1.DepartmentModel();
                    departmentList.push(dept);
                    // parse department data
                    dept.id = deparment["id"];
                    dept.name = deparment["name"];
                    // update repo: add all_staff option
                    _this.pageData.dataRepo.addStaff(SF00502_constants_1.SF00502Constants.OPTION_ALL_STAFF, dept.id);
                }
                // 2. staffs
                var staffList = [];
                _this.pageData.staffs = staffList;
                var staffs = data["staffs"];
                for (var _a = 0, staffs_1 = staffs; _a < staffs_1.length; _a++) {
                    var staff = staffs_1[_a];
                    var stf = new Staff_model_1.StaffModel();
                    staffList.push(stf);
                    // parse staff data
                    stf.id = staff["id"];
                    stf.name = staff["name"];
                    stf.departmentId = staff["departmentId"];
                    // update repo: add staff to department
                    _this.pageData.dataRepo.addStaff(staff, staff.departmentId);
                }
                // 3. now
                _this.pageData.currentTime = new Date(data["now"]);
            }
        });
    };
    /**
     * send SF0050202 post request
     */
    SF00502Service.prototype.sf0050202 = function () {
        var _this = this;
        var requestData = {
            departmentId: this.pageData.selectedDepartment.id,
            currentMonth: this.pageData.currentTime
        };
        return this.postApi("/SF0050202", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                var repo = _this.pageData.dataRepo;
                // 1. customers
                var customerList = [];
                _this.pageData.customers = customerList;
                var customerDatas = data["customers"];
                for (var _i = 0, customerDatas_1 = customerDatas; _i < customerDatas_1.length; _i++) {
                    var customerData = customerDatas_1[_i];
                    var customer = new Customer_model_1.CustomerModel();
                    customerList.push(customer);
                    // parse customer data
                    customer.id = customerData["id"];
                    customer.name = customerData["name"];
                    customer.code = customerData["code"];
                    customer.picId = customerData["picId"];
                    customer.startYear = customerData["startYear"];
                    // update repo: add customer to staff
                    repo.addCustomer(customer, customer.picId);
                    // update repo: add customer to department
                    repo.addCustomer(customer, SF00502_constants_1.SF00502Constants.OPTION_ALL_STAFF.id);
                    // update repo: add customer to customer map
                    repo.setCustomer(customer, customer.id);
                }
                // 2. revenues
                var lastFYear = date_util_1.DateUtil.getFinancialYear(_this.pageData.currentTime) - 1;
                var revenueDatas = data["revenues"];
                for (var _a = 0, revenueDatas_1 = revenueDatas; _a < revenueDatas_1.length; _a++) {
                    var revenueData = revenueDatas_1[_a];
                    // parse revenue data
                    var tmpYear = revenueData["year"];
                    var tmpMonth = revenueData["month"];
                    var tmpCustomerId = revenueData["customerId"];
                    var tmpAmount1 = revenueData["amount1"];
                    var tmpAmount2 = revenueData["amount2"];
                    var tmpAmount3 = revenueData["amount3"];
                    // act as old revenue
                    var oldNote = repo.getCustomerNote(tmpYear + 1, tmpMonth, tmpCustomerId);
                    if (oldNote == undefined) {
                        // create new note
                        oldNote = new Note_model_1.NoteModel();
                        repo.setCustomerNote(oldNote, tmpYear + 1, tmpMonth, tmpCustomerId);
                        _this.pageData.customerNotes.push(oldNote);
                        oldNote.year = tmpYear + 1;
                        oldNote.month = tmpMonth;
                        oldNote.customerId = tmpCustomerId;
                    }
                    oldNote.oldRevenue = new Revenue_model_1.RevenueModel();
                    oldNote.oldRevenue.amount1 = tmpAmount1;
                    oldNote.oldRevenue.amount2 = tmpAmount2;
                    oldNote.oldRevenue.amount3 = tmpAmount3;
                    // act as new revenue (for revenue from last financial year only)
                    if ((tmpYear == lastFYear && tmpMonth >= 4) || (tmpYear > lastFYear)) {
                        var newNote = repo.getCustomerNote(tmpYear, tmpMonth, tmpCustomerId);
                        if (newNote == undefined) {
                            // create new note
                            newNote = new Note_model_1.NoteModel();
                            repo.setCustomerNote(newNote, tmpYear, tmpMonth, tmpCustomerId);
                            _this.pageData.customerNotes.push(newNote);
                            newNote.year = tmpYear;
                            newNote.month = tmpMonth;
                            newNote.customerId = tmpCustomerId;
                        }
                        newNote.newRevenue = new Revenue_model_1.RevenueModel();
                        newNote.newRevenue.amount1 = tmpAmount1;
                        newNote.newRevenue.amount2 = tmpAmount2;
                        newNote.newRevenue.amount3 = tmpAmount3;
                    }
                }
                // 3. predictions
                var predictionDatas = data["predictions"];
                var cYear = _this.pageData.currentTime.getFullYear();
                var cMonth = _this.pageData.currentTime.getMonth() + 1;
                for (var _b = 0, predictionDatas_1 = predictionDatas; _b < predictionDatas_1.length; _b++) {
                    var predictionData = predictionDatas_1[_b];
                    // parse prediction data
                    var tmpYear = predictionData["year"];
                    var tmpMonth = predictionData["month"];
                    var tmpCustomerId = predictionData["customerId"];
                    // find note
                    var note = repo.getCustomerNote(tmpYear, tmpMonth, tmpCustomerId);
                    if (note == undefined) {
                        note = new Note_model_1.NoteModel();
                        repo.setCustomerNote(note, tmpYear, tmpMonth, tmpCustomerId);
                        _this.pageData.customerNotes.push(note);
                        note.year = tmpYear;
                        note.month = tmpMonth;
                        note.customerId = tmpCustomerId;
                    }
                    // set note data
                    note.id = predictionData["id"];
                    note.comment = predictionData["note"];
                    note.head = predictionData["head"];
                    // set prediction
                    if ((tmpYear == cYear && tmpMonth >= cMonth) || (tmpYear > cYear)) {
                        note.prediction = new Revenue_model_1.RevenueModel();
                        note.prediction.amount1 = predictionData["amount1"];
                        note.prediction.amount2 = predictionData["amount2"];
                        note.prediction.amount3 = predictionData["amount3"];
                    }
                }
            }
        });
    };
    /**
     * send SF0050203 post request
     * - 0: save ok
     * - 1: nothing to save
     */
    SF00502Service.prototype.sf0050203 = function () {
        // 1. check change list
        // current notes
        var currentNotes = this.pageData.increaseList.concat(this.pageData.decreaseList);
        // origin notes
        var cY = this.pageData.selectedMonth.getFullYear();
        var cM = this.pageData.selectedMonth.getMonth() + 1;
        var cS = this.pageData.selectedStaff.id;
        var originNotes = this.pageData.dataRepo.getIncreaseCustomers(cY, cM, cS)
            .concat(this.pageData.dataRepo.getDecreaseCustomers(cY, cM, cS));
        var noteList = SF00502_helper_1.SF00502Helper.findChanged(currentNotes, originNotes, this.pageData.screenMode);
        // 2. construct request
        var requestData = {
            year: this.pageData.selectedMonth.getFullYear(),
            month: this.pageData.selectedMonth.getMonth() + 1,
            notes: []
        };
        // 2.1 notes
        for (var _i = 0, noteList_1 = noteList; _i < noteList_1.length; _i++) {
            var note = noteList_1[_i];
            requestData.notes.push({
                id: note.id,
                customerId: note.customerId,
                note: note.comment
            });
        }
        // 3. send request
        return this.postApi("/SF0050203", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // 1. saved notes
                var savedNotes = data["notes"];
                // 1.1 create map customerId -> note id
                var tmpMap = {};
                for (var _i = 0, savedNotes_1 = savedNotes; _i < savedNotes_1.length; _i++) {
                    var note = savedNotes_1[_i];
                    tmpMap[note["customerId"]] = note["id"];
                }
                // 1.2 update screen data
                var noteMap = {};
                for (var _a = 0, currentNotes_1 = currentNotes; _a < currentNotes_1.length; _a++) {
                    var note = currentNotes_1[_a];
                    var newId = tmpMap[note.customerId];
                    if (newId != undefined) {
                        note.id = newId;
                        noteMap[note.customerId] = note;
                    }
                }
                // 1.3 update background data
                for (var _b = 0, originNotes_1 = originNotes; _b < originNotes_1.length; _b++) {
                    var note = originNotes_1[_b];
                    var tmpNote = noteMap[note.customerId];
                    if (tmpNote != undefined) {
                        // update id and comment
                        note.id = tmpNote.id;
                        note.comment = tmpNote.comment;
                    }
                }
            }
        });
    };
    /**
     * send SF0050204 post request
     * - 0: save ok
     * - 1: nothing to save
     */
    SF00502Service.prototype.sf0050204 = function () {
        var _this = this;
        var repo = this.pageData.dataRepo;
        // 1. check change list
        // current notes
        var currentNotes = this.pageData.increaseList.concat(this.pageData.decreaseList);
        // origin notes
        var cY = this.pageData.selectedMonth.getFullYear();
        var cM = this.pageData.selectedMonth.getMonth() + 1;
        var cS = this.pageData.selectedStaff.id;
        var originNotes = repo.getIncreaseCustomers(cY, cM, cS).concat(repo.getDecreaseCustomers(cY, cM, cS));
        var noteList = SF00502_helper_1.SF00502Helper.findChanged(currentNotes, originNotes, this.pageData.screenMode);
        // 2. construct request
        var requestData = {
            year: this.pageData.selectedMonth.getFullYear(),
            month: this.pageData.selectedMonth.getMonth() + 1,
            picId: this.pageData.selectedStaff.id,
            notes: []
        };
        // 2.1 notes
        for (var _i = 0, noteList_2 = noteList; _i < noteList_2.length; _i++) {
            var note = noteList_2[_i];
            var noteJson = {
                id: note.id,
                customerId: note.customerId,
                amount1: note.prediction.amount1,
                amount2: note.prediction.amount2,
                amount3: note.prediction.amount3,
                note: note.comment,
                delete: 0
            };
            if (note.delete) {
                noteJson.delete = 1;
            }
            requestData.notes.push(noteJson);
        }
        // 3. send request
        return this.postApi("/SF0050204", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // update client data
                var savedNotes = data["notes"];
                var removeNotes = data["removeNotes"];
                // 1. create map customerId -> note id
                var tmpMap = {};
                for (var _i = 0, savedNotes_2 = savedNotes; _i < savedNotes_2.length; _i++) {
                    var noteData = savedNotes_2[_i];
                    tmpMap[noteData["customerId"]] = noteData["id"];
                }
                // 2. update screen data
                for (var _a = 0, currentNotes_2 = currentNotes; _a < currentNotes_2.length; _a++) {
                    var note = currentNotes_2[_a];
                    var newId = tmpMap[note.customerId];
                    if (newId != undefined) {
                        note.id = newId;
                    }
                }
                // 3. update background data
                // 3.1 update saved notes
                var noteMap = {};
                for (var _b = 0, originNotes_2 = originNotes; _b < originNotes_2.length; _b++) {
                    var note = originNotes_2[_b];
                    noteMap[note.customerId] = note;
                }
                for (var _c = 0, currentNotes_3 = currentNotes; _c < currentNotes_3.length; _c++) {
                    var note = currentNotes_3[_c];
                    var orgNote = noteMap[note.customerId];
                    if (orgNote == undefined) {
                        // 3.1A create new note
                        orgNote = SF00502_helper_1.SF00502Helper.cloneNote(note);
                        // add new note
                        repo.setCustomerNote(orgNote, orgNote.year, orgNote.month, orgNote.customerId);
                    }
                    else {
                        // 3.1B update note
                        orgNote.id = note.id;
                        orgNote.comment = note.comment;
                        // update prediction
                        orgNote.prediction.amount1 = note.prediction.amount1;
                        orgNote.prediction.amount2 = note.prediction.amount2;
                        orgNote.prediction.amount3 = note.prediction.amount3;
                        orgNote.prediction.total = note.prediction.total;
                        orgNote.diffRate = note.diffRate;
                    }
                }
                // 3.2 update removed notes
                for (var _d = 0, removeNotes_1 = removeNotes; _d < removeNotes_1.length; _d++) {
                    var noteData = removeNotes_1[_d];
                    var customerId = noteData["customerId"];
                    var orgNote = repo.getCustomerNote(cY, cM, customerId);
                    // reset id, comment
                    orgNote.id = undefined;
                    orgNote.comment = undefined;
                    // reset prediction
                    orgNote.autoPrediction();
                    orgNote.calculatePredictionDiffRate();
                }
                // 3.2. update increase/decrease list
                // 3.2.1 update increase list
                var newIncreaseList = [];
                for (var _e = 0, _f = _this.pageData.increaseList; _e < _f.length; _e++) {
                    var note = _f[_e];
                    // find origin note
                    newIncreaseList.push(repo.getCustomerNote(note.year, note.month, note.customerId));
                }
                repo.setIncreaseCustomers(newIncreaseList, cY, cM, cS);
                // 3.2.1 update decrease list
                var newDecreaseList = [];
                for (var _g = 0, _h = _this.pageData.decreaseList; _g < _h.length; _g++) {
                    var note = _h[_g];
                    // find origin note
                    newDecreaseList.push(repo.getCustomerNote(note.year, note.month, note.customerId));
                }
                repo.setDecreaseCustomers(newDecreaseList, cY, cM, cS);
            }
        });
    };
    /**
     * send SF0050205 post request
     */
    SF00502Service.prototype.sf0050205 = function () {
        var _this = this;
        var requestData = {
            currentMonth: this.pageData.currentTime
        };
        return this.postApi("/SF0050205", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                var repo = _this.pageData.dataRepo;
                // 1. customers
                var customerList = [];
                _this.pageData.customers = customerList;
                var customerDatas = data["customers"];
                for (var _i = 0, customerDatas_2 = customerDatas; _i < customerDatas_2.length; _i++) {
                    var customerData = customerDatas_2[_i];
                    var customer = new Customer_model_1.CustomerModel();
                    customerList.push(customer);
                    // parse customer data
                    customer.id = customerData["id"];
                    customer.name = customerData["name"];
                    customer.code = customerData["code"];
                    // update repo: add customer to customer map
                    repo.setCustomer(customer, customer.id);
                }
                // 2. notes
                var noteDatas = data["notes"];
                var cYear = _this.pageData.currentTime.getFullYear();
                var cMonth = _this.pageData.currentTime.getMonth() + 1;
                for (var _a = 0, noteDatas_1 = noteDatas; _a < noteDatas_1.length; _a++) {
                    var noteData = noteDatas_1[_a];
                    // parse note data
                    var note = new Note_model_1.NoteModel();
                    note.year = noteData["year"];
                    note.month = noteData["month"];
                    note.customerId = noteData["customerId"];
                    note.comment = noteData["note"];
                    note.oldRevenue = new Revenue_model_1.RevenueModel();
                    note.oldRevenue.amount1 = noteData["oldAmount1"];
                    note.oldRevenue.amount2 = noteData["oldAmount2"];
                    note.oldRevenue.amount3 = noteData["oldAmount3"];
                    note.oldRevenue.calculateTotal();
                    if ((note.year == cYear && note.month >= cMonth) || (note.year > cYear)) {
                        // note is prediction
                        note.prediction = new Revenue_model_1.RevenueModel();
                        note.prediction.amount1 = noteData["newAmount1"];
                        note.prediction.amount2 = noteData["newAmount2"];
                        note.prediction.amount3 = noteData["newAmount3"];
                        note.prediction.calculateTotal();
                        note.calculatePredictionDiffRate();
                    }
                    else {
                        // note is revenue
                        note.newRevenue = new Revenue_model_1.RevenueModel();
                        note.newRevenue.amount1 = noteData["newAmount1"];
                        note.newRevenue.amount2 = noteData["newAmount2"];
                        note.newRevenue.amount3 = noteData["newAmount3"];
                        note.newRevenue.calculateTotal();
                        note.calculateRevenueDiffRate();
                    }
                    // add note to repo
                    repo.setCustomerNote(note, note.year, note.month, note.customerId);
                }
                // 3. summaries
                var summaryDatas = data["summaries"];
                for (var _b = 0, summaryDatas_1 = summaryDatas; _b < summaryDatas_1.length; _b++) {
                    var summaryData = summaryDatas_1[_b];
                    // parse summary data
                    var summary = new Note_model_1.NoteModel();
                    summary.year = summaryData["year"];
                    summary.month = summaryData["month"];
                    summary.oldRevenue = new Revenue_model_1.RevenueModel();
                    summary.oldRevenue.amount1 = summaryData["oldAmount1"];
                    summary.oldRevenue.amount2 = summaryData["oldAmount2"];
                    summary.oldRevenue.amount3 = summaryData["oldAmount3"];
                    summary.oldRevenue.calculateTotal();
                    summary.newRevenue = new Revenue_model_1.RevenueModel();
                    summary.newRevenue.amount1 = summaryData["newAmount1"];
                    summary.newRevenue.amount2 = summaryData["newAmount2"];
                    summary.newRevenue.amount3 = summaryData["newAmount3"];
                    summary.newRevenue.calculateTotal();
                    summary.calculateRevenueDiffRate();
                    // add summary to repo
                    repo.setSummary(summary, summary.year, summary.month, SF00502_constants_1.SF00502Constants.OPTION_ALL_STAFF.id);
                }
            }
        });
    };
    SF00502Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00502Service);
    return SF00502Service;
}(common_service_1.CommonService));
exports.SF00502Service = SF00502Service;
//# sourceMappingURL=SF00502.service.js.map