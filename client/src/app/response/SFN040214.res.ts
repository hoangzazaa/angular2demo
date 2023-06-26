import { ShippingDestinationDetailJson } from '../model/core/ShippingDestination.model';

/**
 * GET /SFN042014/:customerId/:shippingDestinationId 届け先詳細の応答電文
 *
 * 対応する Java 側クラスは vn.vnext.sefuri.sf.json.SFN0402.response.SFN040214Res
 */
export interface SFN040214ResJson {
    /** 届け先詳細 */
    destination: ShippingDestinationDetailJson;
}
