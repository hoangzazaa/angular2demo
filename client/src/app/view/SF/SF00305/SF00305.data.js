"use strict";
/**
 * Created by hoangtd on 3/15/2017.
 */
var SF00305Data = (function () {
    function SF00305Data() {
        this.totalSize = 0;
        this.checkCreateUpload = false;
        this.recipients = [];
        this.cc = [];
        this.attachFiles = [];
        this.mimeTypes = [];
        this.originalName = [];
        this.TOTAL_SIZE_DEFAULT = 5242880;
    }
    SF00305Data.prototype.setSF00305Data = function (data) {
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
            for (var i = 0; i < data["recipients"].length; i++) {
                this.recipients.push(data["recipients"][i]);
            }
        }
        if (data["cc"] !== undefined) {
            this.cc = [];
            for (var i = 0; i < data["cc"].length; i++) {
                this.cc.push(data["cc"][i]);
            }
        }
        if (data["attachFiles"] !== undefined) {
            this.attachFiles = [];
            for (var i = 0; i < data["attachFiles"].length; i++) {
                this.attachFiles.push(data["attachFiles"][i]);
            }
        }
        // set default type image pdf
        this.mimeTypes.push('application/pdf');
        if (data["mimeTypes"] !== undefined) {
            for (var i = 0; i < data["mimeTypes"].length; i++) {
                this.cc.push(data["mimeTypes"][i]);
            }
        }
    };
    return SF00305Data;
}());
exports.SF00305Data = SF00305Data;
//# sourceMappingURL=SF00305.data.js.map