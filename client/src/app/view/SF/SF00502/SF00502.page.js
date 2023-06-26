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
var Header_provider_1 = require("../SF00100/Header.provider");
var router_1 = require("@angular/router");
var common_page_1 = require("../COMMON/common.page");
var SF00502_service_1 = require("./SF00502.service");
var date_util_1 = require('../../../util/date-util');
var SF00502_data_1 = require("./SF00502.data");
var SF00502_constants_1 = require("./SF00502.constants");
var message_1 = require("../../../helper/message");
var CC00100_service_1 = require("../../CC/CC00100/CC00100.service");
var constants_1 = require("../../../helper/constants");
var Note_model_1 = require("./model/Note.model");
var Revenue_model_1 = require("./model/Revenue.model");
var SF00502_helper_1 = require("./SF00502.helper");
var screen_url_1 = require("../../../helper/screen-url");
var SF00502Page = (function (_super) {
    __extends(SF00502Page, _super);
    //region Initialize page
    function SF00502Page(router, route, headerProvider, service, authService) {
        _super.call(this, router, route, headerProvider);
        this.router = router;
        this.route = route;
        this.headerProvider = headerProvider;
        this.service = service;
        // init page data
        this.pageData = new SF00502_data_1.SF00502Data();
        service.pageData = this.pageData;
        // get current user
        this.user = authService.user;
    }
    SF00502Page.prototype.pageTile = function () {
        return "得意先増減リスト";
    };
    //endregion
    // get data on page load
    SF00502Page.prototype.ngOnInit = function () {
        var _this = this;
        this.service.navigateTo("得意先増減リスト", this.router.url);
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        var notify = $.notify({
            message: message_1.MSG.SF00502.INF001
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        // load data
        this.service.sf0050201().then(function () {
            // setup month options
            _this.setupMonthList();
            // notify update and close
            _this.notifyDone(notify);
            // find current user's department
            var curDepartment;
            for (var _i = 0, _a = _this.pageData.departments; _i < _a.length; _i++) {
                var department = _a[_i];
                if (department.id == _this.user.departmentId) {
                    curDepartment = department;
                    break;
                }
            }
            // select department
            if (curDepartment != undefined) {
                // find default staff
                var curStaff = SF00502_constants_1.SF00502Constants.OPTION_ALL_STAFF;
                if (_this.user.role == constants_1.Constants.USER_ROLE_STAFF) {
                    // find current staff
                    var staffList = _this.pageData.dataRepo.getStaffs(curDepartment.id);
                    for (var _b = 0, staffList_1 = staffList; _b < staffList_1.length; _b++) {
                        var staff = staffList_1[_b];
                        if (staff.id == _this.user.id) {
                            curStaff = staff;
                            break;
                        }
                    }
                }
                // department found, select department
                _this.selectDepartment(curDepartment, curStaff);
            }
            else {
                // default select department[0]
                if (_this.pageData.departments.length > 0) {
                    _this.selectDepartment(_this.pageData.departments[0]);
                }
            }
        });
    };
    //region Actions
    // set selected department
    SF00502Page.prototype.selectDepartment = function (value, defaultStaff) {
        var _this = this;
        if (defaultStaff === void 0) { defaultStaff = SF00502_constants_1.SF00502Constants.OPTION_ALL_STAFF; }
        // set value
        this.pageData.selectedDepartment = value;
        // change staff list to department's staff
        this.pageData.availableStaffs = this.pageData.dataRepo.getStaffs(this.pageData.selectedDepartment.id);
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        var notifyMsg;
        if (this.pageData.selectedDepartment == SF00502_constants_1.SF00502Constants.OPTION_ALL_COMPANY) {
            notifyMsg = message_1.default.get(message_1.MSG.SF00502.INF002, "サガシキ全体");
        }
        else {
            notifyMsg = message_1.default.get(message_1.MSG.SF00502.INF002, this.pageData.selectedDepartment.name);
        }
        var notify = $.notify({
            message: notifyMsg
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        // clean up repo
        this.pageData.dataRepo.clearDepartmentData();
        // load data
        var servicePromise;
        if (this.pageData.selectedDepartment == SF00502_constants_1.SF00502Constants.OPTION_ALL_COMPANY) {
            // get data for company
            servicePromise = this.service.sf0050205();
        }
        else {
            // get data for department
            servicePromise = this.service.sf0050202();
        }
        servicePromise.then(function () {
            // notify update
            notify.update("progress", 70);
            if (_this.pageData.selectedDepartment == SF00502_constants_1.SF00502Constants.OPTION_ALL_COMPANY) {
                // analyze company data
                _this.analyzeCompanyData();
            }
            else {
                // analyze department data
                _this.analyzeDepartmentData();
            }
            // set time to last month
            // for ticket 3573
            // let curTime = this.pageData.currentTime;
            // for (let month of this.pageData.availableMonths) {
            //     if (curTime.getFullYear() * 12 + curTime.getMonth() - 1 == month.getFullYear() * 12 + month.getMonth()) {
            //         this.pageData.selectedMonth = month;
            //     }
            // }
            // set default select staff
            _this.pageData.selectedStaff = defaultStaff;
            _this.updateScreenData();
            // notify update and close
            _this.notifyDone(notify);
        });
    };
    // reset screen data
    SF00502Page.prototype.resetScreenData = function () {
        this.updateScreenData();
    };
    // save screen data
    SF00502Page.prototype.saveScreenData = function () {
        var _this = this;
        // check for changes
        // current notes
        var currentNotes = this.pageData.increaseList.concat(this.pageData.decreaseList);
        // origin notes
        var cY = this.pageData.selectedMonth.getFullYear();
        var cM = this.pageData.selectedMonth.getMonth() + 1;
        var cS = this.pageData.selectedStaff.id;
        var originNotes = this.pageData.dataRepo.getIncreaseCustomers(cY, cM, cS)
            .concat(this.pageData.dataRepo.getDecreaseCustomers(cY, cM, cS));
        var noteList = SF00502_helper_1.SF00502Helper.findChanged(currentNotes, originNotes, this.pageData.screenMode);
        if (noteList.length == 0) {
            $.notify({ message: message_1.MSG.SF00502.INF004 }, { delay: 1000 });
            return Promise.resolve();
        }
        // changes detected
        // show loader ~ no need
        // OneUI.contentLoader('show');
        // notify loading
        var notify = $.notify({
            message: message_1.MSG.SF00502.INF005
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        if (this.pageData.screenMode == SF00502_constants_1.SF00502Constants.SCREEN_MODE_ACHIEVEMENT) {
            // save achievement
            return this.service.sf0050203().then(function () {
                // notify update and close
                _this.notifyDone(notify);
            });
        }
        else {
            return this.service.sf0050204().then(function () {
                // notify update and close
                _this.notifyDone(notify);
            });
        }
    };
    SF00502Page.prototype.navigateToCustomerDetail = function (customerId) {
        var customer = this.pageData.dataRepo.getCustomer(customerId);
        var customerCode = customer.code;
        this.router.navigate(["home", "customer", customerCode]);
    };
    SF00502Page.prototype.goBack = function () {
        var _this = this;
        this.confirmIgnoreChange().then(function (isConfirmed) {
            if (isConfirmed) {
                _this.navigate(screen_url_1.ScreenUrl.SF001);
            }
        });
    };
    //endregion
    //region functions
    // set selected staff
    SF00502Page.prototype.selectStaff = function (value) {
        // set value
        this.pageData.selectedStaff = value;
        // update screen data
        this.updateScreenData();
    };
    /**
     * 表示月を更新する
     *
     * @param monthTerm 表示開始月
     */
    SF00502Page.prototype.selectMonth = function (monthTerm) {
        // set value
        this.pageData.selectedMonthTerm = monthTerm;
        // update screen data
        this.updateScreenData();
    };
    /**
     * setup month options
     */
    SF00502Page.prototype.setupMonthList = function () {
        // get finance year
        var fYear = date_util_1.DateUtil.getFinancialYear(this.pageData.currentTime);
        // month list is 36 availableMonths from previous year to next year
        this.pageData.availableMonths = [];
        for (var i = -1; i <= 1; i++) {
            for (var j = 0; j <= 11; j++) {
                // new financial month (+3 month)
                this.pageData.availableMonths.push(new Date(fYear + i, j + 3));
            }
        }
    };
    /**
     * Analyze department data received from server
     */
    SF00502Page.prototype.analyzeDepartmentData = function () {
        var repo = this.pageData.dataRepo;
        var staffs = this.pageData.availableStaffs;
        var cY = this.pageData.currentTime.getFullYear();
        var cM = this.pageData.currentTime.getMonth() + 1;
        // fill up note records
        for (var _i = 0, _a = this.pageData.customerNotes; _i < _a.length; _i++) {
            var note = _a[_i];
            if ((note.year < cY) || (note.year == cY && note.month < cM)) {
                // achievement
                // fill up old revenue
                if (note.oldRevenue == undefined) {
                    note.oldRevenue = new Revenue_model_1.RevenueModel();
                    note.oldRevenue.amount1 = 0;
                    note.oldRevenue.amount2 = 0;
                    note.oldRevenue.amount3 = 0;
                }
                note.oldRevenue.calculateTotal();
                // fill up new revenue
                if (note.newRevenue == undefined) {
                    note.newRevenue = new Revenue_model_1.RevenueModel();
                    note.newRevenue.amount1 = 0;
                    note.newRevenue.amount2 = 0;
                    note.newRevenue.amount3 = 0;
                }
                note.newRevenue.calculateTotal();
                // calculate rate
                note.calculateRevenueDiffRate();
            }
            else {
                // prediction
                // fill up old revenue
                if (note.oldRevenue == undefined) {
                    note.oldRevenue = new Revenue_model_1.RevenueModel();
                    note.oldRevenue.amount1 = 0;
                    note.oldRevenue.amount2 = 0;
                    note.oldRevenue.amount3 = 0;
                }
                note.oldRevenue.calculateTotal();
                // fill up prediction
                if (note.prediction == undefined) {
                    note.autoPrediction();
                }
                else {
                    note.prediction.calculateTotal();
                }
                // calculate rate
                note.calculatePredictionDiffRate();
            }
        }
        // analyze data (increase list, decrease list, summary)
        var months = this.pageData.availableMonths;
        // analyze each month
        var _loop_1 = function(month) {
            var iY = month.getFullYear();
            var iM = month.getMonth() + 1;
            var isPast = (iY < cY) || (iY == cY && iM < cM);
            // analyze each staff (included department)
            for (var _b = 0, staffs_1 = staffs; _b < staffs_1.length; _b++) {
                var staff = staffs_1[_b];
                // 1. find staff notes
                var staffNotes = retrieveNoteModels(repo, iY, iM, staff.id);
                // 2. analyze increase/decrease list
                if (isPast) {
                    // 2A. achievement lists
                    // 2A.1 remove new customer
                    var tmpNotes = staffNotes.filter(function (note) {
                        var customer = repo.getCustomer(note.customerId);
                        // customer not found
                        if (customer == undefined) {
                            return false;
                        }
                        // customer is new (financial year > iY/3
                        if (customer.startYear == undefined
                            || (customer.startYear > iY || (customer.startYear == iY && iM > 4))) {
                            return false;
                        }
                        return true;
                    });
                    // ソート, プラス/マイナスに分割
                    var result = sortAndSplitRevenueNoteModelList(tmpNotes);
                    repo.setIncreaseCustomers(result[0], iY, iM, staff.id);
                    repo.setDecreaseCustomers(result[1], iY, iM, staff.id);
                }
                else {
                    // 2B data prediction
                    // 2B.1 remove unsaved prediction
                    var tmpNotes = staffNotes.filter(function (note) { return (note.id != undefined); });
                    // 2B.2 if head, accept head flag only
                    if (staff.id == SF00502_constants_1.SF00502Constants.OPTION_ALL_STAFF.id) {
                        tmpNotes = tmpNotes.filter(function (note) { return (note.head == SF00502_constants_1.SF00502Constants.HEAD_NOTE); });
                    }
                    // ソート, プラス/マイナスに分割
                    var result = sortAndSplitPredictionNoteModelList(tmpNotes);
                    repo.setIncreaseCustomers(result[0], iY, iM, staff.id);
                    repo.setDecreaseCustomers(result[1], iY, iM, staff.id);
                }
                // 3. analyze summary data (for 実績 only by #1800)
                if (isPast) {
                    var summary = createRevenueSummary(staffNotes);
                    repo.setSummary(summary, iY, iM, staff.id);
                }
            }
        };
        for (var _c = 0, months_1 = months; _c < months_1.length; _c++) {
            var month = months_1[_c];
            _loop_1(month);
        }
    };
    SF00502Page.prototype.analyzeCompanyData = function () {
        // analyze data (increase list, decrease list, summary)
        var months = this.pageData.availableMonths;
        var cY = this.pageData.currentTime.getFullYear();
        var cM = this.pageData.currentTime.getMonth() + 1;
        var repo = this.pageData.dataRepo;
        var staffId = SF00502_constants_1.SF00502Constants.OPTION_ALL_STAFF.id;
        // analyze each month
        for (var _i = 0, months_2 = months; _i < months_2.length; _i++) {
            var month = months_2[_i];
            var iY = month.getFullYear();
            var iM = month.getMonth() + 1;
            var isPast = (iY < cY) || (iY == cY && iM < cM);
            // analyze each staff (included department)
            var staffNotes = void 0;
            // 1. find staff notes
            staffNotes = repo.getCustomerNotes(iY, iM);
            // 2. analyze increase/decrease list
            if (isPast) {
                // 2A. achievement lists
                // ソート, プラス/マイナスに分割
                var result = sortAndSplitRevenueNoteModelList(staffNotes);
                repo.setIncreaseCustomers(result[0], iY, iM, staffId);
                repo.setDecreaseCustomers(result[1], iY, iM, staffId);
            }
            else {
                // 2B data prediction
                // ソート, プラス/マイナスに分割
                var result = sortAndSplitPredictionNoteModelList(staffNotes);
                repo.setIncreaseCustomers(result[0], iY, iM, staffId);
                repo.setDecreaseCustomers(result[1], iY, iM, staffId);
            }
            // 3. fill up summary data (for 実績 only by #1800)
            if (isPast) {
                // get summary (parsed in service)
                var summary = repo.getSummary(iY, iM, staffId);
                if (summary == undefined) {
                    // if not found summary, create summary
                    var summary_1 = new Note_model_1.NoteModel();
                    repo.setSummary(summary_1, iY, iM, staffId);
                    // set 0 to all revenue
                    summary_1.newRevenue = new Revenue_model_1.RevenueModel();
                    summary_1.oldRevenue = new Revenue_model_1.RevenueModel();
                    summary_1.calculateRevenueDiffRate();
                }
            }
            else {
                // clear summary
                repo.setSummary(undefined, iY, iM, staffId);
            }
        }
    };
    // update summary data, increase/decrease customer list
    SF00502Page.prototype.updateScreenData = function () {
        var selectedStaffId = this.pageData.selectedStaff.id;
        if (this.pageData.selectedMonth === undefined || this.pageData.selectedMonth === null) {
            var curTime = this.pageData.currentTime;
            for (var _i = 0, _a = this.pageData.availableMonths; _i < _a.length; _i++) {
                var month = _a[_i];
                if (curTime.getFullYear() * 12 + curTime.getMonth() - 1 == month.getFullYear() * 12 + month.getMonth()) {
                    this.pageData.selectedMonth = month;
                }
            }
        }
        var selectedYear = this.pageData.selectedMonth.getFullYear();
        var selectedMonth = this.pageData.selectedMonth.getMonth() + 1;
        // update screen
        if (date_util_1.isAfterOrEqualDate(this.pageData.selectedMonth, this.pageData.maxAchievmentDate)) {
            // 見通し表示モード
            this.pageData.screenMode = SF00502_constants_1.SF00502Constants.SCREEN_MODE_PREDICTION;
            this.pageData.selectedTerm = 1; // 見通しモードでは期間 = 1 ヶ月のみ有効
        }
        else {
            // 実績表示モード
            this.pageData.screenMode = SF00502_constants_1.SF00502Constants.SCREEN_MODE_ACHIEVEMENT;
        }
        // update permission
        var canEdit = false;
        if (this.pageData.screenMode == SF00502_constants_1.SF00502Constants.SCREEN_MODE_ACHIEVEMENT && this.pageData.selectedTerm > 1) {
            // 実績表示モードで期間が 2 ヶ月以上の場合は編集不可
            canEdit = false;
        }
        else if (this.user.departmentId == this.pageData.selectedDepartment.id) {
            // own department
            if (this.user.role == constants_1.Constants.USER_ROLE_HEAD) {
                // head can edit
                canEdit = true;
            }
            else {
                // if not head, must be own page
                if (this.user.id == this.pageData.selectedStaff.id) {
                    canEdit = true;
                }
            }
        }
        this.pageData.canEdit = canEdit;
        // update available customers
        this.pageData.availableCustomers = this.pageData.dataRepo.getCustomers(selectedStaffId);
        // update summary data
        this.pageData.sumarry = this.pageData.dataRepo.getSummary(selectedYear, selectedMonth, selectedStaffId);
        // re-sort the customer prediction list
        if (this.pageData.screenMode == SF00502_constants_1.SF00502Constants.SCREEN_MODE_PREDICTION) {
            // get all prediction notes
            var tmpNotes = this.pageData.dataRepo.getIncreaseCustomers(selectedYear, selectedMonth, selectedStaffId)
                .concat(this.pageData.dataRepo.getDecreaseCustomers(selectedYear, selectedMonth, selectedStaffId));
            // resort predictions
            var result = sortAndSplitPredictionNoteModelList(tmpNotes);
            this.pageData.dataRepo.setIncreaseCustomers(result[0], selectedYear, selectedMonth, selectedStaffId);
            this.pageData.dataRepo.setDecreaseCustomers(result[1], selectedYear, selectedMonth, selectedStaffId);
        }
        if (this.pageData.screenMode != SF00502_constants_1.SF00502Constants.SCREEN_MODE_ACHIEVEMENT || this.pageData.selectedTerm == 1) {
            // 実績表示モード(1ヶ月) or 見通しモード
            // update increase customer list (clone only)
            var increaseList = this.pageData.dataRepo.getIncreaseCustomers(selectedYear, selectedMonth, selectedStaffId);
            this.pageData.increaseList = [];
            for (var _b = 0, increaseList_1 = increaseList; _b < increaseList_1.length; _b++) {
                var note = increaseList_1[_b];
                this.pageData.increaseList.push(SF00502_helper_1.SF00502Helper.cloneNote(note));
            }
            // update decrease customer list
            var decreaseList = this.pageData.dataRepo.getDecreaseCustomers(selectedYear, selectedMonth, selectedStaffId);
            this.pageData.decreaseList = [];
            for (var _c = 0, decreaseList_1 = decreaseList; _c < decreaseList_1.length; _c++) {
                var note = decreaseList_1[_c];
                this.pageData.decreaseList.push(SF00502_helper_1.SF00502Helper.cloneNote(note));
            }
        }
        else {
            // 実績表示モード (複数月)
            // 複数月を集約した NodeModel[] を生成する
            var noteModelList = aggregateRevenue(this.pageData.dataRepo, selectedYear, selectedMonth, this.pageData.selectedTerm, selectedStaffId);
            // ソート&分割
            var result = sortAndSplitRevenueNoteModelList(noteModelList);
            this.pageData.increaseList = result[0];
            this.pageData.decreaseList = result[1];
            // サマリー集約
            var summary = void 0;
            if (this.pageData.selectedDepartment != SF00502_constants_1.SF00502Constants.OPTION_ALL_COMPANY) {
                // 部門指定の場合、明細からサマリーを集計する
                summary = createRevenueSummary(noteModelList);
            }
            else {
                // 全社の場合、サマリーを集計してサマリーとする
                summary = aggregateRevenueSummary(this.pageData.dataRepo, selectedYear, selectedMonth, this.pageData.selectedTerm, selectedStaffId);
            }
            this.pageData.sumarry = summary;
        }
    };
    SF00502Page.prototype.notifyDone = function (notify) {
        // notify update and close
        notify.update("progress", 100);
        notify.update("type", "success");
        setTimeout(function (ntf) {
            ntf.close();
        }, 1000, notify);
        // hide content loader
        OneUI.contentLoader('hide');
    };
    SF00502Page.prototype.confirmIgnoreChange = function () {
        if (!this.pageData.canEdit) {
            // no change in view mode
            return Promise.resolve(true);
        }
        // current notes
        var currentNotes = this.pageData.increaseList.concat(this.pageData.decreaseList);
        // origin notes
        var cY = this.pageData.selectedMonth.getFullYear();
        var cM = this.pageData.selectedMonth.getMonth() + 1;
        var cS = this.pageData.selectedStaff.id;
        var originNotes = this.pageData.dataRepo.getIncreaseCustomers(cY, cM, cS)
            .concat(this.pageData.dataRepo.getDecreaseCustomers(cY, cM, cS));
        var changeNotes = SF00502_helper_1.SF00502Helper.findChanged(currentNotes, originNotes, this.pageData.screenMode);
        var isChanged = changeNotes.length > 0;
        if (isChanged) {
            // have change, warning
            return new Promise(function (resolve, reject) {
                swal({
                    title: "",
                    text: message_1.default.get(message_1.MSG.SF00502.WRN001),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d26a5c",
                    confirmButtonText: "Yes",
                    closeOnConfirm: true
                }, function (res) { return resolve(res); });
            });
        }
        else {
            // no change
            return Promise.resolve(true);
        }
    };
    SF00502Page = __decorate([
        core_1.Component({
            templateUrl: "SF00502.page.html",
            styleUrls: ["SF00502.page.css"],
            providers: [SF00502_service_1.SF00502Service],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, SF00502_service_1.SF00502Service, CC00100_service_1.CC00100Service])
    ], SF00502Page);
    return SF00502Page;
}(common_page_1.CommonPage));
exports.SF00502Page = SF00502Page;
/**
 * 実績データを複数月で集約する
 *
 * @param dataRepo リポジトリ
 * @param year 表示開始年
 * @param month 表示開始月(1-)
 * @param term 集約月数
 * @param staffId 担当営業
 * @returns 集約後の NoteModel の配列  (順序は不定)
 */
function aggregateRevenue(dataRepo, year, month, term, staffId) {
    // 開始月
    var startYear = year;
    var startMonth = month;
    var aggregated = []; // キー: 得意先 ID
    // term ヶ月分のデータを集約する
    while (term > 0) {
        var thisMonthNotes = retrieveNoteModels(dataRepo, year, month, staffId);
        for (var _i = 0, thisMonthNotes_1 = thisMonthNotes; _i < thisMonthNotes_1.length; _i++) {
            var note = thisMonthNotes_1[_i];
            var aggregatedNote = aggregated[note.customerId];
            if (aggregatedNote) {
                // 以前のデータに加算する
                aggregatedNote.addRevenue(note);
            }
            else {
                // 新たな得意先
                aggregatedNote = SF00502_helper_1.SF00502Helper.cloneNote(note);
                aggregatedNote.year = startYear;
                aggregatedNote.month = startMonth;
                aggregatedNote.comment = '';
                aggregatedNote.newRevenue = aggregatedNote.newRevenue || new Revenue_model_1.RevenueModel();
                aggregatedNote.oldRevenue = aggregatedNote.oldRevenue || new Revenue_model_1.RevenueModel();
                aggregated[note.customerId] = aggregatedNote;
            }
        }
        // 次の月に進める
        --term;
        ++month;
        if (month > 12) {
            ++year;
            month = 1;
        }
    }
    //
    return Object.values(aggregated);
}
/**
 * 実績サマリーを複数月で集約する
 *
 * <p>支店 = 全社のときのみサマリーを集約します。
 * <p>支店 != 全社のときは明細を自前で集約しています。(@see createRevenueSummary())
 *     (全社の場合は全ての明細を API より取得できないため)
 *
 * @param dataRepo リポジトリ
 * @param year 表示開始年
 * @param month 表示開始月(1-)
 * @param term 集約月数
 * @param staffId 担当営業 (無指定: 指定なし)  通常利用では無指定
 * @returns 集約後のサマリー
 */
function aggregateRevenueSummary(dataRepo, year, month, term, staffId) {
    // staffId 修正
    if (staffId == null) {
        staffId = SF00502_constants_1.SF00502Constants.OPTION_ALL_STAFF.id; // 担当 = 指定なし
    }
    // サマリー集約結果
    var summary = new Note_model_1.NoteModel();
    // create summary
    summary.newRevenue = new Revenue_model_1.RevenueModel();
    summary.oldRevenue = new Revenue_model_1.RevenueModel();
    // term ヶ月分のデータを集約する
    while (term > 0) {
        var entry = dataRepo.getSummary(year, month, staffId);
        if (entry) {
            summary.addRevenue(entry);
        }
        // 次の月に進める
        --term;
        ++month;
        if (month > 12) {
            ++year;
            month = 1;
        }
    }
    // 3A.2 calculate total, rate
    summary.newRevenue.calculateTotal();
    summary.oldRevenue.calculateTotal();
    summary.calculateRevenueDiffRate();
    return summary;
}
/**
 * 指定営業 or 全員の NoteModel を取得する
 *
 * @param dataRepo リポジトリ
 * @param year 年
 * @param month 月
 * @param staffId 営業ユーザー ID (指定なし: 全員)
 * @returns NoteModel のリスト (順序不定)
 */
function retrieveNoteModels(dataRepo, year, month, staffId) {
    var staffNotes;
    // 1. find staff notes
    if (staffId == null || staffId == SF00502_constants_1.SF00502Constants.OPTION_ALL_STAFF.id) {
        // find department notes
        staffNotes = dataRepo.getCustomerNotes(year, month);
    }
    else {
        staffNotes = [];
        // find staff notes by his customer
        var customers = dataRepo.getCustomers(staffId);
        customers.forEach(function (customer) {
            var note = dataRepo.getCustomerNote(year, month, customer.id);
            if (note != undefined) {
                staffNotes.push(note);
            }
        });
    }
    return staffNotes;
}
/**
 * 実績 NoteModel をソートして プラス/マイナスに分割する
 *
 * @param noteModelList NodeModel のリスト (破壊的)
 * @returns [ プラス分のリスト, マイナス分のリスト ]
 */
function sortAndSplitRevenueNoteModelList(noteModelList) {
    // ソート, プラス/マイナスに分割
    var result = sortAndSplitNoteModelList(noteModelList, {
        comparator: function (n1, n2) {
            return (n1.newRevenue.total - n1.oldRevenue.total) - (n2.newRevenue.total - n2.oldRevenue.total);
        },
        wherePlus: function (note) {
            return note.newRevenue.total - note.oldRevenue.total >= 0;
        },
        whereMinus: function (note) {
            return note.newRevenue.total - note.oldRevenue.total < 0;
        }
    });
    // 表示件数を制限する
    result[0] = result[0].slice(0, SF00502_constants_1.SF00502Constants.LIMIT_LIST);
    result[1] = result[1].slice(0, SF00502_constants_1.SF00502Constants.LIMIT_LIST);
    return result;
}
/**
 * 見通し NoteModel をソートして プラス/マイナスに分割する
 *
 * @param noteModelList NodeModel のリスト (破壊的)
 * @returns [ プラス分のリスト, マイナス分のリスト ]
 */
function sortAndSplitPredictionNoteModelList(noteModelList) {
    return sortAndSplitNoteModelList(noteModelList, {
        comparator: function (n1, n2) {
            return (n1.prediction.total - n1.oldRevenue.total) - (n2.prediction.total - n2.oldRevenue.total);
        },
        wherePlus: function (note) {
            return note.prediction.total - note.oldRevenue.total >= 0;
        },
        whereMinus: function (note) {
            return note.prediction.total - note.oldRevenue.total < 0;
        }
    });
}
/**
 * NoteModel をソートして プラス/マイナスに分割する
 *
 * @param noteModelList NodeModel のリスト (破壊的)
 * @param operator NoteModelOperator
 * @returns [ プラス分のリスト, マイナス分のリスト ]
 */
function sortAndSplitNoteModelList(noteModelList, operator) {
    // ソート
    noteModelList.sort(operator.comparator);
    // プラス, マイナスに分割
    return [
        noteModelList.filter(operator.wherePlus).reverse(),
        noteModelList.filter(operator.whereMinus)
    ];
}
/**
 * 実績データを集約する
 *
 * @param noteModelList 実績データ
 * @returns 集約した実績データ
 */
function createRevenueSummary(noteModelList) {
    var summary = new Note_model_1.NoteModel();
    // create summary
    var newRevenue = new Revenue_model_1.RevenueModel();
    summary.newRevenue = newRevenue;
    var oldRevenue = new Revenue_model_1.RevenueModel();
    summary.oldRevenue = oldRevenue;
    // 3A.1 sum revenue
    noteModelList.forEach(function (note) {
        // new revenue data
        if (note.newRevenue != undefined) {
            newRevenue.amount1 += note.newRevenue.amount1;
            newRevenue.amount2 += note.newRevenue.amount2;
            newRevenue.amount3 += note.newRevenue.amount3;
        }
        // old revenue data
        if (note.oldRevenue != undefined) {
            oldRevenue.amount1 += note.oldRevenue.amount1;
            oldRevenue.amount2 += note.oldRevenue.amount2;
            oldRevenue.amount3 += note.oldRevenue.amount3;
        }
    });
    // 3A.2 calculate total, rate
    summary.newRevenue.calculateTotal();
    summary.oldRevenue.calculateTotal();
    summary.calculateRevenueDiffRate();
    return summary;
}
//# sourceMappingURL=SF00502.page.js.map