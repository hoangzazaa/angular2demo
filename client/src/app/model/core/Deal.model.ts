import {User} from "./User.model";
import {Customer} from "./Customer.model";
import {MyboxItem} from "./MyboxItem.model";
import {DealProduct} from "./DealProduct.model";
import {Quotation} from "./Quotation.model";
import {Comment} from "./Comment.model";
import {Checklist} from "./Checklist.model";
import {DealFile} from "./DealFile.model";
import {Order} from "./Order.model";
import {BaseModel} from "./BaseModel.model";
import {TEMPLATE_DEAL} from "../../helper/mst-data-type";

export class Deal extends BaseModel {

    /* 案件名 */
    public dealName: string;

    /* 案件ID */
    public dealCode: string;

    /* 案件区分 */
    public dealType: number;

    /* 担当営業名 */
    public salesId: number;

    /* 受注予定額 */
    public estTotalDeal: number;

    /* ステータス */
    public dealStatus: number;

    /* 得意先ID */
    public customerId: number;

    /* 得意先Name */
    public customerName: string;

    /* userId */
    public userId: number;

    /* 納期 */
    public deliveryDate: Date;

    /* templateFlag */
    public templateFlag: number;

    /* deleteFlag */
    public deleteFlag: number;

    /* closedFlag */
    public closedFlag: number;

    /* userRsDeal */
    public user: User;

    /* customerRsDeal */
    public customer: Customer;

    /* dealRsMyboxItem */
    public myboxItems: MyboxItem[];

    /* dealRsDealProduct */
    public dealProducts: DealProduct[];

    /* dealRsQuotation */
    public quotations: Quotation[];

    /* dealRsComment */
    public comments: Comment[];

    /* dealRsChecklist */
    public checklist: Checklist[];

    /* dealRsDealFile */
    public dealFiles: DealFile[];

    /* dealRsOrder */
    public order: Order;

    /* salesRsDeal */
    public sales: User;

    get isTemplate() {
        return this.templateFlag == TEMPLATE_DEAL.TRUE;
    }

    get isClosed():boolean{
        return !!this.closedFlag;
    }

    public setDeal(data: any) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.dealName = data["dealName"];
        this.dealCode = data["dealCode"];
        this.dealType = data["dealType"];
        this.salesId = data["salesId"];
        this.estTotalDeal = data["estTotalDeal"];
        this.dealStatus = data["dealStatus"];
        this.customerId = data["customerId"];
        this.customerName = data["customerName"];
        this.userId = data["userId"];
        this.deliveryDate = data["deliveryDate"] != undefined ? new Date(data["deliveryDate"]) : undefined;
        this.templateFlag = data["templateFlag"];
        this.deleteFlag = data["deleteFlag"];
        this.closedFlag = data["closedFlag"];

        if (data["user"] !== undefined) {
            this.user = new User();
            this.user.setUser(data["user"]);
        }

        if (data["customer"] !== undefined) {
            this.customer = new Customer();
            this.customer.setCustomer(data["customer"]);
        }

        if (data["myboxItems"] !== undefined) {
            this.myboxItems = [];
            for (let i = 0; i < data["myboxItems"].length; i++) {
                let tmp = new MyboxItem();
                tmp.setMyboxItem(data["myboxItems"][i]);
                this.myboxItems.push(tmp);
            }
        }
        if (data["dealProducts"] !== undefined) {
            this.dealProducts = [];
            for (let i = 0; i < data["dealProducts"].length; i++) {
                let tmp = new DealProduct();
                tmp.setDealProduct(data["dealProducts"][i]);
                this.dealProducts.push(tmp);
            }
        }
        if (data["quotations"] !== undefined) {
            this.quotations = [];
            for (let i = 0; i < data["quotations"].length; i++) {
                let tmp = new Quotation();
                tmp.setQuotation(data["quotations"][i]);
                this.quotations.push(tmp);
            }
        }
        if (data["comments"] !== undefined) {
            this.comments = [];
            for (let i = 0; i < data["comments"].length; i++) {
                let tmp = new Comment();
                tmp.setComment(data["comments"][i]);
                this.comments.push(tmp);
            }
        }
        if (data["checklist"] !== undefined) {
            this.checklist = [];
            for (let i = 0; i < data["checklist"].length; i++) {
                let tmp = new Checklist();
                tmp.setChecklist(data["checklist"][i]);
                this.checklist.push(tmp);
            }
        }
        if (data["dealFiles"] !== undefined) {
            this.dealFiles = [];
            for (let i = 0; i < data["dealFiles"].length; i++) {
                let tmp = new DealFile();
                tmp.setDealFile(data["dealFiles"][i]);
                this.dealFiles.push(tmp);
            }
        }
        if (data["order"] !== undefined) {
            this.order = new Order();
            this.order.setOrder(data["order"]);
        }

        if (data["sales"] !== undefined) {
            this.sales = new User();
            this.sales.setUser(data["sales"]);
        }

    }
}
