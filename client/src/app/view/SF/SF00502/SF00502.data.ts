import {DepartmentModel} from "./model/Department.model";
import {CustomerModel} from "./model/Customer.model";
import {StaffModel} from "./model/Staff.model";
import {NoteModel} from "./model/Note.model";
import {SF00502DataRepo} from "./SF00502.datarepo";
import { MonthTerm } from './model/MonthTerm.model';

export class SF00502Data {

    constructor() {
        this.dataRepo = new SF00502DataRepo();
        this.departments = [];
        this.customers = [];
        this.staffs = [];
        this.customerNotes = [];
    }

    //region Background data

    // current time
    currentTime: Date;
    // department list
    departments: Array<DepartmentModel>;
    // customer list
    customers: Array<CustomerModel>;
    // staff list
    staffs: Array<StaffModel>;
    // customer note list
    customerNotes: Array<NoteModel>;
    // data map
    dataRepo: SF00502DataRepo;

    //endregion

    //region Screen data

    // user can edit
    canEdit: boolean;
    // screen mode
    screenMode: number;
    // selected month
    selectedDepartment: DepartmentModel;
    // selected staff
    selectedStaff: StaffModel;
    /** 表示月 */
    selectedMonthTerm: MonthTerm;

    // staff list
    availableStaffs: Array<StaffModel>;
    // month list
    availableMonths: Array<Date>;
    // current summary
    sumarry: NoteModel;
    // current increase list
    increaseList: Array<NoteModel>;
    // current decrease list
    decreaseList: Array<NoteModel>;
    // available customer
    availableCustomers: Array<CustomerModel>;

    //endregion

    /**
     * 表示可能な実績モードの日付最大値 (この値を含む)
     *
     * <p>currentTime 前月の最終日の 23:59:59.999 が返される
     *
     * @return 表示可能な実績モードの日付最大値 (この値を含む)  (null: currentTime が null)
     */
    get maxAchievmentDate(): Date|null {
        let now = this.currentTime;
        return now ? new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, -1) : null;
    }

    /** 表示開始月 (from) */
    get selectedMonth(): Date {
        return this.selectedMonthTerm ? this.selectedMonthTerm.date : null;
    }
    /** 表示開始月 (from) */
    set selectedMonth(value: Date) {
        this.selectedMonthTerm = {
            date: value,
            term: this.selectedTerm
        };
    }
    /** 期間 (実績を表示している場合のみ有効)  単位: 月 */
    get selectedTerm(): number {
        return this.selectedMonthTerm ? this.selectedMonthTerm.term : 1;
    }
    /** 期間 (実績を表示している場合のみ有効)  単位: 月 */
    set selectedTerm(value: number) {
        this.selectedMonthTerm = {
            date: this.selectedMonth,
            term: this.selectedTerm
        };
    }
}
