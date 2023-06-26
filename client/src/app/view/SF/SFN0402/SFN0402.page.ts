import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {HeaderProvider} from "../SF00100/Header.provider";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonPage} from "../COMMON/common.page";
import {CC00100Service} from "../../CC/CC00100/CC00100.service";
import {ScreenUrl} from "../../../helper/screen-url";
import {SFN0402Service} from "./SFN0402.service";
import {SFN0402Data} from "./SFN0402.data";
import {ProductModel} from "./model/SFN0402_Product.model";
import {SFN0402Constants} from "./SFN0402.constants";
import {Constants} from "../../../helper/constants";
import {MSG} from "../../../helper/message";
import {SFN040206Component} from "./component/SFN040206.MailModal.component";
import {PathUtil} from "../../../util/path-util";
import { ShippingDestinationModel } from '../SFN0307/model/ShippingDestination.model';
import { ShippingDestination } from '../../../model/core/ShippingDestination.model';

// use OneUI
declare let OneUI: OneUI;

/**
 * 取引先照会画面
 */
@Component({
    templateUrl: "SFN0402.page.html",
    styleUrls: ["SFN0402.page.css"],
    providers: [SFN0402Service],
    encapsulation: ViewEncapsulation.None
})
export class SFN0402Page extends CommonPage implements OnInit {

    // pageData
    pageData: SFN0402Data;
    // component
    /** 売上実績セクションを表示するかどうか true: 表示する, false: 表示しない */
    showSP: boolean;
    /** 取引実績セクションを表示するかどうか true: 表示する, false: 表示しない */
    showRPC: boolean;
    /** 在庫状況セクションを表示するかどうか true: 表示する, false: 表示しない */
    showSPC: boolean;
    /** 製品一覧セクションを表示するかどうか true: 表示する, false: 表示しない */
    showPPC: boolean;
    /** 届け先一覧セクションを表示するかどうか true: 表示する, false: 表示しない */
    showSDL: boolean;
    @ViewChild(SFN040206Component) sfn040206: SFN040206Component;

    /** 届け先一覧 */
    shippingDestinationList: ShippingDestination[];

    //region Initialize page
    constructor(public router: Router, public route: ActivatedRoute, public headerProvider: HeaderProvider,
                private service: SFN0402Service, authService: CC00100Service) {
        super(router, route, headerProvider);

        // init page data
        this.pageData = new SFN0402Data();
        service.pageData = this.pageData;

        this.showSP = false;
        this.showRPC = false;
        this.showSPC = false;
        this.showPPC = false;
        this.showSDL = false;
    }

    // init breadcrumb
    protected initBreadcrumb(): void {
        let self = this;

        let sfn0401Path = ScreenUrl.SFN0401;

        self.headerProvider.reset();
        self.headerProvider.pageName = "取引先照会";
        self.headerProvider.addBreadCrumb(Constants.TOP, [Constants.SLASH]); //Dashboard
        self.headerProvider.addBreadCrumb("取引先検索", [sfn0401Path]); //SF003-01
        self.headerProvider.addBreadCrumb("取引先照会");
    }

