import {BaseModel} from "../../../../model/core/BaseModel.model";

export class SF00301_DealFile extends BaseModel {

    /* ファイルID */
    public fileId: number;

    /* ファイル名称 */
    public originalName: string;

    /* dealId */
    public dealId: number;

    /* dealFileId */
    public dealFileId: string;

    /* dealFileName */
    public dealFileName: string;

    /* メモ */
    public memo: string;

    /* highlightFlag */
    public highlightFlag: number;

    /* image file path */
    public srcImg: string;

    public category: symbol;

    public setDealFile(data: any) {
        if (!data)
            return;

        //set basic info & binding value to properties
        this.setData(data);

        this.fileId = data["fileId"];
        this.originalName = data["originalName"];
        this.dealId = data["dealId"];
        this.dealFileId = data["dealFileId"];
        this.dealFileName = data["dealFileName"];
        this.memo = data["memo"];
        this.highlightFlag = data["highlightFlag"];
        this.srcImg = data["srcImg"];
    }
}
