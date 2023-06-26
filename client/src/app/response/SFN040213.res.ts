import { SimpleShippingDestinationJson } from '../model/core/ShippingDestination.model';

/**
 * GET /SFN040213/:customerId 届け先一覧の応答電文
 *
 * 対応する Java 側クラスは vn.vnext.sefuri.sf.json.SFN0402.response.SFN040213Res
 */
export interface SFN040213ResJson {
    /** ID と名前だけの届け先一覧 */
    destinations: SimpleShippingDestinationJson[];
}
