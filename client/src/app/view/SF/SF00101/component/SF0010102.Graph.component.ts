import {AfterViewInit, Component} from "@angular/core";
import {SF00101Data} from "../SF00101.data";
import {SF00101Page} from "../SF00101.page";
import {FormatUtil} from "../../../../util/format-util";

/**
 * Created by manhnv on 6/5/2017.
 */

declare var App: any;
declare var $: JQueryStatic | any;

@Component({
    selector   : 'sf0010102-graph',
    templateUrl: 'SF0010102.Graph.component.html'
})
export class SF0010102GraphComponent implements AfterViewInit {

    constructor(public page: SF00101Page) {
    }

    get pageData(): SF00101Data {
        return this.page.pageService.pageData;
    }

    ngAfterViewInit(): void {
        // init pie chart
        $('.js-pie-chart').easyPieChart({
            barColor: $(this).data('bar-color') ? $(this).data('bar-color') : '#777777',
            trackColor: $(this).data('track-color') ? $(this).data('track-color') : '#eeeeee',
            lineWidth: $(this).data('line-width') ? $(this).data('line-width') : 3,
            size: $(this).data('size') ? $(this).data('size') : '80',
            animate:
                {
                duration: 1000,
                enabled: false
            },
            scaleColor: $(this).data('scale-color') ? $(this).data('scale-color') : false
        });
    }


    getPercent(actual: number, total: number): any {
        return this.page.getPercent(actual, total);
    }

    get receipts_goal(): number {
        return FormatUtil.isNaN(this.pageData.receipts.goal);
    }

    get receipts_current(): number {
        return FormatUtil.isNaN(this.pageData.receipts.current);
    }

    get receipts(): number {
        return this.getPercent(this.pageData.receipts.current, this.pageData.receipts.goal);
    }

    get newReceipts_goal(): number {
        return FormatUtil.isNaN(this.pageData.newReceipts.goal);
    }

    get newReceipts_current(): number {
        return FormatUtil.isNaN(this.pageData.newReceipts.current);
    }

    get newReceipts(): number {
        return this.getPercent(this.pageData.newReceipts.current, this.pageData.newReceipts.goal);
    }

    get recordNew_current(): number {
        return FormatUtil.isNaN(this.pageData.recordNew.current);
    }

    get recordNew(): number {
        return this.getPercent(this.pageData.recordNew.current, this.pageData.recordNew.goal);
    }

    get digitalSale_current(): number {
        return FormatUtil.isNaN(this.pageData.digitalSale.current);
    }

    get digitalSale(): number {
        return this.getPercent(this.pageData.digitalSale.current, this.pageData.digitalSale.goal);
    }

    get recordNew_goal(): number {
        return FormatUtil.isNaN(this.pageData.recordNew.goal);
    }

    set recordNew_goal(value: number) {
        this.pageData.recordNew.goal = value;
        //update data
        $('#js-pie-chart3').data('easyPieChart').update(
            FormatUtil.isNaN(this.getPercent(this.pageData.recordNew.current, value))
        );
    }

    get digitalSale_goal(): number {
        return FormatUtil.isNaN(this.pageData.digitalSale.goal);
    }

    set digitalSale_goal(value: number) {
        this.pageData.digitalSale.goal = value;
        //update data
        $('#js-pie-chart4').data('easyPieChart').update(
            FormatUtil.isNaN(this.getPercent(this.pageData.digitalSale.current, value))
        );
    }

    saveDataInput() {
        this.page.saveDataInput();
    }

}