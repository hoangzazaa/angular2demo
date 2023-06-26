import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {Constants} from "../../../helper/constants";
import {MSG} from "../../../helper/message";
import {DEAL_STATUS_VALUES, DEAL_TYPE_VALUES, TEMPLATE_DEAL} from "../../../helper/mst-data-type";
import {CommonService} from "../../../service/common.service";
import ValidatorUtil from "../../../util/validator-util";
import {MstLamination} from "../COMMON/model/MstLamination.model";
import {SF00301_Comment} from "./model/SF00301_Comment.model";
import {SF00301_Customer} from "./model/SF00301_Customer.model";
import {SF00301_Deal} from "./model/SF00301_Deal.model";
import {SF00301_DealFile} from "./model/SF00301_DealFile.model";
import {SF00301_Department} from "./model/SF00301_Department.model";
import {SF00301_FileItem} from "./model/SF00301_Modal.modal";
import {SF00301_OrderItem} from "./model/SF00301_OrderItems.model";
import {SF00301_Product} from "./model/SF00301_Product.model";
import {SF00301_ProductFile} from "./model/SF00301_ProductFile.model";
import {SF00301_Quotation} from "./model/SF00301_Quotation.model";
import {SF00301_User} from "./model/SF00301_User.model";
import {SF0030103Req} from "./request/SF0030103.req";
import {SF0030104Req} from "./request/SF0030104.req";
import {SF0030105Req} from "./request/SF0030105.req";
import {SF0030117Req} from "./request/SF0030117.req";
import {SF0030101Res} from "./response/SF0030101.res";
import {SF00301Data} from "./SF00301.data";

declare let App: any;

type SF00301_ConcernItem = {
    id: number;
    category: symbol;
}

@Injectable()
export class SF00301Service extends CommonService {

    static MODE_OPEN: symbol   = Symbol("SF00301Service.MODE_OPEN");
    static MODE_CREATE: symbol = Symbol("SF00301Service.MODE_CREATE");
    static MODE_COPY: symbol   = Symbol("SF00301Service.MODE_COPY");

    private _pageData: SF00301Data  = new SF00301Data();
    private _nextNegativeId: number = -1;

    /*List item base model*/
    private concernItemDataSource: SF00301_ConcernItem[] = [];

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    public get pageData(): SF00301Data {
        return this._pageData;
    }

    public initData(mode: symbol, dealCode?: string): Promise<void> {
        let self = this;

        App.loader('show');
        if (mode === SF00301Service.MODE_CREATE) {
            return this.getApi("/SF0030101")
                .then(res => {
                    let pageData                 = new SF00301Data();
                    pageData.screenMode          = mode;
                    pageData.user                = self.parseUser(res.data["user"]);
                    pageData.deal                = new SF00301_Deal();
                    pageData.deal.isSaved        = false;
                    pageData.deal.dealType       = DEAL_TYPE_VALUES.EXISTING_VERSION;
                    pageData.deal.templateFlag   = TEMPLATE_DEAL.FALSE;
                    pageData.deal.dealStatus     = DEAL_STATUS_VALUES.NEW_EDITION;
                    pageData.departments         = self.parseDepartments(res.data["departments"]);
                    pageData.customers           = [];
                    pageData.deal.saler          = self.parseUser(res.data["user"]);
                    pageData.defaultDeliveryDate = pageData.deal.deliveryDate;
                    pageData.relatedDeals        = [];
                    self._pageData               = pageData;
                    self.concernItemDataSource   = [];
                });
        } else {
            return this.getApi(`/SF0030101/${dealCode}`)
                .then(res => {
                    if (!res.data || ValidatorUtil.isEmpty(res.data.deal.dealCode)) {
                        throw MSG.SF00301.ERR002;
                    }

                    let pageData        = new SF00301Data();
                    pageData.screenMode = mode;
                    let data: SF0030101Res;

                    // check view open or copy
                    if (mode === SF00301Service.MODE_OPEN) {
                        data                  = self.fetchModel(res.data);
                        pageData.user         = data.user;
                        pageData.deal         = data.deal;
                        pageData.deal.isSaved = true;
                    } else if (mode === SF00301Service.MODE_COPY) {
                        data                       = self.fetchModel(res.data, true);
                        pageData.user              = data.user;
                        pageData.deal              = data.deal;
                        pageData.deal.isSaved      = false;
                        pageData.deal.dealType     = DEAL_TYPE_VALUES.EXISTING_VERSION;
                        pageData.deal.templateFlag = TEMPLATE_DEAL.FALSE;
                        pageData.deal.closedFlag   = 0;
                        pageData.deal.dealStatus   = DEAL_STATUS_VALUES.NEW_EDITION;
                        pageData.deal.saler        = pageData.user;
                    }
                    // get data info
                    pageData.user                = data.user;
                    pageData.deal                = data.deal;
                    pageData.defaultDeliveryDate = pageData.deal.deliveryDate;
                    pageData.comments            = data.comments || [];
                    pageData.departments         = data.departments || [];
                    pageData.customers           = [];
                    pageData.checkSheets         = data.checkSheets || [];
                    pageData.orderItems          = data.orderItems || [];
                    pageData.mstLaminations      = data.mstLaminations || [];
                    pageData.relatedDeals        = data.relatedDeals || [];
                    self.concernItemDataSource = data.baseModels || [];

                    pageData.totalComments = res.data["numberOfComment"];

                    self._pageData             = pageData;
                });
        }

    }

