export class MailModel {
    addressTo: string[] = [];

    addressCc: string[] = [];

    subject: string = "";

    content: string = "";

    attachmentFiles: Object[] = [];

    public setMail(data: any) {
        this.addressTo = (data["addressTo"] || []).map(item => item);
        this.addressCc = (data["addressCc"] || []).map(item => item);
        this.subject = data["subject"] || "";
        this.content = data["content"] || "";
        
    }
}
