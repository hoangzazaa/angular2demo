import {Component} from "@angular/core";
import {ProductInfoBoxComponent} from "../ProductInfoBox.component";

@Component({
    selector: "[manufacture]",
    templateUrl: "Manufacture.component.html"
})
export class ManufactureComponent {

    radioId: string;

    constructor(private component: ProductInfoBoxComponent) {
        this.radioId = this.component.data.product.pib_code;
    }

    //region Bindings

    get manufacture() {
        return this.component.data.manufacture;
    }

    //endregion
}