/**
 * Created by haipt on 9/5/2016.
 */
import {Directive, ElementRef, OnInit} from "@angular/core";
declare var $: JQueryStatic;
@Directive({
    selector: ".form-material.floating",
})
export class FormDirective implements OnInit {

    constructor(private el: ElementRef) {
    }

    ngOnInit(): void {
        $(this.el.nativeElement).children(".form-control").each(function () {
            var input = jQuery(this);
            var parent = input.parent('.form-material');

            if (input.val()) {
                parent.addClass('open');
            }

            input.on('change', function () {
                if (input.val()) {
                    parent.addClass('open');
                } else {
                    parent.removeClass('open');
                }
            });
        });
    }
}