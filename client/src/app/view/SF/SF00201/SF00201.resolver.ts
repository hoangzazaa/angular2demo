import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {SF00201Service} from "./SF00201.service";
import {CommonResolver} from "../../../resolver/common-resolver";
import {Constants} from "../../../helper/constants";


@Injectable()
export class SF00201Resolver extends CommonResolver implements Resolve<void> {
    constructor(private sf00201Service: SF00201Service, router: Router) {
        super(router);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        return this.sf00201Service.getData(Constants.FIRST_PAGE);
    }

}
