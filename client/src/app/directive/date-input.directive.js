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
var core_1 = require("@angular/core");
var DateInputDirective = (function () {
    function DateInputDirective(el) {
        this.el = el;
        this.dateModelChange = new core_1.EventEmitter();
        this.defaultOptions = {
            autoclose: true,
            assumeNearbyYear: true,
            forceParse: false,
            language: "ja"
        };
        this.dateFormats = ["YYYYMMDD"];
        this.$nativeElement = $(this.el.nativeElement);
    }
    DateInputDirective.prototype.ngAfterViewInit = function () {
        var self = this;
        this.$nativeElement
            .datepicker(self.defaultOptions)
            .datepicker("setDate", self.dateModel)
            .on("hide", function () {
            self.onHide();
        });
    };
    DateInputDirective.prototype.ngOnChanges = function (changes) {
        if (!changes["dateModel"])
            return;
        if (!this.dateModel) {
            this.$nativeElement.val("");
            return;
        }
        var dateModelChanges = changes["dateModel"];
        if (!dateModelChanges.previousValue
            || (!dateModelChanges.isFirstChange() && dateModelChanges.previousValue.getTime() != this.dateModel.getTime())) {
            this.$nativeElement.datepicker("setDate", this.dateModel);
        }
    };
    DateInputDirective.prototype.onHide = function () {
        var d = null;
        if (!!this.$nativeElement.val()) {
            var mo = moment(this.$nativeElement.val(), this.dateFormats);
            d = mo.isValid() ? mo.toDate() : this.defaultDate;
        }
        this.$nativeElement.datepicker("setDate", d);
        this.applyDate();
    };
    DateInputDirective.prototype.applyDate = function () {
        this.dateModel = this.$nativeElement.datepicker("getDate");
        this.dateModelChange.emit(this.dateModel);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DateInputDirective.prototype, "dateModel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DateInputDirective.prototype, "defaultDate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DateInputDirective.prototype, "dateModelChange", void 0);
    DateInputDirective = __decorate([
        core_1.Directive({
            selector: "input[date-input]"
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DateInputDirective);
    return DateInputDirective;
}());
exports.DateInputDirective = DateInputDirective;
//# sourceMappingURL=date-input.directive.js.map