    /**
     * create or dupplicate deal
     */
    public createDeal(): Promise<string> {
        let source = this.pageData.deal;
        let req    =
                {
                    deal    : {
                        dealName    : source.dealName,
                        dealType    : source.dealType,
                        deliveryDate: source.deliveryDate,
                        estTotalDeal: source.estTotalDeal,
                        customerName: !source.customer || (!!source.customer && source.customer.id >= 0) ? null : source.customer.customerName
                    },
                    customer: !source.customer || (!!source.customer && source.customer.id < 0) ? null : {id: source.customer.id},
                    saler   : source.saler ? {id: source.saler.id} : null,
                    copyFrom: this.pageData.deal.dealCode
                };
        return this.postApi('SF0030116', req).then(res => res.data.dealCode);
    }

    /**
     * update existed deal
     */
    public updateDeal(): Promise<void> {
        let source = this.pageData.deal;
        let req    =
                {
                    deal    : {
                        id          : source.id,
                        dealCode    : source.dealCode,
                        dealType    : source.dealType,
                        dealName    : source.dealName,
                        salesId     : source.saler ? source.saler.id : null,
                        deliveryDate: source.deliveryDate,
                        estTotalDeal: source.estTotalDeal,
                        customerName: !source.customer || (!!source.customer && source.customer.id >= 0) ? null : source.customer.customerName
                    },
                    customer: !source.customer || (!!source.customer && source.customer.id < 0) ? null : {id: source.customer.id},
                    saler   : source.saler ? {id: source.saler.id} : null
                };
        return this.postApi('SF0030102', req).then(res => {
            this.pageData.deal.setData(res.data.deal);

            let customer: SF00301_Customer;
            if (!!res.data.customer) {
                customer = new SF00301_Customer();
                customer.setCustomer(res.data.customer);
            } else if (!!res.data.deal.customerName) {
                customer              = new SF00301_Customer();
                customer.id           = this.nextNegativeId();
                customer.customerName = res.data.deal.customerName;
            }
            this.pageData.deal.customer = customer;

            let saler: SF00301_User;
            if (!!res.data.saler) {
                saler = new SF00301_User();
                saler.setUser(res.data.saler);
            }
            this.pageData.deal.saler = saler;

            // update state customer for available customer select from list customer selected after saved into db
            this.pageData.deal.hasRegisteredCustomer = res.data.hasRegisteredCustomer;

            this.pageData.defaultDeliveryDate = this.pageData.deal.deliveryDate;
        });
    }

    public closedDeal(): Promise<void> {
        let self = this;
        let req = { dealId: self.pageData.deal.id };
        return self.postApi("SF0030120", req).then(() => {
            self.pageData.deal.closedFlag = 1;
        });
    }

    public deleteDeal(): Promise<void> {
        let req = { dealCode: this.pageData.deal.dealCode };
        return this.postApi("SF0030112", req);
    }

    public loadMore(count: number = 5): void {
        let eles     = this.pageData.concernsItems.length;
        let lastItem = eles > 0 ? this.pageData.concernsItems[eles - 1] : null;
        let tracker  = !!lastItem ? this.findIndex(this.concernItemDataSource, lastItem) + 1 : 0;

        for (let counter = 0; tracker < this.concernItemDataSource.length && counter < count; tracker++) {
            if (this.matchCurrentFilter(this.concernItemDataSource[tracker])) {
                this.pageData.concernsItems.push(this.concernItemDataSource[tracker]);
                counter++;
            }
        }
    }

