import { ShippingDestinationDetailJson } from '../model/core/ShippingDestination.model';
import { CustomerJson } from '../model/core/Customer.model';

/**
 * POST /SFN040215/:customerCode/:shippingDestinationId 届け先保存の要求電文
 *
 * 対応する Java 側クラスは vn.vnext.sefuri.sf.json.SFN0402.response.SFN040215Req
 */
export interface SFN040215ReqJson {
    /** 届け先詳細 */
    destination: ShippingDestinationDetailJson;
}
