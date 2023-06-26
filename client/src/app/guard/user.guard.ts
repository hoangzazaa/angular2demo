/**
 * Created by sjb on 7/15/16.
 */
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {CC00100Service} from "../view/CC/CC00100/CC00100.service";
import {AuthGuard} from "./auth.guard";

@Injectable()
export class UserGuard extends AuthGuard {
    constructor(private authServicei: CC00100Service, private routeri: Router) {
        /*0-user; 1-admin*/
        super(authServicei, routeri, [0])
    }
}