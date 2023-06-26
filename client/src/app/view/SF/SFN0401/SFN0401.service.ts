import {Injectable} from "@angular/core";
import {CommonService} from "../../../service/common.service";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {SFN0401Data} from "./SFN0401.data";
import {PartnerModel} from "./model/SFN0401_Partner.model";
import {SFN0401Constants} from "./SFN0401.constants";
import {DateUtil} from "../../../util/date-util";
import {SFN0401Helper} from "./SFN0401.helper";
import {RevenueModel} from "./model/SFN0401_Revenue.model";
import {InventoryModel} from "./model/SFN0401_Inventory.model";
import {ProductModel} from "./model/SFN0401_Product.model";
import {FormatUtil} from "../../../util/format-util";
import {StockListTableHelper} from "../COMMON/stock-list-table/StockListTable.helper";
import {ProductListTableHelper} from "../COMMON/product-list-table/ProductListTable.helper";

@Injectable()
export class SFN0401Service extends CommonService {

    pageData: SFN0401Data;

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    /**
     * send SF0050201 get request
     * @returns {Promise<TResult>}
     */
    sfn040101(): Promise<void> {
        let currentFilter = this.pageData.currentFilter;
        let requestData = {
            keywords: currentFilter.keywords,
            code: currentFilter.code,
            name: currentFilter.name,
            contactName: currentFilter.contactName,
            salesName: currentFilter.salesName,
            page: currentFilter.page
        };
        return this.postApi("/SFN040101", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // no result
                this.pageData.hits = 0;
                this.pageData.partnerList = [];
            } else if (messageCode == "INF002") {
                // result found
                this.pageData.hits = data["hits"];

                let customersData = data["customers"];
                let customerList = [];
                this.pageData.partnerList = customerList;
                for (let customerData of customersData) {
                    let customer = new PartnerModel();
                    customerList.push(customer);

                    // filter type
                    customer.type = SFN0401Constants.PTYPE_CUSTOMER;
                    // 取引先ID
                    customer.code = customerData["code"];
                    // 取引先名
                    customer.name = customerData["name"];
                    // 更新日
                    customer.updateDate = DateUtil.getDate(customerData["updateDate"]);
                    // 略称
                    customer.abbr = customerData["abbr"];
                    // 郵便番号
                    customer.postalCode = customerData["postalCode"];
                    // 住所１
                    customer.address1 = customerData["address1"];
                    // 住所２
                    customer.address2 = customerData["address2"];
                    // TEL
                    let tel = customerData["tel"];
                    let ext = customerData["ext"];
                    customer.tel = SFN0401Helper.getTelStr(tel, ext);
                    // FAX
                    customer.fax = customerData["fax"];
                    // HP経由
                    customer.hpInfo = SFN0401Helper.getHPInfoStr(customerData["hpInfo"]);
                    // 登録日
                    customer.createdDate = DateUtil.getDate(customerData["createdDate"]);
                    // 取引開始年度
                    customer.startYear = customerData["startYear"];
                    // 担当部署(#2852)
                    customer.picDept = "";
                    // 得意先担当者名
                    customer.contactName = customerData["contactName"];
                    // 請求方法区分
                    customer.billingMethod = SFN0401Helper.getBillingMethodStr(customerData["billingMethod"]);
                    // 備考１
                    customer.note1 = customerData["note1"];
                    // 備考２
                    customer.note2 = customerData["note2"];
                    // 営業カルテ
                    customer.memo = customerData["memo"];

                    // sales
                    let salesData = customerData["sales"];
                    let username = salesData["name"];
                    let departmentName = salesData["departmentName"];
                    customer.sales = FormatUtil.formatSalesName(departmentName, username);

                    // revenue
                    let revenues = [];
                    customer.revenues = revenues;
                    let revenuesData = customerData["revenues"];
                    for (let revenueData of revenuesData) {
                        let revenue = new RevenueModel();
                        revenues.push(revenue);

                        // 売上日
                        revenue.salesDate = DateUtil.getDate(revenueData["salesDate"]);
                        revenue.salesDateStr = DateUtil.formatDate(revenue.salesDate, SFN0401Constants.DATE_DISPLAY);
                        // 品名/内容
                        let productData = revenueData["product"];
                        let product = this.getProductData(productData);
                        revenue.product = product;
                        // 数量
                        product.quantity = revenueData["quantity"];
                        // 単価
                        product.unitPrice = revenueData["unitPrice"];
                        // 合計
                        product.total = revenueData["total"];
                    }

                    // inventory
                    let inventories = [];
                    customer.inventories = inventories;
                    let inventoriesData = customerData["inventories"];
                    for (let inventoryData of inventoriesData) {
                        let inventory = new InventoryModel();
                        inventories.push(inventory);

                        // 種別
                        inventory.type = inventoryData["type"];
                        inventory.typeStr = StockListTableHelper.getInventoryTypeStr(inventory.type);
                        // 製造日
                        inventory.manufactureDate = DateUtil.getDate(inventoryData["manufactureDate"]);
                        inventory.manufactureDateStr = DateUtil.formatDate(inventory.manufactureDate, SFN0401Constants.DATE_DISPLAY);
                        // 保管日数
                        inventory.storageDays = inventoryData["storageDays"];

                        // 品名/内容
                        let productData = inventoryData["product"];
                        let product = this.getProductData(productData);
                        inventory.product = product;
                        // 数量
                        product.quantity = inventoryData["quantity"];
                        // 単価
                        product.unitPrice = inventoryData["unitPrice"];
                        // 合計
                        product.total = inventoryData["total"];
                    }

                    // product
                    let products = [];
                    customer.products = products;
                    let ordersData = customerData["orders"];
                    for (let orderData of ordersData) {
                        let productData = orderData["product"];
                        let product = this.getProductData(productData);
                        products.push(product);

                        // 数量
                        product.quantity = orderData["quantity"];
                        // 単価
                        product.unitPrice = orderData["unitPrice"];
                        // 合計
                        product.total = orderData["total"];
                    }
                }
            }
        });
    }

    /**
     * send SF0050202 post request
     */
    sfn040102(): Promise<void> {
        let currentFilter = this.pageData.currentFilter;
        let requestData = {
            keywords: currentFilter.keywords,
            code: currentFilter.code,
            name: currentFilter.name,
            contactName: currentFilter.contactName,
            salesName: currentFilter.salesName,
            page: currentFilter.page
        };
        return this.postApi("/SFN040102", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // no result
                this.pageData.hits = 0;
                this.pageData.partnerList = [];
            } else if (messageCode == "INF002") {
                // result found
                this.pageData.hits = data["hits"];

                let suppliersData = data["suppliers"];
                let supplierList = [];
                this.pageData.partnerList = supplierList;
                for (let supplierData of suppliersData) {
                    let supplier = new PartnerModel();
                    supplierList.push(supplier);

                    // filter type
                    supplier.type = SFN0401Constants.PTYPE_SUPPLIER;
                    // 取引先ID
                    supplier.code = supplierData["code"];
                    // 取引先名
                    supplier.name = supplierData["name"];
                    // 更新日
                    supplier.updateDate = DateUtil.getDate(supplierData["updateDate"]);
                    // 略称
                    supplier.abbr = supplierData["abbr"];
                    // 郵便番号
                    supplier.postalCode = supplierData["postalCode"];
                    // 住所１
                    supplier.address1 = supplierData["address1"];
                    // 住所２
                    supplier.address2 = supplierData["address2"];
                    // TEL
                    supplier.tel = supplierData["tel"];
                    // FAX
                    supplier.fax = supplierData["fax"];
                    // HP経由
                    supplier.hpInfo = SFN0401Constants.PARTNER_NULL;
                    // 登録日
                    supplier.createdDate = DateUtil.getDate(supplierData["createdDate"]);
                    // 担当部署(#2852)
                    supplier.picDept = "";
                    // 得意先担当者名
                    supplier.contactName = supplierData["contactName"];
                    // 請求方法区分
                    supplier.billingMethod = SFN0401Constants.PARTNER_NULL;
                    // 備考１
                    supplier.note1 = supplierData["note1"];
                    // 備考２
                    supplier.note2 = supplierData["note2"];
                    // 営業カルテ
                    supplier.memo = supplierData["memo"];

                    // sales
                    supplier.sales = "";

                    // revenue
                    let revenues = [];
                    supplier.revenues = revenues;
                    let revenuesData = supplierData["revenues"];
                    for (let revenueData of revenuesData) {
                        let revenue = new RevenueModel();
                        revenues.push(revenue);

                        // 売上日
                        revenue.salesDate = DateUtil.getDate(revenueData["salesDate"]);
                        revenue.salesDateStr = DateUtil.formatDate(revenue.salesDate, SFN0401Constants.DATE_DISPLAY);
                        // 品名/内容
                        let productData = revenueData["product"];
                        let product = this.getProductData(productData);
                        revenue.product = product;
                        // 数量
                        product.quantity = revenueData["quantity"];
                        // 単価
                        product.unitPrice = revenueData["unitPrice"];
                        // 合計
                        product.total = revenueData["total"];
                    }
                }
            }
        });
    }

    private getProductData(productData: any): ProductModel {
        let product = new ProductModel();

        // dealCode
        product.dealCode = productData["dealCode"];
        // itemCode
        product.itemCode = productData["itemCode"];
        // product code
        product.code = productData["code"];
        product.type = productData["type"];
        product.shapeId = productData["shapeId"];
        // 品名
        product.name = productData["name"];
        // 内容
        product.description = SFN0401Helper.getProductDescription(productData);
        // 木型
        let wooden = productData["wooden"];
        if (wooden == undefined) {
            wooden = "";
        }
        product.wooden = wooden;
        // 木型有効期限
        product.woodenExp = productData["woodenExp"];
        product.woodenStatus = productData["woodenStatus"];
        product.woodenExpStr = ProductListTableHelper.getWoodenExpStr(product.woodenStatus, product.woodenExp);
        product.cartonShippingType = productData["cartonShippingType"];

        return product;
    }
}