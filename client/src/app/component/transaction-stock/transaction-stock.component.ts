import {Component, Input} from "@angular/core";
import {TransactionStockModel} from "./transaction-stock.model";

@Component({
    selector: 'transaction-stock',
    templateUrl: './transaction-stock.component.html'
})

export class TransactionStockComponent {
    @Input() item: TransactionStockModel;
}
