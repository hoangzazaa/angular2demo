import {Component} from "@angular/core";
import {ProductInfoBoxComponent} from "../ProductInfoBox.component";
import {PIBProduct} from "../model/PIBProduct.model";

@Component({
    selector: "[basic-info]",
    templateUrl: "BasicInfo.component.html"
})
export class BasicInfoComponent {

    constructor(private component: ProductInfoBoxComponent) {
    }

    //region Bindings

    // get departmentList(): DepartmentModel[] {
    //     return this.page.pageData.departments;
    // }
    //
    // get selectedDepartment(): DepartmentModel {
    //     return this.page.pageData.selectedFilter.department;
    // }

    get product(): PIBProduct {
        return this.component.data.product;
    }

    get isInputLot(): boolean {
        return this.component.data.isInputLot;
    }

    get isInputPrice(): boolean {
        return this.component.data.isInputPrice;
    }

    get isDisplayAmount(): boolean {
        return !this.component.data.isInputPrice;
    }

    //endregion

    //region Screen actions

    //endregion
}