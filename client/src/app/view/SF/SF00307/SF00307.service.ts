import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {CommonService} from "../../../service/common.service";
import {SF00307Data} from "./SF00307.data";
import {DealInfoModel} from "../COMMON/dealinfo/model/DealModel";
import {QuotationModel} from "./model/Quotation.model";
import {ProductBoxModel} from "./model/ProductBox.model";
import {ProductInfoModel} from "../COMMON/productinfo/model/ProductInfo.model";
import {TransactionModel} from "../COMMON/productinfo/model/Transaction.model";
import {InventoryModel} from "../COMMON/productinfo/model/Inventory.model";
import {ShippingDestinationModel} from "./model/ShippingDestination.model";
import {ShippingInstructionModel} from "./model/ShippingInstruction.model";
import {DEAL_STATUS_VALUES} from "../../../helper/mst-data-type";

@Injectable()
export class SF00307Service extends CommonService {

    private _pageData: SF00307Data;

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    public get pageData(): SF00307Data {
        return this._pageData;
    }

    //1. get init data
    public initData(dealCode: string): Promise<void> {
        return this.getApi("SF0030701/" + dealCode).then(res => {
            this._pageData = new SF00307Data();
            let data = res.data;
            //1. deal info
            let dealInfo = data['deal'];
            this.pageData.dealInfo = new DealInfoModel();
            if (dealInfo) {
                this.pageData.dealInfo.dealId = dealInfo["id"];
                this.pageData.dealInfo.dealName = dealInfo["dealName"];
                this.pageData.dealInfo.dealCode = dealInfo["dealCode"];
                this.pageData.dealInfo.dealType = dealInfo["dealType"];
                this.pageData.dealInfo.estimateTotal = dealInfo["estTotalDeal"];
                this.pageData.dealInfo.dealStatus = dealInfo["dealStatus"];
                this.pageData.dealInfo.deliveryDate = !!dealInfo["deliveryDate"] ? new Date(dealInfo["deliveryDate"]) : undefined;
                this.pageData.dealInfo.templateFlag = dealInfo["templateFlag"];
                this.pageData.dealInfo.closedFlag = dealInfo["closedFlag"];
                this.pageData.dealInfo.customerName = dealInfo["customerName"];
                this.pageData.dealInfo.customerCode = dealInfo["customerCode"];
                this.pageData.dealInfo.saleName = dealInfo["salerName"];
            }
            //2. get list quotations by dealId
            let quotations = data['quotations'];
            this.pageData.quotations = [];
            if (quotations) {
                for (let quotation of quotations) {
                    let quotationTmp = new QuotationModel();

                    quotationTmp.id = quotation['id'];
                    quotationTmp.interestRate = quotation['interestRate'];
                    quotationTmp.memo = quotation['memo'];
                    quotationTmp.quotationCode = quotation['quotationCode'];
                    quotationTmp.subject = quotation['subject'];
                    quotationTmp.lot = quotation['lot'];
                    quotationTmp.unitPrice = quotation['unitPrice'];
                    quotationTmp.totalCost = quotation['totalCost'];

                    this.pageData.quotations.push(quotationTmp);
                }
            }

            //6.  mst shipping detination
            this.pageData.shippingHistory = (data["shippingHistory"] || [])
                .map(item => {
                    let shippingParse = new ShippingDestinationModel();
                    shippingParse.setShippingDestination(item);
                    if (!shippingParse.timePermission) {
                        shippingParse.timePermission = 10;
                    }
                    return shippingParse;
                });

            if (this.pageData.shippingHistory.length > 0) {
                this.selectShippingDestination(this.pageData.shippingHistory[0]);
                this.pageData._selectShipment = this.pageData.shippingHistory[0];
            }
            else {
                this.selectShippingDestination(null);
                this.pageData._selectShipment = null;
            }


            //3. product box
            let productBoxes = data['productBoxes'];
            this.pageData.productBoxs = [];
            if (productBoxes) {
                for (let productB of productBoxes) {
                    let productBox = new ProductBoxModel();
                    //1.product info
                    let pd = new ProductInfoModel();

                    let product = productB['product'];
                    pd.id = product["id"];
                    pd.updatedDate = product["updatedDate"] == null ? null : new Date(product["updatedDate"]);
                    pd.productName = product["productName"];
                    pd.sizeW = product["sizeW"];
                    pd.sizeD = product["sizeD"];
                    pd.sizeH = product["sizeH"];
                    pd.paperNameId = product["paperNameId"];
                    pd.paperWeight = product["paperWeight"];
                    pd.customerProductCode = product["customerProductCode"];
                    pd.productCode = product["productCode"];
                    pd.originalName = product["originalName"];
                    pd.lot = product["lot"];
                    pd.memo = product["memo"];
                    pd.srcImg = product["srcImg"];
                    pd.unitPrice = product["unitPrice"];
                    pd.woodenCode = product["woodenCode"];
                    pd.factoryId = product["factoryId"];
                    pd.productType = product["productType"];
                    pd.totalCost = product["totalCost"];
                    pd.shapeId = product["shapeId"];
                    pd.requestProduction = product["requestProduction"];

                    productBox.product = pd;
                    //2.transactions
                    let transactions = productB['transactions'];
                    productBox.transactions = [];
                    for (let transaction of transactions) {
                        let transactionTmp = new TransactionModel();

                        transactionTmp.updatedDate = transaction["updatedDate"] == null ? null : new Date(transaction["updatedDate"]);
                        transactionTmp.dealName = transaction["dealName"];
                        transactionTmp.quantity = transaction["quantity"];
                        transactionTmp.submittedPrice = transaction["submittedPrice"];
                        transactionTmp.total = transaction["total"];

                        productBox.transactions.push(transactionTmp);
                    }
                    //3. inventory
                    let inventory = productB['inventory'];
                    let invenModel = new InventoryModel();
                    invenModel.productName = inventory['productName'];
                    invenModel.quantity = inventory['quantity'];
                    invenModel.unitPrice = inventory['unitPrice'];
                    invenModel.days = inventory['days'];

                    productBox.inventory = invenModel;
                    // parse data
                    this.pageData.productBoxs.push(productBox);
                }
                // check unitPrice
                this.pageData.shippingInstructions = [];
                if (this.pageData.productBoxs.length == 1 && !!this.pageData.productBoxs[0].product.unitPrice) {
                    this.pageData.productBoxs[0].checked = true;
                    //5. get request oder shipping
                    this.addProductShippingInstruction(this.pageData.productBoxs[0]);
                }
            }
        }).catch(err => {
            throw err;
        });
    }

