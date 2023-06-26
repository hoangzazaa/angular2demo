import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {User} from "../../../model/core/User.model";
import {CommonService} from "../../../service/common.service";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {Md5} from 'ts-md5/dist/md5';

/**
 * Service CC003 call webApi to change password.
 *
 * @author manhnv
 */
@Injectable()
export class CC00300Service extends CommonService {
    private user: User;

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    changePassword(currentPassword: string, newPassword: string, confirmNewPassword: string) {
        return this.postApi("/CC00301",
            {
                currentPassword: Md5.hashStr(currentPassword),
                newPassword: Md5.hashStr(newPassword),
                confirmNewPassword: Md5.hashStr(confirmNewPassword)
            })
            .then(
                res => {
                    this.user = new User();
                    this.user.id = res.data["id"];
                    this.user.username = res.data["username"];
                    this.user.role = res.data["role"];
                    this.user.email = res.data["email"];
                    this.user.departmentId = res.data["departmentId"];
                }, err => {
                    throw err;
                }
            );
    }
}
