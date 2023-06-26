import {AfterViewInit, Component, Input} from "@angular/core";
import {SF0030224Helper} from "./SF0030224.helper";
import {SF00302Service} from "../../../SF00302.service";
import {ActivatedRoute, Router} from "@angular/router";
import Messages, {MSG} from "../../../../../../helper/message";
import {Product} from "../../../../../../model/core/Product.model";
import {ProductCommonFee} from "../../../../../../model/core/ProductCommonFee.model";
import {MstWooden} from "../../../../../../model/core/MstWooden.model";
import MathUtil from "../../../../../../util/math-util";
import ValidatorUtil from "../../../../../../util/validator-util";
declare var $: JQueryStatic;
declare var App: any;

/**
 * 試算表 (片段)
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
 */
@Component({
    selector: "sf0030224",
    templateUrl: "SF0030224.component.html"
})
export class SF0030224Component implements AfterViewInit {
    @Input()
    helper: SF0030224Helper;

    ngAfterViewInit(): void {
        App.initHelpers(['table-tools']);
    }

    private ix: number = 0;

    constructor(public sv00302Service: SF00302Service, private route: ActivatedRoute, public router: Router) {
    }

    /**
     * Chane the current product output displaying in page
     * @param {number} id: The index of product output
     */
    pageProductOutput(id: number) {
        // Change product output with index id to the current output
        this.helper.getSF00302Data().indexOutput = id;
        this.helper.getSF00302Data().productOutput = this.helper.getSF00302Data().productOutputs[id];
        // change offer
        this.helper.getSF00302Data().indexOffer = this.helper.getSF00302Data().offers[id];
        // Change current tab effect
        $(".tabOutput").removeClass("active");
        $("#tab0" + id).parent().addClass("active");
        this.ix = id;
    }

