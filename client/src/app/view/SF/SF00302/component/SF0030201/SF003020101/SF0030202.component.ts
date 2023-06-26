import {AfterViewInit, Component, Input} from "@angular/core";
import {SF00302Service} from "../../../SF00302.service";
import Messages, {MSG} from "../../../../../../helper/message";
import {isNumber} from "util";
import {ActivatedRoute, Router} from "@angular/router";
import ValidatorUtil from "../../../../../../util/validator-util";
import {Product} from "../../../../../../model/core/Product.model";
import {ProductCommonFee} from "../../../../../../model/core/ProductCommonFee.model";
import {MstWooden} from "../../../../../../model/core/MstWooden.model";
import {SF0030202Helper} from "./SF0030202.helper";
import MathUtil from "../../../../../../util/math-util";
import DataUtil from "../../../../../../util/data-util";

declare var $: JQueryStatic;
declare var App: any;

/**
 * 試算表 (紙器・貼合)
 * 
 * <pre>
 * 各製品の試算表は
 * Component                    内容
 * --------------------------------------------------------------------------------
 * sf0030202                    試算表 (紙器・貼合)
 * sf0030216                    試算表 (美粧)
 * sf0030221                    試算表 (段ボールA式)
 * sf0030224                    試算表 (片段)
 * </pre>
 * 
 * @author DungTQ
 * */
@Component({
    selector: "sf0030202",
    templateUrl: "SF0030202.component.html"
})
export class SF0030202Component implements AfterViewInit {
    @Input() helper: SF0030202Helper;

    ngAfterViewInit(): void {
        App.initHelpers(['table-tools']);
    }

    get isView() {
        if (this.helper.getSF00302Data().isRequestDesign) {
            return false;
        } else {
            return this.helper.getSF00302Data().isView;
        }
    }

    private ix: number = 0;

    constructor(public sv00302Service: SF00302Service, private route: ActivatedRoute, public router: Router) {

    }