    //2. request order
    public requestOrder(): Promise<void> {
        let self = this;
        let req = {
            dealId: this.pageData.dealInfo.dealId,
            shippingDestination: this.pageData.shippingModel,
            shippingInstructions: this.pageData.shippingInstructions
        };
        return this.postApi("/SF0030704", req)
            .then(res => {
                self.pageData.fallbackDeal = res.data.dealCode;
                self.pageData.dealInfo.dealStatus = DEAL_STATUS_VALUES.ORDER_CONFIRMED;
            })
            .catch(err => {
                throw err;
            });
    }

    //3. find list productList by quotationId
    public findProductList(quotationId: number, dealId: number): Promise<void> {
        let request = {
            quotationId: quotationId,
            dealId: dealId
        }

        return this.postApi('SF0030703', request).then(res => {
            let data = res.data;
            //3. product box
            let productBoxes = data['productBoxes'];
            this._pageData.productBoxs = [];
            if (productBoxes) {
                for (let productB of productBoxes) {
                    let productBox = new ProductBoxModel();
                    //1.product info
                    let pd = new ProductInfoModel();

                    let product = productB['product'];
                    if(!!product){
                        pd.setData(product);
                    }

                    productBox.product = pd;
                    //2.transactions
                    let transactions = productB['transactions'];
                    productBox.transactions = [];
                    for (let transaction of transactions) {
                        let transactionTmp = new TransactionModel();

                        transactionTmp.updatedDate = transaction["updatedDate"] == null ? null : new Date(transaction["updatedDate"]);
                        transactionTmp.dealName = transaction["dealName"];
                        transactionTmp.quantity = transaction["quantity"];
                        transactionTmp.submittedPrice = transaction["submittedPrice"];
                        transactionTmp.total = transaction["total"];

                        productBox.transactions.push(transactionTmp);
                    }
                    //3. inventory
                    let inventory = productB['inventory'];
                    let invenModel = new InventoryModel();
                    invenModel.productName = inventory['productName'];
                    invenModel.quantity = inventory['quantity'];
                    invenModel.unitPrice = inventory['unitPrice'];
                    invenModel.days = inventory['days'];

                    productBox.inventory = invenModel;
                    // parse data
                    this._pageData.productBoxs.push(productBox);
                }
                // check unitPrice
                this.pageData.shippingInstructions = [];
                if (this.pageData.productBoxs.length == 1 && !!this.pageData.productBoxs[0].product.unitPrice) {
                    this.pageData.productBoxs[0].checked = true;
                    //5. get request oder shipping
                    this.addProductShippingInstruction(this.pageData.productBoxs[0]);
                }
            }
        }).catch(err => {
            throw err;
        });
    }

