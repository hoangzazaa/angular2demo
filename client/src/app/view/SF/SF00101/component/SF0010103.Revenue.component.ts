import {Component} from "@angular/core";
import {SF00101Data} from "../SF00101.data";
import {SF00101Page} from "../SF00101.page";
import {DataTableModel} from "../model/SF001_DataTable";
import {FormatUtil} from "../../../../util/format-util";
import MathUtil from "../../../../util/math-util";

/**
 * Created by manhnv on 6/5/2017.
 */

const THOUSAND_YEN: number = 1000;
@Component({
    selector   : 'sf0010103-revenue',
    templateUrl: 'SF0010103.Revenue.component.html'
})
export class SF0010103RevenueComponent {
    constructor(public page: SF00101Page) {
    }

    get pageData(): SF00101Data {
        return this.page.pageService.pageData;
    }

    get product_Type0(): number {
        return MathUtil.round(FormatUtil.isNaN(this.pageData.product_Type0) / THOUSAND_YEN, 0);
    }

    get product_Type1(): number {
        return MathUtil.round(FormatUtil.isNaN(this.pageData.product_Type1) / THOUSAND_YEN, 0);
    }

    get product_Type2(): number {
        return MathUtil.round(FormatUtil.isNaN(this.pageData.product_Type2) / THOUSAND_YEN, 0);
    }

    get sumTotal() {
        return this.product_Type0 + this.product_Type1 + this.product_Type2;
    }

    get dataRows(): DataTableModel[] {
        return this.pageData.dataTable;
    }

    forward(valueSelected: any): void {
        this.page.viewDealDetail(valueSelected);
    }
}