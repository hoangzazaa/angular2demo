import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {HeaderProvider} from "../SF00100/Header.provider";
import {CommonPage} from "../COMMON/common.page";
import {SF00203Service} from "./SF00203.service";
import {SF00203Data} from "./SF00203.data";
import {SF00203_Deal} from "./model/SF00203_Deal.model";

declare var App: any;
const SF00203_PAGE_TITLE: string = "新規案件追加";

@Component({
    templateUrl: "./SF00203.page.html"
})
export class SF00203Page extends CommonPage {
    constructor(router: Router, route: ActivatedRoute, headerProvider: HeaderProvider,
                private sf00203Service: SF00203Service) {
        super(router, route, headerProvider);
    }

    protected pageTile(): string {
        return SF00203_PAGE_TITLE;
    }

    get pageData(): SF00203Data {
        return this.sf00203Service.sf00203Data;
    }

    viewDealDetail(deal: SF00203_Deal): void {
        this.router.navigate(['home/deal', deal.dealCode]).then(() => {
        });
    }

    copyDeal(deal: SF00203_Deal): void {
        this.router.navigate(['home/deal/create'], {queryParams: {from: deal.dealCode}}).then(() => {
        });
    }

    getResult(pageIndex?: number): void {
        App.loader('show');
        this.sf00203Service
            .getResults(pageIndex)
            .then(() => this.$scrollTop("#myboxItems"))
            .then(() => App.loader('hide'));
    }
}
