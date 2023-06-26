import {Component, OnInit} from "@angular/core";
import {CommonPage} from "../COMMON/common.page";
import {ActivatedRoute, Router} from "@angular/router";
import {HeaderProvider} from "../SF00100/Header.provider";
import {Constants} from "../../../helper/constants";
import {SF00309Service} from "./SF00309.service";
import {SF00309Data} from "./SF00309.data";
import {MAIL_REQUEST_TYPE, PRODUCT_INFO_MAIL_TEMPLATE} from "./SF00309.MstData";
import Messages, {MSG} from "../../../helper/message";
import {ProductInfoModel} from "../COMMON/productinfo/model/ProductInfo.model";
import {ScreenUrl} from "../../../helper/screen-url";
import {SF00309Helper} from "./SF00309.helper";
import {UserModel} from "../COMMON/model/UserModel";
import {PathUtil} from "../../../util/path-util";
import {DealInfoModel} from "../COMMON/dealinfo/model/DealModel";
import {ProductBoxModel} from "../COMMON/productinfo/model/ProductBox.model";
import {FormatUtil} from "../../../util/format-util";

declare let $: any;
declare let App: any;

@Component({
    templateUrl: 'SF00309.page.html'
})

/**
 * Request create sample
 */
export class SF00309Page extends CommonPage implements OnInit {

    /**
     * Constructor page
     *
     * @param router
     * @param route
     * @param headerProvider
     * @param pageService
     */
    constructor(router: Router
        , route: ActivatedRoute
        , headerProvider: HeaderProvider,
                public pageService: SF00309Service) {
        super(router, route, headerProvider);
    }

    ngOnInit(): void {
        this.pageService.navigateTo(MAIL_REQUEST_TYPE[this.route.snapshot.params["requestType"]], this.router.url);
    }

    /**
     * Init Breadcrumb
     */
    protected initBreadcrumb(): void {
        let pageTitle = MAIL_REQUEST_TYPE[this.route.snapshot.params["requestType"]];
        let self = this;
        self.headerProvider.reset();
        self.headerProvider.pageName = pageTitle;
        self.headerProvider.addBreadCrumb(Constants.TOP, [Constants.SLASH]);
        self.headerProvider.addBreadCrumb(Constants.DEAL_OVERVIEW_BREADCRUMB, ["/home/deal/" + this.route.snapshot.params["dealCode"]]);
        self.headerProvider.addBreadCrumb(pageTitle);
    }

    /*get pageData*/
    get pageData(): SF00309Data {
        return this.pageService.pageData;
    }

    /**
     * Back and cancel go to Back SF00301
     */
    goToSF00301() {
        let self = this;
        // check isUpdate
        if (this.pageData.isUpdated) {
            //2. Message content khi click button [戻る/ Back]
            swal({
                    title             : Constants.BLANK,
                    text              : Messages.get(MSG.SF00309.WRN001),
                    type              : "warning",
                    showCancelButton  : true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText : Messages.get(MSG.SF00309.INF002),
                    closeOnConfirm    : true
                },
                function () {
                    return self.router.navigate([ScreenUrl.SF00301, self.pageData.dealInfo.dealCode]);
                });
        } else {
            return this.navigate("home/deal/" + this.pageData.dealInfo.dealCode);
        }
    }

    /*Cancel page*/
    cancel() {
        return this.navigate("home/deal/" + this.pageData.dealInfo.dealCode);
    }

    /**
     * Submit request
     */
    submitRequest() {
        this.modalShow();
    }

    /*Call service send mail request*/
    sendMail() {
        let self = this;
        this.pageService.sendMailRequest().then(() => {
            this.modelHide();
            this.resetModelRequestMail();
            let requestName = MAIL_REQUEST_TYPE[this.route.snapshot.params["requestType"]];
            //show message send mail request success
            // let message = Messages.get(MSG.SF00309.INF001);
            let message = `${requestName}が完了しました。`;
            swal({
                title             : Constants.BLANK,
                text              : message,
                confirmButtonColor: '#66ccff',
                confirmButtonText : "案件情報TOPへ",
            }, function () {
                self.router.navigate(['/home/deal', self.pageData.dealInfo.dealCode]);
            });
        }).catch(err => {
            //message send mail error
        });
    }

    /**
     * View product info
     *
     * @param product
     */
    viewProductInfo(product: ProductInfoModel): void {
        PathUtil.redirectToPageProduct(this.router,this.pageData.dealInfo.dealCode,product.productCode,product.productType,product.shapeId,product.cartonShippingType);
    }

    private showCompleteModal() {
        $("#sendCompleteModal").modal('show');
    }

    private closeCompleteModal() {
        $("#sendCompleteModal").modal('hide');
    }

