import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HeaderProvider} from "../SF00100/Header.provider";
import {SF00303Data} from "./SF00303.data";
import {default as Messages, MSG} from "../../../helper/message";
import {Constants} from "../../../helper/constants";
import {Quotation} from "../../../model/core/Quotation.model";
import {Deal} from "../../../model/core/Deal.model";
import {DealProduct} from "../../../model/core/DealProduct.model";
import {QuotationItem} from "../../../model/core/QuotationItem.model";
import {SF00303Service} from "./SF00303.service";
import {ScreenUrl} from "../../../helper/screen-url";
import ValidatorUtil from "../../../util/validator-util";
import {FormatUtil} from "../../../util/format-util";
import {CommonPage} from "../COMMON/common.page";
import {QuotationItemType} from "../../../helper/enum-type";
import DataUtil from "../../../util/data-util";
import {DEAL_STATUS_VALUES, DEAL_TYPE} from "../../../helper/mst-data-type";

declare let $: JQueryStatic;
declare let App: any;
const SF00303_PAGE_TITLE: string = "見積情報";

/**
 * TOP &gt; 案件概況 &gt; 見積情報
 * 
 * <pre>
 * Component                 内容
 * --------------------------------------------------------------------------------
 * SF0030302-Component       見積もり明細表示・入力セクション
 * sf0030301-rows            見積もり明細の1行
 * </pre>
 * @author hoangtd
 * */
@Component({
    templateUrl: "./SF00303.page.html",
    providers  : [SF00303Data]
    // /assets/css/custom.css に当ページ用の css あり
})
export class SF00303Page extends CommonPage implements OnInit, OnDestroy {
    DEFAULT_LOT: number = 5000;

    ngOnDestroy(): void {
        //closed modal when back open modal
        $('.estimateDate').modal('hide');
        swal.close();
    }

    /**
     * Default constructor
     * @param router
     * @param route
     * @param changeDetectorRef
     * @param headerProvider
     * @param sf00303Service
     */
    constructor(router: Router, route: ActivatedRoute, headerProvider: HeaderProvider,
                public sf00303Service: SF00303Service, public pageData: SF00303Data) {
        super(router, route, headerProvider);
    }

    protected initBreadcrumb(): void {
        let self = this;
        self.headerProvider.reset();
        self.headerProvider.pageName = SF00303_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(Constants.TOP, [Constants.SLASH]);
        self.headerProvider.addBreadCrumb(Constants.DEAL_OVERVIEW_BREADCRUMB, ["/home/deal/" + this.route.snapshot.params["dealCode"]]);
        self.headerProvider.addBreadCrumb(SF00303_PAGE_TITLE);
    }

    ngOnInit() {

        this.sf00303Service.navigateTo("見積情報", this.router.url);

        // read data resolver
        this.deal = this.route.snapshot.data["sf00303Data"].deal;

        this.quotation               = this.route.snapshot.data["sf00303Data"].quotation;
        this.dealProducts            = this.route.snapshot.data["sf00303Data"].dealProducts;
        this.pageData.mstLaminations = this.route.snapshot.data["sf00303Data"].mstLaminations;

        if (this.deal != undefined
            && this.quotation != undefined
            && this.quotation.deal != undefined
            && this.deal.id != this.quotation.dealId) {
            let self  = this;
            let value = [this.deal.dealCode, this.quotation.deal.dealCode];

            swal({
                    title            : Messages.get(MSG.COM.WRN001),
                    text             : Messages.get(MSG.COM.WRN002, value.toString()),
                    type             : "warning",
                    html             : true,
                    confirmButtonText: Constants.BACK
                },
                function () {
                    return self.router.navigate([ScreenUrl.SF00301, self.deal.dealCode]);
                });
            return;
        }
        this.quotationItems = this.route.snapshot.data["sf00303Data"].quotationItems;

        // check create quotation
        if (this.quotation.id == undefined) {
            // get data deal
            this.createQuotation();
        } else {
            this.pageData.calculatorQuantity();
            this.pageData.updateDataParent();
            this.pageData.getChangeCalculator();
            this.defaultEstimateDate          = this.quotation.estimateDate;
            this.defaultInvoiceExpirationDate = this.quotation.invoiceExpirationDate;
        }
        // check deal template
        if (this.deal.templateFlag == Constants.TEMPLATE
            || !!this.deal.closedFlag
            || this.deal.dealStatus >= DEAL_STATUS_VALUES.ORDER_CONFIRMED) {

            this.pageData.view = true;
        }
    }

