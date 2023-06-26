import {AfterViewInit, Component, Input} from "@angular/core";
import {Constants} from "../../../../../helper/constants";
import {default as Messages, MSG} from "../../../../../helper/message";
import {File} from "../../../../../model/core/File.model";
import {ProductFile} from "../../../../../model/core/ProductFile.model";
import DataUtil from "../../../../../util/data-util";
import {SF00302Service} from "../../SF00302.service";
import {SF0030205Helper} from "./SF0030205.helper";

declare let $: any;
declare let App: any;
@Component({
    templateUrl: "SF0030205.component.html",
    selector: 'sf0030205',
    styleUrls: ["SF0030205.component.css"]
})
/**
 * Component quotation info
 * @author DungTQ
 * */

export class SF0030205Component implements AfterViewInit {

    @Input()
    helper: SF0030205Helper;

    private $fileDialog: any;
    private dropzone: any;
    private $dropzone: any;
    private fileUploadInProgress: boolean = false;
    private static ACCEPTED_EXTENSIONS = ["JPG", "JPEG", "PNG", "PDF"];

    get isRequestDesign(){
        return this.helper.getSF00302Data().isRequestDesign;
    }

    ngAfterViewInit(): void {
        this.helper.getSF00302Data().productFile = new ProductFile();
        let self = this;
        self.$fileDialog = $("#upload-form");
        self.$dropzone = $("#sf0030205-dropzone");
        this.$dropzone.dropzone({
            url: "/CM0010101",
            uploadMultiple: false,
            parallelUploads: 1,
            dictDefaultMessage: "ファイルをドロップしてください",
            dictFileTooBig: "fileTooBig",
            maxFiles: 1,
            maxFilesize: 10, // up to 10MB
            thumbnailWidth: Constants.THUMBNAIL_WIDTH,
            thumbnailHeight: Constants.THUMBNAIL_HEIGHT,
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
                    let res = JSON.parse(response + '').res;
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

                    } else if (!!res && res.messageCode == "CC00101_ERR002") {
                        swal(Constants.BLANK, Messages.get(MSG.SF00301.ERR003), "error");
                    } else if (!!res && res.messageCode == "CC00101_ERR003") {
                        swal(Constants.BLANK, Messages.get(MSG.COM.ERR001), "error");
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
                        swal(Constants.BLANK, Messages.get(MSG.SF00302.INF016), "error");
                        self.dropzone.removeFile(file);
                        return;
                    }
                    if (!self.accceptedFile(file.name)) {
                        swal(Constants.BLANK, Messages.get(MSG.SF00302.INF015), "error");
                        self.dropzone.removeFile(file);
                        return;
                    }
                });

