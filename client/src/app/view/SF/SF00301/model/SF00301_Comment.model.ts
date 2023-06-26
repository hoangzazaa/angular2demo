import {BaseModel} from "../../../../model/core/BaseModel.model";
import {Constants} from "../../../../helper/constants";
import {SF00301_CommentFile} from './SF00301_CommentFile.model';

export class SF00301_Comment extends BaseModel {

    public title: string;

    public value: string;

    /* userId */
    public userId: number;

    /* dealId */
    public dealId: number;

    /* userRsComment */
    public username: string;

    public commentFiles: SF00301_CommentFile[] = [];

    public setComment(data: any) {
        if (!data)
            return;

        //set basic info & binding value to properties
        this.setData(data);

        this.title    = data["title"];
        this.value    = data["value"];
        this.userId   = data["userId"];
        this.dealId   = data["dealId"];
        this.username = (data["departmentName"] == undefined ? '' : data["departmentName"] + Constants.SLASH_JP) + data["username"];

        if ( data['commentFiles'] ) {
            for (let commentFileData of data['commentFiles'] ) {
                let commentFile: SF00301_CommentFile = new SF00301_CommentFile();
                commentFile.setCommentFile(commentFileData);
                this.commentFiles.push(commentFile);
            }
        }
    }

    public shortenValue(): string {
        if (this.value.length <= 40) return this.value;
        return this.value.substring(0, 37) + "...";
    }

}
