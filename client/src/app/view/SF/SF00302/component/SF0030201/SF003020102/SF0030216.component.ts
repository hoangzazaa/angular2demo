import {AfterViewInit, Component, Input} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {isNumber} from "util";
import Messages, {MSG} from "../../../../../../helper/message";
import {MstWooden} from "../../../../../../model/core/MstWooden.model";
import {Product} from "../../../../../../model/core/Product.model";
import {ProductCommonFee} from "../../../../../../model/core/ProductCommonFee.model";
import {FormatUtil} from "../../../../../../util/format-util";
import MathUtil from "../../../../../../util/math-util";
import ValidatorUtil from "../../../../../../util/validator-util";
import {SF00302Service} from "../../../SF00302.service";
import {SF0030216Helper} from "./SF0030216.helper";
import DataUtil from "../../../../../../util/data-util";
declare var $: JQueryStatic;
declare var App: any;

/**
 * 試算表 (美粧)
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
 */
@Component({
    selector: "sf0030216",
    templateUrl: "SF0030216.component.html"
})
export class SF0030216Component implements AfterViewInit {
    @Input()
    helper: SF0030216Helper;

    ngAfterViewInit(): void {
        App.initHelpers(['table-tools']);
    }

    private ix: number = 0;
    constructor(public sv00302Service: SF00302Service, private route: ActivatedRoute, public router: Router) {

    }

    saveOutput() {
        // this.helper.checkChangeDataProduct();
        // this.helper.checkChangeDataProductOutput();
        this.helper.checkChangeDataOffer();

        this.helper.sf00302Data.checkInputSave = true;  //（変更チェックを外す。一旦暫定対応。）
        this.helper.sf00302Data.checkOutputSave = true;  //（変更チェックを外す。一旦暫定対応。）
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
            // Comment to fix bug 3057
            /*if (product.pasteId == 0) {
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

                    // reset old data to validate - follow 3057
                    this.helper.getSF00302Data().productOutputsOld = DataUtil.cloneObject(this.helper.sf00302Data.productOutputs);
                    this.helper.getSF00302Data().productOld = DataUtil.cloneObject(this.helper.sf00302Data.product);
                    this.helper.getSF00302Data().offersOld = DataUtil.cloneObject(this.helper.sf00302Data.offers);

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

                // reset old data to validate - follow 3057
                this.helper.getSF00302Data().productOutputsOld = DataUtil.cloneObject(this.helper.sf00302Data.productOutputs);
                this.helper.getSF00302Data().offersOld = DataUtil.cloneObject(this.helper.sf00302Data.offers);

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
        }else{
            $.notify({message: Messages.get(MSG.SF00302.INF018)}, {type: 'info'});
        }
    }

    /*Check product create*/
    get checkProductCreated(): boolean {
        if (this.helper.getSF00302Data().product.id == null) {
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
        this.helper.getSF00302Data().indexOutput = id;
        this.helper.getSF00302Data().productOutput = this.helper.getSF00302Data().productOutputs[id];
        // change offer
        this.helper.getSF00302Data().indexOffer = this.helper.getSF00302Data().offers[id];
        // Change current tab effect
        $(".tabOutput").removeClass("active");
        $("#tab0" + id).parent().addClass("active");
        this.ix = id;
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


        if (this.helper.getSF00302Data().product.shapeId == this.helper.getSF00302Data().DECORATIVE_ID) {
            this.helper.calcThroughNumber();
            this.helper.calcPaperUnitPrice();
            this.helper.calcLaminationSize();
            this.helper.calcLaminationUnitPrice();
            this.helper.calcLaminationTotalCost();
            this.helper.calcColorPlateCost(1);
            this.helper.calcColorPrintLoss(1);
            this.helper.calcColorCostPerPacket(1);
            this.helper.calcColorBasicCost(1);
            this.helper.calcColorThroughWage(1);
            this.helper.calcColorSpecial(1);
            this.helper.calcColorTotalCost(1);
            this.helper.calcColorPlateCost(2);
            this.helper.calcColorPrintLoss(2);
            this.helper.calcColorCostPerPacket(2);
            this.helper.calcColorBasicCost(2);
            this.helper.calcColorThroughWage(2);
            this.helper.calcColorSpecial(2);
            this.helper.calcColorTotalCost(2);
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
            this.helper.calcAdditionFare();
        }
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

    /** 原紙代単価 */
    get paperUnitPrice(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.paperUnitPrice);
    }

    /** 原紙代合計 (材料合計) */
    get paperTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.paperTotalCost);
    }

