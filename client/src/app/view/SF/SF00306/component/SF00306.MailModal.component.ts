import {AfterViewInit, Component, EventEmitter, Output} from "@angular/core";
import {Constants} from "../../../../helper/constants";
import Messages, {MSG} from "../../../../helper/message";
import ValidatorUtil from "../../../../util/validator-util";
import {SF00306Data} from "../SF00306.data";
import {SF00306Service} from "../SF00306.service";
import {SF00306Helper} from "../SF00306.helper";

declare let $: JQueryStatic | any;
@Component({
    selector   : "sf00306Mail",
    templateUrl: "SF00306.MailModal.component.html"
})
export class SF00306MailModalComponent implements AfterViewInit {
    @Output() applyMail: EventEmitter<void> = new EventEmitter<void>();

    constructor(public sf00306Service: SF00306Service) {
    }

    ngAfterViewInit(): void {
        // disabled input tags
        $('.tagsinput input').attr("readonly", true);
    }

    get pageData(): SF00306Data {
        return this.sf00306Service.pageData;
    }


    get to(): string[] {
        return this.pageData.mailModelScreen.addressTo;
    }

    set to(address: string[]) {
        this.pageData.mailModelScreen.addressTo = (address || []).filter(item => !!item);
    }

    get cc(): string[] {
        return this.pageData.mailModelScreen.addressCc;
    }

    set cc(address: string[]) {
        this.pageData.mailModelScreen.addressCc = (address || []).filter(item => !!item);
    }

    get subject() {
        return this.pageData.mailModelScreen.subject;
    }

    set subject(val: string) {
        this.pageData.mailModelScreen.subject = val;
    }

    get content() {
        return this.pageData.mailModelScreen.content;
    }

    set content(val: string) {
        this.pageData.mailModelScreen.content = val;
    }

    private valid(): boolean {
        if (ValidatorUtil.isEmpty(this.pageData.mailModelScreen.addressTo)) {
            swal(Constants.BLANK, Messages.get(MSG.SF00306.ERR004), "error");
            return false;
        }

        if (ValidatorUtil.isEmpty(this.pageData.mailModelScreen.subject)) {
            swal(Constants.BLANK, Messages.get(MSG.SF00306.ERR003), "error");
            return false;
        }

        if (ValidatorUtil.isEmpty(this.pageData.mailModelScreen.content)) {
            swal(Constants.BLANK, Messages.get(MSG.SF00306.ERR005), "error");
            return false;
        }

        return true;
    }

    send() {
        if (this.valid()) {
            this.applyMail.emit();
        }
    }

    closeRequest() {
        $("#sendRequestModal").modal('hide');
    }

    showRequest() {
        $("#sendRequestModal").modal('show');
    }

    showPic() {
        // reset list user pic
        this.pageData.userPicModals        = [];
        // set default department
        this.pageData.listDepartmentScreen = SF00306Helper.cloneDepartmentModel(this.pageData.departments);
        this.pageData.listDepartmentScreen.forEach(data => {
            data["active"] = false;
        });
        this.pageData.listPicScreen = this.pageData.listDepartmentScreen[0].users;
        this.pageData.listDepartmentScreen[0]['active'] = true;
        // show modal search pic
        $("#searchModal").modal('show');
        $('.tagsinput input').removeAttr("readonly");

        setTimeout(function () {
            //scoll userPic
            //waiting render modal 0.3 s
            $('#table-body-userPic').scrollTop(0);
            $('#table-body-department').scrollTop(0);
        },300);
    }

    searchUserPicTO() {
        this.closeRequest();
        this.pageData.typeAddress = "TO";
        this.showPic();
    }

    searchUserPicCC() {
        this.closeRequest();
        this.pageData.typeAddress = "CC";
        this.showPic();
    }
}
