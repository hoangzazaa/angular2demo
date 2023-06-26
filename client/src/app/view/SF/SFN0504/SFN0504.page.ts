import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {HeaderProvider} from "../SF00100/Header.provider";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonPage} from "../COMMON/common.page";
import {MSG} from "../../../helper/message";
import {CC00100Service} from "../../CC/CC00100/CC00100.service";
import {User} from "../../../model/core/User.model";
import {ScreenUrl} from "../../../helper/screen-url";
import {SFN0504Service} from "./SFN0504.service";
import {SFN0504Data} from "./SFN0504.data";
import {SFN0504Constants} from "./SFN0504.constants";
import {Constants} from "../../../helper/constants";
import {DepartmentModel} from "./model/SFN0504_Department.model";
import {UserModel} from "./model/SFN0504_User.model";
import {StockModel} from "./model/SFN0504_Stock.model";
import {SFN050402Component} from "./component/SFN050402.StockList.component";
import {PathUtil} from "../../../util/path-util";

// use OneUI
declare let OneUI: OneUI;

@Component({
    templateUrl: "SFN0504.page.html",
    styleUrls: ["SFN0504.page.css"],
    providers: [SFN0504Service],
    encapsulation: ViewEncapsulation.None
})
export class SFN0504Page extends CommonPage implements OnInit {

    // pageData
    pageData: SFN0504Data;
    // current User
    user: User;
    @ViewChild(SFN050402Component) sfn050402: SFN050402Component;

    //region Initialize page
    constructor(public router: Router, public route: ActivatedRoute, public headerProvider: HeaderProvider,
                private service: SFN0504Service, authService: CC00100Service) {
        super(router, route, headerProvider);

        // init page data
        this.pageData = new SFN0504Data();
        service.pageData = this.pageData;

        // get current user
        this.user = authService.user;
    }

    // init breadcrumb
    protected initBreadcrumb(): void {
        let self = this;
        self.headerProvider.reset();
        self.headerProvider.pageName = "在庫状況照会";
        self.headerProvider.addBreadCrumb(Constants.TOP, [Constants.SLASH]); //Dashboard
        self.headerProvider.addBreadCrumb("在庫状況照会");
    }

    //endregion

    // get data on page load
    ngOnInit(): void {
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        let notify = $.notify({
            message: MSG.SFN0504.INF001
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });

        // default filter
        let currentFilter = this.pageData.currentFilter;
        currentFilter.stockDays = 0;
        currentFilter.stockType = 0;

        // load data
        this.service.sfn050401().then(() => {

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
                // find default user
                let cUser: UserModel = SFN0504Constants.OPTION_ALL_USER;
                if (this.user.role == Constants.USER_ROLE_STAFF) {
                    // find current user
                    let userList = this.pageData.dataRepo.getUsers(curDepartment.id);
                    for (let user of userList) {
                        if (user.id == this.user.id) {
                            cUser = user;
                            break;
                        }
                    }
                }

                // department found, select department
                this.selectDepartment(curDepartment, cUser);
            } else {
                // default select department[0]
                if (this.pageData.departments.length > 0) {
                    this.selectDepartment(this.pageData.departments[0]);
                }
            }

            // notify update and close
            this.notifyDone(notify);

            // load data
            this.loadData();
        });
    }

    //region bindings

    //endregion

    //region Actions

    // set selected department
    selectDepartment(value: DepartmentModel, defaultUser = SFN0504Constants.OPTION_ALL_USER) {
        // set department
        this.pageData.currentFilter.department = value;
        // change user list to department's user
        this.pageData.users = this.pageData.dataRepo.getUsers(this.pageData.currentFilter.department.id);
        // select default user
        this.pageData.currentFilter.user = defaultUser;
    }

    loadData(): Promise<void> {
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        let notify = $.notify({
            message: MSG.SFN0504.INF002
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        notify.update("progress", 10);

        return this.service.sfn050402().then(() => {
            // set page to 1st
            this.pageData.page = 1;
            // reload data
            this.sfn050402.reloadData(true);
            // notify update and close
            this.notifyDone(notify);
        }, (err) => {
            this.notifyDone(notify);
            swal({
                title: "",
                text: MSG.SFN0504.WRN001,
                type: "warning",
                confirmButtonColor: "#d26a5c",
                confirmButtonText: "OK",
                html: false,
            });
        });
    }

    navigateToCustomer(stock: StockModel) {
        let customerCode = stock.customerCode;
        this.navigate2(["home", "customer", customerCode]);
    }

    navigateToDeal(stock: StockModel) {
        let dealCode = stock.dealCode;
        this.navigate2(['home/deal', dealCode]);
    }

    navigateToProduct(stock: StockModel) {
        let dealCode = stock.dealCode;
        let productType = stock.productType;
        let shapeId = stock.productShapeId;
        let productCode = stock.productCode;
        let cartonShippingType = stock.cartonShippingType;

        PathUtil.redirectToPageProduct(this.router,dealCode,productCode,productType,shapeId,cartonShippingType);
    }

    shippingStock(stock: StockModel) {
        this.navigate2(["home", "deal", stock.dealCode, "order"], {
            queryParams: {
                "product": stock.productCode,
                "stock": stock.quantity
            }
        });
    }

    goBack() {
        this.navigate(ScreenUrl.SF001);
    }

    //endregion

    //region functions

    // set selected user

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

    //endregion
}