    saveOutput() {
        // this.helper.checkChangeDataProduct();
        // this.helper.checkChangeDataProductOutput();
        this.helper.checkChangeDataOffer();

        if (this.helper.validateFormOutput()) {
            this.helper.sf00302Data.checkInputSave = true;  //（変更チェックを外す。一旦暫定対応。）
            this.helper.sf00302Data.checkOutputSave = true;  //（変更チェックを外す。一旦暫定対応。）
            if (this.helper.sf00302Data.checkInputSave && this.helper.sf00302Data.checkOutputSave) {

                if (this.helper.getSF00302Data().checkInputSave) {
                    if (this.helper.validateForm()) {
                        this.helper.getSF00302Data().xCheck = false;
                        this.helper.getSF00302Data().yCheck = false;
                    } else {
                        this.helper.getSF00302Data().yCheck = true;

                        $.notify({message: Messages.get(MSG.SF00301.ERR015)}, {type: 'danger'});
                        return;
                    }
                }

                let product = new Product();
                product.setProduct(this.helper.sf00302Data.product);
                // Comment fix bug 3057
                /*//Check if select なし, then update data to null
                if (product.pasteId == 0) {
                    product.pasteId = null;
                }
                if (product.stampingId == 0) {
                    product.stampingId = null;
                }
                if (product.paperId == 0) {
                    product.paperId = null;
                }
                if (product.surfaceTreatmentIdF == 0) {
                    product.surfaceTreatmentIdF = null;
                }
                if (product.surfaceTreatmentIdB == 0) {
                    product.surfaceTreatmentIdB = null;
                }
                if (product.packingId == 0) {
                    product.packingId = null;
                }
                if (product.shippingCostId == 0) {
                    product.shippingCostId = null;
                }*/

                let productOutputs = [];
                Object.assign(productOutputs, this.helper.sf00302Data.productOutputs);
                product.productOutputs = productOutputs;
                // push product offer
                for (let i = 0; i < 5; i++) {
                    product.productOutputs[i].offers = [];
                    this.helper.sf00302Data.offers[i].productOutput = undefined;
                    product.productOutputs[i].offers.push(this.helper.sf00302Data.offers[i]);
                }

                let productCommonFee = new ProductCommonFee();
                product.productCommon = Object.assign(productCommonFee, this.helper.sf00302Data.productCommonFee);

                this.sv00302Service
                    .sv0030203UpdateProduct(product, this.helper.sf00302Data.dealCode)
                    .then(data => {

                        // reassign product outputs to display
                        let productOutputs = [];
                        Object.assign(productOutputs, data.product.productOutputs);
                        this.helper.sf00302Data.productOutputs = productOutputs;

                        // Reassign Wooden
                        let wooden = new MstWooden();
                        Object.assign(wooden, data.product.wooden);
                        this.helper.sf00302Data.product.wooden = wooden;

                        // refresh indexing product output
                        let currentTabIndex = $(".tabOutput.active").index();
                        this.helper.sf00302Data.productOutput = productOutputs[currentTabIndex];

                        // Backup (Used for reset function)
                        // Backup Output
                        this.helper.sf00302Data.bkProductLots = [];
                        for (let i = 0; i < 5; i++) {
                            if (this.helper.sf00302Data.product.productOutputs[i] == undefined) {
                                this.helper.sf00302Data.bkProductLots.push(undefined);
                            } else {
                                this.helper.sf00302Data.bkProductLots.push(this.helper.sf00302Data.product.productOutputs[i].lot);
                            }
                        }

                        //Backup Offer
                        this.helper.sf00302Data.bkProductOffers = [];
                        // init backup data - offer
                        for (let i = 0; i < 5; i++) {
                            if (this.helper.sf00302Data.offers[i] == undefined) {
                                this.helper.sf00302Data.bkProductOffers.push(undefined);
                            } else {
                                this.helper.sf00302Data.bkProductOffers.push(this.helper.sf00302Data.offers[i].unitPrice);
                            }
                        }

                        //Reassing Product Common Fee
                        let fee = new ProductCommonFee();
                        Object.assign(fee, data.product.productCommon);
                        this.helper.sf00302Data.productCommonFee = fee;

                        $.notify(
                            {
                                message: Messages.get(MSG.SF00302.INF006)
                            },
                            {
                                type: 'info'
                            });

                        // reset old data to validate - follow 3057
                        this.helper.getSF00302Data().productOutputsOld = DataUtil.cloneObject(this.helper.sf00302Data.productOutputs);
                        this.helper.getSF00302Data().productOld = DataUtil.cloneObject(this.helper.sf00302Data.product);
                        this.helper.getSF00302Data().offersOld = DataUtil.cloneObject(this.helper.sf00302Data.offers);
                        this.helper.getSF00302Data().paperNormValueOld = DataUtil.cloneObject(this.helper.sf00302Data.paperNormValue);

                        //Reset Check Input Output
                        this.helper.getSF00302Data().checkInputSave = false;
                        this.helper.getSF00302Data().checkOutputSave = false;
                        this.helper.getSF00302Data().checkCommonSave = false;
                    });
            } else if (this.helper.sf00302Data.checkOutputSave && !this.helper.sf00302Data.checkInputSave) {
                // Save the current product output
                this.helper.sf00302Data.productOutput.offers = [];
                this.helper.sf00302Data.indexOffer.productOutput = this.helper.sf00302Data.productOutput;
                this.sv00302Service.sv0030211UpdateOffer(this.helper.sf00302Data.indexOffer, this.helper.sf00302Data.dealCode
                    , this.helper.sf00302Data.product.productCode).then(data => {
                    //Notify
                    $.notify({message: Messages.get(MSG.SF00302.INF008)}, {type: 'success'});
                    this.helper.getSF00302Data().productOutputsOld = DataUtil.cloneObject(this.helper.sf00302Data.productOutputs);
                    this.helper.getSF00302Data().offersOld = DataUtil.cloneObject(this.helper.sf00302Data.offers);
                    // Backup for reset
                    this.helper.sf00302Data.bkProductOffers[this.ix] = this.unitPrice;
                    this.helper.sf00302Data.bkProductLots[this.ix] = this.helper.sf00302Data.productOutput.lot;
                    this.helper.sf00302Data.checkOutputSave = false;

                    //Check to reset checking save
                    for (let i = 0; i < 5; i++) {
                        if ((this.helper.sf00302Data.productOutputs[i].lot !== this.helper.sf00302Data.bkProductLots[i]) || (this.helper.sf00302Data.offers[i].unitPrice !== this.helper.sf00302Data.bkProductOffers[i])) {
                            this.helper.sf00302Data.checkOutputSave = true;
                        }
                    }
                }).catch(err => {
                    $.notify({message: Messages.get(MSG.SF00302.ERR003)}, {type: 'danger'});
                })
            } else {
                $.notify({message: Messages.get(MSG.SF00302.INF018)}, {type: 'info'});
            }
        } else {
            $.notify({message: Messages.get(MSG.SF00301.ERR015)}, {type: 'danger'});
        }
    }

