import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {CommonResolver} from "../../../resolver/common-resolver";
import {SF00310Service} from "./SF00310.service";
import {Injectable} from "@angular/core";

/**
 * Created by ASUS on 5/8/2017.
 */
@Injectable()
export class SF00310Resolve extends CommonResolver implements Resolve<void> {
    /*override*/
    constructor(router: Router, private pageService: SF00310Service) {
        super(router);
    }

    /*init data page*/
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        let dealCode = route.params["dealCode"];
        return this.pageService.initData(dealCode).catch(() => {
            return this.doCheck(dealCode);
        });
    }

}