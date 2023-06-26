import {Component, Input} from "@angular/core";
import {SF0030209Helper} from "./SF0030209.helper";
import {EMBOSSING, SURFACE_TREATMENT, SURFACE_TREATMENT_DETAIL} from "../../helper/master-option";

declare var $: JQueryStatic;
declare var App: any;

@Component({
    templateUrl: "SF0030209.component.html",
    selector: 'sf0030209'
})
/**
 * Component quotation info
 * @author DungTQ
 * */

export class SF0030209Component {
    @Input()
    helper: SF0030209Helper;

    get isRequestDesign() {
        return this.helper.getSF00302Data().isRequestDesign;
    }

    get isView() {
        if (this.isRequestDesign) {
            return false;
        } else {
            return this.helper.getSF00302Data().isView;
        }
    }

    get isCreateNewProduct() {
        return this.helper.getSF00302Data().isCreateNewProduct;
    }

    isHighlighted(input) {
        return this.helper.getSF00302Data().highlightedTracker.isHighlightedProperty(input);
    }

    /**
     * Get state if Product Stamping Accordion is filled with data or not
     * */
    get stateSurfaceTreatment(): boolean {
        if (this.helper.getSF00302Data().product.surfaceTreatmentIdF != undefined &&
            this.helper.getSF00302Data().product.surfaceTreatmentIdB != undefined) {
            return true;
        } else {
            return false;
        }
    }

    // surfaceTreatmentIdF
    get surfaceTreatmentIdF(): number {
        if (this.helper.getSF00302Data().product.surfaceTreatmentIdF == undefined) {
            this.helper.getSF00302Data().product.surfaceTreatmentIdF = 0;
        }
        return this.helper.getSF00302Data().product.surfaceTreatmentIdF;
    }

    set surfaceTreatmentIdF(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('surfaceTreatmentIdF');
        this.helper.getSF00302Data().product.surfaceTreatmentIdF = value;
        if(this.helper.getSF00302Data().product.printMethod==1) {
            this.helper.calcColorPlateCost(1);
            this.helper.calcColorPrintLoss(1);
            this.helper.calcColorCostPerPacket(1);
            this.helper.calcColorBasicCost(1);
            this.helper.calcColorThroughWage(1);
            this.helper.calcColorSpecial(1);
        }
        if ((this.helper.getSF00302Data().product.printMethod == 0 || this.helper.getSF00302Data().product.printMethod == 2) && this.helper.getSF00302Data().product.surfaceTreatmentIdF < 19
            && this.helper.getSF00302Data().product.surfaceTreatmentIdF != 8
            && this.helper.getSF00302Data().product.surfaceTreatmentIdF != 17) {
            this.helper.getSF00302Data().productOutput.colorPlateCostF = 0;
            this.helper.getSF00302Data().productOutput.colorPrintThroughWageF = 0;
            this.helper.getSF00302Data().productOutput.colorPrintBasicCostF = 0;
            this.helper.getSF00302Data().productOutput.colorPrintTotalCostF = 0;
            this.helper.getSF00302Data().productOutput.colorPrintPerPacketCostF = 0;
            this.helper.getSF00302Data().productOutput.colorPrintSpecialCostF = 0;
            this.helper.getSF00302Data().productOutput.colorPrintTotalCostF = 0;
        }

        this.helper.calcSurfaceBasicCost(1);
        this.helper.calcSurfaceThroughWage(1);
        this.helper.calcSurfaceTotalCost(1);


    }

    // surfaceTreatmentIdB
    get surfaceTreatmentIdB(): number {
        if (this.helper.getSF00302Data().product.surfaceTreatmentIdB == undefined) {
            this.helper.getSF00302Data().product.surfaceTreatmentIdB = 0;
        }
        return this.helper.getSF00302Data().product.surfaceTreatmentIdB;
    }

