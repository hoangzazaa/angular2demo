import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {CommonResolver} from "../../../resolver/common-resolver";
import {CC00100Service} from "./CC00100.service";

@Injectable()
export class CC00100Resolver extends CommonResolver implements Resolve<void> {
    constructor(private authService: CC00100Service, router: Router) {
        super(router);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        if (this.authService.isLoggedIn != undefined) {
            return;
        }
        return this.authService.authorize();
    }

}
