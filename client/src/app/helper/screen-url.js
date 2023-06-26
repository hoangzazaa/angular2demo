"use strict";
/**
 * This class provides the navigation and url manipulation capabilities.
 * Created by manhnv.
 */
var ScreenUrl = (function () {
    function ScreenUrl() {
    }
    /*Dashboard*/
    ScreenUrl.SF001 = '/home';
    /*Deal management - Add new dealーSelect from templates*/
    ScreenUrl.SF00201 = '/home/deal/select-from-template';
    /*Deal management - Deal infoーOverview*/
    ScreenUrl.SF00301 = '/home/deal';
    /* Partner search */
    ScreenUrl.SFN0401 = '/home/partners';
    /** 得意先照会 */
    ScreenUrl.SFN0402 = '/home/customer';
    return ScreenUrl;
}());
exports.ScreenUrl = ScreenUrl;
//# sourceMappingURL=screen-url.js.map