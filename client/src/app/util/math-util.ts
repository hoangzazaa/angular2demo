/**
 * Created by VuPT on 9/15/2016.
 */
import ValidatorUtil from "./validator-util";
import {isNull} from "util";
/** Class represent MathUtil used for calculation
 * */
export default class MathUtil {
    /**
     * Return customized round value
     * @param {number} value: input value
     * @param {number} decimal: the number of decimal digits.
     */
    static roundDecimal(value: number, decimal: number) {
        let result = Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
        if (!isNaN(result)) {
            return result;
        } else {
            return 0;
        }

    }

    /**
     * Return customized round value
     * @param {number} value: input value
     * @param {number} decimal: the number of decimal digits.
     */
    static ceilDecimal(value: number, decimal: number) {
        let result = Math.ceil(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
        if (!isNaN(result)) {
            return result;
        } else {
            return 0;
        }

    }

    /**
     * Return customized floor value
     * @param {number} value: input value
     * @param {number} decimal: the number of decimal digits.
     */
    static floorDecimal(value: number, decimal: number) {
        let result = Math.floor(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
        if (!isNaN(result)) {
            return result;
        } else {
            return 0;
        }
    }

    /**
     * Return value based on check NaN and infinite value
     * @param {number} value: input value
     * @param {number} decimal: the number of decimal digits.
     */
    static checkNaN(value: number) {
        if (isNaN(value) || !isFinite(value)||isNull(value)) {
            return 0;
        } else {
            return value;
        }
    }

    /**
     * A handy little round function that takes precision.
     * @param value the value.
     * @param precision the decimal place.
     * @returns {number}
     */
    static round(value: number, precision: number): number {
        if (!ValidatorUtil.isNumber(value))
            return 0;

        if (!Number.isInteger(precision))
            precision = 0;

        var multiplier = Math.pow(10, precision);
        return Math.round(value * multiplier) / multiplier;
    }

}
