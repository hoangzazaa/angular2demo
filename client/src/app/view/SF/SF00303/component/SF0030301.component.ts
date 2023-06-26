import {AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, Output} from "@angular/core";
import {Deal} from "../../../../model/core/Deal.model";
import {QuotationItem} from "../../../../model/core/QuotationItem.model";
import {QuotationItemType} from "../../../../helper/enum-type";
import {Product} from "../../../../model/core/Product.model";
import {FormatUtil} from "../../../../util/format-util";
import MathUtil from "../../../../util/math-util";
import {Offer} from "../../../../model/core/Offer.model";
import {SF00303Data} from "../SF00303.data";
import {Router} from "@angular/router";
import {PRODUCT_UNIT} from "../../../../helper/mst-data-type";
import {PathUtil} from "../../../../util/path-util";

/**
 * TOP &gt; 案件概況 &gt; 見積情報  見積もり明細表示/入力セクションの1行
 * @author hoangtd extends from haipt
 * */
@Component({
    selector   : "[sf0030301-rows]",
    templateUrl: "SF0030301.component.html"
})
export class SF0030301Component implements AfterViewInit {
    @Input() dealData: Deal;
    @Input() itemData: QuotationItem;
    @Input() dataList: QuotationItem[];
    @Output() closedQuotationItemGroups: EventEmitter<any> = new EventEmitter<any>();
    @Input() viewMode: boolean                             = true;
    public isSelected: boolean                             = false;
    private _interestRate: string;

    ngAfterViewInit(): void {
        $(document).delegate('textarea[maxlength]', 'keydown keyup paste change', function (e) {
            let limit = parseInt($(this).attr('maxlength'));
            let text  = $(this).val();
            let chars = text.length;
            if (chars > limit) {
                e.preventDefault();
                $(this).val(text.substr(0, limit));
            }
        });
    }

    /*find index item*/
    get itemIndex() {
        this.itemData.itemIndex = $(this.element.nativeElement).index() + 1;
        return this.itemData.itemIndex;
    }

    constructor(public element: ElementRef, private pageData: SF00303Data, public router: Router) {
    }

    @HostBinding("class.blank") get isBlank() {
        return ((this.itemData.itemType == QuotationItemType.LINE) && (this.itemData.name == undefined));
    }

    @HostBinding("class.heading") get isHeading() {
        return ((this.itemData.itemType == QuotationItemType.LINE) && (this.itemData.name != undefined));
    }

    @HostBinding("class.group-heading") get isGroups() {
        return this.itemData.itemType == QuotationItemType.SET;
    }

    @HostBinding("class.tr-product") get isProduct() {

        return this.itemData.itemType >= QuotationItemType.PRODUCT;
    }

    @HostBinding("class.group-heading-close")
    get isSetClose() {
        return this.isGroups && (this.itemData.setClosedFlag == 1);
    }

    @HostBinding("class.group-child")
    get isChildItemRow() {
        return this.isProduct && (this.itemData.setClosedFlag != undefined);
    }

    @HostBinding("class.group-child-hidden")
    get isChildHidden() {
        return this.isHeading && (this.itemData.setClosedFlag == 1);
    }

    /**
     * 単位が空欄なら数量、提出単価、提出金額を空欄にする
     */
    @HostBinding("class.empty-unit")
    get isEmptyUnit() {
        return this.productUnit.length == 0;
    }

    get productUnit(): string {
        if (!!this.productType && this.productType > 0)
            return PRODUCT_UNIT[this.productType];
        return this.productTypeName;
    }

    @Output() onRemove = new EventEmitter<number>();

    /*remove groups swal*/
    remove() {
        let self = this;
        if (this.isGroups) {
            swal({
                title             : '',
                text              : 'グループを削除してよろしいですか？',
                type              : 'warning',
                showCancelButton  : true,
                confirmButtonColor: '#d26a5c',
                confirmButtonText : 'はい',
                cancelButtonText  : "いいえ",
                html              : false
            }, function () {
                self.onRemove.emit(self.itemIndex);
            });
        } else {
            this.onRemove.emit(this.itemIndex);
        }
    }

    get name() {
        if (!!this.itemData.dealProductId)
            return this.itemData.dealProduct.product.productName;

        if (!!this.itemData.name && this.itemData.name.length > 20) {
            this.itemData.name = this.itemData.name.slice(0, 21);
        }
        return this.itemData.name;
    }

    set name(value: string) {
        this.itemData.name = value;
    }

