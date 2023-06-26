import {Component, AfterViewInit} from "@angular/core";
import {CC00202Service} from "./CC00202.service";
import {Router, ActivatedRoute} from "@angular/router";
import {MSG, default as Messages} from "../../../helper/message";
import {Constants} from "../../../helper/constants";
import {CC00100Service} from "../CC00100/CC00100.service";

declare var $: any;

@Component({
    selector: "reset-password",
    templateUrl: "./CC00202.page.html",
    providers: [CC00202Service]
})
export class CC00202Page implements AfterViewInit {
    private token: string;
    private password: string;

    constructor(private router: Router, private route: ActivatedRoute, private service: CC00202Service, private authService: CC00100Service) {
        this.token = this.route.snapshot.params["tokenKey"];
    }

    ngAfterViewInit(): void {
        ($ => {
            $(generateValidationRules);

            function generateValidationRules() {
                let $password = $("#new-passwd");
                let $confirmPassword = $("#confirm-new-passwd");

                $password.rules("add", {
                    required: true,
                    minlength: 6,
                    messages: {
                        required: Messages.get(MSG.CC00202.ERR001),
                        minlength: Messages.get(MSG.CC00202.ERR003, 6, 30)
                    }
                });

                $confirmPassword.rules("add", {
                    required: true,
                    minlength: 6,
                    equalTo: $password,
                    messages: {
                        required: Messages.get(MSG.CC00202.ERR002),
                        equalTo: Messages.get(MSG.CC00202.ERR004),
                        minlength: Messages.get(MSG.CC00202.ERR003, 6, 30)
                    }
                });
            }
        })(jQuery);
    }

    resetPassword() {
        let self = this;
        ($ => {
            if ($("#cc00202-reset-password").valid()) {
                self.service
                    .resetPassword(self.token, self.password)
                    .then(showSuccessForUser)
                    .catch(handleError);
            }

            function showSuccessForUser(res) {
                /* Password has been reset, please login.*/
                swal({
                    title: Constants.BLANK,
                    text: Messages.get(MSG.CC00202.INF001),
                    type: 'success',
                    confirmButtonText: Constants.BACK_TO_LOGIN
                }, function () {
                    self.authService.isLoggedIn = false;
                    self.router.navigate(['/login']);
                });
            }

            function handleError(err) {
                let errorCode = err.code;
                let msg = Constants.BLANK;
                if (errorCode === "ERR_CC00202_INVALID_TOKEN") {
                    // when recover link was expired!
                    msg = Messages.get(MSG.CC00202.ERR005);
                } else if (errorCode === "ERR_USER_NOT_EXIST") {
                    // This user is inactive or was deleted!
                    msg = Messages.get(MSG.CC00202.ERR006);
                }

                showErrorForUser(msg);
            }

            function showErrorForUser(msg) {
                swal({
                    title: Constants.BLANK,
                    text: msg,
                    type: 'error',
                    confirmButtonText: Constants.BACK
                });
            }
        })(jQuery);
    }
}
