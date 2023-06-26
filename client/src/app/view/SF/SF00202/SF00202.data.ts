import {Constants} from "../../../helper/constants";
import {SF00202_Deal} from "./model/SF00202_Deal.model";
import {SF00202RuleFilter} from "./model/SF00202.filter";
import {MstLamination} from "../../../model/core/MstLamination.model";

export class SF00202Data {

    CONSTANTS = {
        PAGE_SIZE: Constants.PAGE_SIZE
    };

    mstLaminations: MstLamination[];

    deals: SF00202_Deal[] = [];

    totalRecords: number = Constants.ZERO;

    advancedSearchFlg: boolean = false;

    keywords: string[] = [];

    ruleFilter: SF00202RuleFilter = new SF00202RuleFilter();

    currentPage: number = Constants.ZERO;

    get hasAtLeastOneKeyword(): boolean {
        return this.keywords && this.keywords.length > 0;
    }
}
