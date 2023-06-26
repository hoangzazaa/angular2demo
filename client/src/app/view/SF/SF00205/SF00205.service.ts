import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {Activity} from "../../../component/activity/model/activity.model";
import {CommonService} from "../../../service/common.service";
import {MstLamination} from "../COMMON/model/MstLamination.model";
import {SF00205Deal} from "./model/SF00205_Deal.model";
import {SF00205Department} from "./model/SF00205_Department.model";
import {SF00205Product} from "./model/SF00205_Product.model";
import {SF00205Request} from "./model/SF00205_Request.model";
import {SF00205User} from "./model/SF00205_User.model";
import {SF00205Data} from "./SF00205.data";

/**
 * Created by manhnv on 6/14/2017.
 */

declare let App: any;

@Injectable()
export class SF00205Service extends CommonService {
    pageData: SF00205Data;

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    init(): Promise<void> {
        App.loader('show');
        return this.getApi("/SF0020501").then(res => {
            this.pageData = new SF00205Data();

            let data = res.data;

            //1.get department
            let departments = data["departments"];
            if (!!departments) {
                let dept = new SF00205Department();
                dept.id = 0;
                dept.department = "全社";
                this.pageData.departments.push(dept);
                departments.forEach(department => {
                    let tmp = this.parseDepartment(department);
                    this.pageData.departments.push(tmp);
                });
            }

            //2. parse deal info
            let result = data["searchResult"];
            this.pageData.totalRecords = result["totalRecords"];

            let deals = result["deals"];
            if (!!deals) {
                deals.forEach(deal => {
                    this.pageData.deals.push(this.parseDeal(deal));
                });
            }
            App.loader('hide');
        }).catch(err => {
            App.loader('hide');
            throw  err;
        });
    }

    getDeals(request: SF00205Request): Promise<void> {
        this.pageData.requestModel = request;

        App.loader('show');
        return this.postApi("/SF0020502", request).then(res => {
            this.pageData.totalRecords = res.data["totalRecords"];
            this.pageData.deals = [];

            let deals = res.data["deals"];
            if (!!deals) {
                deals.forEach(deal => {
                    this.pageData.deals.push(this.parseDeal(deal));
                })
            }
            App.loader('hide');
        }).catch(err => {
            App.loader('hide');
            throw  err;
        });
    }

    bookmarkDeal(deal: SF00205Deal): Promise<void> {
        let req = {dealId: deal.id};
        return this.postApi("/SF0020503", req).then(res => {
            deal.isInMybox = res.data.myboxId > 0;
        });
    }

    private parseDepartment(data: any): SF00205Department {
        let department = new SF00205Department();
        department.id = data["id"];
        department.department = data["department"];
        department.type = data["type"];
        if (!!data["users"]) {
            // add user deault <option value="0">指定なし</option>
            let userTmp = new SF00205User();
            userTmp.id = 0;
            userTmp.username = "指定なし";
            department.users.push(userTmp);
            for (let i = 0; i < data["users"].length; i++) {
                let tmp = this.parseUser(data["users"][i]);
                department.users.push(tmp);
            }
        }

        return department;
    }

    private parseUser(data: any): SF00205User {
        let user = new SF00205User();
        user.id = data["id"];
        user.username = data["username"];
        user.departmentId = data["departmentId"];

        return user;
    }

    private parseDeal(data: any): SF00205Deal {
        let deal = new SF00205Deal();
        deal.setData(data);

        deal.dealCode = data["dealCode"];
        deal.saleName = data["saleName"];
        deal.customerName = data["customerName"];
        deal.dealName = data["dealName"];
        deal.dealStatus = data["dealStatus"];
        deal.dealType = data["dealType"];
        deal.estTotalDeal = data["estTotalDeal"];
        deal.deliveryDate = !!data["deliveryDate"] ? new Date(data["deliveryDate"]) : undefined;
        deal.isInMybox = data["isInMybox"];
        deal.selectedProductId = data["selectedProductId"];
        /*permission to view for editing*/
        deal.isEdit = data["isEdit"];

        //parse product
        let products = data["products"];
        if (!!products) {
            products.forEach(product => {
                deal.products.push(this.parseProduct(product));
            })
        }

        // mst lamination
        let laminations = data["laminations"];
        this.getMstLamination(deal, laminations);

        //parse activities
        let activity = data["activity"];
        if (!!activity) {
            deal.activity = this.parseActivity(activity);
        }

        return deal;
    }

    private parseProduct(data: any): SF00205Product {
        let product = new SF00205Product();
        product.setData(data);
        product.srcImg = data["srcImg"];

        return product;
    }

    private parseMstLamination(data: any): MstLamination {
        let mstLamination = new MstLamination();
        mstLamination.setData(data);

        return mstLamination;
    }

    getMstLamination(deal: SF00205Deal, laminations: MstLamination[]) {
        if (!!laminations && Array.isArray(laminations)) {
            deal.laminations = [];
            for (let i = 0; i < laminations.length; i++) {
                let lamination = this.parseMstLamination(laminations[i]);
                deal.laminations.push(lamination);
            }
        }
    }

    private parseActivity(item: any): Activity {
        let comment = new Activity();
        comment.setComment(item);
        return comment;
    }

}