    exportProduction(productId: number, dealCode: string): Promise<{fileName: string, filePath: string}> {
        let shippingInstruction = this.pageData.shippingInstructions.find(item => item.productId === productId);
        let req = {
            productId: productId,
            shippingInstruction: shippingInstruction,
            dealCode: dealCode
        };
        return this.postApi("/SF0030702", req)
            .then(res => {
                return {fileName: res.data.fileName, filePath: res.data.filePath};
            })
            .catch(err => {
                throw err;
            });
    }

    public addProductShippingInstruction(box: ProductBoxModel) {
        // check list shipping instruction undefined
        let shippingInstruction: ShippingInstructionModel = new ShippingInstructionModel();
        shippingInstruction.productId = box.product.id;
        shippingInstruction.productCode = box.product.productCode;
        shippingInstruction.productName = box.product.productName;
        shippingInstruction.loadingAddressId = 1; // TODO: remove this harded-code
        shippingInstruction.quantity = box.product.lot;
        shippingInstruction.submittedPrice = box.product.unitPrice;
        shippingInstruction.shipTime = !!this.pageData.shippingModel
            ? this.pageData.shippingModel.timePermission : 10;

        shippingInstruction.shipDate = this.pageData.dealInfo.deliveryDate ?
            new Date(this.pageData.dealInfo.deliveryDate.getTime() - 24 * 60 * 60 * 1000) : null;
        shippingInstruction.defaultShipDate = shippingInstruction.shipDate;
        const COMPANY: number = 1;
        shippingInstruction.shippingCompanyId = COMPANY; // refer SHIPPING_COMPANY
        const ALL_NONE: number = 4;
        shippingInstruction.limitQuantity = ALL_NONE; // refer LIMIT_QUANTITY

        this.pageData.shippingInstructions.push(shippingInstruction);
    }

    public removeProductShippingInstruction(box: ProductBoxModel) {
        let itemIndex = this.pageData.shippingInstructions
            .findIndex(item => item.productId === box.product.id);

        if (itemIndex >= 0)
            this.pageData.shippingInstructions.splice(itemIndex, 1);
    }

    public selectShippingDestination(source: ShippingDestinationModel) {
        let target = new ShippingDestinationModel();
        if (!!source) {
            target.deliveryName = source.deliveryName;
            target.deliveryAddress1 = source.deliveryAddress1;
            target.tel = source.tel;
            target.fax = source.fax;
            target.availableVehicleSize = source.availableVehicleSize;
            target.requiredTime = source.requiredTime;
            target.extraWork = source.extraWork;
            target.extraMethod = source.extraMethod;
            target.memo1 = source.memo1;
            target.saveToDennoFlag = 0;
            target.customerId = source.customerId;
            target.districtCode = source.districtCode;
            target.abbreviation = source.abbreviation;
            target.furigana = source.furigana;
            target.abbrFurigana = source.abbrFurigana;
            target.postalCode = source.postalCode;
            target.deliveryAddress2 = source.deliveryAddress2;
            target.extension = source.extension;
            target.timePermission = source.timePermission;
            target.defaultFlag = 0;
            target.deptName = source.deptName;
            target.salerName = source.salerName;
            target.formNameId = source.formNameId;
            target.dennoPartnerCode = source.dennoPartnerCode;
        }
        this.pageData.shippingModel = target;
        this.setShiptimeForAllShippingInstructions(this.pageData.shippingModel.timePermission);
    }

    public setShiptimeForAllShippingInstructions(val: number) {
        (this.pageData.shippingInstructions || []).forEach(item => item.shipTime = val);
    }


}
