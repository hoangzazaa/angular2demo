/**
 * Created by hoangtd on 2/13/2017.
 */
import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {SF00503Data} from "../SF00503.data";
import {Constants} from "../../../../helper/constants";
import {Router} from "@angular/router";
import {FormatUtil} from "../../../../util/format-util";
import {CustomCustomerGoal} from "../../../../model/CustomCustomerGoal.model";
import MathUtil from "../../../../util/math-util";
import Messages from "../../../../helper/message";
import {MSG} from "../../../../helper/message";
import {SF00503Helper} from "../SF00503.helper";

declare let $: JQueryStatic;

/**
 * TOP &gt; 営業目標登録 ... 個人別目標タブの担当一覧セクションの各要素
 */
@Component({
    selector: "div[sf0050310]",
    templateUrl: "SF0050310.component.html"
})
export class SF0050310Component implements OnInit {
    customerGoalOld: CustomCustomerGoal;
    @Input() index: number;

    @Output() onDataChanged: EventEmitter<any> = new EventEmitter();
    @Output() changeSaveCustomerGoal: EventEmitter<any> = new EventEmitter();

    /**
     * 次年度目標 (単位: 千円)
     * 添字: [sfr_sf_customer_goal_item.type][月]  (月は 0: 4月, 1: 5月, ..., 11: 3月)
     */
    goldCustomerOld: number[][] = [];
    /**
     * 今年度実績 (単位: 円)
     * 添字: [sfr_sf_customer_goal_item.type][月]  (月は 0: 4月, 1: 5月, ..., 11: 3月)
     */
    goldCustomerOldBefore: number[][] = [];

    /**
     * 次年度目標 合算 (単位: 千円)
     * 添字: [月]  (月は 0: 4月, 1: 5月, ..., 11: 3月)
     */
    goldOldCus: number[] = [];
    /**
     * 今年度実績 合算 (単位: 円)
     * 添字: [月]  (月は 0: 4月, 1: 5月, ..., 11: 3月)
     */
    goldOldBeforeCus: number[] = [];
    /**
     * 前年比 (単位: %)  または '-'
     * 添字: [月]  (月は 0: 4月, 1: 5月, ..., 11: 3月)
     */
    interestRateCus: (number|string)[] = [];
    /**
     * 新規比 (単位: %)  または '-'
     * 添字: [月]  (月は 0: 4月, 1: 5月, ..., 11: 3月)
     */
    interestRateNews: (number|string)[] = [];

    type1OldAfter: number = 0;
    type2OldAfter: number = 0;
    type3OldAfter: number = 0;
    type1OldBefore: number = 0;
    type2OldBefore: number = 0;
    type3OldBefore: number = 0;
    totalOldAfter: number = 0;
    totalOldBefore: number = 0;
    interestRateOld: any;
    interestRateNew: any;

    ngOnInit(): void {
        this.customerGoalOld = this.sf00503Data.customCustomerGoalTab3[this.index];

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

    updateDataByYear() {
        // create this.sf00503Data.userGoal.goalItems
        // if this.sf00503Data.userGoal.goalItems == undefined || this.sf00503Data.userGoal.goalItems.length == 0
        let goalItems_1 = this.customerGoalOld.goalItems;

        // defined list goldOld and goldNew
        for (let i = 0; i < this.sf00503Data.rows.length; i++) {
            for (let j = 0; j < this.sf00503Data.columns.length; j++) {
                if (goalItems_1) {
                    goalItems_1.forEach(goalItem => {
                        // map data goalOld
                        if (this.sf00503Data.rows[i] == goalItem.type
                            && this.sf00503Data.columns[j] == goalItem.month) {
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


    // get/set
    get dateUpdate(): Date {
        return this.customerGoalOld.updatedDate;
    }

    get customerCode(): string {
        return this.customerGoalOld.customer.customerCode;
    }

    get saleName(): string {
        return this.customerGoalOld.user.username;
    }

    get saleOld(): string {
        if (this.customerGoalOld.customer.customerContact == undefined) {
            return "";
        } else {
            return "担当: " + this.customerGoalOld.customer.customerContact;
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

        // calculator interestedRateOld
        if (this.totalOldBefore && this.totalOldBefore > 0){
            this.interestRateOld = MathUtil.round(this.totalOldAfter * 100 / this.totalOldBefore, 1);
            if (this.interestRateOld > 1000000) {
                this.interestRateOld = '∞';
            }
        }
        else
            this.interestRateOld = Constants.HYPHEN;
        // calculator interestedRateNew
        if (this.totalOldAfter > 0)
            this.interestRateNew
                = MathUtil.round(this.sumTotalCustomerGoalNew(this.customerGoalOld.interestedRateNew) * 100 / this.totalOldAfter, 1);
        else
            this.interestRateNew = Constants.HYPHEN;


        for (let i = 0; i < this.sf00503Data.columns.length; i++) {
            this.goldOldCus[i] = FormatUtil.isNaN(this.goldCustomerOld[0][i])
                + FormatUtil.isNaN(this.goldCustomerOld[1][i]) + FormatUtil.isNaN(this.goldCustomerOld[2][i]);

            this.goldOldBeforeCus[i] = FormatUtil.isNaN(this.goldCustomerOldBefore[0][i])
                              + FormatUtil.isNaN(this.goldCustomerOldBefore[1][i])
                              + FormatUtil.isNaN(this.goldCustomerOldBefore[2][i]);

            if (FormatUtil.isNaN(this.goldOldCus[i]) == 0) {
                this.interestRateNews[i] = Constants.HYPHEN;
            } else {
                this.interestRateNews[i] = MathUtil.round(this.customerGoalOld.interestedRateNew[i] * 100 / this.goldOldCus[i], 1);
            }

            if (FormatUtil.isNaN(this.goldOldBeforeCus[i]) == 0) {
                this.interestRateCus[i] = Constants.HYPHEN;
            } else {
                this.interestRateCus[i] = MathUtil.round(this.goldOldCus[i] * 100* 1000/ this.goldOldBeforeCus[i], 1);
            }
        }

    }

    sumTotalCustomerGoalNew(interestedRateNew: number[]) {
        let sum = 0;
        if (interestedRateNew) {
            interestedRateNew.forEach(item => {
                sum += item;
            });
        }

        return sum;
    }

    navigateSF00402() {
        if(!!this.customerCode){
            return this.router.navigate(['home/customer',this.customerCode]);
        }else{
            $.notify({message: Messages.get(MSG.COM.INF999)}, {type: 'info'});
        }
    }

    convertYenToThousanYen(value: number){
        return SF00503Helper.convertYenToThousanYen(value);
    }
}
