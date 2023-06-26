import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CC00100Service} from "../../CC/CC00100/CC00100.service";
import {CommonPage} from "../COMMON/common.page";

@Component({
    selector: "header-component",
    templateUrl: "./SF09000.page.html"
})
export class SF09000Page extends CommonPage {
    username: string;

    constructor(public authService: CC00100Service, router: Router, route: ActivatedRoute) {
        super(router, route);
        if (authService.user != undefined) {
            this.username = authService.user.username;
        }
    }

    logout() {
        if (!this.authService.logout()) {
            this.router.navigate(['login']);
        }
    }

}