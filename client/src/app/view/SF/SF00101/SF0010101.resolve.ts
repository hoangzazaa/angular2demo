import {Injectable} from "@angular/core";
import {CommonResolver} from "../../../resolver/common-resolver";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {SF00101Service} from "./SF00101.service";
/**
 * Created by ASUS on 6/6/2017.
 * Init data department and user
 */
@Injectable()
export class SF0010101Resolve extends CommonResolver implements Resolve<void> {
    constructor(private pageService: SF00101Service, router: Router) {
        super(router);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        return this.pageService.initDataScreen();
    }

}
