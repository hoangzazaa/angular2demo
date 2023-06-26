import {Injectable} from "@angular/core";
import {CommonService} from "../../../service/common.service";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {SF00202Data} from "./SF00202.data";
import {SF00202_Deal} from "./model/SF00202_Deal.model";
import {Constants} from "../../../helper/constants";
import {SF00202_Product} from "./model/SF00202_Product.model";
import {SF00202_OrderItems} from "./model/SF00202_OrderItems.model";
import {SF00202RuleFilter} from "./model/SF00202.filter";
import {MstPaper} from "../../../model/core/MstPaper.model";
import {MstLamination} from "../COMMON/model/MstLamination.model";

declare let App: any;

@Injectable()
export class SF00202Service extends CommonService {

    private _pageData: SF00202Data = new SF00202Data();

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    get pageData(): SF00202Data {
        return this._pageData;
    }

    initData(): Promise<void> {
        this._pageData = new SF00202Data();
        return this.getResult(Constants.FIRST_PAGE);
    }

    getResult(pageIndex?: number): Promise<void> {
        return this.pageData.advancedSearchFlg || this.pageData.hasAtLeastOneKeyword ?
            this.getSearchResult(pageIndex)
            : this.getLinearResult(pageIndex);
    }

    /**
     * Service to bookmark deal
     * @returns {Promise<void>}
     */
    // 使われない機能のため使用禁止 (trello: 1099)
    public bookmarkDeal(deal: SF00202_Deal): Promise<void> {
        let req = {dealId: deal.id};
        return this.postApi("/SF0020202", req).then(res => {
            deal.isInMybox = res.data.myboxId > 0;
        });
    }

    private getLinearResult(page?: number): Promise<void> {
        let self = this;
        let req = {
            indexFrom: ((page || Constants.FIRST_PAGE) - 1) * self.pageData.CONSTANTS.PAGE_SIZE,
            indexTo: self.pageData.CONSTANTS.PAGE_SIZE
        };

        App.loader('show');
        return self.postApi("/SF0020201", req).then(
            res => {
                self.pageData.deals = (res.data.deals || []).map(dealData => self.parseDeal(dealData));
                self.pageData.totalRecords = res.data.totalRecords || 0;
                self.pageData.currentPage = page;
                self.pageData.mstLaminations = (res.data.mstLaminations || []).map(item => {
                    let lam = new MstLamination();
                    lam.setData(item);
                    return lam;
                });
                App.loader('hide');
            },
            err => {
                App.loader('hide');
            });
    }

    /**
     * Service to get deals by search key on search input text
     * @returns {Promise<void>}
     */
    getSearchResult(page?: number): Promise<void> {
        let self = this;
        let req = self.parseToSearchRequest(self.pageData.ruleFilter);
        req.keywords = self.pageData.keywords;
        req.page = page || Constants.FIRST_PAGE;
        req.pageSize = self.pageData.CONSTANTS.PAGE_SIZE;

        App.loader('show');
        return self.postApi("/SF0020204", req).then(
            res => {
                self.pageData.deals = (res.data.deals || []).map(item => self.parseDeal(item));
                self.pageData.totalRecords = res.data.totalRecords || 0;
                self.pageData.currentPage = page;
                self.pageData.mstLaminations = (res.data.mstLaminations || []).map(item => {
                    let lam = new MstLamination();
                    lam.setData(item);
                    return lam;
                });
                App.loader('hide');
            },
            err => {
                App.loader('hide');
            });
    }

    public parseToSearchRequest(ruleFilter: SF00202RuleFilter): any {
        return {
            "dealCode": ruleFilter.dealCode,
            "dealName": ruleFilter.dealName,
            "salesName": ruleFilter.salesName,
            "dealType": ruleFilter.dealType,
            "customerCode": ruleFilter.customerCode,
            "customerName": ruleFilter.customerName,
            "contactName": ruleFilter.contactName,
            "productCode": ruleFilter.productCode,
            "productName": ruleFilter.productName,
            "shapeId": ruleFilter.shapeId,
            "productApplication": ruleFilter.productApplication,
            "sizeW": ruleFilter.sizeW,
            "sizeD": ruleFilter.sizeD,
            "sizeH": ruleFilter.sizeH,
            "paperName": ruleFilter.paperName,
            "printMethod": ruleFilter.printMethod,
            "orderValueFrom": ruleFilter.orderValueFrom,
            "orderValueTo": ruleFilter.orderValueTo,
            "orderLotFrom": ruleFilter.lotFrom,
            "orderLotTo": ruleFilter.lotTo,
            "periodType": ruleFilter.periodType,
            "periodFrom": ruleFilter.periodFrom,
            "dealStatus": ruleFilter.dealStatus,
            "periodTo": ruleFilter.periodTo
        }
    }

    private parseDeal(data: any): SF00202_Deal {
        let ret = new SF00202_Deal();
        ret.id = data["id"];
        ret.createdUser = data["createdUser"];
        ret.updatedUser = data["updatedUser"];
        ret.createdDate = data["createdDate"] ? new Date(data["createdDate"]) : undefined;
        ret.updatedDate = data["updatedDate"] ? new Date(data["updatedDate"]) : undefined;
        ret.dealCode = data["dealCode"];
        ret.saleName = data["saleName"];
        ret.dealName = data["dealName"];
        ret.dealType = data["dealType"];
        ret.dealStatus = data["dealStatus"];
        ret.customerName = data["customerName"];
        ret.isInMybox = data["isInMybox"];
        ret.closedFlag = data["closedFlag"];
        ret.deliveryDate = data["deliveryDate"];
        ret.images = data["images"] ? data["images"] : [];
        ret.estTotalDeal = data["estTotalDeal"];
        ret.products = (data["products"] || []).map(productData => parseProduct(productData));
        ret.orderItems = (data["orderItems"] || []).map(orderData => parseOrderItem(orderData));
        ret.selectedProductId = data["selectedProductId"];
        ret.isEdit            = data["isEdit"];

        return ret;

        function parseProduct(data: any) {
            let ret = new SF00202_Product();

            ret.setData(data);

            return ret;
        }

        function parseOrderItem(data: any) {
            let ret = new SF00202_OrderItems();
            ret.id = data["id"];
            ret.createdUser = data["createdUser"];
            ret.updatedUser = data["updatedUser"];
            ret.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
            ret.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
            ret.productId = data["productId"];
            ret.quantity = data["quantity"];
            ret.submittedPrice = data["submittedPrice"];
            ret.total = data["total"];
            return ret;
        }
    }

}
