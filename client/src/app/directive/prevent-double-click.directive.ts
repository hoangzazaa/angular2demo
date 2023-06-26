import {Directive, HostBinding, HostListener, Input} from "@angular/core";

/**
 * Prevent double click action when action is executing.
 *
 * ### Usage
 *
 * // .html
 * ```
 * <button prevent-dblclick [disable]="isDisable" class="btn btn-minw btn-primary" type="button" (click)="doTest($event)">PreventDoubleClick</button>
 *
 * // .ts
 * ```
 * private isDisable: boolean = false;
 *
 * doTest() {
 *    this.isDisable = true;
 *    this.sf00101Service.doTest().then(res => {
 *      // do something
 *      this.isDisable = false;
 *    });
 * }
 * ```
 *
 * @author manhnv
 */
@Directive({selector: "[prevent-dblclick]"})
export class PreventDoubleClick {
    @HostBinding()
    private disabled: boolean = false;

    @Input()
    set disable(value: boolean) {
        this.disabled = value;
    }

    @HostListener("click", ["$event"])
    onClick(event: any): void {
        if (this.disabled) {
            event.stopPropagation();
            return;
        }

        this.disabled = false;
    }
}