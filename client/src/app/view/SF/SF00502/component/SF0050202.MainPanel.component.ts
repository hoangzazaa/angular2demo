import { Component, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import {SF00502Constants} from "../SF00502.constants";
import {SF00502Page} from "../SF00502.page";
import {SF00502Helper} from "../SF00502.helper";
import { diffMonth, nthMonth } from '../../../../util/date-util';
import { MonthTerm } from '../model/MonthTerm.model';

@Component({
    selector: "[sf0050202]",
    templateUrl: "SF0050202.MainPanel.component.html"
})
export class SF0050202Component {

    // button disabled on save
    enableSave: boolean;
    /** 現在表示中の表示開始月 */
    private currentMonthTerm: MonthTerm;
    /** 表示開始月 */
    startMonth: Date = null;
    /** 表示終了月 */
    endMonth: Date = null;

    /** 表示終了日の選択リスト */
    endMonthOptions: Date[] = [];

    constructor(private page: SF00502Page, private changeRef: ChangeDetectorRef) {
        this.enableSave = true;
    }

    /**
     * 月変更イベント
     */
    @Output()
    changeMonth: EventEmitter<MonthTerm> = new EventEmitter<MonthTerm>();

    /**
     * 表示月
     */
    @Input()
    set selectedMonthTerm(monthTerm: MonthTerm) {
        this.setMonthTerm(monthTerm);
    }

    //region Screen bindings
    get monthOptions(): Array<Date> {
        return this.page.pageData.availableMonths;
    }

    /**
     * @return 表示開始月の選択肢
     */
    get startMonthOptions(): Date[] {
        return this.page.pageData.availableMonths;
    }

    get screenMode(): string {
        if (this.page.pageData.screenMode == SF00502Constants.SCREEN_MODE_PREDICTION) {
            return "見通し";
        } else {
            return "実績";
        }
    }

    get canSave(): boolean {
        return this.page.pageData.canEdit;
    }

    get isHasSummary(): boolean {
        return (this.page.pageData.sumarry != undefined);
    }

    get summaryNewAmount1(): number {
        return this.page.pageData.sumarry.newRevenue.amount1;
    }

    get summaryNewAmount2(): number {
        return this.page.pageData.sumarry.newRevenue.amount2;
    }

    get summaryNewAmount3(): number {
        return this.page.pageData.sumarry.newRevenue.amount3;
    }

    get summaryNewTotal(): number {
        return this.page.pageData.sumarry.newRevenue.total;
    }

    get summaryOldAmount1(): number {
        return this.page.pageData.sumarry.oldRevenue.amount1;
    }

    get summaryOldAmount2(): number {
        return this.page.pageData.sumarry.oldRevenue.amount2;
    }

    get summaryOldAmount3(): number {
        return this.page.pageData.sumarry.oldRevenue.amount3;
    }

    get summaryOldTotal(): number {
        return this.page.pageData.sumarry.oldRevenue.total;
    }

    get summaryDiffRate(): number {
        return this.page.pageData.sumarry.diffRate;
    }

    get isNanDiffRate(): boolean {
        return isNaN(this.page.pageData.sumarry.diffRate) || !isFinite(this.page.pageData.sumarry.diffRate);
    }

    //endregion

    //region Screen actions
    /**
     * 月セレクタ変更イベント
     */
    doChangeMonth(): void {
        this.page.confirmIgnoreChange().then(isConfirmed => {
            if (isConfirmed) {
                let date = this.startMonth;
                let term: number;

                if (date != this.currentMonthTerm.date) {
                    // 開始月が変更された場合は期間を維持する
                    term = this.currentMonthTerm.term;
                } else {
                    // endMonth が変更されたので入力値より期間を求める
                    term = diffMonth(date, this.endMonth) + 1;
                }

                // 変更イベントを送信する
                this.changeMonth.emit({date, term});
            } else {
                // 元の値に変更する
                this.setMonthTerm(this.currentMonthTerm);
            }
        });
    }

    doCancel() {
        this.page.resetScreenData();
    }

    doSave() {
        // disable save
        this.enableSave = false;

        // do save
        this.page.saveScreenData().then(() => {
            // enable save
            this.enableSave = true;
        });
    }

    //endregion

    //convertYenToThousanYen
    convertYenToThousanYen(value: number){
        return SF00502Helper.convertYenToThousanYen(value);
    }

    /**
     * 表示月を変更する
     *
     * @param monthTerm 表示月
     */
    setMonthTerm(monthTerm: MonthTerm) {
        this.currentMonthTerm = monthTerm;
        if (!monthTerm) {
            return;
        }

        // startMonth を設定
        this.startMonth = monthTerm.date;

        // startMonth を元に endMonth の選択肢を生成
        this.updateEndMonthOptions();

        // endMonth を設定
        let endMonthOptions = this.endMonthOptions;
        if (!endMonthOptions.length) {
            // まだ表示終了月の選択オプションが初期化されていないので null を返しておく
            this.endMonth = null;
        } else if (monthTerm.term - 1 < endMonthOptions.length) {
            // 選択値
            this.endMonth = endMonthOptions[monthTerm.term - 1];
        } else {
            // 期間が実績表示可能期間を超えるため、表示可能な最大期間を返す
            this.endMonth = endMonthOptions[endMonthOptions.length - 1];
            monthTerm.term = endMonthOptions.length;
        }
    }

    /**
     * 表示終了月の選択オプションを更新する
     */
    private updateEndMonthOptions(): void {
        let date = nthMonth(this.startMonth, 0);
        let maxDate = this.page.pageData.maxAchievmentDate;
        let options: Date[] = [];

        // 12 ヶ月もしくは今月まで options を追加する
        if (maxDate) {
            do {
                options.push(date);
                date = nthMonth(date, 1);
            } while (options.length < 12 && date.getTime() < maxDate.getTime());
        }

        this.endMonthOptions = options;
    }
}