    private matchCurrentFilter(item: SF00301_ConcernItem) {
        return this.isMathWith(item, this.pageData.filter);
    }

    /**
     * post save deal file call api SF0030103
     * @param dealFile
     * @param fileCode
     */
    public createDealFile(dealFile: SF00301_DealFile, fileCode: string): Promise<void> {
        let self = this;

        // TODO: remove this side effect
        dealFile.dealId        = self.pageData.deal.id;
        dealFile.highlightFlag = Constants.ONE;
        let req                = new SF0030103Req(dealFile, fileCode);
        return self.postApi("/SF0030103", req)
            .then(res => {
                let dealFile: SF00301_DealFile = new SF00301_DealFile();
                dealFile.setDealFile(res.data.dealFile);
                dealFile.category = SF00301Data.CATEGORY.DEAL_FILE;

                self.concernItemDataSource.unshift(dealFile);
                if (self.matchCurrentFilter(dealFile)) {
                    self.pageData.concernsItems.unshift(dealFile);
                }
            });
    }

    /**
     * post update deal file call api SF0030104
     * @param dealFile
     * @param fileCode
     */
    public updateDealFile(dealFile: SF00301_DealFile, fileCode: string): Promise<void> {
        let self = this;
        let req  = new SF0030104Req(dealFile, fileCode);
        return this.postApi("/SF0030104", req)
            .then(res => {
                let dealFile: SF00301_DealFile = new SF00301_DealFile();
                dealFile.setDealFile(res.data.dealFile);
                dealFile.category = SF00301Data.CATEGORY.DEAL_FILE;

                self.removeItem(self.concernItemDataSource, dealFile);
                self.concernItemDataSource.unshift(dealFile);

                self.removeItem(self.pageData.concernsItems, dealFile);
                if (self.matchCurrentFilter(dealFile)) {
                    self.pageData.concernsItems.unshift(dealFile);
                }
            });
    }

    /**
     * post update deal file call api SF0030104
     * @param dealFile
     * @param fileCode
     */
    public updateProductFile(productFile: SF00301_ProductFile, fileCode: string): Promise<void> {
        let self = this;
        let req  = new SF0030105Req(productFile, fileCode);
        // call api update product file SF00302
        return this.postApi("/SF0030207", req)
            .then(res => {
                let productFile: SF00301_ProductFile = new SF00301_ProductFile();
                productFile.setProductFile(res.data.productFile);
                productFile.category         = SF00301Data.CATEGORY.PRODUCT_FILE;
                // update product img
                let product: SF00301_Product = <SF00301_Product>self.concernItemDataSource.find(item => {
                    return self.isProduct(item)
                        && item.id === productFile.productId;
                });
                // set img product
                if (!!product) {
                    product.srcImg = productFile.srcImg;
                }

                self.removeItem(self.concernItemDataSource, productFile);
                self.concernItemDataSource.unshift(productFile);

                self.removeItem(self.pageData.concernsItems, productFile);
                if (self.matchCurrentFilter(productFile)) {
                    self.pageData.concernsItems.unshift(productFile);
                }
            });
    }

    /**
     * remove deal file by id call api SF0030105
     * @param dealFile
     */
    public removeDealFile(dealFile: SF00301_DealFile) {
        let self = this;
        let req  = {
            dealFileId: dealFile.id
        };
        return this.postApi("/SF0030105", req)
            .then(() => {
                // search productFile and remove item it
                let dealFileRemove: SF00301_DealFile = <SF00301_DealFile>self.concernItemDataSource.find(item => {
                    return self.isDealFile(item)
                        && item.id === dealFile.id
                });

                self.removeItem(self.concernItemDataSource, dealFileRemove);
                self.removeItem(self.pageData.concernsItems, dealFileRemove);
                self.loadMore(1);
            });
    }

    private findIndex(source: SF00301_ConcernItem[], target: SF00301_ConcernItem): number {
        if (!source || !target || !target.category)
            return -1;

        return source.findIndex(c => target.category === c.category && target.id === c.id);
    }

    private removeItem(source: SF00301_ConcernItem[], target: SF00301_ConcernItem): boolean {
        let itemIndex = this.findIndex(source, target);

        if (itemIndex === -1)
            return false;

        source.splice(itemIndex, 1);
        return true;
    }


