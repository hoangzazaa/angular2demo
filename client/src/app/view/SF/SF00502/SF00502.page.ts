import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {HeaderProvider} from "../SF00100/Header.provider";
import {Router, ActivatedRoute} from "@angular/router";
import {CommonPage} from "../COMMON/common.page";
import {SF00502Service} from "./SF00502.service";
import { DateUtil, isAfterOrEqualDate } from '../../../util/date-util';
import {SF00502Data} from "./SF00502.data";
import {DepartmentModel} from "./model/Department.model";
import {StaffModel} from "./model/Staff.model";
import {SF00502Constants} from "./SF00502.constants";
import {MSG, default as Messages} from "../../../helper/message";
import {CC00100Service} from "../../CC/CC00100/CC00100.service";
import {User} from "../../../model/core/User.model";
import {Constants} from "../../../helper/constants";
import {NoteModel} from "./model/Note.model";
import {RevenueModel} from "./model/Revenue.model";
import {SF00502Helper} from "./SF00502.helper";
import {ScreenUrl} from "../../../helper/screen-url";
import { SF00502DataRepo } from './SF00502.datarepo';
import { MonthTerm } from './model/MonthTerm.model';

// use OneUI
declare let OneUI: OneUI;

@Component({
    templateUrl: "SF00502.page.html",
    styleUrls: ["SF00502.page.css"],
    providers: [SF00502Service],
    encapsulation: ViewEncapsulation.None
})
export class SF00502Page extends CommonPage implements OnInit {

    // pageData
    pageData: SF00502Data;
    // current User
    user: User;

    //region Initialize page
    constructor(public router: Router, public route: ActivatedRoute, public headerProvider: HeaderProvider,
                private service: SF00502Service, authService: CC00100Service) {
        super(router, route, headerProvider);

        // init page data
        this.pageData = new SF00502Data();
        service.pageData = this.pageData;

        // get current user
        this.user = authService.user;
    }

    protected pageTile(): string {
        return "得意先増減リスト";
    }

    //endregion

