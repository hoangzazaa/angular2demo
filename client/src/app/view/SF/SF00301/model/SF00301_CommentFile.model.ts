import {BaseModel} from "../../../../model/core/BaseModel.model";

export class SF00301_CommentFile extends BaseModel {

    public originalName: string;
    public fileId: number;
    public commentId: number;
    public srcImg: string;

    public setCommentFile(data: any) {
        if (!data) return;

        //set basic info & binding value to properties
        this.setData(data);

        this.originalName = data['originalName'];
        this.fileId = data['fileId'];
        this.commentId = data['commentId'];
        this.srcImg = data['srcImg'];
    }
}
