import { Customer, CustomerJson } from './Customer.model';
import { BaseModel } from "./BaseModel.model";
import { KeyofExtraMethod, DISTANCE } from '../../helper/mst-data-type';


/**
 * 届け先ファイル (JSON) 応答(サーバー→ブラウザ)
 *
 * 対応する Java クラスは vn.vnext.sefuri.sf.json.core.ShippingDestinationImageJson
 */
export interface ShippingDestinationImageJsonResponse {
	/** 届け先画像情報 ID */
	id: number;
	/** 画像 URL (応答のみ) */
	image: string;
	/** コメント */
	memo: string;
}

/**
 * 届け先ファイル (JSON) 要求(ブラウザ→サーバー)
 *
 * 対応する Java クラスは vn.vnext.sefuri.sf.json.core.ShippingDestinationImageJson
 */
export interface ShippingDestinationImageJsonRequest {
	/** 届け先画像情報 ID (画像新規追加時は null もしくは要素なし) */
	id?: number;
	/** テンポラリファイル名(画像アップロード時のみ必須) */
	temporaryFileName?: string;
	/** コメント */
	memo: string;
}


/**
 * 届け先ファイル
 */
export class ShippingDestinationImage extends BaseModel {

	/** コメント */
	public memo: string;
	/** 画像 URL */
	public image: string;
	/** テンポラリファイル名 */
	public temporaryFileName: string;


	/**
	 * JSON を当モデルに記入
	 *
	 * @param data JSON
	 */
	public setShippingDestinationImage(data: ShippingDestinationImageJsonResponse){
		this.id = data.id;
		this.image = data.image;
		this.temporaryFileName = null;
		this.memo = data.memo;
	}

	/**
	 * JSON 形式に変換する
	 *
	 * @return JSON
	 */
	toShippingDestinationImageJson(): ShippingDestinationImageJsonRequest {
		return {
			id: this.id,
			temporaryFileName: this.temporaryFileName,
			memo: this.memo
		};
	}
}