    // get data on page load
    ngOnInit(): void {

        this.service.navigateTo("得意先増減リスト", this.router.url);

        // show loader
        OneUI.contentLoader('show');
        // notify loading
        let notify = $.notify({
            message: MSG.SF00502.INF001
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        // load data
        this.service.sf0050201().then(() => {
            // setup month options
            this.setupMonthList();

            // notify update and close
            this.notifyDone(notify);

            // find current user's department
            let curDepartment: DepartmentModel;
            for (let department of this.pageData.departments) {
                if (department.id == this.user.departmentId) {
                    curDepartment = department;
                    break;
                }
            }

            // select department
            if (curDepartment != undefined) {
                // find default staff
                let curStaff: StaffModel = SF00502Constants.OPTION_ALL_STAFF;
                if (this.user.role == Constants.USER_ROLE_STAFF) {
                    // find current staff
                    let staffList = this.pageData.dataRepo.getStaffs(curDepartment.id);
                    for (let staff of staffList) {
                        if (staff.id == this.user.id) {
                            curStaff = staff;
                            break;
                        }
                    }
                }

                // department found, select department
                this.selectDepartment(curDepartment, curStaff);
            } else {
                // default select department[0]
                if (this.pageData.departments.length > 0) {
                    this.selectDepartment(this.pageData.departments[0]);
                }
            }
        });
    }

    //region Actions

    // set selected department
    selectDepartment(value: DepartmentModel, defaultStaff = SF00502Constants.OPTION_ALL_STAFF) {
        // set value
        this.pageData.selectedDepartment = value;

        // change staff list to department's staff
        this.pageData.availableStaffs = this.pageData.dataRepo.getStaffs(this.pageData.selectedDepartment.id);

        // show loader
        OneUI.contentLoader('show');
        // notify loading
        let notifyMsg;
        if (this.pageData.selectedDepartment == SF00502Constants.OPTION_ALL_COMPANY) {
            notifyMsg = Messages.get(MSG.SF00502.INF002, "サガシキ全体");
        } else {
            notifyMsg = Messages.get(MSG.SF00502.INF002, this.pageData.selectedDepartment.name);
        }
        let notify = $.notify({
            message: notifyMsg
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });

        // clean up repo
        this.pageData.dataRepo.clearDepartmentData();

        // load data
        let servicePromise: Promise<void>;
        if (this.pageData.selectedDepartment == SF00502Constants.OPTION_ALL_COMPANY) {
            // get data for company
            servicePromise = this.service.sf0050205();
        } else {
            // get data for department
            servicePromise = this.service.sf0050202();
        }

        servicePromise.then(() => {
            // notify update
            notify.update("progress", 70);

            if (this.pageData.selectedDepartment == SF00502Constants.OPTION_ALL_COMPANY) {
                // analyze company data
                this.analyzeCompanyData();
            } else {
                // analyze department data
                this.analyzeDepartmentData();
            }

            // set time to last month
            let curTime = this.pageData.currentTime;
            for (let month of this.pageData.availableMonths) {
                if (curTime.getFullYear() * 12 + curTime.getMonth() - 1 == month.getFullYear() * 12 + month.getMonth()) {
                    this.pageData.selectedMonth = month;
                }
            }
            // set default select staff
            this.pageData.selectedStaff = defaultStaff;
            this.updateScreenData();

            // notify update and close
            this.notifyDone(notify);
        });
    }

    // reset screen data
    resetScreenData() {
        this.updateScreenData();
    }

    // save screen data
    saveScreenData(): Promise<void> {

        // check for changes
        // current notes
        let currentNotes = this.pageData.increaseList.concat(this.pageData.decreaseList);
        // origin notes
        let cY = this.pageData.selectedMonth.getFullYear();
        let cM = this.pageData.selectedMonth.getMonth() + 1;
        let cS = this.pageData.selectedStaff.id;
        let originNotes = this.pageData.dataRepo.getIncreaseCustomers(cY, cM, cS)
            .concat(this.pageData.dataRepo.getDecreaseCustomers(cY, cM, cS));
        let noteList = SF00502Helper.findChanged(currentNotes, originNotes, this.pageData.screenMode);
        if (noteList.length == 0) {
            $.notify({message: MSG.SF00502.INF004}, {delay: 1000});
            return Promise.resolve();
        }

        // changes detected
        // show loader ~ no need
        // OneUI.contentLoader('show');
        // notify loading
        let notify = $.notify({
            message: MSG.SF00502.INF005
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });

        if (this.pageData.screenMode == SF00502Constants.SCREEN_MODE_ACHIEVEMENT) {
            // save achievement
            return this.service.sf0050203().then(() => {
                // notify update and close
                this.notifyDone(notify);
            });
        } else {
            return this.service.sf0050204().then(() => {
                // notify update and close
                this.notifyDone(notify);
            });
        }
    }

    navigateToCustomerDetail(customerId: number) {
        let customer = this.pageData.dataRepo.getCustomer(customerId);
        let customerCode = customer.code;
        this.router.navigate(["home", "customer", customerCode]);
    }

    goBack() {
        this.confirmIgnoreChange().then(isConfirmed => {
            if (isConfirmed) {
                this.navigate(ScreenUrl.SF001);
            }
        });
    }

    //endregion

    //region functions

    // set selected staff
    selectStaff(value: StaffModel) {
        // set value
        this.pageData.selectedStaff = value;
        // update screen data
        this.updateScreenData();
    }

    /**
     * 表示月を更新する
     *
     * @param monthTerm 表示開始月
     */
    selectMonth(monthTerm: MonthTerm) {
        // set value
        this.pageData.selectedMonthTerm = monthTerm;
        // update screen data
        this.updateScreenData();
    }

    /**
     * setup month options
     */
    private setupMonthList(): void {
        // get finance year
        let fYear = DateUtil.getFinancialYear(this.pageData.currentTime);
        // month list is 36 availableMonths from previous year to next year
        this.pageData.availableMonths = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = 0; j <= 11; j++) {
                // new financial month (+3 month)
                this.pageData.availableMonths.push(new Date(fYear + i, j + 3));
            }
        }
    }

