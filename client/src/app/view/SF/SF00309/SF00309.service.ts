import {CommonService} from "../../../service/common.service";
import { Http, Headers} from "@angular/http";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {DealInfoModel} from "../COMMON/dealinfo/model/DealModel";
import {ProductBoxModel} from "../COMMON/productinfo/model/ProductBox.model";
import {ProductInfoModel} from "../COMMON/productinfo/model/ProductInfo.model";
import {TransactionModel} from "../COMMON/productinfo/model/Transaction.model";
import {InventoryModel} from "../COMMON/productinfo/model/Inventory.model";
import {SF00309Data} from "./SF00309.data";
import {MAIL_REQUEST_BUTTON_VALUE} from "./SF00309.MstData";
// import {RequestModel} from "./model/request.model";
import {MailModel} from "../../../model/common/Mail.model";
import DataUtil from "../../../util/data-util";
import {Constants} from "../../../helper/constants";
import {SF00309Helper} from "./SF00309.helper";

// import {
//     CONTACT_STATE,
//     DESIRED,
//     DISTRIBUTION_RANGE,
//     END_USER,
//     FILLING_METHOD,
//     MATERIAL,
//     PACKAGING_CLASSIFICATION,
//     PACKAGING_CLASSIFICATION_VALUE,
//     PACKAGING_INCLUSION,
//     PRESERVATION_METHOD,
//     SALES_ESTIMATE
// } from "./SF00309.MstData";
import {PRODUCT_TYPE} from "../SF00302/helper/master-option";
import {DepartmentModel} from "../COMMON/model/DepartmentModel";
import {MstLamination} from "../COMMON/model/MstLamination.model";

type ParsedRequestModel = {
    packagingClassification?: string,
    inclusion?: string,
    inclusionText?: string,
    other?: string,
    endUser?: string,
    preservationMethod?: string,
    distributionRange?: string,
    includedCount?: number,
    includedWeightPerUnit?: number,
    salesEstimate?: string,
    contactState?: string,
    material?: string,
    fillingMethod?: string,
    materialOther?: string,
    simultaneousRequest?: string[],
    deliveryDate?: Date,
    desired?: string,
    desiredNumber?: number,
    memo?: string,
    directDestination?: string,
}

type ParsedProductInfoModel = {
    id?: number;
    productCode?: string;
    productName?: string;
    productType?: number;
    material?: string
    sizeH?: number;
    sizeD?: number;
    sizeW?: number;
}

@Injectable()
export class SF00309Service extends CommonService {

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    /*page data*/
    pageData: SF00309Data;

    /*implement method call api get/post to service*/

