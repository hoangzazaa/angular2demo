"use strict";
var MailModel = (function () {
    function MailModel() {
        this.addressTo = [];
        this.addressCc = [];
        this.subject = "";
        this.content = "";
        this.attachmentFiles = [];
    }
    MailModel.prototype.setMail = function (data) {
        this.addressTo = (data["addressTo"] || []).map(function (item) { return item; });
        this.addressCc = (data["addressCc"] || []).map(function (item) { return item; });
        this.subject = data["subject"] || "";
        this.content = data["content"] || "";
    };
    return MailModel;
}());
exports.MailModel = MailModel;
//# sourceMappingURL=Mail.model.js.map