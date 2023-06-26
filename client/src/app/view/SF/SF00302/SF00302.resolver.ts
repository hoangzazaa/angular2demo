import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {SF00302Service} from "./SF00302.service";
import {CommonResolver} from "../../../resolver/common-resolver";
import {SF0030201Res} from "../../../response/SF0030201.res";
/**
 * Created by DungTQ on 12/12/2016
 */
@Injectable()
export class SF00302Resolver extends CommonResolver implements Resolve<SF0030201Res> {


    constructor(private sv00302Service: SF00302Service, router: Router) {
        super(router);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<SF0030201Res> {
        // get params url
        let dealCode = route.params['dealCode'];
        let productCode = route.params['productCode'];
        // call service get data info
        return this.sv00302Service.sv0030201GetDealProduct(dealCode, productCode).then(res => {
            return res;
        });
    }
}
