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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var common_helper_1 = require("../../helper/common-helper");
var mst_data_type_1 = require('../../helper/mst-data-type');
var SpecifyTimeModal_model_1 = require("./SpecifyTimeModal.model");
var GenericProvider_1 = require("../GenericProvider");
var SPECIFY_TIME_OPTIONS = common_helper_1.CommonHelper.getList(mst_data_type_1.SPECIFY_TIME_CODE_LIST, mst_data_type_1.SPECIFY_TIME);
var SPECIFY_TIME_PERIOD_OPTIONS = common_helper_1.CommonHelper.getList(mst_data_type_1.SPECIFY_TIME_PERIOD_CODE_LIST, mst_data_type_1.SPECIFY_TIME_PERIOD);
var SpecifyTimeModalComponent = (function () {
    function SpecifyTimeModalComponent(provider) {
        this.model = provider.provider;
        this.specifyTime = {};
    }
    SpecifyTimeModalComponent.prototype.ngAfterViewInit = function () {
        $(this.timePeriodE.nativeElement).slimScroll({
            height: "210px"
        });
        // 3249
        $('.modal').on('hidden.bs.modal', function (e) {
            if ($('.modal').hasClass('in')) {
                $('body').addClass('modal-open');
            }
        });
    };
    Object.defineProperty(SpecifyTimeModalComponent.prototype, "timeOptions", {
        //region Bindings
        get: function () {
            return SPECIFY_TIME_OPTIONS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpecifyTimeModalComponent.prototype, "periodOptions", {
        get: function () {
            return SPECIFY_TIME_PERIOD_OPTIONS;
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Actions
    SpecifyTimeModalComponent.prototype.open = function (specifyTime) {
        // set value
        this.specifyTime.stm_pattern = specifyTime.stm_pattern;
        this.specifyTime.stm_hour = specifyTime.stm_hour;
        this.specifyTime.stm_minute = specifyTime.stm_minute;
        this.specifyTime.stm_period = specifyTime.stm_period;
        // cache shipping
        this.originTime = specifyTime;
        // open modal
        $(this.modalE.nativeElement).modal('show');
        // scroll to seleted value
        if (this.specifyTime.stm_pattern != undefined) {
            var self_1 = this;
            setTimeout(function () {
                var wrapper = $(self_1.timePeriodE.nativeElement);
                var activated = wrapper.children("div.active").first();
                var scrollToVal = wrapper.scrollTop() + activated.position().top;
                wrapper.slimScroll({ scrollTo: scrollToVal + 'px' });
            }, 50);
        }
    };
    SpecifyTimeModalComponent.prototype.close = function () {
        $(this.modalE.nativeElement).modal('hide');
    };
    SpecifyTimeModalComponent.prototype.cancel = function () {
        this.close();
    };
    SpecifyTimeModalComponent.prototype.select = function () {
        // update value
        this.originTime.stm_pattern = this.specifyTime.stm_pattern;
        this.originTime.stm_hour = this.specifyTime.stm_hour;
        this.originTime.stm_minute = this.specifyTime.stm_minute;
        this.originTime.stm_period = this.specifyTime.stm_period;
        this.model.timeSelected();
        // close modal
        this.close();
    };
    SpecifyTimeModalComponent.prototype.setPattern = function (value) {
        this.specifyTime.stm_pattern = value;
    };
    __decorate([
        core_1.ViewChild("modal"), 
        __metadata('design:type', core_1.ElementRef)
    ], SpecifyTimeModalComponent.prototype, "modalE", void 0);
    __decorate([
        core_1.ViewChild("timePeriod"), 
        __metadata('design:type', core_1.ElementRef)
    ], SpecifyTimeModalComponent.prototype, "timePeriodE", void 0);
    SpecifyTimeModalComponent = __decorate([
        core_1.Component({
            selector: "specify-time-modal",
            templateUrl: "SpecifyTimeModal.component.html",
            styleUrls: ["SpecifyTimeModal.component.css"],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(0, core_1.Inject(SpecifyTimeModal_model_1.SpecifyTimeModalModel.PROVIDER)), 
        __metadata('design:paramtypes', [GenericProvider_1.GenericProvider])
    ], SpecifyTimeModalComponent);
    return SpecifyTimeModalComponent;
}());
exports.SpecifyTimeModalComponent = SpecifyTimeModalComponent;
//# sourceMappingURL=SpecifyTimeModal.component.js.map