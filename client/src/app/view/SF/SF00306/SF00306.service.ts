import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import Messages, {MSG} from "../../../helper/message";
import {MailModel} from "../../../model/common/Mail.model";
import {Department} from "../../../model/core/Department.model";
import {CommonService} from "../../../service/common.service";
import {CheckSheetModel} from "../COMMON/checksheet/model/CheckSheet.model";
import {DealInfoModel} from "../COMMON/dealinfo/model/DealModel";
import {MstLamination} from "../COMMON/model/MstLamination.model";
import {InventoryModel} from "../COMMON/productinfo/model/Inventory.model";
import {ProductInfoModel} from "../COMMON/productinfo/model/ProductInfo.model";
import {TransactionModel} from "../COMMON/productinfo/model/Transaction.model";
import {ProductBoxModel} from "./model/ProductBox.model";
import {SF00306Data} from "./SF00306.data";
import {SF00306Helper} from "./SF00306.helper";
import {Constants} from "../../../helper/constants";

@Injectable()
export class SF00306Service extends CommonService {

    private _pageData: SF00306Data;

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    public get pageData(): SF00306Data {
        return this._pageData;
    }

    //1. get init data
    public initData(dealCode: string): Promise<void> {
        this._pageData = new SF00306Data();
        return this.getApi("SF0030601/" + dealCode).then(res => {
            let data                = res.data;
            //1. deal info
            let dealInfo            = data['deal'];
            this._pageData.dealInfo = new DealInfoModel();
            if (dealInfo) {
                this._pageData.dealInfo.dealId        = dealInfo["id"];
                this._pageData.dealInfo.dealName      = dealInfo["dealName"];
                this._pageData.dealInfo.dealCode      = dealInfo["dealCode"];
                this._pageData.dealInfo.dealType      = dealInfo["dealType"];
                this._pageData.dealInfo.estimateTotal = dealInfo["estTotalDeal"];
                this._pageData.dealInfo.dealStatus    = dealInfo["dealStatus"];
                this._pageData.dealInfo.deliveryDate  = !!dealInfo["deliveryDate"] ? new Date(dealInfo["deliveryDate"]) : undefined;
                this._pageData.dealInfo.templateFlag  = dealInfo["templateFlag"];
                this._pageData.dealInfo.closedFlag    = dealInfo["closedFlag"];
                this._pageData.dealInfo.customerName  = dealInfo["customerName"];
                this._pageData.dealInfo.customerCode  = dealInfo["customerCode"];
                this._pageData.dealInfo.saleName      = dealInfo["salerName"];
                this._pageData.dealInfo.jobInprocess  = dealInfo["jobInprocess"];

            }
            //2. checkSheets
            let checkSheets            = data['checkSheets'];
            this._pageData.checkSheets = [];
            if (checkSheets) {
                for (let checkSheet of checkSheets) {
                    let checkSheetTmp                                      = new CheckSheetModel();
                    checkSheetTmp.id                                       = checkSheet["id"];
                    checkSheetTmp.questionCode                             = checkSheet["questionCode"];
                    checkSheetTmp.textArea1                                = checkSheet["textArea1"];
                    checkSheetTmp.textArea2                                = checkSheet["textArea2"];
                    checkSheetTmp.radioButton                              = checkSheet["radioButton"];
                    checkSheetTmp.selectBox1                               = checkSheet["selectBox1"];
                    checkSheetTmp.selectBox2                               = checkSheet["selectBox2"];
                    checkSheetTmp.selectBox3                               = checkSheet["selectBox3"];
                    checkSheetTmp.dealId                                   = checkSheet["dealId"];
                    checkSheetTmp.checkBox1                                = checkSheet["checkBox1"];
                    checkSheetTmp.checkBox2                                = checkSheet["checkBox2"];
                    checkSheetTmp.checkBox3                                = checkSheet["checkBox3"];
                    this._pageData.checkSheets[checkSheetTmp.questionCode] = checkSheetTmp;
                }
            }
            //3. product box
            let productBoxes           = data['productBoxes'];
            this._pageData.productBoxs = [];
            if (productBoxes) {
                for (let productB of productBoxes) {
                    let productBox = new ProductBoxModel();
                    //1.product info
                    let pd         = new ProductInfoModel();
                    let product    = productB['product'];
                    pd.setData(product);

                    productBox.product      = pd;
                    //2.transactions
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
                    //3. inventory
                    let inventory          = productB['inventory'];
                    let invenModel         = new InventoryModel();
                    invenModel.productName = inventory['productName'];
                    invenModel.quantity    = inventory['quantity'];
                    invenModel.unitPrice   = inventory['unitPrice'];
                    invenModel.days        = inventory['days'];

                    productBox.inventory = invenModel;
                    // parse data
                    this._pageData.productBoxs.push(productBox);
                }
                if (this._pageData.productBoxs.length == 1
                    && this._pageData.productBoxs[0].product.requestDesignFlag != 1) {
                    this._pageData.productBoxs[0].checked = true;
                }
            }

            //4. templateMail
            let templateMail        = data['templateMail'];
            this.pageData.mailModel = new MailModel();
            if (templateMail) {
                this.pageData.mailModel.subject   = templateMail["subject"] || "";
                this.pageData.mailModel.content   = templateMail["content"] || "";
                this.pageData.mailModel.addressTo = (templateMail["to"] || []).map(item => item);
                this.pageData.mailModel.addressCc = (templateMail["cc"] || []).map(item => item);
            }

            //5. editing mail
            this.pageData.mailModelScreen = SF00306Helper.cloneMailModel(this.pageData.mailModel);

            //6. get department
            let departments               = data['departments'];
            this.pageData.departments     = [];
            this.pageData.userDepartments = [];
            if (!!departments) {
                departments.forEach(item => {
                    let department = new Department();
                    department.setDepartment(item);

                    this.pageData.departments.push(department);
                });
            }

            //7. set data screen
            this.pageData.listDepartmentScreen = SF00306Helper.cloneDepartmentModel(this.pageData.departments);
            this.pageData.listPicScreen        = this.pageData.listDepartmentScreen[0].users;
            this.pageData.listPicSearch        = [];

            // 8. get list mst lamination
            let laminations = data["laminations"];
            if (!!laminations) {
                this._pageData.mstLaminations = [];
                for (let i = 0; i < laminations.length; i++) {
                    let mstLamination = new MstLamination();
                    mstLamination.setData(laminations[i]);
                    this._pageData.mstLaminations.push(mstLamination);
                }
            }

        }).catch(err => {
            throw err;
        });
    }

