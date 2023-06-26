import {Component} from "@angular/core";
import {SF00101Data} from "../SF00101.data";
import {DepartmentModel} from "../model/SF001_Department";
import {UserModel} from "../model/SF001_User";
import DataUtil from "../../../../util/data-util";
import {PERIODS_TAB1} from "../../../../helper/mst-data-type";
import {SF00101Page} from "../SF00101.page";

/**
 * Created by manhnv on 6/5/2017.
 */

@Component({
    selector: 'sf0010101-filter-tab1',
    templateUrl: 'SF0010101.FilterTab1.component.html',
    styleUrls: ['SF00101.Filter.component.css']
})
export class SF0010101FilterTab1Component {
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
        return this.pageData.modelFilterTab1.departmentID;
    }

    set department(value: number) {
        // set value department
        this.pageData.modelFilterTab1.departmentID = value;

        // if whole company selected then set 指定なし for the second filter
        if(value != 0) {
            let department = this.pageData.departments.find(item => {
                return item.id == value;
            });
            this.pageData.salesTab1 = department.users;
        }

        this.pageData.modelFilterTab1.picId = 0;
        // filter
        this.page.filterDataTab1();
    }

    get sales(): UserModel[] {
        return this.pageData.salesTab1;
    }

    get sale(): number {
        return this.pageData.modelFilterTab1.picId;
    }

    set sale(value: number) {
        // set value department
        this.pageData.modelFilterTab1.picId = value;

        // filter
        this.page.filterDataTab1();
    }

    mstPeriods = DataUtil.toSelectBoxDataSource(PERIODS_TAB1);

    set period(value: number) {
        this.pageData.modelFilterTab1.timeFilter = value;
        // filter
        this.page.filterDataTab1();
    }

    get period(): number {
        return this.pageData.modelFilterTab1.timeFilter;
    }

    get isWholeCompany() {
        if (this.pageData.modelFilterTab1.departmentID == 0) return true;
        return false;
    }
}