import {Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output} from "@angular/core";
import {Constants} from "../helper/constants";
import ValidatorUtil from "../util/validator-util";

/**
 * This directive use to custom input number format.
 * Demo: <input number-input [(_value)]="x" [numberPrecision]="1"/>
 *
 * @author manhnv
 */
@Directive({selector: "[number-input]"})
export class NumberInputDirective {

    // setting value
    @Input("numberPrecision") precisionNumber: number;
    @Input("maxValue") maxValue: number;
    @Input("minValue") minValue: number;
    @Input("defaultValue") defaultValue: number;
    @Input("notFormatNumber") notFormatNumber: boolean;

    // local value
    private _value: number;
    private isFocus: boolean;

    // identify element has placeholder value text or not
    private placeholderValue: string;

    // set input value
    @Input() set numberValue(value: number) {
        this._value = value;
        if (!this.isFocus) {
            this.onBlur(value);
        }
    }

    // value change emitter
    @Output() numberValueChange: EventEmitter<number> = new EventEmitter<number>();

    constructor(private el: ElementRef) {
        // check placeholder attribute already defined
        if (this.el.nativeElement.getAttribute("placeholder") != undefined) {
            // get 'placeholder' value
            this.placeholderValue = this.el.nativeElement.getAttribute("placeholder");
        }

        this.isFocus = false;
    }

    /* setting input is number */
    @HostBinding("type") inputType = "text";

    @HostListener("focus", ["$event.target.value"])
    onFocus(value) {
        // set input value
        if (this._value != undefined && this._value != null) {
            this.el.nativeElement.value = this._value;
        } else { // current value is not set then set element's value is null
            this.el.nativeElement.value = value;
        }
        // set input type
        this.el.nativeElement.type = "number";
        // set min
        if (this.minValue == undefined) {
            this.minValue = 0;
        }
        $(this.el.nativeElement).attr("min", this.minValue);
        // set max
        if (this.maxValue != undefined) {
            $(this.el.nativeElement).attr("max", this.maxValue);
        }

        // set focus-in
        this.isFocus = true;

        $(this.el.nativeElement).select();
    }

    @HostListener("blur", ["$event.target.value"])
    onBlur(value) {
        // set input type
        this.el.nativeElement.type = "text";

        if (ValidatorUtil.isNotEmpty(value) || this.defaultValue != 0) { // current value already set
            // apply precision
            if (this.precisionNumber != undefined && !isNaN(this._value)) {
                let decimalNumber = Math.pow(10, this.precisionNumber);
                this._value = Math.round(this._value * decimalNumber) / decimalNumber;
                if (this.isFocus) {
                    this.numberValueChange.emit(this._value);
                }
            }
        } else { // current value is not set then set element's value is null
            this._value = null;
        }

        // format number
        if(this.notFormatNumber != true){
            this.el.nativeElement.value = this.formatNumber(this._value);
        }else{
            this.el.nativeElement.value = this._value;
        }

        // set focus-out
        this.isFocus = false;
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: any) {
        // get keyCode
        let keyCode = event.which;
        // reject "e" character
        if (keyCode == 69) {
            event.stopPropagation();
            return false;
        } else if (keyCode == 109 || keyCode == 189) {
            // check minvalue == null or minvalue == 0
            if (this.minValue >= 0 || !this.minValue) {
                event.stopPropagation();
                return false;
            }
        }
    }

    @HostListener("input", ["$event.target.value"])
    onInputChange(value) {
        if (ValidatorUtil.isEmpty(value)) {
            if (this._value != undefined) {
                /*when element not define placeholder or placeholder value is blank|empty then element's value is
                 default value*/
                if (ValidatorUtil.isEmpty(this.placeholderValue)) {
                    this._value = this.defaultValue;
                } else { // set element's value is null
                    this._value = null;
                }

                this.numberValueChange.emit(this._value);
                return;
            }
        } else if (!isNaN(+value)) {
            value = +value;
            // check max, min
            if (this.minValue != undefined && value < this.minValue) {
                // reset value to minValue
                value = this.minValue;
            } else if (this.maxValue != undefined && value > this.maxValue) {
                // reset value to maxValue
                value = this.maxValue;
            }
            if (this._value != value) {
                this._value = value;
                this.numberValueChange.emit(this._value);
                return;
            }
        }

        event.stopPropagation();
        return false;
    }

    formatNumber(value: number): string {
        if (ValidatorUtil.isEmpty(value)) {
            if (ValidatorUtil.isEmpty(this.placeholderValue) && ValidatorUtil.isNotEmpty(this.defaultValue))
                return this.defaultValue.toString();
            return null;
        } else {
            if (value == 0) // do not append decimal (only return value as 0)
                return Constants.ZERO.toString();

            // n: length of decimal
            let n = this.precisionNumber;
            if (n == undefined)
                n = 0;

            // x: length of sections
            let x = 3;
            let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
            return value.toFixed(n).replace(new RegExp(re, Constants.GROUP), '$&,');
        }
    }

}