    /* show modal request */
    private modalShow() {
        this.resetModelRequestMail();
        $("#sendRequestModal").modal('show');
    }

    /* hide modal request */
    private modelHide() {
        $("#sendRequestModal").modal('hide');
    }

    private resetModelRequestMail() {
        //3. Gửi mail xong vào lại, hãy reset về mail mặc định
        this.pageData.mailRequest.addressTo = [];
        this.pageData.mailRequest.addressCc = [];

        this.pageData.mailRequest = SF00309Helper.cloneMailModel(this.pageData.mailRequestBackup);

        this.pageData.mailRequest.content = this.replaceTemplate(
            this.pageData.mailRequest.content,
            this.pageData.dealInfo,
            this.pageData.productBoxs
        );
    }

    addMailPic() {
        //check add address
        if (this.pageData.typeAddress == "TO") {
            // get mailTo by id
            let $mailto = $("[name='mailto']");
            // add mail user to email
            if (this.pageData.userPicModals) {
                this.pageData.userPicModals.forEach(item => {
                    if(this.checkEmailAddress(item, "TO"))
                        $mailto.addTag(this.parseEmail(item));
                })
            }
        } else {
            // get mailTo by id
            let $mailcc = $("[name='mailcc']");
            // add mail user to email
            if (this.pageData.userPicModals) {
                this.pageData.userPicModals.forEach(item => {
                    if(this.checkEmailAddress(item, "CC"))
                        $mailcc.addTag(this.parseEmail(item));
                })
            }
        }

        // show modal request
        this.showCompleteModal();
    }

    parseEmail(userPic: UserModel): string {
        return userPic.username + "<" + userPic.email + ">"
    }

    checkEmailAddress(user, typeAddress): boolean {
        let address = this.parseEmail(user);
        let index;
        if (typeAddress == "TO") {
            index = this.pageData.mailRequest.addressTo.findIndex(item => {
                return item == address;
            })
        }
        else if (typeAddress == "CC") {
            index = this.pageData.mailRequest.addressCc.findIndex(item => {
                return item == address;
            })
        }

        if (index >= 0) return false;
        return true;
    }

    requestButtonValue(): string {
        return this.pageData.requestButtonLabel;
    }

    disableSendMail(): boolean {
        let type = this.pageData.requestType;
        // if (type <= 5 && type >= 3) return false;
        // if (type < 3 || type > 7) return true;
        // return !this.pageData.checkEnabled;
        return !(type <= 7 && type >= 3);
    }


    replaceTemplate(target: string, dealInfo: DealInfoModel, productInfoBoxs: ProductBoxModel[]): string {
        var content: string = this.replaceDealURL(target);
        var ret: string = this.replaceProductInfoList(content, productInfoBoxs);
        return ret;
    }

    private replaceDealURL(target: string): string {
        return target.replace("<URL>", this.getDealURL(this.pageData.dealInfo.dealCode));
    }

    private replaceProductInfoList(target: string, productInfoBoxs: ProductBoxModel[]): string {
        return target.replace("<PRODUCTS>", this.generateProductInfoList(productInfoBoxs));
    }

    private generateProductInfoList(productInfoBoxs: ProductBoxModel[]): string {
        var productInfoList: string = "";
        var productIndex: number = 1;
        for (var i = 0; i < this.pageData.productBoxs.length; i++) {
            var productBox: ProductBoxModel = this.pageData.productBoxs[i];
            if(productBox.checked){
                if(productIndex > 1){
                    productInfoList = productInfoList.concat("\n\n", "(", productIndex.toString(), ")\n", this.getReplacedProductInfo(productBox));
                } else {
                    productInfoList = productInfoList.concat("(", productIndex.toString(), ")\n", this.getReplacedProductInfo(productBox));
                }
                productIndex++;
            }
        }
        return productInfoList;
    }

    private getReplacedProductInfo(targetProduct: ProductBoxModel): string {
        return PRODUCT_INFO_MAIL_TEMPLATE
            .replace("<productCode>", targetProduct.product.productCode)
            .replace("<productType>", this.getProductTypeName(targetProduct))
            .replace("<productName>", targetProduct.product.productName)
            .replace("<productURL>", this.getProductURL(targetProduct));
    }

    private getProductTypeName(target: ProductBoxModel): string {
        return FormatUtil.productType(target.product.productType, target.product.shapeId, target.product.cartonShippingType);
    }

    private getDealURL(dealCode):string {
        return `${window.location.origin}/home/deal/${dealCode}`;
    }

    private getProductURL(target: ProductBoxModel): string {
        let deal_url = this.getDealURL(this.pageData.dealInfo.dealCode);
        return `${deal_url}/product/${target.product.productCode}`;
    }


}
