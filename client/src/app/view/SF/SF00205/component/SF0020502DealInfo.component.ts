/**
 * Created by manhnv on 6/14/2017.
 */

import {Component, EventEmitter, Input, Output} from "@angular/core";
import {DEAL_STATUS, DEAL_TYPE} from "../../../../helper/mst-data-type";
import DataUtil from "../../../../util/data-util";
import {CC00100Service} from "../../../CC/CC00100/CC00100.service";
import {SF00205Deal} from "../model/SF00205_Deal.model";
import {SF00205Product} from "../model/SF00205_Product.model";
import {SF00205Data} from "../SF00205.data";
import {SF00205Service} from "../SF00205.service";
import {Constants} from "../../../../helper/constants";

@Component({
   selector: "sf0020502-dealInfo",
   templateUrl: "SF0020502DealInfo.component.html"
})
export class SF0020502DealInfoComponent {
    @Input() idx: number;
    @Input() deal: SF00205Deal;

    @Output() viewDeal: EventEmitter<any> = new EventEmitter<any>();
    @Output() bookmarkDeal: EventEmitter<any> = new EventEmitter<any>();
    @Output() copyDeal: EventEmitter<any> = new EventEmitter<any>();

    constructor(private authService: CC00100Service, private service: SF00205Service) {
    }

    get pageData(): SF00205Data {
        return this.service.pageData;
    }

    get product(): SF00205Product {
        let productInfo = new SF00205Product();
        if (Array.isArray(this.deal.products) && this.deal.products.length > 0) {
            productInfo = this.deal.products.find(product => product.id === this.deal.selectedProductId);
        }

        return productInfo;
    }

    getDealStatus(deal: SF00205Deal): string {
        return DataUtil.getData(DEAL_STATUS, null, deal.dealStatus);
    }

    getDealType(deal: SF00205Deal): string {
        return DataUtil.getData(DEAL_TYPE, Constants.BLANK, deal.dealType);
    }

    getDateDeal(deal: SF00205Deal): Date {
        return deal.updatedDate || deal.createdDate;
    }

    requestViewDetailDeal(deal: SF00205Deal, isOpeningNewTab: boolean): void {
        deal.isOpeningNewTab = isOpeningNewTab;
        this.viewDeal.emit(deal);
    }

    requestBookmarkDeal(deal: SF00205Deal): void {
        this.bookmarkDeal.emit(deal);
    }

    requestCopyDeal(deal: SF00205Deal): void {
        this.copyDeal.emit(deal);
    }

}