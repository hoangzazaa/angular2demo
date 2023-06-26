import {Pipe, PipeTransform} from "@angular/core";
import {Constants} from "../helper/constants";
import ValidatorUtil from "../util/validator-util";

/**
 * This pipe use to format number.
 * @author manhnv
 */
@Pipe({name: "numberFormat"})
export class NumberFormatPipe implements PipeTransform {
    private REG_EXP: RegExp;
    private DECIMAL_SEPARATOR: string;
    private THOUSANDS_SEPARATOR: string;

    constructor() {
        this.DECIMAL_SEPARATOR = Constants.PERIOD;
        this.THOUSANDS_SEPARATOR = Constants.COMMA;
        this.REG_EXP = /\B(?=(\d{3})+(?!\d))/g;
    }

    transform(value: number | string, precision: number = 1): string {
        if (ValidatorUtil.isEmpty(value) || !ValidatorUtil.isNumber(value))
            return null;

        if (value == Constants.ZERO.toString())
            return Constants.ZERO.toString();

        let [integer, fraction = Constants.BLANK] = (value || Constants.BLANK).toString()
            .split(Constants.PERIOD);

        fraction = precision > Constants.ZERO
            ? this.DECIMAL_SEPARATOR + (fraction + Constants.DECIMAL_PADDING).substring(Constants.ZERO, precision)
            : Constants.BLANK;

        integer = integer.replace(this.REG_EXP, this.THOUSANDS_SEPARATOR);

        let retVal = integer + fraction;
        let decimalPlaces = retVal.split(this.DECIMAL_SEPARATOR);
        if (Array.isArray(decimalPlaces) && ValidatorUtil.isNotEmpty(decimalPlaces[1])
            && decimalPlaces[1].charAt(Constants.ZERO) === Constants.ZERO.toString()) {
            // if contain zero at decimal place then keep remove it
            return retVal.substring(Constants.ZERO, retVal.length - 2);
        }

        return retVal;
    }

    parse(value: string, precision: number = 1): string {
        if (ValidatorUtil.isEmpty(value) || !ValidatorUtil.isNumber(value))
            return null;

        let [integer, fraction = Constants.BLANK] = (value || Constants.BLANK).split(this.DECIMAL_SEPARATOR);

        integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, Constants.GROUP), Constants.BLANK);

        fraction = parseInt(fraction, 10) > Constants.ZERO && precision > Constants.ZERO
            ? this.DECIMAL_SEPARATOR + (fraction + Constants.DECIMAL_PADDING).substring(Constants.ZERO, precision)
            : Constants.BLANK;

        return integer + fraction;
    }

}