import {OnInit, Component, Input} from "@angular/core";
import DataUtil from "../../../../../../util/data-util";
import {PAPER_LAMINATION_FLUTE} from "../../../helper/master-option";
import {SF0030225Helper} from "./SF0030225.helper";
import {SF00302Data} from "../../../SF00302.data";
import {SF0030226Helper} from "./SF0030226.helper";
import {SF00302Service} from "../../../SF00302.service";
import {ActivatedRoute, Router} from "@angular/router";
import MathUtil from "../../../../../../util/math-util";
import Messages, {MSG} from "../../../../../../helper/message";
import {Product} from "../../../../../../model/core/Product.model";
import {ProductCommonFee} from "../../../../../../model/core/ProductCommonFee.model";
import {MstWooden} from "../../../../../../model/core/MstWooden.model";
import ValidatorUtil from "../../../../../../util/validator-util";
import { SF003020202Helper } from "./SF003020202.helper";

declare var $: JQueryStatic;
declare var App: any;

@Component({
    templateUrl: "SF0030226.component.html",
    selector: 'sf0030226'
})
export class SF0030226Component {
    /** ヘルパー  実態は SF003020202Helper */
    @Input()
    helper: SF003020202Helper;

    isHighlighted(input) {
        return this.pageData.highlightedTracker.isHighlightedProperty(input);
    }

    get pageData(): SF00302Data {
        return this.helper.getSF00302Data();
    }

    constructor(public sf00302Data: SF00302Data, public sv00302Service: SF00302Service, private route: ActivatedRoute, public router: Router) {

    }

    private ix: number = 0;

    ngAfterViewInit(): void {
        App.initHelpers(['table-tools']);
    }

    get isView() {
        return this.helper.getSF00302Data().isView;
    }

