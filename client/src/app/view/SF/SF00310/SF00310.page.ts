import {Component} from "@angular/core";
import {CommonPage} from "../COMMON/common.page";
import {ActivatedRoute, Router} from "@angular/router";
import {HeaderProvider} from "../SF00100/Header.provider";
import {Constants} from "../../../helper/constants";
import {SF00310Service} from "./SF00310.service";
import {SF00310Data} from "./SF00310.data";
import Messages, {MSG} from "../../../helper/message";
import {ProductInfoModel} from "../COMMON/productinfo/model/ProductInfo.model";
import {MailModel} from "../../../model/common/Mail.model";
import {ScreenUrl} from "../../../helper/screen-url";
import {SF00310Helper} from "./SF00310.helper";
import {UserModel} from "../COMMON/model/UserModel";
import {PathUtil} from "../../../util/path-util";

declare let $: any;
declare let App: any;
const SF00310_PAGE_TITLE: string = "デザイン作成依頼";

@Component({
    templateUrl: 'SF00310.page.html'
})

/**
 * Request create design
 */
export class SF00310Page extends CommonPage {

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
                public pageService: SF00310Service) {
        super(router, route, headerProvider);
        this.pageData.mailRequest = new MailModel();
    }

    /**
     * Init Breadcrumb
     */
    protected initBreadcrumb(): void {
        let self = this;
        self.headerProvider.reset();
        self.headerProvider.pageName = SF00310_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(Constants.TOP, [Constants.SLASH]);
        self.headerProvider.addBreadCrumb(Constants.DEAL_OVERVIEW_BREADCRUMB, ["/home/deal/" + this.route.snapshot.params["dealCode"]]);
        self.headerProvider.addBreadCrumb(SF00310_PAGE_TITLE);
    }

    /*get pageData*/
    get pageData(): SF00310Data {
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
                    text              : Messages.get(MSG.SF00310.WRN002),
                    type              : "warning",
                    showCancelButton  : true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText : Messages.get(MSG.SF00310.INF002),
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
        // check date validate
        if (!this.validateForm()) {
            $.notify({message: Messages.get(MSG.SF00310.WRN001)}, {type: 'danger'});
            return;
        }

        this.modalShow();
    }

    /*Call service send mail request*/
    sendMail() {
        let self = this;

        this.pageService.sendMailRequest().then(() => {
            this.modelHide();
            this.resetModelRequestMail();
            //show message send mail request success
            let message = Messages.get(MSG.SF00310.INF001);
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
            if ('SF00306_ERR004' == err.code)
                swal(Constants.BLANK, Messages.get(MSG.SF00310.ERR001), "error");
            else if ('SF00309_ERR003' == err.code)
                swal(Constants.BLANK, 'Unable to Send Email', "error");
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

        this.pageData.mailRequest = SF00310Helper.cloneMailModel(this.pageData.mailRequestBackup);
    }

    // check form validate date
    validateForm(): boolean {
        let validate = true;

        // check A > C
        let desiredDeliveryDate = this.pageData.requestModel.desiredDeliveryDate;
        let submissionDeadline  = this.pageData.requestModel.submissionDeadline;
        if (!!desiredDeliveryDate && !!submissionDeadline && desiredDeliveryDate < submissionDeadline) {
            validate = false;
        }

        return validate;
    }

    addMailPic() {
        //check add address
        if (this.pageData.typeAddress == "TO") {
            // get mailTo by id
            let $mailto = $("[name='mailto']");
            // add mail user to email
            if (this.pageData.userPicModals) {
                this.pageData.userPicModals.forEach(item => {
                    if (this.checkEmailAddress(item, "TO"))
                        $mailto.addTag(this.parseEmail(item));
                })
            }
        } else {
            // get mailTo by id
            let $mailcc = $("[name='mailcc']");
            // add mail user to email
            if (this.pageData.userPicModals) {
                this.pageData.userPicModals.forEach(item => {
                    if (this.checkEmailAddress(item, "CC"))
                        $mailcc.addTag(this.parseEmail(item));
                })
            }
        }

        // show modal request
        $("#sendRequestModal").modal('show');
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
        if (typeAddress == "CC") {
            index = this.pageData.mailRequest.addressCc.findIndex(item => {
                return item == address;
            })
        }

        if (index >= 0) return false;
        return true;
    }
}
