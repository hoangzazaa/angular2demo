import {Component, EventEmitter, Output, Input} from "@angular/core";
import {CheckSheetData} from "./CheckSheet.data";
import {CheckSheetModel} from "./model/CheckSheet.model";

@Component({
    selector: "deal-checkSheet",
    templateUrl: "CheckSheet.page.html",
    styleUrls: ['CheckSheet.page.css']
})
export class CheckSheetPage {

    @Input() set canEdit(value: boolean) {
        this.pageData.canEdit = value || false;
    }

    @Input() set checkSheets(value: CheckSheetModel[]) {
        if (value) {
            this.pageData.checkSheets = value;
        }
    }

    @Output() emitRedirectSF00308: EventEmitter<any> = new EventEmitter();

    pageData: CheckSheetData;

    constructor() {
        this.pageData = new CheckSheetData();
        this.pageData.checkSheets = [];
    }

    viewCheckSheet() {
        this.emitRedirectSF00308.emit();
    }

}
