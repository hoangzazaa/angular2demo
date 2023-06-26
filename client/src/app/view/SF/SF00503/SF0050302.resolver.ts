import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {CommonResolver} from "../../../resolver/common-resolver";
import {SF00503Service} from "./SF00503.service";

/**
 * Data quotation info page SF00303
 * 
 * 使用する API は /SF0050300
 * @author hoangtd
 */
@Injectable()
export class SF0050302Resolver extends CommonResolver implements Resolve<any> {
    constructor(router: Router, private sf00503Service: SF00503Service) {
        super(router);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        return this.sf00503Service.getDepartment().then(data => {

            return data;
        });
    }


    protected url(): string {
        return '/home';
    }
}
