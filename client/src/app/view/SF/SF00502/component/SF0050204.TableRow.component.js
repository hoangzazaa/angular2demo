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
var SF00502_constants_1 = require("../SF00502.constants");
var SF0050203_CustomerTable_component_1 = require("./SF0050203.CustomerTable.component");
var SF00502_page_1 = require("../SF00502.page");
var message_1 = require("../../../../helper/message");
var SF00502_helper_1 = require("../SF00502.helper");
var SF0050204Component = (function () {
    function SF0050204Component(page, customerTable) {
        this.page = page;
        this.customerTable = customerTable;
    }
    SF0050204Component.prototype.ngOnInit = function () {
        // set row data
        if (this.index != undefined) {
            this.rowData = this.customerTable.tableNotes[this.index];
            // set data
            // row No
            // this.rowNo = this.index + 1;
            // customer name
            var customer = this.page.pageData.dataRepo.getCustomer(this.rowData.customerId);
            this.customerName = customer.name;
            // amount
            if (this.isPrediction) {
                this.newAmount = this.rowData.prediction;
            }
            else {
                this.newAmount = this.rowData.newRevenue;
            }
        }
        else {
        }
    };
    SF0050204Component.prototype.ngAfterViewInit = function () {
        if (this.selectEl != undefined) {
            // init select2
            var selectData = [];
            for (var _i = 0, _a = this.page.pageData.availableCustomers; _i < _a.length; _i++) {
                var customer = _a[_i];
                var cOption = {
                    id: customer.id,
                    text: customer.name,
                    disabled: false
                };
                // check if customer selected
                var noteList = this.page.pageData.increaseList.concat(this.page.pageData.decreaseList);
                for (var _b = 0, noteList_1 = noteList; _b < noteList_1.length; _b++) {
                    var note = noteList_1[_b];
                    if (note.customerId == customer.id) {
                        // disable customer
                        cOption.disabled = true;
                    }
                }
                selectData.push(cOption);
            }
            var self_1 = this;
            $(this.selectEl.nativeElement).select2({
                placeholder: "Select customer",
                minimumResultsForSearch: 6
            });
        }
    };
    Object.defineProperty(SF0050204Component.prototype, "customerList", {
        get: function () {
            return this.page.pageData.availableCustomers;
        },
        enumerable: true,
        configurable: true
    });
    SF0050204Component.prototype.updateSelect = function () {
        if (this.selectEl != undefined) {
            // init select2
            var selectData = [];
            for (var _i = 0, _a = this.page.pageData.availableCustomers; _i < _a.length; _i++) {
                var customer = _a[_i];
                var cOption = {
                    id: customer.id,
                    text: customer.name,
                    disabled: false
                };
                selectData.push(cOption);
            }
            $(this.selectEl.nativeElement).select2({
                placeholder: "Select customer",
                data: selectData,
                minimumResultsForSearch: 6
            });
        }
    };
    Object.defineProperty(SF0050204Component.prototype, "rowNo", {
        //region Screen bindings
        // row no.
        get: function () {
            if (this.index != undefined) {
                return this.index + 1;
            }
            else {
                return this.customerTable.tableNotes.length + 1;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050204Component.prototype, "isWaitRow", {
        get: function () {
            return (this.index == undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050204Component.prototype, "isPrediction", {
        get: function () {
            return (this.page.pageData.screenMode == SF00502_constants_1.SF00502Constants.SCREEN_MODE_PREDICTION);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050204Component.prototype, "isEditMode", {
        get: function () {
            return this.page.pageData.canEdit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050204Component.prototype, "newAmount1", {
        get: function () {
            return this.newAmount.amount1;
        },
        set: function (value) {
            this.newAmount.amount1 = value;
            // only prediction can update value
            this.rowData.prediction.calculateTotal();
            this.rowData.calculatePredictionDiffRate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050204Component.prototype, "newAmount2", {
        get: function () {
            return this.newAmount.amount2;
        },
        set: function (value) {
            this.newAmount.amount2 = value;
            // only prediction can update value
            this.rowData.prediction.calculateTotal();
            this.rowData.calculatePredictionDiffRate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050204Component.prototype, "newAmount3", {
        get: function () {
            return this.newAmount.amount3;
        },
        set: function (value) {
            this.newAmount.amount3 = value;
            // only prediction can update value
            this.rowData.prediction.calculateTotal();
            this.rowData.calculatePredictionDiffRate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050204Component.prototype, "oldAmount1", {
        get: function () {
            return this.rowData.oldRevenue.amount1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050204Component.prototype, "oldAmount2", {
        get: function () {
            return this.rowData.oldRevenue.amount2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050204Component.prototype, "oldAmount3", {
        get: function () {
            return this.rowData.oldRevenue.amount3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050204Component.prototype, "totalNewAmount", {
        get: function () {
            return this.newAmount.total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050204Component.prototype, "totalOldAmount", {
        get: function () {
            return this.rowData.oldRevenue.total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050204Component.prototype, "isNanDiffRate", {
        get: function () {
            return isNaN(this.rowData.diffRate) || !isFinite(this.rowData.diffRate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050204Component.prototype, "diffRate", {
        get: function () {
            return this.rowData.diffRate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050204Component.prototype, "comment", {
        get: function () {
            return this.rowData.comment;
        },
        set: function (value) {
            this.rowData.comment = value;
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Screen actions
    SF0050204Component.prototype.goCustomerDetail = function () {
        this.page.navigateToCustomerDetail(this.rowData.customerId);
    };
    SF0050204Component.prototype.removeRow = function () {
        this.customerTable.removeRow(this.index);
    };
    SF0050204Component.prototype.addRow = function () {
        var customerId = $(this.selectEl.nativeElement).val();
        if (customerId == "") {
            // warning for select
            $.notify({
                message: message_1.MSG.SF00502.WRN002
            }, {
                type: "warning",
                delay: 1000
            });
        }
        else {
            customerId = +customerId;
            // check if customer selected
            var notedCustomer = false;
            var noteList = this.page.pageData.increaseList.concat(this.page.pageData.decreaseList);
            for (var _i = 0, noteList_2 = noteList; _i < noteList_2.length; _i++) {
                var note = noteList_2[_i];
                if (note.customerId == customerId) {
                    // disable customer
                    notedCustomer = true;
                    break;
                }
            }
            if (notedCustomer) {
                // warning for select duplicate
                $.notify({
                    message: message_1.MSG.SF00502.WRN003
                }, {
                    type: "warning",
                    delay: 1000
                });
            }
            else {
                // add customer note
                this.customerTable.addRow(customerId);
                // reset select
                $(this.selectEl.nativeElement).val("").trigger("change");
            }
        }
    };
    //endregion
    //convertYenToThousanYen
    SF0050204Component.prototype.convertYenToThousanYen = function (value) {
        return SF00502_helper_1.SF00502Helper.convertYenToThousanYen(value);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0050204Component.prototype, "index", void 0);
    __decorate([
        core_1.ViewChild("sf0050204Select"), 
        __metadata('design:type', core_1.ElementRef)
    ], SF0050204Component.prototype, "selectEl", void 0);
    SF0050204Component = __decorate([
        core_1.Component({
            selector: "[sf0050204]",
            templateUrl: "SF0050204.TableRow.component.html"
        }),
        __param(1, core_1.Host()), 
        __metadata('design:paramtypes', [SF00502_page_1.SF00502Page, SF0050203_CustomerTable_component_1.SF0050203Component])
    ], SF0050204Component);
    return SF0050204Component;
}());
exports.SF0050204Component = SF0050204Component;
//# sourceMappingURL=SF0050204.TableRow.component.js.map