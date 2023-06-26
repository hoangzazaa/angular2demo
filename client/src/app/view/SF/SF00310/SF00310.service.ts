import {CommonService} from "../../../service/common.service";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {SF00310Data} from "./SF00310.data";
import {Injectable} from "@angular/core";
import {DealInfoModel} from "../COMMON/dealinfo/model/DealModel";
import {ProductBoxModel} from "../COMMON/productinfo/model/ProductBox.model";
import {ProductInfoModel} from "../COMMON/productinfo/model/ProductInfo.model";
import {TransactionModel} from "../COMMON/productinfo/model/Transaction.model";
import {InventoryModel} from "../COMMON/productinfo/model/Inventory.model";
import {RequestModel} from "./model/request.model";
import {SF00310Helper} from "./SF00310.helper";
import {MailModel} from "../../../model/common/Mail.model";
import {Constants} from "../../../helper/constants";
import {RANK} from "./SF00310.MstData";
import DataUtil from "../../../util/data-util";
import {DepartmentModel} from "../COMMON/model/DepartmentModel";
import {MstLamination} from "../COMMON/model/MstLamination.model";

type ParsedRequestModel = {
    rank?: string;
    target?: string;
    rse?: string;
    department?: string;
    designConcept?: string;
    methodStereoscopicDummy?: string;
    flatOutput?: string;
    desiredDeliveryDate?: Date;
    submissionDeadline?: Date;
    memo?: string;
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
export class SF00310Service extends CommonService {

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    /*page data*/
    pageData: SF00310Data;

    /*implement method call api get/post to service*/

    /*init data view page*/
    initData(dealCode: string): Promise<void> {
        return this.getApi("SF0031001/" + dealCode).then(res => {
            this.pageData              = new SF00310Data();
            this.pageData.dealInfo     = new DealInfoModel();
            this.pageData.productBoxs  = [];
            this.pageData.mailRequest  = new MailModel();
            this.pageData.requestModel = new RequestModel();
            let data                   = res.data;
            //1. deal info
            let dealInfo               = data['deal'];
            if (dealInfo) {
                this.pageData.dealInfo.dealId        = dealInfo["id"];
                this.pageData.dealInfo.dealName      = dealInfo["dealName"];
                this.pageData.dealInfo.dealCode      = dealInfo["dealCode"];
                this.pageData.dealInfo.dealType      = dealInfo["dealType"];
                this.pageData.dealInfo.estimateTotal = dealInfo["estTotalDeal"];
                this.pageData.dealInfo.dealStatus    = dealInfo["dealStatus"];
                this.pageData.dealInfo.deliveryDate  = !!dealInfo["deliveryDate"] ? new Date(dealInfo["deliveryDate"]) : undefined;
                this.pageData.dealInfo.templateFlag  = dealInfo["templateFlag"];
                this.pageData.dealInfo.closedFlag    = dealInfo["closedFlag"];
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

                    let product = productB['product'];
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

                //3. create model request
                this.pageData.requestModel = new RequestModel();

                //4. templateMail
                let templateMail = data['mailTemplate'];
                if (templateMail) {
                    this.pageData.mailRequest.subject   = templateMail["subject"] || "";
                    this.pageData.mailRequest.content   = templateMail["content"] || "";
                    this.pageData.mailRequest.addressTo = (templateMail["to"] || []).map(item => item);
                    this.pageData.mailRequest.addressCc = (templateMail["cc"] || []).map(item => item);
                }

                //5. back up mail request
                this.pageData.mailRequestBackup = SF00310Helper.cloneMailModel(this.pageData.mailRequest);

                //6. get department
                let departments               = data['departments'];
                this.pageData.departments     = [];
                this.pageData.userDepartments = [];
                if (!!departments) {
                    departments.forEach(item => {
                        let department = new DepartmentModel();
                        department.setDepartment(item);

                        this.pageData.departments.push(department);
                    });
                }

                //7. set data screen
                this.pageData.listDepartmentScreen = SF00310Helper.cloneDepartmentModel(this.pageData.departments);
                this.pageData.listPicScreen        = this.pageData.listDepartmentScreen[0].users;
                this.pageData.listPicSearch        = [];

                //4 read mst lamination
                this.pageData.mstLaminations = [];
                if (data["laminationJsons"]) {
                    for (let i = 0; i < data["laminationJsons"].length; i++) {
                        let mstLamination = new MstLamination();
                        mstLamination.setData(data["laminationJsons"][i]);
                        this.pageData.mstLaminations.push(mstLamination);
                    }
                }
            }
        }, err => {
            throw err;
        });
    }

    /*send mail request*/
    sendMailRequest(): Promise<void> {
        let mailModel = this.pageData.mailRequest;
        let dealInfo  = this.pageData.dealInfo;
        let req       =
                {
                    mail        : {
                        to     : mailModel.addressTo,
                        cc     : mailModel.addressCc,
                        subject: mailModel.subject,
                        content: mailModel.content,
                    },
                    deal        : {
                        id          : dealInfo.dealId,
                        dealName    : dealInfo.dealName,
                        dealCode    : dealInfo.dealCode,
                        dealType    : dealInfo.dealType,
                        estTotalDeal: dealInfo.estimateTotal,
                        dealStatus  : dealInfo.dealStatus,
                        deliveryDate: dealInfo.deliveryDate,
                        templateFlag: dealInfo.templateFlag,
                        customerName: dealInfo.customerName,
                        customerCode: dealInfo.customerCode,
                        salerName   : dealInfo.saleName,
                    },
                    products    : this.parseProductModels(this.pageData.selectedProducts, this.pageData.mstLaminations),
                    requestModel: this.parseRequestModel(this.pageData.requestModel)
                };

        this.pageData.countRecord = this.parseProductModels(this.pageData.selectedProducts, this.pageData.mstLaminations).length;
        // call api
        return this.postApi("/SF0031002", req).then(() => {
            //do something
        }, err => {
            throw err;
        });
    }

    private parseRequestModel(model: RequestModel): ParsedRequestModel {
        return {
            rank                   : DataUtil.getData(RANK, Constants.BLANK, model.rank),
            target                 : model.target,
            rse                    : model.rse,
            department             : model.department,
            designConcept          : model.designConcept,
            methodStereoscopicDummy: model.methodStereoscopicDummy,
            flatOutput             : model.flatOutput,
            desiredDeliveryDate    : model.desiredDeliveryDate,
            submissionDeadline     : model.submissionDeadline,
            memo                   : model.memo,
        };
    }

    private parseProductModels(products: ProductInfoModel[], mstLaminations: MstLamination[]): ParsedProductInfoModel[] {
        return (products || []).map(item => {
            return {
                id         : item.id,
                productCode: item.productCode,
                productName: item.productName,
                material   : item.material(mstLaminations),
                productType: item.productType,
                sizeD      : item.sizeD,
                sizeH      : item.sizeH,
                sizeW      : item.sizeW
            };
        });
    }

}
