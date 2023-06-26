import {BaseModel} from "../../../../model/core/BaseModel.model";
import {MstSheetSizeModel} from "../../COMMON/model/MstSheetSize.model";
import { MstSheetSize } from '../../../../model/core/MstSheetSize.model';
/**
 * Created by hoangtd on 4/22/2017.
 */
export class PaperModel extends BaseModel {
    basicWeight: number;

    normValue: number;

    paperId: number;

    paperName: string;

    paperMaterialCode: string;

    weight: string;

    commonFlag: number;

    factoryId: number;

    optionId: number;

    paperType: number;

    paperSizeW: number;

    paperSizeH: number;

    hiddenFlag: number;

    tabNumber: number;

    isNew: boolean;

    isPaperClone: number;

    sheetSizeClone: MstSheetSizeModel[];

    /** 原紙サイズ ID (sfr_sf_mst_sheet_size.id) 特殊原紙のみ */
    paperSizeId: number;

    /**
     * 特殊原紙かどうか
     *
     * @return true: 特殊原紙, false: 一般原紙
     */
    get paper2903(): boolean {
        if (!!this.paperSizeW && !!this.paperSizeH)
            return true;
        return false;
    }

    /**
     * MstSheetSize に変換する
     */
    toMstSheetSize(): MstSheetSize {
        if (!this.paper2903) {
            throw new Error('Invalid usage. Must be special paper.');
        }

        let sheetSize = new MstSheetSize();
        sheetSize.id = this.paperSizeId;
        sheetSize.width = this.paperSizeW;
        sheetSize.height = this.paperSizeH;
        sheetSize.paperId = this.id;

        return sheetSize;
    }
}
