import {Constants} from "../../helper/constants";
import ValidatorUtil from "../../util/validator-util";


/**
 * JSON 型定義
 *
 * 全てのモデル系 JSON で共通の項目
 * 対応する Java クラスは vn.vnext.sefuri.sf.json.core.BaseJson<T>
 */
export interface BaseJson {
    /** ID */
    id: number;
    /** 作成ユーザー */
    createdUser: string;
    /** 更新ユーザー */
    updatedUser: string;
    /** 作成日時 (2018-01-04T15:00:00.000Z 形式) */
    createdDate: string;
    /** 更新日時 (2018-01-04T15:00:00.000Z 形式) */
    updatedDate: string;
}


/**
 * Contain common columns used in all table
 * @author vupt
 */
export class BaseModel {

    /* id */
    public id: number;

    /* createdUser */
    public createdUser: number;

    /* updatedUser */
    public updatedUser: number;

    /* createdDate */
    public createdDate: Date;

    /* updatedDate */
    public updatedDate: Date;

    public setData(data: any) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = !!data["createdDate"] ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = !!data["updatedDate"] ? new Date(data["updatedDate"]) : undefined;
    }

    /* get updatedDate, if updatedDate not defined then get createdDate else get updatedDate*/
    getUpdatedDate(pattern?: string): string {
        let date = this.updatedDate;
        if (date === undefined)
            date = this.createdDate;

        //new Date(date).toISOString().slice(0, 10);
        return moment(date).format(ValidatorUtil.isNotEmpty(pattern) ? pattern : Constants.DEFAULT_DATE_FORMAT);
    }

}
