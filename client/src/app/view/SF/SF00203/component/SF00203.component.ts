/**
 * Created by username on 3/10/2017.
 */
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Router} from "@angular/router";
import {SF00203_Product} from "../model/SF00203_Product.model";
import {FormatUtil} from "../../../../util/format-util";
import {SF00203_Deal} from "../model/SF00203_Deal.model";
import {DEAL_STATUS, DEAL_TYPE, PRINT_METHOD, SURFACE_TREATMENT} from "../../../../helper/mst-data-type";
import DataUtil from "../../../../util/data-util";
import {Constants} from "../../../../helper/constants";
import ValidatorUtil from "../../../../util/validator-util";
import {SF00203_OrderItem} from "../model/SF00203_OrderItems.model";

@Component({
    selector: "deal-detail",
    templateUrl: "SF00203.component.html",
    styleUrls:["./SF00203.component.css"]
})

export class SF00203Component {
    @Input() idx: number;
    @Input() deal: SF00203_Deal;
    @Output() viewDealDetailRequest = new EventEmitter();
    @Output() copyDealRequest = new EventEmitter();

    constructor(private router: Router) {
    }

    //TODO - comment at the moment
    // /**
    //  * Method use to rotate image when user click on image.
    //  * @param itemIdx the index of the image
    //  */
    // rotateImg(itemIdx: number) {
    //     let img = $('#img' + itemIdx);
    //     if (img.hasClass('north')) {
    //         img.toggleClass('north west');
    //     } else if (img.hasClass('west')) {
    //         img.toggleClass('west south');
    //     } else if (img.hasClass('south')) {
    //         img.toggleClass('south east');
    //     } else if (img.hasClass('east')) {
    //         img.toggleClass('east north');
    //     }
    // }

    getLot(orderItem: SF00203_OrderItem): number {
        let lot = 0;
        this.deal.products.forEach(product => {
            if (orderItem.productId == product.id) {
                lot = product.lot;
            }
        })
        return lot;
    }

    getEstimatedUnitPrice(orderItem: SF00203_OrderItem): number {
        let estimatedUnitPrice = 0;
        this.deal.products.forEach(product => {
            if (orderItem.productId == product.id) {
                estimatedUnitPrice = product.estimatedUnitPrice;
            }
        })
        return estimatedUnitPrice;
    }

    getProductName(orderItem: SF00203_OrderItem): string {
        let productName = "";
        this.deal.products.forEach(product => {
            if (orderItem.productId == product.id) {
                productName = product.productName;
            }
        })
        return productName;
    }

    getDealStatus(deal: SF00203_Deal): string {
        return DataUtil.getData(DEAL_STATUS, Constants.BLANK, deal.dealStatus);
    }

    getDealType(deal: SF00203_Deal): string {
        return DataUtil.getData(DEAL_TYPE, Constants.BLANK, deal.dealType);
    }

    getDateDeal(deal: SF00203_Deal): Date {
        return deal.updatedDate || deal.createdDate;
    }

    /*Format dimension display as 'size x depth x height'*/
    getDimension(product: SF00203_Product) {
        if (!!product)
            return FormatUtil.formatDimension(Constants.X_SEPARATOR, product.sizeW, product.sizeD, product.sizeH);
        return Constants.BLANK;
    }

    /*Get the name of print method based on the key*/
    getPrintMethod(product: SF00203_Product) {
        return DataUtil.getData(PRINT_METHOD, Constants.BLANK, product.printMethod);
    }

    /*Format name of paper display as 'paper name + paper-weight'*/
    getPaperName(product: SF00203_Product) {
        return FormatUtil.formatPaperName_V1(product);
    }

    getImpositionNumber(product: SF00203_Product) {
        if (ValidatorUtil.isNotEmpty(product.impositionNumber))
            return product.impositionNumber + Constants.IMPOSITION_SIGN;

        return Constants.BLANK;
    }

    getColor(product: SF00203_Product) {
        return "オフ表 " + FormatUtil.isNaN(product.colorFSelect - 1) + " 色";
    }

    getSurfaceTreatment(product: SF00203_Product) {
        return DataUtil.getData(SURFACE_TREATMENT, Constants.BLANK, product.varnishType);
    }

    requestViewDetailDeal(deal: SF00203_Deal): void {
        this.viewDealDetailRequest.emit(deal);
    }

    copyAndAddDeal(deal: SF00203_Deal): void {
        this.copyDealRequest.emit(deal);
    }

    private countDelayDate(item: SF00203_OrderItem): number {
        let milisecondsPerDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        let updateDate = new Date(item.updatedDate);
        let currentDate = new Date();
        return Math.round(Math.abs((currentDate.getTime() - updateDate.getTime()) / (milisecondsPerDay)));
    }

    private getQuantityStock(item: SF00203_OrderItem): number {
        let quantityStock = 0;
        this.deal.products.forEach(product => {
            if (item.productId == product.id) {
                quantityStock = product.quantityStock;
            }
        })
        return quantityStock;
    }
}
