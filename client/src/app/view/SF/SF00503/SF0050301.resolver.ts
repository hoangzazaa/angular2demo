import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {CommonResolver} from "../../../resolver/common-resolver";
import {SF00503Service} from "./SF00503.service";
import {CC00100Service} from "../../CC/CC00100/CC00100.service";

declare let App: any;

/**
 * Data quotation info page SF00303
 * 
 * 使用する API は /SF0050300 と /SF0050301
 * @author hoangtd
 */
@Injectable()
export class SF0050301Resolver extends CommonResolver implements Resolve<any> {
    constructor(router: Router, private sf00503Service: SF00503Service, private authService: CC00100Service) {
        super(router);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        let departmentId = 0;

        if (this.authService.user != undefined) {
            departmentId = this.authService.user.departmentId;
        }
        App.loader('show');
        return this.sf00503Service.getDepartment().then(data => {
            let isSalesDepartment = false;
            if (departmentId > 0) {
                data.departments.forEach(department => {
                    if (department.id == departmentId) {
                        isSalesDepartment = true;
                    }
                });
            }

            if (!isSalesDepartment) {
                departmentId = data.departments[0].id;
            }
            return this.sf00503Service.getInitTab1(departmentId).then(data => {
                return data;
            });
        });
    }

}
