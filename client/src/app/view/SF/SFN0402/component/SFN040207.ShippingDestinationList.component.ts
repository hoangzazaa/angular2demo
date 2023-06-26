import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ShippingDestinationModel } from '../../SFN0307/model/ShippingDestination.model';
import { PartnerModel } from '../model/SFN0402_Partner.model';
import { ShippingDestination } from '../../../../model/core/ShippingDestination.model';

@Component({
    selector: "[sfn040207-shippingDestinationList]",
    templateUrl: "SFN040207.ShippingDestinationList.component.html"
})
export class SFN040207ShippingDestinationListComponent {
    /** 得意先 */
    @Input()
    customer: PartnerModel;
    /** 届け先一覧 */
    @Input()
    shippingDestinationList: ShippingDestination[];
    /** 届け先編集画面への遷移要求 */
    @Output()
    showShippingDestination = new EventEmitter();

    /**
     * 届け先編集画面への遷移
     *
     * @param shippingDestinationId 選択ボックスの選択値
     */
    moveTo(shippingDestinationId: number|string): void {
        if (shippingDestinationId && String(shippingDestinationId).length) {
            this.showShippingDestination.emit(shippingDestinationId);
        }
    }
}
