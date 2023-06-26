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
/**
 * Common component for pagination
 * Input/Output
 *  [total]     total record
 *  [pageSize]  number record per page
 *  [currentPage]   set current page number
 *  (currentPageChange) event change current page
 *
 * @author haipt
 */
var PaginationComponent = (function () {
    function PaginationComponent(element) {
        this.element = element;
        this.currentPageChange = new core_1.EventEmitter();
        this.isHidden = true;
        this.total = 0;
        this.currentPage = 0;
        this.pageSize = 10;
    }
    PaginationComponent.prototype.ngOnChanges = function (changes) {
        if (changes["total"] || changes["pageSize"]) {
            if (this.pageSize <= 0) {
                this.pageSize = 10;
            }
            var totalPage = Math.ceil(this.total / this.pageSize);
            this.setTotalPage(totalPage);
        }
        if (changes["currentPage"]) {
            // if currentPage change
            var pageValue = changes["currentPage"].currentValue;
            // check if value valid
            if (isNaN(pageValue) || pageValue < 0 || pageValue > this.totalPage) {
                // set first page if value invalid
                pageValue = 1;
            }
            this.goPage(pageValue);
        }
    };
    PaginationComponent.prototype.setTotalPage = function (value) {
        // update total page
        this.totalPage = value;
        // update display
        if (this.totalPage == 0) {
            this.isHidden = true;
        }
        else {
            this.isHidden = false;
        }
        // go first page
        this.setPage(1);
    };
    PaginationComponent.prototype.goPrevious = function () {
        if (this.currentPage > 1) {
            this.goPage(this.currentPage - 1);
        }
    };
    PaginationComponent.prototype.goNext = function () {
        if (this.currentPage < this.totalPage) {
            this.goPage(this.currentPage + 1);
        }
    };
    PaginationComponent.prototype.goPage = function (page) {
        if (page == this.currentPage) {
            this.activePreLastPage();
            // no change page
            return;
        }
        else {
            // update page display
            this.setPage(page);
            // emit change event
            this.currentPageChange.emit(this.currentPage);
        }
    };
    PaginationComponent.prototype.setPage = function (page) {
        // update current page
        this.currentPage = page;
        // page displays
        if (this.totalPage > 7) {
            // update page value
            if (this.currentPage < 5) {
                this.mid1Page = 2;
                this.mid2Page = 3;
                this.mid3Page = 4;
                this.mid4Page = 5;
                this.mid5Page = 6;
            }
            else if (this.currentPage > this.totalPage - 4) {
                this.mid1Page = this.totalPage - 5;
                this.mid2Page = this.totalPage - 4;
                this.mid3Page = this.totalPage - 3;
                this.mid4Page = this.totalPage - 2;
                this.mid5Page = this.totalPage - 1;
            }
            else {
                this.mid2Page = this.currentPage - 1;
                this.mid3Page = this.currentPage;
                this.mid4Page = this.currentPage + 1;
            }
            // update show-hide btns
            if (this.currentPage < 5) {
                // hide prevEtc, show mid1Page
                this.prevEtcHidden = true;
                this.mid1Hidden = false;
                // show nextEtc, hide mid5Page
                this.nextEtcHidden = false;
                this.mid5Hidden = true;
            }
            else if (this.currentPage > this.totalPage - 4) {
                // show prevEtc, hide mid1Page
                this.prevEtcHidden = false;
                this.mid1Hidden = true;
                // hide nextEtc, show mid5Page
                this.nextEtcHidden = true;
                this.mid5Hidden = false;
            }
            else {
                // show prevEtc, hide mid1Page
                this.prevEtcHidden = false;
                this.mid1Hidden = true;
                // show nextEtc, hide mid5Page
                this.nextEtcHidden = false;
                this.mid5Hidden = true;
            }
            // show other mid pages
            this.mid2Hidden = false;
            this.mid3Hidden = false;
            this.mid4Hidden = false;
            // display last page
            this.lastHidden = false;
        }
        else {
            // update page values
            this.mid1Page = 2;
            this.mid2Page = 3;
            this.mid3Page = 4;
            this.mid4Page = 5;
            this.mid5Page = 6;
            // display mid pages
            this.mid1Hidden = (this.totalPage < 2);
            this.mid2Hidden = (this.totalPage < 3);
            this.mid3Hidden = (this.totalPage < 4);
            this.mid4Hidden = (this.totalPage < 5);
            this.mid5Hidden = (this.totalPage < 6);
            // display last page
            this.lastHidden = (this.totalPage < 7);
            // hide etc buttons
            this.prevEtcHidden = true;
            this.nextEtcHidden = true;
        }
        // disable buttons
        this.activePreLastPage();
    };
    PaginationComponent.prototype.activePreLastPage = function () {
        if (this.currentPage == 1) {
            this.previousDisabled = true;
        }
        else {
            this.previousDisabled = false;
        }
        if (this.currentPage == this.totalPage) {
            this.nextDisabled = true;
        }
        else {
            this.nextDisabled = false;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "total", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "pageSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "currentPage", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PaginationComponent.prototype, "currentPageChange", void 0);
    PaginationComponent = __decorate([
        core_1.Component({
            selector: "pagination-component",
            templateUrl: "pagination.component.html",
            styleUrls: ["pagination.component.css"]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PaginationComponent);
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=pagination.component.js.map