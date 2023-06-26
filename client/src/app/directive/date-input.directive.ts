import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from "@angular/core";

interface DatepickerOptions {
    autoclose?: boolean;
    assumeNearbyYear?: boolean;
    beforeShowDay?: (d: Date) => any;
    beforeShowMonth?: (d: Date) => any;
    beforeShowYear?: (d: Date) => any;
    beforeShowDecade?: (d: Date) => any;
    beforeShowCentury?: (d: Date) => any;
    calendarWeeks?: boolean;
    clearBtn?: boolean;
    container?: string;
    datesDisabled?: string | string[];
    daysOfWeekDisabled?: string | string[];
    daysOfWeekHighlighted?: string | string[];
    defaultViewDate?: Date | string | { year: number | string; month: number | string; day: number | string };
    disableTouchKeyboard?: boolean;
    enableOnReadonly?: boolean;
    endDate?: Date | string;
    forceParse?: boolean;
    format?: string;
    immediateUpdates?: boolean;
    inputs?: JQuery;
    keepEmptyValues?: boolean;
    keyboardNavigation?: boolean;
    language?: string;
    maxViewMode?: number | string;
    minViewMode?: number | string;
    multidate?: boolean | number;
    multidateSeparator?: string;
    orientation?: string;
    showOnFocus?: boolean;
    startDate?: Date | string;
    startView?: number | string;
    templates?: any;
    title?: string;
    todayBtn?: boolean | "linked";
    todayHighlight?: boolean;
    toggleActive?: boolean;
    weekStart?: number;
    zIndexOffset?: number
}

declare let $: JQueryStatic;

@Directive({
    selector: "input[date-input]"
})
export class DateInputDirective implements AfterViewInit, OnChanges {

    @Input() dateModel: Date;
    @Input() defaultDate: Date;
    @Output() dateModelChange: EventEmitter<Date> = new EventEmitter<Date>();

    private defaultOptions: DatepickerOptions = {
        autoclose       : true,
        assumeNearbyYear: true,
        forceParse      : false,
        language        : "ja"
    };

    private $nativeElement: JQuery;

    private dateFormats = ["YYYYMMDD"];

    constructor(private el: ElementRef) {
        this.$nativeElement = $(this.el.nativeElement);
    }

    ngAfterViewInit(): void {
        let self = this;

        this.$nativeElement
            .datepicker(self.defaultOptions)
            .datepicker("setDate", self.dateModel)
            .on("hide", function () {
                    self.onHide();
                }
            );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes["dateModel"])
            return;

        if (!this.dateModel) {
            this.$nativeElement.val("");
            return;
        }

        let dateModelChanges = changes["dateModel"];

        if (!dateModelChanges.previousValue
            || ( !dateModelChanges.isFirstChange() && dateModelChanges.previousValue.getTime() != this.dateModel.getTime())
        ) {
            this.$nativeElement.datepicker("setDate", this.dateModel);
        }
    }

    onHide() {
        let d: Date = null;
        if (!!this.$nativeElement.val()) {
            let mo = moment(this.$nativeElement.val(), this.dateFormats);
            d = mo.isValid() ? mo.toDate() : this.defaultDate;
        }

        this.$nativeElement.datepicker("setDate", d);

        this.applyDate();
    }

    private applyDate(): void {
        this.dateModel = this.$nativeElement.datepicker("getDate");
        this.dateModelChange.emit(this.dateModel);
    }
}
