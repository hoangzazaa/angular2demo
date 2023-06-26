import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Constants} from "../../../helper/constants";
import Message, {MSG} from "../../../helper/message";
import {CC00100Service} from "../../CC/CC00100/CC00100.service";
import {CommonPage} from "../COMMON/common.page";
import {HeaderProvider} from "../SF00100/Header.provider";
import {SF00205Deal} from "./model/SF00205_Deal.model";
import {SF00205Filter} from "./model/SF00205_Filter.model";
import {SF00205Request} from "./model/SF00205_Request.model";
import {SF00205Data} from "./SF00205.data";
import {SF00205Service} from "./SF00205.service";

/**
 * Created by manhnv on 6/14/2017.
 */

declare let $: JQueryStatic | any;
const SF00205_PAGE_TITLE: string = "案件検索（仕掛中）";

@Component({
   templateUrl: "SF00205.page.html"
})
export class SF00205Page extends CommonPage implements OnInit {
    constructor(router: Router, route: ActivatedRoute, headerProvider: HeaderProvider,
                private authService: CC00100Service, private service: SF00205Service) {
        super(router, route, headerProvider);
    }

    protected pageTile(): string {
        return SF00205_PAGE_TITLE;
    }

    ngOnInit(): void {
        this.service.navigateTo("案件検索（仕掛中）", this.router.url);
        let departmentId = this.authService.user.departmentId;
        let picId = this.authService.user.id;

        // get department
        let department = this.pageData.departments.find(department => {
            return department.id == departmentId;
        });

        if (!!department) {
            // list pics by departments
            this.pageData.pics = department.users;
        } else {
            departmentId = 0;
            picId = 0;
        }

        // store default value of department id & pic id
        this.pageData.defaultDepartmentId = departmentId;
        this.pageData.defaultPicId = picId;

        // init filter
        this.pageData.requestModel.filter.selectedDepartmentId = departmentId;
        this.pageData.requestModel.filter.selectedPicId = picId;
    }

    get pageData(): SF00205Data {
        return this.service.pageData;
    }

    get deals(): SF00205Deal[] {
        return this.pageData.deals;
    }

    searchDeal(filter: SF00205Filter): void {
        this.pageData.isDisable = true;
        let req = new SF00205Request();
        req.filter = filter;

        this.service.getDeals(req).then(() => this.pageData.isDisable = false).catch(err => {
            console.log('SF00205Page#searchDeal -> ' + err.statusText)
        });
    }

    viewDealDetail(deal: SF00205Deal): void {
        if(deal.isOpeningNewTab) {
            window.open('home/deal/' + deal.dealCode, '_blank');
        } else {
            this.navigate('/home/deal/' + deal.dealCode);
        }
    }

    bookmarkDeal(deal: SF00205Deal): void {
        this.service.bookmarkDeal(deal).then(() => {
            $.notify({message: Message.get(MSG.SF00205.INF001)}, {type: 'success'});
        });
    }

    copyDeal(deal: SF00205Deal): void {
        this.navigate('home/deal/create', {queryParams: {from: deal.dealCode}});
    }

    get pageSize(): number {
        return this.pageData.pageSize;
    }

    get totalRecords(): number {
        return this.pageData.totalRecords;
    }

    onPageChange(currentPage: number): void {
        let offset = ((currentPage || Constants.FIRST_PAGE) - 1) * this.pageData.pageSize;
        let limit = this.pageData.pageSize;

        let req = this.pageData.requestModel;
        req.indexFrom = offset;
        req.indexTo = limit;

        this.service.getDeals(req).then(() => this.$scrollTop("#dealInfo")).catch(err => console.log(err.statusText));
    }

}