import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {HeaderProvider} from "../SF00100/Header.provider";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonPage} from "../COMMON/common.page";
import {MSG} from "../../../helper/message";
import {CC00100Service} from "../../CC/CC00100/CC00100.service";
import {User} from "../../../model/core/User.model";
import {ScreenUrl} from "../../../helper/screen-url";
import {SFN0505Service} from "./SFN0505.service";
import {SFN0505Data} from "./SFN0505.data";
import {SFN0505Constants} from "./SFN0505.constants";
import {Constants} from "../../../helper/constants";
import {DepartmentModel} from "./model/SFN0505_Department.model";
import {UserModel} from "./model/SFN0505_User.model";
import {SFN050502Component} from "./component/SFN050502.ShippingList.component";
import {ShippingModel} from "./model/SFN0505_Shipping.model";
import {PathUtil} from "../../../util/path-util";

// use OneUI
declare let OneUI: OneUI;

@Component({
    templateUrl: "SFN0505.page.html",
    styleUrls: ["SFN0505.page.css"],
    providers: [SFN0505Service],
    encapsulation: ViewEncapsulation.None
})
export class SFN0505Page extends CommonPage implements OnInit {

    // pageData
    pageData: SFN0505Data;
    // current User
    user: User;
    @ViewChild(SFN050502Component) sfn050502: SFN050502Component;

    //region Initialize page
    constructor(public router: Router, public route: ActivatedRoute, public headerProvider: HeaderProvider,
                private service: SFN0505Service, authService: CC00100Service) {
        super(router, route, headerProvider);

        // init page data
        this.pageData = new SFN0505Data();
        service.pageData = this.pageData;

        // get current user
        this.user = authService.user;
    }

    protected pageTile(): string {
        return "出荷状況照会";
    }

    //endregion

    // get data on page load
    ngOnInit(): void {
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        let notify = $.notify({
            message: MSG.SFN0505.INF001
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });

        // setting default start/end date
        let now = moment();
        this.pageData.currentFilter.startDate = moment.utc().startOf("month").toDate();
        this.pageData.currentFilter.endDate = moment.utc().endOf("month").toDate();

        // load data
        this.service.sfn050501().then(() => {

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
                let cUser: UserModel = SFN0505Constants.OPTION_ALL_USER;
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
    selectDepartment(value: DepartmentModel, defaultUser = SFN0505Constants.OPTION_ALL_USER) {
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
            message: MSG.SFN0505.INF002
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        notify.update("progress", 10);

        return this.service.sfn050502().then(() => {
            // set page to 1st
            this.pageData.page = 1;
            // reload data
            this.sfn050502.reloadData(true);
            // notify update and close
            this.notifyDone(notify);
        }, (err) => {
            this.notifyDone(notify);
            swal({
                title: "",
                text: MSG.SFN0505.WRN001,
                type: "warning",
                confirmButtonColor: "#d26a5c",
                confirmButtonText: "OK",
                html: false,
            });
        });
    }

    navigateToCustomer(shipping: ShippingModel) {
        let customerCode = shipping.customerCode;
        this.navigate2(["home", "customer", customerCode]);
    }

    navigateToDeal(shipping: ShippingModel) {
        let dealCode = shipping.dealCode;
        this.navigate2(['home/deal', dealCode]);
    }

    navigateToProduct(shipping: ShippingModel) {
        let dealCode = shipping.dealCode;
        let productType = shipping.productType;
        let shapeId = shipping.productShapeId;
        let productCode = shipping.productCode;
        let cartonShippingType = shipping.cartonShippingType;

        PathUtil.redirectToPageProduct(this.router,dealCode,productCode,productType,shapeId,cartonShippingType);
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