    //2. send mail
    public sendMail(): Promise<void> {
        this.pageData.messageMail = "";
        let req                   =
                {
                    to        : this.pageData.mailModelScreen.addressTo,
                    cc        : this.pageData.mailModelScreen.addressCc,
                    subject   : this.pageData.mailModelScreen.subject,
                    content   : this.pageData.mailModelScreen.content,
                    dealId    : this.pageData.dealInfo.dealId,
                    dealStatus: this.pageData.dealInfo.dealStatus,
                    products  : this.pageData.selectedProducts,
                };

        return this.postApi('SF0030602', req).then(res => {
            //1. success request, 0 product
            // message: Request design fail(0/n products)
            // Send in form mail success
            // redirect -> SF00301
            this.pageData.messageMail = Messages.get(MSG.SF00306.INF001);

            return res;
        }).catch(err => {
            this.pageData.messageMail = Messages.get(MSG.SF00306.ERR010);
            throw err;
        });
    }

    updateProductLot(product: ProductInfoModel): Promise<void> {
        let req = {id: product.id, requestLot: product.requestLot};
        return this.postApi("/SF0030603", req).then(res => {
        }).catch(err => {
            throw err;
        });
    }

    SF0030604(productCode: string): Promise<{ fileName: string, filePath: string }> {
        let req = {
            productCode: productCode,
            dealCode: this.pageData.dealInfo.dealCode
        };
        return this.postApi("/SF0030604", req)
            .then(res => {
                return {fileName: res.data.fileName, filePath: res.data.filePath};
            })
            .catch(err => {
                throw err;
            });
    }


}
