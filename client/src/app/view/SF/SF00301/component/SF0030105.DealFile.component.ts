import {Component, Input, Output, EventEmitter} from "@angular/core";
import {SF00301_DealFile} from "../model/SF00301_DealFile.model";

@Component({
    selector: "div[sf0030105-dealFile]",
    templateUrl: "SF0030105.DealFile.component.html"
})
export class SF0030105Component {
    @Input() index: number;
    @Input() item: SF00301_DealFile;
    @Input() canRemove: boolean;
    @Input() canViewDetailed: boolean;

    @Output() requestRemoveDealFile: EventEmitter<SF00301_DealFile> = new EventEmitter<SF00301_DealFile>();
    @Output() requestViewDealFileInfo: EventEmitter<SF00301_DealFile> = new EventEmitter<SF00301_DealFile>();

    constructor() {
    }

    removeDealFile() {
        this.requestRemoveDealFile.emit(this.item);
    }

    viewDetailDealFile() {
        if (!this.canViewDetailed ||! this.canRemove)
            return;
        this.requestViewDealFileInfo.emit(this.item);
    }
}
