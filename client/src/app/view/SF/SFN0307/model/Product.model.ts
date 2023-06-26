import {MstPaper} from "../../../../model/core/MstPaper.model";
import {MstLamination} from "../../../../model/core/MstLamination.model";
/**
 * Product model for SFN0307
 */
export class ProductModel {

    // id
    id: number;
    // 製品ID/ Product ID
    code: string;
    // 製品種類/ Product type
    type_name: string;

    type: number;
    // 製品名/ Product name
    name: string;
    // 品目C/Hạng mục C
    itemCode: string;
    // サイズ/ Size
    size: string;
    // 材料/ Vật liệu
    material: string;
    // メモ/ Memo
    memo: string;
    // 得意先製品番号/ Mã product của customer
    customerProductCode: string;
    // 製造依頼先/ Nơi request production
    manufacture: string;
    // ロット/ Lot
    lot: number;
    // 提出単価/ Offer unit price
    unitPrice: number;
    // 提出金額/ Số tiền offer
    total: number;
    // Image
    image: string;
    // update date
    updateDate: Date;
    // shape
    shapeId: number;

    cartonShippingType: number;

    laminationFlute: number;

    laminationPaperTypeA: number;

    laminationPaperTypeB: number;

    laminationABasicWeight: number;

    laminationBBasicWeight: number;

    laminationPaperTypeFront: number;

    laminationPaperTypeBack: number;

    laminationPaperTypeMedium: number;

    laminationFrontBasicWeight: number;

    laminationMediumBasicWeight: number;

    laminationBackBasicWeight: number;

    laminationAId: number;

    laminationBId: number;

    laminationFrontId: number;

    laminationBackId: number;

    laminationMediumId: number;

    printMethod?: number;

    colorIdF?: number;

    specialColorF?: number;

    colorIdB?: number;

    specialColorB: number;

    sizeW: number;

    sizeD: number;

    sizeH: number;

    paperSizeW: number;

    paperSizeH: number;

    // 木型有効期限情報
    woodenExpiredDate: Date;
    // 木型を持つかどうか
    hasWooden: boolean;

    paper: MstPaper;

    mstLaminations: MstLamination[];

    get productType():number{
        return this.type;
    }
}