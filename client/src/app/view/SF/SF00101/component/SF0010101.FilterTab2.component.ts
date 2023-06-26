import {Component} from "@angular/core";
import {SF00101Data} from "../SF00101.data";
import {DepartmentModel} from "../model/SF001_Department";
import {UserModel} from "../model/SF001_User";
import DataUtil from "../../../../util/data-util";
import {PERIODS_TAB2} from "../../../../helper/mst-data-type";
import {SF00101Page} from "../SF00101.page";

/**
 * Created by manhnv on 6/5/2017.
 */

@Component({
    selector: 'sf0010101-filter-tab2',
    templateUrl: 'SF0010101.FilterTab2.component.html',
    styleUrls: ['SF00101.Filter.component.css']
})
export class SF0010101FilterTab2Component {
    get sysDate(): Date {
        return this.pageData.systemDate;
    }

    constructor(public page: SF00101Page) {
    }

    get pageData(): SF00101Data {
        return this.page.pageService.pageData;
    }

    get departments(): DepartmentModel[] {
        return this.pageData.departments;
    }

    get department(): number {
        return this.pageData.modelFilterTab2.departmentID;
    }

    set department(value: number) {
        this.pageData.modelFilterTab2.departmentID = value;

        // if whole company selected then set 指定なし for the second filter
        if (value != 0) {
            let department = this.pageData.departments.find(item => {
                return item.id == value;
            });
            this.pageData.salesTab2 = department.users;
        }

        this.pageData.modelFilterTab2.picId = 0;
        // filter
        this.page.filterDataTab2();
    }

    get sales(): UserModel[] {
        return this.pageData.salesTab2;
    }

    get sale(): number {
        return this.pageData.modelFilterTab2.picId;
    }

    set sale(value: number) {
        // set value department
        this.pageData.modelFilterTab2.picId = value;

        // filter
        this.page.filterDataTab2();
    }

    mstPeriods = DataUtil.toSelectBoxDataSource(PERIODS_TAB2);

    set period(value: number) {
        this.pageData.modelFilterTab2.timeFilter = value;
        // filter
        this.page.filterDataTab2();
    }

    get period(): number {
        return this.pageData.modelFilterTab2.timeFilter;
    }

    get isWholeCompany() {
        if (this.pageData.modelFilterTab2.departmentID == 0) return true;
        return false;
    }
}