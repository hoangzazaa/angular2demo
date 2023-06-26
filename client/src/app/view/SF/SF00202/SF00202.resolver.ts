import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {SF00202Service} from "./SF00202.service";
import {CommonResolver} from "../../../resolver/common-resolver";

@Injectable()
export class SF00202Resolver extends CommonResolver implements Resolve<void> {
    constructor(private sf00202Service: SF00202Service, router: Router) {
        super(router);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        return this.sf00202Service.initData();
    }

}
