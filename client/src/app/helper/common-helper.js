"use strict";
var CommonHelper = (function () {
    function CommonHelper() {
    }
    CommonHelper.getList = function (keys, master) {
        var list = [];
        keys.forEach(function (key) {
            var value = master[key];
            if (value == undefined) {
                return;
            }
            list.push({
                value: key,
                name: value
            });
        });
        return list;
    };
    return CommonHelper;
}());
exports.CommonHelper = CommonHelper;
//# sourceMappingURL=common-helper.js.map