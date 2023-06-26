import DataUtil from "../../../util/data-util";
import {SFN0307Constants} from "./SFN0307.constants";
import {OrderItemModel} from "./model/OrderItem.model";
import {ProductModel} from "./model/Product.model";

export class SFN0307DataRepo {

    // data map
    private dataRepo: any = {};

    //region staff: departmentid - staff[]

    getOrder(productId: number): OrderItemModel {
        return DataUtil.getData(this.dataRepo, undefined, SFN0307Constants.MAP_ORDER, productId);
    }

    setOrder(orderItem: OrderItemModel, productId: number): void {
        DataUtil.pushData(this.dataRepo, orderItem, productId, SFN0307Constants.MAP_ORDER);
    }

    clearOrder() {
        DataUtil.pushData(this.dataRepo, undefined, SFN0307Constants.MAP_ORDER);
    }

    getProduct(productId: number): ProductModel {
        return DataUtil.getData(this.dataRepo, undefined, SFN0307Constants.MAP_PRODUCT, productId);
    }

    setProduct(product: ProductModel, productId: number): void {
        DataUtil.pushData(this.dataRepo, product, productId, SFN0307Constants.MAP_PRODUCT);
    }

    //endregion
}