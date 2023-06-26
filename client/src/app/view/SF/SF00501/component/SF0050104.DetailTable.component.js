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
var SF00501_page_1 = require("../SF00501.page");
var SF0050104Component = (function () {
    function SF0050104Component(page) {
        this.page = page;
    }
    SF0050104Component.prototype.ngAfterViewInit = function () {
        this.initDataTable();
        // trigger select staff
        var self = this;
        $(".sf0050105-staff").click(function (event) {
            var staffId = $(this).data("staff");
            self.filterStaff(staffId);
        });
    };
    SF0050104Component.prototype.initDataTable = function () {
        if (this.page.pageData.displayTable
            && this.page.pageData.displayDetails != undefined
            && this.page.pageData.displayDetails.length > 0) {
            var columnDefs = this.getColumnDefs();
            var dataTable = $("#sf0050104-table").DataTable({
                searching: false,
                ordering: false,
                paging: false,
                info: false,
                scrollX: true,
                columnDefs: columnDefs,
                fixedColumns: {
                    leftColumns: 2
                }
            });
        }
    };
    Object.defineProperty(SF0050104Component.prototype, "dateList", {
        get: function () {
            return this.page.pageData.dateList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050104Component.prototype, "dataWrapper", {
        get: function () {
            return this.page.pageData.displayDetails;
        },
        enumerable: true,
        configurable: true
    });
    //region Functions
    SF0050104Component.prototype.getColumnDefs = function () {
        var columnDefs = [{ width: "60px", targets: 0 }];
        var dateLength = this.page.pageData.dateList.length;
        var clmWidth = "10%";
        if (dateLength == 12) {
            columnDefs.push({ width: "60px", targets: 1 });
            clmWidth = "8%";
        }
        else if (dateLength == 6) {
            columnDefs.push({ width: "10%", targets: 1 });
            clmWidth = "15%";
        }
        else if (dateLength == 3) {
            columnDefs.push({ width: "10%", targets: 1 });
            clmWidth = "30%";
        }
        else if (dateLength > 12) {
            columnDefs.push({ width: "60px", targets: 1 });
            clmWidth = "70px";
        }
        for (var i = 0; i < dateLength; i++) {
            columnDefs.push({ width: clmWidth, targets: i + 2 });
        }
        return columnDefs;
    };
    SF0050104Component.prototype.filterStaff = function (staffId) {
        var staffs = this.page.pageData.staffs;
        var selectedStaff;
        for (var _i = 0, staffs_1 = staffs; _i < staffs_1.length; _i++) {
            var staff = staffs_1[_i];
            if (staff.id == staffId) {
                selectedStaff = staff;
                break;
            }
        }
        if (selectedStaff != undefined) {
            this.page.pageData.selectedFilter.staff = selectedStaff;
            this.page.doFilter();
        }
    };
    SF0050104Component = __decorate([
        core_1.Component({
            selector: "[sf0050104]",
            templateUrl: "SF0050104.DetailTable.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [SF00501_page_1.SF00501Page])
    ], SF0050104Component);
    return SF0050104Component;
}());
exports.SF0050104Component = SF0050104Component;
//# sourceMappingURL=SF0050104.DetailTable.component.js.map