import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HeaderProvider} from "../SF00100/Header.provider";
import {SF00202Data} from "./SF00202.data";
import {SF00202_Deal} from "./model/SF00202_Deal.model";
import Message, {MSG} from "../../../helper/message";
import {CommonPage} from "../COMMON/common.page";
import {SF00202Service} from "./SF00202.service";
import {SF00202RuleFilter} from "./model/SF00202.filter";

declare let App: any;
const SF00202_PAGE_TITLE: string = "新規案件追加";

/**
 * 案件検索(受注後)
 */
@Component({
    templateUrl: "./SF00202.page.html"
})
export class SF00202Page extends CommonPage{
    constructor(route: ActivatedRoute, router: Router, headerProvider: HeaderProvider,
                private sf00202Service: SF00202Service) {
        super(router, route, headerProvider);
        this.sf00202Service.navigateTo("案件検索(受注後)", router.url);
    }

    protected pageTile(): string {
        return SF00202_PAGE_TITLE;
    }

    get pageData(): SF00202Data {
        return this.sf00202Service.pageData;
    }


    copyDeal(deal: SF00202_Deal): void {
        this.router.navigate(['home/deal/create'], {queryParams: {from: deal.dealCode}}).then(() => {
        });
    }

    viewDealDetail(deal: SF00202_Deal): void {
        if(deal.isOpeningNewTab) {
            window.open('home/deal/' + deal.dealCode, '_blank');
        } else {
            this.router.navigate(['home/deal', deal.dealCode]).then(() => {
            });
        }
    }

    // 使われない機能のため使用禁止 (trello: 1099)
    bookmarkDeal(deal: SF00202_Deal): void {
        this.sf00202Service.bookmarkDeal(deal)
            .then(() => {
                $.notify({message: Message.get(MSG.SF00202.INF001)}, {type: 'success'});
            });
    }

    onPageChanged(pageIndex?: number): void {
        App.loader('show');
        this.sf00202Service
            .getResult(pageIndex)
            .then(() => this.$scrollTop("#dealsList"))
            .then(() => App.loader('hide'));
    }

    setAdvancedSearchOnAndStartSearch(ruleFilter: SF00202RuleFilter) {
        this.pageData.advancedSearchFlg = true;
        this.pageData.ruleFilter = ruleFilter;
        App.loader('show');
        this.sf00202Service.getResult().then(() => App.loader('hide'));
    }

    onKeywordsChange(tags: string[]) {
        this.sf00202Service.pageData.keywords = tags;
        this.onPageChanged();
    }



}
