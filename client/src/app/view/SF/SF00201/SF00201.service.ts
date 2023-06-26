import {Injectable} from "@angular/core";
import {CommonService} from "../../../service/common.service";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {SF00201_Template} from "./model/SF00201_Template.model";
import {SF00201Data} from "./SF00201.data";
import {Constants} from "../../../helper/constants";
import {SF00201_Product} from "./model/SF00201_Product.model";

@Injectable()
export class SF00201Service extends CommonService {
    private _sf00201Data: SF00201Data = new SF00201Data();

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    public get sf00201Data(): SF00201Data { return this._sf00201Data }

    /**
     * Service to get total item.
     * @return {Promise<void>}
     */
    public getTotal(): Promise<void> {
        return this
            .getApi("/SF0020103")
            .then(res => {
                this.sf00201Data.totalRecords = res.data.count;
            });
    }

    /**
     * Service to load template by range.
     * @param pageIndex page index to get
     * @return {Promise<void>}
     */
    public getData(pageIndex?: number): Promise<void> {
        let offset = ((pageIndex || Constants.FIRST_PAGE) - 1) * this.sf00201Data.pageSize;
        let limit  = this.sf00201Data.pageSize;
        return this
            .getApi(`/SF0020101/${offset}/${limit}`)
            .then(res => {
                this.sf00201Data.templates = res.data.templates.map(templateData => this.parseTemplate(templateData));
                this.sf00201Data.totalRecords = res.data.totalRecords || 0;
            });
    }

    /**
     * Add template to mybox.
     *
     * @param template template id
     */
    public addTemplateToMyBox(template: SF00201_Template): Promise<void> {
        return this
            .getApi(`/SF0020102/${template.id}`)
            .then(res => {
                template.isInMybox = res.data.myboxId > 0;
            });
    }

    private parseTemplate(data: any): SF00201_Template {
        let template         = new SF00201_Template();
        template.id          = data["id"];
        template.createdUser = data["createdUser"];
        template.updatedUser = data["updatedUser"];
        template.createdDate = !!data["createdDate"] ? new Date(data["createdDate"]) : undefined;
        template.updatedDate = !!data["updatedDate"] ? new Date(data["updatedDate"]) : undefined;
        template.dealCode    = data["dealCode"];
        template.dealName    = data["dealName"];
        template.product     = !!data["product"] ? parseProduct(data["product"]) : undefined;
        template.isInMybox   = data["isInMybox"];
        return template;

        function parseProduct(data: any): SF00201_Product {
            let product = new SF00201_Product();
            product.id = data["id"];
            product.createdUser = data["createdUser"];
            product.updatedUser = data["updatedUser"];
            product.createdDate = !!data["createdDate"] ? new Date(data["createdDate"]) : undefined;
            product.updatedDate = !!data["updatedDate"] ? new Date(data["updatedDate"]) : undefined;
            product.productName = data["productName"];
            product.memo = data["memo"];
            product.sizeH = data["sizeH"];
            product.sizeD = data["sizeD"];
            product.sizeW = data["sizeW"];
            product.paperName = data["paperName"];
            product.paperWeight = data["paperWeight"];
            product.impositionNumber = data["impositionNumber"];
            product.colorFSelect = data["colorFSelect"];
            product.woodenCode = data["woodenCode"];
            product.surfaceF_varnishType = data["surfaceF_varnishType"];
            product.application = data["application"];
            product.paperNameId = data["paperNameId"];
            product.originalName = data["originalName"];
            product.srcImg = data["srcImg"];
            return product;
        }
    }

}
