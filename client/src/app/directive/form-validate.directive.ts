/**
 * Created by haipt on 9/5/2016.
 */
import {Directive, ElementRef, OnInit} from "@angular/core";
declare var $: JQueryStatic;

@Directive({
    selector: ".js-validation-material"
})
export class FormValidateDirective implements OnInit {

    constructor(private el: ElementRef) {
    }

    ngOnInit(): void {
        let validationOptions: JQueryValidation.ValidationOptions = {
            errorClass: 'help-block text-right animated fadeInDown',
            errorElement: 'div',
            errorPlacement: function (error, e) {
                $(e).parents('.form-group > div').append(error);
            },
            highlight: function (e) {
                $(e).closest('.form-group').removeClass('has-error').addClass('has-error');
                $(e).closest('.help-block').remove();
            },
            success: function (e) {
                $(e).closest('.form-group').removeClass('has-error');
                $(e).closest('.help-block').remove();
            }
        };

        $(this.el.nativeElement).validate(validationOptions);
    }
}