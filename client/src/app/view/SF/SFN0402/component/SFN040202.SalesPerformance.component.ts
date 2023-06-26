import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {SFN0402Page} from "../SFN0402.page";
import {DateUtil} from "../../../../util/date-util";
import {SFN0402Data} from "../SFN0402.data";
import {CommonEvents} from "../../../../helper/common-events";
import {SFN0402Helper} from "../SFN0402.helper";

@Component({
    selector: "[sfn040202]",
    templateUrl: "SFN040202.SalesPerformance.component.html"
})
export class SFN040202Component implements OnInit, AfterViewInit {

    pageData: SFN0402Data;
    @ViewChild("hot") hotE: ElementRef;
    private hot: ht.Methods;
    private exportPlugin: any;

    constructor(private page: SFN0402Page, private el: ElementRef) {
        this.pageData = this.page.pageData;
    }

    ngOnInit(): void {

        // init years
        let cFYear = DateUtil.getFinancialYear(this.page.pageData.currentTime);
        this.pageData.spSelectedYear = cFYear;
        this.pageData.spYearList = [cFYear, cFYear - 1, cFYear - 2];
    }

    ngAfterViewInit(): void {
        // init table
        let container = this.hotE.nativeElement;
        this.hot = new Handsontable(container, {
            data: this.getDefaultData(),
            columnSorting: false,
            readOnly: true,
            stretchH: 'all',
            fixedColumnsLeft: 2,
            colWidths: [80, 100, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
            height: 410
        });
        this.exportPlugin = this.hot.getPlugin('exportFile');
        // register hot change
        $(window).on(CommonEvents.LAYOUT_CHANGE, () => {
            this.hot.render();
        });

        // load data
        this.reloadData();
    }

    //region Bindings

    get selectedYear(): number {
        return this.pageData.spSelectedYear;
    }

    set selectedYear(value: number) {
        this.pageData.spSelectedYear = value;
        this.reloadData();
    }

    get yearList(): number[] {
        return this.pageData.spYearList;
    }

    //endregion

    //region Actions

    reloadData() {
        OneUI.blocks(this.el.nativeElement, "state_loading");

        this.page.loadSalesPerformance().then(() => {
            let summaryData = this.getData();
            this.hot.loadData(summaryData);

            OneUI.blocks(this.el.nativeElement, "state_normal");
        });
    }

    exportCsv() {
        let fileName = this.pageData.partnerCode + "_" + this.pageData.spSelectedYear;
        this.exportPlugin.downloadFile('csv', {
            filename: fileName
        });
    }

    //endregion

    //region Functions

    private getData(): string[][] {
        // get default summary
        let summary = this.getDefaultData();
        // process summary
        let summaryData = this.pageData.summary;

        // details
        let tPaperNew, tPaperOld, tCartonNew, tCartonOld, tCommercialNew, tCommercialOld, tGoal;
        for (let i = 0; i < 12; i++) {
            // new revenues
            let tNew;
            let cartonNew = summaryData.cartonNew[i];
            let paperNew = summaryData.paperNew[i];
            let commercialNew = summaryData.commercialNew[i];
            // 段ボール
            if (cartonNew != undefined) {
                summary[1][i + 2] = this.formatNewAmount(SFN0402Helper.convertYenToThousanYen(cartonNew));
                tNew = cartonNew;
                tCartonNew = (tCartonNew == undefined) ? cartonNew : tCartonNew + cartonNew;
            }
            // 紙器
            if (paperNew != undefined) {
                summary[3][i + 2] = this.formatNewAmount(SFN0402Helper.convertYenToThousanYen(paperNew));
                tNew = (tNew == undefined) ? paperNew : tNew + paperNew;
                tPaperNew = (tPaperNew == undefined) ? paperNew : tPaperNew + paperNew;
            }
            // 商事
            if (commercialNew != undefined) {
                summary[5][i + 2] = this.formatNewAmount(SFN0402Helper.convertYenToThousanYen(commercialNew));
                tNew = (tNew == undefined) ? commercialNew : tNew + commercialNew;
                tCommercialNew = (tCommercialNew == undefined) ? commercialNew : tCommercialNew + commercialNew;
            }

            // 合計
            if (tNew != undefined) {
                summary[7][i + 2] = this.formatNewAmount(SFN0402Helper.convertYenToThousanYen(tNew));
            }

            // old revenues
            let tOld;
            let cartonOld = summaryData.cartonOld[i];
            let paperOld = summaryData.paperOld[i];
            let commercialOld = summaryData.commercialOld[i];
            // 段ボール
            if (cartonOld != undefined) {
                summary[2][i + 2] = this.formatOldAmount(SFN0402Helper.convertYenToThousanYen(cartonOld));
                tOld = cartonOld;
                tCartonOld = (tCartonOld == undefined) ? cartonOld : tCartonOld + cartonOld;
            }
            // 紙器
            if (paperOld != undefined) {
                summary[4][i + 2] = this.formatOldAmount(SFN0402Helper.convertYenToThousanYen(paperOld));
                tOld = (tOld == undefined) ? paperOld : tOld + paperOld;
                tPaperOld = (tPaperOld == undefined) ? paperOld : tPaperOld + paperOld;
            }
            // 商事
            if (commercialOld != undefined) {
                summary[6][i + 2] = this.formatOldAmount(SFN0402Helper.convertYenToThousanYen(commercialOld));
                tOld = (tOld == undefined) ? commercialOld : tOld + commercialOld;
                tCommercialOld = (tCommercialOld == undefined) ? commercialOld : tCommercialOld + commercialOld;
            }
            // 合計
            if (tOld != undefined) {
                summary[8][i + 2] = this.formatOldAmount(SFN0402Helper.convertYenToThousanYen(tOld));
            }

            // 前年比
            if (tNew > 0 && tOld > 0) {
                summary[9][i + 2] = this.formatPercentage(tNew / tOld);
            }

            // 目標
            let goal = summaryData.goal[i];
            if (goal != undefined) {
                summary[10][i + 2] = this.formatNewAmount(goal);
                tGoal = (tGoal == undefined) ? goal : tGoal + goal;
            }

            // 目標比
            if (tNew > 0 && goal > 0) {
                summary[11][i + 2] = this.formatPercentage(SFN0402Helper.convertYenToThousanYen(tNew) / goal);
            }
        }

        // total New
        let tTotalNew;
        // 段ボール
        if (tCartonNew != undefined) {
            summary[1][1] = this.formatNewAmount(SFN0402Helper.convertYenToThousanYen(tCartonNew));
            tTotalNew = tCartonNew;
        }
        // 紙器
        if (tPaperNew != undefined) {
            summary[3][1] = this.formatNewAmount(SFN0402Helper.convertYenToThousanYen(tPaperNew));
            tTotalNew = (tTotalNew == undefined) ? tPaperNew : tTotalNew + tPaperNew;
        }
        // 商事
        if (tCommercialNew != undefined) {
            summary[5][1] = this.formatNewAmount(SFN0402Helper.convertYenToThousanYen(tCommercialNew));
            tTotalNew = (tTotalNew == undefined) ? tCommercialNew : tTotalNew + tCommercialNew;
        }
        // 合計
        if (tTotalNew != undefined) {
            summary[7][1] = this.formatNewAmount(SFN0402Helper.convertYenToThousanYen(tTotalNew));
        }

        // total Old
        let tTotalOld;
        // 段ボール
        if (tCartonOld != undefined) {
            summary[2][1] = this.formatOldAmount(SFN0402Helper.convertYenToThousanYen(tCartonOld));
            tTotalOld = tCartonOld;
        }
        // 紙器
        if (tPaperOld != undefined) {
            summary[4][1] = this.formatOldAmount(SFN0402Helper.convertYenToThousanYen(tPaperOld));
            tTotalOld = (tTotalOld == undefined) ? tPaperOld : tTotalOld + tPaperOld;
        }
        // 商事
        if (tCommercialOld != undefined) {
            summary[6][1] = this.formatOldAmount(SFN0402Helper.convertYenToThousanYen(tCommercialOld));
            tTotalOld = (tTotalOld == undefined) ? tCommercialOld : tTotalOld + tCommercialOld;
        }
        // 合計
        if (tTotalOld != undefined) {
            summary[8][1] = this.formatOldAmount(SFN0402Helper.convertYenToThousanYen(tTotalOld));
        }

        // 前年比
        if (tTotalNew > 0 && tTotalOld > 0) {
            summary[9][1] = this.formatPercentage(tTotalNew / tTotalOld);
        }

        // 目標
        if (tGoal != undefined) {
            summary[10][1] = this.formatNewAmount(tGoal);
        }

        // 目標比
        if (tTotalNew > 0 && tGoal > 0) {
            summary[11][1] = this.formatPercentage(SFN0402Helper.convertYenToThousanYen(tTotalNew) / tGoal);
        }

        return summary;
    }

    private getDefaultData(): string[][] {
        let table = [];

        table.push(["分類", "通年", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3"]);
        table.push(["段ボール", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["紙器", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["商事", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["合計", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["前年比", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["目標", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["目標比", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);

        return table;
    }

    private formatNewAmount(value: number): string {
        return numbro(value).format("0,0");
    }

    private formatOldAmount(value: number): string {
        return "(" + numbro(value).format("0,0") + ")";
    }

    private formatPercentage(value: number): string {
        return numbro(value).format("0,0.0%");
    }

    //endregion
}