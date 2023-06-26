///<reference path="../../../../../typings/globals/core-js/index.d.ts"/>
import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {CommonResolver} from "../../../resolver/common-resolver";
import {Constants} from "../../../helper/constants";
import {SF00203Service} from "./SF00203.service";

@Injectable()
export class SF00203Resolver extends CommonResolver implements Resolve<void> {
    constructor(private sf00203Service: SF00203Service, router: Router) {
        super(router);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        return this.sf00203Service.getResults(Constants.FIRST_PAGE);
    }

}