    saveOutput() {
        // this.helper.checkChangeDataProduct();
        // this.helper.checkChangeDataProductOutput();
        this.helper.checkChangeDataOffer();


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
                    // reassign product
                    // let product = new Product();
                    // product.setProduct(data.product);
                    // this.helper.getSF00302Data().product = product;

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
            this.helper.getSF00302Data().productOutput.offers = [];
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
                    if ((this.helper.getSF00302Data().productOutputs[i].lot !== this.helper.getSF00302Data().bkProductLots[i]) || (this.helper.getSF00302Data().offers[i].unitPrice !== this.helper.getSF00302Data().bkProductOffers[i])) {
                        this.helper.getSF00302Data().checkOutputSave = true;
                    }
                }
            }).catch(err => {
                $.notify({message: Messages.get(MSG.SF00302.ERR003)}, {type: 'danger'});
            })
        } else {
            $.notify({message: Messages.get(MSG.SF00302.INF018)}, {type: 'info'});
        }
    }

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
        return this.helper.getSF00302Data().productOutput.lot;
    }

    set lot(value: number) {
        // change lot
        if (ValidatorUtil.isNotEmpty(value)) {
            this.helper.getSF00302Data().productOutput.lot = value;
            // change produce lot
        }

        this.helper.calcShipFareCarton();
        this.helper.calcUsageColorCostCarton();
        this.helper.calcWaterRepellentCarton();
        this.helper.calcDieCuttingThroughWage();
        this.helper.calcPasteBasicCost();
        this.helper.calcPasteThroughWage();
        this.helper.calcTotalCarton();
        this.helper.calcUnitPriceCarton();
        this.helper.calcSubTotal();
        this.helper.calcEstimateDiffCarton(1);
        this.helper.calcEstimateDiffCarton(2);
        this.helper.calcCartonLotGap();
        this.helper.calcAdditionFare();
        this.helper.calcSubmittedTotal();
    }

    get unitPrice(): number {
        this.helper.getSF00302Data().indexOffer.unitPrice = MathUtil.checkNaN(this.helper.getSF00302Data().indexOffer.unitPrice);
        return this.helper.getSF00302Data().indexOffer.unitPrice;

    }

    set unitPrice(value: number) {
        this.helper.getSF00302Data().indexOffer.unitPrice = value;
        this.helper.calcSubmittedTotal();
        this.helper.calcEstimateDiffCarton(1);
        this.helper.calcEstimateDiffCarton(2);
    }

    /*Check product create*/
    get checkProductCreated(): boolean {
        if (this.helper.getSF00302Data().product.id == null) {
            return false;
        }
        return true;
    }

    get cartonMaterialCost() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonMaterialCost);
    }

    get cartonMaterialLoss() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonMaterialLoss);
    }

    get cartonMaterialLamination() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonMaterialLamination);
    }

    get cartonMaterialUnitPrice() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonMaterialUnitPrice);
    }

    /** シート代 (円/㎡) */
    get cartonMaterialTotalCost() {
        return MathUtil.checkNaN(this.helper.calcMaterialCostCarton());
    }

    /** 運賃 (円/㎡) */
    get cartonShipFare() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonShipFare);
    }

    /** 割増運賃 (円/㎡) */
    get cartonAdditionalShipFare() {
        return MathUtil.checkNaN(this.helper.getAdditionalSipFareCarton());
    }

    get cartonShipTotal() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonShipTotal);
    }

    /** 印刷 (円/㎡) */
    get cartonUsageColorCost() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonUsageColorCost);
    }

    get cartonTapeCut() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonTapeCut);
    }

    get cartonLinerCut() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonLinerCut);
    }

    get cartonHandProcessing() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonHandProcessing);
    }

    /** 撥水加工賃 (円/㎡) */
    get cartonWaterRepellent() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonWaterRepellent);
    }

    get cartonProcessingUnitPrice() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonProcessingUnitPrice);
    }

    get cartonProcessingTotalCost() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonProcessingTotalCost);
    }

    /** 単価 (円/㎡) */
    get calcEstimatedM2PriceCarton(): number {
        return MathUtil.checkNaN(this.helper.calcEstimatedM2PriceCarton());
    }

    get total(): number {
        if (this.helper.getSF00302Data().indexOffer.total > 999999999) {
            return 999999999;
        }
        //http://fridaynight.vnext.vn/issues/2337
        return MathUtil.round(MathUtil.checkNaN(this.helper.sf00302Data.indexOffer.total), 0);
    }

    get profitRate(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().indexOffer.profitRate);
    }


    resetOffer() {
        // reset lot
        this.lot = this.helper.getSF00302Data().bkProductLots[this.ix];

        // set product common fee
        this.unitPrice = this.helper.getSF00302Data().bkProductOffers[this.ix];
        this.helper.getSF00302Data().checkOutputSave = false;
        this.helper.calcShipFareCarton();
        this.helper.calcUsageColorCostCarton();
        this.helper.calcWaterRepellentCarton();
        this.helper.calcDieCuttingThroughWage();
        this.helper.calcPasteBasicCost();
        this.helper.calcPasteThroughWage();
        this.helper.calcAdditionFare();
        this.helper.calcTotalCarton();
        this.helper.calcUnitPriceCarton();
        this.helper.calcEstimateDiffCarton(1);
        this.helper.calcEstimateDiffCarton(2);
        this.helper.calcSubmittedTotal();

    }

    /** 見積金額合計 (円) */
    get estimatedTotal(): number {
        //http://fridaynight.vnext.vn/issues/2337
        return MathUtil.round(MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.estimatedTotal), 0);
    }

    /** 単価 (ロット/円) */
    get estimatedUnitPrice(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.estimatedUnitPrice);
    }

    get checkBorderLot(): { style: string, radius: string } {
        if (this.helper.getSF00302Data().yCheck) {
            if (this.helper.getSF00302Data().productRequiredItem.isSaveLot) {
                return this.helper.getSF00302Data().errFieldBorderCss;
            } else {
                if (this.helper.getSF00302Data().xCheck) {
                    return this.helper.getSF00302Data().defaultFieldBorderCss;
                } else {
                    return this.helper.getSF00302Data().noneFieldBorderCss;
                }
            }
        } else {
            if (this.helper.getSF00302Data().xCheck) {
                return this.helper.getSF00302Data().defaultFieldBorderCss;
            } else {
                return this.helper.getSF00302Data().noneFieldBorderCss;
            }
        }

        /*if (ValidatorUtil.isNotEmpty(this.helper.sf00302Data.product.id)) {
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
         }*/
    }

    get checkBorderUnitPrice(): { style: string, radius: string } {

        if (this.helper.getSF00302Data().yCheck) {
            if (this.helper.getSF00302Data().productRequiredItem.isSaveSubmittedUnitPrice) {
                return this.helper.getSF00302Data().errFieldBorderCss;
            } else {
                if (this.helper.getSF00302Data().xCheck) {
                    return this.helper.getSF00302Data().defaultFieldBorderCss;
                } else {
                    return this.helper.getSF00302Data().noneFieldBorderCss;
                }
            }
        } else {
            if (this.helper.getSF00302Data().xCheck) {
                return this.helper.getSF00302Data().defaultFieldBorderCss;
            } else {
                return this.helper.getSF00302Data().noneFieldBorderCss;
            }
        }

        /*if (ValidatorUtil.isNotEmpty(this.helper.sf00302Data.product.id)) {
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
         }*/
    }

    get dimension() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.dimension);
    }

    get estimatedM2Price(): number {
        return MathUtil.checkNaN(this.helper.calcEstimatedM2PriceCarton());
    }

    get dieCuttingLoss(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.dieCuttingLoss);
    }

    get dieCuttingBasicCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.dieCuttingBasicCost);
    }

    /** 打抜き＋梱包 (円/㎡) */
    get dieCuttingThroughWage(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.dieCuttingThroughWage);
    }


    get pasteLoss(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.pasteLoss);
    }

    /** 基本料（案件） (円) */
    get pasteBasicCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.pasteBasicCost);
    }

    /** 工賃 (円/製品) */
    get pasteThroughWage(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.pasteThroughWage);
    }

    /** 貼り加工 = 貼り加工代合計（@案件）(円) */
    get pasteTotalCost(): number {
        return MathUtil.checkNaN(this.helper.sf00302Data.productOutput.pasteTotalCost);
    }

    /** 表ライナー (円/kg) */
    get laminationFrontThroughWage(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().product.laminationFrontThroughWage)
    }

    /** B中芯 (円/kg) */
    get laminationBThroughWage(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().product.laminationBThroughWage)
    }

    /** 中芯 (円/kg) */
    get laminationMediumThroughWage(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().product.laminationMediumThroughWage)
    }

    /** A中芯 (円/kg) */
    get laminationAThroughWage(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().product.laminationAThroughWage)
    }

    /** 裏ライナー (円/kg) */
    get laminationBackThroughWage(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().product.laminationBackThroughWage)
    }

    /** 梱包代 (円/㎡) */
    get packing(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.packing);
    }

    /** 展開寸法（流れ） (mm) */
    get largerBlankSize() {
        return this.helper.largerBlankSize;
    }

    /** 通方向レンジ */
    get directionRange() {
        let key = this.helper.getUsingPasteKey();
        return key != null ? `${key}まで` : '';
    }

    /** 割増工賃（基本料）(円/案件) */
    get specialPasteBasicCost() {
        return this.helper.getSpecialPasteBasicCost();
    }

    /** 割増工賃（工賃） (円/製品) */
    get specialPasteThroughWage() {
        return this.helper.getSpecialPasteThroughWage();
    }

    /** ロット格差 (円) */
    get cartonLotGap(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonLotGap);
    }

    /** ロット格差（円/シート）*/
    get cartonLotGapPerSheet(): number {
        let productOutput = this.helper.getSF00302Data().productOutput;
        let numberOfSheets = productOutput.lot / this.helper.dieCuttingThroughNumber;
        return MathUtil.checkNaN(productOutput.cartonLotGap / numberOfSheets);
    }

    /** 特別運賃（助手手当など） (円) */
    get cartonSpecialFare(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
    }

    /** 特別費用 (円) */
    get additionalTotalCarton(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonLotGap) + MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
    }

    /** 貼合料 (円/㎡) */
    get laminationM2Cost(): number {
        return this.helper.laminationM2Cost;
    }

    /** 貼合ロス% (0.0〜1.0) */
    get laminationLoss(): number {
        return this.helper.laminationLoss;
    }

    /** シート代合計 (円) */
    get getCartonSheetCost(): number {
        let data = this.helper.getSF00302Data();
        return MathUtil.checkNaN(this.helper.cartonSheetCostPerProduct * data.productOutput.lot);
    }

    /** 加工代（基本工賃）= 打抜き＋梱包 (円) */
    get dieCuttingTotalCost(): number {
        let data = this.helper.getSF00302Data();
        return MathUtil.checkNaN(this.helper.dieCuttingTotalCostPerProduct * data.productOutput.lot);
    }

    /** 加工代（印刷）= 印刷代合計 (円) */
    get cartonUsageColorTotal(): number {
        let data = this.helper.getSF00302Data();
        return MathUtil.checkNaN(this.helper.cartonUsageColorCostPerProduct * data.productOutput.lot);
    }

    /** 運賃 = 運賃合計 (合計) (円) */
    get cartonFareCost(): number {
        let data = this.helper.getSF00302Data();
        return MathUtil.checkNaN(data.productOutput.cartonShipTotal);
    }

    /** 加工代 (撥水加工賃) = 撥水加工代合計 (円) */
    get cartonWaterRepellentCost(): number {
        let data = this.helper.getSF00302Data();
        return MathUtil.checkNaN(this.helper.cartonWaterRepellentCostPerProduct * data.productOutput.lot);
    }

    /** 結束・梱包 = 結束・梱包代（特別） (円) */
    get cartonPackingCost(): number {
        let data = this.helper.getSF00302Data();
        return MathUtil.checkNaN(this.helper.cartonPackingCostPerProduct * data.productOutput.lot);
    }

    /** その他 項目1 (円) */
    get otherFee1(): number {
        return MathUtil.checkNaN(this.helper.getProductOutputOtherFee1());
    }

    /** その他 項目2 (円) */
    get otherFee2(): number {
        return MathUtil.checkNaN(this.helper.getProductOutputOtherFee2());
    }

    /** その他 項目3 (円) */
    get otherFee3(): number {
        return MathUtil.checkNaN(this.helper.getProductOutputOtherFee3());
    }

    /** その他 項目1 項目名 */
    get otherFeeExpense1(): string {
        let product = this.helper.getSF00302Data().product;
        if (product.otherExpense1 != undefined && product.otherExpense1 != "") {
            return product.otherExpense1;
        } else {
            return "（項目名１）";
        }
    }

    /** その他 項目2 項目名 */
    get otherFeeExpense2(): string {
        let product = this.helper.getSF00302Data().product;
        if (product.otherExpense2 != undefined && product.otherExpense2 != "") {
            return product.otherExpense2;
        } else {
            return "（項目名２）";
        }
    }

    /** その他 項目3 項目名 */
    get otherFeeExpense3(): string {
        let product = this.helper.getSF00302Data().product;
        if (product.otherExpense3 != undefined && product.otherExpense3 != "") {
            return product.otherExpense3;
        } else {
            return "（項目名３）";
        }
    }

    /** その他 合計 (円) */
    get otherFeeTotalCost(): number {
        return this.helper.getOtherFeeTotalCost();
    }

}
