/**
 * Typescript interface for jquery-autoNumeric
 * https://github.com/BobKnothe/autoNumeric
 */
interface JQuery {
    autoNumeric(): JQuery;
    autoNumeric(options: JqueryAutoNumericOption): JQuery;
    autoNumeric(method: "init", options: JqueryAutoNumericOption): JQuery;
    autoNumeric(method: "update", options: JqueryAutoNumericOption): JQuery;
    autoNumeric(method: "destroy"): JQuery;
    autoNumeric(method: "set", value: string): JQuery;
    autoNumeric(method: "get"): string;
    autoNumeric(method: "getString"): string;
    autoNumeric(method: "getSettings"): JqueryAutoNumericOption;
}

interface JqueryAutoNumericOption {
    /* controls the thousand separator (note - the thousand & decimal separators can not be the same) */
    "aSep"?: string,
    /* controls the digital grouping - the placement of the thousand separator */
    "dGroup"?: number,
    /* aDec - controls the decimal (note - the thousand & decimal separators can not be the same) */
    "aDec"?: string,
    /* desired currency symbol (examples: € or EUR) */
    "aSign"?: string,
    /* controls the placement of the currency symbol */
    "pSign"?: "p" | "s",
    /* Enter the minimum value allowed. */
    "vMin"?: number,
    /* Enter the maximum value allowed */
    "vMax"?: number,
    /* Only needed if you want to override the number of decimal places that are set by the vMin & vMax values */
    "mDec"?: number,
    /* controls the rounding method(http://www.decorplanit.com/plugin/#mRoundExample) */
    "mRound"?: "S" | "A" | "s" | "a" | "B" | "U" | "D" | "C" | "F" | "CHF",
    /* controls padding of the decimal places. */
    "aPad"?: boolean,
    /* Controls if negative values are display with brackets when the input does NOT have focus */
    "nBracket"?: string,
    /* controls input display behavior */
    "wEmpty"?: "empty" | "zero" | "sign",
    /* Controls if default values are formatted on page ready (load) */
    "aForm"?: boolean
}
