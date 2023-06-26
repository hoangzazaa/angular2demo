/**
 * Created by hoangtd on 2/13/2017.
 */
import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {SF00503Data} from "../SF00503.data";
import {FormatUtil} from "../../../../util/format-util";
import {Constants} from "../../../../helper/constants";
import MathUtil from "../../../../util/math-util";
import {SF00503Helper} from "../SF00503.helper";

/**
 * TOP &gt; 営業目標登録 ... 部門目標タブの既存得意先セクション
 */
@Component({
    selector: "sf0050302",
    templateUrl: "SF0050302.component.html"
})
export class SF0050302Component implements OnInit {

    ngOnInit(): void {
        this.updateDataChange(0);
    }

    @Output() onDataChanged: EventEmitter<any> = new EventEmitter();

    constructor(public sf00503Data: SF00503Data) {

    }

    updateDataChange(value) {
       this.sf00503Data.calculatorDepartmentAfter();
    }

    emitDataChangedEvent() {
        this.onDataChanged.emit();
    }

    // get row
    get rows(): number[] {
        return this.sf00503Data.rows;
    }

    // get column
    get columns(): number[] {
        return this.sf00503Data.columns;
    }

    get type1OldAfter(): number {
        return this.sf00503Data.type1OldAfter;
    }

    get type2OldAfter(): number {
        return this.sf00503Data.type2OldAfter;
    }

    get type3OldAfter(): number {
        return this.sf00503Data.type3OldAfter;
    }

    //type1OldBefore
    get type1OldBefore(): number {
        return this.sf00503Data.type1OldBefore;
    }

    //type2OldBefore
    get type2OldBefore(): number {
        return this.sf00503Data.type2OldBefore;
    }

    //type3OldBefore
    get type3OldBefore(): number {
        return this.sf00503Data.type3OldBefore;
    }

    //totalOldAfter
    get totalOldAfter(): number {
        return this.sf00503Data.totalOldAfter;
    }

    //totalOldBefore
    get totalOldBefore(): number {
        return this.sf00503Data.totalOldBefore;
    }

    //interestRateOld
    get interestRateOld(): any {
        return this.sf00503Data.interestRateOld;
    }

    calculatorData() {
        for (let i = 0; i < this.sf00503Data.columns.length; i++) {
            this.sf00503Data.goldOldCus[i] = FormatUtil.isNaN(this.sf00503Data.goldOld[0][i])
                + FormatUtil.isNaN(this.sf00503Data.goldOld[1][i]) + FormatUtil.isNaN(this.sf00503Data.goldOld[2][i]);

            this.sf00503Data.goldOldBeforeCus[i] = FormatUtil.isNaN(this.sf00503Data.goldOldBefore[0][i])
                + FormatUtil.isNaN(this.sf00503Data.goldOldBefore[1][i]) + FormatUtil.isNaN(this.sf00503Data.goldOldBefore[2][i]);

            if (this.sf00503Data.goldOldBeforeCus[i] && this.sf00503Data.goldOldBeforeCus[i] > 0) {
                let interest = FormatUtil.isNaN(this.sf00503Data.goldOldBeforeCus[i]);
                if (interest == 0) {
                    this.sf00503Data.interestRateCus[i] = Constants.HYPHEN;
                } else {
                    this.sf00503Data.interestRateCus[i] = MathUtil.round(this.sf00503Data.goldOldCus[i] * 100000 / interest, 1);
                }
            }
        }

    }

    checkInput(evt) {
        if (evt.which < 48 || evt.which > 57) {
            evt.preventDefault();
            return;
        }
    }

    convertYenToThousanYen(value: number){
        return SF00503Helper.convertYenToThousanYen(value);
    }
}
