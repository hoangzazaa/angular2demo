import { BaseModel, BaseJson } from './BaseModel.model';

/**
 * ファイル
 *
 * 対応する Java クラスは vn.vnext.sefuri.sf.json.core.FileJson
 */
export interface FileJson extends BaseJson {
	/** ファイルコード */
	fileCode: string;
	/** ファイルパス */
	filePath: string;
	/** 案件に添付のファイル */
	dealFile?: any;		// TODO
	/** 製品に添付のファイル */
	productFile?: any;	// TODO
	/** ? */
	shapeFile?: any;	// TODO
}


export class File extends BaseModel{

	/* fileCode */
	public fileCode: string;

	/* filePath */
	public filePath: string;

	/**
	 * JSON をデコード
	 * @param data JSON
	 */
	public setFile(data: FileJson|any){
		this.id = data["id"];
		this.createdUser = data["createdUser"];
		this.updatedUser = data["updatedUser"];
		this.createdDate = data["createdDate"] !=undefined ? new Date(data["createdDate"]): undefined;
		this.updatedDate = data["updatedDate"] !=undefined ? new Date(data["updatedDate"]): undefined;
		this.fileCode = data["fileCode"];
		this.filePath = data["filePath"];
	}

	/**
	 * JSON 形式に変換
	 * @return JSON
	 */
	public toFileJson(): FileJson {
		return {
			id: this.id,
			createdUser: null,		// 不要
			updatedUser: null,		// 不要
			createdDate: null,		// 不要
			updatedDate: null,		// 不要
			fileCode: this.fileCode,
			filePath: this.filePath
		};
	}
}
