import {AfterViewInit, Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Constants} from "../../../helper/constants";
import Messages, {MSG} from "../../../helper/message";
import {CC00100Service} from "./CC00100.service";

declare let $: JQueryStatic;

@Component({
    selector: "login-page",
    templateUrl: "./CC00100.page.html"
})
export class CC00100Page implements OnInit, AfterViewInit, OnDestroy {
    private email: string;
    private password: string;
    private remember: boolean;
    private redirectUrl: string;
    private navSub: Subscription;

    constructor(private router: Router, private route: ActivatedRoute, private authService: CC00100Service) {
    }

    /**
     * @Override interface OnInit
     * */
    ngOnInit(): void {
        // restore checkbox's state
        this.remember = (localStorage.getItem("isRemember") == "true");

        let self = this;
        if (this.authService.isLoggedIn) {
            this.router.navigate(['/']);
            return;
        }

        this.navSub = this.route.queryParams.subscribe(params => {
            self.redirectUrl = params["back_url"];
        });
    }

    ngOnDestroy(): void {
        if (!!this.navSub) this.navSub.unsubscribe();
    }

    /**
     * Submit login user
     * @return: redirect page
     */
    login() {
        if ($("#cc00100-login-form").valid()) {
            this.authService.login(this.email, this.password, this.remember)
                .then(() => {
                    // set checkbox's state
                    if (this.remember)
                        localStorage.setItem("isRemember", "true");
                    else
                        localStorage.setItem("isRemember", "false");

                    if (!!this.redirectUrl) {
                        this.router.navigate([this.redirectUrl]);
                        this.redirectUrl = null;
                    } else {
                        this.router.navigate(['/home']);
                    }
                })
                .catch(err => {
                        swal({
                            title: Constants.BLANK,
                            text: Messages.get(MSG.CC00100.ERR004),
                            type: "error",
                            confirmButtonText: Constants.TRY_AGAIN
                        });

                        this.password = null;
                        this.remember = false;
                        localStorage.setItem("isRemember", "false");
                    }
                );
        }
    }

    /**
     * @Override interface AfterViewInit
     */
    ngAfterViewInit(): void {
        $("#login-email").rules("add", {
            required: true,
            email: true,
            messages: {
                required: Messages.get(MSG.CC00100.ERR001),
                email: Messages.get(MSG.CC00100.ERR003)
            }
        })
        ;
        $("#login-password").rules("add", {
            required: true,
            messages: {
                required: Messages.get(MSG.CC00100.ERR002)
            }
        });
    }
}
