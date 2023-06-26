import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {SF00303Service} from "./SF00303.service";
import {SF00303Data} from "./SF00303.data";
import {CommonResolver} from "../../../resolver/common-resolver";
import {Constants} from "../../../helper/constants";

/**
 * Data quotation info page SF00303
 * @author hoangtd
 */
@Injectable()
export class SF00303Resolver extends CommonResolver implements Resolve<SF00303Data> {
    constructor(router: Router, private sf00303Service: SF00303Service) {
        super(router);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<SF00303Data> {
        let quotationCode = route.params['quotationCode'];
        let dealCode = route.params['dealCode'];

        return this.sf00303Service.getQuotationInfo(dealCode, quotationCode).then(data => {
            if (data)
                return data;

            super.doCheck(dealCode + Constants.COMMA + quotationCode);
        }).catch(err =>{
            return this.url();
        });
    }

}
