import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {CommonService} from "../../../service/common.service";
import {SF00203Data} from "./SF00203.data";
import {Constants} from "../../../helper/constants";
import {SF00203_Deal} from "./model/SF00203_Deal.model";
import {SF00203_Product} from "./model/SF00203_Product.model";
import {SF00203_OrderItem} from "./model/SF00203_OrderItems.model";

/**
 * Created by hoangtd
 */
@Injectable()
export class SF00203Service extends CommonService {
    private _sf00203Data: SF00203Data = new SF00203Data();

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    get sf00203Data(): SF00203Data {
        return this._sf00203Data;
    }

    public getResults(pageIndex?: number): Promise<void> {
        let req = {
            indexFrom: ((pageIndex || Constants.FIRST_PAGE) - 1) * this._sf00203Data.CONSTANTS.PAGE_SIZE,
            indexTo: this._sf00203Data.CONSTANTS.PAGE_SIZE
        };
        return this.postApi("SF0020301", req)
            .then(res => {
                this._sf00203Data.deals = (res.data.deals || []).map(item => this.parseDeal(item));
                this._sf00203Data.totalRecords = !!res.data.totalRecords ? res.data.totalRecords : 0;
            });
    }

    private parseDeal(data: any): SF00203_Deal {
        let deal = new SF00203_Deal();
        deal.id = data["id"];
        deal.createdUser = data["createdUser"];
        deal.updatedUser = data["updatedUser"];
        deal.createdDate = data["createdDate"] ? new Date(data["createdDate"]) : undefined;
        deal.updatedDate = data["updatedDate"] ? new Date(data["updatedDate"]) : undefined;
        deal.dealCode = data["dealCode"];
        deal.saleName = data["saleName"];
        deal.dealName = data["dealName"];
        deal.dealType = data["dealType"];
        deal.dealStatus = data["dealStatus"];
        deal.customerName = data["customerName"];
        deal.isInMybox = data["isInMybox"];
        deal.deliveryDate = data["deliveryDate"];
        deal.images = data["images"] || [];
        deal.estTotalDeal = data["estTotalDeal"];
        deal.templateFlag = data["templateFlag"];
        deal.products = (data["products"] || []).map(item => parseProduct(item));
        deal.orderItems = (data["orderItems"] || []).map(item => parseOrderItem(item));
        return deal;

        function parseProduct(data: any): SF00203_Product {
            let product = new SF00203_Product();
            product.id = data["id"];
            product.createdUser = data["createdUser"];
            product.updatedUser = data["updatedUser"];
            product.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
            product.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
            product.productName = data["productName"];
            product.sizeH = data["sizeH"];
            product.sizeD = data["sizeD"];
            product.sizeW = data["sizeW"];
            product.paperNameId = data["paperNameId"];
            product.lot = data["lot"];
            product.paperWeight = data["paperWeight"];
            product.printMethod = data["printMethod"];
            product.woodenCode = data["woodenCode"];
            product.woodenTotalNumber = data["woodenTotalNumber"];
            product.woodenExpiredDate = data["woodenExpiredDate"];
            product.estimatedUnitPrice = data["estimatedUnitPrice"];
            product.customerProductCode = data["customerProductCode"];
            product.productCode = data["productCode"];
            product.memo = data["memo"];
            product.impositionNumber = data["impositionNumber"];
            product.varnishType = data["surfaceF_varnishType"];
            product.colorFSelect = data["colorFSelect"];
            product.application = data["application"];
            product.quantityStock = data["quantityStock"];
            product.srcImg = data["srcImg"];
            return product;
        }

        function parseOrderItem(data: any): SF00203_OrderItem {
            let orderItem = new SF00203_OrderItem();
            orderItem.id = data["id"];
            orderItem.createdUser = data["createdUser"];
            orderItem.updatedUser = data["updatedUser"];
            orderItem.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
            orderItem.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
            orderItem.productId = data["productId"];
            orderItem.quantity = data["quantity"];
            orderItem.submittedPrice = data["submittedPrice"];
            orderItem.total = data["total"];
            return orderItem;
        }

    }
}
