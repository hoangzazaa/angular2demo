import {AfterViewInit, Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Constants} from "../../../helper/constants";
import Messages, {MSG} from "../../../helper/message";
import {FormatUtil} from "../../../util/format-util";
import MathUtil from "../../../util/math-util";
import ValidatorUtil from "../../../util/validator-util";
import {CC00100Service} from "../../CC/CC00100/CC00100.service";
import {CommonPage} from "../COMMON/common.page";
import {HeaderProvider} from "../SF00100/Header.provider";
import {SF00101Data} from "./SF00101.data";
import {SF00101Service} from "./SF00101.service";

const SF00101_PAGE_TITLE: string = "ダッシュボード";

declare let Handsontable: any;
declare let App: any;
declare var $: JQueryStatic | any;

@Component({
    selector   : "dashboard-page",
    templateUrl: "./SF00101.page.html"
})
export class SF00101Page extends CommonPage implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
    }

    constructor(router: Router, route: ActivatedRoute, headerProvider: HeaderProvider,
                private authService: CC00100Service, public pageService: SF00101Service) {
        super(router, route, headerProvider);
    }

    ngOnInit(): void {
        this.pageService.navigateTo("ダッシュボード", this.router.url);

        let departmentID = this.authService.user.departmentId;
        let picId        = this.authService.user.id;

        // get department
        let department = this.pageData.departments.find(item => {
            return item.id == departmentID;

        });
        if (!!department) {
            // list sale by departments
            this.pageData.salesTab1 = department.users;
            this.pageData.salesTab2 = department.users;
        } else {
            departmentID = 0;
            picId        = 0;
        }
        //init filter
        this.pageData.modelFilterTab1.departmentID = departmentID;
        this.pageData.modelFilterTab1.picId        = picId;
        this.pageData.modelFilterTab2.departmentID = departmentID;
        this.pageData.modelFilterTab2.picId        = picId;

        let seft = this;
        // init tab1
        App.loader("show");
        this.pageService.initDataTab1().then(() => {
            //
            seft.updateDataChart();
            //
            App.loader("hide");
        });

        this.pageData.loadDataTable();
    }


    protected initBreadcrumb(): void {
        this.headerProvider.reset();
        this.headerProvider.pageName = SF00101_PAGE_TITLE;
        this.headerProvider.addBreadCrumb(Constants.TOP, []);
    }

    viewSalesPerformance() {
        let departmentId = this.authService.user.departmentId;
        if (ValidatorUtil.isNotEmpty(departmentId))
            return super.navigate('/home/view-sales-performance');

        // Fix #1747
        return swal(Constants.BLANK, Messages.get(MSG.COM.WRN003), "error");
    }

    get pageData(): SF00101Data {
        return this.pageService.pageData;
    }

    filterDataTab1() {
        App.loader("show");
        this.pageService.initDataTab1().then(() => {
            this.updateDataChart();
            App.loader("hide");
        });
    }

    filterDataTab2() {
        App.loader("show");
        this.pageService.initDataTab2().then(() => {
            App.loader("hide");
        });
    }


    viewDealDetail(dealCode: string): void {
        this.router.navigate(['home/deal', dealCode]);
    }

    saveDataInput() {
        App.loader("show");
        this.pageService.saveDataInput().then(() => {
            App.loader("hide");
            $.notify({message: Messages.get(MSG.SF00100.INF001)}, {type: 'success'});
        });
    }

    getPercent(actual: number, total: number): any {
        if (total == 0 || total == undefined)
            return '( ' + Constants.HYPHEN + ' )';

        let rs = (actual / total) * 100;
        return MathUtil.round(rs, 2);
    }

    formatValueMax(value: number): number {
        if (value > 100)
            return 100;
        return value;
    }

    updateDataChart() {
        $('#js-pie-chart1').data('easyPieChart').update(
            this.formatValueMax(FormatUtil.isNaN(this.getPercent
            (this.pageData.receipts.current, this.pageData.receipts.goal)))
        );
        $('#js-pie-chart2').data('easyPieChart').update(
            this.formatValueMax(FormatUtil.isNaN(this.getPercent
            (this.pageData.newReceipts.current, this.pageData.newReceipts.goal)))
        );
        $('#js-pie-chart3').data('easyPieChart').update(
            this.formatValueMax(FormatUtil.isNaN(this.getPercent
            (this.pageData.recordNew.current, this.pageData.recordNew.goal)))
        );
        $('#js-pie-chart4').data('easyPieChart').update(
            this.formatValueMax(FormatUtil.isNaN(this.getPercent
            (this.pageData.digitalSale.current, this.pageData.digitalSale.goal)))
        );
    }

    // check salePic
    get checkSalePic(): boolean {
        let userAuthen = this.authService.user;

        if (this.pageData.modelFilterTab1.picId == userAuthen.id) return true;

        return false;
    }

    onChangeTab(tabNumber: number) {
        let self = this;
        App.loader("show");
        if (tabNumber == 1) {
            // init tab2
            this.pageService.initDataTab1().then(() => {
                App.loader("hide");
            });
        }
        if (tabNumber == 2) {
            // init tab1
            this.pageService.initDataTab2().then(() => {

                // check list dataTable != null and dataTable.lenght>0
                if (!!self.pageData.dataTable && this.pageData.dataTable.length > 0) {
                    setTimeout(function () {
                        self.pageData.handsonTable.render();
                    }, 50);
                }
                App.loader("hide");
            });
        }
    }

    get pageSize(): number {
        return this.pageData.pageSize;
    }

    get totalRecords(): number {
        return this.pageData.totalRecords;
    }

    onPageChange(currentPage: number): void {
        let limit = this.pageData.pageSize;
        let offset = ((currentPage || Constants.FIRST_PAGE) - 1) * this.pageData.pageSize;

        let req = {
            picId: this.authService.user.id,
            departmentId: this.authService.user.departmentId,
            indexFrom: offset,
            indexTo: limit
        };

        this.pageService.getDeals(req).then(() => this.$scrollTop("#dealInfo")).catch(err => console.log(err.statusText));
    }

}
