import {Component} from "@angular/core";
import {SFN0504Page} from "../SFN0504.page";
import {SFN0504Constants} from "../SFN0504.constants";
import {UserModel} from "../model/SFN0504_User.model";
import {DepartmentModel} from "../model/SFN0504_Department.model";
import {FilterModel} from "../model/SFN0504_Filter.model";

@Component({
    selector: "[sfn050401]",
    templateUrl: "SFN050401.FilterPanel.component.html"
})
export class SFN050401Component {

    // tmp select value
    currentFilter: FilterModel

    constructor(private page: SFN0504Page) {

        this.currentFilter = this.page.pageData.currentFilter;
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
        pageData.currentFilter.user = SFN0504Constants.OPTION_ALL_USER;

        // do filter
        this.doFilter();
    }

    get userList(): UserModel[] {
        return this.page.pageData.users;
    }

    get selectedUser(): UserModel {
        return this.page.pageData.currentFilter.user;
    }

    set selectedUser(value: UserModel) {
        this.currentFilter.user = value;

        // do filter
        this.doFilter();
    }

    get stockDays(): number {
        return this.currentFilter.stockDays;
    }

    set stockDays(value: number) {
        this.currentFilter.stockDays = value;

        // do filter
        this.doFilter();
    }

    get stockType(): number {
        return this.currentFilter.stockType;
    }

    set stockType(value: number) {
        this.currentFilter.stockType = value;

        // do filter
        this.doFilter();
    }

    //endregion

    //region Screen actions

    // filter
    doFilter() {
        this.page.loadData();
    }

    //endregion
}