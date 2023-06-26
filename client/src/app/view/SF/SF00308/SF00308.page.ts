import {Component, OnInit} from "@angular/core";
import {CommonPage} from "../COMMON/common.page";
import {ActivatedRoute, Router} from "@angular/router";
import {SF00308Service} from "./SF00308.service";
import {SF00308Data} from "./SF00308.data";
import {Constants} from "../../../helper/constants";
import MathUtil from "../../../util/math-util";
import {HeaderProvider} from "../SF00100/Header.provider";
import DataUtil from "../../../util/data-util";
import {DEAL_TYPE} from "../../../helper/mst-data-type";
/**
 * Created by hoangtd on 3/16/2017.
 */
const SF00308_PAGE_TITLE: string = '案件チェックシート';
@Component({
    templateUrl: 'SF00308.page.html',
    styleUrls: ['./SF00308.page.css']
})

export class SF00308Page extends CommonPage implements OnInit {

    constructor(router: Router, route: ActivatedRoute, public pageService: SF00308Service, headerProvider: HeaderProvider) {
        super(router, route, headerProvider);
    }

    get pageData(): SF00308Data {
        return this.pageService.pageData;
    }

    ngOnInit(): void {
        this.pageService.navigateTo("案件チェックシート", this.router.url);
    }

    protected initBreadcrumb(): void {
        let self = this;

        let sf0301Path = "/home/deal/" + self.route.snapshot.params["dealCode"]; //SF003-01
        self.headerProvider.reset();
        self.headerProvider.pageName = SF00308_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(Constants.TOP, [Constants.SLASH]);
        self.headerProvider.addBreadCrumb(Constants.DEAL_OVERVIEW_BREADCRUMB, [sf0301Path]);
        self.headerProvider.addBreadCrumb("案件チェックシート");
    }

    saveDataTab(tabNumber) {
        let answersTab = this.pageData.answersMap.filter(item => {
            return MathUtil.round(item.questionCode / 1000, 0) == tabNumber;
        })

        this.pageService.saveData(answersTab);
    }

    backToSF00301() {
        this.router.navigate(["home/deal", this.pageData.dealCode]);
    }

    get dealCode() {
        return this.pageData.dealCode;
    }

    get dealName() {
        return this.pageData.dealName;
    }

    get customerCode() {
        return this.pageData.customerId;
    }

    get customerName() {
        return this.pageData.customerName;
    }

    get deliveryDate() {
        return this.pageData.deliveryDate;
    }

    get estimateMoney() {
        return this.pageData.estMoney;
    }

    // sale name
    get saleAndDepartment() {
        if (this.pageData.saleName) {
            return this.pageData.saleName;
        }

        return Constants.BLANK;
    }

    get dealType() {
        return DataUtil.getData(DEAL_TYPE, Constants.BLANK, this.pageData.dealType);
    }
}