import {BaseModel} from "../../../../model/core/BaseModel.model";
export class SF00203_Product extends BaseModel {
    /* 製品名 */
    public productName: string;

    /* 製品寸法 Height */
    public sizeH: number;

    /* 製品寸法 Depth */
    public sizeD: number;

    /* 製品寸法 Width */
    public sizeW: number;

    /* Paper Name Id */
    public paperNameId: number;

    /*Lot*/
    public lot: number;

    /* 坪量 */
    public paperWeight: number;

    /*print method*/
    public printMethod: number;

    /*Wooden Code*/
    public woodenCode: string;

    /*woodenTotalNumber*/
    public woodenTotalNumber: number;

    /*woodenExpiredDate*/
    public woodenExpiredDate: Date;

    public estimatedUnitPrice: number;

    public customerProductCode: string;

    public productCode: string;

    /* メモ -メモ1,2,3 */
    public memo: string;

    public impositionNumber: number;

    public varnishType: number;

    public colorFSelect: number;

    public application: string;

    public quantityStock: number;

    /* image file path */
    public srcImg: string;

    public paperName: string;

}
