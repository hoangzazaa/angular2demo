/**
 * Created by hoangtd on 2/13/2017.
 */
import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {SF00503Data} from "../SF00503.data";
import {Constants} from "../../../../helper/constants";
import {Router} from "@angular/router";
import {FormatUtil} from "../../../../util/format-util";
import {CustomCustomerGoal} from "../../../../model/CustomCustomerGoal.model";
import {ItemEmit} from "../../../../model/ItemEmit";
import MathUtil from "../../../../util/math-util";
import Messages, {MSG} from "../../../../helper/message";
import {CustomerGoalItem} from "../../../../model/core/CustomerGoalItem.model";
import {SF00503Helper} from "../SF00503.helper";

declare var $: JQueryStatic;

/**
 * TOP &gt; 営業目標登録 ... 得意先別目標タブの既存得意先セクションの各要素
 */
@Component({
    selector: "div[sf0050306]",
    templateUrl: "SF0050306.component.html"
})

export class SF0050306Component implements OnInit {

    isCreated: boolean = false;
    customerGoalOld: CustomCustomerGoal;
    @Input() index: number;

    @Output() onDataChanged: EventEmitter<any> = new EventEmitter();
    @Output() changeSaveCustomerGoal: EventEmitter<any> = new EventEmitter();

    goldCustomerOld: number[][] = [];
    goldCustomerOldBefore: number[][] = [];

    goldOldCus: number[] = [];
    goldOldBeforeCus: number[] = [];
    interestRateCus: any[] = [];

    type1OldAfter: number = 0;
    type2OldAfter: number = 0;
    type3OldAfter: number = 0;
    type1OldBefore: number = 0;
    type2OldBefore: number = 0;
    type3OldBefore: number = 0;
    totalOldAfter: number = 0;
    totalOldBefore: number = 0;
    interestRateOld: any;

    checkSetPicSale: boolean = false;

    ngOnInit(): void {
        this.customerGoalOld = this.sf00503Data.paginatedCustomerGoals[this.index];

        this.updateDataByYear();

        this.calculatorData();
    }

    constructor(public sf00503Data: SF00503Data, private router: Router) {
        this.goldCustomerOld[Constants.TYPE_1] = [];
        this.goldCustomerOld[Constants.TYPE_2] = [];
        this.goldCustomerOld[Constants.TYPE_3] = [];

        this.goldCustomerOldBefore[Constants.TYPE_1] = [];
        this.goldCustomerOldBefore[Constants.TYPE_2] = [];
        this.goldCustomerOldBefore[Constants.TYPE_3] = [];
    }

    get rows(): number[] {
        return this.sf00503Data.rows;
    }


    get columns(): number[] {
        return this.sf00503Data.columns;
    }

    // create new customerGoal if customerGoal = undefined
    saveCustomerGoal() {
        if (this.customerGoalOld.picId == undefined) {
            $.notify({message: Messages.get(MSG.SF00503.INF006)}, {type: 'danger'});
            return;
        }
        this.convertDataArrToUserGoal();

        let itemEmit = new ItemEmit();

        itemEmit.index = this.index;
        itemEmit.data = this.customerGoalOld;

        this.isCreated = false;

        this.changeSaveCustomerGoal.emit(itemEmit);
    }

    updateDataByYear() {
        // create this.sf00503Data.userGoal.goalItems
        // if this.sf00503Data.userGoal.goalItems == undefined || this.sf00503Data.userGoal.goalItems.length == 0
        let type = 0;

        if (!this.customerGoalOld.goalItems || this.customerGoalOld.goalItems.length == 0) {
            this.createDataCustomerOld();
            this.isCreated = true;
        }

        let goalItems_1 = this.customerGoalOld.goalItems;

        // defined list goldOld and goldNew
        for (let i = 0; i < this.sf00503Data.rows.length; i++) {
            for (let j = 0; j < this.sf00503Data.columns.length; j++) {
                if (goalItems_1) {
                    goalItems_1.forEach(goalItem => {
                        // map data goalOld
                        if (this.sf00503Data.rows[i] == goalItem.type
                            && this.sf00503Data.columns[j] == goalItem.month
                            && goalItem.customerType == Constants.CUSTOMER_OLD) {
                            this.goldCustomerOld[i][j] = MathUtil.round(goalItem.goal, 0);
                        }
                    });
                }
            }
        }

        // get userGoalBefore by year -1
        let saleDataItems = this.customerGoalOld.customerDataItems;

        for (let i = 0; i < this.sf00503Data.rows.length; i++) {
            for (let j = 0; j < this.sf00503Data.columns.length; j++) {
                if (saleDataItems && saleDataItems.length > 0) {
                    saleDataItems.forEach(customerDataItem => {
                        // map data goldOldBefore
                        if (this.sf00503Data.rows[i] == customerDataItem.productType
                            && this.sf00503Data.columns[j] == customerDataItem.month) {
                            this.goldCustomerOldBefore[i][j] = MathUtil.round(customerDataItem.totalMoney, 0);
                        }
                    });
                } else {
                    this.goldCustomerOldBefore[i][j] = 0;
                }
            }
        }


    }

