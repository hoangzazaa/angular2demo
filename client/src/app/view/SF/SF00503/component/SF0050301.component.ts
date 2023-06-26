/**
 * Created by hoangtd on 2/13/2017.
 */
import {Component, Output, EventEmitter} from "@angular/core";
import {SF00503Data} from "../SF00503.data";

/**
 * TOP &gt; 営業目標登録 ... 各タブのヘッダ (年度セレクターとサマリー(支店全体での集計結果))
 */
@Component({
    selector: "sf0050301",
    templateUrl: "SF0050301.component.html"
})
export class SF0050301Component {

    @Output() changeYear: EventEmitter<any> = new EventEmitter();

    constructor(public sf00503Data: SF00503Data) {

    }

    get checkTab(): boolean {
        return this.sf00503Data.tabCurrent === this.sf00503Data.TAB_02_INDEX ||
            this.sf00503Data.tabCurrent === this.sf00503Data.TAB_03_INDEX;
    }

    get year(): number {
        return this.sf00503Data.year;
    }

    set year(value: number) {

        this.changeYear.emit(value);
    }

    // get list year
    get years(): number[] {
        return this.sf00503Data.years;
    }

    get departmentName() {
        return this.sf00503Data.department.department;
    }

    //type1OldAfter
    get type1OldAfter(): number {
        return this.sf00503Data.type1OldAfter + this.sf00503Data.type1Other;
    }

    //type1OldBefore
    get type1OldBefore(): number {
        return this.sf00503Data.type1OldBefore;
    }

    //type2OldAfter
    get type2OldAfter(): number {
        return this.sf00503Data.type2OldAfter + this.sf00503Data.type2Other;
    }

    //type2OldBefore
    get type2OldBefore(): number {
        return this.sf00503Data.type2OldBefore;
    }

    //type3OldAfter
    get type3OldAfter(): number {
        return this.sf00503Data.type3OldAfter +  + this.sf00503Data.type3Other;
    }

    //type3OldBefore
    get type3OldBefore(): number {
        return this.sf00503Data.type3OldBefore;
    }

    //totalOldAfter
    get totalOldAfter(): number {
        return this.sf00503Data.totalOldAfter + this.sf00503Data.totalOther;
    }

    //totalOldBefore
    get totalOldBefore(): number {
        return this.sf00503Data.totalOldBefore;
    }

    //interestRateOld
    get interestRateOld(): number|string {
        return this.sf00503Data.interestRateOld;
    }

    get interestRate(): number|string {
        return this.sf00503Data.interestRate;
    }

    //type1New
    get type1New(): number {
        return this.sf00503Data.type1New;
    }

    get type2New(): number {
        return this.sf00503Data.type2New;
    }

    get type3New(): number {
        return this.sf00503Data.type3New;
    }

    get totalNew(): number {
        return this.sf00503Data.totalNew;
    }

    // sum
    get type1(): number {
        return this.sf00503Data.type1;
    }

    get type2(): number {
        return this.sf00503Data.type2;
    }

    get type3(): number {
        return this.sf00503Data.type3;
    }

    get sumTotal(): number {
        return this.sf00503Data.sumTotal;
    }

    // sum
    get typeTT1(): number {
        return this.sf00503Data.typeTT1;
    }

    get typeTT2(): number {
        return this.sf00503Data.typeTT2;
    }

    get typeTT3(): number {
        return this.sf00503Data.typeTT3;
    }

    get typeTT4(): number {
        return this.sf00503Data.typeTT4;
    }

    get type1Diff(): number {
        return Math.abs(this.type1Customer - this.type1);
    }

    get type1GronwUp(): boolean {
        return this.type1Customer > this.type1;
    }

    get type1GronwDown(): boolean {
        return this.type1Customer < this.type1;
    }

    get type1GronwSame(): boolean {
        return this.type1Customer == this.type1;
    }

    get type2Diff(): number {
        return Math.abs(this.type2Customer - this.type2);
    }

    get type2GronwUp(): boolean {
        return this.type2Customer > this.type2;
    }

    get type2GronwDown(): boolean {
        return this.type2Customer < this.type2;
    }

    get type2GronwSame(): boolean {
        return this.type2Customer == this.type2;
    }

    get type3Diff(): number {
        return Math.abs(this.type3Customer - this.type3);
    }

    get type3GronwUp(): boolean {
        return this.type3Customer > this.type3;
    }

    get type3GronwDown(): boolean {
        return this.type3Customer < this.type3;
    }

    get type3GronwSame(): boolean {
        return this.type3Customer == this.type3;
    }

    get totalDiff(): number {
        return Math.abs(this.totalCustomer - this.sumTotal);
    }

    get totalGrownUp(): boolean {
        return this.totalCustomer > this.sumTotal;
    }

    get totalGrownDown(): boolean {
        return this.totalCustomer < this.sumTotal;
    }

    get totalGrownSame(): boolean {
        return this.totalCustomer == this.sumTotal;
    }

    get type1Customer(): number {
        return this.sf00503Data.type1Customer;
    }

    get type2Customer(): number {
        return this.sf00503Data.type2Customer;
    }

    get type3Customer(): number {
        return this.sf00503Data.type3Customer;
    }

    get totalCustomer(): number {
        return this.sf00503Data.totalCustomer;
    }
}
