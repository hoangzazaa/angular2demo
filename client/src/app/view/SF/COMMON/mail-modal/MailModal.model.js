"use strict";
var MailModal_data_1 = require("./MailModal.data");
var MailModalModel = (function () {
    function MailModalModel() {
        this.data = new MailModal_data_1.MailModalData();
    }
    MailModalModel.prototype.sendMail = function () {
        return Promise.resolve();
    };
    MailModalModel.PROVIDER = "MailModal";
    return MailModalModel;
}());
exports.MailModalModel = MailModalModel;
//# sourceMappingURL=MailModal.model.js.map