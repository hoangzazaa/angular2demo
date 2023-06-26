import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {CommonResolver} from "../../../resolver/common-resolver";
import {SF00205Service} from "./SF00205.service";

/**
 * Created by manhnv on 6/14/2017.
 */
@Injectable()
export class SF00205Resolver extends CommonResolver implements Resolve<void> {
    constructor(router: Router, private service: SF00205Service) {
        super(router);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        return this.service.init().catch(() => {
            this.service.navigateTo("500 error", '/error/500')
            this.router.navigate(['/error/500'])
        });
    }
}