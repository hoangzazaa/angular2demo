import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ScreenUrl} from "../../../helper/screen-url";
import {CommonPage} from "../../SF/COMMON/common.page";

@Component({
    templateUrl: "error-400.page.html"
})
/**
 * Http error 400 (bad request). A 400 error happens when the web server telling you that the application you are using
 * (e.g. your web browser) accessed it incorrectly or that the request was somehow corrupted on the way.
 * @author manhnv
 */
export class Error400Page extends CommonPage {
    constructor(router: Router, route: ActivatedRoute) {
        super(router, route);
    }

    back() {
        /*Back to Dashboard screen*/
        this.navigate(ScreenUrl.SF001);
    }
}