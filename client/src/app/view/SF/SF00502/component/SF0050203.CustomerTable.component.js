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
var SF00502_constants_1 = require("../SF00502.constants");
var Note_model_1 = require("../model/Note.model");
var SF00502_page_1 = require("../SF00502.page");
var Revenue_model_1 = require("../model/Revenue.model");
var SF00502_helper_1 = require("../SF00502.helper");
var SF0050203Component = (function () {
    function SF0050203Component(page) {
        this.page = page;
        this._tableNotes = [];
    }
    Object.defineProperty(SF0050203Component.prototype, "tableNotes", {
        get: function () {
            if (this.tableType == SF00502_constants_1.SF00502Constants.TABLE_TYPE_INCREASE) {
                this._tableNotes = this.page.pageData.increaseList;
            }
            else {
                this._tableNotes = this.page.pageData.decreaseList;
            }
            return this._tableNotes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050203Component.prototype, "isPredictionMode", {
        //region Screen bindings
        get: function () {
            return (this.page.pageData.screenMode == SF00502_constants_1.SF00502Constants.SCREEN_MODE_PREDICTION);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050203Component.prototype, "showNoRecords", {
        get: function () {
            // hide if has note
            if (this._tableNotes != undefined && this._tableNotes.length > 0) {
                return false;
            }
            // hide if inPrediction mode and can edit
            if (this.page.pageData.canEdit && this.isPredictionMode) {
                return false;
            }
            // otherwise show
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050203Component.prototype, "displayWaitRow", {
        get: function () {
            // not display in view mode
            if (!this.page.pageData.canEdit) {
                return false;
            }
            // display only in prediction mode
            if (!this.isPredictionMode) {
                return false;
            }
            // display otherwise
            return true;
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Screen Actions
    SF0050203Component.prototype.removeRow = function (index) {
        this.tableNotes.splice(index, 1);
    };
    SF0050203Component.prototype.addRow = function (customerId) {
        var pageData = this.page.pageData;
        var sY = pageData.selectedMonth.getFullYear();
        var sM = pageData.selectedMonth.getMonth() + 1;
        var note = pageData.dataRepo.getCustomerNote(sY, sM, customerId);
        if (note == undefined) {
            // create new note
            note = new Note_model_1.NoteModel();
            // set note customer, year, month
            note.customerId = customerId;
            note.year = sY;
            note.month = sM;
            // set note old Revenue to 0
            note.oldRevenue = new Revenue_model_1.RevenueModel();
            note.oldRevenue.amount1 = 0;
            note.oldRevenue.amount2 = 0;
            note.oldRevenue.amount3 = 0;
            note.oldRevenue.calculateTotal();
            // auto note prediction
            note.autoPrediction();
            note.calculatePredictionDiffRate();
        }
        else {
            // clone note
            note = SF00502_helper_1.SF00502Helper.cloneNote(note);
        }
        // add note to list
        this.tableNotes.push(note);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0050203Component.prototype, "tableType", void 0);
    SF0050203Component = __decorate([
        core_1.Component({
            selector: "[sf0050203]",
            templateUrl: "SF0050203.CustomerTable.component.html"
        }), 
        __metadata('design:paramtypes', [SF00502_page_1.SF00502Page])
    ], SF0050203Component);
    return SF0050203Component;
}());
exports.SF0050203Component = SF0050203Component;
//# sourceMappingURL=SF0050203.CustomerTable.component.js.map