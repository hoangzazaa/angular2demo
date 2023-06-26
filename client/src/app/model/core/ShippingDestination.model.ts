/**
 * Contain customer address
 * @author vupt
 */

import { Customer, CustomerJson } from './Customer.model';
import { BaseModel, BaseJson } from "./BaseModel.model";
import { KeyofExtraMethod } from '../../helper/mst-data-type';
import { ShippingDestinationImage, ShippingDestinationImageJsonRequest, ShippingDestinationImageJsonResponse } from './ShippingDestinationImage.model';


/**
 * 届け先 (納入先名のみ)
 *
 * 対応する Java クラスは vn.vnext.sefuri.sf.json.core.SimpleShippingDestinationJson
 */
export interface SimpleShippingDestinationJson extends BaseJson {
	/** 納入先名 */
	deliveryName: string;
}


/**
 * 届け先
 *
 * 対応する Java クラスは vn.vnext.sefuri.sf.json.core.ShippingDestinationJson
 */
export interface ShippingDestinationJson extends SimpleShippingDestinationJson {
	/** 住所 */
	deliveryAddress1: string;
	/** TEL */
	tel: string;
	/** FAX */
	fax: string;
	/** 納入可能車両サイズ */
	availableVehicleSize: number;
	/** 付帯作業 */
	extraWork: string;
	/** 専用伝票有無 */
	extraMethod: KeyofExtraMethod;  // keyof ExtraMethod;
	/** メモ */
	memo1: string;
	/** memo2 */
	memo2: string;
	/** customerId */
	customerId: number;
	/** 地区コード */
	districtCode: string;
	/** abbreviation */
	abbreviation: string;
	/** フリガナ */
	furigana: string;
	/** 略称フリガナ */
	abbrFurigana: string;
	/** 郵便番号 */
	postalCode: string;
	/** deliveryAddress2 */
	deliveryAddress2: string;
	/** 内線番号 */
	extension: string;
	/** defaultFlag */
	defaultFlag: string;
	/** dennoPartnerCode */
	dennoPartnerCode: string;
	/** customerRsShippingDestination */
	customer: CustomerJson;
	/** 担当部署 */
	deptName: string;
	/** 得意先担当者 */
	salerName: string;
	/** 時間指定区分値 */
	specifyTime: number;
	/** 時間指定(時) */
	specifyTimeHour: number;
	/** 時間指定(分) */
	specifyTimeMinute: number;
	/** 時間指定期間区分値 */
	specifyTimePeriod: number;
}

/**
 * 届け先 (詳細)
 *
 * 対応する Java クラスは vn.vnext.sefuri.sf.json.core.ShippingDestinationDetailJson
 */
export interface ShippingDestinationDetailJson extends ShippingDestinationJson {

	/** 路線会社指定 */
	deliveryCompany: string;
	/** 配送車両指定 */
	specifyVehicle: number;
	/** 配送車両指定(その他) */
	specifyVehicleOthers: string;
	/** 納品時間 */
	deliveryTime: string;
	/** 納品前TEL true(1): 要, false(0): 不要, null: 未記入 */
	telBeforeDelivery: boolean;
	/** エボ添付 true(1): 要, false(0): 不要, null: 未記入 */
	attachmentEbo: boolean;
	/** 天候不良時納品 true(1): 可, false(0): 不可, null: 未記入 */
	deliveryInCaseOfBadWeather: boolean;
	/** ストレッチフィルム巻き true(1): 有, false(0): 無, null: 未記入 */
	stretchFilm: boolean;
	/** 2F上げ true(1): 有, false(0): 無, null: 未記入 */
	upstairs: boolean;
	/** 2F上げ (有の内容) */
	upstairsDetail: number;
	/** 2F上げその他 */
	upstairsDetailOthers: string;
	/** パレット納品 true(1): 有, false(0): 無, null: 未記入 */
	paletteDelivery: boolean;
	/** パレット引取 true(1): 有, false(0): 無, null: 未記入 */
	paletteTakeBack: boolean;
	/** 数量制限 */
	limitQuantity: number;
	/** 降ろし場所指定 */
	unloadingPlace: string;
	/** 車両停車位置 */
	parkingPlace: string;
	/** 荷降ろし時のリフト使用者 */
	liftUserInUnloading: number;
	/** 荷降ろし形態 */
	unloadForm: string;
	/** その他注意事項 */
	attention: string;

	/**　届け先画像情報 (表示順) */
	imageList: ShippingDestinationImageJsonRequest[] | ShippingDestinationImageJsonResponse[];
}