    // quantity
    get quantity() {
        return FormatUtil.isNaN(this.itemData.quantity);
    }

    set quantity(value: number) {
        this.itemData.quantity = FormatUtil.isNaN(value);
        // update quantity then calculator data quotation info
        if (this.itemData.dealProductId > 0 && this.itemData.itemType == QuotationItemType.PRODUCT) {
            this.pageData.calculatorQuantity();
        } else {
            // update total child
            this.itemData.total = FormatUtil.isNaN(this.itemData.submittedPrice) * FormatUtil.isNaN(this.itemData.quantity);
        }
        this.pageData.checkLotValue();
        // emit change calculator and update data parent
        this.emitChangeCalculatorData();
    }

    //description
    get description() {
        if (this.itemData.description == null) {
            this.itemData.description = '';
        }
        return this.itemData.description;
    }

    set description(value: string) {
        this.itemData.description = value;
    }

    // productType
    get productType() {
        return this.itemData.productType;
    }

    set productType(value: number) {
        this.itemData.productType = value;
    }

    get productTypeName() {
        return this.itemData.productTypeName;
    }

    // submittedPrice
    get submittedPrice() {
        // check undefined
        if (this.itemData.submittedPrice == undefined) {
            this.itemData.submittedPrice = 0;
        }

        // check product common fee and data common fee
        if (this.itemData.itemType >= QuotationItemType.FEE_1) {
            this.updatePriceProductCommon();
        }
        return this.itemData.submittedPrice;
    }

    set submittedPrice(value: number) {
        this.itemData.submittedPrice = FormatUtil.isNaN(value);
        this.itemData.total          = FormatUtil.isNaN(this.itemData.submittedPrice) * FormatUtil.isNaN(this.itemData.quantity);

        // update data total
        this.emitChangeCalculatorData();
    }

    // no
    get no() {
        return this.itemData.no;
    }

    get identity() {
        return this.itemData.identity;
    }

    // total
    get total() {
        if (this.itemData.total == undefined || this.isEmptyUnit) {
            this.itemData.total = 0;
        }
        return MathUtil.round(this.itemData.total, 0);
    }

    // get dealProduct
    get dealProduct() {
        return this.dealData;
    }

    // get dealProductId(){
    get dealProductId() {
        return this.itemData.dealProductId;
    }

    // get product
    get product() {
        if (this.itemData.dealProduct != undefined) {
            return this.itemData.dealProduct.product;
        } else {
            return new Product();
        }
    }

    // interestRate
    get interestRate(): string {
        return this._interestRate;
    }

    setInterestRate(offer: Offer) {
        let rate           = MathUtil.roundDecimal(MathUtil.checkNaN((offer.unitPrice - offer.productOutput.estimatedUnitPrice) / offer.unitPrice) * 100, 2);
        this._interestRate = "" + rate + " %";
    }

    // Update product common fee
    updatePriceProductCommon() {
        if (this.itemData.itemType >= QuotationItemType.FEE_1) {
            // check data itemType
            switch (this.itemData.itemType) {
                case 4:
                    this.itemData.submittedPrice = this.itemData.dealProduct.product.productCommon.designFee;
                    break;
                case 5:
                    this.itemData.submittedPrice = this.itemData.dealProduct.product.productCommon.plateMakingFee;
                    break;
                case 6:
                    this.itemData.submittedPrice = this.itemData.dealProduct.product.productCommon.woodenFee;
                    break;
                case 7:
                    this.itemData.submittedPrice = this.itemData.dealProduct.product.productCommon.moldFee;
                    break;
                case 8:
                    this.itemData.submittedPrice = this.itemData.dealProduct.product.productCommon.resinFee;
                    break;
                default:
                    this.itemData.submittedPrice = 0;
                    break;
            }
            // calculator total
            this.itemData.total = this.itemData.quantity * this.itemData.submittedPrice;
            // emit change calculator and update data parent
            this.emitChangeCalculatorData();
        }
    }

    // emit change calculator data quotation info
    emitChangeCalculatorData() {
        this.pageData.updateDataParent();
        this.pageData.getChangeCalculator();
    }

    eventChange() {
        this.pageData.checkEdit = true;
    }

    viewDetailProduct(product: Product) {
        let dealCode = this.pageData.deal.dealCode;

        PathUtil.redirectToPageProduct(this.router,dealCode,product.productCode,product.productType,product.shapeId,product.cartonShippingType);
    }
}
