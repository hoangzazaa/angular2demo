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
var constants_1 = require("../../../../../helper/constants");
var message_1 = require("../../../../../helper/message");
var File_model_1 = require("../../../../../model/core/File.model");
var ProductFile_model_1 = require("../../../../../model/core/ProductFile.model");
var data_util_1 = require("../../../../../util/data-util");
var SF00302_service_1 = require("../../SF00302.service");
var SF0030205Component = (function () {
    function SF0030205Component(sf00302Service) {
        this.sf00302Service = sf00302Service;
        this.fileUploadInProgress = false;
    }
    Object.defineProperty(SF0030205Component.prototype, "isRequestDesign", {
        get: function () {
            return this.helper.getSF00302Data().isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    SF0030205Component.prototype.ngAfterViewInit = function () {
        this.helper.getSF00302Data().productFile = new ProductFile_model_1.ProductFile();
        var self = this;
        self.$fileDialog = $("#upload-form");
        self.$dropzone = $("#sf0030205-dropzone");
        this.$dropzone.dropzone({
            url: "/CM0010101",
            uploadMultiple: false,
            parallelUploads: 1,
            dictDefaultMessage: "ファイルをドロップしてください",
            dictFileTooBig: "fileTooBig",
            maxFiles: 1,
            maxFilesize: 10,
            thumbnailWidth: constants_1.Constants.THUMBNAIL_WIDTH,
            thumbnailHeight: constants_1.Constants.THUMBNAIL_HEIGHT,
            init: function () {
                this.on("addedfile", function (file) {
                    if (this.getQueuedFiles().length > 0 || this.getUploadingFiles().length > 0) {
                        self.dropzone.removeAllFiles(true); // ... and cancel uploading files
                        self.dropzone.addFile(file);
                    }
                });
                this.on("uploadprogress", function () {
                    self.fileUploadInProgress = true;
                });
                this.on("success", function (file, response) {
                    var res = JSON.parse(response + '').res;
                    if (!!res && res.messageCode != "CC00101_ERR002"
                        && !!res.data && !!res.data.fileName && self.$fileDialog.hasClass('in')) {
                        self.helper.getSF00302Data().productFile.productFileId = file.name;
                        self.helper.getSF00302Data().productFile.originalName = file.name;
                        if (!!res.data.thumbnail) {
                            self.helper.getSF00302Data().productFile.srcImg = res.data.thumbnail;
                            self.dropzone.emit('thumbnail', file, "/CM0010102/" + res.data.thumbnail);
                        }
                        // Bug 1869
                        /*self.helper.getSF00302Data().productFile.productFileName = "";
                         self.helper.getSF00302Data().productFile.memo = "";*/
                        // parse data to jsonFileName
                        self.helper.getSF00302Data().file.fileCode = res.data.fileName;
                    }
                    else if (!!res && res.messageCode == "CC00101_ERR002") {
                        swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00301.ERR003), "error");
                    }
                    else if (!!res && res.messageCode == "CC00101_ERR003") {
                        swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.COM.ERR001), "error");
                    }
                });
                this.on("complete", function () {
                    self.fileUploadInProgress = false;
                });
                this.on("canceled", function () {
                    self.fileUploadInProgress = false;
                });
                this.on("maxfilesexceeded", function (file) {
                    // check file accept file then update file
                    if (self.accceptedFile(file.name)) {
                        self.dropzone.removeAllFiles(file); // ... and cancel uploading files
                        self.dropzone.addFile(file);
                    }
                });
                this.on("error", function (file, errorMessage) {
                    if (errorMessage === "fileTooBig") {
                        swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00302.INF016), "error");
                        self.dropzone.removeFile(file);
                        return;
                    }
                    if (!self.accceptedFile(file.name)) {
                        swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00302.INF015), "error");
                        self.dropzone.removeFile(file);
                        return;
                    }
                });
                self.dropzone = this;
            },
            accept: function (file, done) {
                if (!self.accceptedFile(file.name)) {
                    self.dropzone.removeFile(file);
                    swal(constants_1.Constants.BLANK, message_1.default.get(message_1.MSG.SF00301.INF015), "error");
                }
                done();
            }
        });
    };
    SF0030205Component.prototype.accceptedFile = function (fileName) {
        var ext = (fileName + "").split(".").pop().toUpperCase();
        return SF0030205Component.ACCEPTED_EXTENSIONS.find(function (el) { return el == ext; }) != null;
    };
    SF0030205Component.prototype.removeStagingFile = function () {
        var AND_CANCEL_UPLOADING = true;
        this.dropzone.removeAllFiles(AND_CANCEL_UPLOADING);
        this.helper.getSF00302Data().productFile = new ProductFile_model_1.ProductFile();
        this.helper.getSF00302Data().file = new File_model_1.File();
        this.fileUploadInProgress = false;
        this.$dropzone.hide();
        this.$fileDialog.modal('hide');
    };
    SF0030205Component.prototype.resetStagingFileAndCloseFileModal = function () {
        this.removeStagingFile();
    };
    // reset checkbox primaryFlag product file when primaryFlag = 1
    SF0030205Component.prototype.resetCheckBoxPrimaryFlag = function (productFile) {
        if (productFile.primaryFlag == 1) {
            this.helper.getSF00302Data().productFiles.forEach(function (item) {
                if (item.id != productFile.id) {
                    item.primaryFlag = 0;
                }
            });
        }
    };
    Object.defineProperty(SF0030205Component.prototype, "productFiles", {
        get: function () {
            return this.helper.getSF00302Data().productFiles;
        },
        set: function (value) {
            this.helper.getSF00302Data().productFiles = value;
        },
        enumerable: true,
        configurable: true
    });
    /*View detail product file*/
    SF0030205Component.prototype.viewDetailProductFile = function (productFile, i) {
        if (!this.isView) {
            this.helper.getSF00302Data().productFile = data_util_1.default.cloneObject(productFile);
            this.helper.getSF00302Data().indexProductFile = i;
            this.showProductFileModal(productFile);
        }
    };
    SF0030205Component.prototype.showProductFileModal = function (item) {
        // Create the mock file
        var mockFile = {
            name: item.productFileId,
            size: 1024,
            accepted: true,
            kind: 'image'
        };
        // Call the default addedfile event handler
        this.dropzone.emit("addedfile", mockFile);
        this.dropzone.files.push(mockFile);
        var self = this;
        // And optionally show the thumbnail of the file
        this.dropzone.createThumbnailFromUrl(mockFile, item.srcImg, function () {
            // Make sure that there is no progress bar, etc...
            self.dropzone.emit("complete", mockFile);
        });
        this.$fileDialog.modal('show');
        this.$dropzone.show();
    };
    Object.defineProperty(SF0030205Component.prototype, "checkShowDelete", {
        /*Check show button delete product file*/
        get: function () {
            return this.helper.getSF00302Data().productFile.id != null && !this.isView;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Upload deal file
     * */
    SF0030205Component.prototype.uploadProductFile = function () {
        // check product
        if (this.helper.getSF00302Data().product.id == null) {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00302.ERR004) }, { type: 'info' });
            return;
        }
        this.$fileDialog.modal('show');
        this.$dropzone.show();
        $('#checkboxAvt').prop('checked', false);
        this.helper.getSF00302Data().productFile = new ProductFile_model_1.ProductFile();
    };
    /*Save or update product file*/
    SF0030205Component.prototype.saveOrUpdateProductFile = function () {
        var self = this;
        if (self.helper.getSF00302Data().productFile.id != undefined) {
            App.loader("show");
            self.sf00302Service
                .sv0030207UpdateProductFile(self.helper.getSF00302Data().productFile, self.helper.getSF00302Data().file.fileCode)
                .then(function (res) {
                self.helper.getSF00302Data().productFiles.splice(self.helper.getSF00302Data().indexProductFile, 1, res.productFile);
                self.resetCheckBoxPrimaryFlag(res.productFile);
                self.resetStagingFileAndCloseFileModal();
                App.loader("hide");
                $.notify({ message: message_1.default.get(message_1.MSG.SF00302.INF010) }, { type: 'success' });
            }).catch(function (err) {
                App.loader("hide");
                return;
            });
        }
        else {
            if (!self.helper.getSF00302Data().file.fileCode) {
                swal("Upload File", message_1.default.get(message_1.MSG.SF00302.ERR006), "error");
                return;
            }
            self.helper.getSF00302Data().productFile.productId = self.helper.getSF00302Data().product.id;
            App.loader("show");
            self.sf00302Service
                .sv0030206CreateProductFile(self.helper.getSF00302Data().productFile, self.helper.getSF00302Data().file.fileCode)
                .then(function (res) {
                App.loader("hide");
                self.helper.getSF00302Data().productFiles.push(res.productFile);
                self.resetCheckBoxPrimaryFlag(res.productFile);
                self.resetStagingFileAndCloseFileModal();
                $.notify({ message: message_1.default.get(message_1.MSG.SF00302.INF009) }, { type: 'success' });
            }).catch(function (err) {
                App.loader("hide");
                return;
            });
        }
    };
    /*Delete product file by id*/
    SF0030205Component.prototype.deleteProductFile = function () {
        var self = this;
        swal({
            title: constants_1.Constants.BLANK,
            text: message_1.default.get(message_1.MSG.SF00302.INF002),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d26a5c",
            confirmButtonText: message_1.default.get(message_1.MSG.SF00302.INF004),
            closeOnConfirm: true
        }, function () {
            self.sf00302Service.sv0030208DeleteProductFile(self.helper.getSF00302Data().productFile.id).then(function (res) {
                // remove item in list product files
                self.helper.getSF00302Data().productFiles.splice(self.helper.getSF00302Data().indexProductFile, 1);
                // closed modal
                self.resetStagingFileAndCloseFileModal();
                $.notify({ message: message_1.default.get(message_1.MSG.SF00302.INF011) }, { type: 'success' });
            }).catch(function (err) {
                self.resetStagingFileAndCloseFileModal();
                swal("Deleted", message_1.default.get(message_1.MSG.SF00302.ERR005), "error");
            });
        });
    };
    Object.defineProperty(SF0030205Component.prototype, "isView", {
        get: function () {
            // check deal template
            return this.helper.getSF00302Data().deal.isTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030205Component.prototype, "fileCode", {
        // fileCode
        get: function () {
            return this.helper.getSF00302Data().productFile.productFileId;
        },
        set: function (value) {
            this.helper.getSF00302Data().productFile.productFileId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030205Component.prototype, "fileName", {
        // fileName
        get: function () {
            return this.helper.getSF00302Data().productFile.productFileName;
        },
        set: function (value) {
            this.helper.getSF00302Data().productFile.productFileName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030205Component.prototype, "fileMemo", {
        // fileMemo
        get: function () {
            return this.helper.getSF00302Data().productFile.memo;
        },
        set: function (value) {
            this.helper.getSF00302Data().productFile.memo = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030205Component.prototype, "primaryFlag", {
        // primaryFlag
        get: function () {
            if (this.helper.getSF00302Data().productFile.primaryFlag == undefined) {
                this.helper.getSF00302Data().productFile.primaryFlag = 0;
            }
            return this.helper.getSF00302Data().productFile.primaryFlag;
        },
        set: function (value) {
            if (value == true) {
                this.helper.getSF00302Data().productFile.primaryFlag = 1;
            }
            else {
                this.helper.getSF00302Data().productFile.primaryFlag = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    SF0030205Component.prototype.downloadFile = function () {
        this.sf00302Service.downloadFile(this.helper.getSF00302Data().productFile)
            .then(function (result) {
            var link = document.createElement('a');
            link.setAttribute('download', result.filePath.split("/")[2]);
            link.href = result.filePath;
            link.click();
        }).catch(function (err) { console.log(err); });
    };
    SF0030205Component.prototype.previewFile = function () {
        this.sf00302Service.downloadFile(this.helper.getSF00302Data().productFile)
            .then(function (result) {
            var fileCode = result.filePath.split("/")[2];
            var fileExt = result.fileName.split(".")[1];
            var pdfFilePath = "/CM0010103/" + fileCode + "." + fileExt;
            window.open(pdfFilePath, '_blank');
        }).catch(function (err) { console.log(err); });
    };
    SF0030205Component.ACCEPTED_EXTENSIONS = ["JPG", "JPEG", "PNG", "PDF"];
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030205Component.prototype, "helper", void 0);
    SF0030205Component = __decorate([
        core_1.Component({
            templateUrl: "SF0030205.component.html",
            selector: 'sf0030205',
            styleUrls: ["SF0030205.component.css"]
        }), 
        __metadata('design:paramtypes', [SF00302_service_1.SF00302Service])
    ], SF0030205Component);
    return SF0030205Component;
}());
exports.SF0030205Component = SF0030205Component;
//# sourceMappingURL=SF0030205.component.js.map