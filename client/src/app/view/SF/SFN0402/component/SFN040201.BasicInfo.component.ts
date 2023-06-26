import {Component, OnInit} from "@angular/core";
import {SFN0402Page} from "../SFN0402.page";
import {PartnerModel} from "../model/SFN0402_Partner.model";
import {SFN0402Constants} from "../SFN0402.constants";

@Component({
    selector: "[sfn040201]",
    templateUrl: "SFN040201.BasicInfo.component.html"
})
export class SFN040201Component implements OnInit {

    /** 得意先か true: 得意先, false: 仕入先 */
    isCustomer: boolean;
    /** 仕入先か true: 仕入先, false: 得意先 */
    isSupplier: boolean;
    /** 多重送信防止用のフラグ true: 保存可能, false: 保存不可(通信中) */
    saveEnable: boolean;

    constructor(private page: SFN0402Page) {
    }

    ngOnInit(): void {
        this.isCustomer = (this.page.pageData.partnerType == SFN0402Constants.TYPE_CUSTOMER);
        this.isSupplier = (this.page.pageData.partnerType == SFN0402Constants.TYPE_SUPPLIER);
        this.saveEnable = true;
    }

    //region Bindings

    get partner(): PartnerModel {
        return this.page.pageData.partner;
    }

    get hasStartYear(): boolean {
        if (this.isCustomer && this.page.pageData.partner.startYear != undefined) {
            return true;
        } else {
            return false;
        }
    }

    //endregion

    //region Actions

    saveMemo() {
        this.saveEnable = false;
        this.page.saveMemo().then(() => {
            this.saveEnable = true;
        });
    }

    resetMemo() {
        this.page.pageData.partner.memo = this.page.pageData.partnerMemo;
        this.page.pageData.partner.remarksForShipping = this.page.pageData.remarksForShipping;
    }

    //endregion
}