    set surfaceTreatmentIdB(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('surfaceTreatmentIdB');
        this.helper.getSF00302Data().product.surfaceTreatmentIdB = value;
        if(this.helper.getSF00302Data().product.printMethod==1) {
            this.helper.calcColorPlateCost(2);
            this.helper.calcColorPrintLoss(2);
            this.helper.calcColorCostPerPacket(2);
            this.helper.calcColorBasicCost(2);
            this.helper.calcColorThroughWage(2);
            this.helper.calcColorSpecial(2);
        }
        if ((this.helper.getSF00302Data().product.printMethod == 0 || this.helper.getSF00302Data().product.printMethod == 2) && this.helper.getSF00302Data().product.surfaceTreatmentIdB < 19
            && this.helper.getSF00302Data().product.surfaceTreatmentIdB != 8
            && this.helper.getSF00302Data().product.surfaceTreatmentIdB != 17) {
            this.helper.getSF00302Data().productOutput.colorPlateCostB = 0;
            this.helper.getSF00302Data().productOutput.colorPrintThroughWageB = 0;
            this.helper.getSF00302Data().productOutput.colorPrintBasicCostB = 0;
            this.helper.getSF00302Data().productOutput.colorPrintTotalCostB = 0;
            this.helper.getSF00302Data().productOutput.colorPrintPerPacketCostB = 0;
            this.helper.getSF00302Data().productOutput.colorPrintSpecialCostB = 0;
            this.helper.getSF00302Data().productOutput.colorPrintTotalCostB = 0;
        }

        this.helper.calcSurfaceBasicCost(2);
        this.helper.calcSurfaceThroughWage(2);
        this.helper.calcSurfaceTotalCost(2);


    }

    // embossingID
    get embossingID(): boolean {
        if (this.helper.getSF00302Data().product.embossingID) {
            return true;
        } else {
            return false;
        }
    }

    set embossingID(value: boolean) {
        this.helper.getSF00302Data().highlightedTracker.touch('embossingID');
        if (value == true) {
            this.helper.getSF00302Data().product.embossingID = 5;
        } else {
            this.helper.getSF00302Data().product.embossingID = Number.NaN;
        }

        this.helper.calcSurfaceBasicCost(3);
        this.helper.calcSurfaceThroughWage(3);
        this.helper.calcSurfaceTotalCost(3);

    }

    get embossingCode() {
        if (this.helper.getSF00302Data().product.embossingCode == undefined) {
            this.helper.getSF00302Data().product.embossingCode = "0"
        }
        return this.helper.getSF00302Data().product.embossingCode;
    }

    set embossingCode(value: string) {
        this.helper.getSF00302Data().product.embossingCode = value;
        if (value == "0") {
            this.embossingID = false;
        } else {
            this.embossingID = true;
        }
    }

    get surfaceOption() {
        return SURFACE_TREATMENT;
    }

    get embossingOption() {
        return EMBOSSING;
    }

    // setOtherNote1() {
    //     if (this.helper.getSF00302Data().product.specialNote1Flag != 1) {
    //         if (this.helper.getSF00302Data().product.surfaceTreatmentIdF == null || this.helper.getSF00302Data().product.surfaceTreatmentIdF == 0) {
    //             if (this.helper.getSF00302Data().product.surfaceTreatmentIdB != null && this.helper.getSF00302Data().product.surfaceTreatmentIdB != 0) {
    //                 SURFACE_TREATMENT_DETAIL.forEach(data => {
    //                     if (data.id == this.helper.getSF00302Data().product.surfaceTreatmentIdB) {
    //                         this.helper.getSF00302Data().product.memo1 = data.name;
    //                     }
    //                 })
    //             }
    //         } else {
    //             if (this.helper.getSF00302Data().product.surfaceTreatmentIdF != null && this.helper.getSF00302Data().product.surfaceTreatmentIdF != 0) {
    //                 SURFACE_TREATMENT_DETAIL.forEach(data => {
    //                     if (data.id == this.helper.getSF00302Data().product.surfaceTreatmentIdF) {
    //                         this.helper.getSF00302Data().product.memo1 = data.name;
    //                     }
    //                 })
    //             }
    //             if (this.helper.getSF00302Data().product.surfaceTreatmentIdB != null && this.helper.getSF00302Data().product.surfaceTreatmentIdB != 0) {
    //                 SURFACE_TREATMENT_DETAIL.forEach(data => {
    //                     if (data.id == this.helper.getSF00302Data().product.surfaceTreatmentIdB) {
    //                         this.helper.getSF00302Data().product.memo1 += "／" + data.name;
    //                     }
    //                 })
    //             }
    //         }
    //     }
    // }
}
