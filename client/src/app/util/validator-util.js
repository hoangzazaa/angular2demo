"use strict";
/**
 * Created by manhnv on 11/14/2016.
 */
var ValidatorUtil = (function () {
    function ValidatorUtil() {
    }
    ValidatorUtil.isNumeric = function ($event) {
        return $event.charCode >= 48 && $event.charCode <= 57;
    };
    ValidatorUtil.isNotEmpty = function (val) {
        return !this.isEmpty(val);
    };
    ValidatorUtil.isEmpty = function (val) {
        return (val === undefined || val == null || val.length == 0);
    };
    ValidatorUtil.isValidEmail = function (email) {
        return this.EMAIL_PATTERN.test(email);
    };
    ValidatorUtil.isNumber = function (val) {
        return !isNaN(parseFloat(val)) && isFinite(val);
    };
    ValidatorUtil.isNotNullOrEmpty = function (val) {
        return !!val;
    };
    ValidatorUtil.isNullOrEmpty = function (val) {
        return !val;
    };
    ValidatorUtil.isNotNullOrBlank = function (val) {
        return !!val && !!val.trim();
    };
    ValidatorUtil.isNullOrBlank = function (val) {
        return !val || !val.trim();
    };
    ValidatorUtil.EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return ValidatorUtil;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ValidatorUtil;
//# sourceMappingURL=validator-util.js.map