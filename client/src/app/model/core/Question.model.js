/**
 * Contain question for checklist
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("./BaseModel.model");
var Question = (function (_super) {
    __extends(Question, _super);
    function Question() {
        _super.apply(this, arguments);
    }
    Question.prototype.setQuestion = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.question = data["question"];
        this.questionId = data["questionId"];
    };
    return Question;
}(BaseModel_model_1.BaseModel));
exports.Question = Question;
//# sourceMappingURL=Question.model.js.map