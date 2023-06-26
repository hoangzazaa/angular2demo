/**
 * Created by hoangtd on 2/13/2017.
 */
import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import {SF00503Data} from "../SF00503.data";
import {User} from "../../../../model/core/User.model";
import {SF00503Service} from "../SF00503.service";
import {ItemEmit} from "../../../../model/ItemEmit";
import {CustomCustomerGoal} from "../../../../model/CustomCustomerGoal.model";
import {Constants} from "../../../../helper/constants";

/**
 * TOP &gt; 営業目標登録 ... 得意先別目標タブの既存得意先セクション
 */
@Component({
    selector: "sf0050304",
    templateUrl: "SF0050304.component.html"
})
export class SF0050304Component implements OnInit {

    @Output() onDataChanged: EventEmitter<any> = new EventEmitter();
    @Output() onDataSaved: EventEmitter<any> = new EventEmitter();
    @Output() filtersChanged: EventEmitter<any> = new EventEmitter();
    @Output() pageIndexChanged: EventEmitter<any> = new EventEmitter();

    constructor(public sf00503Data: SF00503Data, public sf00503Service: SF00503Service) {
    }

    ngOnInit(): void {
        this.sf00503Data.paginatedCustomerGoals = this.sf00503Data.displayCustomerGoalOlds.slice(0, this.pageSize);

        this.sf00503Data.calculatorCustomer();
    }

    get filters(): {limitRule: symbol, sortRule: symbol, customerName: string} {
        return this.sf00503Data.filters;
    }

    get pageSize(): number {
        return this.sf00503Data.CUSTOMER_GOAL_PAGE_SIZE;
    }

    onPageChange(event: number): void {
        this.pageIndexChanged.emit(event);
    }


    get paginatedCustomerGoals(): CustomCustomerGoal[] {
        return this.sf00503Data.paginatedCustomerGoals;
    }

    get record() {
        if (this.sf00503Data.displayCustomerGoalOlds) {
            return this.sf00503Data.displayCustomerGoalOlds.length;
        }

        return 0;
    }

    get SELECT_ANY_SALE(): number {
        return this.sf00503Data.ANY_RESPONSIBLE_PERSON;
    }

    get userPic(): number {
        return this.sf00503Data.salePerson;
    }

    set userPic(value: number) {
        this.sf00503Data.salePerson = value;
    }

    get users(): User[] {
        return this.sf00503Data.users;
    }

    // save data customer goal
    saveCustomerGoal(itemEmit: ItemEmit) {
        let message = "Customer goal item saved!";

        this.sf00503Service.saveCustomerGoal(itemEmit.data).then(data => {
            this.sf00503Data.paginatedCustomerGoals[itemEmit.index].id = data.customerGoal.id;
            this.sf00503Data.paginatedCustomerGoals[itemEmit.index].updatedDate = data.customerGoal.updatedDate;
            this.sf00503Data.paginatedCustomerGoals[itemEmit.index].goalItems.forEach(item => {
                data.customerGoal.goalItems.forEach(newItem => {
                    item.id = newItem.id;
                })
            });

            this.emitDataSavedEvent(itemEmit.index);
            $.notify({message: message}, {type: 'success'});
        });

    }

    onDisplayLimitChanged(limitRule: symbol) {
        this.filters.limitRule = limitRule;
    }

    onSortingRuleChanged(sortingRule: symbol) {
        this.filters.sortRule = sortingRule;
    }

    submitFilter() {
        this.filtersChanged.emit();
    }

    emitDataChangedEvent(idx) {
        this.onDataChanged.emit(idx);
    }

    emitDataSavedEvent(idx) {
        this.onDataSaved.emit(idx);
    }

}
