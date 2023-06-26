import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ScreenUrl} from "../../../helper/screen-url";
import {CommonPage} from "../../SF/COMMON/common.page";

@Component({
    templateUrl: "error-403.page.html"
})
/**
 * Http error 403 (forbidden). A 403 error happens if you try to access a (forbidden) directory on a website.
 * @author manhnv
 */
export class Error403Page extends CommonPage {
    constructor(router: Router, route: ActivatedRoute) {
        super(router, route);
    }

    back() {
        /*Back to Dashboard screen*/
        this.navigate(ScreenUrl.SF001);
    }
}