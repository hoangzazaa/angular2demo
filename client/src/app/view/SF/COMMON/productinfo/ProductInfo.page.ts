import {Component, EventEmitter, Input, Output} from "@angular/core";
import {REQUEST_TYPE} from "../../../../helper/mst-data-type";
import DataUtil from "../../../../util/data-util";
import {MstLamination} from "../model/MstLamination.model";
import {InventoryModel} from "./model/Inventory.model";
import {ProductInfoModel} from "./model/ProductInfo.model";
import {ProductBoxModel} from "./model/ProductBox.model";
import {TransactionModel} from "./model/Transaction.model";
import {FormatUtil} from "../../../../util/format-util";

@Component({
    selector   : "div[product-info]",
    templateUrl: "ProductInfo.page.html",
})
export class ProductInfo {
    //1. mst lamination
    @Input() mstLaminations: MstLamination[];
    //2. product box
    @Input() productBox: ProductBoxModel;
    //3. index
    @Input() index: number;
    //4. orderItem
    @Input() isOrder: boolean;
    //5. statusExport
    @Input() statusExport: number;
    //6. notUsingProduct
    @Input() notUsingProduct: number;
    //7. #2595
    @Input() isRequestDesign: boolean;

    // output emit change data
    @Output() emitRedirectSF00302: EventEmitter<any>  = new EventEmitter();
    @Output() emitExportPDF: EventEmitter<any>        = new EventEmitter();
    @Output() emitAddProductToDeal: EventEmitter<any> = new EventEmitter();
    @Output() requestUpdateProduct: EventEmitter<any> = new EventEmitter();

    //1. product info
    get product(): ProductInfoModel {
        return this.productBox.product;
    }

    //2. oderItems
    get transactions(): TransactionModel[] {
        return this.productBox.transactions;
    }

    //3. inventory
    get inventory(): InventoryModel {
        return this.productBox.inventory;
    }

    viewProductInfo() {
        this.emitRedirectSF00302.emit();
    }

    getDimension(product: ProductInfoModel): string {
        return product.getDimension();
    }

    exportPDF() {
        this.emitExportPDF.emit();
    }

    addProductToDeal() {
        this.emitAddProductToDeal.emit(this.product.id);
    }

    get productType(): string {
        return FormatUtil.productType(this.product.productType, this.product.shapeId,this.product.cartonShippingType);
    }

    get requestProduct(): string {
        let requestProducts = DataUtil.toSelectBoxDataSource(REQUEST_TYPE);
        let data            = requestProducts.find(item => {
            return item.id == this.product.factoryId;
        });

        return this.valueItem(data);
    }

    public valueItem(data: any): string {
        if (data)
            return data.name;

        return '';
    }

    /*Format name of paper display as 'paper name + paper-weight'*/
    getPaperName(product: ProductInfoModel): string {
        return product.getPaperName(this.mstLaminations);
    }

    onChangedProductLot() {
        this.requestUpdateProduct.emit(this.product);
    }

}