                self.dropzone = this;
            },
            accept: function (file, done) {
                if (!self.accceptedFile(file.name)) {
                    self.dropzone.removeFile(file);
                    swal(Constants.BLANK, Messages.get(MSG.SF00301.INF015), "error");
                }
                done();
            }
        });
    }

    private accceptedFile(fileName: string): boolean {
        let ext = (fileName + "").split(".").pop().toUpperCase();
        return SF0030205Component.ACCEPTED_EXTENSIONS.find(el => el == ext) != null;
    }

    private removeStagingFile(): void {
        const AND_CANCEL_UPLOADING = true;
        this.dropzone.removeAllFiles(AND_CANCEL_UPLOADING);
        this.helper.getSF00302Data().productFile = new ProductFile();
        this.helper.getSF00302Data().file = new File();
        this.fileUploadInProgress = false;
        this.$dropzone.hide();
        this.$fileDialog.modal('hide');
    }

    resetStagingFileAndCloseFileModal() {
        this.removeStagingFile();
    }

    // reset checkbox primaryFlag product file when primaryFlag = 1
    resetCheckBoxPrimaryFlag(productFile: ProductFile) {
        if (productFile.primaryFlag == 1) {
            this.helper.getSF00302Data().productFiles.forEach(item => {
                if (item.id != productFile.id) {
                    item.primaryFlag = 0;
                }
            })
        }
    }


    constructor(public sf00302Service: SF00302Service) {
    }

    get productFiles(): any {
        return this.helper.getSF00302Data().productFiles;
    }

    set productFiles(value: any) {
        this.helper.getSF00302Data().productFiles = value;
    }

    /*View detail product file*/
    viewDetailProductFile(productFile: ProductFile, i: number) {
        if(!this.isView){
            this.helper.getSF00302Data().productFile = DataUtil.cloneObject(productFile);
            this.helper.getSF00302Data().indexProductFile = i;

            this.showProductFileModal(productFile);
        }
    }

    showProductFileModal(item: ProductFile) {
        // Create the mock file
        let mockFile = {
            name: item.productFileId,
            size: 1024,
            accepted: true,
            kind: 'image'
        };

        // Call the default addedfile event handler
        this.dropzone.emit("addedfile", mockFile);
        this.dropzone.files.push(mockFile);

        let self = this;
        // And optionally show the thumbnail of the file
        this.dropzone.createThumbnailFromUrl(mockFile, item.srcImg, function () {
            // Make sure that there is no progress bar, etc...
            self.dropzone.emit("complete", mockFile);
        });

        this.$fileDialog.modal('show');
        this.$dropzone.show();
    }

    /*Check show button delete product file*/
    get checkShowDelete(): boolean {
        return this.helper.getSF00302Data().productFile.id != null && !this.isView;
    }

    /**
     * Upload deal file
     * */
    uploadProductFile() {
        // check product
        if (this.helper.getSF00302Data().product.id == null) {
            $.notify({message: Messages.get(MSG.SF00302.ERR004)}, {type: 'info'});
            return;
        }

        this.$fileDialog.modal('show');
        this.$dropzone.show();

        $('#checkboxAvt').prop('checked', false);
        this.helper.getSF00302Data().productFile = new ProductFile();
    }

    /*Save or update product file*/
    saveOrUpdateProductFile() {
        let self = this;
        if (self.helper.getSF00302Data().productFile.id != undefined) {
            App.loader("show");
            self.sf00302Service
                .sv0030207UpdateProductFile(self.helper.getSF00302Data().productFile, self.helper.getSF00302Data().file.fileCode)
                .then(res => {
                    self.helper.getSF00302Data().productFiles.splice(self.helper.getSF00302Data().indexProductFile, 1, res.productFile);
                    self.resetCheckBoxPrimaryFlag(res.productFile);
                    self.resetStagingFileAndCloseFileModal();
                    App.loader("hide");
                    $.notify({message: Messages.get(MSG.SF00302.INF010)}, {type: 'success'});
                }).catch(err => {
                App.loader("hide");
                return;
            });
        } else {
            if (!self.helper.getSF00302Data().file.fileCode) {
                swal("Upload File", Messages.get(MSG.SF00302.ERR006), "error");
                return;
            }

            self.helper.getSF00302Data().productFile.productId = self.helper.getSF00302Data().product.id;
            App.loader("show");
            self.sf00302Service
                .sv0030206CreateProductFile(self.helper.getSF00302Data().productFile, self.helper.getSF00302Data().file.fileCode)
                .then(res => {
                    App.loader("hide");
                    self.helper.getSF00302Data().productFiles.push(res.productFile);
                    self.resetCheckBoxPrimaryFlag(res.productFile);
                    self.resetStagingFileAndCloseFileModal();
                    $.notify({message: Messages.get(MSG.SF00302.INF009)}, {type: 'success'});
                }).catch(err => {
                App.loader("hide");
                return;
            });
        }
    }

    /*Delete product file by id*/
    deleteProductFile() {
        let self = this;
        swal({
                title: Constants.BLANK,
                text: Messages.get(MSG.SF00302.INF002),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d26a5c",
                confirmButtonText: Messages.get(MSG.SF00302.INF004),
                closeOnConfirm: true
            },
            function () {
                self.sf00302Service.sv0030208DeleteProductFile(self.helper.getSF00302Data().productFile.id).then(res => {
                    // remove item in list product files
                    self.helper.getSF00302Data().productFiles.splice(self.helper.getSF00302Data().indexProductFile, 1);
                    // closed modal
                    self.resetStagingFileAndCloseFileModal();
                    $.notify({message: Messages.get(MSG.SF00302.INF011)}, {type: 'success'});
                }).catch(err => {
                    self.resetStagingFileAndCloseFileModal();
                    swal("Deleted", Messages.get(MSG.SF00302.ERR005), "error");
                });
            });
    }

    get isView() {
        // check deal template
        return this.helper.getSF00302Data().deal.isTemplate;
    }

    // fileCode
    get fileCode(): string {
        return this.helper.getSF00302Data().productFile.productFileId;
    }

    set fileCode(value: string) {
        this.helper.getSF00302Data().productFile.productFileId = value;
    }

    // fileName
    get fileName(): string {
        return this.helper.getSF00302Data().productFile.productFileName;
    }

    set fileName(value: string) {
        this.helper.getSF00302Data().productFile.productFileName = value;
    }

    // fileMemo
    get fileMemo(): string {
        return this.helper.getSF00302Data().productFile.memo;
    }

    set fileMemo(value: string) {
        this.helper.getSF00302Data().productFile.memo = value;
    }

    // primaryFlag
    get primaryFlag(): any {
        if (this.helper.getSF00302Data().productFile.primaryFlag == undefined) {
            this.helper.getSF00302Data().productFile.primaryFlag = 0;
        }
        return this.helper.getSF00302Data().productFile.primaryFlag;
    }

    set primaryFlag(value: any) {
        if (value == true) {
            this.helper.getSF00302Data().productFile.primaryFlag = 1;
        } else {
            this.helper.getSF00302Data().productFile.primaryFlag = 0;
        }
    }

    downloadFile() {
        this.sf00302Service.downloadFile(this.helper.getSF00302Data().productFile)
            .then(result => {
                let link = document.createElement('a');
                link.setAttribute('download', result.fileName);
                link.href = result.filePath;
                link.click();
            }).catch(err => {console.log(err)});
    }

}
