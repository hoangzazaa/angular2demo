import {Deal} from "../../../model/core/Deal.model";
import {Quotation} from "../../../model/core/Quotation.model";
import {QuotationItem} from "../../../model/core/QuotationItem.model";
import {DealProduct} from "../../../model/core/DealProduct.model";
import {Injectable} from "@angular/core";
import {Constants} from "../../../helper/constants";
import {User} from "../../../model/core/User.model";
import {Department} from "../../../model/core/Department.model";
import {FormatUtil} from "../../../util/format-util";
import {QuotationItemType} from "../../../helper/enum-type";
import {Offer} from "../../../model/core/Offer.model";
import {MstLamination} from "../COMMON/model/MstLamination.model";
import DataUtil from "../../../util/data-util";
import {PRODUCT_UNIT} from "../../../helper/mst-data-type";

@Injectable()
export class SF00303Data {
    DEFAULT_LOT: number = 5000;
    lotTotal            = 0;
    placeholder         = "一括納品";
    defaultEstimateDate: Date;
    defaultInvoiceExpirationDate: Date;
    /*message*/
    private _message: string;
    /*check status page*/
    private _status: string;
    /*check viewMode table quotation item*/
    private _viewMode = true;
    /*check view page sf00303*/
    private _view: boolean = false;
    /*check inited*/
    private _inited = true;
    /*check setTmpIndex*/
    private _setTmpIndex: number = 0;
    /*totalExcludedTax*/
    private _totalExcludedTax: number = 0;
    /*consumptionTax*/
    private _consumptionTax: number = 0;
    /*totalCost*/
    private _totalCost: number = 0;
    /*deal model*/
    private _deal: Deal = new Deal();
    /*quotation model*/
    private _quotation: Quotation = new Quotation();
    /*list quotation item*/
    private _quotationItems: QuotationItem[] = [];
    /*list deal product*/
    private _dealProducts: DealProduct[] = [];

    private _checkEdit: boolean = false;

    private _saleByCustomer: User = new User();

    private _departmentByCustomer: Department = new Department();

    private _mstLaminations: MstLamination[];

    private _nextNegativeId: number = -1;

    mstProductUnit(): {id: any, name: string}[] {
        return DataUtil.toSelectBoxDataSource(PRODUCT_UNIT);
    }

    public nextNegativeId(): number {
        return this._nextNegativeId--;
    }

    get mstLaminations(): MstLamination[] {
        return this._mstLaminations;
    }

    set mstLaminations(value: MstLamination[]) {
        this._mstLaminations = value;
    }

    get departmentByCustomer(): Department {
        return this._departmentByCustomer;
    }

    set departmentByCustomer(value: Department) {
        this._departmentByCustomer = value;
    }

    get saleByCustomer(): User {
        return this._saleByCustomer;
    }

    set saleByCustomer(value: User) {
        this._saleByCustomer = value;
    }

    get checkEdit(): boolean {
        return this._checkEdit;
    }

