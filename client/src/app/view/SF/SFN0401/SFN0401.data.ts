import {FilterModel} from "./model/SFN0401_Filter.model";
import {PartnerModel} from "./model/SFN0401_Partner.model";
import {SFN0401Constants} from "./SFN0401.constants";

export class SFN0401Data {

    constructor() {
        this.screenMode = SFN0401Constants.MODE_REPEAT;
        this.currentFilter = new FilterModel();

        this.partnerList = [];
        this.hits = 0;

        this.canSelectPartner = true;
    }

    //region Background data

    // screen mode
    screenMode: number;
    // cache
    dealCode: string;
    productCode: string;

    //endregion

    //region Screen data

    // current filter
    currentFilter: FilterModel;
    // partners
    partnerList: PartnerModel[];
    hits: number;
    // prevent select partner
    canSelectPartner: boolean;

    //endregion
}