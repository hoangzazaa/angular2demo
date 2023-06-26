import { Component, Input } from "@angular/core";
import { SF00301_Deal } from '../model/SF00301_Deal.model';

/**
 * TOP &gt; 案件概況 のリピート案件一覧セクション
 */
 @Component({
    selector: "sf0030110-repeatDeal",
    templateUrl: "SF0030110.RepeatDeal.component.html"
})
export class SF0030110Component {
    /** 現在の案件 */
    @Input() deal: SF00301_Deal;
    /** 元案件とリピート案件の配列 */
    @Input() repeatDeals: SF00301_Deal[];
}
