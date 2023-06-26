"use strict";
var router_1 = require("@angular/router");
var constants_1 = require("../../../helper/constants");
var validator_util_1 = require("../../../util/validator-util");
var Header_provider_1 = require("../SF00100/Header.provider");
/**
 * Common page to handles some common method on each page (e.g. navigate screen, destroy, init breadcrumb (if have).
 * @author manhnv
 */
var CommonPage = (function () {
    function CommonPage(router, route, headerProvider) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.headerProvider = headerProvider;
        this.isShowSideMenu = false;
        if (headerProvider instanceof Header_provider_1.HeaderProvider)
            this.initBreadcrumb();
        this.router.events.filter(function (e) { return e instanceof router_1.NavigationEnd; }).subscribe(function (e) {
            var currentUrl = _this.router.url;
            _this.isShowSideMenu = !(currentUrl == "/" || currentUrl == "/home");
        });
        this.resetState();
    }
    CommonPage.prototype.ngOnDestroy = function () {
        var self = this;
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
    };
    /**
     * Get current page title used for Breadcrumb;
     * @return {string}
     */
    CommonPage.prototype.pageTile = function () {
        /*PageTile default is not set*/
        return constants_1.Constants.BLANK;
    };
    /**
     * Method use to init Breadcrumb of current page if need.
     */
    CommonPage.prototype.initBreadcrumb = function () {
        var title = this.pageTile();
        if (validator_util_1.default.isNotEmpty(title)) {
            this.headerProvider.reset();
            this.headerProvider.pageName = title;
            this.headerProvider.addBreadCrumb(constants_1.Constants.TOP, [constants_1.Constants.SLASH]);
            this.headerProvider.addBreadCrumb(title);
        }
    };
    /**
     * Method use to navigate screen.
     * @param url destination url
     * @throws when an error happens then navigate to 404 page (page not found)
     */
    CommonPage.prototype.navigate = function (url, extras) {
        var _this = this;
        if (validator_util_1.default.isNotEmpty(extras)) {
            this.router.navigate([url], extras).catch(function () {
                return _this.router.navigate(['/error/404']);
            });
        }
        else {
            this.router.navigate([url]).catch(function (err) {
                return _this.router.navigate(['/error/404']);
            });
        }
    };
    /**
     * Method use to navigate screen.
     * @param url destination url
     * @throws when an error happens then navigate to 404 page (page not found)
     */
    CommonPage.prototype.navigate2 = function (url, extras) {
        var _this = this;
        if (validator_util_1.default.isNotEmpty(extras)) {
            return this.router.navigate(url, extras).catch(function () {
                return _this.router.navigate(['/error/404']);
            });
        }
        else {
            return this.router.navigate(url).catch(function (err) {
                return _this.router.navigate(['/error/404']);
            });
        }
    };
    CommonPage.prototype.resetState = function () {
        //Get the current vertical position of the scroll bar for the first.
        $(window).scrollTop();
        //Close all model and popup
        $(".modal").modal('hide');
        //Close all swal alert
        swal.close();
    };
    /**
     * scroll up element or else whole page's body to top, specific an offset value will make scroll `offset` pixel more
     * @param selector: jQuery selector of wrapper
     * @param offset: scroll top some more pixel
     */
    CommonPage.prototype.$scrollTop = function (selector, offset) {
        if (selector === void 0) { selector = "body"; }
        if (offset === void 0) { offset = 0; }
        var HEADER_NAV_HEIGHT = 60;
        $("html, body").animate({
            scrollTop: $(selector).offset().top - (HEADER_NAV_HEIGHT + offset)
        }, 'fast');
    };
    return CommonPage;
}());
exports.CommonPage = CommonPage;
//# sourceMappingURL=common.page.js.map