    saveOutput() {
        this.helper.getSF00302Data().checkInputSave = true;  //（変更チェックを外す。一旦暫定対応。）
        this.helper.getSF00302Data().checkOutputSave = true;  //（変更チェックを外す。一旦暫定対応。）
        if (this.helper.getSF00302Data().checkInputSave && this.helper.getSF00302Data().checkOutputSave) {

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
            product.setProduct(this.helper.getSF00302Data().product);
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
            }
            // TODO: need to update with edited productOutputs instead of existing ones
            let productOutputs = [];
            Object.assign(productOutputs, this.helper.getSF00302Data().productOutputs);
            product.productOutputs = productOutputs;
            // push product offer
            for (let i = 0; i < 5; i++) {
                product.productOutputs[i].offers = [];
                this.helper.getSF00302Data().offers[i].productOutput = undefined;
                product.productOutputs[i].offers.push(this.helper.getSF00302Data().offers[i]);
            }

            let productCommonFee = new ProductCommonFee();
            product.productCommon = Object.assign(productCommonFee, this.helper.getSF00302Data().productCommonFee);

            this.sv00302Service
                .sv0030203UpdateProduct(product, this.helper.getSF00302Data().dealCode)
                .then(data => {
                    // rassign product outputs
                    let productOutputs = [];
                    Object.assign(productOutputs, data.product.productOutputs);
                    this.helper.getSF00302Data().productOutputs = productOutputs;

                    let wooden = new MstWooden();
                    Object.assign(wooden, data.product.wooden);
                    this.helper.getSF00302Data().product.wooden = wooden;
                    // refresh indexing product output
                    let currentTabIndex = $(".tabOutput.active").index();
                    this.helper.getSF00302Data().productOutput = productOutputs[currentTabIndex];

                    this.helper.getSF00302Data().bkProductLots = [];
                    for (let i = 0; i < 5; i++) {
                        if (this.helper.getSF00302Data().product.productOutputs[i] == undefined) {
                            this.helper.getSF00302Data().bkProductLots.push(undefined);
                        } else {
                            this.helper.getSF00302Data().bkProductLots.push(this.helper.getSF00302Data().product.productOutputs[i].lot);
                        }
                    }
                    this.helper.getSF00302Data().bkProductOffers = [];
                    // init backup data - offer
                    for (let i = 0; i < 5; i++) {
                        if (this.helper.getSF00302Data().offers[i] == undefined) {
                            this.helper.getSF00302Data().bkProductOffers.push(undefined);
                        } else {
                            this.helper.getSF00302Data().bkProductOffers.push(this.helper.getSF00302Data().offers[i].unitPrice);
                        }
                    }

                    let fee = new ProductCommonFee();
                    Object.assign(fee, data.product.productCommon);
                    this.helper.getSF00302Data().productCommonFee = fee;

                    $.notify(
                        {
                            message: Messages.get(MSG.SF00302.INF006)
                        },
                        {
                            type: 'info'
                        });
                    this.helper.getSF00302Data().checkInputSave = false;
                    this.helper.getSF00302Data().checkOutputSave = false;
                    this.helper.getSF00302Data().checkCommonSave = false;
                });
        } else if (this.helper.getSF00302Data().checkOutputSave && !this.helper.getSF00302Data().checkInputSave) {
            // Save the current product output
            this.helper.getSF00302Data().indexOffer.productOutput = this.helper.getSF00302Data().productOutput;
            this.sv00302Service.sv0030211UpdateOffer(this.helper.getSF00302Data().indexOffer, this.helper.getSF00302Data().dealCode
                , this.helper.getSF00302Data().product.productCode).then(data => {
                $.notify({message: Messages.get(MSG.SF00302.INF008)}, {type: 'success'});
                this.helper.getSF00302Data().bkProductOffers[this.ix] = this.unitPrice;
                this.helper.getSF00302Data().bkProductLots[this.ix] = this.helper.getSF00302Data().productOutput.lot;
                this.helper.getSF00302Data().checkOutputSave = false;
                for (let i = 0; i < 5; i++) {
                    if ((MathUtil.checkNaN(this.helper.getSF00302Data().productOutputs[i].lot) != MathUtil.checkNaN(this.helper.getSF00302Data().bkProductLots[i])) || (MathUtil.checkNaN(this.helper.getSF00302Data().offers[i].unitPrice) != MathUtil.checkNaN(this.helper.getSF00302Data().bkProductOffers[i]))) {
                        this.helper.getSF00302Data().checkOutputSave = true;
                    }
                }
            }).catch(err => {
                $.notify({message: Messages.get(MSG.SF00302.ERR003)}, {type: 'danger'});
            })
        }
    }

    /*Check product create*/
    get checkProductCreated(): boolean {
        if (this.helper.getSF00302Data().product.id == null) {
            return false;
        }
        return true;
    }

    get lot(): number {
        this.helper.getSF00302Data().productOutput.lot = MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.lot);
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.lot);
    }

    set lot(value: number) {
        // change lot
        if (ValidatorUtil.isNotEmpty(value)) {
            this.helper.getSF00302Data().productOutput.lot = value;
            // change produce lot
        }


        if (this.helper.getSF00302Data().product.shapeId == this.helper.getSF00302Data().ONE_STAGE) {
            this.helper.calcThroughNumber();
            this.helper.calcPaperTotalCost();
            this.helper.calcLaminationSize();
            this.helper.calcLaminationUnitPrice();
            this.helper.calcLaminationTotalCost();
            this.helper.calcStampingPointsNumber();
            this.helper.calcStampingBasicCost();
            this.helper.calcStampingThroughWage();
            this.helper.calcStampingTotalCost();
            this.helper.calcWindowTotalCost();
            this.helper.calcDieCuttingWeight();
            this.helper.calcDieCuttingLoss();
            this.helper.calcDieCuttingBasicCost();
            this.helper.calcDieCuttingThroughWage();
            this.helper.calcDieCuttingTotalCost();
            this.helper.calcPasteLoss();
            this.helper.calcPasteThroughWage();
            this.helper.calcPasteBasicCost();
            this.helper.calccartonMaterialLoss();
            this.helper.calcPasteStepWage();
            this.helper.calcPasteThroughWage();
            this.helper.calclaminationSheetCost();
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
        //this.helper.validateForm();
        this.helper.getSF00302Data().checkOutputSave = true;
    }

    get unitPrice(): number {
        this.helper.getSF00302Data().indexOffer.unitPrice = MathUtil.checkNaN(this.helper.getSF00302Data().indexOffer.unitPrice);
        return MathUtil.checkNaN(this.helper.getSF00302Data().indexOffer.unitPrice);

    }

    set unitPrice(value: number) {
        this.helper.getSF00302Data().indexOffer.unitPrice = value;
        this.helper.calcSubmittedTotal();
        this.helper.calcEstimateDiff(1);
        this.helper.calcEstimateDiff(2);
        //this.helper.validateForm();
        this.helper.getSF00302Data().checkOutputSave = true;
    }

    get total(): number {
        if (this.helper.getSF00302Data().indexOffer.total > 999999999) {
            return 999999999;
        }
        //http://fridaynight.vnext.vn/issues/2337
        return MathUtil.round(MathUtil.checkNaN(this.helper.sf00302Data.indexOffer.total),0);
    }

    get profitRate(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().indexOffer.profitRate);
    }

    get laminationTotalCost(): number {
        if (this.helper.getSF00302Data().productOutput.laminationTotalCost == undefined) {
            this.helper.getSF00302Data().productOutput.laminationTotalCost = 0;
        }
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.laminationTotalCost);
    }

    get paperTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.paperTotalCost);
    }

    get laminationSize(): number {
        if (this.helper.getSF00302Data().productOutput.laminationSize == undefined) {
            this.helper.getSF00302Data().productOutput.laminationSize = 0;
        }
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.laminationSize);
    }

    get laminationUnitPrice(): number {
        if (this.helper.getSF00302Data().productOutput.laminationUnitPrice == undefined) {
            this.helper.getSF00302Data().productOutput.laminationUnitPrice = 0;
        }
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.laminationUnitPrice);
    }

    get cartonMaterialLoss(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonMaterialLoss);
    }

    get pasteStepWage(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.pasteStepWage);
    }
    get laminationSheetCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.laminationSheetCost);
    }

    get stampingBasicCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.stampingBasicCost);
    }

    get stampingThroughWage(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.stampingThroughWage);
    }

    get stampingTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.stampingTotalCost);
    }

    get dieCuttingLoss(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.dieCuttingLoss);
    }

    get dieCuttingBasicCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.dieCuttingBasicCost);
    }

    get dieCuttingThroughWage(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.dieCuttingThroughWage);
    }

    get dieCuttingTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.dieCuttingTotalCost);
    }

    get inspection(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.inspection);
    }

    get packing(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.packing);
    }

    get fareLineService(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.fareLineService);
    }

    get cartonSpecialFare(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
    }

    get additionalTotalCarton(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
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

    get otherFeeExpense1(): string {
        if (this.helper.getSF00302Data().product.otherExpense1 != undefined && this.helper.getSF00302Data().product.otherExpense1 != "") {
            return this.helper.getSF00302Data().product.otherExpense1;
        } else {
            return "（項目名１）";
        }
    }

    get otherFeeExpense2(): string {
        if (this.helper.getSF00302Data().product.otherExpense2 != undefined && this.helper.getSF00302Data().product.otherExpense2 != "") {
            return this.helper.getSF00302Data().product.otherExpense2;
        } else {
            return "（項目名２）";
        }
    }

    get otherFeeExpense3(): string {
        if (this.helper.getSF00302Data().product.otherExpense3 != undefined && this.helper.getSF00302Data().product.otherExpense3 != "") {
            return this.helper.getSF00302Data().product.otherExpense3;
        } else {
            return "（項目名３）";
        }
    }
    get managementCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.managementCost);
    }

    get estimatedTotal(): number {
        //http://fridaynight.vnext.vn/issues/2337
        return MathUtil.round(MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.estimatedTotal),0);
    }

    get estimatedUnitPrice(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.estimatedUnitPrice);
    }


    get isView() {
        return this.helper.getSF00302Data().isView;
    }

    resetOffer() {
        // reset lot
        this.lot = this.helper.getSF00302Data().bkProductLots[this.ix];

        // set product common fee
        this.unitPrice = this.helper.getSF00302Data().bkProductOffers[this.ix];
        this.helper.getSF00302Data().checkOutputSave = true;
    }

    get checkBorderLot(): {style: string, radius: string} {
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

    get checkBorderUnitPrice(): {style: string, radius: string} {
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
    get inspectionPackingFareLineTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getInspectionPackingFareLineTotalCost());
    }
    get otherFeeTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getOtherFeeTotalCost());
    }

    get dieCuttingPasteTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getDieCuttingPasteTotalCost());
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

}