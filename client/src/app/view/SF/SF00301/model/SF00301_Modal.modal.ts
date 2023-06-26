import {BaseModel} from "../../../../model/core/BaseModel.model";

export class SF00301_FileItem extends BaseModel {

    /* ファイルID */
    public fileId: number;

    /* ファイル名称 */
    public originalName: string;

    /* parentId */
    public parentId: number;

    /* objectFileId */
    public objectFileId: string;

    /* objectFileName */
    public objectFileName: string;

    /* メモ */
    public memo: string;

    /* image file path */
    public srcImg: string;

    public primaryFlag: number;

    public nameTmp: string;

    public category: symbol;

    public fileType: string;
}
