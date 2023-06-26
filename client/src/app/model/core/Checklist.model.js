/**
 * Contain checklist for a deal
 * @author vupt
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Question_model_1 = require("./Question.model");
var Deal_model_1 = require("./Deal.model");
var BaseModel_model_1 = require("./BaseModel.model");
var Checklist = (function (_super) {
    __extends(Checklist, _super);
    function Checklist() {
        _super.apply(this, arguments);
    }
    Checklist.prototype.setChecklist = function (data) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.questionId = data["questionId"];
        this.answer = data["answer"];
        this.dealId = data["dealId"];
        this.answerText = data["answerText"];
        if (data["question"] !== undefined) {
            this.question = new Question_model_1.Question();
            this.question.setQuestion(data["question"]);
        }
        if (data["deal"] !== undefined) {
            this.deal = new Deal_model_1.Deal();
            this.deal.setDeal(data["deal"]);
        }
    };
    return Checklist;
}(BaseModel_model_1.BaseModel));
exports.Checklist = Checklist;
//# sourceMappingURL=Checklist.model.js.map