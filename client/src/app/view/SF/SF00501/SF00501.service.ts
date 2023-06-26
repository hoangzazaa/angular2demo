import {Injectable} from "@angular/core";
import {CommonService} from "../../../service/common.service";
import {SF00501Data} from "./SF00501.data";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {DepartmentModel} from "./model/SF00501_Department.model";
import {SF00501Constants} from "./SF00501.constants";
import {StaffModel} from "./model/SF00501_Staff.model";
import {DetailModel} from "./model/SF00501_Detail.model";
import {AgentModel} from "./model/SF00501_Agent.model";
import {DealModel, OrderItemModel} from "./model/SF00501_Deal.model";
import {ProductInfoModel} from "../COMMON/productinfo/model/ProductInfo.model";
import {MstLamination} from "../COMMON/model/MstLamination.model";

@Injectable()
export class SF00501Service extends CommonService {

    pageData: SF00501Data;

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    /**
     * send SF0050101 get request
     * @returns {Promise<TResult>}
     */
    sf0050101(): Promise<void> {
        return this.getApi("/SF0050101").then(res => {
            let data        = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // 1. departments
                let departmentList: DepartmentModel[] = [];
                this.pageData.departments             = departmentList;

                // add default department
                departmentList.push(SF00501Constants.OPTION_ALL_DEPT);
                // add default option for department
                this.pageData.dataRepo.addStaff(SF00501Constants.OPTION_ALL_STAFF, SF00501Constants.OPTION_ALL_DEPT.id);

                let departments = data["departments"];
                for (let department of departments) {
                    let dept = new DepartmentModel();
                    departmentList.push(dept);

                    // parse department data
                    dept.id   = department["id"];
                    dept.name = department["name"];

                    // update repo: add all_staff option
                    this.pageData.dataRepo.addStaff(SF00501Constants.OPTION_ALL_STAFF, dept.id);
                }

                // 2. staffs
                let staffs = data["staffs"];
                for (let staff of staffs) {
                    let stf = new StaffModel();

                    // parse staff data
                    stf.id           = staff["id"];
                    stf.name         = staff["name"];
                    stf.departmentId = staff["departmentId"];

                    // update repo: add staff to department
                    this.pageData.dataRepo.addStaff(staff, staff.departmentId);
                }

                // 3. now
                this.pageData.currentTime = new Date(data["now"]);
            }
        });
    }

    /**
     * send SF0050102 post request
     */
    sf0050102(): Promise<void> {
        let requestData = {
            departmentId: this.pageData.selectedFilter.department.id,
            staffId     : this.pageData.selectedFilter.staff.id,
            startYear   : this.pageData.selectedFilter.date.startYear,
            startMonth  : this.pageData.selectedFilter.date.startMonth,
            endYear     : this.pageData.selectedFilter.date.endYear,
            endMonth    : this.pageData.selectedFilter.date.endMonth,
            customerType: this.pageData.selectedFilter.customerType,
            // summaryType : this.pageData.selectedFilter.sumaryType
            summaryType : 1
        };
        let repo        = this.pageData.dataRepo;
        return this.postApi("/SF0050102", requestData).then(res => {
            let data        = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                this.pageData.details = [];

                // 1. departments
                repo.clearAgents();
                this.pageData.dataAgents = [];
                let agentDatas           = data["agents"];
                if (agentDatas != undefined) {
                    for (let agentData of agentDatas) {
                        let agent: AgentModel = new AgentModel();
                        agent.id              = agentData["id"];
                        agent.name            = agentData["name"];

                        repo.setAgent(agent, agent.id);
                        this.pageData.dataAgents.push(agent);
                    }
                }

                // 2. revenues
                let revenueDatas                                                         = data["revenues"];
                let revenueDetails: DetailModel[]                                        = [];
                let revenueMap: { [id: number]: { [productType: number]: DetailModel } } = {};
                for (let revenueData of revenueDatas) {
                    let id     = revenueData["id"];
                    let tmpMap = revenueMap[id];
                    if (tmpMap == undefined) {
                        tmpMap         = {};
                        revenueMap[id] = tmpMap;
                    }

                    let revenueAmountDatas = revenueData["amounts"];
                    for (let revenueAmountData of revenueAmountDatas) {
                        let productType = revenueAmountData["productType"];
                        let tmpDetail   = tmpMap[productType];
                        if (tmpDetail == undefined) {
                            // create new detail model
                            tmpDetail           = new DetailModel();
                            tmpMap[productType] = tmpDetail;
                            revenueDetails.push(tmpDetail);

                            tmpDetail.id          = id;
                            tmpDetail.productType = productType;
                            tmpDetail.amountType  = SF00501Constants.TYPE_AMOUNT_OLD;
                            tmpDetail.amounts     = {};
                        }

                        let date  = revenueAmountData["date"];
                        let value = revenueAmountData["value"];

                        tmpDetail.amounts[date] = value;
                    }
                }
                this.pageData.details = this.pageData.details.concat(revenueDetails);

                // 3. orders
                let orderDatas                                                         = data["orders"];
                let orderDetails: DetailModel[]                                        = [];
                let orderMap: { [id: number]: { [productType: number]: DetailModel } } = {};
                for (let orderData of orderDatas) {
                    let id     = orderData["id"];
                    let tmpMap = orderMap[id];
                    if (tmpMap == undefined) {
                        tmpMap       = {};
                        orderMap[id] = tmpMap;
                    }

                    let orderAmountDatas = orderData["amounts"];
                    for (let orderAmountData of orderAmountDatas) {
                        let productType = orderAmountData["productType"];
                        let tmpDetail   = tmpMap[productType];
                        if (tmpDetail == undefined) {
                            // create new detail model
                            tmpDetail           = new DetailModel();
                            tmpMap[productType] = tmpDetail;
                            orderDetails.push(tmpDetail);

                            tmpDetail.id          = id;
                            tmpDetail.productType = productType;
                            tmpDetail.amountType  = SF00501Constants.TYPE_AMOUNT_NEW;
                            tmpDetail.amounts     = {};
                        }

                        let date  = orderAmountData["date"];
                        let value = orderAmountData["value"];

                        tmpDetail.amounts[date] = value;
                    }
                }
                this.pageData.details = this.pageData.details.concat(orderDetails);

                // 4. goal
                let goalData          = data["goal"];
                let goalAmountData    = goalData["amounts"];
                let goalDetail        = new DetailModel();
                goalDetail.name       = SF00501Constants.TITLE_GOAL;
                goalDetail.amountType = SF00501Constants.TYPE_AMOUNT_GOAL;
                goalDetail.amounts    = {};
                for (let goalAmount of goalAmountData) {
                    let date  = goalAmount["date"];
                    let value = goalAmount["value"]

                    goalDetail.amounts[date] = value;
                }
                this.pageData.details.push(goalDetail);

            } else if (messageCode == "WRN001") {
                // WRN001 no data
                throw 1;
            } else if (messageCode == "ERR001") {
                // ERR dept not found
                throw 1;
            }
        });
    }

    sf0050103(): Promise<void> {
        let requestData = {
            staffId     : this.pageData.currentFilter.staff.id,
            year        : this.pageData.currentFilter.date.endYear,
            month       : this.pageData.currentFilter.date.endMonth,
            customerType: this.pageData.currentFilter.customerType,
            summaryType : this.pageData.currentFilter.sumaryType,
            dealType    : this.pageData.selectedDealType
        }

        // read data deal filter
        return this.postApi("/SF0050103", requestData).then(res => {
            let data               = res["data"];
            this.pageData.deals    = [];
            this.pageData.products = [];
            //1.Get list product
            let products           = data["products"];
            for (let product of products) {
                let pd = new ProductInfoModel();

                pd.setData(product);

                this.pageData.products.push(pd);
            }
            //2. get list deal and products by dealId
            let deals = data["deals"];
            for (let deal of deals) {
                let dealTmp = new DealModel();

                dealTmp.dealId            = deal["dealCode"];
                dealTmp.dealName          = deal["dealName"];
                dealTmp.updatedDate       = deal["updatedDate"] == null ? null : new Date(deal["updatedDate"]);
                dealTmp.customerName      = deal["customerName"];
                dealTmp.saleName          = deal["saleName"];
                dealTmp.dealType          = deal["dealType"];
                dealTmp.estTotalDeal      = deal["estTotalDeal"];
                dealTmp.deliveryDate      = deal["deliveryDate"] == null ? null : new Date(deal["deliveryDate"]);
                dealTmp.dealStatus        = deal["dealStatus"];
                dealTmp.closedFlag        = deal["closedFlag"];
                dealTmp.selectedProductId = deal["selectedProductId"];
                let productIds            = deal["productIds"];
                // get list productIds
                if (productIds) {
                    for (let productId of productIds) {
                        let id = productId;
                        dealTmp.productIds.push(parseInt(id));
                    }
                }
                // get list orderItems
                let orderItems = deal["orderItems"];
                if (orderItems) {
                    dealTmp.orderItems = [];
                    for (let orderItem of orderItems) {
                        let orderItemTmp = new OrderItemModel();

                        orderItemTmp.productId      = orderItem["productId"];
                        orderItemTmp.updatedDate    = orderItem["updatedDate"] == null ? null : new Date(orderItem["updatedDate"]);
                        orderItemTmp.quantity       = orderItem["quantity"];
                        orderItemTmp.submittedPrice = orderItem["submittedPrice"];
                        orderItemTmp.total          = orderItem["total"];

                        dealTmp.orderItems.push(orderItemTmp);
                    }
                }

                this.pageData.deals.push(dealTmp);
            }

            this.pageData.mstLaminations = (data["laminations"] || []).map(item => {
                let lam = new MstLamination();
                lam.setData(item);
                return lam;
            });
        }).catch(err => {
            throw err;
        });
    }


}