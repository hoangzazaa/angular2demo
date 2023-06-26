import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import "rxjs/add/operator/toPromise";
import {Quotation} from "../../../model/core/Quotation.model";
import {QuotationItem} from "../../../model/core/QuotationItem.model";
import {CommonService} from "../../../service/common.service";
import {DealProduct} from "../../../model/core/DealProduct.model";
import {SF00303Data} from "./SF00303.data";
import {SF0030301Req} from "../../../model/request/SF0030301Req";
import {MstLamination} from "../COMMON/model/MstLamination.model";

/**
 * SF00303 quotation call service api
 * Created by hoangtd on 26/10/2016.
 */

@Injectable()
export class SF00303Service extends CommonService {

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    /**
     * Get data quotation info
     * @return quotation data
     * */
    getQuotationInfo(dealCode: string, quotationCode: string): Promise<SF00303Data> {
        return this.getApi("/SF0030300/" + dealCode + "/" + quotationCode).then(request => {
            let res         = request.data;
            // data
            let sf00303Data = new SF00303Data();

            // read deal parse json
            sf00303Data.deal.setDeal(res["deal"]);

            // read quotation parse json
            sf00303Data.quotation.setQuotation(res["quotation"]);

            sf00303Data.defaultEstimateDate          = sf00303Data.quotation.estimateDate;
            sf00303Data.defaultInvoiceExpirationDate = sf00303Data.quotation.invoiceExpirationDate;

            // read quotation item parse json
            for (let i = 0; i < res["quotationItems"].length; i++) {
                let quotationItem = new QuotationItem();
                quotationItem.setQuotationItem(res["quotationItems"][i]);
                sf00303Data.quotationItems.push(quotationItem);
            }

            // read dealProduct parse json
            for (let i = 0; i < res["dealProducts"].length; i++) {
                let dealProduct = new DealProduct();
                dealProduct.setDealProduct(res["dealProducts"][i]);
                sf00303Data.dealProducts.push(dealProduct);
            }

            // read saleByCustomer parse json
            if (res["saleByCustomer"]) {
                sf00303Data.saleByCustomer.setUser(res["saleByCustomer"]);
            }

            // read departmentByCustomer parse json
            if (res["departmentByCustomer"]) {
                sf00303Data.departmentByCustomer.setDepartment(res["departmentByCustomer"]);
            }

            //read mst lamination
            if (res["laminationJsons"]) {
                sf00303Data.mstLaminations = [];
                for (let i = 0; i < res["laminationJsons"].length; i++) {
                    let mstLamination = new MstLamination();
                    mstLamination.setData(res["laminationJsons"][i]);
                    sf00303Data.mstLaminations.push(mstLamination);
                }
            }

            return sf00303Data;
        }).catch(err => {
            throw err;
        });
    }

    /**
     * Save quotation call service api SF0030301
     */
    saveQuotation(quotation: Quotation, quotationItems: QuotationItem[]): Promise<SF00303Data> {
        let sf0030301Request            = new SF0030301Req();
        sf0030301Request.quotation      = quotation;
        sf0030301Request.quotationItems = quotationItems.map(SF00303Service.prettyQuotationItemForRequest);
        // post send request

        return this.postApi("/SF0030301", sf0030301Request).then(request => {
            let res         = request.data;
            let sf00303Data = new SF00303Data();

            // read quotation parse json
            sf00303Data.quotation.setQuotation(res["quotation"]);

            sf00303Data.defaultEstimateDate          = sf00303Data.quotation.estimateDate;
            sf00303Data.defaultInvoiceExpirationDate = sf00303Data.quotation.invoiceExpirationDate;

            // read quotation item parse json
            for (let i = 0; i < res["quotationItems"].length; i++) {
                let quotationItem = new QuotationItem();
                quotationItem.setQuotationItem(res["quotationItems"][i]);
                sf00303Data.quotationItems.push(quotationItem);
            }

            return sf00303Data;
        }).catch(err => {
            throw err;
        });

    }

    /**
     * Duplicate quotation call service api SF0030302
     */
    duplicateQuotation(quotation: Quotation, quotationItems: QuotationItem[]): Promise<SF00303Data> {
        let sf0030301Request            = new SF0030301Req();
        sf0030301Request.quotation      = quotation;
        sf0030301Request.quotationItems = quotationItems.map(SF00303Service.prettyQuotationItemForRequest);

        // post send request
        return this.postApi("/SF0030302", sf0030301Request).then(request => {
            let res         = request.data;
            let sf00303Data = new SF00303Data();

            // read quotation json
            sf00303Data.quotation.setQuotation(res['quotation']);

            sf00303Data.defaultEstimateDate          = sf00303Data.quotation.estimateDate;
            sf00303Data.defaultInvoiceExpirationDate = sf00303Data.quotation.invoiceExpirationDate;

            // read quotation item parse json
            for (let i = 0; i < res["quotationItems"].length; i++) {
                let quotationItem = new QuotationItem();
                quotationItem.setQuotationItem(res["quotationItems"][i]);
                sf00303Data.quotationItems.push(quotationItem);
            }

            return sf00303Data;
        }).catch(err => {
            throw err;
        });
    }

    /**
     * QuotationItem を要求形式の電文に変換する
     * 
     * @param item 見積もり明細
     * @returns 見積もり明細 (要求電文形式)
     */
    private static prettyQuotationItemForRequest(item: QuotationItem): QuotationItem {
        let prettyItem = new QuotationItem();
        prettyItem.setQuotationItem(item);
        prettyItem.identity = undefined;
        if (prettyItem.productType > 0) {
            prettyItem.productTypeName = undefined;
        } else {
            prettyItem.productType = undefined;
            if (prettyItem.productTypeName.length == 0) {
                // 単位が空欄の場合
                prettyItem.quantity = null;
                prettyItem.submittedPrice = null;
                prettyItem.total = null;
            }
        }
        return prettyItem;
    }

    /**
     * Remove quotation call service api SF0030303
     */
    deleteQuotation(quotationCode: string): Promise<any> {
        return this.getApi("/SF0030303/" + quotationCode).then(request => {
            return request;
        }).catch(err => {
            throw err;
        });
    }
}
