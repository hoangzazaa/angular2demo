import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {CommonResolver} from "../../../resolver/common-resolver";
import {SF00204Service} from "./SF00204.service";

@Injectable()
export class SF00204Resolver extends CommonResolver implements Resolve<void> {
    constructor(private pageService: SF00204Service, router: Router) {
        super(router);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        return this.pageService.initData().catch(err => {
            return this.url();
        })
    }

}
