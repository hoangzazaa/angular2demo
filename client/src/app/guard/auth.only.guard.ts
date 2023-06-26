/**
 * Created by sjb on 7/15/16.
 */
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {CC00100Service} from "../view/CC/CC00100/CC00100.service";
import {AuthGuard} from "./auth.guard";

@Injectable()
export class AuthOnlyGuard extends AuthGuard {
    constructor(private authServicei: CC00100Service, private routeri: Router) {
        super(authServicei, routeri, [])
    }
}