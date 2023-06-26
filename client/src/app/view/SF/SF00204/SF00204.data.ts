import {Constants} from "../../../helper/constants";
import {SF00204FilterModel} from "./model/SF00204Filter.model";
import {ProductBoxModel} from "../COMMON/productinfo/model/ProductBox.model";
import {MstLamination} from "../COMMON/model/MstLamination.model";

export class SF00204Data {
    productBoxs: ProductBoxModel[];

    CONSTANTS = {
        PAGE_SIZE: Constants.PAGE_SIZE
    };

    totalRecords: number = Constants.ZERO;

    advancedSearchFlg: boolean = false;

    keywords: string[] = [];

    ruleFilter: SF00204FilterModel = new SF00204FilterModel();

    currentPage: number = Constants.ZERO;

    mstLaminations: MstLamination[] = [];

    get hasAtLeastOneKeyword(): boolean {
        return this.keywords && this.keywords.length > 0;
    }

    dealCode: string;
}
