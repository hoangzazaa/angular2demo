import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonPage} from "../COMMON/common.page";
import {HeaderProvider} from "../SF00100/Header.provider";
import {Constants} from "../../../helper/constants";
import {SF00307Service} from "./SF00307.service";
import {SF00307Data} from "./SF00307.data";
import {ProductInfoModel} from "../COMMON/productinfo/model/ProductInfo.model";
import {ShippingDestinationModel} from "./model/ShippingDestination.model";
import {ProductBoxModel} from "./model/ProductBox.model";
import Messages, {MSG} from "../../../helper/message";
import {DEAL_STATUS_VALUES} from "../../../helper/mst-data-type";

const SF00307_PAGE_TITLE: string = "受注登録（製造・出荷指示）";
declare let $: JQueryStatic;
declare let App: any;

@Component({
    templateUrl: 'SF00307.page.html'
})

export class SF00307Page extends CommonPage {

    /**
     * Constructor page
     * @param router
     * @param route
     * @param pageService
     * @param headerProvider
     * @param location
     */
    constructor(router: Router, route: ActivatedRoute,
                private pageService: SF00307Service,
                headerProvider: HeaderProvider) {
        super(router, route, headerProvider);
    }

    // init breadcrumb
    protected initBreadcrumb(): void {
        let self       = this;
        let sf0301Path = "/home/deal/" + self.route.snapshot.params["dealCode"];

        self.headerProvider.reset();
        self.headerProvider.pageName = SF00307_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(Constants.TOP, [Constants.SLASH]); //Dashboard
        self.headerProvider.addBreadCrumb(Constants.DEAL_OVERVIEW_BREADCRUMB, [sf0301Path]); //SF003-01
        self.headerProvider.addBreadCrumb('受注登録');
    }

    get pageData(): SF00307Data {
        return this.pageService.pageData;
    }

    viewProductInfo(product: ProductInfoModel): void {
        if (product.productType == 0 && product.shapeId == 98) {
            this.router.navigate(["/home/deal", this.pageData.dealInfo.dealCode, 'product', product.productCode, 'decorative']);
        } else if (product.productType == 1) {
            this.router.navigate(["/home/deal", this.pageData.dealInfo.dealCode, 'product', product.productCode, 'carton']);
        } else {
            this.router.navigate(["/home/deal", this.pageData.dealInfo.dealCode, 'product', product.productCode]);
        }
    }

    viewQuotationInfo(quotationCode: string) {
        this.router
            .navigate([`/home/deal/${this.pageData.dealInfo.dealCode}/quotation/${quotationCode}`])
            .then(null);
    }

    findDataProductInfo(quotationId: number) {
        // get list product by quotationId
        // cal service api update list productBoxs
        this.pageService.findProductList(quotationId, this.pageData.dealInfo.dealId).catch(err => {
            this.navigate('home/deal');
        });
    }

    exportPdf(productId: number, dealCode: string): void {
        let self = this;
        this.pageService.exportProduction(productId, dealCode)
            .then(result => {
                $.notify({message: Messages.get(MSG.SF00307.INF002)}, {type: 'success'});
                let link = document.createElement('a');
                link.setAttribute('download', result.fileName);
                link.href = result.filePath;
                link.click();
            })
            .catch(err => {
                swal(Constants.BLANK, Messages.get(MSG.SF00307.ERR004), "error")
            });
    }

    selectShippingDestination(target: ShippingDestinationModel) {
        this.pageService.selectShippingDestination(target);
    }

    setShiptimeForAllShippingInstructions(val: number) {
        this.pageService.setShiptimeForAllShippingInstructions(val);
    }

    requestOrder(): void {
        let self = this;

        let urlStatus = "";
        if (this.pageData.dealInfo.dealStatus == DEAL_STATUS_VALUES.ORDER_CONFIRMED) {
            urlStatus = "repeat-order";
        } else {
            urlStatus = "create-order";
        }

        // check customer in deal not null
        if (!this.pageData.dealInfo.customerCode) {
            let msgCode = "Customer is not selected yet";
            swal(Constants.BLANK, Messages.get(msgCode), "error");
            return;
        }

        // check delivery date
        if (!this.pageData.dealInfo.deliveryDate) {
            let msgCode = "Delivery date is not undefined";
            swal(Constants.BLANK, Messages.get(msgCode), "error");
            return;
        }
        App.loader("show");
        this.pageService.requestOrder().then(() => {
            App.loader("hide");
            let message = Messages.get(MSG.SF00307.INF003);
            swal({
                title             : Constants.BLANK,
                text              : message,
                confirmButtonColor: '#66ccff',
                confirmButtonText : "閉じる",
            }, () => {
                self.router
                    .navigate(["home/deal", self.pageData.fallbackDeal, urlStatus])
                    .then(() => {
                        self.pageService
                            .initData(self.pageData.dealInfo.dealCode)
                            .then(() => {
                                self.initBreadcrumb();
                                $(window).scrollTop(0);
                            });
                    });
            });

        }).catch(err => {
            let msgCode = err.code == "SF00307_ERR001" ? MSG.SF00307.ERR002 : MSG.SF00307.ERR003;
            swal(Constants.BLANK, Messages.get(msgCode), "error");
        });
    }

    backToSF00301() {
        this.router.navigate(["home/deal", this.pageData.dealInfo.dealCode]).then(null);
    }

    productBoxCheckChanged($event: any, productBox: ProductBoxModel) {
        if (!!$event.target.checked)
            if (!productBox.product.unitPrice) {
                swal(Constants.BLANK, Messages.get(MSG.SF00307.ERR001), "warning");
                $event.target.checked = false;
                return;
            } else {
                this.pageService.addProductShippingInstruction(productBox);
            }
        else {
            this.pageService.removeProductShippingInstruction(productBox);
        }
    }

}
