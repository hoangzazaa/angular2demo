import {Component, OnInit} from "@angular/core";
import {SF00204Service} from "./SF00204.service";
import {CommonPage} from "../COMMON/common.page";
import {ActivatedRoute, Router} from "@angular/router";
import {HeaderProvider} from "../SF00100/Header.provider";
import {SF00204Data} from "./SF00204.data";
import {ProductInfoModel} from "../COMMON/productinfo/model/ProductInfo.model";
import {ProductBoxModel} from "../COMMON/productinfo/model/ProductBox.model";
import {Constants} from "../../../helper/constants";
import Messages, {MSG} from "../../../helper/message";
import {SF00204FilterModel} from "./model/SF00204Filter.model";
import {PathUtil} from "../../../util/path-util";
declare let App: any;
const SF00204_PAGE_TITLE: string = "製品検索";

@Component({
    templateUrl: 'SF00204.page.html'
})

export class SF00204Page extends CommonPage implements OnInit {
    ngOnInit(): void {
        // get dealCode
        this.pageData.dealCode = this.route.snapshot.params["dealCode"];

        this.pageService.navigateTo("製品検索", this.router.url);
    }

    constructor(route: ActivatedRoute, router: Router
        , private pageService: SF00204Service, headerProvider: HeaderProvider) {
        super(router, route, headerProvider);
    }

    get pageData(): SF00204Data {
        return this.pageService.pageData;
    }

    // init breadcrumb
    protected initBreadcrumb(): void {
        let self = this;

        let sf0301Path = "/home/deal/" + self.route.snapshot.params["dealCode"];

        self.headerProvider.reset();
        self.headerProvider.pageName = SF00204_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(Constants.TOP, [Constants.SLASH]); //Dashboard
        self.headerProvider.addBreadCrumb(Constants.DEAL_OVERVIEW_BREADCRUMB, [sf0301Path]); //SF003-01
        self.headerProvider.addBreadCrumb(SF00204_PAGE_TITLE);
    }

    //1. page change data
    onPageChanged(pageIndex?: number): void {
        App.loader('show');

        this.pageService
            .getResult(pageIndex)
            .then(() => this.$scrollTop("#productsList"))
            .then(() => App.loader('hide'))
            .catch(err => this.navigate("/home"));
    }

    //2. add product to deal
    addProductToDeal(productBox: ProductBoxModel): void {
        this.pageService.addProductToDeal(productBox.product.id, productBox.dealCode, this.pageData.dealCode).then(productCode => {
            $.notify({message: Messages.get(MSG.SF00204.INF001)}, {type: 'info'});
            // redirect to deal
            this.navigate(`/home/deal/${this.pageData.dealCode}`);
        }).catch(err => {
            $.notify({message: Messages.get(MSG.SF00204.ERR001)}, {type: 'danger'});
        });
    }

    viewProductInfo(product: ProductInfoModel, dealCode: string): void {
        PathUtil.redirectToPageProduct(this.router,dealCode,product.productCode,product.productType,product.shapeId,product.cartonShippingType);
    }

    // check add product to deal == true
    isAddProductToDeal(productBox: ProductBoxModel): boolean {
        return productBox.product.requestDesignFlag != 1;
    }

    setAdvancedSearchOnAndStartSearch(ruleFilter: SF00204FilterModel) {
        this.pageData.advancedSearchFlg = true;
        this.pageData.ruleFilter = ruleFilter;
        App.loader('show');
        this.pageService.getResult().then(() => App.loader('hide')).catch(err => {
            return this.navigate("/home");
        });
    }

    onKeywordsChange(tags: string[]) {
        this.pageService.pageData.keywords = tags;
        this.onPageChanged();
    }

    backToSF00301() {
        this.navigate(`/home/deal/${this.pageData.dealCode}`);
    }

}
