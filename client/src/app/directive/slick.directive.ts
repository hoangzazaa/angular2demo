/**
 * Created by haipt on 9/5/2016.
 */
import {Directive, AfterViewInit, ElementRef, Input} from "@angular/core";
declare var $: JQueryStatic;
@Directive({
    selector: ".js-slider"
})
export class SlickDirective implements AfterViewInit {

    @Input()
    arrows: boolean;
    @Input()
    dots: boolean;
    @Input()
    slidesToShow: number;
    @Input()
    autoplay: boolean;
    @Input()
    autoplaySpeed: number;
    @Input()
    variableWidth: boolean;
    @Input()
    infinite: boolean;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {

        $(this.el.nativeElement).slick({
            infinite: false,
            arrows: this.arrows ? this.arrows : false,
            dots: this.dots ? this.dots : false,
            slidesToShow: this.slidesToShow ? this.slidesToShow : 1,
            autoplay: this.autoplay ? this.autoplay : false,
            autoplaySpeed: this.autoplaySpeed ? this.autoplaySpeed : 3000,
            variableWidth: this.variableWidth ? this.variableWidth : false
        });
    }
}