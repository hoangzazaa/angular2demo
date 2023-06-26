import {Component, ElementRef, Inject, ViewChild, ViewEncapsulation} from "@angular/core";
import {GenericProvider} from "../../../../component/GenericProvider";
import {MailModalModel} from "./MailModal.model";
import {MailModalData} from "./MailModal.data";

@Component({
    selector: "[mail-modal]",
    templateUrl: "MailModal.component.html",
    styleUrls: ["MailModal.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class MailModalComponent {

    @ViewChild("modal") modalE: ElementRef;
    @ViewChild("block") blockE: ElementRef;
    // vars
    model: MailModalModel;
    data: MailModalData;
    sendEnable: boolean;

    constructor(@Inject(MailModalModel.PROVIDER) rltProvider: GenericProvider<MailModalModel>) {
        this.model = rltProvider.provider;
        this.data = this.model.data;

        this.sendEnable = true;
    }

    //region Bindings

    get addressTo(): string[] {
        return this.data.mail.mm_addressTo;
    }

    set addressTo(value: string[]) {
        this.data.mail.mm_addressTo = value;
    }

    get addressCc(): string[] {
        return this.data.mail.mm_addressCc;
    }

    set addressCc(value: string[]) {
        this.data.mail.mm_addressCc = value;
    }

    get subject(): string {
        return this.data.mail.mm_subject;
    }

    set subject(value: string) {
        this.data.mail.mm_subject = value;
    }

    get content(): string {
        return this.data.mail.mm_content;
    }

    set content(value: string) {
        this.data.mail.mm_content = value;
    }

    //endregion

    open() {
        // open modal
        $(this.modalE.nativeElement).modal('show');
    }

    close() {
        $(this.modalE.nativeElement).modal('hide');
    }

    cancel() {
        this.close();
    }

    submit() {
        this.sendEnable = false;
        OneUI.blocks(this.blockE.nativeElement, "state_loading");

        this.model.sendMail().catch().then(() => {
            this.sendEnable = true;
            OneUI.blocks(this.blockE.nativeElement, "state_normal");

            this.close();
        });
    }

    //region Actions
}
