/**
 * Created by hoangtd on 2/13/2017.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {SF00503Data} from "../SF00503.data";
import {FormatUtil} from "../../../../util/format-util";
import {Constants} from "../../../../helper/constants";
import {CustomerGoalItem} from "../../../../model/core/CustomerGoalItem.model";
import {Router} from "@angular/router";
import {ItemEmit} from "../../../../model/ItemEmit";
import {CustomCustomerGoal} from "../../../../model/CustomCustomerGoal.model";
import Messages, {MSG} from "../../../../helper/message";

declare var $: JQueryStatic;

/**
 * TOP &gt; 営業目標登録 ... 得意先別目標タブの既存得意先(その他)セクションの各要素
 */
@Component({
    selector: "div[sf0050312]",
    templateUrl: "SF0050312.component.html"
})
export class SF0050312Component {
    customerGoalOther: CustomCustomerGoal;
    @Input() index: number;

    @Output() onDataChanged: EventEmitter<any> = new EventEmitter();
    @Output() changeDeleteItem: EventEmitter<any> = new EventEmitter();
    @Output() changeCreateCustomerGoal: EventEmitter<any> = new EventEmitter();

    goldCustomerOther: number[][] = [];

    goldOldCus: number[] = [];
    // goldItemsYear: CustomerGoalItem[] = [];

    type1Other: number = 0;
    type2Other: number = 0;
    type3Other: number = 0;
    typeYear: number = 0;

    totalType: number = 0;

    ngOnInit(): void {
        this.customerGoalOther = this.sf00503Data.customerGoalOthers[this.index];

        this.updateDataByYear();

        this.calculatorData();
    }

    constructor(public sf00503Data: SF00503Data, private router: Router) {
        this.goldCustomerOther[Constants.TYPE_1] = [];
        this.goldCustomerOther[Constants.TYPE_2] = [];
        this.goldCustomerOther[Constants.TYPE_3] = [];

    }

    get rows(): number[] {
        return this.sf00503Data.rows;
    }

    get columns(): number[] {
        return this.sf00503Data.columns;
    }

    // create new customerGoal if customerGoal = undefined
    createCustomerGoal() {
        if (this.customerGoalOther.picId == undefined) {
            $.notify({message: Messages.get(MSG.SF00503.INF006)}, {type: 'danger'});
            return;
        }

        this.convertDataArrToUserGoal();
        let itemEmit = new ItemEmit();

        itemEmit.index = this.index;
        itemEmit.data = this.customerGoalOther;

        this.changeCreateCustomerGoal.emit(itemEmit);
    }

    updateDataChange(value) {

        this.calculatorData();

        this.convertDataArrToUserGoal();

        this.sf00503Data.calculatorCustomer();
    }

    updateDataByYear() {
        // create this.sf00503Data.userGoal.goalItems
        // if this.sf00503Data.userGoal.goalItems == undefined || this.sf00503Data.userGoal.goalItems.length == 0
        let type = 0;

        if (!this.customerGoalOther.goalItems
            || this.customerGoalOther.goalItems.length == 0) {
            this.customerGoalOther.goalItems = [];
            for (let i = 0; i < 36; i++) {
                this.customerGoalOther.goalItems[i] = new CustomerGoalItem();
                this.customerGoalOther.goalItems[i].goal = 0;
                this.customerGoalOther.goalItems[i].customerGoalId = this.customerGoalOther.id;
                // month
                let indexMonth = i % 12;

                // type
                if (indexMonth == 0) {
                    // if type == 3 -> reset type = 0
                    if (type % 3 == 0) {
                        type = 0;
                    }

                    type++;
                }
                // set type
                this.customerGoalOther.goalItems[i].type = type - 1;
                // set month
                this.customerGoalOther.goalItems[i].month = this.sf00503Data.columns[indexMonth];
                this.customerGoalOther.goalItems[i].customerType = Constants.CUSTOMER_OTHER;
            }
            // for (let i = 0; i < 12; i++) {
            //     this.goldItemsYear[i] = new CustomerGoalItem();
            //     this.goldItemsYear[i].goal = 0;
            //     this.goldItemsYear[i].customerGoalId = this.customerGoalOther.id;
            //     this.goldItemsYear[i].type = null;
            //     // set goldItemsYear
            //     this.goldItemsYear[i].month = this.sf00503Data.columns[i];
            //     this.goldItemsYear[i].customerType = Constants.CUSTOMER_OTHER;
            //     // push goalItemYear to list goalItems
            //     this.customerGoalOther.goalItems.push(this.goldItemsYear[i]);
            // }
        }

        let goalItems_1 = this.customerGoalOther.goalItems;

        // defined list goldOld and goldNew
        for (let i = 0; i < this.sf00503Data.rows.length; i++) {
            for (let j = 0; j < this.sf00503Data.columns.length; j++) {
                if (goalItems_1) {
                    goalItems_1.forEach(goalItem => {
                        // map data goalOld
                        if (i == goalItem.type
                            && this.sf00503Data.columns[j] == goalItem.month
                            && goalItem.customerType == Constants.CUSTOMER_OTHER) {
                            this.goldCustomerOther[i][j] = goalItem.goal;
                        }
                    });
                }
            }
        }

        // for (let i = 36; i < 48; i++) {
        //     this.goldItemsYear[i % 36] = new CustomerGoalItem();
        //     if (goalItems_1) {
        //         this.goldItemsYear[i % 36].goal = goalItems_1[i].goal;
        //     }
        // }

    }