    set checkEdit(value: boolean) {
        this._checkEdit = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get viewMode(): boolean {
        return this._viewMode;
    }

    set viewMode(value: boolean) {
        this._viewMode = value;
    }

    get view(): boolean {
        return this._view;
    }

    set view(value: boolean) {
        this._view = value;
    }

    get inited(): boolean {
        return this._inited;
    }

    set inited(value: boolean) {
        this._inited = value;
    }

    get setTmpIndex(): number {
        return this._setTmpIndex;
    }

    set setTmpIndex(value: number) {
        this._setTmpIndex = value;
    }

    get totalExcludedTax(): number {
        return this._totalExcludedTax;
    }

    set totalExcludedTax(value: number) {
        this._totalExcludedTax = value;
    }

    get consumptionTax(): number {
        return this.totalExcludedTax * Constants.PERCENT;
    }

    set consumptionTax(value: number) {
        this._consumptionTax = value;
    }

    get totalCost(): number {
        this._totalCost = this.totalExcludedTax + this.consumptionTax;
        if (this._totalCost > 99999999) {
            this._totalCost = 99999999;
        }
        this.quotation.totalCost = FormatUtil.isNaN(this._totalCost);
        return this._totalCost;
    }

    set totalCost(value: number) {
        this._totalCost = value;
    }

    get deal(): Deal {
        return this._deal;
    }

    set deal(value: Deal) {
        this._deal = value;
    }

    get quotation(): Quotation {
        return this._quotation;
    }

    set quotation(value: Quotation) {
        this._quotation = value;
    }

    get quotationItems(): QuotationItem[] {
        return this._quotationItems;
    }

    set quotationItems(value: QuotationItem[]) {
        this._quotationItems = value;
    }

    get dealProducts(): DealProduct[] {
        return this._dealProducts;
    }

    set dealProducts(value: DealProduct[]) {
        this._dealProducts = value;
    }

    checkLotValue() {
        // check lot
        let lot = 0;
        // get lot
        if (this.quotationItems) {
            this.quotationItems.forEach(item => {
                // check no index
                if (item.no)
                    lot += FormatUtil.isNaN(item.quantity);
            })
        }
        // set lot total
        this.lotTotal = lot;
    }

    /*Update display no*/
    updateDisplayNo() {
        // update displayNo
        let displayNo = 0;
        this.quotationItems.forEach((item) => {
            if ((item.itemType == QuotationItemType.SET)
                || ((item.itemType >= QuotationItemType.PRODUCT) && (item.setClosedFlag == undefined))) {
                // if item is set or normal item
                displayNo++;
                item.no = displayNo;
            } else {
                item.no = undefined;
            }
        });
    }

    calculatorQuantity() {
        if (this.quotationItems) {
            this.quotationItems.forEach(itemData => {
                if (itemData.dealProduct) {
                    let offers = itemData.dealProduct.offers;
                    // check product output
                    if (offers != undefined
                        && offers.length > 0
                        && itemData.quantity >= 0
                        && QuotationItemType.PRODUCT == itemData.itemType) {

                        // sort quantity
                        let length = offers.length;
                        offers.sort((n1, n2) => {
                            if (n1.productOutput.lot > n2.productOutput.lot) {
                                return 1;
                            }
                            if (n1.productOutput.lot < n2.productOutput.lot) {
                                return -1;
                            }
                            return 0;
                        });

                        //2. check list lot primaryFlag != 1
                        let tmpOffer: Offer = undefined;

                        for (let i = 0; i < length; i++) {
                            if (itemData.quantity >= offers[i].productOutput.lot) {
                                tmpOffer                = offers[i];
                                itemData.submittedPrice = offers[i].unitPrice;
                            }
                        }

                        if (tmpOffer == undefined) {
                            // 2.1 if quantity < lot min then submit price= 0
                            itemData.submittedPrice = 0;
                        } else {
                            // 2.2 if quantity = [A,B) -> submit price = f(A)
                            itemData.submittedPrice = tmpOffer.unitPrice;
                        }

                        itemData.total = FormatUtil.isNaN(itemData.quantity) *
                            FormatUtil.isNaN(itemData.submittedPrice);
                        // emit change calculator and update data parent
                        this.getChangeCalculator();
                    }
                }
            });
        }

    }

    /*Calculator*/
    getChangeCalculator() {
        this.totalExcludedTax = 0;
        /*TODO interestRate*/
        // let interestRate = 0;
        for (let i = 0; i < this.quotationItems.length; i++) {
            if (this.quotationItems[i].parentId == null) {
                this.totalExcludedTax += FormatUtil.isNaN(this.quotationItems[i].total);
            }
        }
    }

    /*Update data parent*/
    updateDataParent() {
        this.quotationItems.forEach(item => {
            if (item.itemType == QuotationItemType.SET) {
                let total     = 0;
                let quantity  = 0;
                let submitted = 0;
                this.quotationItems.forEach(itemChid => {
                    if (itemChid.parentId == item.id) {
                        if (quantity < itemChid.quantity) {
                            quantity = itemChid.quantity;
                        }
                        // submitted
                        submitted += FormatUtil.isNaN(itemChid.submittedPrice);
                        // total
                        total += FormatUtil.isNaN(itemChid.total);
                    }

                })
                // update data item quotation
                item.quantity       = quantity;
                item.submittedPrice = submitted;
                item.total          = total;
            }
        })
    }

}
