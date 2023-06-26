import {AfterViewInit, Component, EventEmitter, Output} from "@angular/core";
import ValidatorUtil from "../../../../util/validator-util";
import {Constants} from "../../../../helper/constants";
import Messages, {MSG} from "../../../../helper/message";
import {SF00309Service} from "../SF00309.service";
import {SF00309Data} from "../SF00309.data";
import {SF00309Helper} from "../SF00309.helper";
import {FormatUtil} from "../../../../util/format-util";
import {ProductModel} from "../../COMMON/model/Product.model";
import {PRODUCT_INFO_MAIL_TEMPLATE} from "../SF00309.MstData";
import {ProductBoxModel} from "../../COMMON/productinfo/model/ProductBox.model";

declare let $: JQueryStatic | any;

@Component({
    selector   : "[sf0030902]",
    templateUrl: "SF0030902.MailModal.component.html",
    styleUrls: ['SF0030902.MailModal.component.css']
})

export class SF00300902MailModalComponent implements AfterViewInit {
    @Output() applyMail: EventEmitter<void> = new EventEmitter<void>();


    constructor(public sf00309Service: SF00309Service) {
    }

    private uploadProcessing: Boolean = false;
    private currentFileData: Object = {};

    ngAfterViewInit(): void {
        // disabled input tags
        $('.tagsinput input').attr("readonly", true);
    }

    get sf00309Data(): SF00309Data {
        return this.sf00309Service.pageData;
    }

    get to(): string[] {
        return this.sf00309Data.mailRequest.addressTo;
    }

    set to(addresses: string[]) {
        this.sf00309Data.mailRequest.addressTo = (addresses || []).filter(item => !!item);
    }

    get cc(): string[] {
        return this.sf00309Data.mailRequest.addressCc;
    }

    set cc(addresses: string[]) {
        this.sf00309Data.mailRequest.addressCc = (addresses || []).filter(item => !!item);
    }

    get subject() {
        return this.sf00309Data.mailRequest.subject;
    }

    set subject(val: string) {
        this.sf00309Data.mailRequest.subject = val;
    }

    get content() {
        return this.sf00309Data.mailRequest.content;
    }
    set content(val: string) {
        this.sf00309Data.mailRequest.content = val;
    }

    private valid(): boolean {
        if (ValidatorUtil.isEmpty(this.sf00309Data.mailRequest.addressTo)) {
            swal(Constants.BLANK, Messages.get(MSG.SF00309.ERR004), "error");
            return false;
        }

        if (ValidatorUtil.isEmpty(this.sf00309Data.mailRequest.subject)) {
            swal(Constants.BLANK, Messages.get(MSG.SF00309.ERR003), "error");
            return false;
        }

        if (ValidatorUtil.isEmpty(this.sf00309Data.mailRequest.content)) {
            swal(Constants.BLANK, Messages.get(MSG.SF00309.ERR005), "error");
            return false;
        }

        return true;
    }

    send() {
        if (this.valid() && !this.uploadProcessing) {
            this.applyMail.emit();
        }
    }

    searchUserPicTO() {
        this.closeRequest();
        this.sf00309Data.typeAddress = "TO";
        this.showPic();
    }

    searchUserPicCC() {
        this.closeRequest();
        this.sf00309Data.typeAddress = "CC";
        this.showPic();
    }

    closeRequest() {
        $("#sendRequestModal").modal('hide');
    }

    showRequest() {
        $("#sendRequestModal").modal('show');
    }

    private static ACCEPTED_EXTENSIONS = ["JPG", "JPEG", "PNG", "PDF"];
    private static MAX_ATTACH_MENT_SIZE = 5 * 1024 * 1024 //5MB;
    fileChange(event) {
        let fileList: FileList = event.target.files;
        if ( fileList.length > 0 ) {
            let file: File = fileList[0];
            
            let ext = (file.name + "").split(".").pop().toUpperCase();
            if ( SF00300902MailModalComponent.ACCEPTED_EXTENSIONS.find(el => el == ext) == null ) {
                event.target.value = '';
                return this.handleFileUploadError("ファイル形式を確認してください。画像ファイルはJPG、PNG形式のみ対応しています。");
            }

            // check file size
            var current_size = 0;
            this.sf00309Data.mailRequest.attachmentFiles.forEach((f:File) => {
                current_size += f.size;
            });

            if (current_size + file.size > SF00300902MailModalComponent.MAX_ATTACH_MENT_SIZE ) {
                event.target.value = '';
                return this.handleFileUploadError(`貼付可能なファイルサイズは合計${this.bytesToMegabyte(SF00300902MailModalComponent.MAX_ATTACH_MENT_SIZE)}です。`);
            }

            this.uploadProcessing = true;
            this.currentFileData = {
                name: file.name,
                size: file.size,
                tmpName: ""
            };

            this.sf00309Service.saveTemporaryFile(file).then(fileName=> {
                this.uploadProcessing = false;
                this.currentFileData['tmpName'] = fileName;
                this.sf00309Data.mailRequest.attachmentFiles.push(Object.assign({},this.currentFileData));
            }).catch(()=>{
                this.uploadProcessing = false;
                event.target.value = '';
                this.handleFileUploadError("ファイルのアップロードに失敗しました");
            });
        }
    }
    private handleFileUploadError(message) {
        swal(Constants.BLANK, message, "error");
    }

    removeFile($event, tmpName) {
        $event.preventDefault();
        this.sf00309Data.mailRequest.attachmentFiles = this.sf00309Data.mailRequest.attachmentFiles.filter((o)=>{
            return (o['tmpName'] != tmpName);
        })
    }

    bytesToMegabyte(bytes) {
        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        let i = Math.floor(Math.log(bytes) / Math.log(1024));
        let n = bytes / Math.pow(1024, i);
        return Math.round(n * 100) / 100 + ' ' + sizes[i];
    }

    showPic() {
        // reset list user pic
        this.sf00309Data.userPicModals        = [];
        // set default department
        this.sf00309Data.listDepartmentScreen = SF00309Helper.cloneDepartmentModel(this.sf00309Data.departments);
        this.sf00309Data.listDepartmentScreen.forEach(data => {
            data["active"] = false;
        });
        this.sf00309Data.listPicScreen                     = this.sf00309Data.listDepartmentScreen[0].users;
        this.sf00309Data.listPicScreen.forEach(item => {
            item["active"] = false;
        });
        this.sf00309Data.listDepartmentScreen[0]['active'] = true;
        // show modal search pic
        $("#searchModal").modal('show');
        $('.tagsinput input').removeAttr("readonly");
        setTimeout(function () {
            //scoll userPic
            $('#table-body-userPic').scrollTop(0);
            $('#table-body-department').scrollTop(0);
        },300);
    }

}
