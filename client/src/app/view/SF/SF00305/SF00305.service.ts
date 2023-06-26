import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {CommonService} from "../../../service/common.service";
import {SF00305Data} from "./SF00305.data";

@Injectable()
export class SF00305Service extends CommonService {
    pageData: SF00305Data;

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    /**
     * Get init SF00305
     *
     * @param quotationCode
     * @returns {Promise<void>}
     */
    getInit(quotationCode: string): Promise<void> {
        return this.getApi("SF0030501/" + quotationCode).then(res => {
            this.pageData = new SF00305Data();
            this.pageData.setSF00305Data(res.data);
        }).catch(err => {
            throw err;
        })
    }

    /**
     * Send mail request
     */
    sendMail(pageData: SF00305Data): Promise<void> {
        let data = {
            dealCode: pageData.dealCode,
            recipients: pageData.recipients,
            cc: pageData.cc,
            subject: pageData.subject,
            mailContent: pageData.mailContent,
            attachFiles: pageData.attachFiles,
            mimeTypes: pageData.mimeTypes,
            quotationCode: pageData.quotationCode,
            timestamp: pageData.timestamp
        };

        return this.postApi("SF0030502", data).catch(err => {
            throw err;
        })
    }

}