export class ShippingDestination extends BaseModel {

	/** 納入先名  */
	public deliveryName: string;
	/** 住所1 */
	public deliveryAddress1: string;
	/** TEL */
	public tel: string;
	/** FAX */
	public fax: string;
	/** 納入可能車両サイズ */
	public availableVehicleSize: number;
	/** 時間指定 */
	public requiredTime: string;
	/** 付帯作業 */
	public extraWork: string;
	/** 専用伝票有無 */
	public extraMethod: string;
	/** メモ */
	public memo1: string;
	/** memo2 */
	public memo2: string;
	/** saveToDennoFlag */
	public saveToDennoFlag: number;
	/** customerId */
	public customerId: number;
	/** 地区コード */
	public districtCode: string;
	/** 略称 */
	public abbreviation: string;
	/** フリガナ */
	public furigana: string;
	/** 略称フリガナ */
	public abbrFurigana: string;
	/** 郵便番号 */
	public postalCode: string;
	/** 住所2 */
	public deliveryAddress2: string;
	/** 内線番号 */
	public extension: string;
	/** 時間指定有無 */
	public timePermission: number;
	/** defaultFlag */
	public defaultFlag: number;
	/** dennoPartnerCode */
	public dennoPartnerCode: string;
	/** customerRsShippingDestination */
	public customer: Customer;
	/** 時間指定区分値 */
	specifyTime: number;
	/** 時間指定(時) */
	specifyTimeHour: number;
	/** 時間指定(分) */
	specifyTimeMinute: number;
	/** 時間指定期間区分値 */
	specifyTimePeriod: number;

	/** 路線会社指定 */
	deliveryCompany: string;
	/** 配送車両指定 */
	specifyVehicle: number;
	/** 配送車両指定(その他) */
	specifyVehicleOthers: string;
	/** 納品時間 */
	deliveryTime: string;
	/** 納品前TEL true(1): 要, false(0): 不要, null: 未記入 */
	telBeforeDelivery: boolean;
	/** エボ添付 true(1): 要, false(0): 不要, null: 未記入 */
	attachmentEbo: boolean;
	/** 天候不良時納品 true(1): 可, false(0): 不可, null: 未記入 */
	deliveryInCaseOfBadWeather: boolean;
	/** ストレッチフィルム巻き true(1): 有, false(0): 無, null: 未記入 */
	stretchFilm: boolean;
	/** 2F上げ true(1): 有, false(0): 無, null: 未記入 */
	upstairs: boolean;
	/** 2F上げ (有の内容) */
	upstairsDetail: number;
	/** 2F上げその他 */
	upstairsDetailOthers: string;
	/** パレット納品 true(1): 有, false(0): 無, null: 未記入 */
	paletteDelivery: boolean;
	/** パレット引取 true(1): 有, false(0): 無, null: 未記入 */
	paletteTakeBack: boolean;
	/** 数量制限 */
	limitQuantity: number;
	/** 降ろし場所指定 */
	unloadingPlace: string;
	/** 車両停車位置 */
	parkingPlace: string;
	/** 荷降ろし時のリフト使用者 */
	liftUserInUnloading: number;
	/** 荷降ろし形態 */
	unloadForm: string;
	/** その他注意事項 */
	attention: string;

	/** 届け先画像情報 (表示順) */
	imageList: ShippingDestinationImage[];


