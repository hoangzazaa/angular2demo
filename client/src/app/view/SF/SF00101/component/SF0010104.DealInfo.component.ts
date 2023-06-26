import {Component, Input} from "@angular/core";
import {Constants} from "../../../../helper/constants";
import {DEAL_STATUS, DEAL_TYPE} from "../../../../helper/mst-data-type";
import DataUtil from "../../../../util/data-util";
import {ProductInfoModel} from "../../COMMON/productinfo/model/ProductInfo.model";
import {DealModel} from "../model/SF001_Deal";
import {SF00101Data} from "../SF00101.data";
import {SF00101Page} from "../SF00101.page";

@Component({
    selector: 'sf0010104-dealInfo',
    templateUrl: 'SF0010104.DealInfo.component.html'
})
export class SF0010104DealInfoComponent {
    @Input() idx: number;

    @Input() deal: DealModel;

    constructor(public page: SF00101Page) {
    }

    get pageData(): SF00101Data {
        return this.page.pageService.pageData;
    }

    get inprogressDeals(): DealModel[] {
        return this.pageData.inprogressDeals;
    }

    get updatedDate(): Date {
        return this.deal.updatedDate;
    }

    onPageChange(pageIndex?: number): void {
    }

    get productInfo(): ProductInfoModel {
        let productInfo = new ProductInfoModel();
        if (this.deal.products && this.deal.products.length > 0) {
            productInfo = this.deal.products.find(product => product.id === this.deal.selectedProductId);
        }

        return productInfo;
    }

    requestViewDetailDeal(deal: DealModel) {
        this.page.viewDealDetail(deal.dealCode);
    }

    getDealStatus(deal: DealModel): string {
        return DataUtil.getData(DEAL_STATUS, Constants.BLANK, deal.dealStatus);
    }

    getDealType(deal: DealModel): string {
        return DataUtil.getData(DEAL_TYPE, Constants.BLANK, deal.dealType);
    }

    getDateDeal(deal: DealModel): Date {
        return deal.updatedDate || deal.createdDate;
    }

    get getDescription() {
        let productDescription = this.productInfo.getProductDescription(this.pageData.mstLaminations);
        if (productDescription == "印刷なし") {
            return Constants.BLANK;
        } else return productDescription;
    }
}
