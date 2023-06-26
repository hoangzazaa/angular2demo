import {Component, Output, EventEmitter, Input} from "@angular/core";
import {SF00301_FileItem} from "../model/SF00301_Modal.modal";

@Component({
    selector: "div[sf0030106-fileModal]",
    templateUrl: "SF0030106.FileModal.component.html",
    styleUrls: ["SF0030106.FileModal.component.css"]
})
export class SF0030106Component {

    @Input() readOnly: boolean;
    @Input() item: SF00301_FileItem;
    @Input() fileUploadInProgress: boolean;

    @Output() requestSaveItem: EventEmitter<SF00301_FileItem> = new EventEmitter<SF00301_FileItem>();
    @Output() requestRemoveItem: EventEmitter<SF00301_FileItem> = new EventEmitter<SF00301_FileItem>();
    @Output() requestCancel: EventEmitter<void> = new EventEmitter<void>();
    @Output() requestDownloadFile: EventEmitter<SF00301_FileItem> = new EventEmitter<SF00301_FileItem>();

    saveOrUpdateItem() {
        this.requestSaveItem.emit(this.item);
    }

    removeOrDeleteItem() {
        this.requestRemoveItem.emit(this.item);
    }

    cancel() {
        this.requestCancel.emit();
    }

    downloadFile() {
        this.requestDownloadFile.emit(this.item);
    }

    get isProductFile(): boolean{
        return this.item.fileType == 'PRODUCT_FILE';
    }

}
