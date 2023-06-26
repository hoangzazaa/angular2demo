import {BaseModel} from "../../../../model/core/BaseModel.model";
export class SF00201_Product extends BaseModel {
    /* 製品名 */
    public productName: string;

    /* メモ -メモ1,2,3 */
    public memo: string;

    /* 製品寸法 Height */
    public sizeH: number;

    /* 製品寸法 Depth */
    public sizeD: number;

    /* 製品寸法 Width */
    public sizeW: number;

    /* 坪量 */
    public paperWeight: number;

    /* 原紙名 */
    public paperName: string;

    /* 面付数 */
    public impositionNumber: number;

    /* 色（オモテ） */
    public colorFSelect: number;

    /* woodenCode */
    public woodenCode: string;

    /* 製造依頼元 */
    public surfaceF_varnishType: number;

    public application: string;

    public paperNameId: number;

    /* image file path */
    public srcImg: string;

    public originalName: string;
}