    // get data on page load
    ngOnInit(): void {

        this.service.navigateTo("取引先照会", this.router.url);

        // check screen mode
        let customerCode = this.route.snapshot.params["customerCode"];
        let supplierCode = this.route.snapshot.params["supplierCode"];
        if (customerCode != undefined) {
            this.pageData.partnerType = SFN0402Constants.TYPE_CUSTOMER;
            this.pageData.partnerCode = customerCode;
        } else if (supplierCode != undefined) {
            this.pageData.partnerType = SFN0402Constants.TYPE_SUPPLIER;
            this.pageData.partnerCode = supplierCode;
        }

        // get basic info
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        let notify = $.notify({
            message: MSG.SFN0402.INF001
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        this.service.sfn040201().then(() => {
            // 届け先一覧を取得する (得意先の場合のみ)
            if (this.pageData.partnerType == SFN0402Constants.TYPE_CUSTOMER) {
                return this.service.sfn040213GetShippingDestinationList(this.pageData.partner.code)
                    .then(shippingDestinationList => {
                        this.shippingDestinationList = shippingDestinationList;
                    });
            }
        })
        .then(() => {
            this.notifyDone(notify);

            // show revenue panel
            this.showRPC = true;
            // show other panels
            if (this.pageData.partnerType == SFN0402Constants.TYPE_CUSTOMER) {
                this.showSP = true;
                this.showSPC = true;
                this.showPPC = true;
                this.showSDL = true;
            }
        })
        .catch((err) => {
            this.notifyDone(notify);
            swal({
                    title: "",
                    text: MSG.SFN0402.ERR001,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d26a5c",
                    confirmButtonText: "Yes",
                    closeOnConfirm: true
                },
                res => this.goBack()
            );
        });
    }

    //endregion

    //region Bindings

    get isCustomer() {
        return (this.pageData.partnerType == SFN0402Constants.TYPE_CUSTOMER);
    }

    //endregion

    //region Actions

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
        this.navigate(ScreenUrl.SFN0401);
    }

    saveMemo(): Promise<void> {
        // notify loading
        let notify = $.notify({
            message: MSG.SFN0402.INF002
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        return this.service.sfn040206().then(() => {
            this.notifyDone(notify);
        });
    }

    loadSalesPerformance(): Promise<void> {
        return this.service.sfn040202();
    }

    loadRevenuePanel(): Promise<void> {
        if (this.pageData.partnerType == SFN0402Constants.TYPE_CUSTOMER) {
            return this.service.sfn040203();
        } else if (this.pageData.partnerType == SFN0402Constants.TYPE_SUPPLIER) {
            return this.service.sfn040212();
        }
    }

    loadStockPanel(): Promise<void> {
        return this.service.sfn040204();
    }

    loadProductPanel(): Promise<void> {
        return this.service.sfn040205();
    }

    showMail(type: number) {
        this.sfn040206.show(type);
    }

    sendMail(type: number): Promise<void> {
        let service = Promise.resolve();
        if (type == SFN0402Constants.MAIL_PRODUCT_DISPOSAL) {
            service = this.service.sfn040207();
        } else if (type == SFN0402Constants.MAIL_WOODEN_RETURN) {
            service = this.service.sfn040209();
        } else if (type == SFN0402Constants.MAIL_WOODEN_PENDING) {
            service = this.service.sfn040210();
        }

        service = service.then(() => {
            swal({
                title: Constants.BLANK,
                text: MSG.SFN0402.INF003,
                confirmButtonColor: '#66ccff',
                confirmButtonText: "閉じる",
            });
        }, err => {
            swal({
                title: Constants.BLANK,
                text: MSG.SFN0402.ERR002,
                type: "error",
            });
        });

        return service;
    }

    repeatOrder() {
        let product = this.pageData.selectedProduct;
        this.navigate2(["home", "deal", product.dealCode, "repeat-order"]);
    }

    shippingStock() {
        let inventory = this.pageData.selectedInventory;
        let product = inventory.product;
        this.navigate2(["home", "deal", product.dealCode, "order"], {
            queryParams: {
                "product": product.code,
                "stock": product.quantity
            }
        });
    }

    exportStocks(): Promise<void> {
        return this.service.sfn040208()
            .then(result => {
                $.notify({message: MSG.SFN0402.INF004}, {type: 'success'});
                let link = document.createElement('a');
                link.setAttribute('download', result.fileName);
                link.href = result.filePath;
                link.click();
            })
            .catch(err => {
                swal(Constants.BLANK, MSG.SFN0402.ERR003, "error")
            });
    }

    exportProducts(): Promise<void> {
        return this.service.sfn040211()
            .then(result => {
                $.notify({message: MSG.SFN0402.INF004}, {type: 'success'});
                let link = document.createElement('a');
                link.setAttribute('download', result.fileName);
                link.href = result.filePath;
                link.click();
            })
            .catch(err => {
                swal(Constants.BLANK, MSG.SFN0402.ERR003, "error")
            });
    }


    /**
     * 届け先編集画面へ遷移
     *
     * @param customerCode 得意先 ID
     * @param shippingDestinationId 届け先 ID
     */
    showShippingDestination(customerCode: string, shippingDestinationId: number) {
        this.router.navigate([ScreenUrl.SFN0402, customerCode, 'shipping-destination', shippingDestinationId]);
    }

    //endregion

    //region functions

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