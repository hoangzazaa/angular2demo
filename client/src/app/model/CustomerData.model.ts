import {Customer} from "./core/Customer.model";
import {CustomerDataItem} from "./CustomerDataItem.model";
/**
 * Created by hoangtd on 2/14/2017.
 */
export class CustomerData {
    customer: Customer = new Customer();
    picId: number;
    year: number;
    customerDataItems: CustomerDataItem [] = [];


    public setCustomerData(data: any) {
        this.picId = data["picId"];
        this.year = data["year"];

        if (data["customer"] !== undefined) {
            this.customer = new Customer();
            this.customer.setCustomer(data["customer"]);
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