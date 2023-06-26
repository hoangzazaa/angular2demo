import {ProductInfoModel} from "./model/ProductInfo.model";
import {TransactionModel} from "./model/Transaction.model";
import {InventoryModel} from "./model/Inventory.model";
export class ProductInfoData {
    //1. product info
    product: ProductInfoModel;
    //2. transactions
    transactions: TransactionModel[];
    //3. inventory
    inventory: InventoryModel;
}
