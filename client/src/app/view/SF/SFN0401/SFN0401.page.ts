import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {HeaderProvider} from "../SF00100/Header.provider";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonPage} from "../COMMON/common.page";
import {MSG} from "../../../helper/message";
import {CC00100Service} from "../../CC/CC00100/CC00100.service";
import {ScreenUrl} from "../../../helper/screen-url";
import {SFN0401Service} from "./SFN0401.service";
import {SFN0401Data} from "./SFN0401.data";
import {ProductModel} from "./model/SFN0401_Product.model";
import {PartnerModel} from "./model/SFN0401_Partner.model";
import {SFN0401Constants} from "./SFN0401.constants";
import {PathUtil} from "../../../util/path-util";

// use OneUI
declare let OneUI: OneUI;

@Component({
    templateUrl: "SFN0401.page.html",
    styleUrls: ["SFN0401.page.css"],
    providers: [SFN0401Service],
    encapsulation: ViewEncapsulation.None
})
export class SFN0401Page extends CommonPage implements OnInit {

    // pageData
    pageData: SFN0401Data;

    //region Initialize page
    constructor(public router: Router, public route: ActivatedRoute, public headerProvider: HeaderProvider,
                private service: SFN0401Service, authService: CC00100Service) {
        super(router, route, headerProvider);

        // init page data
        this.pageData = new SFN0401Data();
        service.pageData = this.pageData;
    }

    protected pageTile(): string {
        return "取引先検索";
    }

    //endregion

    // get data on page load
    ngOnInit(): void {

        this.service.navigateTo("取引先検索", this.router.url);

        // check screen mode
        this.pageData.dealCode = this.route.snapshot.params["dealCode"];
        this.pageData.productCode = this.route.snapshot.params["productCode"];
        if (this.pageData.productCode != undefined) {
            this.pageData.screenMode = SFN0401Constants.MODE_SUPPLIER;
        } else if (this.pageData.dealCode != undefined) {
            this.pageData.screenMode = SFN0401Constants.MODE_CUSTOMER;
        } else {
            this.pageData.screenMode = SFN0401Constants.MODE_REPEAT;
        }
    }

    //region bindings

    get hits(): number {
        return this.pageData.hits;
    }

    get page(): number {
        return this.pageData.currentFilter.page;
    }

    set page(value: number) {
        // set page
        this.pageData.currentFilter.page = value;
        // apply filter
        this.doFilter();
    }

    get partners(): PartnerModel[] {
        return this.pageData.partnerList;
    }

    //endregion

    //region Actions

    navigateToPartner(partner: PartnerModel) {
        let partnerCode = partner.code;
        if (partner.type == SFN0401Constants.PTYPE_CUSTOMER) {
            this.navigate2(["home", "customer", partnerCode]);
        } else if (partner.type == SFN0401Constants.PTYPE_SUPPLIER) {
            this.navigate2(["home", "supplier", partnerCode]);
        }
    }

    navigateToDeal(dealCode: string) {
        this.navigate2(['home/deal', dealCode]);
    }

    navigateToProduct(product: ProductModel) {
        let productType = product.type;
        let shapeId = product.shapeId;
        let productCode = product.code;
        let dealCode = product.dealCode;
        let cartonShippingType = product.cartonShippingType;

        PathUtil.redirectToPageProduct(this.router,dealCode,productCode,productType,shapeId,cartonShippingType);
    }

    goBack() {
        let mode = this.pageData.screenMode;
        if (mode == SFN0401Constants.MODE_REPEAT) {
            this.navigate(ScreenUrl.SF001);
        } else if (mode == SFN0401Constants.MODE_CUSTOMER) {
            this.navigateToDeal(this.pageData.dealCode);
        } else if (mode == SFN0401Constants.MODE_SUPPLIER) {
            // TODO navigate to product
        }
    }

    doFilter(): Promise<void> {
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        let notify = $.notify({
            message: MSG.SFN0401.INF001
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        notify.update("progress", 10);

        let service = Promise.resolve();
        if (this.pageData.currentFilter.type == SFN0401Constants.PTYPE_CUSTOMER) {
            service = this.service.sfn040101();
        } else if (this.pageData.currentFilter.type == SFN0401Constants.PTYPE_SUPPLIER) {
            service = this.service.sfn040102();
        }

        return service.then(() => {
            // scroll top
            this.$scrollTop();
            // notify update and close
            this.notifyDone(notify);
        });
    }

    selectCustomer(): Promise<void> {
        this.pageData.canSelectPartner = false;

        $.notify({message: MSG.COM.INF999}, {delay: 1000});
        return Promise.resolve().then(() => {
            this.pageData.canSelectPartner = true;
        });
    }

    selectSupplier(): Promise<void> {
        this.pageData.canSelectPartner = false;

        $.notify({message: MSG.COM.INF999}, {delay: 1000});
        return Promise.resolve().then(() => {
            this.pageData.canSelectPartner = true;
        });
    }

    //endregion

    //region functions

    // set selected user

    private notifyDone(notify: NotifyReturn): void {
        // notify update and close
        notify.update("progress", 100);
        notify.update("type", "success");
        setTimeout((ntf: NotifyReturn) => {
            ntf.close();
        }, 1000, notify);
        // hide content loader
        OneUI.contentLoader('hide');
    }

    //endregion
}