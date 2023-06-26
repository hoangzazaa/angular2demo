/**
 * Created by haipt on 9/23/2016.
 */
import {Input, Output, Directive, ElementRef, AfterViewInit, EventEmitter, OnChanges, SimpleChanges} from "@angular/core";

@Directive({
    selector: "input[date-input2]"
})
export class DateInput2Directive implements AfterViewInit, OnChanges {

    @Input() dateModel: Date;
    @Output() dateModelChange: EventEmitter<Date> = new EventEmitter<Date>();
    private dateFormats = ["YYYYMMDD"];
    // date boundary
    @Input() minDate: Date;
    @Input() maxDate: Date;
    @Input() defaultDate: Date;

    constructor(private el: ElementRef) {
        if (typeof this.el.nativeElement.getAttribute("data-date-format") == "string") {
            this.dateFormats.push(this.el.nativeElement.getAttribute("data-date-format"));
        }
    }

    ngAfterViewInit(): void {
        var self = this;
        $(this.el.nativeElement)
            .datepicker({
                "forceParse": false,
                "autoclose": true,
                "language": "ja"
            })
            .datepicker("setUTCDate", this.dateModel)
            .on("hide", function () {
                self.onHide();
                self.pickDate($(this).datepicker("getUTCDate"));
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["dateModel"] != undefined) {
            if (!$(this.el.nativeElement).is(":focus")) {
                if (this.dateModel == undefined) {
                    $(this.el.nativeElement).val("");
                } else if (changes["dateModel"].previousValue == undefined || (!changes["dateModel"].isFirstChange()
                    && changes["dateModel"].previousValue.getTime() != this.dateModel.getTime())) {
                    this.dateModel = this.verifyDate(this.dateModel);
                    $(this.el.nativeElement).datepicker("setUTCDate", this.dateModel);
                }
            }
        }
    }

    pickDate(pickedValue: Date) {
        this.dateModel = pickedValue;
        this.dateModelChange.emit(this.dateModel);
    }

    onHide() {
        var inputDate = moment(this.el.nativeElement.value, this.dateFormats);
        if (!inputDate.isValid()) {
            let value = this.verifyDate(undefined);
            $(this.el.nativeElement).datepicker("setDate", value);
        } else {
            let value = this.verifyDate(inputDate.toDate());
            $(this.el.nativeElement).datepicker("setDate", value);
        }
    }

    private verifyDate(value: Date): Date {
        if (value == undefined) {
            return this.defaultDate;
        } else if (this.minDate != undefined && this.minDate.getTime() > value.getTime()) {
            return this.minDate;
        } else if (this.maxDate != undefined && this.maxDate.getTime() < value.getTime()) {
            return this.maxDate;
        } else {
            return value;
        }
    }
}