/**
 * Created by hoangtd on 2/13/2017.
 */
import {Component, Output, EventEmitter} from "@angular/core";
import {SF00503Data} from "../SF00503.data";
import {CustomCustomerGoal} from "../../../../model/CustomCustomerGoal.model";

/**
 * TOP &gt; 営業目標登録 ... 個人別目標タブの担当一覧セクション
 */
@Component({
    selector: "sf0050309",
    templateUrl: "SF0050309.component.html"
})
export class SF0050309Component {
    get paginatedCustomerGoalsTab3(): CustomCustomerGoal[] {
        return this.sf00503Data.customCustomerGoalTab3;
    }

    constructor(public sf00503Data: SF00503Data) {
    }

}
