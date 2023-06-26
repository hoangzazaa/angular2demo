"use strict";
var MailModel = (function () {
    function MailModel() {
    }
    Object.defineProperty(MailModel.prototype, "mm_addressTo", {
        //region MM
        get: function () {
            return this.addressTo;
        },
        set: function (value) {
            this.addressTo = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailModel.prototype, "mm_addressCc", {
        get: function () {
            return this.addressCc;
        },
        set: function (value) {
            this.addressCc = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailModel.prototype, "mm_subject", {
        get: function () {
            return this.subject;
        },
        set: function (value) {
            this.subject = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailModel.prototype, "mm_content", {
        get: function () {
            return this.content;
        },
        set: function (value) {
            this.content = value;
        },
        enumerable: true,
        configurable: true
    });
    return MailModel;
}());
exports.MailModel = MailModel;
//# sourceMappingURL=SFN0402_Mail.model.js.map