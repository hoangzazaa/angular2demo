import {BaseModel} from "../../../../model/core/BaseModel.model";

export class SF00309_MailFile extends BaseModel {

    public fileId: number;

    public commentId: number;

    public mailFileId: string;

    public mailFileName: string;

    public memo: string;

    public fileType: number;

    public originalName: string;

    public srcImg: string;

    public setProductFile(data: any) {
        if (!data)
            return;

        //set basic info & binding value to properties
        this.setData(data);

        this.fileId = data["fileId"];
        this.fileType = data["fileType"];
        this.memo = data["memo"];
        this.originalName = data["originalName"];
        this.srcImg = data["srcImg"];
        this.commentId = data["commentId"];
        this.mailFileId = data["mailFileId"];
        this.mailFileName = data["mailFileName"];
    }
}
