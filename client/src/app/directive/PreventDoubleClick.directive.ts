import {Directive, HostListener, HostBinding, Input} from "@angular/core";

/**
 * This directive use to custom input number format.
 * Demo: <input number-input [(_value)]="x" [numberPrecision]="1"/>
 *
 * @author manhnv
 */
@Directive({
    selector: "[preventDC]"
})
export class PreventDoubleClickDirective {


    @HostBinding() disabled: boolean = false;

    @Input()
    set valid(value: boolean) {
        this.disabled = !value;
    }

    @HostListener('click', ['$event'])
    onClick(event: any) {
        if (!this.disabled) {
            event.stopPropagation();
            return false;
        }
        this.disabled = true;
    }

}