    /**
     * remove quotation by id call api SF0030106
     * @param quotation
     */
    public removeQuotation(quotation: SF00301_Quotation): Promise<void> {
        let self = this;
        let req  = {quotationId: quotation.id};
        return this.postApi("/SF0030106", req).then(res => {
            self.removeItem(self.concernItemDataSource, quotation);
            self.removeItem(self.pageData.concernsItems, quotation);
            self.loadMore(1);
        });
    }

    /**
     * remove deal product by id call api SF0030107
     * @param product
     */
    public detachProduct(product: SF00301_Product): Promise<void> {
        let self = this;
        let req  = {
            dealCode   : this.pageData.deal.dealCode,
            productCode: product.productCode
        };

        return this.postApi("/SF0030107", req).then(() => {
            //#2223
            // update deal status
            this.updateDealStatus(this.pageData.deal.id, this.pageData.deal.dealStatus);

            // remove productFile
            let productId = product.id;
            self.concernItemDataSource
                .filter(item => self.isProductFile(item) && (<SF00301_ProductFile>item).productId === productId)
                .forEach(item => {
                    self.removeItem(self.concernItemDataSource, item);
                    self.removeItem(self.pageData.concernsItems, item);
                    self.loadMore(1);
                });

            self.removeItem(self.concernItemDataSource, product);
            self.removeItem(self.pageData.concernsItems, product);
            self.removeItem(self.pageData.deal.products, product);
            self.loadMore(1);
        }).catch(err => {
            throw err;
        });
    }

    /**
     * remove product file by id call api SF0030107
     * @param productFile
     */
    public removeProductFile(productFile: SF00301_ProductFile): Promise<void> {
        let self = this;
        let req  = {
            productId    : productFile.productId,
            productFileId: productFile.id
        };
        return this.postApi("/SF0030108", req)
            .then(res => {
                let product: SF00301_Product = <SF00301_Product>self.concernItemDataSource.find(item => {
                    return self.isProduct(item)
                        && item.id === productFile.productId
                });

                if (!!product) {
                    product.srcImg = res.data["srcImg"];
                }
                // search productFile and remove item it
                let productFileRemove: SF00301_ProductFile = <SF00301_ProductFile>self.concernItemDataSource.find(item => {
                    return self.isProductFile(item)
                        && item.id === productFile.id
                });

                self.removeItem(self.concernItemDataSource, productFileRemove);
                self.removeItem(self.pageData.concernsItems, productFileRemove);
                self.loadMore(1);
            });
    }

    /**
     * persist givent comment and add it to showing list
     */
    public addComment(comment: SF00301_Comment): Promise<void> {
        let self = this;
        let req  = {
            comment: {
                value : comment.value,
                title : comment.title,
                dealId: this.pageData.deal.id
            }
        };

        return this.postApi("/SF0030109", req).then(res => {
            let comment = new SF00301_Comment();
            comment.setComment(res.data.comment);
            self.pageData.comments.unshift(comment);

            this.pageData.totalComments = res.data["numberOfComment"];

            //Fix #1796 -- always get 10 latest item (also after load all items)
            self.pageData.comments = self.pageData.comments.slice(0, 10);
        });
    }

    /**
     * show more comment by deal id, index call api SF0030110
     */
    public showMoreComment(): Promise<void> {
        let self = this;
        let req  = {
            dealId       : this.pageData.deal.id,
            startPosition: (this.pageData.comments || []).length
        };

        return this.postApi("/SF0030110", req).then(res => {
            if (!res.data)
                return;

            this.pageData.totalComments = res.data.total;
            (res.data.comments || []).forEach(item => {
                let comment = new SF00301_Comment();
                comment.setComment(item);
                self.pageData.comments.push(comment);
            });
        });
    }

    /**
     * call api for toggle boorkmark for given deal
     */
    public toggleBookmark(deal: SF00301_Deal): Promise<boolean> {
        if (!deal.isSaved)
            return;

        if (deal.isInMybox) {
            // unbookmark deal
            return this.postApi("/SF0030003", {dealId: deal.id}).then(() => {
                return false;
            });
        } else {
            // bookmark deal
            return this.postApi("/SF0030002", {dealId: deal.id}).then(res => {
                return res.data.myboxId > 0;
            });
        }
    }

