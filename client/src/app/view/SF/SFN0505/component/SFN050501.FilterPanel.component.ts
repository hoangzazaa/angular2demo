import {Component} from "@angular/core";
import {SFN0505Page} from "../SFN0505.page";
import {SFN0505Constants} from "../SFN0505.constants";
import {UserModel} from "../model/SFN0505_User.model";
import {DepartmentModel} from "../model/SFN0505_Department.model";
import {FilterModel} from "../model/SFN0505_Filter.model";

@Component({
    selector: "[sfn050501]",
    templateUrl: "SFN050501.FilterPanel.component.html"
})
export class SFN050501Component {

    // tmp select value
    currentFilter: FilterModel
    // enable filter
    filterEnable: boolean;
    // startdate boundary
    minStartDate: Date;

    constructor(private page: SFN0505Page) {

        this.filterEnable = true;
        this.currentFilter = this.page.pageData.currentFilter;

        // calculate min start date: first day of previous month
        this.minStartDate = moment().startOf('month').subtract(1, 'M').toDate();
    }

    //region Screen bindings

    get departmentList(): DepartmentModel[] {
        return this.page.pageData.departments;
    }

    get selectedDepartment(): DepartmentModel {
        return this.page.pageData.currentFilter.department;
    }

    set selectedDepartment(value: DepartmentModel) {
        let pageData = this.page.pageData;
        pageData.currentFilter.department = value;
        // update staff list
        pageData.users = pageData.dataRepo.getUsers(pageData.currentFilter.department.id);
        // update selected staff to ALL_STAFF
        pageData.currentFilter.user = SFN0505Constants.OPTION_ALL_USER;
    }

    get userList(): UserModel[] {
        return this.page.pageData.users;
    }

    get selectedUser(): UserModel {
        return this.page.pageData.currentFilter.user;
    }

    set selectedUser(value: UserModel) {
        this.currentFilter.user = value;
    }

    get startDate(): Date {
        return this.currentFilter.startDate;
    }

    set startDate(value: Date) {
        this.currentFilter.startDate = value;
    }

    get endDate(): Date {
        return this.currentFilter.endDate;
    }

    set endDate(value: Date) {
        this.currentFilter.endDate = value;
    }

    //endregion

    //region Screen actions

    // filter
    doFilter() {
        this.filterEnable = false;

        this.page.loadData().then(() => {
            this.filterEnable = true;
        })
    }

    //endregion
}