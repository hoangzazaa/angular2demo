import {Component, Input} from "@angular/core";
import {SF00302Data} from "../../../SF00302.data";
import {default as Messages, MSG} from "../../../../../../helper/message";
import {ProductCommonFee} from "../../../../../../model/core/ProductCommonFee.model";
import {MstWooden} from "../../../../../../model/core/MstWooden.model";
import {SF00302Service} from "../../../SF00302.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../../../../model/core/Product.model";
import MathUtil from "../../../../../../util/math-util";
import ValidatorUtil from "../../../../../../util/validator-util";
import {SF0030221Helper} from "./SF0030221.helper";
import DataUtil from "../../../../../../util/data-util";
/**
 * Created by VuPT on 3/21/2017.
 */
declare var $: JQueryStatic;
declare var App: any;

/**
 * 試算表 (段ボールA式)
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
    selector: "sf0030221",
    templateUrl: "SF0030221.component.html"
})
export class SF0030221Component {
    @Input()
    helper: SF0030221Helper;

    ngAfterViewInit(): void {
        App.initHelpers(['table-tools']);
    }

    get isRequestDesign() {
        return this.helper.getSF00302Data().isRequestDesign;
    }

    get isCreateNewProduct() {
        return this.helper.getSF00302Data().isCreateNewProduct;
    }


    private ix: number = 0;

    constructor(public sf00302Data: SF00302Data, public sv00302Service: SF00302Service, private route: ActivatedRoute, public router: Router) {

    }

    get isView() {
        if (this.isRequestDesign) {
            return false;
        } else {
            return this.helper.getSF00302Data().isView;
        }
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
        }else{
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

        this.helper.calcMaterialCostTotalCarton();
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialLaminationCarton();
        this.helper.calcMaterialUnitPriceCarton();
        this.helper.calcMaterialTotalCostCarton();
        this.helper.calcShipFareCarton();
        this.helper.calcUsageColorCostCarton();
        this.helper.calcTapeCutCarton();
        this.helper.calcLinerCutCarton();
        this.helper.calcCartonHandProcessingCarton();
        this.helper.calcWaterRepellentCarton();
        this.helper.calcProcessingUnitPriceCarton();
        this.helper.calcProcessingTotalCarton();
        this.helper.calcTotalCarton();
        this.helper.calcUnitPriceCarton();
        this.helper.calcSubTotal();
        this.helper.calcEstimateDiffCarton(1);
        this.helper.calcEstimateDiffCarton(2);
        this.helper.calcCartonLotGap();
        this.helper.calcAdditionFare();
        this.helper.calcDimension();
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

    get cartonMaterialTotalCost() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonMaterialTotalCost);
    }

    get cartonShipFare() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonShipFare);
    }

    get cartonAdditionalShipFare() {
        return MathUtil.checkNaN(this.helper.getAdditionalSipFareCarton());
    }

    get cartonShipTotal() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonShipTotal);
    }

    get cartonFareCost(): number {
        let data = this.helper.getSF00302Data();
        return MathUtil.checkNaN(data.productOutput.cartonShipTotal);
    }

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

    get cartonWaterRepellent() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonWaterRepellent);
    }

    get cartonProcessingUnitPrice() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonProcessingUnitPrice);
    }

    get cartonProcessingTotalCost() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonProcessingTotalCost);
    }

    get calcEstimatedM2PriceCarton(): number {
        return MathUtil.checkNaN(this.helper.calcEstimatedM2PriceCarton());
    }

    get cartonSpecialFare(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
    }

    /** @return 特別費用 */
    get additionalTotalCarton(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonLotGap) + MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
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

    resetOffer() {
        // reset lot
        this.lot = this.helper.getSF00302Data().bkProductLots[this.ix];

        // set product common fee
        this.unitPrice = this.helper.getSF00302Data().bkProductOffers[this.ix];
        this.helper.getSF00302Data().checkOutputSave = false;
    }

    /** @return 見積金額合計 */
    get estimatedTotal(): number {
        //http://fridaynight.vnext.vn/issues/2337
        return MathUtil.round(MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.estimatedTotal), 0);
    }

    get estimatedUnitPrice(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.estimatedUnitPrice);
    }

    get otherFeeTotalCost(): number {
        return this.helper.getOtherFeeTotalCost();
    }

    get checkBorderLot(): {style: string, radius: string} {
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

    get checkBorderUnitPrice(): {style: string, radius: string} {

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

    /** @return 才数 (運賃計算に使用する) */
    get squareMeter(): number {
        // 展開寸法で計算
        return MathUtil.checkNaN(this.helper.calcMaterialSizeCarton());

        /*
        // 実寸法で計算する場合は
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.dimension);
        */
    }

    get estimatedM2Price(): number {
        return MathUtil.checkNaN(this.helper.calcEstimatedM2PriceCarton());
    }

    /** @return ロット格差 */
    get cartonLotGap(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonLotGap);
    }

    /**
     * ロット格差（＠ロット）
     */
    get cartonLotGapPerLot(): number {
        return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.cartonLotGap / this.helper.getSF00302Data().productOutput.lot);
    }

}