    /**
     * call api for toggle boorkmark for given deal
     */
    public toggleLock(deal: SF00301_Deal): Promise<boolean> {
        if (!deal.isSaved)
            return;

        // unBookmark deal
        return this.postApi("/SF0030122", {dealId: deal.id}).then(res => {
            let data =  res.data;

            return data["dealLock"];
        });
    }

    public updateHighlightFlag(itemId: number, status: number, itemType: string, dealId: number): Promise<number> {
        //#2223
        let req      = new SF0030117Req();
        req.dealId   = dealId;
        req.itemId   = itemId;
        req.status   = status;
        req.itemType = itemType;

        return this.postApi("/SF0030117", req).then(res => {
            return res.data;
        });
    }

    public getCustomers(departmentId: number): Promise<SF00301_Customer[]> {
        let req = {
            departmentId: departmentId
        };

        return this.postApi("/SF0030118", req).then(res => {
            return (res.data["customers"] || []).map(item => {
                let customer: SF00301_Customer = new SF00301_Customer();
                customer.setCustomer(item);
                return customer;
            });
        });
    }

    public nextNegativeId(): number {
        return this._nextNegativeId--;
    }

    /**
     * Method to parse response data to fetch into the page's data model.
     * @param data the current response data.
     * @param lint: if `true` will not return deal's comment and CODE of concern items
     * @return {SF00301Data}
     */
    private fetchModel(data: any, lint: boolean = false): SF0030101Res {
        let model = new SF0030101Res();

        model.user = this.parseUser(data["user"]);

        // get list department
        model.departments = this.parseDepartments(data["departments"]);

        // get data deal
        model.deal = this.parseDeal(data["deal"]);

        if (!!data["customer"]) {
            model.deal.customer = new SF00301_Customer();
            model.deal.customer.setCustomer(data["customer"]);
        } else if (!!data["deal"] && !!data["deal"].customerName) {
            model.deal.customer              = new SF00301_Customer();
            model.deal.customer.id           = this.nextNegativeId();
            model.deal.customer.customerName = data["deal"].customerName;
        }

        // get list checkSheets
        model.checkSheets = [];
        if (!!data["checksheets"]) {
            for (let i = 0; i < data["checksheets"].length; i++) {
                let answer                             = data["checksheets"][i];
                model.checkSheets[answer.questionCode] = answer;
            }
        }

        // get comments
        if (!lint)
            model.comments = this.parseComments(data["comments"]);


        if (!!data["deal"] && !!data["deal"]["salesId"]) {
            model.deal.saler = this.parseUser(data["saler"]);
        }

        // get list mst lamination
        if (data["laminationJsons"]) {
            for (let lamination of data["laminationJsons"]) {
                let mstLamination = new MstLamination();
                mstLamination.setData(lamination);
                model.mstLaminations.push(mstLamination);
            }
        }

        // get list items
        model.baseModels = [];

        // list deal product
        for (let i = 0; i < (data["products"] || []).length; i++) {
            let product = new SF00301_Product();
            product.setData(data["products"][i]);
            product.dealProductId = data["products"][i]["dealProductId"];
            product.highlightFlag = data["products"][i]["highlightFlag"];

            product.category = SF00301Data.CATEGORY.PRODUCT;
            model.deal.products.push(product);
            model.baseModels.push(product);
        }

        // list deal file
        for (let i = 0; i < (data["dealFiles"] || []).length; i++) {
            let dealFile = new SF00301_DealFile();
            dealFile.setDealFile(data["dealFiles"][i]);
            dealFile.category = SF00301Data.CATEGORY.DEAL_FILE;
            model.baseModels.push(dealFile);
        }

        // list quotation
        for (let i = 0; i < (data["quotations"] || []).length; i++) {
            let quotation = new SF00301_Quotation();
            quotation.setQuotation(data["quotations"][i]);
            if (lint) {
                quotation.quotationCode = null;
            }
            quotation.category = SF00301Data.CATEGORY.QUOTATION;
            model.baseModels.push(quotation);
        }

        // order item
        for (let i = 0; i < (data["orderItems"] || []).length; i++) {
            let orderItem = new SF00301_OrderItem();
            orderItem.setOrderItem(data["orderItems"][i]);
            model.orderItems.push(orderItem);
        }

        // list product file
        for (let i = 0; i < (data["productFiles"] || []).length; i++) {
            let productFile = new SF00301_ProductFile();
            productFile.setProductFile(data["productFiles"][i]);
            productFile.category = SF00301Data.CATEGORY.PRODUCT_FILE;
            model.baseModels.push(productFile);
        }

        // sort date time
        model.baseModels.sort((item1, item2) => {
            if (item1.updatedDate > item2.updatedDate) {
                return -1;
            } else if (item1.updatedDate == item2.updatedDate) {
                return 0;
            } else {
                return 1;
            }
        });

        // 関連案件 (元案件, リピート案件)
        model.relatedDeals = (data['relatedDeals'] || []).map(this.parseDeal.bind(this));

        return model;
    }

