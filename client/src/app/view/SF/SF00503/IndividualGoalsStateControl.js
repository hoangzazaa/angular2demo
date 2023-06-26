"use strict";
var IndividualGoalsStateControl = (function () {
    function IndividualGoalsStateControl() {
        this.unsavedNewCustomerGoalsFlg = false;
        this.unsavedOtherCustomerGoalsFlg = false;
        this.unsavedOldCustomerGoalsFlg = [];
    }
    Object.defineProperty(IndividualGoalsStateControl.prototype, "isAllStatesSaved", {
        get: function () {
            return !this.unsavedNewCustomerGoalsFlg &&
                !this.unsavedNewCustomerGoalsFlg &&
                this.isAllOldCustomerGoalsSaved;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IndividualGoalsStateControl.prototype, "isAllOldCustomerGoalsSaved", {
        get: function () {
            return this.unsavedOldCustomerGoalsFlg.find(function (item) { return item == true; }) == null;
        },
        enumerable: true,
        configurable: true
    });
    IndividualGoalsStateControl.prototype.resetAllStates = function () {
        this.setSavedNewCustomerGoals();
        this.resetOldCustomerGoalsStates();
    };
    IndividualGoalsStateControl.prototype.setUnsavedOtherCustomerGoals = function () {
        this.unsavedOtherCustomerGoalsFlg = true;
    };
    IndividualGoalsStateControl.prototype.setSavedOtherCustomerGoals = function () {
        this.unsavedOtherCustomerGoalsFlg = false;
    };
    IndividualGoalsStateControl.prototype.setUnsavedNewCustomerGoals = function () {
        this.unsavedNewCustomerGoalsFlg = true;
    };
    IndividualGoalsStateControl.prototype.setSavedNewCustomerGoals = function () {
        this.unsavedNewCustomerGoalsFlg = false;
    };
    IndividualGoalsStateControl.prototype.setUnsavedOldCustomerGoals = function (idx) {
        this.unsavedOldCustomerGoalsFlg[idx] = true;
    };
    IndividualGoalsStateControl.prototype.setSavedOldCustomerGoals = function (idx) {
        this.unsavedOldCustomerGoalsFlg[idx] = false;
    };
    IndividualGoalsStateControl.prototype.resetOldCustomerGoalsStates = function () {
        this.unsavedOldCustomerGoalsFlg = [];
    };
    return IndividualGoalsStateControl;
}());
exports.IndividualGoalsStateControl = IndividualGoalsStateControl;
//# sourceMappingURL=IndividualGoalsStateControl.js.map