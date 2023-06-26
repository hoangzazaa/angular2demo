import {DetailModel} from "./SF00501_Detail.model";
/**
 * Detail wrapper model for SF00501
 */
export class DetailWrapperModel {

    /* wrapper type */
    type: number;
    /* detail*/
    detail: DetailModel;
    /* old detail*/
    oldDetail: DetailModel;
}