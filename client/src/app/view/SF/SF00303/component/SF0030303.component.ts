import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Item} from "../../../../model/common/Item";
import {ProductCommonFee} from "../../../../model/core/ProductCommonFee.model";
import {DealProduct} from "../../../../model/core/DealProduct.model";
@Component({
    selector   : 'sf0030303',
    templateUrl: './SF0030303.component.html'
})

export class SF0030303Component {
    @Input() productCommonFee: ProductCommonFee;
    @Input() productCode: string;
    @Input() dealProduct: DealProduct;

    item: Item = new Item();

    @Output() addProductCommon: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Method use to add product common fee.
     * @param valueName
     * @param valueNumber
     */
    addProductCommonRow(valueName, valueNumber, itemType) {
        /*set value name*/
        this.item.valueName = valueName;
        /*set value number*/
        this.item.valueNumber = valueNumber;
        /*set deal product*/
        this.item.dealProduct = this.dealProduct;
        /*set item type*/
        this.item.itemType = itemType;

        // change emit call page ts
        this.addProductCommon.emit(this.item);
    }

    get designFee(): number {
        if (this.productCommonFee.designFee == undefined)
            return 0;
        return this.productCommonFee.designFee;
    }

    get plateMakingFee(): number {
        if (this.productCommonFee.plateMakingFee == undefined)
            return 0;
        return this.productCommonFee.plateMakingFee;
    }

    get woodenFee(): number {
        if (this.productCommonFee.woodenFee == undefined)
            return 0;
        return this.productCommonFee.woodenFee;
    }

    get moldFee(): number {
        if (this.productCommonFee.moldFee == undefined)
            return 0;
        return this.productCommonFee.moldFee;
    }

    get resinFee(): number {
        if (this.productCommonFee.resinFee == undefined)
            return 0;
        return this.productCommonFee.resinFee;
    }
}