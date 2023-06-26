import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {SF00301Service} from "./SF00301.service";
import {ScreenUrl} from "../../../helper/screen-url";
import {CommonResolver} from "../../../resolver/common-resolver";
import {MSG} from "../../../helper/message";

@Injectable()
export class SF0030101OpenResolver extends CommonResolver implements Resolve<void> {
    constructor(router: Router, private service: SF00301Service) {
        super(router);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        let dealCode = route.params['dealCode'];
        if (!dealCode || dealCode == '0') {
            super.doCheck(MSG.SF00301.ERR002);
            return;
        }
        else {
            return this.service.initData(SF00301Service.MODE_OPEN, dealCode).catch((err) => {
                super.doCheck(err);
            });
        }
    }

    protected url(): string {
        return ScreenUrl.SF00201;
    }
}
