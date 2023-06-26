import {Component} from "@angular/core";
import {HeaderProvider} from "../SF00100/Header.provider";
import {Router, ActivatedRoute} from "@angular/router";
import {CommonPage} from "../COMMON/common.page";

const SF00200_PAGE_TITLE: string = "新規案件追加";

@Component({
    templateUrl: "./SF00200.page.html"
})
export class SF00200Page extends CommonPage {
    constructor(router: Router, route: ActivatedRoute, headerProvider: HeaderProvider) {
        super(router, route, headerProvider);
    }

    protected pageTile(): string {
        return SF00200_PAGE_TITLE;
    }

    createDeal() {
        this.navigate('home/deal/create');
    }
}
