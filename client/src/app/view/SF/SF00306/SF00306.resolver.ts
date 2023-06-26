/**
 * Created by hoangtd on 4/11/2017.
 */
import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {CommonResolver} from "../../../resolver/common-resolver";
import {SF00306Service} from "./SF00306.service";
import {ScreenUrl} from "../../../helper/screen-url";

@Injectable()
export class SF00306Resolver extends CommonResolver implements Resolve<void> {
    constructor(router: Router, private service: SF00306Service) {
        super(router);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        let dealCode = route.params["dealCode"];
        return this.service.initData(dealCode).catch(err => {
            return this.url();
        });
    }

    protected url(): string {
        return ScreenUrl.SF00201;
    }
}