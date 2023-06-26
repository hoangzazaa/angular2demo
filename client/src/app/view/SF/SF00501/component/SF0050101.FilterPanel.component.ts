import {Component} from "@angular/core";
import {SF00501Page} from "../SF00501.page";
import {DepartmentModel} from "../model/SF00501_Department.model";
import {StaffModel} from "../model/SF00501_Staff.model";
import {DateModel} from "../model/SF00501_Date.model";
import {SF00501Constants} from "../SF00501.constants";

@Component({
    selector: "[sf0050101]",
    templateUrl: "SF0050101.FilterPanel.component.html"
})
export class SF0050101Component {

    // tmp select value
    // enable filter
    filterEnable: boolean;

    constructor(private page: SF00501Page) {

        this.filterEnable = true;
    }

    //region Screen bindings

    get departmentList(): DepartmentModel[] {
        return this.page.pageData.departments;
    }

    get selectedDepartment(): DepartmentModel {
        return this.page.pageData.selectedFilter.department;
    }

    set selectedDepartment(value: DepartmentModel) {
        let pageData = this.page.pageData;
        pageData.selectedFilter.department = value;
        // update staff list
        pageData.staffs = pageData.dataRepo.getStaffs(pageData.selectedFilter.department.id);
        // update selected staff to ALL_STAFF
        pageData.selectedFilter.staff = SF00501Constants.OPTION_ALL_STAFF;
    }

    get staffList(): StaffModel[] {
        return this.page.pageData.staffs;
    }

    get selectedStaff(): StaffModel {
        return this.page.pageData.selectedFilter.staff;
    }

    set selectedStaff(value: StaffModel) {
        this.page.pageData.selectedFilter.staff = value;
    }

    get dateUnit(): number {
        return this.page.pageData.selectedFilter.dateUnit;
    }

    set dateUnit(value: number) {
        let pageData = this.page.pageData;
        pageData.selectedFilter.dateUnit = value;
        // update date list
        pageData.dateOptions = pageData.dataRepo.getSelectDates(pageData.selectedFilter.dateUnit);
        // change date option to match current time
        let cM = pageData.currentTime.getFullYear() * 12 + pageData.currentTime.getMonth() + 1;
        for (let option of pageData.dateOptions) {
            if ((cM >= option.startYear * 12 + option.startMonth)
                && (cM <= option.endYear * 12 + option.endMonth)) {
                this.page.pageData.selectedFilter.date = option;
                break;
            }
        }
    }

    get dateList(): DateModel[] {
        return this.page.pageData.dateOptions;
    }

    get selectedDate(): DateModel {
        return this.page.pageData.selectedFilter.date;
    }

    set selectedDate(value: DateModel) {
        this.page.pageData.selectedFilter.date = value;
    }

    get customerType(): number {
        return this.page.pageData.selectedFilter.customerType;
    }

    set customerType(value: number) {
        this.page.pageData.selectedFilter.customerType = value;
    }

    get summaryType(): number {
        return this.page.pageData.selectedFilter.sumaryType;
    }

    set summaryType(value: number) {
        this.page.pageData.selectedFilter.sumaryType = value;
    }

    //endregion

    //region Screen actions

    // filter
    doFilter() {
        this.filterEnable = false;

        this.page.doFilter();

        this.filterEnable = true;
    }

    //endregion
}