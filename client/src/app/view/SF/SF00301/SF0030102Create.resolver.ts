import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {SF00301Service} from "./SF00301.service";
import {CommonResolver} from "../../../resolver/common-resolver";
import {MSG} from "../../../helper/message";

@Injectable()
export class SF0030102CreateResolver extends CommonResolver implements Resolve<void> {
    constructor(router: Router, private service: SF00301Service) {
        super(router);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        let dealCode = route.queryParams['from'];
        if (dealCode === '0') {
            super.doCheck(MSG.SF00301.ERR002);
        } else if (!dealCode) {
            return this.service.initData(SF00301Service.MODE_CREATE);
        } else {
            return this.service.initData(SF00301Service.MODE_COPY, dealCode).catch((err) => {
                super.doCheck(err);
            });
        }
    }

}
