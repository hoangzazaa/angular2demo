import {Component, AfterViewInit} from "@angular/core";
import {CC00300Service} from "./CC00300.service";
import Messages, {MSG} from "../../../helper/message";
import {Router} from "@angular/router";
import {CC00100Service} from "../CC00100/CC00100.service";

@Component({
    templateUrl: "CC00300.page.html",
    providers: [CC00300Service]
})
/**
 * This class handles action on CC003 screen.
 *
 * @author manhnv
 */
export class CC00300Page implements AfterViewInit {
    private _currentPassword: string;
    private _newPassword: string;
    private _confirmNewPassword: string;

    constructor(private router: Router, private service: CC00300Service, private authService: CC00100Service) {
    }

    /**
     * Method use to change password.
     */
    changePassword() {
        let self = this;
        if ($("#cc003-form").valid()) {
            if (self._newPassword == self._currentPassword) {
                swal({title: Messages.get(MSG.CC00300.ERR007), type: "error"});
                return;
            }

            self.service.changePassword(self._currentPassword, self._newPassword, self._confirmNewPassword)
                .then(() => {
                    swal({title: Messages.get(MSG.CC00300.INF001), type: "success"},
                    function() {
                        self.authService.isLoggedIn = false;
                        self.router.navigate(['/login']).then(null);
                    });
                })
                .catch(() => swal({title: Messages.get(MSG.CC00300.ERR006), type: "error"}));
        }
    }

    ngAfterViewInit(): void {
        $("#current-passwd").rules("add", {
            required: true,
            messages: {
                required: Messages.get(MSG.CC00300.ERR001)
            }
        });
        $("#new-passwd").rules("add", {
            required: true,
            minlength: 6,
            messages: {
                required: Messages.get(MSG.CC00300.ERR002),
                minlength: Messages.get(MSG.CC00300.ERR003, 6, 30)
            }
        });
        $("#confirm-new-passwd").rules("add", {
            required: true,
            minlength: 6,
            equalTo: "#new-passwd",
            messages: {
                required: Messages.get(MSG.CC00300.ERR004),
                equalTo: Messages.get(MSG.CC00300.ERR005),
                minlength: Messages.get(MSG.CC00300.ERR003, 6, 30)
            }
        });
    }

    get currentPassword(): string {
        return this._currentPassword;
    }

    set currentPassword(value: string) {
        this._currentPassword = value;
    }

    get newPassword(): string {
        return this._newPassword;
    }

    set newPassword(value: string) {
        this._newPassword = value;
    }

    get confirmNewPassword(): string {
        return this._confirmNewPassword;
    }

    set confirmNewPassword(value: string) {
        this._confirmNewPassword = value;
    }
}