    emitDataChangedEvent() {
        this.onDataChanged.emit();
    }

    setUserPicToCustomerGoal(value) {
        this.customerGoalOld.picId = value.id;
        // set user
        this.customerGoalOld.user = value;
        // set department
        this.customerGoalOld.departmentId = value.departmentId;

        this.valuePicName();

        this.onDataChanged.emit();
    }


    //search user goal
    searchUserPic() {
        if (this.sf00503Data.readOnlyCusGoal) {
            return;
        }

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
                this.checkSetPicSale = true;
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

        if (!this.checkSetPicSale) {
            this.sf00503Data.departments[0]["active"] = true;

            this.sf00503Data.userDepartments = this.sf00503Data.departments[0].users;

            this.sf00503Data.userDepartments[0]["active"] = true;

            this.sf00503Data.userPicModal = this.sf00503Data.userDepartments[0];
        }

        $("#searchModal" + this.index + "Old").modal('show');
    }

    // get/set
    get dateUpdate(): Date {
        return this.customerGoalOld.updatedDate;
    }

    get customerCode(): string {
        return this.customerGoalOld.customer.customerCode;
    }

    get customerName(): string {
        return this.customerGoalOld.customer.name;
    }

    get saleOld(): string {
        if (this.customerGoalOld.customer.customerContact == undefined) {
            return "";
        } else {
            return "担当: " + this.customerGoalOld.customer.customerContact;
        }

    }

    navigateSF00402() {
        if(!!this.customerCode){
            return this.router.navigate(['home/customer',this.customerCode]);
        }else{
            $.notify({message: Messages.get(MSG.COM.INF999)}, {type: 'info'});
        }
    }

    get departmentId(): number {
        if (this.customerGoalOld.user != undefined) {
            return this.customerGoalOld.user.departmentId;
        }

        return this.customerGoalOld.departmentId;
    }

    get picId(): number {
        if (this.customerGoalOld.picId != undefined) {
            this.sf00503Data.checkChangeUser = true;
            return this.customerGoalOld.picId;
        }

        return undefined;
    }

    get picCustomerGoal(): string {
        if (this.customerGoalOld.picId != undefined) {
            return this.customerGoalOld.user.username;
        } else {
            return this.customerGoalOld.customer.customerContact;
        }
    }

    valuePicName() {
        if (this.customerGoalOld.user) {
            return this.customerGoalOld.user.username;
        }

        return "";
    }

    updateDataChange(value) {
        this.calculatorData();

        this.convertDataArrToUserGoal();

        this.sf00503Data.calculatorCustomer();

        if (this.isCreated) {
            this.emitDataChangedEvent();
        }
    }


