import {Component, Input, Output, EventEmitter} from "@angular/core";
import {SF00301_ProductFile} from "../model/SF00301_ProductFile.model";

@Component({
    selector: "div[sf0030108-productFileInfo]",
    templateUrl: "SF0030108.ProductFileInfo.component.html"
})
export class SF0030108Component {
    @Input() index: number;
    @Input() item: SF00301_ProductFile;
    @Input() canRemove: boolean;
    @Input() canViewDetailed: boolean;

    @Output() requestRemoveProductFile: EventEmitter<SF00301_ProductFile> = new EventEmitter<SF00301_ProductFile>();
    @Output() requestViewProductInfo: EventEmitter<SF00301_ProductFile> = new EventEmitter<SF00301_ProductFile>();

    constructor() {
    }

    viewInfo() {
        if (!this.canViewDetailed || !this.canRemove)
            return;
        this.requestViewProductInfo.emit(this.item);
    }

    removeProductFile() {
        this.requestRemoveProductFile.emit(this.item);
    }
}
