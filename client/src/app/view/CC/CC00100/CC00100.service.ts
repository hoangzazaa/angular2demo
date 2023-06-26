import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import "rxjs/add/operator/toPromise";
import {User} from "../../../model/core/User.model";
import {CommonService} from "../../../service/common.service";
import {Md5} from 'ts-md5/dist/md5';

@Injectable()
export class CC00100Service extends CommonService{
    isLoggedIn: boolean;
    user: User;

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    login(email: string, password: string, remember: boolean) {
        let self = this;
        let req = {
            email: email,
            password: Md5.hashStr(password),
            rememberMe: remember
        };

        return self.postApi("/CC00101", req).then(
            res => {
                self.isLoggedIn = true;
                self.user = self.getLoginUser(res.data);
            }, err => {
                self.isLoggedIn = false;
                throw err;
            }
        );
    }

    authorize(): Promise<void> {
        return this.getApi("/CC00102").then(
            res => {
                this.isLoggedIn = true;
                this.user = this.getLoginUser(res.data);
            }, err => {
                console.log(err);
            }
        )
    }

    logout() {
        return this.getApi("/CC00103").then(
            data => {
                this.isLoggedIn = false;
                this.user = new User();
                this.router.navigate(['/login']);
                return data;
            }, err => {
                console.log(err);
                return err;
            }
        );
    }

    private getLoginUser(data: User): User {
        let login = new User();
        login.setUser(data);

        return login;
    }

}
