import {Injectable} from "@angular/core";
import {CommonService} from "../../../service/common.service";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {SFN0505Constants} from "./SFN0505.constants";
import {SFN0505Data} from "./SFN0505.data";
import {UserModel} from "./model/SFN0505_User.model";
import {DepartmentModel} from "./model/SFN0505_Department.model";
import {ShippingModel} from "./model/SFN0505_Shipping.model";
import {DateUtil} from "../../../util/date-util";
import {SFN0505Helper} from "./SFN0505.helper";

@Injectable()
export class SFN0505Service extends CommonService {

    pageData: SFN0505Data;

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    /**
     * send SF0050201 get request
     * @returns {Promise<TResult>}
     */
    sfn050501(): Promise<void> {
        return this.getApi("/SFN050501").then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // 1. departments
                let departmentList: DepartmentModel[] = [];
                this.pageData.departments = departmentList;

                // 1.1 add all company option
                departmentList.push(SFN0505Constants.OPTION_ALL_COMPANY);
                this.pageData.dataRepo.addUser(SFN0505Constants.OPTION_ALL_USER, SFN0505Constants.OPTION_ALL_COMPANY.id);

                // 1.2 add data from server
                let departments = data["departments"];
                for (let deparment of departments) {
                    let dept = new DepartmentModel();
                    departmentList.push(dept);

                    // parse department data
                    dept.id = deparment["id"];
                    dept.name = deparment["name"];

                    // update repo: add all_staff option
                    this.pageData.dataRepo.addUser(SFN0505Constants.OPTION_ALL_USER, dept.id);
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
            }
        });
    }

    /**
     * send SF0050202 post request
     */
    sfn050502(): Promise<void> {
        let currentFilter = this.pageData.currentFilter;
        let requestData = {
            departmentId: currentFilter.department.id,
            userId: currentFilter.user.id,
            startDate: currentFilter.startDate,
            endDate: currentFilter.endDate
        };
        return this.postApi("/SFN050502", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                let repo = this.pageData.dataRepo;
                // 1. hits
                this.pageData.hits = data["hits"];
                // 2. result list
                let shippingsData = data["shippings"];
                let shippingList: ShippingModel[] = [];
                this.pageData.shippingList = shippingList;
                for (let shippingData of shippingsData) {
                    let shipping = new ShippingModel();
                    shippingList.push(shipping);

                    // 出荷予定日
                    shipping.planDate = DateUtil.getDate(shippingData["shippingDate"])
                    if (shipping.planDate != undefined) {
                        shipping.planDateStr = moment(shipping.planDate).format(SFN0505Constants.DATE_DISPLAY);
                    }
                    // 案件ID
                    let dealData = shippingData["deal"];
                    shipping.dealCode = dealData["code"];
                    // 得意先名
                    let customerData = dealData["customer"];
                    shipping.customerCode = customerData["code"];
                    shipping.customerName = customerData["name"];
                    // 品名
                    let productData = shippingData["product"];
                    shipping.productCode = productData["code"];
                    shipping.productName = productData["name"];
                    shipping.productType = productData["type"];
                    shipping.productShapeId = productData["shapeId"];
                    shipping.cartonShippingType = productData["cartonShippingType"];
                    // 出荷予定数
                    shipping.planAmount = shippingData["planQuantity"];
                    // 出荷実績数
                    shipping.actualAmount = shippingData["actualQuantity"];
                    // 制限
                    shipping.restriction = dealData["restriction"];
                    shipping.restrictionStr = SFN0505Helper.getRestrictionText(shipping.restriction);
                    // 状況
                    shipping.status = SFN0505Helper.getShippingStatus(shipping.planAmount, shipping.actualAmount);
                    shipping.statusStr = SFN0505Helper.getShippingStatusText(shipping.status);
                    // highlight
                    shipping.highlight = SFN0505Helper.getShippingHighlight(shipping);
                }
            } else if (messageCode == "ERR001") {
                throw 1;
            }
        });
    }
}