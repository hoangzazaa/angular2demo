import {Component, ViewEncapsulation, OnInit, ApplicationRef} from "@angular/core";
import {HeaderProvider} from "../SF00100/Header.provider";
import {Router, ActivatedRoute} from "@angular/router";
import {CommonPage} from "../COMMON/common.page";
import {CC00100Service} from "../../CC/CC00100/CC00100.service";
import {User} from "../../../model/core/User.model";
import {ScreenUrl} from "../../../helper/screen-url";
import {SF00501Data} from "./SF00501.data";
import {SF00501Service} from "./SF00501.service";
import {SF00501Constants} from "./SF00501.constants";
import {MSG, default as Messages} from "../../../helper/message";
import {DepartmentModel} from "./model/SF00501_Department.model";
import {StaffModel} from "./model/SF00501_Staff.model";
import {Constants} from "../../../helper/constants";
import {DateUtil} from "../../../util/date-util";
import {DateModel} from "./model/SF00501_Date.model";
import {SF00501Helper} from "./SF00501.helper";
import {ViewModeModel} from "./model/SF00501_ViewMode.model";

// use OneUI
declare let OneUI: OneUI;

@Component({
    templateUrl: "SF00501.page.html",
    styleUrls: ["SF00501.page.css"],
    providers: [SF00501Service],
    encapsulation: ViewEncapsulation.None
})
export class SF00501Page extends CommonPage implements OnInit {

    // pageData
    pageData: SF00501Data;
    // current User
    user: User;

    //region Initialize page
    constructor(public router: Router, public route: ActivatedRoute, public headerProvider: HeaderProvider,
                private service: SF00501Service, authService: CC00100Service, private appRef: ApplicationRef) {
        super(router, route, headerProvider);

        // init page data
        this.pageData = new SF00501Data();
        service.pageData = this.pageData;

        // get current user
        this.user = authService.user;
        // create list deals
        this.pageData.deals = [];
        this.pageData.products = [];
    }

    protected pageTile(): string {
        return "営業実績照会";
    }

    //endregion

