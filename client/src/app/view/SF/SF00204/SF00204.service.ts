import {Injectable} from "@angular/core";
import {CommonService} from "../../../service/common.service";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {SF00204FilterModel} from "./model/SF00204Filter.model";
import {Constants} from "../../../helper/constants";
import {SF00204Data} from "./SF00204.data";
import {ProductInfoModel} from "../COMMON/productinfo/model/ProductInfo.model";
import {TransactionModel} from "../COMMON/productinfo/model/Transaction.model";
import {InventoryModel} from "../COMMON/productinfo/model/Inventory.model";
import {ProductBoxModel} from "../COMMON/productinfo/model/ProductBox.model";
import {MstLamination} from "../COMMON/model/MstLamination.model";
import {ProductModel} from "../COMMON/model/Product.model";

@Injectable()
export class SF00204Service extends CommonService {
    constructor(http: Http, router: Router) {
        super(http, router);
    }

    pageData: SF00204Data;

    //1. init
    public initData(): Promise<void> {
        this.pageData = new SF00204Data();
        return this.getResult(Constants.FIRST_PAGE);
    }

    //2. search
    public getResult(pageIndex?: number): Promise<void> {
        // create page data
        return this.pageData.advancedSearchFlg || this.pageData.hasAtLeastOneKeyword ?
            this.getSearchResult(pageIndex)
            : this.getLinearResult(pageIndex);
    }

    //3. add product to deal
    public addProductToDeal(productId: number, dealCodeBefore: string, dealCodeAfter: string): Promise<void> {
        let req = {
            productId: productId,
            dealCodeBefore: dealCodeBefore,
            dealCodeAfter: dealCodeAfter
        }
        return this.postApi("/SF0020403", req).then(res => {
        }).catch(err => {
            throw  err;
        });
    }

    /**
     * Service to get deals by search key on search input text
     * @returns {Promise<void>}
     */
    private getSearchResult(page?: number): Promise<void> {
        let self = this;
        let req = self.parseToSearchRequest(self.pageData.ruleFilter);
        req.keywords = self.pageData.keywords;
        req.page = page || Constants.FIRST_PAGE;
        req.pageSize = self.pageData.CONSTANTS.PAGE_SIZE;

        return self.postApi("/SF0020402", req)
            .then(res => {
                let data = res.data;

                self.pageData.productBoxs = [];
                let productBoxs = data["productBoxes"];
                if (productBoxs) {
                    for (let productBox of productBoxs) {
                        let productBoxTmp = new ProductBoxModel();

                        productBoxTmp.product = this.parseProduct(productBox["product"]);
                        productBoxTmp.transactions = this.parseTransaction(productBox["transactions"]);
                        productBoxTmp.inventory = this.parseInventory(productBox["inventory"]);
                        productBoxTmp.dealCode = productBox["dealCode"];

                        self.pageData.productBoxs.push(productBoxTmp);
                    }
                }
                self.pageData.totalRecords = data.totalRecords || 0;
                self.pageData.currentPage = page;

                // get list mst lamination
                if (!!data["laminationJsons"]) {
                    for (let lamination of data["laminationJsons"]) {
                        let mstLamination = new MstLamination();
                        mstLamination.setData(lamination);
                        self.pageData.mstLaminations.push(mstLamination);
                    }
                }
            }).catch(err => {
                throw err;
            });
    }

    private getLinearResult(page?: number): Promise<void> {
        let self = this;

        let req = {
            indexFrom: ((page || Constants.FIRST_PAGE) - 1) * self.pageData.CONSTANTS.PAGE_SIZE,
            indexTo: self.pageData.CONSTANTS.PAGE_SIZE
        };

        return self.postApi("/SF0020401", req)
            .then(res => {
                let data = res.data;

                self.pageData.productBoxs = [];
                let productBoxs = data["productBoxes"];
                if (productBoxs) {
                    for (let productBox of productBoxs) {
                        let productBoxTmp = new ProductBoxModel();

                        productBoxTmp.product = this.parseProduct(productBox["product"]);
                        productBoxTmp.transactions = this.parseTransaction(productBox["transactions"]);
                        productBoxTmp.inventory = this.parseInventory(productBox["inventory"]);
                        productBoxTmp.dealCode = productBox["dealCode"];

                        self.pageData.productBoxs.push(productBoxTmp);
                    }
                }
                self.pageData.totalRecords = data.totalRecords || 0;
                self.pageData.currentPage = page;

                // get list mst lamination
                if (!!data["laminationJsons"]) {
                    for (let lamination of data["laminationJsons"]) {
                        let mstLamination = new MstLamination();
                        mstLamination.setData(lamination);
                        self.pageData.mstLaminations.push(mstLamination);
                    }
                }

            }).catch(err => {
                throw err;
            });
    }

    public parseToSearchRequest(ruleFilter: SF00204FilterModel): any {
        return {
            "dealCode": ruleFilter.dealCode,
            "dealName": ruleFilter.dealName,
            "salesName": ruleFilter.salesName,
            "dealType": ruleFilter.dealType,
            "customerCode": ruleFilter.customerCode,
            "customerName": ruleFilter.customerName,
            "contactName": ruleFilter.contactName,
            "productCode": ruleFilter.productCode,
            "productName": ruleFilter.productName,
            "shapeId": ruleFilter.shapeId,
            "productApplication": ruleFilter.productApplication,
            "sizeW": ruleFilter.sizeW,
            "sizeD": ruleFilter.sizeD,
            "sizeH": ruleFilter.sizeH,
            "paperName": ruleFilter.paperName,
            "printMethod": ruleFilter.printMethod,
            "orderValueFrom": ruleFilter.orderValueFrom,
            "orderValueTo": ruleFilter.orderValueTo,
            "orderLotFrom": ruleFilter.lotFrom,
            "orderLotTo": ruleFilter.lotTo,
            "periodType": ruleFilter.periodType,
            "periodFrom": ruleFilter.periodFrom,
            "dealStatus": ruleFilter.dealStatus,
            "periodTo": ruleFilter.periodTo,
            "customerProductCode": ruleFilter.customerProductCode
        }
    }

    public parseProduct(product: any): ProductInfoModel{
        let pd = new ProductInfoModel();

        if (!!product) {
            pd.setData(product);
        }

        return pd;
    }

    public parseTransaction(transactions: any): TransactionModel[] {
        let arrTransactions: TransactionModel[] = [];

        if (transactions) {
            for (let transaction of transactions) {
                let transactionTmp = new TransactionModel();

                transactionTmp.productId = transaction["productId"];
                transactionTmp.updatedDate = transaction["updatedDate"] == null ? null : new Date(transaction["updatedDate"]);
                transactionTmp.dealName = transaction["dealName"];
                transactionTmp.quantity = transaction["quantity"];
                transactionTmp.submittedPrice = transaction["submittedPrice"];
                transactionTmp.total = transaction["total"];

                arrTransactions.push(transactionTmp);
            }
        }

        return arrTransactions;
    }

    public parseInventory(inventory: any): InventoryModel {
        let invenModel = new InventoryModel();

        if (inventory) {
            invenModel.productName = inventory['productName'];
            invenModel.quantity = inventory['quantity'];
            invenModel.unitPrice = inventory['unitPrice'];
            invenModel.days = inventory['days'];
        }

        return invenModel;
    }

}
