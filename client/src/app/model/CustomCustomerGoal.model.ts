import {CustomerGoal} from "./core/CustomerGoal.model";
import {CustomerDataItem} from "./CustomerDataItem.model";
import {Customer} from "./core/Customer.model";
import {CustomerGoalItem} from "./core/CustomerGoalItem.model";
import {User} from "./core/User.model";
import {Department} from "./core/Department.model";
/**
 * Created by hoangtd on 2/18/2017.
 */
export class CustomCustomerGoal extends CustomerGoal {

    /**
     * 売上実績値
     * 
     * 添字: sfr_sf_customer_goal_item.type * 3 + 月  (月は 4月=0, 5月=1, ... 3月=11)
     */
    customerDataItems: CustomerDataItem[]  = [];
    /**
     * 新規比率
     * 
     * 添字: 月  (月は 4月=0, 5月=1, ... 3月=11)
     */
    interestedRateNew: number[] = [];
    goalType: number = 0;
    _hashCode: any;

    public setCustomCustomerGoal(data: any) {
        this.id = data["id"];
        this.createdUser = data["createdUser"];
        this.updatedUser = data["updatedUser"];
        this.createdDate = data["createdDate"] != undefined ? new Date(data["createdDate"]) : undefined;
        this.updatedDate = data["updatedDate"] != undefined ? new Date(data["updatedDate"]) : undefined;
        this.year = data["year"];
        this.activityPolicy = data["activityPolicy"];
        this.customerId = data["customerId"];
        this.picId = data["picId"];
        this.departmentId = data["departmentId"];
        this.goalType = data["goalType"];

        if (data["customer"] !== undefined) {
            this.customer = new Customer();
            this.customer.setCustomer(data["customer"]);
        }

        if (data["department"] !== undefined) {
            this.department = new Department();
            this.department.setDepartment(data["department"]);
        }

        if (data["user"] !== undefined) {
            this.user = new User();
            this.user.setUser(data["user"]);
        }

        if (data["goalItems"] !== undefined) {
            this.goalItems = [];
            for (var i = 0; i < data["goalItems"].length; i++) {
                let tmp = new CustomerGoalItem();
                tmp.setCustomerGoalItem(data["goalItems"][i]);
                this.goalItems.push(tmp);
            }
        }

        if (data["customerDataItems"] !== undefined) {
            this.customerDataItems = [];
            for (var i = 0; i < data["customerDataItems"].length; i++) {
                let tmp = new CustomerDataItem();
                tmp.setCustomerDataItem(data["customerDataItems"][i]);
                this.customerDataItems.push(tmp);
            }
        }
    }
}
