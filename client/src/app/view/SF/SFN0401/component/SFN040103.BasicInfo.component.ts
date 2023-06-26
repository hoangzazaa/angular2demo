import {Component, OnInit} from "@angular/core";
import {SFN0401Page} from "../SFN0401.page";
import {PartnerModel} from "../model/SFN0401_Partner.model";
import {SFN040102Component} from "./SFN040102.PartnerPanel.component";
import {SFN0401Constants} from "../SFN0401.constants";

@Component({
    selector: "[sfn040103]",
    templateUrl: "SFN040103.BasicInfo.component.html"
})
export class SFN040103Component implements OnInit {

    private partner: PartnerModel;

    constructor(private page: SFN0401Page, private component: SFN040102Component) {
        this.partner = this.component.partner;
    }

    ngOnInit(): void {
        this.partner = this.component.partner;
    }

    //region Bindings

    get isCustomer(): boolean {
        return (this.partner.type == SFN0401Constants.PTYPE_CUSTOMER);
    }

    get isSupplier(): boolean {
        return (this.partner.type == SFN0401Constants.PTYPE_SUPPLIER);
    }

    get hasStartYear(): boolean {
        if (this.partner.type == SFN0401Constants.PTYPE_CUSTOMER && this.partner.startYear != undefined) {
            return true;
        } else {
            return false;
        }
    }

    //endregion
}