    calculatorData() {
        //東京支店 1.
        let type1OldAfter = 0;
        let type1OldBefore = 0;

        let type2OldAfter = 0;
        let type2OldBefore = 0;

        let type3OldAfter = 0;
        let type3OldBefore = 0;

        for (let i = 0; i < this.sf00503Data.columns.length; i++) {
            type1OldAfter += FormatUtil.isNaN(this.goldCustomerOld[0][i]);
            type1OldBefore += FormatUtil.isNaN(this.goldCustomerOldBefore[0][i]);

            type2OldAfter += FormatUtil.isNaN(this.goldCustomerOld[1][i]);
            type2OldBefore += FormatUtil.isNaN(this.goldCustomerOldBefore[1][i]);

            type3OldAfter += FormatUtil.isNaN(this.goldCustomerOld[2][i]);
            type3OldBefore += FormatUtil.isNaN(this.goldCustomerOldBefore[2][i]);
        }

        this.type1OldAfter = FormatUtil.isNaN(type1OldAfter);
        this.type1OldBefore = SF00503Helper.convertYenToThousanYen(FormatUtil.isNaN(type1OldBefore));

        this.type2OldAfter = FormatUtil.isNaN(type2OldAfter);
        this.type2OldBefore = SF00503Helper.convertYenToThousanYen(FormatUtil.isNaN(type2OldBefore));

        this.type3OldAfter = FormatUtil.isNaN(type3OldAfter);
        this.type3OldBefore = SF00503Helper.convertYenToThousanYen(FormatUtil.isNaN(type3OldBefore));

        this.totalOldAfter = this.type1OldAfter + this.type2OldAfter + this.type3OldAfter;
        this.totalOldBefore = this.type1OldBefore + this.type2OldBefore + this.type3OldBefore;

        if (this.totalOldBefore && this.totalOldBefore > 0)
            this.interestRateOld = MathUtil.round(this.totalOldAfter * 100 / this.totalOldBefore, 1);
        else
            this.interestRateOld = Constants.HYPHEN;

        for (let i = 0; i < this.sf00503Data.columns.length; i++) {
            this.goldOldCus[i] = FormatUtil.isNaN(this.goldCustomerOld[0][i])
                + FormatUtil.isNaN(this.goldCustomerOld[1][i]) + FormatUtil.isNaN(this.goldCustomerOld[2][i]);

            let goaldOldBefore = FormatUtil.isNaN(this.goldCustomerOldBefore[0][i])
                + FormatUtil.isNaN(this.goldCustomerOldBefore[1][i])
                + FormatUtil.isNaN(this.goldCustomerOldBefore[2][i]);

            this.goldOldBeforeCus[i] = goaldOldBefore;

            if (FormatUtil.isNaN(goaldOldBefore) == 0) {
                this.interestRateCus[i] = Constants.HYPHEN;
            } else {
                this.interestRateCus[i] = MathUtil.round(this.goldOldCus[i] * 100 * 1000 / goaldOldBefore, 1);
            }
        }

    }

    checkInput(evt) {
        if (evt.which < 48 || evt.which > 57) {
            evt.preventDefault();
            return;
        }
    }

    convertDataArrToUserGoal() {

        for (let i = 0; i < this.sf00503Data.rows.length; i++) {
            for (let j = 0; j < this.sf00503Data.columns.length; j++) {
                this.customerGoalOld.goalItems.forEach(item => {
                    if (item.month == this.sf00503Data.columns[j]
                        && item.type == i
                        && item.customerType == Constants.CUSTOMER_OLD) {
                        item.goal = this.goldCustomerOld[i][j];
                    }
                })
            }
        }

        this.sf00503Data.customerGoalsYear.splice(this.indexCustomerGoal(), 1, this.customerGoalOld);
    }

    indexCustomerGoal() {
        // get index by id customerGoal
        for (let i = 0; i < this.sf00503Data.customerGoalsYear.length; i++) {
            if (this.sf00503Data.customerGoalsYear[i].year == this.customerGoalOld.year
                && this.sf00503Data.customerGoalsYear[i].picId == this.customerGoalOld.picId
                && this.sf00503Data.customerGoalsYear[i].customerId == this.customerGoalOld.customerId) {

                return i;
            }
        }
    }


    createDataCustomerOld() {
        let type = 0;
        // set departmentId

        this.customerGoalOld.goalItems = [];
        for (let i = 0; i < 36; i++) {
            this.customerGoalOld.goalItems[i] = new CustomerGoalItem();
            this.customerGoalOld.goalItems[i].goal = 0;
            this.customerGoalOld.goalItems[i].customerGoalId = this.customerGoalOld.id;
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
            this.customerGoalOld.goalItems[i].type = type - 1;
            // set month
            this.customerGoalOld.goalItems[i].month = this.sf00503Data.columns[indexMonth];

            this.customerGoalOld.goalItems[i].goal = 0;
            // this.customerGoalOld.customerDataItems.forEach(item => {
            //     if (this.customerGoalOld.goalItems[i].month == item.month
            //         && this.customerGoalOld.goalItems[i].type == item.productType) {
            //         this.customerGoalOld.goalItems[i].goal = SF00503Helper.convertYenToThousanYen(item.totalMoney);
            //     }
            // });

            // set customer type
            this.customerGoalOld.goalItems[i].customerType = Constants.CUSTOMER_OLD;
        }
    }

    convertYenToThousanYen(value: number){
        return SF00503Helper.convertYenToThousanYen(value);
    }
}
