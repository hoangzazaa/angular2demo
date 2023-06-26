/**
 * Created by haipt on 11/8/2016.
 */
import {Component, AfterViewInit, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {SF00304Service} from "./SF00304.service";
import {QuotationPrintTemplate} from "../../../model/core/QuotationPrintTemplate.model";
import {HeaderProvider} from "../SF00100/Header.provider";
import {Constants} from "../../../helper/constants";
import {CommonPage} from "../COMMON/common.page";
import Messages from "../../../helper/message";
import {MSG} from "../../../helper/message";

declare var $: any;
declare var App: any;
const SF00304_PAGE_TITLE: string = "見積書出力";

@Component({
    templateUrl: "./SF00304.page.html",
    styleUrls: ["SF00304.page.css"],
    providers: [SF00304Service]
})

export class SF00304Page extends CommonPage implements AfterViewInit,OnInit {
    option: number;
    quotationCode: String;
    quotationTemplateModel: QuotationPrintTemplate[];
    fileName: string;
    image: any;
    templateApplication: String;
    templateDate: Date;
    templateName: String;
    createdTimestamp: String;

    selectedTemplate: QuotationPrintTemplate;

    ngOnInit(): void {
        this.sv00304Service.navigateTo("見積書出力", this.router.url);
        this.quotationTemplateModel = this.route.snapshot.data["quotationTemplates"]["quotationTemplates"];
        this.sortQuotationtemplateModel();
    }

    ngAfterViewInit(): void {
        this.quotationCode = this.route.snapshot.params["quotationCode"];
        var option = this.route.snapshot.params["option"];

        this.option = option;
        this.fileName = "見積書" + this.quotationCode;
        this.quotationTemplateModel.map(tmp => {
            if (tmp.selectOption == this.option) {
                this.generateFiles(tmp);
            }
        })
        $("#fileName").rules("add", {
            required: true,
            messages: {
                required: "Please enter file name"
            }
        });
    }

    // DBを変更するのを避けるためJSにて表示調整
    // 以下に並べ替え。そしえて横レイアウトのみにフィルタリング
    /*
        3: サガシキ標準：横（角印あり）
        4: サガシキ標準：横（角印なし）
        1: サガシキ標準：縦（角印あり）
        2: サガシキ標準：縦（角印なし）
        7: アクトン標準：横（角印あり）
        8: アクトン標準：横（角印なし）
        5: アクトン標準：縦（角印あり）
        6: アクトン標準：縦（角印なし）
    */
    sortQuotationtemplateModel() {
        var id_order = [ 3,4,7,8 ];
        this.quotationTemplateModel = this.quotationTemplateModel
            .filter((o)=>{
                return id_order.indexOf(o.id) > -1;
            })
            .sort((a, b) => {
                let ao = id_order.indexOf(a.id), bo = id_order.indexOf(b.id);
                if ( ao < bo ) return -1;
                else return 1;
            });
    }

    constructor(route: ActivatedRoute, router: Router, headerProvider: HeaderProvider,
                public sv00304Service: SF00304Service) {
        super(router, route, headerProvider);

        this.quotationTemplateModel = [];
    }

    protected initBreadcrumb(): void {
        let self = this;

        let sf0301Path = "/home/deal/" + self.route.snapshot.params["dealCode"]; //SF003-01
        let sf0303Path = sf0301Path + "/quotation/" + self.route.snapshot.params["quotationCode"]; //SF003-03

        self.headerProvider.reset();
        self.headerProvider.pageName = SF00304_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(Constants.TOP, [Constants.SLASH]);
        self.headerProvider.addBreadCrumb(Constants.DEAL_OVERVIEW_BREADCRUMB, [sf0301Path]);
        self.headerProvider.addBreadCrumb("見積情報", [sf0303Path]);
        self.headerProvider.addBreadCrumb(SF00304_PAGE_TITLE);
    }

    public exportQuotation() {
        if(this.selectedTemplate == undefined || this.selectedTemplate == null) {
            this.selectedTemplate = this.quotationTemplateModel[0];
        }
        this.sv00304Service.exportPdf(this.quotationCode, this.selectedTemplate.selectOption, this.fileName)
            .then(result => {
                window.open(result.pdfFilePath, '_blank');
            })
            .catch(err => {
                swal(Constants.BLANK, Messages.get(MSG.SF00305.ERR007), "error")
            });
    }



    public generateFiles(quotationTemplate: QuotationPrintTemplate) {
        if ($("#validateForm").valid()) {
            this.selectedTemplate = quotationTemplate;
            this.templateName = quotationTemplate.fileName;
            this.templateApplication = quotationTemplate.application;
            this.templateDate = quotationTemplate.updatedDate;
            this.option = quotationTemplate.selectOption;
            this.sv00304Service.exportFiles(this.quotationCode, quotationTemplate.selectOption, this.fileName).then(data => {
                // this.createdTimestamp = data["filePath"];
                this.image = data["pngFilePath"];
            }).catch(err => {
                swal(Constants.BLANK, Messages.get(MSG.SF00305.ERR008), "error")
            });
        }
    }

    backToPrevious() {
        this.router.navigate(['home/deal', this.route.snapshot.params["dealCode"], "quotation", this.quotationCode]);
    }

    sendQuotationMail() {
        this.router.navigate(['home/deal', this.route.snapshot.params["dealCode"], "mailQuotation", this.quotationCode]);
    }
}
