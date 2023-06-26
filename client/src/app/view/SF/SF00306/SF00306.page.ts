import {Location, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Constants} from "../../../helper/constants";
import Messages, {MSG} from "../../../helper/message";
import ValidatorUtil from "../../../util/validator-util";
import {CheckSheetModel} from "../COMMON/checksheet/model/CheckSheet.model";
import {CommonPage} from "../COMMON/common.page";
import {UserModel} from "../COMMON/model/UserModel";
import {ProductBoxModel} from "../COMMON/productinfo/model/ProductBox.model";
import {ProductInfoModel} from "../COMMON/productinfo/model/ProductInfo.model";
import {HeaderProvider} from "../SF00100/Header.provider";
import {SF00306Data} from "./SF00306.data";
import {SF00306Helper} from "./SF00306.helper";
import {SF00306Service} from "./SF00306.service";
import {SF00306Constants} from "./SF00306.constants";
import {PathUtil} from "../../../util/path-util";

const SF00306_PAGE_TITLE: string = "設計依頼";
declare let $: any;
declare let App: any;

@Component({
    templateUrl: 'SF00306.page.html'
})

export class SF00306Page extends CommonPage implements OnInit {
    /**
     * Constructor page
     * @param router
     * @param route
     * @param pageService
     * @param headerProvider
     * @param location
     */
    constructor(router: Router, route: ActivatedRoute,
                private pageService: SF00306Service,
                headerProvider: HeaderProvider) {
        super(router, route, headerProvider);
    }

    ngOnInit(): void {
        this.pageService.navigateTo("設計依頼", this.router.url);
    }

    // init breadcrumb
    protected initBreadcrumb(): void {
        let self = this;

        let sf0301Path = "/home/deal/" + self.route.snapshot.params["dealCode"];

        self.headerProvider.reset();
        self.headerProvider.pageName = SF00306_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(Constants.TOP, [Constants.SLASH]); //Dashboard
        self.headerProvider.addBreadCrumb(Constants.DEAL_OVERVIEW_BREADCRUMB, [sf0301Path]); //SF003-01
        self.headerProvider.addBreadCrumb(SF00306_PAGE_TITLE);
    }

    get pageData(): SF00306Data {
        return this.pageService.pageData;
    }

    showMailModal() {
        // #2583
        if (this.inputValidateCheckSheet()) {
            $.notify({message: Messages.get(MSG.SF00301.WRN002)}, {type: 'danger'});
            return;
        }
        //#2206
        if (ValidatorUtil.isEmpty(this.pageData.dealInfo.customerCode)) {
            // reset checkbox state which already checked to un-checked
            this.pageData.productBoxs.filter(productBox => productBox.checked == true).forEach(productBox => {
                productBox.checked = false;
            });

            $.notify({message: Messages.get(MSG.SF00301.WRN001)}, {type: 'danger'});
            return;
        }

        // reset address to and cc
        this.pageData.mailModelScreen.addressTo = [];
        this.pageData.mailModelScreen.addressCc = [];
        // find data default
        this.pageData.mailModelScreen = SF00306Helper.cloneMailModel(this.pageData.mailModel);
        // add product checkbox
        let selectedProducts: ProductInfoModel[] = this.pageData.productBoxs.filter(pb => pb.checked).map(pb => pb.product);
        // note content mail
        this.pageData.mailModelScreen.content = SF00306Helper.updateMailContent(this.pageData.dealInfo, selectedProducts);
        // open modal search pic
        this.openMailModal();
    }

    openMailModal() {
        $("#sendRequestModal").modal('show');
    }

    closeMailModal() {
        $("#sendRequestModal").modal('hide');
    }

    showCompleteModal() {
        $("#sendCompleteModal").modal('show');
    }

    closeCompleteModal() {
        $("#sendCompleteModal").modal('hide');
    }

    sendMail(): void {
        let self = this;
        App.loader('show');

        this.pageService.sendMail().then(res => {
            App.loader('hide');
            self.closeMailModal();
            swal({
                title             : Constants.BLANK,
                confirmButtonColor: "#66ccff",
                confirmButtonText : "案件情報TOPへ",
                text              : this.pageData.messageMail,
                html              : true,
            }, function () {
                self.router.navigate(['/home/deal', self.pageData.dealInfo.dealCode]);
            });
        }).catch(err => {
            //3. Request design error
            // Send in form mail fail
            App.loader('hide');
            self.closeMailModal();
            swal(Constants.BLANK, this.pageData.messageMail, "error");
        });
    }