	public setShippingDestination(data: ShippingDestinationJson|ShippingDestinationDetailJson|any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.deliveryName = data["deliveryName"];
		this.deliveryAddress1 = data["deliveryAddress1"];
		this.tel = data["tel"];
		this.fax = data["fax"];
		this.availableVehicleSize = data["availableVehicleSize"];
		this.requiredTime = data["requiredTime"];
		this.extraWork = data["extraWork"];
		this.extraMethod = data["extraMethod"];
		this.memo1 = data["memo1"];
		this.memo2 = data["memo2"];
		this.saveToDennoFlag = data["saveToDennoFlag"];
		this.customerId = data["customerId"];
		this.districtCode = data["districtCode"];
		this.abbreviation = data["abbreviation"];
		this.furigana = data["furigana"];
		this.abbrFurigana = data["abbrFurigana"];
		this.postalCode = data["postalCode"];
		this.deliveryAddress2 = data["deliveryAddress2"];
		this.extension = data["extension"];
		this.timePermission = data["timePermission"];
		this.defaultFlag = data["defaultFlag"];
		this.dennoPartnerCode = data["dennoPartnerCode"];
		this.specifyTime = data["specifyTime"];
		this.specifyTimeHour = data["specifyTimeHour"];
		this.specifyTimeMinute = data["specifyTimeMinute"];
		this.specifyTimePeriod = data["specifyTimePeriod"];

		if(data["customer"] !== undefined){
			this.customer = new Customer();
			this.customer.setCustomer(data["customer"]);
		}

		// ShippingDestinationDetailJson 分
		this.deliveryCompany = data["deliveryCompany"];
		this.specifyVehicle = data["specifyVehicle"];
		this.specifyVehicleOthers = data["specifyVehicleOthers"];
		this.deliveryTime = data["deliveryTime"];
		this.telBeforeDelivery = data["telBeforeDelivery"];
		this.attachmentEbo = data["attachmentEbo"];
		this.deliveryInCaseOfBadWeather = data["deliveryInCaseOfBadWeather"];
		this.stretchFilm = data["stretchFilm"];
		this.upstairs = data["upstairs"];
		this.upstairsDetail = data["upstairsDetail"];
		this.upstairsDetailOthers = data["upstairsDetailOthers"];
		this.paletteDelivery = data["paletteDelivery"];
		this.paletteTakeBack = data["paletteTakeBack"];
		this.limitQuantity = data["limitQuantity"];
		this.unloadingPlace = data["unloadingPlace"];
		this.parkingPlace = data["parkingPlace"];
		this.liftUserInUnloading = data["liftUserInUnloading"];
		this.unloadForm = data["unloadForm"];
		this.attention = data["attention"];

		if (data["imageList"]) {
			this.imageList
				= (data["imageList"] as ShippingDestinationImageJsonResponse[])
					.map(imageJson => {
						let model = new ShippingDestinationImage();
						model.setShippingDestinationImage(imageJson);
						return model;
					});
		} else {
			this.imageList = [];
		}
	}

	/**
	 * JSON 形式に変換する
	 */
	toShippingDestinationDetailJson(): ShippingDestinationDetailJson {
		return {
			// BaseJson
			id: this.id,
			createdUser: null,		// 不要
			updatedUser: null,		// 不要
			createdDate: null,		// 不要
			updatedDate: null,		// 不要
			// SimpleShippingDestinationJson
			deliveryName: this.deliveryName,
			// ShippingDestinationJson
			deliveryAddress1: this.deliveryAddress1,
			tel: this.tel,
			fax: this.fax,
			availableVehicleSize: this.availableVehicleSize,
			extraWork: this.extraWork,
			extraMethod: this.extraMethod as KeyofExtraMethod,
			memo1: this.memo1,
			memo2: this.memo2,
			customerId: this.customerId,
			districtCode: this.districtCode,
			abbreviation: this.abbreviation,
			furigana: this.furigana,
			abbrFurigana: this.abbrFurigana,
			postalCode: this.postalCode,
			deliveryAddress2: this.deliveryAddress2,
			extension: this.extension,
			defaultFlag: this.defaultFlag != null && this.defaultFlag != undefined ? String(this.defaultFlag) : null,
			dennoPartnerCode: this.dennoPartnerCode,
			customer: null, // 不要
			deptName: null,  // @deprecated につき null 固定
			salerName: null, // @deprecated につき null 固定
			specifyTime: this.specifyTime,
			specifyTimeHour: this.specifyTimeHour,
			specifyTimeMinute: this.specifyTimeMinute,
			specifyTimePeriod: this.specifyTimePeriod,
			// ShippingDestinationDetailJson
			deliveryCompany: this.deliveryCompany,
			specifyVehicle: this.specifyVehicle,
			specifyVehicleOthers: this.specifyVehicleOthers,
			deliveryTime: this.deliveryTime,
			telBeforeDelivery: this.telBeforeDelivery,
			attachmentEbo: this.attachmentEbo,
			deliveryInCaseOfBadWeather:  this.deliveryInCaseOfBadWeather,
			stretchFilm: this.stretchFilm,
			upstairs: this.upstairs,
			upstairsDetail: this.upstairsDetail,
			upstairsDetailOthers: this.upstairsDetailOthers,
			paletteDelivery: this.paletteDelivery,
			paletteTakeBack: this.paletteTakeBack,
			limitQuantity: this.limitQuantity,
			unloadingPlace: this.unloadingPlace,
			parkingPlace: this.parkingPlace,
			liftUserInUnloading: this.liftUserInUnloading,
			unloadForm: this.unloadForm,
			attention: this.attention,
			imageList: this.imageList
				? this.imageList.map(image => image.toShippingDestinationImageJson())
				: null
		};
	}
}
