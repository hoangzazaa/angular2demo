import {Component} from "@angular/core";
import {HeaderProvider} from "../SF00100/Header.provider";
import {Router, ActivatedRoute} from "@angular/router";
import {CommonPage} from "../COMMON/common.page";

@Component({
    templateUrl: "SF00600.page.html"
})
export class SF00600Page extends CommonPage {
    constructor(router: Router, route: ActivatedRoute, headerProvider: HeaderProvider) {
        super(router, route, headerProvider);
    }

    protected initBreadcrumb(): void {
        let self = this;
        self.headerProvider.reset();
        self.headerProvider.pageName = "マイボックス"; //Mybox
    }

}