    private parseUser(data: any): SF00301_User {
        if (!data)
            return null;

        let user = new SF00301_User();
        user.setUser(data);
        return user;
    }

    private parseCustomer(data: any): SF00301_Customer {
        if (!data)
            return null;

        let customer = new SF00301_Customer();
        customer.setCustomer(data);
        return customer;
    }

    private parseDeal(data: any): SF00301_Deal {
        if (!data)
            return null;

        let deal = new SF00301_Deal();
        deal.setDeal(data);
        return deal;
    }

    private findUserInDepartments(departments: SF00301_Department[], userId: number) {
        let ret: SF00301_User = null;
        departments.find(dep => {
            return dep.users.find(usr => {
                    if (usr.id === userId) {
                        ret = usr;
                        return true;
                    }
                    return false;

                }) != null;
        });
        return ret;
    }

    private parseComments(data: any[] | null): SF00301_Comment[] {
        return (data || []).map(item => {
            let comment = new SF00301_Comment();
            comment.setComment(item);
            return comment;
        });
    }

    private parseDepartments(data: any[] | null): SF00301_Department[] {
        return (data || []).map(item => {
            let department = new SF00301_Department();
            department.setDepartment(item);
            return department;
        });
    }

    private parseCustomers(data: any[] | null): SF00301_Customer[] {
        return (data || []).map(item => {
            let customers = new SF00301_Customer();
            customers.setCustomer(item);
            return customers;
        });
    }

    private isDealFile(item: SF00301_ConcernItem): boolean {
        return item.category === SF00301Data.CATEGORY.DEAL_FILE;
    }

    private isProduct(item: SF00301_ConcernItem): boolean {
        return item.category === SF00301Data.CATEGORY.PRODUCT;
    }

    private isProductFile(item: SF00301_ConcernItem): boolean {
        return item.category === SF00301Data.CATEGORY.PRODUCT_FILE;
    }

    private isFile(item: SF00301_ConcernItem): boolean {
        return this.isDealFile(item) || this.isProductFile(item);
    }

    private isQuotation(item: SF00301_ConcernItem): boolean {
        return item.category === SF00301Data.CATEGORY.QUOTATION;
    }

    private isMathWith(item: SF00301_ConcernItem, filter: symbol): boolean {
        return filter === SF00301Data.CATEGORY.ANY
            || (
                filter === SF00301Data.CATEGORY.ANY_FILE
                && this.isFile(item)
            )
            || filter === item.category;
    }

    updateDealStatus(dealId: number, dealStatus: number): Promise<void> {
        let req = {
            dealId    : dealId,
            dealStatus: dealStatus
        };

        return this.postApi("/SF0030119", req).then(res => {
            // update deal status
            this.pageData.deal.dealStatus = res.data["dealStatus"];
        });
    }

    downloadFile(itemModal: SF00301_FileItem) {
        let req = {
            fileId: itemModal.fileId,
            originalName: itemModal.originalName,
            itemId: itemModal.parentId,
            category: (SF00301Data.CATEGORY.PRODUCT_FILE == itemModal.category ? Constants.ITEM_PRODUCT : null)
        };
        return this.postApi("/SF0030121", req)
                   .then(res => {
                       return {fileName: res.data.fileName, filePath: res.data.filePath};
                   })
                   .catch(err => {
                       throw err;
                   });
    }

    // メール添付ファイル用に無理やり作成
    downloadCommentFile(fileId: number, originalName: string, itemId: number) {
        let req = {
            fileId: fileId,
            originalName: originalName,
            itemId: itemId,
            category: 'COMMENT_FILE'
        };
        return this.postApi("/SF0030121", req)
            .then(res => {
                return { fileName: res.data.fileName, filePath: res.data.filePath };
            })
            .catch(err => {
                throw err;
            });
    }

    canShowMoreDealItem(index: number = 0): boolean {
        return index < this.concernItemDataSource.length;
    }
}
