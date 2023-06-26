import {Injectable} from "@angular/core";
import {CommonService} from "../../../service/common.service";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {SFN0506Constants} from "./SFN0506.constants";
import {SFN0506Data} from "./SFN0506.data";
import {UserModel} from "./model/SFN0506_User.model";
import {DepartmentModel} from "./model/SFN0506_Department.model";
import {PaymentModel} from "./model/SFN0506_Payment.model";
import {DateUtil} from "../../../util/date-util";
import {SFN0506Helper} from "./SFN0506.helper";
import DataUtil from "../../../util/data-util";
import {Constants} from "../../../helper/constants";

@Injectable()
export class SFN0506Service extends CommonService {

    pageData: SFN0506Data;

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    /**
     * send SF0050201 get request
     * @returns {Promise<TResult>}
     */
    sfn050601(): Promise<void> {
        return this.getApi("/SFN050601").then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // 1. departments
                let departmentList: DepartmentModel[] = [];
                this.pageData.departments = departmentList;

                // 1.1 add all company option
                departmentList.push(SFN0506Constants.OPTION_ALL_COMPANY);
                this.pageData.dataRepo.addUser(SFN0506Constants.OPTION_ALL_USER, SFN0506Constants.OPTION_ALL_COMPANY.id);

                // 1.2 add data from server
                let departments = data["departments"];
                for (let deparment of departments) {
                    let dept = new DepartmentModel();
                    departmentList.push(dept);

                    // parse department data
                    dept.id = deparment["id"];
                    dept.name = deparment["name"];

                    // update repo: add all_staff option
                    this.pageData.dataRepo.addUser(SFN0506Constants.OPTION_ALL_USER, dept.id);
                }

                // 2. users
                let users = data["users"];
                for (let user of users) {
                    let um = new UserModel();

                    // parse user data
                    um.id = user["id"];
                    um.name = user["name"];
                    um.departmentId = user["departmentId"];

                    // update repo: add user to department
                    this.pageData.dataRepo.addUser(user, user.departmentId);
                }

                // 3. now
                let currentTime = DateUtil.getDate(data["now"]);
                this.pageData.currentTime = new Date (currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
            }
        });
    }

    /**
     * send SF0050202 post request
     */
    sfn050602(): Promise<void> {
        let currentFilter = this.pageData.currentFilter;
        let requestData = {
            departmentId: currentFilter.department.id,
            userId: currentFilter.user.id,
            startDate: currentFilter.startDate,
            endDate: currentFilter.endDate,
            dateType: currentFilter.dateType,
            method: currentFilter.method
        };
        return this.postApi("/SFN050602", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                let repo = this.pageData.dataRepo;
                // 1. hits
                this.pageData.hits = data["hits"];
                // 2. result list
                let paymentsData = data["payments"];
                let paymentList: PaymentModel[] = [];
                this.pageData.paymentList = paymentList;
                for (let paymentData of paymentsData) {
                    let payment = new PaymentModel();
                    paymentList.push(payment);

                    // 請求ID
                    payment.code = DataUtil.getString(paymentData["code"], Constants.BLANK);
                    // 得意先名
                    let customerData = paymentData["customer"];
                    payment.customerCode = DataUtil.getString(customerData["code"], Constants.BLANK);
                    payment.customerName = DataUtil.getString(customerData["name"], Constants.BLANK);
                    // 請求額
                    payment.amount = paymentData["amount"];
                    // 請求締め日
                    payment.closingDate = DateUtil.getDate(paymentData["closingDate"]);
                    payment.closingDateStr = DateUtil.formatDate(payment.closingDate, SFN0506Constants.DATE_DISPLAY);
                    // 入金期日
                    payment.dueDate = DateUtil.getDate(paymentData["dueDate"]);
                    payment.dueDateStr = DateUtil.formatDate(payment.dueDate, SFN0506Constants.DATE_DISPLAY);
                    // 方法
                    payment.method = DataUtil.getString(paymentData["method"], Constants.BLANK);
                    // 入金確認日
                    payment.payDate = DateUtil.getDate(paymentData["payDate"]);
                    // 状況
                    payment.status = SFN0506Helper.getPaymentStatus(payment.payDate, payment.dueDate, this.pageData.currentTime);
                }
            } else if (messageCode == "ERR001") {
                throw 1;
            }
        });
    }
}