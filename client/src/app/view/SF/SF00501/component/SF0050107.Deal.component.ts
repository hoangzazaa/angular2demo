import {Component, Input, OnInit} from "@angular/core";
import {Constants} from "../../../../helper/constants";
import {DEAL_STATUS, DEAL_TYPE} from "../../../../helper/mst-data-type";
import DataUtil from "../../../../util/data-util";
import {ProductInfoModel} from "../../COMMON/productinfo/model/ProductInfo.model";
import {DealModel, OrderItemModel} from "../model/SF00501_Deal.model";
import {SF00501Page} from "../SF00501.page";
/**
 * Created by manhnv on 3/28/2017.
 */

@Component({
    selector: "[sf0050107]",
    templateUrl: "SF0050107.Deal.component.html",
    styleUrls: ["SF0050107.Deal.component.css"]
})
export class SF0050107Component implements OnInit {
    @Input() index: number;
    @Input() deal: DealModel;

    productInfo: ProductInfoModel;

    ngOnInit(): void {
        //1. Get list products by productIds
        this.deal.products = this.page.pageData.products.filter(item => {
                // check item productId in productId
                return $.inArray(item.id, this.deal.productIds) >= 0;
            }) || [];
        //2. Sort theo updatedDate
        this.deal.products.sort((item1, item2) => {
            if (item1.updatedDate > item2.updatedDate) {
                return -1;
            } else if (item1.updatedDate == item2.updatedDate) {
                return 0;
            } else {
                return 1;
            }
        });
        this.productInfo = new ProductInfoModel();
        //3.1 check highlightFlag
        this.productInfo = this.deal.products.find(product => {
            return product.id === this.deal.selectedProductId;
        });
        //3.2 else one array
        if (!this.productInfo && this.deal.products.length > 0) {
            this.productInfo = this.deal.products[0];
        } else if (!this.productInfo) {
            this.productInfo = new ProductInfoModel()
        }
    }

    constructor(private page: SF00501Page) {
        this.deal = new DealModel();
        this.deal.productIds = [];
        this.deal.products = [];
    }

    requestViewDetailDeal(): void {
        this.page.dealDetail(this.deal.dealId);
    }

    getDealStatus(deal: DealModel): string {
        return deal.isClosed ? "終了" : DataUtil.getData(DEAL_STATUS, Constants.BLANK, deal.dealStatus);
    }

    getDealType(): string {
        return DataUtil.getData(DEAL_TYPE, Constants.BLANK, this.deal.dealType);
    }

    /*Format dimension display as 'size x depth x height'*/
    getDimension(product: ProductInfoModel) {
        return product.getDimension();
    }

    /*Get the name of print method based on the key*/
    getPrintMethod(product: ProductInfoModel) {
        return product.getPrintMethod();
    }

    /*Format name of paper display as 'paper name + paper-weight'*/
    getPaperName(product?: ProductInfoModel) {
        if (!!product)
            return product.getPaperName(this.page.pageData.mstLaminations);

        return null;
    }

    getLot(orderItem: OrderItemModel): number {
        let lot = 0;
        this.deal.products.forEach(product => {
            if (orderItem.productId == product.id) {
                lot = product.lot;
            }
        })
        return lot;
    }

    getEstimatedUnitPrice(orderItem: OrderItemModel): number {
        let estimatedUnitPrice = 0;
        this.deal.products.forEach(product => {
            if (orderItem.productId ==  product.id) {
                estimatedUnitPrice = product.estimatedUnitPrice;
            }
        })
        return estimatedUnitPrice;
    }

    getProductName(orderItem: OrderItemModel): string {
        let productName = "";
        this.deal.products.forEach(product => {
            if (orderItem.productId == product.id) {
                productName = product.productName;
            }
        })
        return productName;
    }

    private getQuantityStock(item: OrderItemModel): number {
        let quantityStock = 0;
        this.deal.products.forEach(product => {
            if (item.productId == product.id) {
                quantityStock = product.quantityStock;
            }
        })
        return quantityStock;
    }

    private countDelayDate(item: OrderItemModel): number {
        let miniSecondsPerDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*miniSeconds
        let updateDate = new Date(item.updatedDate);
        let currentDate = new Date();
        return Math.round(Math.abs((currentDate.getTime() - updateDate.getTime()) / (miniSecondsPerDay)));
    }

    getDescription() {
        return this.productInfo.getProductDescription(this.page.pageData.mstLaminations);
    }

}