    get checkCreateQuotation(): boolean {
        return !!this.quotation.quotationCode;
    }

    /**
     * method create quotation info
     * */
    createQuotation() {
        this.quotation                  = new Quotation();
        this.pageData.quotation.subject = this.pageData.deal.dealName;

        // set deal id
        this.quotation.dealId             = this.pageData.deal.id;
        this.quotation.quotationType      = Constants.DEAL_DEFAULT;
        // set date default
        this.quotation.estimateDate       = new Date();
        this.defaultEstimateDate          = this.quotation.estimateDate;
        this.defaultInvoiceExpirationDate = this.quotation.invoiceExpirationDate;

        // set invoice and department sale pic by customer
        this.quotation.invoiceDeptName = Constants.BLANK;
        this.quotation.invoicePic      = this.route.snapshot.data["sf00303Data"].saleByCustomer.username;
        // set quotationItem default
        if (this.pageData.dealProducts && this.pageData.dealProducts[0]) {
            //http://fridaynight.vnext.vn/issues/2227
            //add list product highlight flag = 1
            this.pageData.dealProducts.filter(dealProduct => {
                //filter
                return dealProduct.highlightFlag == 1;
            }).forEach(dealProduct => {
                // add quotationItem
                this.setQuotationDefault(dealProduct);
            })
        }
    }

    setQuotationDefault(dealProduct?: DealProduct) {
        let productItem           = new QuotationItem();
        productItem.itemType      = QuotationItemType.PRODUCT;
        productItem.productType   = 3;
        productItem.setClosedFlag = undefined;

        // set name product
        if (!!dealProduct) {
            let product             = dealProduct.product;
            productItem.name        = product.productName;
            productItem.description = FormatUtil.formatProductDescription(
                                                 dealProduct.product, this.pageData.mstLaminations).slice(0, 60);
            // dealProduct item is linked dealProduct
            let offers              = dealProduct.offers;
            offers.forEach(offer => {
                let productOutput          = offer.productOutput;
                // set max lot and set submit price and totalPrice
                productItem.quantity       = productOutput.lot;
                productItem.submittedPrice = offer.unitPrice;
                productItem.total          = productItem.quantity * productItem.submittedPrice;

                // add item to list
                // check total != 0
                if (FormatUtil.isNaN(productItem.quantity) > 0) {
                    // set dealProductId
                    this.quotationItems.push(DataUtil.cloneObject(productItem));
                    // reset value quotationItem
                    productItem.quantity       = undefined;
                    productItem.submittedPrice = undefined;
                    productItem.total          = undefined;
                }
            });

            // find no
            this.pageData.updateDisplayNo();
            // update data by lot
            this.pageData.checkLotValue();
        }
    }

    /**
     * Delete quotation info by quotation code
     */
    deleteQuotationInfo() {
        if (this.quotation.quotationCode == null) {
            $.notify({message: Messages.get(MSG.SF00303.INF0010)}, {type: 'danger'});
            return;
        } else {
            let self = this;
            swal({
                    title             : Constants.BLANK,
                    text              : Messages.get(MSG.SF00303.INF005),
                    type              : "warning",
                    showCancelButton  : true,
                    confirmButtonColor: "#d26a5c",
                    confirmButtonText : Messages.get(MSG.SF00303.INF003),
                    closeOnConfirm    : true
                },
                function () {
                    self.sf00303Service.deleteQuotation(self.quotation.quotationCode).then(data => {
                        return self.router.navigate([ScreenUrl.SF00301, self.deal.dealCode]);
                    });
                });
        }
    }

    /**
     * Cancel redirect page deal info
     */
    cancelQuotation() {
        let self = this;
        if (self.pageData.checkEdit) {
            // back window
            swal({
                    title             : Constants.BLANK,
                    text              : Messages.get(MSG.SF00309.WRN001),
                    type              : "warning",
                    showCancelButton  : true,
                    confirmButtonColor: "#5bc0de",
                    confirmButtonText : Messages.get(MSG.SF00303.INF003),
                    closeOnConfirm    : true
                },
                function () {
                    return self.router.navigate([ScreenUrl.SF00301, self.deal.dealCode]);
                });
        } else {
            self.router.navigate([ScreenUrl.SF00301, self.deal.dealCode]);
        }
    }

