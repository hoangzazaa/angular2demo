import {ShippingPlanModel} from "./ShippingPlan.model";
import {PIBProduct} from "../../../../component/product-info-box/model/PIBProduct.model";
import {ProductModel} from "./Product.model";
import {PIBManufacture} from "../../../../component/product-info-box/model/PIBManufacture.model";
import {DateUtil} from "../../../../util/date-util";
/**
 * Order Item model for SFN0307
 */
export class OrderItemModel implements PIBProduct, PIBManufacture {

    // id
    id: number;
    // product
    productId: number;
    // quantity
    quantity: number;
    // orderCode
    orderCode: string;
    // orderCode2
    orderCode2: string;
    // unit price
    unitPrice: number;
    // productionSpecs
    productionSpecs: number;
    // printVersion
    printVersion: number;
    // wooden
    wooden: number;
    // mold
    mold: number;
    // passageOrder
    passageOrder: string;
    // sampleLift
    sampleLift: number;
    // sampleSales
    sampleSales: number;
    // sampleCustomer
    sampleCustomer: number;
    // sampleItem
    sampleItem: number;
    // sampleProduct
    sampleProduct: number;
    // specialNotesFilled
    specialNote: string;
    // 相手管理No
    customerManagedId: string;

    // shippings
    shippings: ShippingPlanModel[];

    // checked
    checked: boolean;
    // product
    product: ProductModel;

    get pib_check(): boolean {
        return this.checked;
    }

    set pib_check(value: boolean) {
        this.checked = value;
    }

    get pib_image(): string {
        return this.product.image;
    }

    get pib_code(): string {
        return this.product.code;
    }

    get pib_type_name(): string {
        return this.product.type_name;
    }

    get pib_type(): number {
        return this.product.type;
    }

    get pib_name(): string {
        return this.product.name;
    }

    get pib_itemCode(): string {
        return this.product.itemCode;
    }

    get pib_size(): string {
        return this.product.size;
    }

    get pib_material(): string {
        return this.product.material;
    }

    get pib_memo(): string {
        return this.product.memo;
    }

    get pib_customerProductCode(): string {
        return this.product.customerProductCode;
    }

    get pib_manufacture(): string {
        return this.product.manufacture;
    }

    get pib_lot(): number {
        return this.quantity;
    }

    set pib_lot(value: number) {
        this.quantity = value;
        this.product.total = Math.round(this.unitPrice * this.quantity);
    }

    get pib_orderCode(): string {
        return this.orderCode;
    }

    set pib_orderCode(value: string) {
        this.orderCode = value;
    }

    get pib_orderCode2(): string {
        return this.orderCode2;
    }

    set pib_orderCode2(value: string) {
        this.orderCode2 = value;
    }

    get pib_unitPrice(): number {
        return this.unitPrice;
    }

    set pib_unitPrice(value: number) {
        this.unitPrice = value;
        this.product.total = Math.round(this.unitPrice * this.quantity);
    }

    get pib_total(): number {
        if (isNaN(this.product.total)) {
            return 0;
        } else {
            return this.product.total;
        }
    }

    get pib_updateDate(): Date {
        return this.product.updateDate;
    }

    set pib_updateDate(value: Date) {
        this.product.updateDate = value;
    }


    get pib_productionSpecs(): number {
        return this.productionSpecs;
    }

    set pib_productionSpecs(value: number) {
        this.productionSpecs = value;
    }

    get pib_printVersion(): number {
        return this.printVersion;
    }

    set pib_printVersion(value: number) {
        this.printVersion = value;
    }

    get pib_wooden(): number {
        return this.wooden;
    }

    set pib_wooden(value: number) {
        this.wooden = value;
    }

    get pib_mold(): number {
        return this.mold;
    }

    set pib_mold(value: number) {
        this.mold = value;
    }

    get pib_passageOrder(): string {
        return this.passageOrder;
    }

    set pib_passageOrder(value: string) {
        this.passageOrder = value;
    }

    get pib_sampleLift(): number {
        return this.sampleLift;
    }

    set pib_sampleLift(value: number) {
        this.sampleLift = value;
    }

    get pib_sampleSales(): number {
        return this.sampleSales;
    }

    set pib_sampleSales(value: number) {
        this.sampleSales = value;
    }

    get pib_sampleCustomer(): number {
        return this.sampleCustomer;
    }

    set pib_sampleCustomer(value: number) {
        this.sampleCustomer = value;
    }

    get pib_sampleItem(): number {
        return this.sampleItem;
    }

    set pib_sampleItem(value: number) {
        this.sampleItem = value;
    }

    get pib_sampleProduct(): number {
        return this.sampleProduct;
    }

    set pib_sampleProduct(value: number) {
        this.sampleProduct = value;
    }

    get pib_specialNote(): string {
        return this.specialNote;
    }

    set pib_specialNote(value: string) {
        this.specialNote = value;
    }

    get pib_customerManagedId(){
        return this.customerManagedId;
    }

    set pib_customerManagedId(value: string){
        this.customerManagedId = value;
    }

    /** 木型有効期限情報 NONE: 木型なし, NO: 有効期限情報なし, EXPIRED: 有効期限切れ, OK: 有効期限内 */
    get pib_woodenExpireType(): 'NONE'|'NO'|'EXPIRED'|'OK'  {
        let product = this.product;
        if (!product.hasWooden) {
            return 'NONE';      // 木型なし
        } else if (!product.woodenExpiredDate) {
            return 'NO';        // 有効期限情報なし
        }

        // 有効期限チェック
        let target: Date = DateUtil.getDate(product.woodenExpiredDate.toString());
        return target.getTime() < new Date().getTime() ? 'EXPIRED' : 'OK';
    }

    /** 木型有効期限の表示文字列 */
    get pib_woodenExpireDate(): string {
        let product = this.product;
        if (product.woodenExpiredDate) {
            return DateUtil.formatDate(product.woodenExpiredDate, 'YYYY年M月D日');
        } else {
            return '';
        }
    }
}
