/**
 * Created by hoangtd on 4/11/2017.
 */
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {CommonResolver} from "../../../resolver/common-resolver";
import {ScreenUrl} from "../../../helper/screen-url";
import {SF00307Service} from "./SF00307.service";
import {Constants} from "../../../helper/constants";

@Injectable()
export class SF00307Resolver extends CommonResolver implements Resolve<void> {
    private dealCode: string;

    constructor(router: Router, private service: SF00307Service) {
        super(router);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        this.dealCode = route.params["dealCode"];

        return this.service.initData(this.dealCode).catch(() => {
            return this.doCheck(this.dealCode);
        });
    }

    protected url(): string {
        return ScreenUrl.SF00301 + Constants.SLASH + this.dealCode;
    }
}