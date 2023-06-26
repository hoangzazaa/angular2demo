import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ScreenUrl} from "../../../helper/screen-url";
import {CommonPage} from "../../SF/COMMON/common.page";

@Component({
    templateUrl: "error-401.page.html"
})
/**
 * http error 401 (unauthorized). A 401 error happens when a website visitor tries to access a restricted
 * web page but isn’t authorized to do so, usually because of a failed login attempt.
 * @author manhnv
 */
export class Error401Page extends CommonPage {
    constructor(router: Router, route: ActivatedRoute) {
        super(router, route);
    }

    back() {
        /*Back to Dashboard screen*/
        this.navigate(ScreenUrl.SF001);
    }
}