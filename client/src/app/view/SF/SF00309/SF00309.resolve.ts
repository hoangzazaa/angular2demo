import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {CommonResolver} from "../../../resolver/common-resolver";
import {SF00309Service} from "./SF00309.service";
import {Injectable} from "@angular/core";

/**
 * Created by ASUS on 5/8/2017.
 */
@Injectable()
export class SF00309Resolve extends CommonResolver implements Resolve<void> {
    /*override*/
    constructor(router: Router, private pageService: SF00309Service) {
        super(router);
    }

    /*init data page*/
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        let dealCode = route.params["dealCode"];
        let requestType = route.params["requestType"];

        if (dealCode != undefined) {
            return this.pageService.initData(dealCode, requestType).catch(err => {
                // data deal not found
                if (err["code"] == "SF00309_WRN001") {
                    return this.doCheck(dealCode);
                }
            });
        } else {
            this.url();
        }
    }

}