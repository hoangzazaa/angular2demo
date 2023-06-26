"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by haipt on 9/23/2016.
 */
var core_1 = require("@angular/core");
var DateInput2Directive = (function () {
    function DateInput2Directive(el) {
        this.el = el;
        this.dateModelChange = new core_1.EventEmitter();
        this.dateFormats = ["YYYYMMDD"];
        if (typeof this.el.nativeElement.getAttribute("data-date-format") == "string") {
            this.dateFormats.push(this.el.nativeElement.getAttribute("data-date-format"));
        }
    }
    DateInput2Directive.prototype.ngAfterViewInit = function () {
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
    };
    DateInput2Directive.prototype.ngOnChanges = function (changes) {
        if (changes["dateModel"] != undefined) {
            if (!$(this.el.nativeElement).is(":focus")) {
                if (this.dateModel == undefined) {
                    $(this.el.nativeElement).val("");
                }
                else if (changes["dateModel"].previousValue == undefined || (!changes["dateModel"].isFirstChange()
                    && changes["dateModel"].previousValue.getTime() != this.dateModel.getTime())) {
                    this.dateModel = this.verifyDate(this.dateModel);
                    $(this.el.nativeElement).datepicker("setUTCDate", this.dateModel);
                }
            }
        }
    };
    DateInput2Directive.prototype.pickDate = function (pickedValue) {
        this.dateModel = pickedValue;
        this.dateModelChange.emit(this.dateModel);
    };
    DateInput2Directive.prototype.onHide = function () {
        var inputDate = moment(this.el.nativeElement.value, this.dateFormats);
        if (!inputDate.isValid()) {
            var value = this.verifyDate(undefined);
            $(this.el.nativeElement).datepicker("setDate", value);
        }
        else {
            var value = this.verifyDate(inputDate.toDate());
            $(this.el.nativeElement).datepicker("setDate", value);
        }
    };
    DateInput2Directive.prototype.verifyDate = function (value) {
        if (value == undefined) {
            return this.defaultDate;
        }
        else if (this.minDate != undefined && this.minDate.getTime() > value.getTime()) {
            return this.minDate;
        }
        else if (this.maxDate != undefined && this.maxDate.getTime() < value.getTime()) {
            return this.maxDate;
        }
        else {
            return value;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DateInput2Directive.prototype, "dateModel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DateInput2Directive.prototype, "dateModelChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DateInput2Directive.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DateInput2Directive.prototype, "maxDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DateInput2Directive.prototype, "defaultDate", void 0);
    DateInput2Directive = __decorate([
        core_1.Directive({
            selector: "input[date-input2]"
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DateInput2Directive);
    return DateInput2Directive;
}());
exports.DateInput2Directive = DateInput2Directive;
//# sourceMappingURL=date-input2.directive.js.map