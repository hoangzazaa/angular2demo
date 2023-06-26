import {Injectable} from "@angular/core";
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from "@angular/router";
import {CommonResolver} from "../../../resolver/common-resolver";
import {SF00305Service} from "./SF00305.service";
/**
 * Created by VuPT on 11/17/2016.
 */
@Injectable()
export class SF00305Resolver extends CommonResolver implements Resolve<void> {
    constructor(private sf00305Service: SF00305Service, router: Router) {
        super(router);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        let quotationCode = route.params["quotationCode"];

        return this.sf00305Service.getInit(quotationCode).catch(err=>{
            this.doCheck("");
        });
    }

}