    /**
     * Save and copy quotation
     */
    saveAndCopy() {
        if (!this.checkDateSubmit()) {
            $.notify({message: Messages.get(MSG.SF00303.ERR004)}, {type: 'danger'});
            return;
        }
        if (this.quotation.quotationCode != null) {
            if ($('#SF00303-deal-info').valid()) {
                this.sf00303Service.duplicateQuotation(this.quotation, this.quotationItems).then(data => {
                    $.notify({message: "見積ID: " + data.quotation.quotationCode + " として新しく保存しました。"}, {type: 'success'});
                    this.pageData.checkEdit = false;
                    return this.router.navigate(["/home/deal/", this.deal.dealCode, "quotation",
                        data.quotation.quotationCode]).then(() => {
                        // Trigger OnInit manually
                        this.ngOnInit();
                    });
                }).catch(err => {
                    $.notify({message: Messages.get(MSG.SF00303.ERR005)}, {type: 'danger'});
                });
            } else {
                $.notify({message: Messages.get(MSG.SF00303.ERR006)}, {type: 'danger'});
            }
        } else {
            $.notify({message: Messages.get(MSG.SF00303.INF0010)}, {type: 'info'});
        }

    }

    /**
     * Save and update data
     * if quotation not created then create quotation
     * else update quotation
     */
    saveQuotation() {
        if (!this.checkDateSubmit()) {
            $.notify({message: Messages.get(MSG.SF00303.ERR004)}, {type: 'danger'});
            return;
        }
        if ($('#SF00303-deal-info').valid()) {
            this.sf00303Service.saveQuotation(this.quotation, this.quotationItems).then(data => {
                $.notify({message: Messages.get(MSG.SF00303.INF009)}, {type: 'success'});
                this.pageData.checkEdit = false;
                return this.router.navigate(["/home/deal/", this.deal.dealCode, "quotation",
                    data.quotation.quotationCode]).then(() => {
                    // Trigger OnInit manually
                    this.ngOnInit();
                });
            }, (err) => {
                $.notify({message: Messages.get(MSG.SF00303.ERR002)}, {type: 'danger'});
                return;
            });
        } else {
            $.notify({message: Messages.get(MSG.SF00303.ERR003)}, {type: 'danger'});
            return;
        }
    }

    /**
     * Redirect page SF00304
     */
    redirectSF0304() {
        if (!this.checkDateSubmit()) {
            $.notify({message: Messages.get(MSG.SF00303.ERR004)}, {type: 'danger'});
            return;
        }

        this.sf00303Service.saveQuotation(this.quotation, this.quotationItems).then(data => {
            $.notify({message: Messages.get(MSG.SF00303.INF009)}, {type: 'success'});
            // 見積りテンプレの並び順変更により、option値はは3でリダイレクト
            return this.router.navigate(["/home/deal", this.deal.dealCode, "exportQuotation", data.quotation.quotationCode, 3]);
        }, (err) => {
            $.notify({message: Messages.get(MSG.SF00303.ERR002)}, {type: 'danger'});
            return;
        });

    }

    /* Check start, end Date*/
    checkDateSubmit() {
        //A createDate/見積日
        //B invoiceExpirationDate/見積有効期限
        //C invoiceDeliveryDate/ 納期
        let createDate = this.pageData.quotation.createdDate;
        if (ValidatorUtil.isEmpty(createDate))
            createDate = new Date(); //system date
        // check A > B
        let A           = FormatUtil.dateToMilliseconds(createDate);
        let expiredDate = this.pageData.quotation.invoiceExpirationDate;
        if (ValidatorUtil.isNotEmpty(expiredDate)) {
            let B = FormatUtil.dateToMilliseconds(expiredDate);
            if (A > B)
                return false;
        }

        return true;
    }

    get defaultEstimateDate(): Date {
        return this.pageData.defaultEstimateDate;
    }

    set defaultEstimateDate(val: Date) {
        this.pageData.defaultEstimateDate = val;
    }

    get defaultInvoiceExpirationDate(): Date {
        return this.pageData.defaultInvoiceExpirationDate;
    }

    set defaultInvoiceExpirationDate(val: Date) {
        this.pageData.defaultInvoiceExpirationDate = val;
    }

    // check deal has customer
    get isHasCustomer(): boolean {
        // check customerId or customerName
        return !!this.pageData.deal.customer.customerCode || !!this.deal.customerName;
    }

    // get and set item page
    get deal() {
        return this.pageData.deal;
    }

    set deal(value: Deal) {
        this.pageData.deal = value;
    }

    // dealProducts
    get dealProducts() {
        return this.pageData.dealProducts;
    }