    get colorPlateCostF(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.colorPlateCostF);
    }

    /** 印刷ロス */
    get colorPrintLossF(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintLossF);
    }


    get colorPrintPerPacketCostF(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintPerPacketCostF);
    }

    /** 印刷基本料 */
    get colorPrintBasicCostF(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintBasicCostF);
    }

    get colorPrintThroughWageF(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintThroughWageF);
    }

    /** 印刷 割増/割引工賃 */
    get colorPrintSpecialCostF(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintSpecialCostF);
    }

    /** 印刷合計 */
    get colorPrintTotalCostF(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintTotalCostF);
    }

    /** @deprecated 美粧では使用しない */
    get colorPlateCostB(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.colorPlateCostB);
    }

    /** @deprecated 美粧では使用しない */
    get colorPrintLossB(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintLossB);
    }

    /** @deprecated 美粧では使用しない */
    get colorPrintPerPacketCostB(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintPerPacketCostB);
    }

    /** @deprecated 美粧では使用しない */
    get colorPrintBasicCostB(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintBasicCostB);
    }

    /** @deprecated 美粧では使用しない */
    get colorPrintThroughWageB(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintThroughWageB);
    }

    /** @deprecated 美粧では使用しない */
    get colorPrintSpecialCostB(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintSpecialCostB);
    }

    /** @deprecated 美粧では使用しない */
    get colorPrintTotalCostB(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintTotalCostB);
    }


    /** @deprecated 美粧では使用しない */
    get surfaceTreatmentBasicCostF(): string {
        if (isNumber(this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostF)) {
            return this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else if (this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostF == undefined || this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostF == "") {
            return "0";
        }
        return this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostF;
    }


    /** @deprecated 美粧では使用しない */
    get surfaceTreatmentThroughWageF(): string {
        if (isNumber(this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageF)) {
            return this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else if (this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageF == undefined || this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageF == "") {
            return "0";
        }
        return this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageF;
    }

    /** @deprecated 美粧では使用しない */
    get surfaceTreatmentTotalCostF(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.surfaceTreatmentTotalCostF);
    }


    /** @deprecated 美粧では使用しない */
    get surfaceTreatmentBasicCostB(): string {
        if (isNumber(this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostB)) {
            return this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else if (this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostB == undefined || this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostB == "") {
            return "0";
        }
        return this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostB;
    }


    /** @deprecated 美粧では使用しない */
    get surfaceTreatmentThroughWageB(): string {
        if (isNumber(this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageB)) {
            return this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else if (this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageB == undefined || this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageB == "") {
            return "0";
        }
        return this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageB;
    }

    /** @deprecated 美粧では使用しない */
    get surfaceTreatmentTotalCostB(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.surfaceTreatmentTotalCostB);
    }

    /** @deprecated 美粧では使用しない */
    get embossingBasicCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.embossingBasicCost);
    }

    /** @deprecated 美粧では使用しない */
    get embossingThroughWage(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.embossingThroughWage);
    }

    /** @deprecated 美粧では使用しない */
    get embossingTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.embossingTotalCost);
    }

    /** 貼合 シート代単価 (円/㎡） */
    get laminationUnitPrice(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.laminationUnitPrice);
    }

    /** 貼合工賃 */
    get laminationWage (): number {
        return this.helper.laminationWage;
    }

    /** 貼合ロス */
    get laminationLoss(): number {
        return this.helper.laminationLoss;
    }

    /** 貼合代合計 */
    get laminationTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.laminationTotalCost);
    }

    /** 打抜・貼り工程 打抜き 打抜き一律 */
    get dieCuttingLoss(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.dieCuttingLoss);
    }

    /** 打抜・貼り工程 打抜き 一律=基本料 */
    get dieCuttingBasicCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.dieCuttingBasicCost);
    }

    /** 打抜・貼り工程 打抜き 通工賃 */
    get dieCuttingThroughWage(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.dieCuttingTotalCost / this.helper.throughNumber);
    }

    /** 打抜・貼り工程 打抜き合計 */
    get dieCuttingTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.dieCuttingTotalCost);
    }

    /** 型出し・箔押し加工 基本料 */
    get stampingBasicCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.stampingBasicCost);
    }

    /** 型出し・箔押し加工 工賃 */
    get stampingThroughWage(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.stampingThroughWage);
    }

    /** 型出し・箔押し加工合計 = 箔押し代 */
    get stampingTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.stampingTotalCost);
    }

    /** 窓貼り加工 材料代 */
    get windowMaterialFee(): number {
        if (this.helper.getSF00302Data().productOutput.windowMaterialFee == undefined) {
            this.helper.getSF00302Data().productOutput.windowMaterialFee = 0;
        }
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.windowMaterialFee);
    }

    /** 窓貼り加工 = 窓貼代計 */
    get windowTotalCost(): number {
        if (this.helper.getSF00302Data().productOutput.windowTotalCost == undefined) {
            this.helper.getSF00302Data().productOutput.windowTotalCost = 0;
        }
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.windowTotalCost);
    }

    /** 打抜・貼り工程 貼り 貼りロス */
    get pasteLoss(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.pasteLoss);
    }

    /** 打抜・貼り工程 貼り 基本料 */
    get pasteBasicCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.pasteBasicCost);
    }

    /** 打抜・貼り工程 貼り 工賃 */
    get pasteThroughWage(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.pasteThroughWage);
    }

    /** 打抜・貼り工程 貼り合計 */
    get pasteTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.pasteTotalCost);
    }

    /** 検品 */
    get inspection(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.inspection);
    }

    /** 梱包 */
    get packing(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.packing);
    }


    /** 販売管理費 */
    get managementCost(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.managementCost);
    }

    /** 運賃 */
    get fareLineService(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.fareLineService);
    }

    /** 特別費用 特別運賃（助手手当など) */
    get cartonSpecialFare(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
    }

    /** 特別費用合計 */
    get additionalTotalCarton(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
    }

    /** 見積金額 合計 */
    get estimatedTotal(): number {
        //http://fridaynight.vnext.vn/issues/2337
        return MathUtil.round(MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.estimatedTotal),0);
    }

    /** 見積金額 単価 */
    get estimatedUnitPrice(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.estimatedUnitPrice);
    }

    /** その他1 金額 */
    get otherFee1(): number {
        return MathUtil.checkNaN(this.helper.getProductOutputOtherFee1());
    }

    /** その他2 金額 */
    get otherFee2(): number {
        return MathUtil.checkNaN(this.helper.getProductOutputOtherFee2());
    }

    /** その他3 金額 */
    get otherFee3(): number {
        return MathUtil.checkNaN(this.helper.getProductOutputOtherFee3());
    }

    /** 印刷合計 */
    get colorPrintTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getColorPrintTotalCost());
    }

    get isOffsetColor(): boolean {
        if (this.helper.getSF00302Data().product.printMethod == 1) {
            return true;
        } else {
            return false;
        }
    }

    get isView() {
        if(this.helper.getSF00302Data().isRequestDesign) {
            return false;
        } else {
            return this.helper.getSF00302Data().isView;
        }
    }

    get isCreateNewProduct () {
        return this.helper.getSF00302Data().isCreateNewProduct;
    }

    get surfaceTreatmentTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getSurfaceTreatmentTotalCost());
    }

    /** 検品・梱包・配送代合計 */
    get inspectionPackingFareLineTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getInspectionPackingFareLineTotalCost());
    }

    /** 打抜・貼り工程合計 */
    get diaCuttingPasteTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getDieCuttingPasteTotalCost());
    }

    /** その他合計 */
    get otherFeeTotalCost(): number {
        return MathUtil.checkNaN(this.helper.getOtherFeeTotalCost());
    }

    resetOffer() {
        // reset lot
        this.lot = this.helper.getSF00302Data().bkProductLots[this.ix];

        // set product common fee
        this.unitPrice = this.helper.getSF00302Data().bkProductOffers[this.ix];
        this.helper.getSF00302Data().checkOutputSave = false;
    }

    get isNotCalculateSurfaceF(): boolean {
        if (this.helper.getSF00302Data().product.surfaceTreatmentIdF == 8 || this.helper.getSF00302Data().product.surfaceTreatmentIdF == 9) {
            return true;
        } else {
            return false;
        }
    }

    get isNotCalculateSurfaceB(): boolean {
        if (this.helper.getSF00302Data().product.surfaceTreatmentIdB == 8 || this.helper.getSF00302Data().product.surfaceTreatmentIdB == 9) {
            return true;
        } else {
            return false;
        }
    }

    /** その他1 項目名 */
    get otherFeeExpense1(): string {
        if (this.helper.getSF00302Data().product.otherExpense1 != undefined && this.helper.getSF00302Data().product.otherExpense1 != "") {
            return this.helper.getSF00302Data().product.otherExpense1;
        } else {
            return "（項目名１）";
        }
    }

    /** その他2 項目名 */
    get otherFeeExpense2(): string {
        if (this.helper.getSF00302Data().product.otherExpense2 != undefined && this.helper.getSF00302Data().product.otherExpense2 != "") {
            return this.helper.getSF00302Data().product.otherExpense2;
        } else {
            return "（項目名２）";
        }
    }

    /** その他3 項目名 */
    get otherFeeExpense3(): string {
        if (this.helper.getSF00302Data().product.otherExpense3 != undefined && this.helper.getSF00302Data().product.otherExpense3 != "") {
            return this.helper.getSF00302Data().product.otherExpense3;
        } else {
            return "（項目名３）";
        }
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

    get isFlexo(){
        if(this.helper.getSF00302Data().product.printMethod==3){
            return true;
        } else {
            return false;
        }
    }

    //#2710
    isDecorative(): boolean {
        let product = {
            productType: this.helper.getSF00302Data().product.productType,
            shapeId: this.helper.getSF00302Data().product.shapeId
        };

        return FormatUtil.isMakeupSheet(product);
    }

    get useDieCuttingFlatFee(): boolean {
        return (this.helper.getSF00302Data().productOutput.lot / this.helper.getSF00302Data().product.dieCuttingThroughNumber <= 1000);
    }
}
