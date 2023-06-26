import { FileNameResJson } from './FileNameResJson';

/**
 * GET /SFN040217/:customerCode/:shippingDestinationId (届け先カルテ pdf の出力) の応答 JSON
 *
 * 対応する Java 側クラスは vn.vnext.sefuri.sf.json.SFN0402.response.SFN040217Res
 */
export interface SFN040217ResJson extends FileNameResJson {
}
