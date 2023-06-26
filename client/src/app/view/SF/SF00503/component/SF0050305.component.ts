/**
 * Created by hoangtd on 2/13/2017.
 */
import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import {SF00503Data} from "../SF00503.data";
import {SF00503Service} from "../SF00503.service";
import {ItemEmit} from "../../../../model/ItemEmit";
import Messages, {MSG} from "../../../../helper/message";
import {User} from "../../../../model/core/User.model";
import {CustomCustomerGoal} from "../../../../model/CustomCustomerGoal.model";

declare var $: JQueryStatic;

/**
 * TOP &gt; 営業目標登録 ... 得意先別目標タブの新規得意先セクション
 */
@Component({
    selector: "sf0050305",
    templateUrl: "SF0050305.component.html"
})
export class SF0050305Component implements OnInit {

    constructor(public sf00503Data: SF00503Data, public sf00503Service: SF00503Service) {
    }

    @Output() onCustomerGoalsDataChanged: EventEmitter<any> = new EventEmitter();
    @Output() onCustomerGoalsAdded: EventEmitter<any> = new EventEmitter();
    @Output() onCustomerGoalsDeleted: EventEmitter<any> = new EventEmitter();
    @Output() onCustomerGoalsSaved: EventEmitter<any> = new EventEmitter();

    ngOnInit(): void {

        this.sf00503Data.calculatorCustomer();
    }

    addCustomerGoalNew() {
        let customerGoal = new CustomCustomerGoal();
        // set goal item
        customerGoal.goalItems = [];
        // set year
        customerGoal.year = this.sf00503Data.year;
        // set department user
        customerGoal.user = new User();

        customerGoal.departmentId = this.sf00503Data.department.id;
        customerGoal._hashCode = new Date().getTime();

        this.sf00503Data.customerGoalNews.unshift(customerGoal);
        this.sf00503Data.customerGoalsYear.unshift(customerGoal);

        this.onCustomerGoalsAdded.emit();
    }

    // save customer goal
    saveCustomerGoal(itemEmit: ItemEmit) {
        let message = "";
        if (itemEmit.data.id == undefined) {
            message = "Save customer goal item success";
        } else {
            message = "Update customer goal item success";
        }

        this.sf00503Service.saveCustomerGoal(itemEmit.data).then(data => {
            // update item data
            this.sf00503Data.customerGoalNews[itemEmit.index].id = data.customerGoal.id;

            this.sf00503Data.customerGoalNews[itemEmit.index].goalItems = data.customerGoal.goalItems;

            this.onCustomerGoalsSaved.emit();
            $.notify({message: message}, {type: 'success'});
        });
    }

    // delete customer goal
    deleteCustomerGoal(itemEmit: ItemEmit) {
        let self = this;
        swal({
                title: "",
                text: Messages.get(MSG.SF00503.INF003),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d26a5c",
                confirmButtonText: Messages.get(MSG.SF00503.INF005),
                closeOnConfirm: true
            },
            function () {
                self.sf00503Service.deleteCustomerGoal(itemEmit.data.id).then(data => {
                    if (itemEmit.data._hashCode) {
                        self.sf00503Data.customerGoalNews = $.grep(self.sf00503Data.customerGoalNews, (customerGoal, index) => {
                            return customerGoal._hashCode !== itemEmit.data._hashCode;
                        })

                        self.sf00503Data.customerGoalsYear = $.grep(self.sf00503Data.customerGoalsYear, (customerGoal, index) => {
                            return customerGoal._hashCode !== itemEmit.data._hashCode;
                        })
                    } else {
                        // remove item from list
                        self.sf00503Data.customerGoalNews.splice(itemEmit.index, 1);

                        self.sf00503Data.customerGoalsYear.splice(self.indexCustomerGoal(itemEmit.data), 1);
                    }

                    self.sf00503Data.calculatorCustomer();

                    $.notify({message: 'Delete customer goal item success'}, {type: 'info'});
                });

            });

    }

    indexCustomerGoal(customerGoal: CustomCustomerGoal) {
        // get index by id customerGoal
        for (let i = 0; i < this.sf00503Data.customerGoalsYear.length; i++) {
            if (this.sf00503Data.customerGoalsYear[i].year == customerGoal.year
                && this.sf00503Data.customerGoalsYear[i].picId == customerGoal.picId
                && !customerGoal.customerId) {

                return i;
            }
        }
    }

    emitCustomerGoalsDataChangedEvent() {
        this.onCustomerGoalsDataChanged.emit();
    }

}
