import {ProductInfoModel} from "../../COMMON/productinfo/model/ProductInfo.model";
import {TransactionModel} from "../../COMMON/productinfo/model/Transaction.model";
import {InventoryModel} from "../../COMMON/productinfo/model/Inventory.model";

export class ProductBoxModel{
    //1. product info
    product: ProductInfoModel;
    //2. transactions
    transactions: TransactionModel[];
    //3. inventory
    inventory: InventoryModel;

    checked: boolean = false;
}
