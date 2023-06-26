import {Component} from "@angular/core";
import {SFN0506Page} from "../SFN0506.page";
import {SFN0506Constants} from "../SFN0506.constants";
import {UserModel} from "../model/SFN0506_User.model";
import {DepartmentModel} from "../model/SFN0506_Department.model";
import {FilterModel} from "../model/SFN0506_Filter.model";
import {Option} from "../../../../helper/common-helper";
import {DateUtil} from "../../../../util/date-util";

@Component({
    selector: "[sfn050601]",
    templateUrl: "SFN050601.FilterPanel.component.html"
})
export class SFN050601Component {

    // tmp select value
    currentFilter: FilterModel;
    // startdate boundary
    minStartDate: Date;

    constructor(private page: SFN0506Page) {

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
        pageData.currentFilter.user = SFN0506Constants.OPTION_ALL_USER;

        // filter
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

        // filter
        this.doFilter();
    }

    get startDate(): Date {
        return this.currentFilter.startDate;
    }

    set startDate(value: Date) {
        let oldValue = this.currentFilter.startDate;
        this.currentFilter.startDate = value;

        if (DateUtil.getTime(oldValue) != DateUtil.getTime(value)) {
            // filter
            this.doFilter();
        }
    }

    get endDate(): Date {
        return this.currentFilter.endDate;
    }

    set endDate(value: Date) {
        let oldValue = this.currentFilter.endDate;
        this.currentFilter.endDate = value;

        if (DateUtil.getTime(oldValue) != DateUtil.getTime(value)) {
            // filter
            this.doFilter();
        }
    }

    get dateType(): number {
        return this.currentFilter.dateType;
    }

    set dateType(value: number) {
        this.currentFilter.dateType = value;

        // filter
        this.doFilter();
    }

    get paymentMethods(): Option[] {
        return SFN0506Constants.PAYMENT_METHOD_OPTIONS;
    }

    get paymentMethod(): number {
        return this.currentFilter.method;
    }

    set paymentMethod(value: number) {
        this.currentFilter.method = value;

        // filter
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