    set dealProducts(value: DealProduct[]) {
        this.pageData.dealProducts = value;
    }

    // quotation
    get quotation() {
        return this.pageData.quotation;
    }

    set quotation(value: Quotation) {
        this.pageData.quotation = value;
    }

    //quotationItems
    get quotationItems() {
        return this.pageData.quotationItems;
    }

    set quotationItems(value: QuotationItem []) {
        this.pageData.quotationItems = value;
    }

    // quotation code
    get quotationCode() {
        return this.pageData.quotation.quotationCode;
    }

    // subject
    get subject(): string {
        return this.pageData.quotation.subject;
    }

    set subject(value: string) {
        this.pageData.quotation.subject = value;
    }

    //customer name
    get customerName(): string {
        if (this.isHasCustomer) {
            if (this.pageData.deal.customer.customerCode) {
                return this.pageData.deal.customer.name;
            } else {
                return this.pageData.deal.customerName;
            }
        }

        return Constants.BLANK;
    }

    // sale name
    get saleName() {
        if (this.pageData.deal.sales != undefined) {
            if (this.pageData.deal.sales.department != undefined)
                return this.pageData.deal.sales.department.department
                    + "／" + this.pageData.deal.sales.username;

            return this.pageData.deal.sales.username;
        }

        return Constants.BLANK;
    }

    set saleName(value: string) {
        this.pageData.deal.sales.username = value;
    }

    //estimate date
    get estimateDate() {
        return this.pageData.quotation.estimateDate;
    }

    _estimateDate(value: Date) {
        this.pageData.checkEdit              = true;
        this.pageData.quotation.estimateDate = value;
    }

    //memo
    get memo() {
        return this.pageData.quotation.memo;
    }

    set memo(value: string) {
        this.pageData.quotation.memo = value;
    }

    // remark
    get remark() {
        return this.pageData.quotation.remark;
    }

    set remark(value: string) {
        this.pageData.quotation.remark = value;
    }

    //invoiceDeliveryDate
    get invoiceDeliveryDate() {
        return this.pageData.quotation.invoiceDeliveryDate;
    }

    set invoiceDeliveryDate(val: string) {
        this.pageData.quotation.invoiceDeliveryDate = val;
    }

    parseInvoiceDeliveryDate() {
        let USE_STRICT_PARSING = true;
        let input              = this.replaceFullwidthNumbers(this.pageData.quotation.invoiceDeliveryDate);
        let mo                 = moment(input, ["YYYYMMDD", "YYMMDD", "YYYY/MM/DD", "YY/MM/DD", "YYYY/M/D", "YY/M/D"], USE_STRICT_PARSING);
        if (mo.isValid()) {
            this.pageData.quotation.invoiceDeliveryDate = mo.format("YYYY年MM月DD日");
        }
    }

    private replaceFullwidthNumbers(input: string): string {
        return input
            .replace(/０/g, "0")
            .replace(/１/g, "1")
            .replace(/２/g, "2")
            .replace(/３/g, "3")
            .replace(/４/g, "4")
            .replace(/５/g, "5")
            .replace(/６/g, "6")
            .replace(/７/g, "7")
            .replace(/８/g, "8")
            .replace(/９/g, "9");
    }

    //invoiceDeliveryPlace
    get invoiceDeliveryPlace() {
        return this.pageData.quotation.invoiceDeliveryPlace;
    }

    set invoiceDeliveryPlace(value: string) {
        this.pageData.quotation.invoiceDeliveryPlace = value;
    }

    // invoicePaymentTerm
    get invoicePaymentTerm() {
        return this.pageData.quotation.invoicePaymentTerm;
    }

    set invoicePaymentTerm(value: string) {
        this.pageData.quotation.invoicePaymentTerm = value;
    }

    // invoiceExpirationDate
    get invoiceExpirationDate() {
        return this.pageData.quotation.invoiceExpirationDate;
    }

    _invoiceExpirationDate(value: Date) {
        this.pageData.checkEdit                       = true;
        this.pageData.quotation.invoiceExpirationDate = value;
    }

    //invoiceCustomerName
    get invoiceCustomerName() {
        return this.pageData.quotation.invoiceCustomerName;
    }

    set invoiceCustomerName(value: string) {
        this.pageData.quotation.invoiceCustomerName = value;
    }

    //invoiceDeptName
    get invoiceDeptName() {
        return this.pageData.quotation.invoiceDeptName;
    }

    set invoiceDeptName(value: string) {
        this.pageData.quotation.invoiceDeptName = value;
    }

