import {Injectable} from "@angular/core";
import {CommonService} from "../../../service/common.service";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {SF00308Data} from "./SF00308.data";
import {SF00308CheckSheet} from "./model/SF00308_CheckSheet.model";
import {SF00308Req} from "./request/SF00308Req";
import Messages from "../../../helper/message";
import {MSG} from "../../../helper/message";
/**
 * Created by hoangtd on 3/16/2017.
 */
declare var App: any;
@Injectable()
export class SF00308Service extends CommonService {
    pageData: SF00308Data;

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    getInitData(dealCode: string): Promise<void> {
        this.pageData = new SF00308Data();
        return this.getApi('SF0030801/' + dealCode).then(res => {
            this.pageData.setSF00308Data(res.data);
        }).catch(err => {
            throw err;
        });
    }

    saveData(answers: SF00308CheckSheet[]): Promise<void> {
        let req = new SF00308Req();
        req.answers = answers;
        App.loader('show');
        return this.postApi('SF0030802', req).then(res => {
            // delete all items in old array
            if (res.data["answers"] !== undefined) {
                for (let i = 0; i < res.data["answers"].length; i++) {
                    let answer =  res.data["answers"][i];
                    this.pageData.answersMap[answer.questionCode] = answer;
                }
                this.pageData.refreshDefault1009Date();
            }
            App.loader('hide');
            $.notify({message: Messages.get(MSG.SF00308.INF001)}, {type: 'info'});
        }).catch(err => {
            $.notify({message: Messages.get(MSG.SF00308.ERR001)}, {type: 'danger'});
        });
    }

}
