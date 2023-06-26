import {Component} from "@angular/core";
import {HeaderProvider} from "../SF00100/Header.provider";
import {Router, ActivatedRoute} from "@angular/router";
import {CommonPage} from "../COMMON/common.page";

@Component({
    templateUrl: "SF00505.page.html"
})
export class SF00505Page extends CommonPage {
    constructor(router: Router, route: ActivatedRoute, headerProvider: HeaderProvider) {
        super(router, route, headerProvider);
    }

    protected initBreadcrumb(): void {
        let self = this;
        self.headerProvider.reset();
        self.headerProvider.pageName = "白地案件登録"; //Add Prospect Deal
    }

}