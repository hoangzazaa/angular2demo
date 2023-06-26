"use strict";
var DepartmentGoalsStateControl = (function () {
    function DepartmentGoalsStateControl() {
        this.unsavedDepartmentGoalsFlg = false;
    }
    Object.defineProperty(DepartmentGoalsStateControl.prototype, "isAllStatesSaved", {
        get: function () {
            return !this.unsavedDepartmentGoalsFlg;
        },
        enumerable: true,
        configurable: true
    });
    DepartmentGoalsStateControl.prototype.resetAllStates = function () {
        this.setSavedDepartmentGoalsFlg();
    };
    DepartmentGoalsStateControl.prototype.setUnsavedDepartmentGoalsFlg = function () {
        this.unsavedDepartmentGoalsFlg = true;
    };
    DepartmentGoalsStateControl.prototype.setSavedDepartmentGoalsFlg = function () {
        this.unsavedDepartmentGoalsFlg = false;
    };
    return DepartmentGoalsStateControl;
}());
exports.DepartmentGoalsStateControl = DepartmentGoalsStateControl;
//# sourceMappingURL=DepartmentGoalsStateControl.js.map