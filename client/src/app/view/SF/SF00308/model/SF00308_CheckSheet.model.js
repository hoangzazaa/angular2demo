"use strict";
/**
 * Created by hoangtd on 3/16/2017.
 */
var SF00308CheckSheet = (function () {
    function SF00308CheckSheet() {
    }
    SF00308CheckSheet.prototype.setData = function (data) {
        this.id = data["id"];
        this.questionCode = data["questionCode"];
        this.textArea1 = data["textArea1"];
        this.textArea2 = data["textArea2"];
        this.radioButton = data["radioButton"];
        this.selectBox1 = data["selectBox1"];
        this.selectBox2 = data["selectBox2"];
        this.selectBox3 = data["selectBox3"];
        this.dealId = data["dealId"];
        this.checkBox1 = data["checkBox1"];
        this.checkBox2 = data["checkBox2"];
        this.checkBox3 = data["checkBox3"];
    };
    return SF00308CheckSheet;
}());
exports.SF00308CheckSheet = SF00308CheckSheet;
//# sourceMappingURL=SF00308_CheckSheet.model.js.map