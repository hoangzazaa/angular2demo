export class IndividualGoalsStateControl {

    private unsavedNewCustomerGoalsFlg: boolean = false;
    private unsavedOtherCustomerGoalsFlg: boolean = false;

    private unsavedOldCustomerGoalsFlg: boolean[] = [];


    get isAllStatesSaved(): boolean {
        return !this.unsavedNewCustomerGoalsFlg &&
            !this.unsavedNewCustomerGoalsFlg &&
            this.isAllOldCustomerGoalsSaved;
    }

    public get isAllOldCustomerGoalsSaved(): boolean {
        return this.unsavedOldCustomerGoalsFlg.find(item => item == true) == null;
    }

    resetAllStates() {
        this.setSavedNewCustomerGoals();
        this.resetOldCustomerGoalsStates();
    }

    setUnsavedOtherCustomerGoals() {
        this.unsavedOtherCustomerGoalsFlg = true;
    }

    setSavedOtherCustomerGoals() {
        this.unsavedOtherCustomerGoalsFlg = false;
    }

    setUnsavedNewCustomerGoals() {
        this.unsavedNewCustomerGoalsFlg = true;
    }

    setSavedNewCustomerGoals() {
        this.unsavedNewCustomerGoalsFlg = false;
    }

    setUnsavedOldCustomerGoals(idx: number) {
        this.unsavedOldCustomerGoalsFlg[idx] = true;
    }

    setSavedOldCustomerGoals(idx: number) {
        this.unsavedOldCustomerGoalsFlg[idx] = false;
    }

    resetOldCustomerGoalsStates() {
        this.unsavedOldCustomerGoalsFlg = [];
    }

}
