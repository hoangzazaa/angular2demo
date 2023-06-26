import {Injectable} from "@angular/core";
import {CommonService} from "../../../service/common.service";
import {SF00502Data} from "./SF00502.data";
import {DepartmentModel} from "./model/Department.model";
import {StaffModel} from "./model/Staff.model";
import {CustomerModel} from "./model/Customer.model";
import {NoteModel} from "./model/Note.model";
import {RevenueModel} from "./model/Revenue.model";
import {DateUtil} from "../../../util/date-util";
import {SF00502Constants} from "./SF00502.constants";
import {SF00502Helper} from "./SF00502.helper";
import {Http} from "@angular/http";
import {Router} from "@angular/router";

@Injectable()
export class SF00502Service extends CommonService {

    pageData: SF00502Data;

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    /**
     * send SF0050201 get request
     * @returns {Promise<TResult>}
     */
    sf0050201(): Promise<void> {
        return this.getApi("/SF0050201").then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // 1. departments
                let departmentList: DepartmentModel[] = [];
                this.pageData.departments = departmentList;

                // 1.1 add all company option
                departmentList.push(SF00502Constants.OPTION_ALL_COMPANY);
                this.pageData.dataRepo.addStaff(SF00502Constants.OPTION_ALL_STAFF, SF00502Constants.OPTION_ALL_COMPANY.id);

                // 1.2 add data from server
                let departments = data["departments"];
                for (let deparment of departments) {
                    let dept = new DepartmentModel();
                    departmentList.push(dept);

                    // parse department data
                    dept.id = deparment["id"];
                    dept.name = deparment["name"];

                    // update repo: add all_staff option
                    this.pageData.dataRepo.addStaff(SF00502Constants.OPTION_ALL_STAFF, dept.id);
                }

                // 2. staffs
                let staffList: StaffModel[] = [];
                this.pageData.staffs = staffList;

                let staffs = data["staffs"];
                for (let staff of staffs) {
                    let stf = new StaffModel();
                    staffList.push(stf);

                    // parse staff data
                    stf.id = staff["id"];
                    stf.name = staff["name"];
                    stf.departmentId = staff["departmentId"];

                    // update repo: add staff to department
                    this.pageData.dataRepo.addStaff(staff, staff.departmentId);
                }

                // 3. now
                this.pageData.currentTime = new Date(data["now"]);
            }
        });
    }

    /**
     * send SF0050202 post request
     */
    sf0050202(): Promise<void> {
        let requestData = {
            departmentId: this.pageData.selectedDepartment.id,
            currentMonth: this.pageData.currentTime
        };
        return this.postApi("/SF0050202", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                let repo = this.pageData.dataRepo;

                // 1. customers
                let customerList: CustomerModel[] = [];
                this.pageData.customers = customerList;

                let customerDatas = data["customers"];
                for (let customerData of customerDatas) {
                    let customer = new CustomerModel();
                    customerList.push(customer);

                    // parse customer data
                    customer.id = customerData["id"];
                    customer.name = customerData["name"];
                    customer.code = customerData["code"];
                    customer.picId = customerData["picId"];
                    customer.startYear = customerData["startYear"];

                    // update repo: add customer to staff
                    repo.addCustomer(customer, customer.picId);
                    // update repo: add customer to department
                    repo.addCustomer(customer, SF00502Constants.OPTION_ALL_STAFF.id);
                    // update repo: add customer to customer map
                    repo.setCustomer(customer, customer.id);
                }

                // 2. revenues
                let lastFYear = DateUtil.getFinancialYear(this.pageData.currentTime) - 1;
                let revenueDatas = data["revenues"];
                for (let revenueData of revenueDatas) {
                    // parse revenue data
                    let tmpYear: number = revenueData["year"];
                    let tmpMonth: number = revenueData["month"];
                    let tmpCustomerId: number = revenueData["customerId"];
                    let tmpAmount1: number = revenueData["amount1"];
                    let tmpAmount2: number = revenueData["amount2"];
                    let tmpAmount3: number = revenueData["amount3"];

                    // act as old revenue
                    let oldNote = repo.getCustomerNote(tmpYear + 1, tmpMonth, tmpCustomerId);
                    if (oldNote == undefined) {
                        // create new note
                        oldNote = new NoteModel();
                        repo.setCustomerNote(oldNote, tmpYear + 1, tmpMonth, tmpCustomerId);
                        this.pageData.customerNotes.push(oldNote);

                        oldNote.year = tmpYear + 1;
                        oldNote.month = tmpMonth;
                        oldNote.customerId = tmpCustomerId;
                    }
                    oldNote.oldRevenue = new RevenueModel();
                    oldNote.oldRevenue.amount1 = tmpAmount1;
                    oldNote.oldRevenue.amount2 = tmpAmount2;
                    oldNote.oldRevenue.amount3 = tmpAmount3;

                    // act as new revenue (for revenue from last financial year only)
                    if ((tmpYear == lastFYear && tmpMonth >= 4) || (tmpYear > lastFYear)) {
                        let newNote = repo.getCustomerNote(tmpYear, tmpMonth, tmpCustomerId);
                        if (newNote == undefined) {
                            // create new note
                            newNote = new NoteModel();
                            repo.setCustomerNote(newNote, tmpYear, tmpMonth, tmpCustomerId);
                            this.pageData.customerNotes.push(newNote);

                            newNote.year = tmpYear;
                            newNote.month = tmpMonth;
                            newNote.customerId = tmpCustomerId;
                        }
                        newNote.newRevenue = new RevenueModel();
                        newNote.newRevenue.amount1 = tmpAmount1;
                        newNote.newRevenue.amount2 = tmpAmount2;
                        newNote.newRevenue.amount3 = tmpAmount3;
                    }
                }

                // 3. predictions
                let predictionDatas = data["predictions"];
                let cYear = this.pageData.currentTime.getFullYear();
                let cMonth = this.pageData.currentTime.getMonth() + 1;
                for (let predictionData of predictionDatas) {
                    // parse prediction data
                    let tmpYear: number = predictionData["year"];
                    let tmpMonth: number = predictionData["month"];
                    let tmpCustomerId: number = predictionData["customerId"];

                    // find note
                    let note = repo.getCustomerNote(tmpYear, tmpMonth, tmpCustomerId);
                    if (note == undefined) {
                        note = new NoteModel();
                        repo.setCustomerNote(note, tmpYear, tmpMonth, tmpCustomerId);
                        this.pageData.customerNotes.push(note);

                        note.year = tmpYear;
                        note.month = tmpMonth;
                        note.customerId = tmpCustomerId;
                    }

                    // set note data
                    note.id = predictionData["id"];
                    note.comment = predictionData["note"];
                    note.head = predictionData["head"];

                    // set prediction
                    if ((tmpYear == cYear && tmpMonth >= cMonth) || (tmpYear > cYear)) {
                        note.prediction = new RevenueModel();
                        note.prediction.amount1 = predictionData["amount1"];
                        note.prediction.amount2 = predictionData["amount2"];
                        note.prediction.amount3 = predictionData["amount3"];
                    }
                }
            }
        });
    }

    /**
     * send SF0050203 post request
     * - 0: save ok
     * - 1: nothing to save
     */
    sf0050203(): Promise<void> {
        // 1. check change list
        // current notes
        let currentNotes = this.pageData.increaseList.concat(this.pageData.decreaseList);
        // origin notes
        let cY = this.pageData.selectedMonth.getFullYear();
        let cM = this.pageData.selectedMonth.getMonth() + 1;
        let cS = this.pageData.selectedStaff.id;
        let originNotes = this.pageData.dataRepo.getIncreaseCustomers(cY, cM, cS)
            .concat(this.pageData.dataRepo.getDecreaseCustomers(cY, cM, cS));
        let noteList = SF00502Helper.findChanged(currentNotes, originNotes, this.pageData.screenMode);

        // 2. construct request
        let requestData = {
            year: this.pageData.selectedMonth.getFullYear(),
            month: this.pageData.selectedMonth.getMonth() + 1,
            notes: []
        }
        // 2.1 notes
        for (let note of noteList) {
            requestData.notes.push({
                id: note.id,
                customerId: note.customerId,
                note: note.comment
            })
        }

        // 3. send request
        return this.postApi("/SF0050203", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // 1. saved notes
                let savedNotes = data["notes"];
                // 1.1 create map customerId -> note id
                let tmpMap: {[key: number]: number;} = {};
                for (let note of savedNotes) {
                    tmpMap[note["customerId"]] = note["id"];
                }

                // 1.2 update screen data
                let noteMap: {[key: number]: NoteModel;} = {};
                for (let note of currentNotes) {
                    let newId = tmpMap[note.customerId];
                    if (newId != undefined) {
                        note.id = newId;

                        noteMap[note.customerId] = note;
                    }
                }
                // 1.3 update background data
                for (let note of originNotes) {
                    let tmpNote = noteMap[note.customerId];
                    if (tmpNote != undefined) {
                        // update id and comment
                        note.id = tmpNote.id;
                        note.comment = tmpNote.comment;
                    }
                }
            }
        });
    }

    /**
     * send SF0050204 post request
     * - 0: save ok
     * - 1: nothing to save
     */
    sf0050204(): Promise<void> {

        let repo = this.pageData.dataRepo;

        // 1. check change list
        // current notes
        let currentNotes = this.pageData.increaseList.concat(this.pageData.decreaseList);
        // origin notes
        let cY = this.pageData.selectedMonth.getFullYear();
        let cM = this.pageData.selectedMonth.getMonth() + 1;
        let cS = this.pageData.selectedStaff.id;
        let originNotes = repo.getIncreaseCustomers(cY, cM, cS).concat(repo.getDecreaseCustomers(cY, cM, cS));
        let noteList = SF00502Helper.findChanged(currentNotes, originNotes, this.pageData.screenMode);

        // 2. construct request
        let requestData = {
            year: this.pageData.selectedMonth.getFullYear(),
            month: this.pageData.selectedMonth.getMonth() + 1,
            picId: this.pageData.selectedStaff.id,
            notes: []
        }
        // 2.1 notes
        for (let note of noteList) {
            let noteJson = {
                id: note.id,
                customerId: note.customerId,
                amount1: note.prediction.amount1,
                amount2: note.prediction.amount2,
                amount3: note.prediction.amount3,
                note: note.comment,
                delete: 0
            };
            if (note.delete) {
                noteJson.delete = 1;
            }
            requestData.notes.push(noteJson);
        }

        // 3. send request
        return this.postApi("/SF0050204", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // update client data
                let savedNotes = data["notes"];
                let removeNotes = data["removeNotes"];
                // 1. create map customerId -> note id
                let tmpMap: {[key: number]: number;} = {};
                for (let noteData of savedNotes) {
                    tmpMap[noteData["customerId"]] = noteData["id"];
                }

                // 2. update screen data
                for (let note of currentNotes) {
                    let newId = tmpMap[note.customerId];
                    if (newId != undefined) {
                        note.id = newId;
                    }
                }
                // 3. update background data
                // 3.1 update saved notes
                let noteMap: {[key: number]: NoteModel;} = {};
                for (let note of originNotes) {
                    noteMap[note.customerId] = note;
                }
                for (let note of currentNotes) {
                    let orgNote = noteMap[note.customerId];
                    if (orgNote == undefined) {
                        // 3.1A create new note
                        orgNote = SF00502Helper.cloneNote(note);
                        // add new note
                        repo.setCustomerNote(orgNote, orgNote.year, orgNote.month, orgNote.customerId);
                    } else {
                        // 3.1B update note
                        orgNote.id = note.id;
                        orgNote.comment = note.comment;
                        // update prediction
                        orgNote.prediction.amount1 = note.prediction.amount1;
                        orgNote.prediction.amount2 = note.prediction.amount2;
                        orgNote.prediction.amount3 = note.prediction.amount3;
                        orgNote.prediction.total = note.prediction.total;
                        orgNote.diffRate = note.diffRate;
                    }
                }

                // 3.2 update removed notes
                for (let noteData of removeNotes) {
                    let customerId = noteData["customerId"];
                    let orgNote = repo.getCustomerNote(cY, cM, customerId);
                    // reset id, comment
                    orgNote.id = undefined;
                    orgNote.comment = undefined;
                    // reset prediction
                    orgNote.autoPrediction();
                    orgNote.calculatePredictionDiffRate();
                }

                // 3.2. update increase/decrease list
                // 3.2.1 update increase list
                let newIncreaseList = [];
                for (let note of this.pageData.increaseList) {
                    // find origin note
                    newIncreaseList.push(repo.getCustomerNote(note.year, note.month, note.customerId));
                }
                repo.setIncreaseCustomers(newIncreaseList, cY, cM, cS);
                // 3.2.1 update decrease list
                let newDecreaseList = [];
                for (let note of this.pageData.decreaseList) {
                    // find origin note
                    newDecreaseList.push(repo.getCustomerNote(note.year, note.month, note.customerId));
                }
                repo.setDecreaseCustomers(newDecreaseList, cY, cM, cS);
            }
        });
    }

    /**
     * send SF0050205 post request
     */
    sf0050205(): Promise<void> {
        let requestData = {
            currentMonth: this.pageData.currentTime
        };
        return this.postApi("/SF0050205", requestData).then(res => {
            let data = res["data"];
            let messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                let repo = this.pageData.dataRepo;

                // 1. customers
                let customerList: CustomerModel[] = [];
                this.pageData.customers = customerList;

                let customerDatas = data["customers"];
                for (let customerData of customerDatas) {
                    let customer = new CustomerModel();
                    customerList.push(customer);

                    // parse customer data
                    customer.id = customerData["id"];
                    customer.name = customerData["name"];
                    customer.code = customerData["code"];

                    // update repo: add customer to customer map
                    repo.setCustomer(customer, customer.id);
                }

                // 2. notes
                let noteDatas = data["notes"];
                let cYear = this.pageData.currentTime.getFullYear();
                let cMonth = this.pageData.currentTime.getMonth() + 1;
                for (let noteData of noteDatas) {
                    // parse note data
                    let note = new NoteModel();

                    note.year = noteData["year"];
                    note.month = noteData["month"];
                    note.customerId = noteData["customerId"];
                    note.comment = noteData["note"];

                    note.oldRevenue = new RevenueModel();
                    note.oldRevenue.amount1 = noteData["oldAmount1"];
                    note.oldRevenue.amount2 = noteData["oldAmount2"];
                    note.oldRevenue.amount3 = noteData["oldAmount3"];
                    note.oldRevenue.calculateTotal();

                    if ((note.year == cYear && note.month >= cMonth) || (note.year > cYear)) {
                        // note is prediction
                        note.prediction = new RevenueModel();
                        note.prediction.amount1 = noteData["newAmount1"];
                        note.prediction.amount2 = noteData["newAmount2"];
                        note.prediction.amount3 = noteData["newAmount3"];
                        note.prediction.calculateTotal();
                        note.calculatePredictionDiffRate();
                    } else {
                        // note is revenue
                        note.newRevenue = new RevenueModel();
                        note.newRevenue.amount1 = noteData["newAmount1"];
                        note.newRevenue.amount2 = noteData["newAmount2"];
                        note.newRevenue.amount3 = noteData["newAmount3"];
                        note.newRevenue.calculateTotal();
                        note.calculateRevenueDiffRate();
                    }

                    // add note to repo
                    repo.setCustomerNote(note, note.year, note.month, note.customerId);
                }

                // 3. summaries
                let summaryDatas = data["summaries"];
                for (let summaryData of summaryDatas) {
                    // parse summary data
                    let summary = new NoteModel();

                    summary.year = summaryData["year"];
                    summary.month = summaryData["month"];

                    summary.oldRevenue = new RevenueModel();
                    summary.oldRevenue.amount1 = summaryData["oldAmount1"];
                    summary.oldRevenue.amount2 = summaryData["oldAmount2"];
                    summary.oldRevenue.amount3 = summaryData["oldAmount3"];
                    summary.oldRevenue.calculateTotal();

                    summary.newRevenue = new RevenueModel();
                    summary.newRevenue.amount1 = summaryData["newAmount1"];
                    summary.newRevenue.amount2 = summaryData["newAmount2"];
                    summary.newRevenue.amount3 = summaryData["newAmount3"];
                    summary.newRevenue.calculateTotal();
                    summary.calculateRevenueDiffRate();

                    // add summary to repo
                    repo.setSummary(summary, summary.year, summary.month, SF00502Constants.OPTION_ALL_STAFF.id);
                }
            }
        });
    }
}