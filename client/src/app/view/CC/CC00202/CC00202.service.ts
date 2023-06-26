import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import "rxjs/add/operator/toPromise";
import {Location} from "@angular/common";
import {CommonService} from "../../../service/common.service";
import {Md5} from 'ts-md5/dist/md5';

/**
 * This service use to reset password.
 */
@Injectable()
export class CC00202Service extends CommonService {
    constructor(http: Http, router: Router, private location: Location) {
        super(http, router);
    }

    resetPassword(tokenKey: string, password: string) {
        return this.postApi("/CC00202",
            {
                token_key: tokenKey,
                password: Md5.hashStr(password)
            });
    }
}
