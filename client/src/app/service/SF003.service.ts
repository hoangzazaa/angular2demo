import {Injectable} from "@angular/core";
import {CommonService} from "./common.service";
import {SF0030001Res} from "../response/SF0030001.res";
import {Http} from "@angular/http";
import {Router} from "@angular/router";

@Injectable()
export class SF003Service extends CommonService {
    constructor(http: Http, router: Router) {
        super(http, router);
    }

    /**
     * Get deal info by deal code
     * @return deal item
     * */
    public getDealByDealCode(dealCode: string): Promise<SF0030001Res> {
        return this.getApi("/SF0030001/" + dealCode)
            .then(res => {
                return res.data;
            }, err => {
                throw err;
            });
    }
}
