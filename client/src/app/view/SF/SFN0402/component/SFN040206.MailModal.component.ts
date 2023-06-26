import {Component, forwardRef, Inject, OnInit, ViewChild} from "@angular/core";
import {SFN0402Page} from "../SFN0402.page";
import {SFN0402Constants} from "../SFN0402.constants";
import {MailModalModel} from "../../COMMON/mail-modal/MailModal.model";
import {GenericProvider} from "../../../../component/GenericProvider";
import {MailModalComponent} from "../../COMMON/mail-modal/MailModal.component";
import {MailModel} from "../model/SFN0402_Mail.model";
import {StringTemplateHelper} from "../../../../helper/string-template-helper";
import {ProductModel} from "../model/SFN0402_Product.model";

@Component({
    selector: "sfn040206",
    template: "<div mail-modal></div>",
    providers: [{provide: MailModalModel.PROVIDER, useFactory: () => new GenericProvider<MailModalModel>()}]
})
export class SFN040206Component extends MailModalModel implements OnInit {

    @ViewChild(MailModalComponent) mailModal: MailModalComponent;
    private isCustomer: boolean;
    private saveEnable: boolean;
    private type: number;

    constructor(@Inject(forwardRef(() => SFN0402Page)) private page: SFN0402Page,
                @Inject(MailModalModel.PROVIDER) provider: GenericProvider<MailModalModel>) {
        super();
        provider.provider = this;
    }

    ngOnInit(): void {
        this.isCustomer = (this.page.pageData.partnerType == SFN0402Constants.TYPE_CUSTOMER);
        this.saveEnable = true;
    }

    //region Bindings

    //endregion

    //region Actions

    sendMail(): Promise<void> {
        return this.page.sendMail(this.type);
    }

    show(type: number) {
        this.type = type;
        if (type == SFN0402Constants.MAIL_PRODUCT_DISPOSAL) {
            this.prepareProductDisposalMail();
        } else if (type == SFN0402Constants.MAIL_WOODEN_RETURN) {
            this.prepareWoodenReturn();
        } else if (type == SFN0402Constants.MAIL_WOODEN_PENDING) {
            this.prepareWoodenPending();
        }
        this.mailModal.open();
    }

    //endregion

    //region Functions

    private prepareProductDisposalMail() {
        // prepare
        let pageData = this.page.pageData;
        let customer = pageData.partner;
        let mailTemplate = pageData.productDisposalMail;
        // get selected product
        let product: ProductModel;
        for (let inventory of pageData.inventories) {
            if (inventory != undefined && inventory.slt_selected) {
                product = inventory.product;
                break;
            }
        }

        // generate mail
        let mail = new MailModel();
        this.page.pageData.mail = mail;
        this.data.mail = mail;

        mail.addressTo = mailTemplate.addressTo.slice(0);
        mail.addressCc = mailTemplate.addressCc.slice(0);
        mail.subject = mailTemplate.subject;
        mail.content = StringTemplateHelper.generateString(mailTemplate.content, {
            customerCode: customer.code,
            customerName: customer.name,
            productCode: product.itemCode,
            productName: product.name
        });
    }

    private prepareWoodenReturn() {
        // prepare
        let pageData = this.page.pageData;
        let customer = pageData.partner;
        let mailTemplate = pageData.woodenReturnMail;
        // get selected product
        let product: ProductModel;
        for (let tProduct of pageData.products) {
            if (tProduct != undefined && tProduct.plt_selected) {
                product = tProduct;
                break;
            }
        }

        // generate mail
        let mail = new MailModel();
        this.page.pageData.mail = mail;
        this.data.mail = mail;

        mail.addressTo = mailTemplate.addressTo.slice(0);
        mail.addressCc = mailTemplate.addressCc.slice(0);
        mail.subject = StringTemplateHelper.generateString(mailTemplate.subject, {
            woodenCode: product.wooden
        });
        mail.content = StringTemplateHelper.generateString(mailTemplate.content, {
            customerCode: customer.code,
            customerName: customer.name,
            productCode: product.itemCode,
            productName: product.name,
            woodenCode: product.wooden
        });
    }

    private prepareWoodenPending() {
        // prepare
        let pageData = this.page.pageData;
        let customer = pageData.partner;
        let mailTemplate = pageData.woodenPendingMail;
        // get selected product
        let product: ProductModel;
        for (let tProduct of pageData.products) {
            if (tProduct != undefined && tProduct.plt_selected) {
                product = tProduct;
                break;
            }
        }

        // generate mail
        let mail = new MailModel();
        this.page.pageData.mail = mail;
        this.data.mail = mail;

        mail.addressTo = mailTemplate.addressTo.slice(0);
        mail.addressCc = mailTemplate.addressCc.slice(0);
        mail.subject = StringTemplateHelper.generateString(mailTemplate.subject, {
            woodenCode: product.wooden
        });
        mail.content = StringTemplateHelper.generateString(mailTemplate.content, {
            customerCode: customer.code,
            customerName: customer.name,
            productCode: product.itemCode,
            productName: product.name,
            woodenCode: product.wooden
        });
    }

    //endregion
}