import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonPage} from "../COMMON/common.page";
import {SF00100Page} from "./SF00100.page";

// use OneUI
declare let OneUI: OneUI;

@Component({
    selector: "sidebar-menu",
    templateUrl: "./SF09100.page.html"
})
export class SF09100Page extends CommonPage {
    constructor(router: Router, route: ActivatedRoute, private sf00100page: SF00100Page) {
        super(router, route);
    }

    navigate(url: string, isNotADashboard: boolean) {
        this.sf00100page.isShowSideMenu = false;
        OneUI.layout("sidebar_mini_off");

        return super.navigate(url);
    }
}