    /*init data view page*/
    initData(dealCode: string, requestType: number): Promise<void> {
        return this.getApi("SF0030901/" + dealCode + "/" + requestType).then(res => {
            this.pageData              = new SF00309Data();
            this.pageData.dealInfo     = new DealInfoModel();
            this.pageData.productBoxs  = [];
            this.pageData.mailRequest  = new MailModel();

            let data     = res.data;
            //1. deal info
            let dealInfo = data['deal'];
            if (dealInfo) {
                this.pageData.dealInfo.dealId        = dealInfo["id"];
                this.pageData.dealInfo.dealName      = dealInfo["dealName"];
                this.pageData.dealInfo.dealCode      = dealInfo["dealCode"];
                this.pageData.dealInfo.dealType      = dealInfo["dealType"];
                this.pageData.dealInfo.estimateTotal = dealInfo["estTotalDeal"];
                this.pageData.dealInfo.dealStatus    = dealInfo["dealStatus"];
                this.pageData.dealInfo.deliveryDate  = !!dealInfo["deliveryDate"] ? new Date(dealInfo["deliveryDate"]) : undefined;
                this.pageData.dealInfo.templateFlag  = dealInfo["templateFlag"];
                this.pageData.dealInfo.closedFlag  = dealInfo["closedFlag"];
                this.pageData.dealInfo.customerName  = dealInfo["customerName"];
                this.pageData.dealInfo.customerCode  = dealInfo["customerCode"];
                this.pageData.dealInfo.saleName      = dealInfo["salerName"];

            }
            //2. product box
            let productBoxes = data['productBoxes'];
            if (productBoxes) {
                for (let productB of productBoxes) {
                    let productBox = new ProductBoxModel();
                    //2.1product info
                    let pd         = new ProductInfoModel();

                    let product            = productB['product'];
                    pd.setData(product);

                    productBox.product      = pd;
                    //2.2 transactions
                    let transactions        = productB['transactions'];
                    productBox.transactions = [];
                    for (let transaction of transactions) {
                        let transactionTmp = new TransactionModel();

                        transactionTmp.productId      = transaction["productId"];
                        transactionTmp.updatedDate    = transaction["updatedDate"] == null ? null : new Date(transaction["updatedDate"]);
                        transactionTmp.dealName       = transaction["dealName"];
                        transactionTmp.quantity       = transaction["quantity"];
                        transactionTmp.submittedPrice = transaction["submittedPrice"];
                        transactionTmp.total          = transaction["total"];

                        productBox.transactions.push(transactionTmp);
                    }
                    //2.3 inventory
                    let inventory          = productB['inventory'];
                    let invenModel         = new InventoryModel();
                    invenModel.productName = inventory['productName'];
                    invenModel.quantity    = inventory['quantity'];
                    invenModel.unitPrice   = inventory['unitPrice'];
                    invenModel.days        = inventory['days'];

                    productBox.inventory = invenModel;
                    // parse data
                    this.pageData.productBoxs.push(productBox);
                }
                if (this.pageData.productBoxs.length == 1) {
                    this.pageData.productBoxs[0].checked = true;
                }
            }

            //4. templateMail
            let templateMail = data['mailTemplate'];
            if (templateMail) {
                this.pageData.mailRequest.subject   = templateMail["subject"] || "";
                this.pageData.mailRequest.content   = templateMail["content"] || "";
                this.pageData.mailRequest.addressTo = (templateMail["to"] || []).map(item => item);
                this.pageData.mailRequest.addressCc = (templateMail["cc"] || []).map(item => item);
            }

            //5. editing mail
            // 5. Về item [納期]
            // Refer #2235
            // Hiển thị item giống với 納期 của SF003-01.
            // this.pageData.requestModel                         = new RequestModel();

            //6. back up mail request
            this.pageData.mailRequestBackup = SF00309Helper.cloneMailModel(this.pageData.mailRequest);

            //7. get department
            let departments           = data['departments'];
            this.pageData.departments = [];
            this.pageData.userDepartments = [];
            if (!!departments) {
                departments.forEach(item => {
                    let department = new DepartmentModel();
                    department.setDepartment(item);

                    this.pageData.departments.push(department);
                });
            }
            //8. set data screen
            this.pageData.listDepartmentScreen = SF00309Helper.cloneDepartmentModel(this.pageData.departments);
            this.pageData.listPicScreen        = this.pageData.listDepartmentScreen[0].users;
            this.pageData.listPicSearch        = [];


            // get list mst lamination
            this.pageData.mstLaminations = [];
            if (data["laminationJsons"]) {
                for (let i = 0; i < data["laminationJsons"].length; i++) {
                    let mstLamination = new MstLamination();
                    mstLamination.setData(data["laminationJsons"][i]);
                    this.pageData.mstLaminations.push(mstLamination);
                }
            }

            // 依頼タイプ
            this.pageData.requestType = requestType;

            // 依頼するボタンのラベル
            this.pageData.requestButtonLabel = MAIL_REQUEST_BUTTON_VALUE[requestType];

        }).catch(err => {
            throw err;
        });
    }

    saveTemporaryFile(file: File): Promise<void> {
        let url = '/CM0010101';

        let headers: Headers = new Headers();
        // headers.append('Content-Type', 'multipart/form-data; charset=UTF-8');
        headers.append('X-Requested-With', 'XMLHttpRequest');
        headers.append('Accept', 'application/json');

        let formData = new FormData();
        formData.append('file', file);

        return this.http.post(url, formData, {headers: headers})
            .toPromise()
            .then((response) => {
                if (!response.ok) throw response;

                let text = response.text();
                if (text === '') throw response;

                let res = JSON.parse(text).res;
                if (!res || !res.data || !res.data.fileName) throw response;
                return res.data.fileName;
            })
            .catch(err => {
                console.error('error', err);
                return err.json().then(Promise.reject.bind(Promise))
            });
    }

    /*send mail request*/
    sendMailRequest(): Promise<void> {
        /*data request*/
        let mailModel = this.pageData.mailRequest;
        let req       =
                {
                    to          : mailModel.addressTo,
                    cc          : mailModel.addressCc,
                    subject     : mailModel.subject,
                    content     : mailModel.content,
                    dealId      : this.pageData.dealInfo.dealId,
                    products    : this.parseProductModels(this.pageData.selectedProducts, this.pageData.mstLaminations),
                    requestType : this.pageData.requestType,
                    attachmentFiles: mailModel.attachmentFiles
                };

        this.pageData.countRecord = this.parseProductModels(this.pageData.selectedProducts, this.pageData.mstLaminations).length;
        // call api
        return this.postApi("/SF0030902", req).then(() => {
            //do something
        }, err => {
            throw err;
        });
    }

    private parseProductModels(products: ProductInfoModel[], mstLaminations: MstLamination[]): ParsedProductInfoModel[] {
        return (products || []).map(item => {
            let p: ParsedProductInfoModel = {};
            p.id                          = item.id;
            p.productCode                 = item.productCode;
            p.productName                 = item.productName;
            p.material                    = item.material(mstLaminations);
            p.productType                 = item.productType;
            p.sizeD                       = item.sizeD;
            p.sizeH                       = item.sizeH;
            p.sizeW                       = item.sizeW;
            return p;
        })

    }
}
