/**
 * Created by hoangtd on 2/13/2017.
 */
import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import {SF00503Data} from "../SF00503.data";
import {FormatUtil} from "../../../../util/format-util";
import {Constants} from "../../../../helper/constants";
import MathUtil from "../../../../util/math-util";
import {SF00503Helper} from "../SF00503.helper";

/**
 * TOP &gt; 営業目標登録 ... 個人別目標タブの新規得意先セクション
 */
@Component({
    selector: "sf0050303",
    templateUrl: "SF0050303.component.html"
})
export class SF0050303Component implements OnInit {

    ngOnInit(): void {
        this.updateDataChange(0);
    }

    @Output() onDataChanged: EventEmitter<any> = new EventEmitter();

    constructor(public sf00503Data: SF00503Data) {
    }

    updateDataChange(value) {
        this.sf00503Data.calculatorDepartmentAfter();

        this.calculatorData();
    }

    calculatorData() {
        for (let i = 0; i < this.sf00503Data.columns.length; i++) {
            this.sf00503Data.goldNewCus[i] = FormatUtil.isNaN(this.sf00503Data.goldNew[0][i])
                + FormatUtil.isNaN(this.sf00503Data.goldNew[1][i]) + FormatUtil.isNaN(this.sf00503Data.goldNew[2][i]);
        }

    }

    emitDataChangedEvent() {
        this.onDataChanged.emit();
    }

    get activityPolicy(): string {
        return this.sf00503Data.departmentGoal.activityPolicy;
    }

    set activityPolicy(value: string) {
        this.sf00503Data.departmentGoal.activityPolicy = value;
    }

    // get row
    get rows(): number[] {
        return this.sf00503Data.rows;
    }

    // get column
    get columns(): number[] {
        return this.sf00503Data.columns;
    }

    //type1New
    get type1New(): number {
        return this.sf00503Data.type1New;
    }

    //type2New
    get type2New(): number {
        return this.sf00503Data.type2New;
    }

    //type3New
    get type3New(): number {
        return this.sf00503Data.type3New;
    }

    get totalNew(): number {
        return this.sf00503Data.totalNew;
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
