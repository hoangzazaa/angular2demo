import {MailModalData} from "./MailModal.data";
export abstract class MailModalModel {

    public static readonly PROVIDER = "MailModal";
    public data: MailModalData;

    constructor() {
        this.data = new MailModalData();
    }

    sendMail(): Promise<void> {
        return Promise.resolve();
    }
}
