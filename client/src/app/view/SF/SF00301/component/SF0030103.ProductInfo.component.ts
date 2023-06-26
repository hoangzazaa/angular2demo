import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {MstLamination} from "../../COMMON/model/MstLamination.model";
import {ProductInfoModel} from "../../COMMON/productinfo/model/ProductInfo.model";
import {SF00301_Deal} from "../model/SF00301_Deal.model";
import {SF00301_OrderItem} from "../model/SF00301_OrderItems.model";
import {SF00301_Product} from "../model/SF00301_Product.model";
import {SF00301Service} from "../SF00301.service";

@Component({
    selector   : "div[sf0030103-dealProductInfo]",
    templateUrl: "SF0030103.ProductInfo.component.html"
})
export class SF0030103Component implements OnInit {
    @Input() item: SF00301_Product;
    @Input() canRemove: boolean;
    @Input() canViewDetailed: boolean;
    @Input() index: number;
    @Input() deal: SF00301_Deal;
    @Input() orderItems: SF00301_OrderItem[];
    @Input() mstLaminations: MstLamination[];

    @Output() requestDetachProduct: EventEmitter<any> = new EventEmitter<any>();
    @Output() requestViewProductInfo: EventEmitter<SF00301_Product> = new EventEmitter<SF00301_Product>();
    @Output() requestHighlightFlag: EventEmitter<any> = new EventEmitter<any>();

    constructor(private sf00301Service: SF00301Service) {
    }

    ngOnInit(): void {
        if (this.orderItems) {
            this.orderItems = this.orderItems.filter(item => {
                return item.productId == this.item.id;
            })
        }
    }

    viewProductInfo() {
        if (!this.canViewDetailed)
            return;
        this.requestViewProductInfo.emit(this.item);
    }

    detachMe() {
        this.requestDetachProduct.emit(this.item);
    }

    updateHighlightFlag() {
        this.requestHighlightFlag.emit(this.item);
    }

    private countDelayDate(item: SF00301_OrderItem): number {
        let milisecondsPerDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        let updateDate = new Date(item.updatedDate);
        let currentDate = new Date();
        return Math.round(Math.abs((currentDate.getTime() - updateDate.getTime()) / (milisecondsPerDay)));
    }

    /*Format name of paper display as 'paper name + paper-weight'*/
    getPaperName(product: ProductInfoModel): string {
        return product.getPaperName(this.mstLaminations);
    }

    productLabel(product: SF00301_Product): string {
        if (product.productType == 0 && product.shapeId == 98) {
            return "美粧";
        } else if (product.productType == 0 && product.shapeId == 100) {
            return "片段";
        } else if (product.productType == 1 && product.cartonShippingType==1) {
            return "A式以外段ボール";
        } else if (product.productType == 1) {
            return "段ボール"
        } else {
            return "紙器・貼合";
        }
    }

}