    /*Check product create*/
    get checkProductCreated(): boolean {
        if (this.helper.sf00302Data.product.id == null) {
            return false;
        }
        return true;
    }


    /**
     * Chane the current product output displaying in page
     * @param {number} id: The index of product output
     */
    pageProductOutput(id: number) {
        // Change product output with index id to the current output
        this.helper.sf00302Data.indexOutput = id;
        this.helper.sf00302Data.productOutput = this.helper.sf00302Data.productOutputs[id];
        // change offer
        this.helper.sf00302Data.indexOffer = this.helper.sf00302Data.offers[id];
        // Change current tab effect
        $(".tabOutput").removeClass("active");
        $("#tab0" + id).parent().addClass("active");
        this.ix = id;
    }

    get lot(): number {
        this.helper.getSF00302Data().productOutput.lot = MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.lot);
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.lot);
    }

    set lot(value: number) {
        // change lot
        if (ValidatorUtil.isNotEmpty(value)) {
            this.helper.sf00302Data.productOutput.lot = value;
        }

        this.helper.calcThroughNumber();
        this.helper.calcPaperActualWeight();
        this.helper.calcPaperUnitPrice();
        this.helper.calcPaperTotalCost();
        this.helper.calcLaminationUnitPrice();
        this.helper.calcLaminationSheetCost();
        this.helper.calcLaminationTotalCost();
        if(this.helper.sf00302Data.product.printMethod==2){
            this.helper.calcDigitalBasicCost();
            this.helper.calcDigitalThroughWage();
        }
        if (this.helper.sf00302Data.product.surfaceTreatmentIdF==8||this.helper.sf00302Data.product.surfaceTreatmentIdF==17||this.helper.sf00302Data.product.surfaceTreatmentIdF>18
        ||this.helper.sf00302Data.product.printMethod==1) {
            this.helper.calcColorPlateCost(1);
            this.helper.calcColorPrintLoss(1);
            this.helper.calcColorCostPerPacket(1);
            this.helper.calcColorBasicCost(1);
            this.helper.calcColorThroughWage(1);
            this.helper.calcColorSpecial(1);
            this.helper.calcColorTotalCost(1);
        }
        if (this.helper.sf00302Data.product.surfaceTreatmentIdB==8||this.helper.sf00302Data.product.surfaceTreatmentIdB==17||this.helper.sf00302Data.product.surfaceTreatmentIdB>18
        ||this.helper.sf00302Data.product.printMethod==1) {
            this.helper.calcColorPlateCost(2);
            this.helper.calcColorPrintLoss(2);
            this.helper.calcColorCostPerPacket(2);
            this.helper.calcColorBasicCost(2);
            this.helper.calcColorThroughWage(2);
            this.helper.calcColorSpecial(2);
            this.helper.calcColorTotalCost(2);
        }
        this.helper.calcSurfaceBasicCost(1);
        this.helper.calcSurfaceThroughWage(1);
        this.helper.calcSurfaceTotalCost(1);
        this.helper.calcSurfaceBasicCost(2);
        this.helper.calcSurfaceThroughWage(2);
        this.helper.calcSurfaceTotalCost(2);
        this.helper.calcSurfaceBasicCost(3);
        this.helper.calcSurfaceThroughWage(3);
        this.helper.calcSurfaceTotalCost(3);
        this.helper.calcStampingPointsNumber();
        this.helper.calcStampingBasicCost();
        this.helper.calcStampingThroughWage();
        this.helper.calcStampingTotalCost();
        this.helper.calcWindowMaterialFee();
        this.helper.calcWindowTotalCost();
        this.helper.calcDieCuttingWeight();
        this.helper.calcDieCuttingLoss();
        this.helper.calcDieCuttingBasicCost();
        this.helper.calcDieCuttingThroughWage();
        this.helper.calcDieCuttingTotalCost();
        this.helper.calcPasteLoss();
        this.helper.calcPasteBasicCost();
        this.helper.calcPasteThroughWage();
        this.helper.calcPasteTotalCost();
        this.helper.calcOtherFee();
        this.helper.calcInspection();
        this.helper.calcPacking();
        this.helper.calcShippingCost();
        this.helper.calcSubTotal();
        this.helper.calcManagementCost();
        this.helper.calcEstimateTotal();
        this.helper.calcEstimateUnitPrice();
        this.helper.calcSubmittedTotal();
        this.helper.calcEstimateDiff(1);
        this.helper.calcEstimateDiff(2);
    }

    get unitPrice(): number {
        this.helper.getSF00302Data().indexOffer.unitPrice = MathUtil.checkNaN(this.helper.getSF00302Data().indexOffer.unitPrice);
        return MathUtil.checkNaN(this.helper.sf00302Data.indexOffer.unitPrice);

    }

    set unitPrice(value: number) {
        this.helper.sf00302Data.indexOffer.unitPrice = value;
        this.helper.calcSubmittedTotal();
        this.helper.calcEstimateDiff(1);
        this.helper.calcEstimateDiff(2);
    }

    get total(): number {
        if (this.helper.sf00302Data.indexOffer.total > 999999999) {
            return 999999999;
        }
        //http://fridaynight.vnext.vn/issues/2337
        return MathUtil.round(MathUtil.checkNaN(this.helper.sf00302Data.indexOffer.total), 0);
    }

    get profitRate(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.indexOffer.profitRate);
    }

    get paperActualWeight(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.paperActualWeight);
    }

    get paperUnitPrice(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.paperUnitPrice);
    }

    get paperTotalCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.paperTotalCost);
    }

    get colorPlateCostF(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPlateCostF);
    }


    get colorPrintLossF(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPrintLossF);
    }


    get colorPrintPerPacketCostF(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPrintPerPacketCostF);
    }

    get colorPrintBasicCostF(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPrintBasicCostF);
    }

    get colorPrintThroughWageF(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPrintThroughWageF);
    }

    get colorPrintSpecialCostF(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPrintSpecialCostF);
    }

    get colorPrintTotalCostF(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPrintTotalCostF);
    }

    get colorPlateCostB(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPlateCostB);
    }

    get colorPrintLossB(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPrintLossB);
    }

    get colorPrintPerPacketCostB(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPrintPerPacketCostB);
    }

    get colorPrintBasicCostB(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPrintBasicCostB);
    }

    get colorPrintThroughWageB(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPrintThroughWageB);
    }

    get colorPrintSpecialCostB(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPrintSpecialCostB);
    }

    get colorPrintTotalCostB(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPrintTotalCostB);
    }


    get surfaceTreatmentBasicCostF(): string {
        if (isNumber(this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostF)) {
            // Format to number style
            return this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else if (this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostF == undefined || this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostF == "") {
            return "0";
        }
        return this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostF;
    }


    get surfaceTreatmentThroughWageF(): string {
        if (isNumber(this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageF)) {
            // Format to number style
            return this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else if (this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageF == undefined || this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageF == "") {
            return "0";
        }
        return this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageF;
    }

    get surfaceTreatmentTotalCostF(): number {
        return this.helper.sf00302Data.productOutput.surfaceTreatmentTotalCostF;
    }


    get surfaceTreatmentBasicCostB(): string {
        if (isNumber(this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostB)) {
            // Format to number style
            return this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else if (this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostB == undefined || this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostB == "") {
            return "0";
        }
        return this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostB;
    }


    get surfaceTreatmentThroughWageB(): string {
        if (isNumber(this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageB)) {
            // Format to number style
            return this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else if (this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageB == undefined || this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageB == "") {
            return "0";
        }
        return this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageB;
    }

    get surfaceTreatmentTotalCostB(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.surfaceTreatmentTotalCostB);
    }

    get embossingBasicCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.embossingBasicCost);
    }

    get embossingThroughWage(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.embossingThroughWage);
    }

    get embossingTotalCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.embossingTotalCost);
    }

    get laminationUnitPrice(): number {
        if (this.helper.sf00302Data.productOutput.laminationUnitPrice == undefined) {
            this.helper.sf00302Data.productOutput.laminationUnitPrice = 0;
        }
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.laminationUnitPrice);
    }

    get laminationSheetCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.laminationSheetCost);
    }

    get laminationTotalCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.laminationTotalCost);
    }

    get dieCuttingLoss(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.dieCuttingLoss);
    }

    get dieCuttingBasicCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.dieCuttingBasicCost);
    }

    get dieCuttingThroughWage(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.dieCuttingThroughWage);
    }

    get dieCuttingTotalCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.dieCuttingTotalCost);
    }

    get stampingBasicCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.stampingBasicCost);
    }

    get stampingThroughWage(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.stampingThroughWage);
    }

    get stampingTotalCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.stampingTotalCost);
    }

    get windowMaterialFee(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.windowMaterialFee);
    }

    get windowTotalCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.windowTotalCost);
    }

    get pasteLoss(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.pasteLoss);
    }

    get pasteBasicCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.pasteBasicCost);
    }

    get pasteThroughWage(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.pasteThroughWage);
    }

    get pasteTotalCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.pasteTotalCost);
    }

    get inspection(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.inspection);
    }

    get packing(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.packing);
    }


    get managementCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.managementCost);
    }

    get fareLineService(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.fareLineService);
    }

    get cartonSpecialFare(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
    }

    get additionalTotalCarton(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
    }

    get estimatedTotal(): number {
        //http://fridaynight.vnext.vn/issues/2337
        return MathUtil.round(MathUtil.checkNaN(this.helper.sf00302Data.productOutput.estimatedTotal), 0);
    }

    get estimatedUnitPrice(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.estimatedUnitPrice);
    }

    get otherFee1(): number {
        return MathUtil.checkNaN(this.helper.getProductOutputOtherFee1());
    }

    get otherFee2(): number {
        return MathUtil.checkNaN(this.helper.getProductOutputOtherFee2());
    }

    get otherFee3(): number {
        return MathUtil.checkNaN(this.helper.getProductOutputOtherFee3());
    }

    get colorPrintTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getColorPrintTotalCost());
    }

    get isOffsetColor(): boolean {
        if (this.helper.sf00302Data.product.printMethod != 2) {
            return true;
        } else {
            return false;
        }
    }

    get surfaceTreatmentTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getSurfaceTreatmentTotalCost());
    }

    get inspectionPackingFareLineTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getInspectionPackingFareLineTotalCost());
    }

    get diaCuttingPasteTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getDieCuttingPasteTotalCost());
    }

    get otherFeeTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getOtherFeeTotalCost());
    }

    get otherFeeExpense1(): string {
        if (this.helper.sf00302Data.product.otherExpense1 != undefined && this.helper.sf00302Data.product.otherExpense1 != "") {
            return this.helper.sf00302Data.product.otherExpense1;
        } else {
            return "（項目名１）";
        }
    }

    get otherFeeExpense2(): string {
        if (this.helper.sf00302Data.product.otherExpense2 != undefined && this.helper.sf00302Data.product.otherExpense2 != "") {
            return this.helper.sf00302Data.product.otherExpense2;
        } else {
            return "（項目名２）";
        }
    }

    get otherFeeExpense3(): string {
        if (this.helper.sf00302Data.product.otherExpense3 != undefined && this.helper.sf00302Data.product.otherExpense3 != "") {
            return this.helper.sf00302Data.product.otherExpense3;
        } else {
            return "（項目名３）";
        }
    }

    resetOffer() {
        // reset lot
        this.lot = this.helper.sf00302Data.bkProductLots[this.ix];

        // set product common fee
        this.unitPrice = this.helper.sf00302Data.bkProductOffers[this.ix];
        this.helper.getSF00302Data().checkOutputSave = false;
    }

    get isNotCalculateSurfaceF(): boolean {
        if (this.helper.sf00302Data.product.surfaceTreatmentIdF == 8 || this.helper.sf00302Data.product.surfaceTreatmentIdF == 9) {
            return true;
        } else {
            return false;
        }
    }

    get isNotCalculateSurfaceB(): boolean {
        if (this.helper.sf00302Data.product.surfaceTreatmentIdB == 8 || this.helper.sf00302Data.product.surfaceTreatmentIdB == 9) {
            return true;
        } else {
            return false;
        }
    }

    get checkBorderLot(): { style: string, radius: string } {
        if (ValidatorUtil.isNotEmpty(this.helper.sf00302Data.product.id)) {
            if (this.helper.getSF00302Data().productRequiredItem.isSaveLot) {
                return this.helper.getSF00302Data().errFieldBorderCss;
            } else {
                return this.helper.getSF00302Data().noneFieldBorderCss;
            }
        } else {
            if (this.helper.getSF00302Data().productRequiredItem.isSaveLot) {
                return this.helper.getSF00302Data().errFieldBorderCss;
            } else {
                return this.helper.getSF00302Data().defaultFieldBorderCss;
            }
        }

    }

    get checkBorderUnitPrice(): { style: string, radius: string } {
        if (ValidatorUtil.isNotEmpty(this.helper.sf00302Data.product.id)) {
            if (this.helper.getSF00302Data().productRequiredItem.isSaveSubmittedUnitPrice) {
                return this.helper.getSF00302Data().errFieldBorderCss;
            } else {
                return this.helper.getSF00302Data().noneFieldBorderCss;
            }
        } else {
            if (this.helper.getSF00302Data().productRequiredItem.isSaveSubmittedUnitPrice) {
                return this.helper.getSF00302Data().errFieldBorderCss;
            } else {
                return this.helper.getSF00302Data().defaultFieldBorderCss;
            }
        }
    }

    get isSpecialSurfaceF() {
        if (this.helper.getSF00302Data().product.surfaceTreatmentIdF == 8
            || this.helper.getSF00302Data().product.surfaceTreatmentIdF == 17
            || this.helper.getSF00302Data().product.surfaceTreatmentIdF > 18) {
            return true;
        } else {
            return false;
        }
    }
    get isSpecialSurfaceB() {
        if (this.helper.getSF00302Data().product.surfaceTreatmentIdB == 8
            || this.helper.getSF00302Data().product.surfaceTreatmentIdB == 17
            || this.helper.getSF00302Data().product.surfaceTreatmentIdB > 18) {
            return true;
        } else {
            return false;
        }
    }

    get digitalBasicCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.digitalBasicCost);
    }

    get digitalThroughWage(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.digitalThroughWage);
    }

    get digitalTotalCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.digitalTotalCost);
    }

    get isOverPacketF() {
        let condition = MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPrintBasicCostF + (this.helper.sf00302Data.productOutput.colorPrintThroughWageF + this.helper.sf00302Data.productOutput.colorPrintSpecialCostF) * this.calcThroughNumber() + this.helper.sf00302Data.productOutput.colorPrintLossF);
        if (condition > this.helper.sf00302Data.productOutput.colorPrintPerPacketCostF
        ||(condition==0&&MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPrintPerPacketCostF)==0)) {
            return true;
        } else {
            return false;
        }
    }

   get isOverPacketB() {
        let condition =  MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPrintBasicCostB + (this.helper.sf00302Data.productOutput.colorPrintThroughWageB + this.helper.sf00302Data.productOutput.colorPrintSpecialCostB) * this.calcThroughNumber() + this.helper.sf00302Data.productOutput.colorPrintLossB);
        if (condition > this.helper.sf00302Data.productOutput.colorPrintPerPacketCostB
            ||(condition==0&&MathUtil.checkNaN(this.helper.sf00302Data.productOutput.colorPrintPerPacketCostB)==0)) {
            return true;
        } else {
            return false;
        }
    }

    calcThroughNumber() {
        return MathUtil.checkNaN(MathUtil.ceilDecimal(this.helper.sf00302Data.productOutput.lot / this.helper.sf00302Data.product.dieCuttingThroughNumber, 0));
    }

    get useDieCuttingFlatFee(): boolean {
        return this.calcThroughNumber() <= 1000;
    }
}
