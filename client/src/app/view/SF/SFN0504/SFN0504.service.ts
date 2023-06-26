import {Injectable} from "@angular/core";
import {CommonService} from "../../../service/common.service";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {SFN0504Constants} from "./SFN0504.constants";
import {SFN0504Data} from "./SFN0504.data";
import {UserModel} from "./model/SFN0504_User.model";
import {DepartmentModel} from "./model/SFN0504_Department.model";
import {StockModel} from "./model/SFN0504_Stock.model";
import {SFN0504Helper} from "./SFN0504.helper";
import {DateUtil} from "../../../util/date-util";

@Injectable()
export class SFN0504Service extends CommonService {

    pageData: SFN0504Data;

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    /**
     * send SF0050201 get request
     * @returns {Promise<TResult>}
     */
    sfn050401(): Promise<void> {
        return this.getApi("/SFN050401").then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // 1. departments
                let departmentList: DepartmentModel[] = [];
                this.pageData.departments = departmentList;

                // 1.1 add all company option
                departmentList.push(SFN0504Constants.OPTION_ALL_COMPANY);
                this.pageData.dataRepo.addUser(SFN0504Constants.OPTION_ALL_USER, SFN0504Constants.OPTION_ALL_COMPANY.id);

                // 1.2 add data from server
                let departments = data["departments"];
                for (let deparment of departments) {
                    let dept = new DepartmentModel();
                    departmentList.push(dept);

                    // parse department data
                    dept.id = deparment["id"];
                    dept.name = deparment["name"];

                    // update repo: add all_staff option
                    this.pageData.dataRepo.addUser(SFN0504Constants.OPTION_ALL_USER, dept.id);
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
    sfn050402(): Promise<void> {
        let currentFilter = this.pageData.currentFilter;
        let requestData = {
            departmentId: currentFilter.department.id,
            userId: currentFilter.user.id,
            stockDays: currentFilter.stockDays,
            stockType: currentFilter.stockType
        };
        return this.postApi("/SFN050402", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                let repo = this.pageData.dataRepo;
                // 1. hits
                this.pageData.hits = data["hits"];
                // 2. result list
                let stocksData = data["stocks"];
                let stockList: StockModel[] = [];
                this.pageData.stockList = stockList;
                for (let stockData of stocksData) {
                    let stock = new StockModel();
                    stockList.push(stock);

                    // id
                    stock.id = stockData["id"];
                    // 選択
                    stock.selected = false;
                    // 種別
                    stock.type = stockData["type"];
                    stock.typeStr = SFN0504Helper.getStockTypeStr(stock.type);
                    // 得意先名
                    stock.customerCode = stockData["customerCode"];
                    stock.customerName = stockData["customerName"];
                    // 案件ID
                    stock.dealCode = stockData["dealCode"];
                    // 品名
                    stock.productName = stockData["productName"];
                    stock.productCode = stockData["productCode"];
                    stock.productType = stockData["productType"];
                    stock.productShapeId = stockData["productShapeId"];
                    // 数量
                    stock.quantity = stockData["quantity"];
                    // 単価
                    stock.unitPrice = stockData["unitPrice"];
                    // 合計
                    stock.total = stockData["total"];
                    // 製造日
                    stock.manufactureDate = DateUtil.getDate(stockData["manufactureDate"]);
                    stock.manufactureDateStr = DateUtil.formatDate(stock.manufactureDate, SFN0504Constants.DATE_DISPLAY);
                    // 保管日数
                    stock.storageDays = stockData["storageDays"];
                }
            } else if (messageCode == "ERR001") {
                throw 1;
            }
        });
    }
}