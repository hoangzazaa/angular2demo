import {OnDestroy} from "@angular/core";
import {ActivatedRoute, NavigationEnd, NavigationExtras, Router} from "@angular/router";
import {Constants} from "../../../helper/constants";
import ValidatorUtil from "../../../util/validator-util";
import {HeaderProvider} from "../SF00100/Header.provider";

declare let $: JQueryStatic;

/**
 * Common page to handles some common method on each page (e.g. navigate screen, destroy, init breadcrumb (if have).
 * @author manhnv
 */
export abstract class CommonPage implements OnDestroy {
    public isShowSideMenu = false;

    constructor(public router: Router, public route: ActivatedRoute, public headerProvider?: HeaderProvider) {
        if (headerProvider instanceof HeaderProvider)
            this.initBreadcrumb();

        this.router.events.filter(e => e instanceof NavigationEnd).subscribe(e => {
            let currentUrl = this.router.url;
            this.isShowSideMenu = !(currentUrl == "/" || currentUrl == "/home");
        });

        this.resetState();
    }

    ngOnDestroy(): void {
        let self = this;
        $(window).on('hashchange', function () {
            self.resetState();

            // Bug 1774
            $("div").removeClass('modal-backdrop');
            //
            // Bug 1772
            $("span").removeClass('select2-container--open').addClass('select2-container--close');
        });

        //http://fridaynight.vnext.vn/issues/3361
        if (window.event) {
            // hide page picker -> //Internet Explorer
            $(".datepicker-dropdown").css("display", "none");
        }
        else {
            // hide page picker -> //Other browsers e.g. Chrome
            $(".datepicker-dropdown").css("display", "none");
        }
    }

    /**
     * Get current page title used for Breadcrumb;
     * @return {string}
     */
    protected pageTile(): string {
        /*PageTile default is not set*/
        return Constants.BLANK;
    }

    /**
     * Method use to init Breadcrumb of current page if need.
     */
    protected initBreadcrumb(): void {
        let title = this.pageTile();
        if (ValidatorUtil.isNotEmpty(title)) {
            this.headerProvider.reset();
            this.headerProvider.pageName = title;
            this.headerProvider.addBreadCrumb(Constants.TOP, [Constants.SLASH]);
            this.headerProvider.addBreadCrumb(title);
        }
    }

    /**
     * Method use to navigate screen.
     * @param url destination url
     * @throws when an error happens then navigate to 404 page (page not found)
     */
    protected navigate(url: string, extras?: NavigationExtras): void {
        if (ValidatorUtil.isNotEmpty(extras)) {
            this.router.navigate([url], extras).catch(() => {
                return this.router.navigate(['/error/404']);
            });
        } else {
            this.router.navigate([url]).catch((err) => {
                return this.router.navigate(['/error/404']);
            });
        }
    }

    /**
     * Method use to navigate screen.
     * @param url destination url
     * @throws when an error happens then navigate to 404 page (page not found)
     */
    protected navigate2(url: string[], extras?: NavigationExtras): Promise<boolean> {
        if (ValidatorUtil.isNotEmpty(extras)) {
            return this.router.navigate(url, extras).catch(() => {
                return this.router.navigate(['/error/404']);
            });
        } else {
            return this.router.navigate(url).catch((err) => {
                return this.router.navigate(['/error/404']);
            });
        }
    }

    protected resetState(): void {
        //Get the current vertical position of the scroll bar for the first.
        $(window).scrollTop();

        //Close all model and popup
        $(".modal").modal('hide');

        //Close all swal alert
        swal.close();
    }

    /**
     * scroll up element or else whole page's body to top, specific an offset value will make scroll `offset` pixel more
     * @param selector: jQuery selector of wrapper
     * @param offset: scroll top some more pixel
     */
    protected $scrollTop(selector: string = "body", offset: number = 0) {
        let HEADER_NAV_HEIGHT: number = 60;
        $("html, body").animate({
            scrollTop: $(selector).offset().top - (HEADER_NAV_HEIGHT + offset)
        }, 'fast');
    }

}