    get invoiceDeptNamePlaceholder() {
        return this.pageData.deal.sales.department.department;
    }

    // invoicePic
    get invoicePic() {
        return this.pageData.quotation.invoicePic;
    }

    set invoicePic(value: string) {
        this.pageData.quotation.invoicePic = value;
    }

    isHasPicName() {
        return (this.pageData.deal.sales != undefined);
    }

    get invoicePicNamePlaceholder() {
        return this.pageData.deal.sales.username;
    }

    // invoiceMailAddress
    get invoiceMailAddress() {
        return this.pageData.quotation.invoiceMailAddress;
    }

    set invoiceMailAddress(value: string) {
        this.pageData.quotation.invoiceMailAddress = value;
    }

    //invoiceAddress
    get invoiceAddress() {
        return this.pageData.quotation.invoiceAddress;
    }

    set invoiceAddress(value: string) {
        this.pageData.quotation.invoiceAddress = value;
    }

    //invoicePhoneNumber
    get invoicePhoneNumber() {
        return this.pageData.quotation.invoicePhoneNumber;
    }

    set invoicePhoneNumber(value: string) {
        this.pageData.quotation.invoicePhoneNumber = value;
    }

    // customer code
    get customerCode() {
        // check customer null = true
        if (!this.isHasCustomer) {
            return '得意先ID';
        } else {
            // customer in deal != null
            if (!!this.deal.customer.customerCode) {
                return this.pageData.deal.customer.customerCode;
            }
            // customer in deal = null
            else {
                return 'New Customer';
            }
        }
    }

    // deal type
    get dealType() {
        return DataUtil.getData(DEAL_TYPE, Constants.BLANK, this.pageData.deal.dealType);
    }

    //
    get stereoType1Flag(): any {
        if (this.pageData.quotation.stereoType1Flag == undefined) {
            this.pageData.quotation.stereoType1Flag = 1;
        }

        return this.pageData.quotation.stereoType1Flag;
    }

    set stereoType1Flag(value: any) {
        if (value) {
            this.pageData.quotation.stereoType1Flag = 1;
        } else {
            this.pageData.quotation.stereoType1Flag = 0;
        }
    }

    get stereoType2Flag(): any {
        if (this.pageData.quotation.stereoType2Flag == undefined) {
            this.pageData.quotation.stereoType2Flag = 1;
        }
        return this.pageData.quotation.stereoType2Flag;
    }

    set stereoType2Flag(value: any) {
        if (value) {
            this.pageData.quotation.stereoType2Flag = 1;
        } else {
            this.pageData.quotation.stereoType2Flag = 0;
        }
    }

    get stereoType3Flag(): any {
        if (this.pageData.quotation.stereoType3Flag == undefined) {
            this.pageData.quotation.stereoType3Flag = 1
        }
        return this.pageData.quotation.stereoType3Flag;
    }

    set stereoType3Flag(value: any) {
        if (value) {
            this.pageData.quotation.stereoType3Flag = 1;
        } else {
            this.pageData.quotation.stereoType3Flag = 0;
        }
    }

    get stereoType4Flag(): any {
        if (this.pageData.quotation.stereoType4Flag == undefined) {
            this.pageData.quotation.stereoType4Flag = 1;
        }
        return this.pageData.quotation.stereoType4Flag;
    }

    set stereoType4Flag(value: any) {
        if (value) {
            this.pageData.quotation.stereoType4Flag = 1;
        } else {
            this.pageData.quotation.stereoType4Flag = 0;
        }
    }

    get title(): number {
        return this.quotation.title;
    }

    _title(value: number) {
        this.pageData.quotation.title = value;
    }

    get invoiceDeliveryMethod(): string {
        this.pageData.checkLotValue();
        let value = this.quotation.deliveryMethod;
        if (value == null || value == undefined || value === "") {
            if (this.pageData.lotTotal <= this.DEFAULT_LOT) {
                this.pageData.placeholder = "一括納品";
            } else {
                this.pageData.placeholder = "ご希望に合わせて調整";
            }
        }
        return this.quotation.deliveryMethod;
    }

    set invoiceDeliveryMethod(value: string) {
        this.quotation.deliveryMethod = value;
        if (!value) {
            if (this.pageData.lotTotal <= this.DEFAULT_LOT) {
                this.pageData.placeholder = "一括納品";
            } else {
                this.pageData.placeholder = "ご希望に合わせて調整";
            }
        }
    }

    eventChange() {
        this.pageData.checkEdit = true;
    }
}
