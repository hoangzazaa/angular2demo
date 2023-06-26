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
var SF00301_Modal_modal_1 = require("../model/SF00301_Modal.modal");
var SF0030106Component = (function () {
    function SF0030106Component() {
        this.requestSaveItem = new core_1.EventEmitter();
        this.requestRemoveItem = new core_1.EventEmitter();
        this.requestCancel = new core_1.EventEmitter();
        this.requestDownloadFile = new core_1.EventEmitter();
    }
    SF0030106Component.prototype.saveOrUpdateItem = function () {
        this.requestSaveItem.emit(this.item);
    };
    SF0030106Component.prototype.removeOrDeleteItem = function () {
        this.requestRemoveItem.emit(this.item);
    };
    SF0030106Component.prototype.cancel = function () {
        this.requestCancel.emit();
    };
    SF0030106Component.prototype.downloadFile = function () {
        this.requestDownloadFile.emit(this.item);
    };
    Object.defineProperty(SF0030106Component.prototype, "isProductFile", {
        get: function () {
            return this.item.fileType == 'PRODUCT_FILE';
        },
        enumerable: true,
        configurable: true
    });
    SF0030106Component.prototype.previewFile = function () {
        var fileExt = this.item.originalName.split(".")[1];
        var fileCode = this.item.srcImg.split("/")[2];
        var pdfFilePath = "/CM0010103/" + fileCode + "." + fileExt;
        window.open(pdfFilePath, '_blank');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SF0030106Component.prototype, "readOnly", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF00301_Modal_modal_1.SF00301_FileItem)
    ], SF0030106Component.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SF0030106Component.prototype, "fileUploadInProgress", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030106Component.prototype, "requestSaveItem", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030106Component.prototype, "requestRemoveItem", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030106Component.prototype, "requestCancel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030106Component.prototype, "requestDownloadFile", void 0);
    SF0030106Component = __decorate([
        core_1.Component({
            selector: "div[sf0030106-fileModal]",
            templateUrl: "SF0030106.FileModal.component.html",
            styleUrls: ["SF0030106.FileModal.component.css"]
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030106Component);
    return SF0030106Component;
}());
exports.SF0030106Component = SF0030106Component;
//# sourceMappingURL=SF0030106.FileModal.component.js.map