    // delete
    deleteCustomerGoal() {
        let itemEmit = new ItemEmit();

        itemEmit.index = this.index;
        itemEmit.data = this.customerGoalOther;

        this.changeDeleteItem.emit(itemEmit);
    }

    emitDataChangedEvent() {
        this.onDataChanged.emit();
    }

    //search user goal
    searchUserPic() {
        // clear color active user
        this.sf00503Data.departments.forEach(data => {
            data["active"] = false;
            data.users.forEach(user => {
                user["active"] = false;
            })
        });

        // set active department and user
        this.sf00503Data.departments.forEach(data => {
            if (data.id == this.departmentId) {
                this.sf00503Data.userDepartments = data.users;
                data["active"] = true;
                if (this.picId) {
                    data.users.forEach(user => {
                        if (user.id == this.picId) {
                            user["active"] = true;
                            this.sf00503Data.userPicModal = user;
                        }
                    })
                } else {
                    this.sf00503Data.userDepartments[0]["active"] = true;
                    this.sf00503Data.userPicModal = this.sf00503Data.userDepartments[0];
                }

            }
        });

        $("#searchModal" + this.index + "Other").modal('show');
    }

    // get/set
    get dateUpdate(): Date {
        return this.customerGoalOther.updatedDate;
    }

    setUserPicToCustomerGoal(value) {
        this.customerGoalOther.picId = value.id;
        // set user pic
        this.customerGoalOther.user = value;
        // set department
        this.customerGoalOther.departmentId = value.departmentId;

        this.onDataChanged.emit();
    }


    calculatorData() {
        //東京支店 2.
        let type1Other = 0;
        let type2Other = 0;
        let type3Other = 0;
        let typeYear = 0;

        for (let i = 0; i < this.sf00503Data.columns.length; i++) {
            type1Other += FormatUtil.isNaN(this.goldCustomerOther[0][i]);
            type2Other += FormatUtil.isNaN(this.goldCustomerOther[1][i]);
            type3Other += FormatUtil.isNaN(this.goldCustomerOther[2][i]);
            // typeYear += FormatUtil.isNaN(this.goldItemsYear[i].goal);
        }

        this.type1Other = FormatUtil.isNaN(type1Other);
        this.type2Other = FormatUtil.isNaN(type2Other);
        this.type3Other = FormatUtil.isNaN(type3Other);
        this.typeYear = FormatUtil.isNaN(typeYear);

        this.totalType = this.type1Other + this.type2Other+ this.type3Other;

        for (let i = 0; i < this.sf00503Data.columns.length; i++) {
            this.goldOldCus[i] = FormatUtil.isNaN(this.goldCustomerOther[0][i])
                + FormatUtil.isNaN(this.goldCustomerOther[1][i]) + FormatUtil.isNaN(this.goldCustomerOther[2][i]);
        }
    }

    convertDataArrToUserGoal() {
        for (let i = 0; i < this.sf00503Data.rows.length; i++) {
            for (let j = 0; j < this.sf00503Data.columns.length; j++) {
                this.customerGoalOther.goalItems.forEach(item => {
                    if (item.month == this.sf00503Data.columns[j]
                        && item.type == i
                        && item.customerType == Constants.CUSTOMER_OTHER) {
                        item.goal = this.goldCustomerOther[i][j];
                    }
                })

            }
        }

        // for (let j = 0; j < this.sf00503Data.columns.length; j++) {
        //     this.customerGoalOther.goalItems[j + 36].goal = this.goldItemsYear[j].goal;
        // }

        this.sf00503Data.customerGoalOthersYear.splice(this.indexCustomerGoal(), 1, this.customerGoalOther);

    }

    indexCustomerGoal() {
        // get index by id customerGoal
        for (let i = 0; i < this.sf00503Data.customerGoalOthersYear.length; i++) {
            if (this.sf00503Data.customerGoalOthersYear[i].year == this.customerGoalOther.year
                && this.sf00503Data.customerGoalOthersYear[i].picId == this.customerGoalOther.picId
                && this.sf00503Data.customerGoalOthersYear[i].customerId == this.customerGoalOther.customerId) {

                return i;
            }
        }
    }

    get picCustomerGoal(): string {
        if (!this.customerGoalOther.user.username) {
            return "担当";
        }

        return this.customerGoalOther.user.username;
    }

    get picId() {
        return this.customerGoalOther.picId;
    }

    get departmentId(): number {
        return this.customerGoalOther.departmentId;
    }

    // checkInput(evt) {
    //     if (evt.which < 48 || evt.which > 57) {
    //         evt.preventDefault();
    //         return;
    //     }
    // }

    valuePicName() {
        if (!this.customerGoalOther.user.username) {
            return undefined;
        } else {
            return this.customerGoalOther.user.username;
        }
    }

}
