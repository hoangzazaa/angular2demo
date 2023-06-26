import {Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from "@angular/router";
import {Deal} from "../model/core/Deal.model";
import {Injectable} from "@angular/core";
import {SF003Service} from "../service/SF003.service";
import Messages, {MSG} from "../helper/message";
import {ScreenUrl} from "../helper/screen-url";

@Injectable()
export class DealResolver implements Resolve<Deal> {
    constructor(private sf003Service: SF003Service, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Deal> {
        let dealCode = route.params['dealCode'];
        if (dealCode == 0)
            return null;

        return this.sf003Service.getDealByDealCode(dealCode)
            .then(data => {
                return data.deal;
            }, err => {
                swal("Data Error", Messages.get(MSG.SF00301.ERR002), "error");
                return this.router.navigate(["/home/deal"], ScreenUrl.SF00201);
            });
    }
}
