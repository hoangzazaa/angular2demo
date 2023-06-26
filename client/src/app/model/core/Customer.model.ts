/**
 * Contain all customer infos.
 * @author vupt
 */

import {Deal} from "./Deal.model";
import { ShippingDestination, ShippingDestinationJson } from './ShippingDestination.model';
import { BaseModel, BaseJson } from './BaseModel.model';

/**
 * 得意先 JSON
 *
 * 対応する Java クラスは vn.vnext.sefuri.sf.json.core.CustomerJson
 */
export interface CustomerJson extends BaseJson {
	/** 得意先名 */
	name: string;
	/** 担当部署 */
	deptName: string;
	/** 担当営業 */
	saleName: string;
	/** HP経由 */
	hpInfo: number;
	/** 備考 （カルテ） */
	memo: string;
	/** customerCode */
	customerCode: string;
	/** deleteFlag */
	deleteFlag: number;
	/** 略称 */
	abbreviation: string;
	/** ふりがな */
	furigana: string;
	/** 略称ふりがな */
	abbrFurigana: string;
	/** 代表者 */
	customerRep: string;
	/** 得意先担当者 */
	customerContact: string;
	/** 業務担当 */
	picCode: string;

	/** 案件のリスト */
	deal?: any[];		// TODO
	/** 届け先のリスト */
	shippingDestinations?: ShippingDestinationJson[];
}


export class Customer extends BaseModel{

	/* 得意先名 */
	public name: string;

	/* 担当部署 */
	public deptName: string;

	/* 担当営業  */
	public salerName: string;

	/* HP経由 */
	public hpInfo: string;

	/* 備考 （カルテ） */
	public memo: string;

	/* customerCode */
	public customerCode: string;

	/* deleteFlag */
	public deleteFlag: number;

	/* abbreviation */
	public abbreviation: string;

	/* furigana */
	public furigana: string;

	/* abbrFurigana */
	public abbrFurigana: string;

	/* customerRep */
	public customerRep: string;

	/* 得意先担当者 */
	public customerContact: string;

	/* 業務担当 */
	public picCode: string;

	/* customerRsDeal */
	public deal: Deal[];

	/* customerRsShippingDestination */
	public shippingDestinations: ShippingDestination[];

	public setCustomer(data: CustomerJson|any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.name = data["name"];
		this.deptName = data["deptName"];
		this.salerName = data["salerName"];
		this.hpInfo = data["hpInfo"];
		this.memo = data["memo"];
		this.customerCode = data["customerCode"];
		this.deleteFlag = data["deleteFlag"];
		this.abbreviation = data["abbreviation"];
		this.furigana = data["furigana"];
		this.abbrFurigana = data["abbrFurigana"];
		this.customerRep = data["customerRep"];
		this.customerContact = data["customerContact"];
		this.picCode = data["picCode"];

		if(data["deal"] !== undefined){
			this.deal=[];
			for (var i = 0; i < data["deal"].length; i++) {
				let tmp = new Deal();
				tmp.setDeal(data["deal"][i]);
				this.deal.push(tmp);
			}
		}
		if(data["shippingDestinations"] !== undefined){
			this.shippingDestinations=[];
			for (var i = 0; i < data["shippingDestinations"].length; i++) {
				let tmp = new ShippingDestination();
				tmp.setShippingDestination(data["shippingDestinations"][i]);
				this.shippingDestinations.push(tmp);
			}
		}
	}
}