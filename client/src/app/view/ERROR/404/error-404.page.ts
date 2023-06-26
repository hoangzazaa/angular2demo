import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ScreenUrl} from "../../../helper/screen-url";
import {CommonPage} from "../../SF/COMMON/common.page";

@Component({
    templateUrl: "./error-404.page.html"
})
/**
 * Http error 404 (not found). A 404 error happens when you try to access a resource on a web server (usually a web page)
 * that doesn’t exist. Some reasons for this happening can for example be a broken link, a mistyped URL,
 * or that the webmaster has moved the requested page somewhere else (or deleted it).
 * @author manhnv
 */
export class Error404Page extends CommonPage {
    constructor(router: Router, route: ActivatedRoute) {
        super(router, route);
    }

    back() {
        /*Back to Dashboard screen*/
        this.navigate(ScreenUrl.SF001);
    }
}