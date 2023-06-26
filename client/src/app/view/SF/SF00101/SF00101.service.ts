import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Activity} from "../../../component/activity/model/activity.model";
import {PRODUCT_TYPE_1} from "../../../helper/mst-data-type";
import {CommonService} from "../../../service/common.service";
import DataUtil from "../../../util/data-util";
import {FormatUtil} from "../../../util/format-util";
import {MstLamination} from "../COMMON/model/MstLamination.model";
import {ProductInfoModel} from "../COMMON/productinfo/model/ProductInfo.model";
import {ChartModel} from "./model/SF001_ChartData";
import {DataTableModel} from "./model/SF001_DataTable";
import {DealModel} from "./model/SF001_Deal";
import {DepartmentModel} from "./model/SF001_Department";
import {UserModel} from "./model/SF001_User";
import {SF00101Data} from "./SF00101.data";
import {SF00101Page} from "./SF00101.page";
import MathUtil from "../../../util/math-util";

declare let App: any;
const THOUSAND_YEN: number = 1000;

@Injectable()
export class SF00101Service extends CommonService {

    pageData: SF00101Data;
    page: SF00101Page;
    yen
    constructor(http: Http, router: Router, route: ActivatedRoute) {
        super(http, router);
        this.page = new SF00101Page(router, null, null, null, null);
    }

    //get departments/SF0010101
    initDataScreen(): Promise<void> {
        return this.getApi("/SF0010101").then(res => {
            //parse data
            let data                  = res.data;
            //1.get department
            this.pageData             = new SF00101Data(this.page);
            let departments           = data["departments"];
            this.pageData.departments = [];
            if (!!departments) {
                departments.forEach(department => {
                    //get department
                    let tmp = this.parseDepartment(department);
                    this.pageData.departments.push(tmp);
                })
            }
            //2. inprogressDeals
            let inprogressDeals = data["inprogressDeals"];
            if (!!inprogressDeals) {
                inprogressDeals.forEach(deal => {
                    this.pageData.inprogressDeals.push(SF00101Service.parseDeal(deal));
                })
            }

            //3. get systemDate
            this.pageData.systemDate = data["systemDate"] == undefined ? undefined : new Date(data["systemDate"]);

            //4 read mst lamination
            this.pageData.mstLaminations = [];
            if (data["laminationJsons"]) {
                for (let i = 0; i < data["laminationJsons"].length; i++) {
                    let mstLamination = new MstLamination();
                    mstLamination.setData(data["laminationJsons"][i]);
                    this.pageData.mstLaminations.push(mstLamination);
                }
            }

            //5 total records
            this.pageData.totalRecords = data["totalRecords"];
        });
    }

    //initTab1 /SF0010102
    initDataTab1(): Promise<void> {
        let request = {
            departmentID: this.pageData.modelFilterTab1.departmentID,
            picId       : this.pageData.modelFilterTab1.picId,
            timeFilter  : this.pageData.modelFilterTab1.timeFilter,
        }

        return this.postApi("SF0010102", request).then(res => {
            let data = res.data;

            //1. get receipts
            let receipts = data["receipts"];
            if (receipts) {
                this.pageData.receipts = SF00101Service.parseChartData(receipts, true);
            }
            //2. get newReceipts
            let newReceipts = data["newReceipts"];
            if (newReceipts) {
                this.pageData.newReceipts = SF00101Service.parseChartData(newReceipts, true);
            }
            //3. get recordNew
            let recordNew = data["recordNew"];
            if (recordNew) {
                this.pageData.recordNew = SF00101Service.parseChartData(recordNew);
            }
            //4. get digitalSale
            let digitalSale = data["digitalSale"];
            if (digitalSale) {
                this.pageData.digitalSale = SF00101Service.parseChartData(digitalSale, true);
            }
        });
    }

    //initTab2 /SF0010103
    // 売上実績タブ押下時
    initDataTab2(): Promise<void> {
        let request = {
            departmentID: this.pageData.modelFilterTab2.departmentID,
            picId       : this.pageData.modelFilterTab2.picId,
            timeFilter  : this.pageData.modelFilterTab2.timeFilter,
        }

        return this.postApi("SF0010103", request).then(res => {

            let data = res.data;

            this.pageData.product_Type0 = 0;
            this.pageData.product_Type1 = 0;
            this.pageData.product_Type2 = 0;
            let count0 = 0;
            let count1 = 0;
            let count2 = 0;
            let countDefault = 0;


            //1. deals data table
            let deals               = data["deals"];
            this.pageData.dataTable = [];
            deals.forEach(deal => {
                // list deal
                let dataTable = this.parseDataTable(deal);
                // product_type
                // let amount    = MathUtil.round(FormatUtil.isNaN(dataTable.amountOfMoney) / THOUSAND_YEN, 0);
                let amount    = FormatUtil.isNaN(dataTable.amountOfMoney);
                switch (dataTable.productType) {
                    case 0:
                        this.pageData.product_Type0 += amount;
                        count0++;
                        break;
                    case 1:
                        this.pageData.product_Type1 += amount;
                        count1++;
                        break;
                    case 2:
                        this.pageData.product_Type2 += amount;
                        count2++;
                        break;
                    default:
                        countDefault++;
                        break;
                }

                this.pageData.dataTable.push(dataTable);
            })

            // check handsonTable undefiend
            if (!!this.pageData.handsonTable){
                this.pageData.handsonTable.clear();
                this.pageData.handsonTable.loadData(this.pageData.dataTable);
                this.pageData.handsonTable.render();
            }

            if (this.pageData.dataTable.length == 0) {
                this.pageData.handsonTable.updateSettings({
                    height: 40,
                });
            } else {
                this.pageData.handsonTable.updateSettings({
                    height: 317,
                });
            }
        });
    }

