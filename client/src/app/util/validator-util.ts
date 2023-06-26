/**
 * Created by manhnv on 11/14/2016.
 */
export default class ValidatorUtil {
    public static readonly EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    static isNumeric($event): boolean {
        return $event.charCode >= 48 && $event.charCode <= 57
    }

    static isNotEmpty(val: any): boolean {
        return !this.isEmpty(val);
    }

    static isEmpty(val: any): boolean {
        return (val === undefined || val == null || val.length == 0);
    }

    static isValidEmail(email: string): boolean {
        return this.EMAIL_PATTERN.test(email);
    }

    static isNumber(val: any): boolean {
        return !isNaN(parseFloat(val)) && isFinite(val);
    }

    static isNotNullOrEmpty(val: string): boolean {
        return !!val;
    }

    static isNullOrEmpty(val: string): boolean {
        return !val;
    }

    static isNotNullOrBlank(val: string): boolean {
        return !!val && !!val.trim();
    }

    static isNullOrBlank(val: string): boolean {
        return !val || !val.trim();
    }

}
