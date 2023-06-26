import {Component, Input} from "@angular/core";
import {SF00502Constants} from "../SF00502.constants";
import {NoteModel} from "../model/Note.model";
import {SF00502Page} from "../SF00502.page";
import {RevenueModel} from "../model/Revenue.model";
import {SF00502Helper} from "../SF00502.helper";

@Component({
    selector: "[sf0050203]",
    templateUrl: "SF0050203.CustomerTable.component.html"
})
export class SF0050203Component {

    // table type
    @Input() tableType: number;
    // table data
    _tableNotes: Array<NoteModel>;

    constructor(private page: SF00502Page) {
        this._tableNotes = [];
    }

    get tableNotes(): Array<NoteModel> {
        if (this.tableType == SF00502Constants.TABLE_TYPE_INCREASE) {
            this._tableNotes = this.page.pageData.increaseList;
        } else {
            this._tableNotes = this.page.pageData.decreaseList;
        }
        return this._tableNotes;
    }

    //region Screen bindings
    get isPredictionMode(): boolean {
        return (this.page.pageData.screenMode == SF00502Constants.SCREEN_MODE_PREDICTION);
    }

    get showNoRecords(): boolean {
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
    }

    get displayWaitRow(): boolean {
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
    }

    //endregion

    //region Screen Actions
    removeRow(index: number) {
        this.tableNotes.splice(index, 1);
    }

    addRow(customerId: number) {
        let pageData = this.page.pageData;
        let sY = pageData.selectedMonth.getFullYear();
        let sM = pageData.selectedMonth.getMonth() + 1;
        let note = pageData.dataRepo.getCustomerNote(sY, sM, customerId);
        if (note == undefined) {
            // create new note
            note = new NoteModel();
            // set note customer, year, month
            note.customerId = customerId;
            note.year = sY;
            note.month = sM;
            // set note old Revenue to 0
            note.oldRevenue = new RevenueModel();
            note.oldRevenue.amount1 = 0;
            note.oldRevenue.amount2 = 0;
            note.oldRevenue.amount3 = 0;
            note.oldRevenue.calculateTotal();
            // auto note prediction
            note.autoPrediction();
            note.calculatePredictionDiffRate();
        } else {
            // clone note
            note = SF00502Helper.cloneNote(note);
        }
        // add note to list
        this.tableNotes.push(note);
    }

    //endregion
}