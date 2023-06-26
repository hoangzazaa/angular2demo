/**
 * Created by manhnv on 6/14/2017.
 */

import {Component, EventEmitter, Output} from "@angular/core";
import DataUtil from "../../../../util/data-util";
import {SF00205Department} from "../model/SF00205_Department.model";
import {SF00205Filter} from "../model/SF00205_Filter.model";
import {SF00205User} from "../model/SF00205_User.model";
import {SF00205Data} from "../SF00205.data";
import {SF00205Service} from "../SF00205.service";

@Component({
    selector: "sf0020501-filter",
    templateUrl: "SF0020501Filter.component.html",
    styleUrls: ["SF0020501Filter.component.css"]
})
export class SF0020501FilterComponent {
    @Output() search: EventEmitter<SF00205Filter> = new EventEmitter<SF00205Filter>();

    constructor(private service: SF00205Service) {
    }

    get pageData(): SF00205Data {
        return this.service.pageData;
    }

    get filter(): SF00205Filter {
        return this.pageData.requestModel.filter;
    }

    set filter(value: SF00205Filter) {
        this.pageData.requestModel.filter = value;
    }

    //3007
    mstPeriodType = DataUtil.toSelectBoxDataSource({1: "納品日", 2: "作成日"});

    get sysDate(): Date {
        return new Date();
    }

    get fromDate(): Date {
        return this.filter.fromDate;
    }

    get toDate(): Date {
        return this.filter.toDate;
    }

    get departments(): SF00205Department[] {
        return this.pageData.departments;
    }

    get selectedDepartmentId(): number {
        return this.filter.selectedDepartmentId;
    }

    set selectedDepartmentId(value: number) {
        this.filter.selectedDepartmentId = value;

        let department = this.pageData.departments.find(item => {
            return item.id == value;
        });

        // update list pics when department changes
        if (!!department) {
            this.pageData.pics = department.users;
        }

        if (this.filter.selectedDepartmentId == this.pageData.defaultDepartmentId) {
            this.selectedPicId = this.pageData.defaultPicId;
        } else {
            this.selectedPicId = 0;
        }
    }

    dateChange(value: Date, type: number): void {
        if (type == 1)
            this.filter.fromDate = value;
        else
            this.filter.toDate = value;
    }

    get pics(): SF00205User[] {
        return this.pageData.pics;
    }

    get selectedPicId(): number {
        return this.filter.selectedPicId;
    }

    set selectedPicId(value: number) {
        this.filter.selectedPicId = value;
    }

    get periodType(): number {
        return this.filter.periodType;
    }

    set periodType(value: number) {
        this.filter.periodType = value;
    }

    reset(): void {
        this.resetDefaultFilter();

        this.doSearch();
    }

    doSearch(): void {
        this.search.emit(this.filter);
    }

    get isDisable(): boolean {
        return this.pageData.isDisable;
    }

    resetDefaultFilter() {
        this.filter.periodType = 1;
        this.filter.fromDate = null;
        this.filter.toDate = null;
        this.selectedDepartmentId = this.pageData.defaultDepartmentId;
        this.selectedPicId = this.pageData.defaultPicId;

        this.filter.dealCode = null;
        this.filter.dealName = null;

        this.filter.customerCode = null;
        this.filter.customerName = null;
    }

}