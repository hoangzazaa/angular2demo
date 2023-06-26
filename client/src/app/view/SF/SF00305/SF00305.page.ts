import {AfterViewInit, Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HeaderProvider} from "../SF00100/Header.provider";
import {SF00305Service} from "./SF00305.service";
import {SF00305Data} from "./SF00305.data";
import {CommonPage} from "../COMMON/common.page";
import {Constants} from "../../../helper/constants";
import {default as Messages, MSG} from "../../../helper/message";
import ValidatorUtil from "../../../util/validator-util";

declare let App: any;
const SF00305_PAGE_TITLE: string = "見積書をメールで送る";
const MAX_NUMBER_FILE = 6;
const FILE_SIZE = 6;

@Component({
    templateUrl: "./SF00305.page.html",
    styleUrls: ["SF00305.page.css"]
})
/**
 * author: hoangtd
 */
export class SF00305Page extends CommonPage implements AfterViewInit, OnInit {

    ngOnInit(): void {
        this.sv00305Service.navigateTo("メール送信", this.router.url);
        this.pageData.quotationCode = this.route.snapshot.params["quotationCode"];
        this.pageData.dealCode = this.route.snapshot.params["dealCode"];
    }

    ngAfterViewInit(): void {
        let self = this;
        this.pageData.subject = "お見積送付のお知らせ（株式会社サガシキ）";
        $("#contentMail").rules("add", {
            required: true,
            maxlength: 480,
            messages: {
                required: "Please enter content mail",
                maxlength: "Max length: 480"
            }
        });

        $("#subject").rules("add", {
            required: true,
            maxlength: 50,
            messages: {
                required: "Please enter subject",
                maxlength: "Max length: 50"
            }
        });

        let dropZone = new Dropzone(".dropzone", {
            url: "/CM0010101",
            addRemoveLinks: true,
            uploadMultiple: false,
            parallelUploads: 1,
            maxFilesize: FILE_SIZE,
            thumbnailWidth: 100,
            thumbnailHeight: 200,
            acceptedFiles: ".png,.pdf,.jpg,.gif,.zip",
            error: function (err) {
                let ref = err.previewElement;
                if (ref != null) {
                    ref.parentNode.removeChild(err.previewElement);
                }
                $.notify({message: Messages.get(MSG.SF00305.ERR003)}, {type: 'danger'});
            },
            success: function (file, response) {
                let ref = file.previewElement;
                let size = self.pageData.totalSize + file.size;
                let maxSize = 5 * 1024 * 1024;
                if (size > maxSize) {
                    let ref = file.previewElement;
                    if (ref != null) {
                        ref.parentNode.removeChild(file.previewElement);
                    }
                    $.notify({message: Messages.get(MSG.SF00305.ERR004)}, {type: 'danger'});
                } else {
                    let res = JSON.parse(response + '').res;
                    if (!!res && res.messageCode != "CC00101_ERR002" && self.pageData.attachFiles.length < MAX_NUMBER_FILE) {
                        self.pageData.totalSize = size;
                        self.pageData.mimeTypes.push(file.type);
                        // parse data to jsonFileName
                        self.pageData.attachFiles.push(res.data.fileName);
                        // store original file name
                        let index = self.pageData.originalName.indexOf(file.name);
                        if (index === -1) {
                            self.pageData.originalName.push(file.name);
                        }
                        // check upload file
                        self.pageData.checkCreateUpload = true;

                        if (!!res.data.thumbnail) {
                            dropZone.emit('thumbnail', file, "/CM0010102/" + res.data.thumbnail);
                        }

                    } else if(!!res && res.messageCode == "CC00101_ERR002") {
                        ref.parentNode.removeChild(file.previewElement);
                        $.notify({message: Messages.get(MSG.SF00301.ERR003)}, {type: 'danger'});
                    } else if (!!res) {
                        ref.parentNode.removeChild(file.previewElement);
                        $.notify({message: Messages.get(MSG.SF00305.ERR006)}, {type: 'danger'});
                    }
                }
            },
            removedfile: function (file) {
                // self.removeQuotationFile(file.name);
                let ref = file.previewElement;
                if (ref != null) {
                    ref.parentNode.removeChild(file.previewElement);
                    self.pageData.totalSize = self.pageData.totalSize - file.size;
                }
                let index = self.pageData.originalName.indexOf(file.name);
                if (index !== -1) {
                    self.pageData.originalName.splice(index, 1);
                    self.pageData.attachFiles.splice(index + 1, 1);
                    self.pageData.mimeTypes.splice(index + 1, 1);
                }
            }
        });
        let quotationFile = {
            name: "見積書" + this.pageData.quotationCode + ".pdf",
            status: Dropzone.SUCCESS,
            accepted: true,
            size: '0',
            type: "pdf"
        };
        this.pageData.quotationImage =
            "/CM0010105/" + this.pageData.timestamp + "/"
            + "見積書" + this.pageData.quotationCode + ".png/QUOTATION";
        this.pageData.attachFiles
            .push("見積書" + this.pageData.quotationCode);
        dropZone.addFile.call(dropZone, quotationFile);
        dropZone.emit("thumbnail", quotationFile, this.pageData.attachFileUri);
        $(".dz-remove").eq(0).addClass("hidden");
        $(".dz-size").eq(0).addClass("hidden");
        dropZone.on("addedfile", function (file) {
            if (this.files.length) {
                let _i, _len;
                for (_i = 0, _len = this.files.length; _i < _len - 1; _i++) // -1 to exclude current file
                {
                    if (this.files[_i].name ===
                        file.name && this.files[_i].size === file.size && this.files[_i].lastModifiedDate.toString() === file.lastModifiedDate.toString()) {
                        this.removeFile(file);
                    }
                }
            }
        });
    }

