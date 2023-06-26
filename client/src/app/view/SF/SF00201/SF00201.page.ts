import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import Message, {MSG} from "../../../helper/message";
import {SF00201Service} from "./SF00201.service";
import {SF00201Data} from "./SF00201.data";
import {SF00201_Template} from "./model/SF00201_Template.model";
import {SF00201_Product} from "./model/SF00201_Product.model";
import {Constants} from "../../../helper/constants";
import ValidatorUtil from "../../../util/validator-util";
import DataUtil from "../../../util/data-util";
import {PRINT_METHOD, SURFACE_TREATMENT} from "../../../helper/mst-data-type";
import {FormatUtil} from "../../../util/format-util";
import {HeaderProvider} from "../SF00100/Header.provider";
import {CommonPage} from "../COMMON/common.page";

const SF00201_PAGE_TITLE: string = "新規案件追加";

@Component({
    selector   : "sf002-01-div",
    templateUrl: "./SF00201.page.html",
})
export class SF00201Page extends CommonPage implements OnInit {

    constructor(router: Router, route: ActivatedRoute, headerProvider: HeaderProvider,
                public sf00201Service: SF00201Service) {
        super(router, route, headerProvider);
    }

    protected pageTile(): string {
        return SF00201_PAGE_TITLE;
    }

    ngOnInit(): void {
        this.sf00201Service.getData(Constants.FIRST_PAGE).then(() => {
        });
    }

    productInfo(template: SF00201_Template): SF00201_Product {
        let product = new SF00201_Product();
        if (template && template.product) {
            product = template.product;
        }

        return product;
    }

    get sf00201Data(): SF00201Data {
        return this.sf00201Service.sf00201Data;
    }

    get totalRecords(): number {
        return this.sf00201Data.totalRecords;
    }

    get templates(): SF00201_Template[] {
        return this.sf00201Data.templates;
    }

    get pageSize(): number {
        return this.sf00201Data.pageSize;
    }

    //template.product.srcImg
    srcImg(template: SF00201_Template): string {
        if (!!template.product)
            return template.product.srcImg;

        return null;
    }

    /**
     * Method use to navigate to screen SF003-01 by copy & add deals.
     * url: /home/deals/create?from=[dealCode]
     * @param dealCode the deals code
     * @returns {Promise<boolean>}
     */
    copyAndAddDeal(template: SF00201_Template): void {
        this.router.navigate(['home/deal/create'], {queryParams: {from: template.dealCode}}).then(() => {
        });
    }

    /**
     * Method use to navigate to screen SF003-01 at view mode, user cannot edit.
     * @param template the template
     * @returns {Promise<boolean>}
     */
    viewTemplate(template: SF00201_Template): void {
        this.router.navigate([`home/deal/${template.dealCode}`]).then(() => {
        });
    }

    /*Check current templates-product includes product*/
    hasProduct(template: SF00201_Template) {
        return true;
    }

    /*Format dimension display as 'size x depth x height'*/
    getDimension(product: SF00201_Product) {
        if (!!product)
            return FormatUtil.formatDimension(Constants.X_SEPARATOR, product.sizeW, product.sizeD, product.sizeH);
        return Constants.BLANK;
    }

    /*Format imposition-number display as 'imposition-number 丁'*/
    getImpositionNumber(imposition: number) {
        if (ValidatorUtil.isNotEmpty(imposition))
            return imposition + Constants.IMPOSITION_SIGN;

        return Constants.BLANK;
    }

    /*Get the name of print method based on the key*/
    getPrintMethod(printMethod: number) {
        return DataUtil.getData(PRINT_METHOD, Constants.BLANK, printMethod);
    }

    /*Get the name of surface-treatment based on the key*/
    getSurfaceTreatment(surfaceTreatmentId: number) {
        return DataUtil.getData(SURFACE_TREATMENT, Constants.BLANK, surfaceTreatmentId);
    }

    /*Format name of paper display as 'paper name + paper-weight'*/
    getPaperName(product: SF00201_Product) {
        return FormatUtil.formatPaperName_V1(product);
    }

    /**
     * Add template to mybox.
     * @param template current template
     */
    addTemplateToMybox(template: SF00201_Template): void {
        this.sf00201Service
            .addTemplateToMyBox(template)
            .then(() => {
                $.notify({message: Message.get(MSG.SF00201.INF001)}, {type: 'success'});
            });
    }

    /**
     * Load template belong to currentPage.
     * @param pageIndex
     */
    protected onPageChange(pageIndex: number): void {
        this.sf00201Service
            .getData(pageIndex)
            .then(() => this.$scrollTop("#templatesList"));
    }

}
