import {Injectable} from "@angular/core";
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {CC00100Service} from "../view/CC/CC00100/CC00100.service";

@Injectable()
export abstract class AuthGuard implements CanActivate {

    constructor(private authService: CC00100Service, private router: Router, private neededRoles: number[]) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Promise.resolve().then(() => {
            let url = state.url;
            return this.checkLogin(url);
        });
    }

    private checkLogin(url: string): boolean | Promise<boolean> {
        // immediated check role if user was authenticated
        if (this.authService.isLoggedIn) {
            return this.checkRole();
        }

        return this.authService.authorize().then(() => {
            if (this.checkRole()) {
                return true;
            }

            if (url !== "/home") {
                this.router.navigate(['/login'],  { queryParams: { back_url: url } });
            } else {
                this.router.navigate(['/login']);
            }
            return false;
        });
    }

    private checkRole(): boolean {
        if (this.authService.isLoggedIn) {
            if (this.neededRoles.length > 0) {
                //&& this.neededRoles.filter(role => this.cc00100Service.user.role == role).length > 0 /*donot check this condition at time, default full permission*/
                return true;
            }
        }

        return false;
    }
}