    //saveData /SF0010104
    saveDataInput(): Promise<void> {
        let request = {
            departmentID: this.pageData.modelFilterTab1.departmentID,
            picId       : this.pageData.modelFilterTab1.picId,
            recordNew   : this.pageData.recordNew.goal,
            digitalSales: this.pageData.digitalSale.goal
        };

        return this.postApi("SF0010104", request).then(res => {

        });
    }

    parseDepartment(data: any): DepartmentModel {
        let department = new DepartmentModel();

        department.id         = data["id"];
        department.department = data["department"];
        department.type       = data["type"];
        if (!!data["users"]) {
            department.users = [];
            for (var i = 0; i < data["users"].length; i++) {
                let tmp = this.parseUser(data["users"][i]);
                department.users.push(tmp);
            }
        }

        return department;
    }

    parseUser(data: any): UserModel {
        let user = new UserModel();

        user.id           = data["id"];
        user.username     = data["username"];
        user.departmentId = data["departmentId"];
        return user;
    }

    parseDataTable(data: any): DataTableModel {
        let dataTable = new DataTableModel();

        dataTable.invoiceDate = FormatUtil.formatDateToString(data["invoiceDate"], "yyyy/MM/dd");
        dataTable.dealCode    = data["dealCode"];
        dataTable.dealName    = data["dealName"];
        //parse product type
        dataTable.productType = data["productType"];
        let distances         = DataUtil.toSelectBoxDataSource(PRODUCT_TYPE_1);
        let dataType          = distances.find(item => {
            return item.id == dataTable.productType;
        })

        if (!!dataType) {
            dataTable.productTypeDisplay = dataType.name;
        }
        dataTable.numberOfOrder = data["numberOfOrder"];
        //parse unit price
        if (!!data["unitPrice"]) {
            dataTable.unitPrice = "@" + FormatUtil.formatNumber(data["unitPrice"], 2);
        }
        dataTable.amountOfMoney = data["amountOfMoney"];

        return dataTable;
    }

    private static parseDeal(data: any): DealModel {
        let dealInfo               = new DealModel();
        dealInfo.id                = data["id"];
        dealInfo.createdDate       = !!data["createdDate"] ? new Date(data["createdDate"]) : undefined;
        dealInfo.updatedDate       = !!data["updatedDate"] ? new Date(data["updatedDate"]) : undefined;
        dealInfo.dealCode          = data["dealCode"];
        dealInfo.saleName          = data["saleName"];
        dealInfo.customerName      = data["customerName"];
        dealInfo.dealName          = data["dealName"];
        dealInfo.dealStatus        = data["dealStatus"];
        dealInfo.dealType          = data["dealType"];
        dealInfo.estTotalDeal      = data["estTotalDeal"];
        dealInfo.deliveryDate      = !!data["deliveryDate"] ? new Date(data["deliveryDate"]) : undefined;
        dealInfo.selectedProductId = data["selectedProductId"];
        dealInfo.isEdit            = data["isEdit"];
        //parse product
        let products               = data["products"];
        if (!!products) {
            dealInfo.products = [];
            products.forEach(product => {
                dealInfo.products.push(this.parseProduct(product));
            })
        }

        //parse activities
        let activity = data["activity"];
        if (!!activity) {
            dealInfo.activity = this.parseActivity(activity);
        }

        return dealInfo;
    }

    private static parseProduct(data: any): ProductInfoModel {

        let ret = new ProductInfoModel();
        ret.setData(data);

        return ret;
    }

    private static parseChartData(data: any, issue3435?: boolean): ChartModel {
        let chartModel = new ChartModel();

        if(!!issue3435){
            chartModel.current = MathUtil.round(data["current"]/1000, 0);
            chartModel.goal    = data["goal"];
        }else{
            chartModel.current = data["current"];
            chartModel.goal    = data["goal"];
        }

        return chartModel;
    }

    getDeals(req: { picId: number, departmentId: number, indexFrom: number, indexTo: number }): Promise<void> {
        App.loader('show');
        return this.postApi("/SF0010105", req).then(res => {
            // reset data
            this.pageData.inprogressDeals = [];

            // update total
            this.pageData.totalRecords = res.data["totalRecords"];

            // parse deal info
            let dealsInprocess = res.data["inprogressDeals"];
            if (!!dealsInprocess) {
                dealsInprocess.forEach(deal => {
                    this.pageData.inprogressDeals.push(SF00101Service.parseDeal(deal));
                })
            }
            App.loader('hide');
        }).catch(err => {
            App.loader('hide');
            throw  err;
        });
    }

    private static parseActivity(item: any): Activity {
        let comment = new Activity();
        comment.setComment(item);
        return comment;
    }

}
