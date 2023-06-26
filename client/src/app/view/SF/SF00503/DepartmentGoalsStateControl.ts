export class DepartmentGoalsStateControl {

    private unsavedDepartmentGoalsFlg: boolean = false;

    get isAllStatesSaved(): boolean {
        return !this.unsavedDepartmentGoalsFlg;
    }

    resetAllStates() {
        this.setSavedDepartmentGoalsFlg();
    }

    setUnsavedDepartmentGoalsFlg() {
        this.unsavedDepartmentGoalsFlg = true;
    }

    setSavedDepartmentGoalsFlg() {
        this.unsavedDepartmentGoalsFlg = false;
    }

}
