import {AfterViewInit, Component} from "@angular/core";
import {CC00201Service} from "./CC00201.service";
import {Router} from "@angular/router";
import {default as Messages, MSG} from "../../../helper/message";
import {Constants} from "../../../helper/constants";
import {CC00100Service} from "../CC00100/CC00100.service";

declare let $: JQueryStatic | any;

@Component({
    selector: "recover-password",
    templateUrl: "./CC00201.page.html",
    providers: [CC00201Service]
})
export class CC00201Page implements AfterViewInit {
    email: string;

    constructor(private router: Router, private service: CC00201Service, private authService: CC00100Service) {
    }

    ngAfterViewInit(): void {
        ($ => {
            $("#request-email").rules("add", {
                required: true,
                email: true,
                messages: {
                    required: Messages.get(MSG.CC00201.ERR001),
                    email: Messages.get(MSG.CC00201.ERR002)
                }
            });
        })(jQuery);
    }

    sendMail() {
        let self = this;
        if ($("#cc00201-request-form").valid()) {
            self.service
                .recoverPassword(self.email)
                .then(() => {
                    self.showSuccessAlert();
                })
                .catch(err => {
                    if (err.code === 'CC00201_ERR001') {
                        self.showNotExistErrMsg();
                    } else {
                        self.showInternalErrAlert();
                    }
                });
        }
    }

    private showNotExistErrMsg() {
        $("#fg-email-container").addClass("has-error");

        let $errEl = $("#not-exist-email-error");
        if ($errEl.length > 0) {
            $errEl.text(MSG.CC00201.ERR004);
            $errEl.show();
            return false;
        }

        let el = {
            id: "not-exist-email-error",
            text: MSG.CC00201.ERR004
        };
        $errEl = jQuery('<div/>', el).addClass("help-block text-right animated fadeInDown");

        $("#email-container").append($errEl);

        return false;
    }

    private clearNotExistEmailErrMsg() {
        $("#not-exist-email-error").remove();
        $("#fg-email-container").removeClass("has-error");
    }

    private showInternalErrAlert() {
        swal({
            title: Constants.BLANK,
            text: MSG.CC00201.ERR003,
            type: 'error',
            confirmButtonText: Constants.BACK
        });
    }

    private showSuccessAlert() {
        let self = this;
        swal({
            title: Constants.BLANK,
            text: Messages.get(MSG.CC00201.INF001),
            type: 'success',
            confirmButtonText: Constants.BACK_TO_LOGIN
        }, function () {
            self.authService.isLoggedIn = false;
            self.router.navigate(['/login']);
        });
    }

}