    // get data on page load
    ngOnInit(): void {

        this.service.navigateTo(" 営業実績照会", this.router.url);

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
        this.service.sf0050101().then(() => {
            // setup date options
            this.setupDateOptions();

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
                // department found, select department
                this.pageData.selectedFilter.department = curDepartment;

                // set staff list
                this.pageData.staffs = this.pageData.dataRepo.getStaffs(curDepartment.id);

                // find default staff
                let curStaff: StaffModel;
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
                if (curStaff != undefined) {
                    // staff found, select staff
                    this.pageData.selectedFilter.staff = curStaff;
                } else {
                    // staff not found, select all
                    this.pageData.selectedFilter.staff = SF00501Constants.OPTION_ALL_STAFF;
                }
            } else {
                // default select all company
                this.pageData.selectedFilter.department = SF00501Constants.OPTION_ALL_DEPT;
                this.pageData.selectedFilter.staff = SF00501Constants.OPTION_ALL_STAFF;
                this.pageData.staffs = this.pageData.dataRepo.getStaffs(SF00501Constants.OPTION_ALL_DEPT.id);
            }

            // set default filter radio value
            this.pageData.selectedFilter.dateUnit = SF00501Constants.OPTION_DATE_UNIT_YEAR;
            this.pageData.selectedFilter.customerType = SF00501Constants.OPTION_CUSTOMER_ALL;
            this.pageData.selectedFilter.sumaryType = SF00501Constants.OPTION_SUMMARY_PERFORMANCE;

            // set default select date: current year > always [1] options
            this.pageData.dateOptions = this.pageData.dataRepo.getSelectDates(SF00501Constants.OPTION_DATE_UNIT_YEAR);
            this.pageData.selectedFilter.date = this.pageData.dateOptions[1];

            // start first time filter
            this.doFilter();
        });
    }

    //region Actions

    doFilter() {

        // get header
        let headTitle = this.getHeadline();

        // show loader
        OneUI.contentLoader('show');
        // notify loading
        let notify = $.notify({
            message: Messages.get(MSG.SF00501.INF002, headTitle)
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });

        // call service filter
        this.service.sf0050102().then(() => {
            // update last filter
            this.updateLastFilter();

            // change headline
            this.pageData.headline = headTitle;

            // check for display
            this.checkDateList();
            this.checkViewMode();

            // set default view mode to product
            this.pageData.selectedViewMode = SF00501Constants.OPTION_DETAIL_PRODUCT;

            // analyze data for details
            this.analyzeData();
            // analyze graph data
            this.pageData.graphData = SF00501Helper.analyzeGraph(this.pageData);

            // check summary table
            this.checkSummaryTable();

            // reinit datatable
            this.reInitDataTable();
            // redraw chart
            this.redrawGraph();
            // hide deal details
            this.pageData.showDealList = false;

            // notify update and close
            this.notifyDone(notify);
        }, reason => {
            // show warning message
            swal({
                title: "",
                text: MSG.SF00501.WRN001,
                type: "warning",
                confirmButtonColor: "#d26a5c",
                confirmButtonText: "OK",
                html: false,
            });
            // notify close
            notify.close();
            // hide content loader
            OneUI.contentLoader('hide');
        });
    }

    goBack() {
        this.navigate(ScreenUrl.SF001);
    }

    //endregion

    //region functions

    getHeadline(): string {
        let headline = "";
        // department
        headline += "<span>";
        headline += this.pageData.selectedFilter.department.name;
        // user
        if (this.pageData.selectedFilter.department != SF00501Constants.OPTION_ALL_DEPT
            && this.pageData.selectedFilter.staff != SF00501Constants.OPTION_ALL_STAFF) {
            headline += "/" + this.pageData.selectedFilter.staff.name;
        }
        headline += "</span>";
        // date unit
        headline += " <span>";
        headline += " " + this.pageData.selectedFilter.date.name;
        headline += "</span>";
        // customer type
        headline += " <span>";
        if (this.pageData.selectedFilter.customerType == SF00501Constants.OPTION_CUSTOMER_ALL) {
            headline += "全体得意先";
        } else if (this.pageData.selectedFilter.customerType == SF00501Constants.OPTION_CUSTOMER_OLD) {
            headline += "既存得意先";
        } else if (this.pageData.selectedFilter.customerType == SF00501Constants.OPTION_CUSTOMER_NEW) {
            headline += "新規得意先";
        }
        headline += "</span>";
        // summay type
        headline += " <span>";
        if (this.pageData.selectedFilter.sumaryType == SF00501Constants.OPTION_SUMMARY_PERFORMANCE) {
            headline += "(実績)";
        } else if (this.pageData.selectedFilter.sumaryType == SF00501Constants.OPTION_SUMMARY_INPROCESS) {
            headline += "(仕掛り)";
        }
        headline += "</span>";

        return headline;
    }

    /**
     * update date list
     */
    checkDateList() {
        let pageData = this.pageData;
        let dateList: number[] = [];
        if (pageData.currentFilter.dateUnit == SF00501Constants.OPTION_DATE_UNIT_YEAR) {
            // year: [4,5...,2,3]
            dateList = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];
        } else if (pageData.currentFilter.dateUnit == SF00501Constants.OPTION_DATE_UNIT_HALF_YEAR) {
            // half year
            if (pageData.currentFilter.date.startMonth == 4) {
                dateList = [4, 5, 6, 7, 8, 9];
            } else {
                dateList = [10, 11, 12, 1, 2, 3];
            }
        } else if (pageData.currentFilter.dateUnit == SF00501Constants.OPTION_DATE_UNIT_QUARTER) {
            // quarter: [startMonth -> startMonth + 2]
            let sM = pageData.currentFilter.date.startMonth;
            dateList = [sM, sM + 1, sM + 2];
        } else {
            // month -> [1,2,3...]
            let days = new Date(pageData.currentFilter.date.startYear, pageData.currentFilter.date.startMonth, 0).getDate();
            dateList = [];
            for (let i = 1; i <= days; i++) {
                dateList.push(i);
            }
        }
        pageData.dateList = dateList;
    }

    /**
     * check show/hide summary table
     */
    checkSummaryTable() {
        let show = false;
        // show if view staff - month
        if (this.pageData.currentFilter.dateUnit == SF00501Constants.OPTION_DATE_UNIT_MONTH) {
            show = true;
        }
        // show if view by staff
        if (this.pageData.selectedViewMode == SF00501Constants.OPTION_DETAIL_STAFF) {
            show = true;
        }
        // show if view by group
        if (this.pageData.selectedViewMode == SF00501Constants.OPTION_DETAIL_DEPT) {
            show = true;
        }

        this.pageData.showSummaryTable = show;

        if (this.pageData.showSummaryTable) {
            this.pageData.summary = SF00501Helper.calculateSummaryData(this.pageData);
        }
    }

    checkViewMode() {
        let viewModes: ViewModeModel[];
        let selectedViewMode;
        if (this.pageData.currentFilter.department == SF00501Constants.OPTION_ALL_DEPT) {
            // 支店名 is 全社 -> 製品種類別, グループ別
            viewModes = [SF00501Constants.OPTION_DETAIL_PRODUCT, SF00501Constants.OPTION_DETAIL_DEPT];
            selectedViewMode = SF00501Constants.OPTION_DETAIL_PRODUCT;
        } else {
            // 支店名 is sales dept
            if (this.pageData.currentFilter.staff == SF00501Constants.OPTION_ALL_STAFF) {
                // 担当者名 is 指定なし -> 製品種類別, スタッフ別
                viewModes = [SF00501Constants.OPTION_DETAIL_PRODUCT, SF00501Constants.OPTION_DETAIL_STAFF];
                selectedViewMode = SF00501Constants.OPTION_DETAIL_PRODUCT;
            } else {
                // 担当者名 is sales staff
                if (this.pageData.currentFilter.dateUnit == SF00501Constants.OPTION_DATE_UNIT_MONTH) {
                    // 期間 is 月 -> 製品種類別, 案件一覧
                    viewModes = [SF00501Constants.OPTION_DETAIL_PRODUCT, SF00501Constants.OPTION_DETAIL_DEAL];
                    selectedViewMode = SF00501Constants.OPTION_DETAIL_PRODUCT;
                }
            }
        }

        this.pageData.viewModes = viewModes;
        this.pageData.selectedViewMode = selectedViewMode;
    }

    private setupDateOptions() {

        let repo = this.pageData.dataRepo;

        // get current finacial year
        let fYear = DateUtil.getFinancialYear(this.pageData.currentTime);

        // setup date for 通期
        let yearOptions = [];
        for (let iY = fYear - 1; iY <= fYear + 1; iY++) {
            let option = new DateModel();
            yearOptions.push(option);

            // date = 4/fY -> 3/fY+1
            option.startYear = iY;
            option.startMonth = 4;
            option.endYear = iY + 1;
            option.endMonth = 3;
            option.name = option.startYear + "年";
        }
        repo.setSelectDates(yearOptions, SF00501Constants.OPTION_DATE_UNIT_YEAR);

        // setup date for 半期
        let halfYearOptions = [];
        for (let iY = fYear - 1; iY <= fYear + 1; iY++) {
            for (let jH = 0; jH <= 1; jH++) {
                let option = new DateModel();
                halfYearOptions.push(option);

                // date = (4/fY -> 9/fY) | (10/fY -> 3/fY+1)
                option.startYear = iY;
                option.startMonth = 4 + jH * 6;
                option.endYear = iY + jH;
                option.endMonth = 9 - jH * 6;
                option.name = option.startYear + "年" + (option.startMonth == 4 ? "上期" : "下期");
            }
        }
        repo.setSelectDates(halfYearOptions, SF00501Constants.OPTION_DATE_UNIT_HALF_YEAR);

        // setup date for 四半期
        let quarterOptions = [];
        for (let iY = fYear - 1; iY <= fYear + 1; iY++) {
            for (let jH = 0; jH <= 3; jH++) {
                let option = new DateModel();
                quarterOptions.push(option);

                // date = (4/fY -> 6/fY) | (7/fY -> 9/fY) | (10/fY -> 12/fY) | (1/fY+1 -> 3/fY+1)
                option.startYear = iY + Math.floor(jH / 3);
                option.startMonth = (4 + jH * 3) % 12;
                option.endYear = iY + Math.floor(jH / 3);
                option.endMonth = (6 + jH * 3) > 12 ? (6 + jH * 3) - 12 : (6 + jH * 3);
                option.name = option.startYear + "年" + option.startMonth + "～" + option.endMonth + "月";
            }
        }
        repo.setSelectDates(quarterOptions, SF00501Constants.OPTION_DATE_UNIT_QUARTER);

        // setup date for 月
        let monthOptions = [];
        for (let iY = fYear - 1; iY <= fYear + 1; iY++) {
            for (let jH = 0; jH <= 11; jH++) {
                let option = new DateModel();
                monthOptions.push(option);

                // date = (4/iY) -> (3/iY+1)
                let tmpY = jH >= 9 ? iY + 1 : iY;
                let tmpM = jH >= 9 ? jH - 8 : jH + 4;

                option.startYear = tmpY;
                option.startMonth = tmpM;
                option.endYear = tmpY;
                option.endMonth = tmpM;
                option.name = option.startYear + "年" + option.startMonth + "月";
            }
        }
        repo.setSelectDates(monthOptions, SF00501Constants.OPTION_DATE_UNIT_MONTH);
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

    analyzeData() {
        if (this.pageData.selectedViewMode == SF00501Constants.OPTION_DETAIL_STAFF
            || this.pageData.selectedViewMode == SF00501Constants.OPTION_DETAIL_DEPT) {
            this.pageData.displayDetails = SF00501Helper.analyzeDataByAgent(this.pageData);
        } else if (this.pageData.selectedViewMode == SF00501Constants.OPTION_DETAIL_PRODUCT) {
            this.pageData.displayDetails = SF00501Helper.analyzeDataByProduct(this.pageData);
        }
    }

    reInitDataTable() {
        this.pageData.displayTable = false;
        this.appRef.tick();
        this.pageData.displayTable = true;
    }

    redrawGraph() {
        this.pageData.graphData = SF00501Helper.analyzeGraph(this.pageData);
        this.pageData.displayGraph = false;
        this.appRef.tick();
        this.pageData.displayGraph = true;
    }

    private updateLastFilter() {
        let selectedFilter = this.pageData.selectedFilter;
        let curFilter = this.pageData.currentFilter;

        curFilter.department = selectedFilter.department;
        curFilter.staff = selectedFilter.staff;
        curFilter.customerType = selectedFilter.customerType;
        curFilter.date = selectedFilter.date;
        curFilter.dateUnit = selectedFilter.dateUnit;
        curFilter.sumaryType = selectedFilter.sumaryType;
    }

    //endregion

    getListDealBySaleIdAndMonth() {
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        let notify = $.notify({
            message: Messages.get(MSG.SF00501.INF003)
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        this.service.sf0050103().then(() => {
            // sort data
            this.pageData.deals.reverse();
            this.pageData.displayTable = false;
            this.pageData.showDealList = true;
            this.notifyDone(notify);
        }).catch(err => {
            this.notifyDone(notify);
        });
    }

    // view deal detail by deal code
    dealDetail(dealCode) {
        this.navigate(ScreenUrl.SF00301 + "/" + dealCode);
    }

    get isViewDeal(): boolean {
        return this.pageData.showDealList;
    }
}