    /**
     * Analyze department data received from server
     */
    private analyzeDepartmentData(): void {

        let repo = this.pageData.dataRepo;
        let staffs = this.pageData.availableStaffs;
        let cY = this.pageData.currentTime.getFullYear();
        let cM = this.pageData.currentTime.getMonth() + 1;

        // fill up note records
        for (let note of this.pageData.customerNotes) {
            if ((note.year < cY) || (note.year == cY && note.month < cM)) {
                // achievement

                // fill up old revenue
                if (note.oldRevenue == undefined) {
                    note.oldRevenue = new RevenueModel();
                    note.oldRevenue.amount1 = 0;
                    note.oldRevenue.amount2 = 0;
                    note.oldRevenue.amount3 = 0;
                }
                note.oldRevenue.calculateTotal();

                // fill up new revenue
                if (note.newRevenue == undefined) {
                    note.newRevenue = new RevenueModel();
                    note.newRevenue.amount1 = 0;
                    note.newRevenue.amount2 = 0;
                    note.newRevenue.amount3 = 0;
                }
                note.newRevenue.calculateTotal();

                // calculate rate
                note.calculateRevenueDiffRate();
            } else {
                // prediction

                // fill up old revenue
                if (note.oldRevenue == undefined) {
                    note.oldRevenue = new RevenueModel();
                    note.oldRevenue.amount1 = 0;
                    note.oldRevenue.amount2 = 0;
                    note.oldRevenue.amount3 = 0;
                }
                note.oldRevenue.calculateTotal();

                // fill up prediction
                if (note.prediction == undefined) {
                    note.autoPrediction();
                } else {
                    note.prediction.calculateTotal();
                }

                // calculate rate
                note.calculatePredictionDiffRate();
            }
        }

        // analyze data (increase list, decrease list, summary)
        let months = this.pageData.availableMonths;
        // analyze each month
        for (let month of months) {
            let iY = month.getFullYear();
            let iM = month.getMonth() + 1;
            let isPast = (iY < cY) || (iY == cY && iM < cM);

            // analyze each staff (included department)
            for (let staff of staffs) {
                // 1. find staff notes
                let staffNotes = retrieveNoteModels(repo, iY, iM, staff.id);

                // 2. analyze increase/decrease list
                if (isPast) {
                    // 2A. achievement lists
                    // 2A.1 remove new customer
                    let tmpNotes = staffNotes.filter((note) => {
                        let customer = repo.getCustomer(note.customerId);
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
                    let result = sortAndSplitRevenueNoteModelList(tmpNotes);
                    repo.setIncreaseCustomers(result[0], iY, iM, staff.id);
                    repo.setDecreaseCustomers(result[1], iY, iM, staff.id);
                } else {
                    // 2B data prediction
                    // 2B.1 remove unsaved prediction
                    let tmpNotes = staffNotes.filter((note) => (note.id != undefined));

                    // 2B.2 if head, accept head flag only
                    if (staff.id == SF00502Constants.OPTION_ALL_STAFF.id) {
                        tmpNotes = tmpNotes.filter((note) => (note.head == SF00502Constants.HEAD_NOTE));
                    }

                    // ソート, プラス/マイナスに分割
                    let result = sortAndSplitPredictionNoteModelList(tmpNotes);
                    repo.setIncreaseCustomers(result[0], iY, iM, staff.id);
                    repo.setDecreaseCustomers(result[1], iY, iM, staff.id);
                }

                // 3. analyze summary data (for 実績 only by #1800)
                if (isPast) {
                    let summary = createRevenueSummary(staffNotes);
                    repo.setSummary(summary, iY, iM, staff.id);
                }
            }
        }
    }

    private analyzeCompanyData() {
        // analyze data (increase list, decrease list, summary)
        let months = this.pageData.availableMonths;
        let cY = this.pageData.currentTime.getFullYear();
        let cM = this.pageData.currentTime.getMonth() + 1;
        let repo = this.pageData.dataRepo;
        let staffId = SF00502Constants.OPTION_ALL_STAFF.id;
        // analyze each month
        for (let month of months) {
            let iY = month.getFullYear();
            let iM = month.getMonth() + 1;
            let isPast = (iY < cY) || (iY == cY && iM < cM);

            // analyze each staff (included department)
            let staffNotes: NoteModel[];
            // 1. find staff notes
            staffNotes = repo.getCustomerNotes(iY, iM);

            // 2. analyze increase/decrease list
            if (isPast) {
                // 2A. achievement lists

                // ソート, プラス/マイナスに分割
                let result = sortAndSplitRevenueNoteModelList(staffNotes);
                repo.setIncreaseCustomers(result[0], iY, iM, staffId);
                repo.setDecreaseCustomers(result[1], iY, iM, staffId);
            } else {
                // 2B data prediction

                // ソート, プラス/マイナスに分割
                let result = sortAndSplitPredictionNoteModelList(staffNotes);
                repo.setIncreaseCustomers(result[0], iY, iM, staffId);
                repo.setDecreaseCustomers(result[1], iY, iM, staffId);
            }

            // 3. fill up summary data (for 実績 only by #1800)
            if (isPast) {
                // get summary (parsed in service)
                let summary = repo.getSummary(iY, iM, staffId);
                if (summary == undefined) {
                    // if not found summary, create summary
                    let summary = new NoteModel();
                    repo.setSummary(summary, iY, iM, staffId);

                    // set 0 to all revenue
                    summary.newRevenue = new RevenueModel();
                    summary.oldRevenue = new RevenueModel();
                    summary.calculateRevenueDiffRate();
                }
            } else {
                // clear summary
                repo.setSummary(undefined, iY, iM, staffId);
            }
        }
    }

    // update summary data, increase/decrease customer list
    updateScreenData() {
        let selectedStaffId = this.pageData.selectedStaff.id;
        let selectedYear = this.pageData.selectedMonth.getFullYear();
        let selectedMonth = this.pageData.selectedMonth.getMonth() + 1;

        // update screen
        if (isAfterOrEqualDate(this.pageData.selectedMonth, this.pageData.maxAchievmentDate)) {
            // 見通し表示モード
            this.pageData.screenMode = SF00502Constants.SCREEN_MODE_PREDICTION;
            this.pageData.selectedTerm = 1;     // 見通しモードでは期間 = 1 ヶ月のみ有効
        } else {
            // 実績表示モード
            this.pageData.screenMode = SF00502Constants.SCREEN_MODE_ACHIEVEMENT;
        }

        // update permission
        let canEdit = false;
        if (this.pageData.screenMode == SF00502Constants.SCREEN_MODE_ACHIEVEMENT && this.pageData.selectedTerm > 1) {
            // 実績表示モードで期間が 2 ヶ月以上の場合は編集不可
            canEdit = false;
        } else if (this.user.departmentId == this.pageData.selectedDepartment.id) {
            // own department
            if (this.user.role == Constants.USER_ROLE_HEAD) {
                // head can edit
                canEdit = true;
            } else {
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
        if (this.pageData.screenMode == SF00502Constants.SCREEN_MODE_PREDICTION) {
            // get all prediction notes
            let tmpNotes = this.pageData.dataRepo.getIncreaseCustomers(selectedYear, selectedMonth, selectedStaffId)
                .concat(this.pageData.dataRepo.getDecreaseCustomers(selectedYear, selectedMonth, selectedStaffId));

            // resort predictions
            let result = sortAndSplitPredictionNoteModelList(tmpNotes);
            this.pageData.dataRepo.setIncreaseCustomers(result[0], selectedYear, selectedMonth, selectedStaffId);
            this.pageData.dataRepo.setDecreaseCustomers(result[1], selectedYear, selectedMonth, selectedStaffId);
        }

        if (this.pageData.screenMode != SF00502Constants.SCREEN_MODE_ACHIEVEMENT || this.pageData.selectedTerm == 1) {
            // 実績表示モード(1ヶ月) or 見通しモード
            // update increase customer list (clone only)
            let increaseList = this.pageData.dataRepo.getIncreaseCustomers(selectedYear, selectedMonth, selectedStaffId);
            this.pageData.increaseList = [];
            for (let note of increaseList) {
                this.pageData.increaseList.push(SF00502Helper.cloneNote(note));
            }

            // update decrease customer list
            let decreaseList = this.pageData.dataRepo.getDecreaseCustomers(selectedYear, selectedMonth, selectedStaffId);
            this.pageData.decreaseList = [];
            for (let note of decreaseList) {
                this.pageData.decreaseList.push(SF00502Helper.cloneNote(note));
            }
        } else {
            // 実績表示モード (複数月)
            // 複数月を集約した NodeModel[] を生成する
            let noteModelList = aggregateRevenue(this.pageData.dataRepo, selectedYear, selectedMonth, this.pageData.selectedTerm, selectedStaffId);

            // ソート&分割
            let result = sortAndSplitRevenueNoteModelList(noteModelList);
            this.pageData.increaseList = result[0];
            this.pageData.decreaseList = result[1];

            // サマリー集約
            let summary: NoteModel;
            if (this.pageData.selectedDepartment != SF00502Constants.OPTION_ALL_COMPANY) {
                // 部門指定の場合、明細からサマリーを集計する
                summary = createRevenueSummary(noteModelList);
            } else {
                // 全社の場合、サマリーを集計してサマリーとする
                summary = aggregateRevenueSummary(this.pageData.dataRepo, selectedYear, selectedMonth, this.pageData.selectedTerm, selectedStaffId);
            }
            this.pageData.sumarry = summary;
        }
    }

    private notifyDone(notify: NotifyReturn): void {
        // notify update and close
        notify.update("progress", 100);
        notify.update("type", "success");
        setTimeout((ntf: NotifyReturn) => {
            ntf.close();
        }, 1000, notify);
        // hide content loader
        OneUI.contentLoader('hide');
    }

    confirmIgnoreChange(): Promise<boolean> {

        if (!this.pageData.canEdit) {
            // no change in view mode
            return Promise.resolve(true);
        }

        // current notes
        let currentNotes = this.pageData.increaseList.concat(this.pageData.decreaseList);
        // origin notes
        let cY = this.pageData.selectedMonth.getFullYear();
        let cM = this.pageData.selectedMonth.getMonth() + 1;
        let cS = this.pageData.selectedStaff.id;
        let originNotes = this.pageData.dataRepo.getIncreaseCustomers(cY, cM, cS)
            .concat(this.pageData.dataRepo.getDecreaseCustomers(cY, cM, cS));
        let changeNotes = SF00502Helper.findChanged(currentNotes, originNotes, this.pageData.screenMode);
        let isChanged = changeNotes.length > 0;

        if (isChanged) {
            // have change, warning
            return new Promise((resolve, reject) => {
                swal({
                        title: "",
                        text: Messages.get(MSG.SF00502.WRN001),
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d26a5c",
                        confirmButtonText: "Yes",
                        closeOnConfirm: true
                    },
                    res => resolve(res)
                );
            })
        } else {
            // no change
            return Promise.resolve(true);
        }
    }

    //endregion
}

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
function aggregateRevenue(dataRepo: SF00502DataRepo, year: number, month: number, term: number, staffId: number|undefined): NoteModel[] {
    // 開始月
    let startYear = year;
    let startMonth = month;

    let aggregated: {[customerId: number]: NoteModel} = [];        // キー: 得意先 ID

    // term ヶ月分のデータを集約する
    while (term > 0) {
        let thisMonthNotes = retrieveNoteModels(dataRepo, year, month, staffId);

        for (let note of thisMonthNotes) {
            let aggregatedNote = aggregated[note.customerId];
            if (aggregatedNote) {
                // 以前のデータに加算する
                aggregatedNote.addRevenue(note);
            } else {
                // 新たな得意先
                aggregatedNote = SF00502Helper.cloneNote(note);
                aggregatedNote.year = startYear;
                aggregatedNote.month = startMonth;
                aggregatedNote.comment = '';
                aggregatedNote.newRevenue = aggregatedNote.newRevenue || new RevenueModel();
                aggregatedNote.oldRevenue = aggregatedNote.oldRevenue || new RevenueModel();
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
function aggregateRevenueSummary(dataRepo: SF00502DataRepo, year: number, month: number, term: number, staffId?: number|undefined): NoteModel {
    // staffId 修正
    if (staffId == null) {
        staffId = SF00502Constants.OPTION_ALL_STAFF.id;     // 担当 = 指定なし
    }

    // サマリー集約結果
    let summary = new NoteModel();
    // create summary
    summary.newRevenue = new RevenueModel();
    summary.oldRevenue = new RevenueModel();

    // term ヶ月分のデータを集約する
    while (term > 0) {
        let entry = dataRepo.getSummary(year, month, staffId);
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
function retrieveNoteModels(dataRepo: SF00502DataRepo, year: number, month: number, staffId?: number): NoteModel[] {
    let staffNotes: NoteModel[];
    // 1. find staff notes
    if (staffId == null || staffId == SF00502Constants.OPTION_ALL_STAFF.id) {
        // find department notes
        staffNotes = dataRepo.getCustomerNotes(year, month);
    } else {
        staffNotes = [];
        // find staff notes by his customer
        let customers = dataRepo.getCustomers(staffId);
        customers.forEach((customer) => {
            let note = dataRepo.getCustomerNote(year, month, customer.id);
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
function sortAndSplitRevenueNoteModelList(noteModelList: NoteModel[]): [ NoteModel[], NoteModel[] ] {
    // ソート, プラス/マイナスに分割
    let result = sortAndSplitNoteModelList(noteModelList, {
        comparator: function (n1: NoteModel, n2: NoteModel): number {
            return (n1.newRevenue.total - n1.oldRevenue.total) - (n2.newRevenue.total - n2.oldRevenue.total);
        },

        wherePlus: function (note: NoteModel): boolean {
            return note.newRevenue.total - note.oldRevenue.total >= 0;
        },

        whereMinus: function (note: NoteModel): boolean {
            return note.newRevenue.total - note.oldRevenue.total < 0;
        }
    });

    // 表示件数を制限する
    result[0] = result[0].slice(0, SF00502Constants.LIMIT_LIST);
    result[1] = result[1].slice(0, SF00502Constants.LIMIT_LIST);

    return result;
}

/**
 * 見通し NoteModel をソートして プラス/マイナスに分割する
 *
 * @param noteModelList NodeModel のリスト (破壊的)
 * @returns [ プラス分のリスト, マイナス分のリスト ]
 */
function sortAndSplitPredictionNoteModelList(noteModelList: NoteModel[]): [ NoteModel[], NoteModel[] ] {
    return sortAndSplitNoteModelList(noteModelList, {
        comparator: function (n1: NoteModel, n2: NoteModel): number {
            return (n1.prediction.total - n1.oldRevenue.total) - (n2.prediction.total - n2.oldRevenue.total);
        },

        wherePlus: function (note: NoteModel): boolean {
            return note.prediction.total - note.oldRevenue.total >= 0;
        },

        whereMinus: function (note: NoteModel): boolean {
            return note.prediction.total - note.oldRevenue.total < 0;
        }
    });
}

/**
 * sortAndSplitNoteModelList() の動作を決める関数群
 */
export interface NoteModelOperator {
    /** NoteModel ソート比較関数 */
    comparator: (n1: NoteModel, n2: NoteModel) => number;

    /** プラスな要素なら true を返す関数 */
    wherePlus: (element: NoteModel, index?: number, array?: NoteModel[]) => boolean;

    /** プラスな要素なら true を返す関数 */
    whereMinus: (element: NoteModel, index?: number, array?: NoteModel[]) => boolean;
}

/**
 * NoteModel をソートして プラス/マイナスに分割する
 *
 * @param noteModelList NodeModel のリスト (破壊的)
 * @param operator NoteModelOperator
 * @returns [ プラス分のリスト, マイナス分のリスト ]
 */
function sortAndSplitNoteModelList(noteModelList: NoteModel[], operator: NoteModelOperator): [ NoteModel[], NoteModel[] ] {
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
function createRevenueSummary(noteModelList: NoteModel[]): NoteModel {
    let summary = new NoteModel();
    // create summary
    let newRevenue = new RevenueModel();
    summary.newRevenue = newRevenue;
    let oldRevenue = new RevenueModel();
    summary.oldRevenue = oldRevenue;

    // 3A.1 sum revenue
    noteModelList.forEach((note) => {
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
