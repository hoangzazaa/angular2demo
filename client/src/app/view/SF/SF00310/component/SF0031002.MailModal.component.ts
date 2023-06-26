import {AfterViewInit, Component, EventEmitter, Output} from "@angular/core";
import ValidatorUtil from "../../../../util/validator-util";
import Messages, {MSG} from "../../../../helper/message";
import {Constants} from "../../../../helper/constants";
import {SF00310Service} from "../SF00310.service";
import {SF00310Data} from "../SF00310.data";
import {SF00310Helper} from "../SF00310.helper";

declare let $: JQueryStatic | any;

@Component({
    selector   : "[sf0031002]",
    templateUrl: "SF0031002.MailModal.component.html"
})

export class SF00301002MailModalComponent implements AfterViewInit {
    @Output() applyMail: EventEmitter<void> = new EventEmitter<void>();

    constructor(public sf00310Service: SF00310Service) {
    }

    ngAfterViewInit(): void {
        // disabled input tags
        $('.tagsinput input').attr("readonly", true);
    }

    get sf00310Data(): SF00310Data {
        return this.sf00310Service.pageData;
    }

    get to(): string[] {
        return this.sf00310Data.mailRequest.addressTo;
    }

    set to(addresses: string[]) {
        this.sf00310Data.mailRequest.addressTo = (addresses || []).filter(item => !!item);
    }

    get cc(): string[] {
        return this.sf00310Data.mailRequest.addressCc;
    }

    set cc(addresses: string[]) {
        this.sf00310Data.mailRequest.addressCc = (addresses || []).filter(item => !!item);
    }

    get subject() {
        return this.sf00310Data.mailRequest.subject;
    }

    set subject(val: string) {
        this.sf00310Data.mailRequest.subject = val;
    }

    get content() {
        return this.sf00310Data.mailRequest.content;
    }

    set content(val: string) {
        this.sf00310Data.mailRequest.content = val;
    }

    private valid(): boolean {
        if (ValidatorUtil.isEmpty(this.sf00310Data.mailRequest.addressTo)) {
            swal(Constants.BLANK, Messages.get(MSG.SF00310.ERR004), "error");
            return false;
        }

        if (ValidatorUtil.isEmpty(this.sf00310Data.mailRequest.subject)) {
            swal(Constants.BLANK, Messages.get(MSG.SF00310.ERR003), "error");
            return false;
        }

        if (ValidatorUtil.isEmpty(this.sf00310Data.mailRequest.content)) {
            swal(Constants.BLANK, Messages.get(MSG.SF00310.ERR005), "error");
            return false;
        }

        return true;
    }

    send() {
        if (this.valid()) {
            this.applyMail.emit();
        }
    }

    searchUserPicTO() {
        this.closeRequest();
        this.sf00310Data.typeAddress = "TO";
        this.showPic();
    }

    searchUserPicCC() {
        this.closeRequest();
        this.sf00310Data.typeAddress = "CC";
        this.showPic();
    }

    closeRequest() {
        $("#sendRequestModal").modal('hide');
    }

    showRequest() {
        $("#sendRequestModal").modal('show');
    }

    showPic() {
        // reset list user pic
        this.sf00310Data.userPicModals        = [];
        // set default department
        this.sf00310Data.listDepartmentScreen = SF00310Helper.cloneDepartmentModel(this.sf00310Data.departments);
        this.sf00310Data.listDepartmentScreen.forEach(data => {
            data["active"] = false;
        });
        this.sf00310Data.listPicScreen                     = this.sf00310Data.listDepartmentScreen[0].users;
        this.sf00310Data.listPicScreen.forEach(item => {
            item["active"] = false;
        });
        this.sf00310Data.listDepartmentScreen[0]['active'] = true;
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
