import {MMMail} from "../../COMMON/mail-modal/model/MMMail.model";
export class MailModel implements MMMail {

    addressTo: string[];
    addressCc: string[];
    subject: string;
    content: string;

    //region MM

    get mm_addressTo(): string[] {
        return this.addressTo;
    }

    set mm_addressTo(value: string[]) {
        this.addressTo = value;
    }

    get mm_addressCc(): string[] {
        return this.addressCc;
    }

    set mm_addressCc(value: string[]) {
        this.addressCc = value;
    }

    get mm_subject(): string {
        return this.subject;
    }

    set mm_subject(value: string) {
        this.subject = value;
    }

    get mm_content(): string {
        return this.content;
    }

    set mm_content(value: string) {
        this.content = value;
    }

    //endregion
}