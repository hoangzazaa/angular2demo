"use strict";
var CheckSheet_model_1 = require("./model/CheckSheet.model");
var CheckSheetData = (function () {
    function CheckSheetData() {
    }
    CheckSheetData.prototype.answerMap = function (key) {
        // get answer by questionCode = key
        var answer = this.checkSheets[key];
        // check answer undefined => new CheckSheet() with questionCode = key
        if (answer == undefined) {
            answer = new CheckSheet_model_1.CheckSheetModel();
        }
        return answer;
    };
    CheckSheetData.prototype.valueItem = function (data) {
        if (data)
            return data.name;
        return '';
    };
    return CheckSheetData;
}());
exports.CheckSheetData = CheckSheetData;
//# sourceMappingURL=CheckSheet.data.js.map