    /**
     * Constructor call super common page
     *
     * @param sv00305Service
     * @param route
     * @param headerProvider
     * @param router
     */
    constructor(public sv00305Service: SF00305Service, route: ActivatedRoute, headerProvider: HeaderProvider, router: Router) {
        super(router, route, headerProvider);
    }

    protected initBreadcrumb(): void {
        let self = this;

        let sf0301Path = "/home/deal/" + self.route.snapshot.params["dealCode"]; //SF003-01
        let sf0303Path = sf0301Path + "/quotation/" + self.route.snapshot.params["quotationCode"]; //SF003-03
        let sf0304Path = sf0301Path + "/exportQuotation/" + self.route.snapshot.params["quotationCode"] + "/1"; //SF003-04

        self.headerProvider.reset();
        self.headerProvider.pageName = SF00305_PAGE_TITLE;
        self.headerProvider.addBreadCrumb(Constants.TOP, [Constants.SLASH]);
        self.headerProvider.addBreadCrumb(Constants.DEAL_OVERVIEW_BREADCRUMB, [sf0301Path]);
        self.headerProvider.addBreadCrumb("見積情報", [sf0303Path]);
        self.headerProvider.addBreadCrumb("見積書出力", [sf0304Path]);
        self.headerProvider.addBreadCrumb("メール送信");
    }

    get pageData(): SF00305Data {
        return this.sv00305Service.pageData;
    }

    get addressCc(): string[] {
        return this.pageData.cc;
    }

    _setAddressTo(value: string[]) {
        this.pageData.recipients = [];
        this.pageData.recipients = value.filter(item => {
            return item != undefined;
        });
    }

    _setAddressCc(value: string[]) {
        this.pageData.cc = [];
        this.pageData.cc = value.filter(item => {
            return item != undefined;
        });
    }

    get addressTo(): string[] {
        return this.pageData.recipients;
    }

    get subject(): string {
        return this.pageData.subject;
    }

    set subject(value: string) {
        this.pageData.subject = value;
    }

    /**
     * Send mail to customer call api server
     */
    sendQuotationMail() {
        let self = this;
        // check size
        if (this.pageData.totalSize > this.pageData.TOTAL_SIZE_DEFAULT) {
            $.notify({message: Messages.get(MSG.SF00305.ERR001)}, {type: 'danger'});
            return;
        }
        // check mail recipients
        if (this.pageData.recipients.length == 0) {
            $.notify({message: Messages.get(MSG.SF00305.ERR002)}, {type: 'danger'});
            return;
        }
        // check email validate
        if (!this.checkItemEmailValidate(this.pageData.recipients)) {
            $.notify({message: Messages.get(MSG.SF00305.ERR005)}, {type: 'danger'});
            return;
        }

        if (!this.checkItemEmailValidate(this.pageData.cc)) {
            $.notify({message: Messages.get(MSG.SF00305.ERR005)}, {type: 'danger'});
            return;
        }

        if ($("#validateForm").valid() && this.pageData.totalSize <= this.pageData.TOTAL_SIZE_DEFAULT) {
            App.loader('show');
            self.sv00305Service
                .sendMail(this.pageData)
                .then(() => {
                    App.loader('hide');
                    swal({
                        title: "メールは正常に送信されました。",
                        confirmButtonColor: "#d26a5c",
                        confirmButtonText: "案件情報TOPへ",
                    }, function () {
                        self.router.navigate(['/home/deal', self.route.snapshot.params["dealCode"]]);
                    });
                })
                .catch(err => {
                    App.loader('hide');
                    if ("SF00305_ERR005" === err.code) {
                        swal({
                            title: "Email Invalid",
                            text: Messages.get(MSG.SF00305.ERR005),
                        });
                    } else {
                        swal({
                            title: "Send error",
                            text: "Something wrong! Please Try Again",
                        });
                    }
            })
        }

    }

    /**
     * Remove quotationFile by fileName
     *
     * @param fileName
     */
    removeQuotationFile(fileName: string) {
        this.pageData.attachFiles.splice(this.pageData.attachFiles.indexOf(fileName));
    }

    /**
     * Back to SF00304
     */
    backToPrevious() {
        this.router.navigate(['/home/deal/', this.pageData.dealCode, "exportQuotation", this.pageData.quotationCode, 1]);
    }

    get quotationImage(): string {
        return this.pageData.quotationImage;
    }

    get contentMail(): string {
        return this.pageData.mailContent;
    }

    set contentMail(value: string) {
        this.pageData.mailContent = value;
    }

    checkItemEmailValidate(emails: string[]): boolean {
        let checkEmailValidate = true;
        if (emails) {
            emails.forEach(item => {
                if (ValidatorUtil.isValidEmail(item) == false) {
                    checkEmailValidate = false;
                }
            })
        }

        return checkEmailValidate;
    }
}
