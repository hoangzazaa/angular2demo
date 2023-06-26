import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ScreenUrl} from "../../../helper/screen-url";
import {CommonPage} from "../../SF/COMMON/common.page";

@Component({
    templateUrl: "error-500.page.html"
})
/**
 * Http error 500 (internal server error). A 500 error happens when a web server encounters some form of internal error.
 * @author manhnv
 */
export class Error500Page extends CommonPage {
    constructor(router: Router, route: ActivatedRoute) {
        super(router, route);
    }

    back() {
        /*Back to Dashboard screen*/
        this.navigate(ScreenUrl.SF001);
    }
}