import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Constants} from "../../../../helper/constants";
import {DEAL_STATUS, DEAL_TYPE} from "../../../../helper/mst-data-type";
import DataUtil from "../../../../util/data-util";
import {MstLamination} from "../../COMMON/model/MstLamination.model";
import {SF00202_Deal} from "../model/SF00202_Deal.model";
import {SF00202_OrderItems} from "../model/SF00202_OrderItems.model";
import {SF00202_Product} from "../model/SF00202_Product.model";

@Component({
    selector: "sf0020201-deal-info",
    templateUrl: "SF0020201.DealInfo.component.html",
    styleUrls: ["./SF0020201.component.css"]
})

export class SF0020201DealInfoComponent {
    @Input() deal: SF00202_Deal;
    @Input() idx: number;
    @Input() mstLaminations: MstLamination[];
    @Output() viewDealDetailRequest = new EventEmitter();
    @Output() bookmarkDealRequest = new EventEmitter();
    @Output() copyDealRequest = new EventEmitter();

    private acceptedExtensions = ["JPG", "JPEG", "PNG", "GIF"];

    constructor() {
    }

    requestViewDetailDeal(deal: SF00202_Deal, isOpeningNewTab: boolean): void {
        deal.isOpeningNewTab = isOpeningNewTab;
        this.viewDealDetailRequest.emit(deal);
    }

    // 使われない機能のため使用禁止 (trello: 1099)
    requestBookmarkDeal(deal: SF00202_Deal): void {
        this.bookmarkDealRequest.emit(deal);
    }

    copyAndAddDeal(deal: SF00202_Deal): void {
        this.copyDealRequest.emit(deal);
    }

    get productInfo(): SF00202_Product {
        let productInfo = new SF00202_Product();
        if (this.deal.products && this.deal.products.length > 0) {
            productInfo = this.deal.products.find(product => product.id === this.deal.selectedProductId);
        }

        return productInfo;
    }

    getDealStatus(deal: SF00202_Deal): string {
        return deal.isClosed ? "終了" : DataUtil.getData(DEAL_STATUS, Constants.BLANK, deal.dealStatus);
    }

    getDealType(deal: SF00202_Deal): string {
        return DataUtil.getData(DEAL_TYPE, Constants.BLANK, deal.dealType);
    }

    getDateDeal(deal: SF00202_Deal): Date {
        return deal.updatedDate || deal.createdDate;
    }

    getDescription() {
        return this.productInfo.getProductDescription(this.mstLaminations);
    }

    /*Format dimension display as 'size x depth x height'*/
    getDimension(product: SF00202_Product) {
        return product.getDimension();
    }

    /*Get the name of print method based on the key*/
    getPrintMethod(product: SF00202_Product) {
        return product.getPrintMethod();
    }

    getImpositionNumber(product: SF00202_Product) {
        return product.getImposition();
    }

    /*Format name of paper display as 'paper name + paper-weight'*/
    getPaperName(product: SF00202_Product) {
        return product.getPaperName(this.mstLaminations);
    }

    getColor(product: SF00202_Product) {
        return product.getColor();
    }

    getSurfaceTreatment(product: SF00202_Product) {
        return product.getSurfaceTreatment();
    }

    getLot(orderItem: SF00202_OrderItems): number {
        let lot = 0;
        this.deal.products.forEach(product => {
            if (orderItem.productId == product.id) {
                lot = product.lot;
            }
        })
        return lot;
    }

    getEstimatedUnitPrice(orderItem: SF00202_OrderItems): number {
        let estimatedUnitPrice = 0;
        this.deal.products.forEach(product => {
            if (orderItem.productId == product.id) {
                estimatedUnitPrice = product.estimatedUnitPrice;
            }
        })
        return estimatedUnitPrice;
    }

    getProductName(orderItem: SF00202_OrderItems): string {
        let productName = "";
        this.deal.products.forEach(product => {
            if (orderItem.productId == product.id) {
                productName = product.productName;
            }
        })
        return productName;
    }

    private getQuantityStock(item: SF00202_OrderItems): number {
        let quantityStock = 0;
        this.deal.products.forEach(product => {
            if (item.productId == product.id) {
                quantityStock = product.quantityStock;
            }
        })
        return quantityStock;
    }

    private countDelayDate(item: SF00202_OrderItems): number {
        let milisecondsPerDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        let updateDate = new Date(item.updatedDate);
        let currentDate = new Date();
        return Math.round(Math.abs((currentDate.getTime() - updateDate.getTime()) / (milisecondsPerDay)));
    }
}
