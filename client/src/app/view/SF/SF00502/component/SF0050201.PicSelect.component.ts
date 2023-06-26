import {Component} from "@angular/core";
import {SF00502Service} from "../SF00502.service";
import {DepartmentModel} from "../model/Department.model";
import {SF00502Page} from "../SF00502.page";
import {StaffModel} from "../model/Staff.model";

@Component({
    selector: "[sf0050201]",
    templateUrl: "SF0050201.PicSelect.component.html"
})
export class SF0050201Component {

    // tmp select value
    _tmpDept: DepartmentModel;
    _tmpStaff: StaffModel;

    constructor(private service: SF00502Service, private page: SF00502Page) {
    }

    get departmentOptions(): Array<DepartmentModel> {
        return this.service.pageData.departments;
    }

    get staffOptions(): Array<StaffModel> {
        return this.service.pageData.availableStaffs;
    }

    get selectedDepartment(): DepartmentModel {
        if (this._tmpDept != undefined) {
            return this._tmpDept;
        } else {
            return this.service.pageData.selectedDepartment;
        }
    }

    set selectedDepartment(value: DepartmentModel) {
        this._tmpDept = value;
        this.page.confirmIgnoreChange().then(isConfirmed => {
            this._tmpDept = undefined;
            if (isConfirmed) {
                // call page function
                this.page.selectDepartment(value);
            }
        });
    }

    get selectedStaff(): StaffModel {
        if (this._tmpStaff != undefined) {
            return this._tmpStaff;
        } else {
            return this.service.pageData.selectedStaff;
        }
    }

    set selectedStaff(value: StaffModel) {
        this._tmpStaff = value;
        this.page.confirmIgnoreChange().then(isConfirmed => {
            this._tmpStaff = undefined;
            if (isConfirmed) {
                // call page function
                this.page.selectStaff(value);
            }
        });
    }

}