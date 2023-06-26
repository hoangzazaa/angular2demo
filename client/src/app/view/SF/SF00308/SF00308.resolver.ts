import {Injectable} from "@angular/core";
import {CommonResolver} from "../../../resolver/common-resolver";
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {SF00308Service} from "./SF00308.service";
/**
 * Created by hoangtd on 3/16/2017.
 */
@Injectable()
export class SF00308Resolver extends CommonResolver implements Resolve<void> {
    constructor(private pageService: SF00308Service, router: Router) {
        super(router);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        let dealCode = route.params["dealCode"];

        return this.pageService.getInitData(dealCode).catch(err => {
            this.doCheck("");
        });
    }

}