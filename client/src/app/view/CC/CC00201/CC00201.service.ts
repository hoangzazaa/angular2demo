import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import "rxjs/add/operator/toPromise";
import {Location} from "@angular/common";
import {CommonService} from "../../../service/common.service";

/**
 * This service use to recover password.
 */
@Injectable()
export class CC00201Service extends CommonService {
    constructor(http: Http, router: Router, private location: Location) {
        super(http, router);
    }

    recoverPassword(email: String) {
        return this.postApi("/CC00201",
            {
                email: email
            });
    }

}
