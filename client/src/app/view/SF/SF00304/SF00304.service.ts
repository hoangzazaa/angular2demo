import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Http, Response} from "@angular/http";
import {CommonService} from "../../../service/common.service";
import {SF0030404Req} from "../../../model/request/SF0030404Req";
import {QuotationPrintTemplate} from "../../../model/core/QuotationPrintTemplate.model";
/**
 * Created by haipt on 11/8/2016.
 */
@Injectable()
export class SF00304Service extends CommonService {
    constructor(http: Http, router: Router) {
        super(http, router);
    }

    public getAllQuotationTemplates() {
        return this.getApi("/SF0030401").then(res => {
            let req = new SF0030404Req();
            req.quotationTemplates = [];

            res.data["quotationTemplateJsons"].forEach((tmp) => {
                let quotationTemplate = new QuotationPrintTemplate;
                quotationTemplate.setQuotationPrintTemplate(tmp);

                req.quotationTemplates.push(tmp);
            });

            return req;
        })
    }

    public exportFiles(quotationCode: String, option: number, fileName: string) {
        return this.getApi("/SF0030402/" + quotationCode + "/" + option + "/" + encodeURIComponent(fileName)).then(res => {
            return res.data;
        })
    }

    public exportPdf(quotationCode: String, option: number, fileName: string) {
        return this.getApi("/SF0030402/"+quotationCode+"/"+option + "/"+ encodeURIComponent(fileName))
            .then(res => {
                return {pdfFilePath: res.data.pdfFilePath, pngFilePath: res.data.pngFilePath};
            })
            .catch(err => {
                throw err;
            });
    }
}