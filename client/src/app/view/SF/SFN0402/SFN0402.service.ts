import {Injectable} from "@angular/core";
import {CommonService} from "../../../service/common.service";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {SFN0402Data} from "./SFN0402.data";
import {PartnerModel, PartnerJson} from "./model/SFN0402_Partner.model";
import {DateUtil} from "../../../util/date-util";
import {SFN0402Helper} from "./SFN0402.helper";
import {ProductModel} from "./model/SFN0402_Product.model";
import {FormatUtil} from "../../../util/format-util";
import {SummaryModel} from "./model/SFN0402_Summary.model";
import {InventoryModel} from "./model/SFN0402_Inventory.model";
import {SFN0402Constants} from "./SFN0402.constants";
import {RevenueModel} from "./model/SFN0402_Revenue.model";
import {MailModel} from "./model/SFN0402_Mail.model";
import {StockListTableHelper} from "../COMMON/stock-list-table/StockListTable.helper";
import {ProductListTableHelper} from "../COMMON/product-list-table/ProductListTable.helper";
import { SFN040213ResJson } from '../../../response/SFN040213.res';
import { ErrorJson } from "../../../response/ResponseJson";
import { SFN040214ResJson } from '../../../response/SFN040214.res';
import { ShippingDestination } from "../../../model/core/ShippingDestination.model";
import { SFN040215ReqJson } from '../../../request/SFN040215.req';
import { SFN040215ResJson } from "../../../response/SFN040215.res";
import { FileNameResJson } from '../../../response/FileNameResJson';
import { FileName } from '../../../model/common/FileName';
import { SFN040216ResJson } from "../../../response/SFN040216.res";
import { SFN040217ResJson } from '../../../response/SFN040217.res';

@Injectable()
export class SFN0402Service extends CommonService {

