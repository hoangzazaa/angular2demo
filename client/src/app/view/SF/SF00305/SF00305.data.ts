/**
 * Created by hoangtd on 3/15/2017.
 */
export class SF00305Data {
    subject: string;
    mailContent: string;
    dealCode: string;
    quotationCode: string;
    quotationImage: string;
    option: string;
    totalSize: number = 0;
    quotationFile: string;
    timestamp: string;
    attachFile: string;
    attachFileUri: string;
    checkCreateUpload: boolean = false;

    recipients: string[] = [];
    cc: string[] = [];
    attachFiles: string[] = [];
    mimeTypes: string[] = [];
    originalName: string[] = [];

    TOTAL_SIZE_DEFAULT: number = 5242880;

    public setSF00305Data(data: any) {
        this.subject = data["subject"];
        this.timestamp = data["timestamp"];
        if (data["mailAddress"]) {
            this.recipients.push(data["mailAddress"]);
        }
        this.mailContent = data["mailTemplate"];
        this.attachFile = data["attachFile"];
        this.attachFileUri = data["attachFileUri"];

        if (data["recipients"] !== undefined) {
            this.recipients = [];
            for (let i = 0; i < data["recipients"].length; i++) {
                this.recipients.push(data["recipients"][i]);
            }
        }
        if (data["cc"] !== undefined) {
            this.cc = [];
            for (let i = 0; i < data["cc"].length; i++) {
                this.cc.push(data["cc"][i]);
            }
        }
        if (data["attachFiles"] !== undefined) {
            this.attachFiles = [];
            for (let i = 0; i < data["attachFiles"].length; i++) {
                this.attachFiles.push(data["attachFiles"][i]);
            }
        }
        // set default type image pdf
        this.mimeTypes.push('application/pdf');

        if (data["mimeTypes"] !== undefined) {
            for (let i = 0; i < data["mimeTypes"].length; i++) {
                this.cc.push(data["mimeTypes"][i]);
            }
        }


    }
}