    viewCheckSheet(): void {
        this.router
            .navigate([`/home/deal/${this.pageData.dealInfo.dealCode}/dealCheckSheet`]).then(null);
    }

    viewProductInfo(product: ProductInfoModel): void {
        PathUtil.redirectToPageProduct(this.router,this.pageData.dealInfo.dealCode,product.productCode,product.productType,product.shapeId,product.cartonShippingType);
    }

    backToSF00301() {
        this.closeMailModal();
        this.closeCompleteModal();
        this.router.navigate(["home/deal", this.pageData.dealInfo.dealCode]).then(null);
    }

    productBoxChecked(productBox: ProductBoxModel, event) {
        if (event.target.checked) {
            if (productBox.product.requestDesignFlag == 1) {
                $.notify({message: Messages.get(MSG.SF00306.ERR009)}, {type: 'danger'});
                productBox.checked = false;
                $("#checkbox" + productBox.product.id).attr('checked', false);
            } else {
                productBox.checked = true;
            }
        } else {
            productBox.checked = false;
        }
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
        this.showRequest();
    }

    parseEmail(userPic: UserModel): string {
        return userPic.username + "<" + userPic.email + ">"
    }

    checkEmailAddress(object: any, typeAddress: any, typeObject?: string): boolean {
        let address;
        if(typeObject == SF00306Constants.TYPE_OBJECT){
            // http://fridaynight.vnext.vn/issues/2979
            // replace halfsize space by fullsize space
            address = object["department"].replace(" ", "　");
        }else{
            // http://fridaynight.vnext.vn/issues/2979
            // replace halfsize space by fullsize space
            address = this.parseEmail(object).replace(" ", "　");
        }

        let index;
        if (typeAddress == SF00306Constants.TYPE_ADDRESS_TO) {
            index = this.pageData.mailModelScreen.addressTo.findIndex(item => {
                return address == item;
            })
        }
        if (typeAddress == SF00306Constants.TYPE_ADDRESS_CC) {
            index = this.pageData.mailModelScreen.addressCc.findIndex(item => {
                return address == item;
            })
        }

        if (index >= 0) return false;
        return true;
    }

    showRequest() {
        $("#sendRequestModal").modal('show');
    }

    inputValidateCheckSheet() {
        let checkInput = false;
        let question = this.getAnswerByQuestionCode(1003);
        if (ValidatorUtil.isEmpty(question.radioButton)) {
            checkInput = true;
        }
        question = this.getAnswerByQuestionCode(1010);
        if (ValidatorUtil.isEmpty(question.selectBox1)) {
            checkInput = true;
        }

        question = this.getAnswerByQuestionCode(1011);
        if(ValidatorUtil.isEmpty(question.selectBox1) || ValidatorUtil.isEmpty(question.selectBox2)
            || ValidatorUtil.isEmpty(question.radioButton)) {
            checkInput = true;
        }

        // バーコードにチェックが入っていて、該当値がない場合にエラーとする
        [2061, 2062, 2063, 2064].map((key) => {
            let question = this.getAnswerByQuestionCode(key);
            if (question.checkBox1 == 1 && ValidatorUtil.isEmpty(question.textArea1)) {
                checkInput = true;
            }
        });

        return checkInput;
    }

    getAnswerByQuestionCode(value: number): CheckSheetModel {
        let answer = this.pageData.checkSheets[value];
        if (!!answer) return answer;
        return new CheckSheetModel();
    }

    changeProductLot(product: ProductInfoModel): void {
        let productBox = this.pageData.productBoxs.find(item =>{
            return item.product.id == product.id;
        });

        productBox.product.requestLot = product.requestLot;
    }


    // deal call job inprocess
    get isJobInprocess(): boolean {
        return this.pageData.dealInfo.jobInprocess == 1;
    }

    exportPdf(productCode: string) {
        this.pageService.SF0030604(productCode)
            .then(result => {
                $.notify({message: Messages.get(MSG.SF00306.INF002)}, {type: 'success'});
                let link = document.createElement('a');
                link.setAttribute('target', '_blank');
                link.href = result.filePath;
                link.click();
            })
            .catch(err => {
                swal(Constants.BLANK, Messages.get(MSG.SF00306.ERR011), "error")
            });
    }
}
