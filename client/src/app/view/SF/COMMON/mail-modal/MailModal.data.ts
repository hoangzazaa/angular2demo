import {MMMail} from "./model/MMMail.model";
export class MailModalData {

    constructor() {
        this.mail = <MMMail>{};
        this.mail.mm_addressTo = [];
        this.mail.mm_addressCc = [];
    }

    //region Screen data

    mail: MMMail;

    //endregion
}