    pageData: SFN0402Data;

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    sfn040201(): Promise<void> {
        let requestData = {
            type: this.pageData.partnerType,
            code: this.pageData.partnerCode
        };
        return this.postApi("/SFN040201", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // partner data
                let partnerData = data["partner"] as PartnerJson;
                let partner = new PartnerModel();
                this.pageData.partner = partner;

                // get customer data
                if (this.pageData.partnerType == SFN0402Constants.TYPE_CUSTOMER) {
                    // ID
                    partner.id = partnerData["id"];
                    // 取引先ID
                    partner.code = partnerData["code"];
                    // 取引先名
                    partner.name = partnerData["name"];
                    // 略称
                    partner.abbr = partnerData["abbr"];
                    // 郵便番号
                    partner.postalCode = partnerData["postalCode"];
                    // 住所１
                    partner.address1 = partnerData["address1"];
                    // 住所２
                    partner.address2 = partnerData["address2"];
                    // TEL
                    let tel = partnerData["tel"];
                    let ext = partnerData["ext"];
                    partner.tel = SFN0402Helper.getTelStr(tel, ext);
                    // FAX
                    partner.fax = partnerData["fax"];
                    // HP経由
                    partner.hpInfo = SFN0402Helper.getHPInfoStr(partnerData["hpInfo"]);
                    // 登録日
                    partner.createdDate = DateUtil.getDate(partnerData["createdDate"]);
                    // 取引開始年度
                    partner.startYear = partnerData["startYear"];
                    // 担当部署(#2852)
                    partner.picDept = "";
                    // 得意先担当者名
                    partner.contactName = partnerData["contactName"];
                    // 請求方法区分
                    partner.billingMethod = SFN0402Helper.getBillingMethodStr(partnerData["billingMethod"]);
                    // 備考１
                    partner.note1 = partnerData["note1"];
                    // 備考２
                    partner.note2 = partnerData["note2"];
                    // 備考(営業カルテ)
                    this.pageData.partnerMemo = partner.memo = partnerData["memo"];
                    // 備考(出荷部門用カルテ)
                    this.pageData.remarksForShipping = partner.remarksForShipping = partnerData["remarksForShipping"];

                    // sales
                    let salesData = partnerData["sales"];
                    let username = salesData["name"];
                    let departmentName = salesData["departmentName"];
                    partner.sales = FormatUtil.formatSalesName(departmentName, username);

                    // mail template
                    this.pageData.productDisposalMail = this.getMailTemplateData(data["productDisposalMail"])
                    this.pageData.woodenReturnMail = this.getMailTemplateData(data["woodenReturnMail"])
                    this.pageData.woodenPendingMail = this.getMailTemplateData(data["woodenPendingMail"])
                } else if (this.pageData.partnerType == SFN0402Constants.TYPE_SUPPLIER) {
                    // 取引先ID
                    partner.code = partnerData["code"];
                    // 取引先名
                    partner.name = partnerData["name"];
                    // 略称
                    partner.abbr = partnerData["abbr"];
                    // 郵便番号
                    partner.postalCode = partnerData["postalCode"];
                    // 住所１
                    partner.address1 = partnerData["address1"];
                    // 住所２
                    partner.address2 = partnerData["address2"];
                    // TEL
                    partner.tel = partnerData["tel"];
                    // FAX
                    partner.fax = partnerData["fax"];
                    // HP経由
                    partner.hpInfo = SFN0402Constants.PARTNER_NULL;
                    // 登録日
                    partner.createdDate = DateUtil.getDate(partnerData["createdDate"]);
                    // 担当部署(#2852)
                    partner.picDept = "";
                    // 得意先担当者名
                    partner.contactName = partnerData["contactName"];
                    // 請求方法区分
                    partner.billingMethod = SFN0402Constants.PARTNER_NULL;
                    // 備考１
                    partner.note1 = partnerData["note1"];
                    // 備考２
                    partner.note2 = partnerData["note2"];
                    // 営業カルテ
                    partner.memo = partnerData["memo"];
                    this.pageData.partnerMemo = partner.memo;
                    // sales
                    partner.sales = "";
                }

                // now
                this.pageData.currentTime = DateUtil.getDate(data["now"]);
            } else if (messageCode == "ERR001") {
                // partner not found
                throw 1;
            }
        });
    }

    sfn040202() {
        let requestData = {
            code: this.pageData.partnerCode,
            year: this.pageData.spSelectedYear
        };
        return this.postApi("/SFN040202", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            if (messageCode == "INF001") {
                // INF001 data
                let summary = new SummaryModel();
                this.pageData.summary = summary;

                // paperNew
                summary.paperNew = this.getSummaryData(data["paperNew"]);
                // cartonNew
                summary.cartonNew = this.getSummaryData(data["cartonNew"]);
                // commercialNew
                summary.commercialNew = this.getSummaryData(data["commercialNew"]);
                // paperOld
                summary.paperOld = this.getSummaryData(data["paperOld"]);
                // cartonOld
                summary.cartonOld = this.getSummaryData(data["cartonOld"]);
                // commercialOld
                summary.commercialOld = this.getSummaryData(data["commercialOld"]);
                // goal
                summary.goal = this.getSummaryData(data["goal"]);
            }
        });
    }

    sfn040203(): Promise<void> {
        let requestData = {
            code: this.pageData.partnerCode,
            keyword: this.pageData.rpcKeyword,
            startDate: this.pageData.rpcStartDate,
            endDate: this.pageData.rpcEndDate
        };
        return this.postApi("/SFN040203", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // get hits
                this.pageData.revenueHits = data["hits"];
                // get revenue data
                let revenues = [];
                this.pageData.revenues = revenues;
                let revenuesData = data["revenues"];
                for (let revenueData of revenuesData) {
                    let revenue = new RevenueModel();
                    revenues.push(revenue);

                    // check
                    revenue.rlt_selected = false;
                    // 売上日
                    revenue.salesDate = DateUtil.getDate(revenueData["salesDate"]);
                    revenue.salesDateStr = DateUtil.formatDate(revenue.salesDate, SFN0402Constants.DATE_DISPLAY);
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
        });
    }

    sfn040204(): Promise<void> {
        let requestData = {
            code: this.pageData.partnerCode,
            stockDays: this.pageData.spcStockDays,
            stockType: this.pageData.spcStockType
        };
        return this.postApi("/SFN040204", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // get hits
                this.pageData.inventoryHits = data["hits"];
                // get stock data
                let inventories = [];
                this.pageData.inventories = inventories;
                let inventoriesData = data["inventories"];
                for (let inventoryData of inventoriesData) {
                    let inventory = new InventoryModel();
                    inventories.push(inventory);

                    // check
                    inventory.slt_selected = false;
                    // id
                    inventory.id = inventoryData["id"];
                    // 種別
                    inventory.type = inventoryData["type"];
                    inventory.typeStr = StockListTableHelper.getInventoryTypeStr(inventory.type);
                    // 製造日
                    inventory.manufactureDate = DateUtil.getDate(inventoryData["manufactureDate"]);
                    inventory.manufactureDateStr = DateUtil.formatDate(inventory.manufactureDate, SFN0402Constants.DATE_DISPLAY);
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
            }
        });
    }

    sfn040205(): Promise<void> {
        let requestData = {
            code: this.pageData.partnerCode,
            keyword: this.pageData.ppcKeyword,
            startDate: this.pageData.ppcStartDate,
            endDate: this.pageData.ppcEndDate
        };
        return this.postApi("/SFN040205", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // get hits
                this.pageData.productHits = data["hits"];
                // get product data
                let products = [];
                this.pageData.products = products;
                let ordersData = data["orders"];
                for (let orderData of ordersData) {
                    let productData = orderData["product"];
                    let product = this.getProductData(productData);
                    products.push(product);

                    // check (temporary hide)
                    product.plt_selected = undefined;
                    // 数量
                    product.quantity = orderData["quantity"];
                    // 単価
                    product.unitPrice = orderData["unitPrice"];
                    // 合計
                    product.total = orderData["total"];
                }
            }
        });
    }

    sfn040206(): Promise<void> {
        let requestData = {
            type: this.pageData.partnerType,
            code: this.pageData.partnerCode,
            memo: this.pageData.partner.memo,
            remarksForShipping: this.pageData.partner.remarksForShipping
        };
        return this.postApi("/SFN040206", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                this.pageData.partnerMemo = this.pageData.partner.memo;
                this.pageData.remarksForShipping = this.pageData.partner.remarksForShipping;
            }
        });
    }

    sfn040207(): Promise<void> {
        let mail = this.pageData.mail;
        let requestData = {
            mail: {
                to: mail.addressTo,
                cc: mail.addressCc,
                subject: mail.subject,
                content: mail.content
            }
        };
        return this.postApi("/SFN040207", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                //
            } else if (messageCode == "ERR001") {
                throw 1;
            }
        });
    }

    sfn040208() {
        let requestData = {
            code: this.pageData.partnerCode,
            stockDays: this.pageData.spcStockDays,
            stockType: this.pageData.spcStockType
        };
        return this.postApi("/SFN040208", requestData)
            .then(res => {
                return {fileName: res.data.fileName, filePath: res.data.filePath};
            })
            .catch(err => {
                throw err;
            });
    }

    sfn040209(): Promise<void> {
        let mail = this.pageData.mail;
        let requestData = {
            mail: {
                to: mail.addressTo,
                cc: mail.addressCc,
                subject: mail.subject,
                content: mail.content
            }
        };
        return this.postApi("/SFN040209", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                //
            } else if (messageCode == "ERR001") {
                throw 1;
            }
        });
    }

    sfn040210(): Promise<void> {
        let mail = this.pageData.mail;
        let requestData = {
            mail: {
                to: mail.addressTo,
                cc: mail.addressCc,
                subject: mail.subject,
                content: mail.content
            }
        };
        return this.postApi("/SFN040210", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                //
            } else if (messageCode == "ERR001") {
                throw 1;
            }
        });
    }

    sfn040211() {
        let requestData = {
            code: this.pageData.partnerCode,
            startDate: this.pageData.ppcStartDate,
            endDate: this.pageData.ppcEndDate
        };
        return this.postApi("/SFN040211", requestData)
            .then(res => {
                return {fileName: res.data.fileName, filePath: res.data.filePath};
            })
            .catch(err => {
                throw err;
            });
    }

    sfn040212() {
        let requestData = {
            code: this.pageData.partnerCode,
            keyword: this.pageData.rpcKeyword,
            startDate: this.pageData.rpcStartDate,
            endDate: this.pageData.rpcEndDate
        };
        return this.postApi("/SFN040212", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // get hits
                this.pageData.revenueHits = data["hits"];
                // get revenue data
                let revenues = [];
                this.pageData.revenues = revenues;
                let revenuesData = data["revenues"];
                for (let revenueData of revenuesData) {
                    let revenue = new RevenueModel();
                    revenues.push(revenue);

                    // check
                    revenue.rlt_selected = false;
                    // 売上日
                    revenue.salesDate = DateUtil.getDate(revenueData["salesDate"]);
                    revenue.salesDateStr = DateUtil.formatDate(revenue.salesDate, SFN0402Constants.DATE_DISPLAY);
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
        product.description = SFN0402Helper.getProductDescription(productData);
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

    private getSummaryData(data: any): number[] {
        let summaryData = new Array<number>(12);
        for (let amountData of data) {
            let month = amountData["month"];
            let value = amountData["value"];

            // mapping month
            if (month < 4) {
                // 1,2,3 -> 9,10,11
                summaryData[month + 8] = value;
            } else {
                // 4,..,12 -> 0,..,8
                summaryData[month - 4] = value;
            }
        }
        return summaryData;
    }

    private getMailTemplateData(mailData: any): MailModel {
        let mail = new MailModel();

        mail.addressTo = mailData["to"];
        mail.addressCc = mailData["cc"];
        mail.subject = mailData["subject"];
        mail.content = mailData["content"];

        return mail;
    }



    /**
     * 得意先の届け先一覧を取得する
     *
     * @param customerCode 得意先コード
     * @returns 届け先一覧を返す Promise
     *   届け先一覧には id と deliveryName しか記入されていません。
     */
    public sfn040213GetShippingDestinationList(customerCode: string): Promise<ShippingDestination[]> {
        return this.getApi(`/SFN040213/${customerCode}`).then(res => {
            let data = res.data as SFN040213ResJson;
            let messageCode = res["messageCode"];

            // エラーチェック
            if (messageCode != "INF001") {
                throw res as ErrorJson;
            }

            // JSON を解析
            let result: ShippingDestination[]
                = data.destinations.map(destination => {
                    let model = new ShippingDestination();
                    model.id = destination.id;
                    model.deliveryName = destination.deliveryName;
                    return model;
                });
            return result;
        });
    }

    /**
     * 得意先の届け先詳細を取得する
     *
     * @param customerCode 得意先コード
     * @param shippingDestinationId 届け先 ID
     * @returns 届け先を返す Promise
     */
    public sfn040214GetShippingDestinationDetail(
        customerCode: string,
        shippingDestinationId: number
    ): Promise<ShippingDestination> {
        return this.getApi(`/SFN040214/${customerCode}/${shippingDestinationId}`).then(res => {
            let data = res.data as SFN040214ResJson;
            let messageCode = res["messageCode"];

            // エラーチェック
            if (messageCode != "INF001") {
                throw res as ErrorJson;
            }

            // JSON を解析
            let shippingDestination = new ShippingDestination();
            shippingDestination.setShippingDestination(data.destination);

            return shippingDestination;
        });
    }

    /**
     * 得意先の届け先詳細を保存する
     *
     * @param customerCode 得意先コード
     * @param shippingDestinationId 届け先 ID
     * @param shippingDestination 届け先
     * @returns void を返す Promise
     */
    public sfn040215SaveShippingDestinationDetail(
        customerCode: string,
        shippingDestinationId: number,
        shippingDestination: ShippingDestination
    ): Promise<void> {
        // 要求電文生成
        let req: SFN040215ReqJson = {
            destination: shippingDestination.toShippingDestinationDetailJson()
        };

        // 送信
        return this.postApi(`/SFN040215/${customerCode}/${shippingDestinationId}`, req).then(res => {
            let data = res.data as SFN040215ResJson;
            let messageCode = res["messageCode"];

            // エラーチェック
            if (messageCode != "INF001") {
                throw res as ErrorJson;
            }
        });
    }

    /**
     * 届け先カルテ pdf のファイル名と取得パスを取得する。
     *
     * @param customerCode 得意先コード
     * @param shippingDestinationId 届け先 ID
     * @returns ファイル名と取得パスを返すプロミス
     */
    sfn040217ExportShippingDestinationKartePdf(customerCode: string, shippingDestinationId: number): Promise<FileName> {
        return this.exportKartePdf<SFN040217ResJson>(`/SFN040217/${customerCode}/${shippingDestinationId}`);
    }

    /**
     * カルテ pdf のファイル名と取得パスを取得する。
     *
     * @param <RESPONSE> 応答 JSON の型
     * @param url API パス
     * @returns ファイル名と取得パスを返すプロミス
     */
    private exportKartePdf<RESPONSE extends FileNameResJson>(url: string): Promise<FileName> {
        return this.postApi(url, {})
            .then(res => {
                let data = res.data as RESPONSE;
                let messageCode = res["messageCode"];

                // エラーチェック
                if (messageCode != "INF001") {
                    throw res as ErrorJson;
                }

                return {fileName: data.fileName, filePath: data.filePath};
            });
    }
}
