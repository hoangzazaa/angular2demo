"use strict";
var constants_1 = require("../helper/constants");
var message_1 = require("../helper/message");
var screen_url_1 = require("../helper/screen-url");
/**
 * Common resolver use to handles action when page load.
 * @author manhnv
 */
var CommonResolver = (function () {
    function CommonResolver(router) {
        this.router = router;
        //Get the current vertical position of the scroll bar for the first.
        $(window).scrollTop();
        //Close all model and popup
        $(".modal").modal('hide');
        //Close all swal alert
        swal.close();
    }
    /**
     * Method use to show message when redirect link on item not found.
     * @param code the value to be lookup
     */
    CommonResolver.prototype.doCheck = function (code) {
        var self = this;
        swal({
            title: message_1.default.get(message_1.MSG.COM.WRN001),
            text: message_1.default.get(message_1.MSG.COM.WRN002, code),
            type: "warning",
            html: true,
            confirmButtonText: constants_1.Constants.BACK
        }, function () {
            return self.router.navigate([self.url()]).catch(function () {
                return self.router.navigate(['/error/404']);
            });
        });
    };
    /**
     * Method to return default page when data not found. Default navigate to SF001 - Dashboard;
     * @return {string}
     */
    CommonResolver.prototype.url = function () {
        return screen_url_1.ScreenUrl.SF001;
    };
    return CommonResolver;
}());
exports.CommonResolver = CommonResolver;
//# sourceMappingURL=common-resolver.js.map