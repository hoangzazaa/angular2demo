import {BaseModel} from "../../../../model/core/BaseModel.model";

export class SF00301_ProductFile extends BaseModel {
    /* fileId */
    public fileId: number;

    /* productId */
    public productId: number;

    /* fileName */
    public productFileId: string;

    /* fileName */
    public productFileName: string;

    /* メモ */
    public memo: string;

    /* fileType */
    public fileType: number;

    /* 製品名 */
    public productName: string;

    public originalName: string;

    /* image file path */
    public srcImg: string;

    /*  productCode */
    public productCode: string;

    public highlightFlag: number;

    public primaryFlag: number;

    public category: symbol;

    public setProductFile(data: any) {
        if (!data)
            return;

        //set basic info & binding value to properties
        this.setData(data);

        this.fileId = data["fileId"];
        this.productId = data["productId"];
        this.productFileName = data["productFileName"];
        this.primaryFlag = data["primaryFlag"];
        this.productFileId = data["productFileId"];
        this.fileType = data["fileType"];
        this.productName = data["productName"];
        this.memo = data["memo"];
        this.productCode = data["productCode"];
        this.originalName = data["originalName"];
        this.highlightFlag = data["highlightFlag"];
        this.srcImg = data["srcImg"];
    }
}
