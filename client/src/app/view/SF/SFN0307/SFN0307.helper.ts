import {ShippingPlanModel} from "./model/ShippingPlan.model";
import {SFN0307Data} from "./SFN0307.data";
import {OrderItemModel} from "./model/OrderItem.model";
import {ProductModel} from "./model/Product.model";
/**
 * Helper class for SFN0307
 * @author haipt
 */
export class SFN0307Helper {

    static createNewShipping(order: OrderItemModel, pageData: SFN0307Data): ShippingPlanModel {
        let shippingPlan = new ShippingPlanModel();
        // default values
        // 出荷予定数
        let quantity = order.quantity;
        if (quantity != undefined) {
            if (order.shippings != undefined) {
                for (let shipping of order.shippings) {
                    if (shipping.quantity != undefined) {
                        quantity -= shipping.quantity;
                    }
                }
            }
            if (quantity < 0) {
                quantity = 0;
            }
            shippingPlan.quantity = quantity;
        }
        // 出荷便 = 自社便 -> http://fridaynight.vnext.vn/issues/3429
        shippingPlan.shippingCompany = 1;
        // 納入場所 = last
        let destinationList = pageData.destinations;
        if (destinationList.length > 0) {
            shippingPlan.destinationId = destinationList[destinationList.length - 1].id;
        }
        return shippingPlan;
    }

    static isRevProduct(product: ProductModel): boolean {
        let code = product.itemCode;
        if (code != undefined) {
            if (code.indexOf("-") > 0) {
                return true;
            }
        }
        return false;
    }
}