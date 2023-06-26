/**
 * Contain information of file of product 
 * @author vupt
 */

import {Product} from "./Product.model";
import {File} from "./File.model";
import {BaseModel} from "./BaseModel.model";

export class ProductFile extends BaseModel{

	/* fileId */
	public fileId: number;

	/* originalName */
	public originalName: string;

	/* productId */
	public productId: number;

	/* ファイルID */
	public productFileId: string;

	/* ファイル名称 */
	public productFileName: string;

	/* 製品情報のメイン画像として使用 */
	public primaryFlag: number;

	/* メモ */
	public memo: string;

	/* type */
	public type: string;

	/* productRsProductFile */
	public product: Product;

	/* fileRsProductFile */
	public file: File;

	/* image file path */
	public srcImg: string;

	public setProductFile(data: any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.fileId = data["fileId"];
		this.originalName = data["originalName"];
		this.productId = data["productId"];
		this.productFileId = data["productFileId"];
		this.productFileName = data["productFileName"];
		this.primaryFlag = data["primaryFlag"];
		this.memo = data["memo"];
		this.type = data["type"];
		this.srcImg = data["srcImg"];

		if(data["product"] !== undefined){
			this.product = new Product();
			this.product.setProduct(data["product"]);
		}

		if(data["file"] !== undefined){
			this.file = new File();
			this.file.setFile(data["file"]);
		}

	}
}