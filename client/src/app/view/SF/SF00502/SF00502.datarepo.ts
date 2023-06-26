import {StaffModel} from "./model/Staff.model";
import {NoteModel} from "./model/Note.model";
import {SF00502Constants} from "./SF00502.constants";
import DataUtil from "../../../util/data-util";
import {CustomerModel} from "./model/Customer.model";

export class SF00502DataRepo {

    // data map
    private dataRepo: any = {};

    //region staff: departmentid - staff[]
    getStaffs(departmentId: number): StaffModel[] {
        return DataUtil.getData(this.dataRepo, [], SF00502Constants.MAP_DEPARTMENT, departmentId);
    }

    addStaff(staff: StaffModel, departmentId: number): void {
        let staffs = DataUtil.getData(this.dataRepo, undefined, SF00502Constants.MAP_DEPARTMENT, departmentId);
        if (staffs == undefined) {
            staffs = [];
            DataUtil.pushData(this.dataRepo, staffs, departmentId, SF00502Constants.MAP_DEPARTMENT);
        }
        staffs.push(staff);
    }

    //endregion

    //region summary: year - month - staffId - note
    getSummary(year: number, month: number, staffId: number): NoteModel {
        return DataUtil.getData(this.dataRepo, undefined, SF00502Constants.MAP_SUMMARY, year, month, staffId);
    }

    setSummary(summary: NoteModel, year: number, month: number, staffId: number): void {
        DataUtil.pushData(this.dataRepo, summary, staffId, SF00502Constants.MAP_SUMMARY, year, month);
    }

    //endregion

    //region increase customers: year - month - staffId - note[]
    getIncreaseCustomers(year: number, month: number, staffId: number): NoteModel[] {
        let list = DataUtil.getData(this.dataRepo, undefined, SF00502Constants.MAP_CUSTOMER_INCREASE, year, month, staffId);
        if (list == undefined) {
            return [];
        } else {
            return list;
        }
    }

    setIncreaseCustomers(notes: NoteModel[], year: number, month: number, staffId: number): void {
        DataUtil.pushData(this.dataRepo, notes, staffId, SF00502Constants.MAP_CUSTOMER_INCREASE, year, month);
    }

    //endregion

    //region decrease customers: year - month - staffId - note[]
    getDecreaseCustomers(year: number, month: number, staffId: number): NoteModel[] {
        let list = DataUtil.getData(this.dataRepo, undefined, SF00502Constants.MAP_CUSTOMER_DECREASE, year, month, staffId);
        if (list == undefined) {
            return [];
        } else {
            return list;
        }
    }

    setDecreaseCustomers(notes: NoteModel[], year: number, month: number, staffId: number): void {
        DataUtil.pushData(this.dataRepo, notes, staffId, SF00502Constants.MAP_CUSTOMER_DECREASE, year, month);
    }

    //endregion

    //region staff customer: staffId - customer[]
    getCustomers(staffId: number): CustomerModel[] {
        let list = DataUtil.getData(this.dataRepo, undefined, SF00502Constants.MAP_STAFF_CUSTOMER, staffId);
        if (list == undefined) {
            return [];
        } else {
            return list;
        }
    }

    addCustomer(customer: CustomerModel, staffId: number): void {
        let customers = DataUtil.getData(this.dataRepo, undefined, SF00502Constants.MAP_STAFF_CUSTOMER, staffId);
        if (customers == undefined) {
            customers = [];
            DataUtil.pushData(this.dataRepo, customers, staffId, SF00502Constants.MAP_STAFF_CUSTOMER);
        }
        customers.push(customer);
    }

    //endregion

    //region customerId customer: customerId - customer
    getCustomer(customerId: number): CustomerModel {
        return DataUtil.getData(this.dataRepo, undefined, SF00502Constants.MAP_CUSTOMER, customerId);
    }

    setCustomer(customer: CustomerModel, customerId: number): void {
        DataUtil.pushData(this.dataRepo, customer, customerId, SF00502Constants.MAP_CUSTOMER);
    }

    //endregion

    //region customer note: year - month - customerId - note
    getCustomerNote(year: number, month: number, customerId: number): NoteModel {
        return DataUtil.getData(this.dataRepo, undefined, SF00502Constants.MAP_CUSTOMER_NOTE, year, month, customerId);
    }

    setCustomerNote(note: NoteModel, year: number, month: number, customerId: number): void {
        DataUtil.pushData(this.dataRepo, note, customerId, SF00502Constants.MAP_CUSTOMER_NOTE, year, month);
    }

    getCustomerNotes(year: number, month: number): NoteModel[] {
        let notes = [];
        let noteMap = DataUtil.getData(this.dataRepo, undefined, SF00502Constants.MAP_CUSTOMER_NOTE, year, month);
        if (noteMap != undefined) {
            for (let customerId in noteMap) {
                let note = noteMap[customerId];
                notes.push(note);
            }
        }
        return notes;
    }

    //endregion

    // clear department data
    clearDepartmentData() {
        // clear summary
        DataUtil.pushData(this.dataRepo, undefined, SF00502Constants.MAP_SUMMARY);
        // clear increase customers
        DataUtil.pushData(this.dataRepo, undefined, SF00502Constants.MAP_CUSTOMER_INCREASE);
        // clear decrease customers
        DataUtil.pushData(this.dataRepo, undefined, SF00502Constants.MAP_CUSTOMER_DECREASE);
        // clear staff
        DataUtil.pushData(this.dataRepo, undefined, SF00502Constants.MAP_STAFF_CUSTOMER);
        // clear customer
        DataUtil.pushData(this.dataRepo, undefined, SF00502Constants.MAP_CUSTOMER);
        // clear customer note
        DataUtil.pushData(this.dataRepo, undefined, SF00502Constants.MAP_CUSTOMER_NOTE);
    }
}