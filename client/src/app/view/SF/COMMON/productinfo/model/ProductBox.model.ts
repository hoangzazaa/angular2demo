import {ProductInfoModel} from "./ProductInfo.model";
import {TransactionModel} from "./Transaction.model";
import {InventoryModel} from "./Inventory.model";

export class ProductBoxModel {
    //1. product info
    product: ProductInfoModel;
    //2. transactions
    transactions: TransactionModel[];
    //3. inventory
    inventory: InventoryModel;

    dealCode: string;

    checked: boolean = false;

}
