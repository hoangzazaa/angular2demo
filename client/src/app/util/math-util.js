"use strict";
/**
 * Created by VuPT on 9/15/2016.
 */
var validator_util_1 = require("./validator-util");
var util_1 = require("util");
/** Class represent MathUtil used for calculation
 * */
var MathUtil = (function () {
    function MathUtil() {
    }
    /**
     * Return customized round value
     * @param {number} value: input value
     * @param {number} decimal: the number of decimal digits.
     */
    MathUtil.roundDecimal = function (value, decimal) {
        var result = Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
        if (!isNaN(result)) {
            return result;
        }
        else {
            return 0;
        }
    };
    /**
     * Return customized round value
     * @param {number} value: input value
     * @param {number} decimal: the number of decimal digits.
     */
    MathUtil.ceilDecimal = function (value, decimal) {
        var result = Math.ceil(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
        if (!isNaN(result)) {
            return result;
        }
        else {
            return 0;
        }
    };
    /**
     * Return customized floor value
     * @param {number} value: input value
     * @param {number} decimal: the number of decimal digits.
     */
    MathUtil.floorDecimal = function (value, decimal) {
        var result = Math.floor(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
        if (!isNaN(result)) {
            return result;
        }
        else {
            return 0;
        }
    };
    /**
     * Return value based on check NaN and infinite value
     * @param {number} value: input value
     * @param {number} decimal: the number of decimal digits.
     */
    MathUtil.checkNaN = function (value) {
        if (isNaN(value) || !isFinite(value) || util_1.isNull(value)) {
            return 0;
        }
        else {
            return value;
        }
    };
    /**
     * A handy little round function that takes precision.
     * @param value the value.
     * @param precision the decimal place.
     * @returns {number}
     */
    MathUtil.round = function (value, precision) {
        if (!validator_util_1.default.isNumber(value))
            return 0;
        if (!Number.isInteger(precision))
            precision = 0;
        var multiplier = Math.pow(10, precision);
        return Math.round(value * multiplier) / multiplier;
    };
    return MathUtil;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MathUtil;
//# sourceMappingURL=math-util.js.map