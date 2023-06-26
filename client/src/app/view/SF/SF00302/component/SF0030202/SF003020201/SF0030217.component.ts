import {AfterViewInit, Component, Input, ViewEncapsulation} from "@angular/core";
import {SF00302Data} from "../../../SF00302.data";
import MathUtil from "../../../../../../util/math-util";
import {SF0030217Helper} from "./SF0030217.helper";
import DataUtil from "../../../../../../util/data-util";
import {CARTON_FLUTE, OTHER_METHOD} from "../../../helper/master-option";
import Messages, {MSG} from "../../../../../../helper/message";
import {SF00302Service} from "../../../SF00302.service";
import {Product} from "../../../../../../model/core/Product.model";
import {isNullOrUndefined, isUndefined} from "util";
import {ActivatedRoute, Router} from "@angular/router";
import {HeaderProvider} from "../../../../SF00100/Header.provider";
import {SF003020201Page} from "./SF003020201.page";
import ValidatorUtil from "../../../../../../util/validator-util";
import {FormatUtil} from "../../../../../../util/format-util";

declare var $: JQueryStatic;
declare var App: any;

@Component({
    selector: "sf0030217",
    templateUrl: "SF0030217.component.html",
    styleUrls: ["SF0030217.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class SF0030217Component {

    @Input()
    helper: SF0030217Helper;

    isChanged: boolean = false;
    isChangedFlap: boolean = false;

    size01: number;
    size02: number;
    size03: number;
    size04: number;
    size05: number;
    size06: number;
    size07: number;
    size08: number;
    size09: number;
    size10: number;
    size11: number;
    size12: number;
    specialUpperFlapFlag: number;
    specialLowerFlapFlag: number;

    constructor(private page: SF003020201Page, public route: ActivatedRoute, public router: Router, public headerProvider: HeaderProvider, public sv00302Service: SF00302Service) {

    }

    get isRequestDesign() {
        return this.pageData.isRequestDesign;
    }

    get stateProductSpecCarton() {
        if (this.pageData.product.upperFlap != undefined && this.pageData.product.lowerFlap != undefined && this.pageData.product.sizeD != undefined && this.pageData.product.sizeW != undefined && this.pageData.product.sizeH != undefined) {
            return true;
        } else {
            return false;
        }
    }

    get isView() {
        if (this.isRequestDesign) {
            return false
        } else {
            return this.pageData.isView;
        }
    }

    get isCreateNewProduct() {
        return this.pageData.isCreateNewProduct;
    }

    get laminationFlute(): number {
        if (this.pageData.product.laminationFlute == undefined) {
            this.pageData.product.laminationFlute = 1;
        }
        return this.pageData.product.laminationFlute;
    }

    set laminationFlute(value: number) {
        this.pageData.highlightedTracker.touch('laminationFlute');
        this.pageData.product.laminationFlute = value;
        if (!this.isChanged) {
            this.calcBlankSize(true);
        }
        this.helper.calcMaterialCostTotalCarton();
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialLaminationCarton();
        this.helper.calcMaterialUnitPriceCarton()
        this.helper.calcShipFareCarton();
        if (this.pageData.product.specialUpperFlapFlag != 1) {
            this.pageData.product.upperFlap = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
        }
        this._upperFlapTmp = this.pageData.product.upperFlap;
        if (this.pageData.product.specialLowerFlapFlag != 1) {
            this.pageData.product.lowerFlap = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
        }
        this._lowerFlapTmp = this.pageData.product.lowerFlap;
        this._laminationFluteTmp = value;
        for (let i = 1; i < 13; i++) {
            this.calcSize(i);
        }
        this.setOtherNote1();

    }

    isHighlighted(input) {
        return this.pageData.highlightedTracker.isHighlightedProperty(input);
    }

    calcBlankSize(laminationChange: boolean) {
        var size1;
        var size2;
        let defaultFlap = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
        if (this.laminationFlute == 1) {
            size1 = MathUtil.checkNaN((this.sizeW + this.sizeD) * 2 + 35);
            size2 = MathUtil.checkNaN((this.sizeD + this.sizeH) + 6);
        } else if (this.laminationFlute == 2) {
            size1 = MathUtil.checkNaN((this.sizeW + this.sizeD) * 2 + 30);
            size2 = MathUtil.checkNaN((this.sizeD + this.sizeH) + 4);
        } else if (this.laminationFlute == 3) {
            size1 = MathUtil.checkNaN((this.sizeW + this.sizeD) * 2 + 40);
            size2 = MathUtil.checkNaN((this.sizeD + this.sizeH) + 10);
        } else if (this.laminationFlute == 4) {
            size1 = MathUtil.checkNaN((this.sizeW + this.sizeD) * 2 + 35);
            size2 = MathUtil.checkNaN((this.sizeD + this.sizeH) + 5);
        }
        if (size1 < 0) {
            size1 = 0;
        }
        if (size2 < 0) {
            size2 = 0;
        }
        let upperFlap = this.pageData.product.upperFlap;
        if (isNullOrUndefined(upperFlap) || laminationChange) {
            upperFlap = defaultFlap;
        }
        let lowerFlap = this.pageData.product.lowerFlap;
        if (isNullOrUndefined(lowerFlap) || laminationChange) {
            lowerFlap = defaultFlap;
        }
        this.pageData.product.blankPaperSizeW = MathUtil.checkNaN(size2 + ( upperFlap - defaultFlap) + ( lowerFlap - defaultFlap));
        this.pageData.product.blankPaperSizeH = MathUtil.checkNaN(size1);
        this.blankPaperSizeWTmp = MathUtil.checkNaN(size2 + (upperFlap - defaultFlap) + ( lowerFlap - defaultFlap));
        this.blankPaperSizeHTmp = MathUtil.checkNaN(size1);

        this.pageData.highlightedTracker.touch('blankPaperSize');

        this.helper.calcDimension();
    }

    get cartonShippingType() {
        // Bug 1899
        if (this.pageData.product.cartonShippingType == undefined) {
            this.pageData.product.cartonShippingType = 2;
        }
        if (this.pageData.product.cartonShippingType == 2
            && isNullOrUndefined(this.pageData.product.blankPaperSizeH)
            && isNullOrUndefined(this.pageData.product.blankPaperSizeW)) {
            this.calcBlankSize(true);
        }
        return this.pageData.product.cartonShippingType;
    }

    setCartonShippingType(value: number) {
        this.cartonShippingType = value;

    }

    set cartonShippingType(value: number) {
        this.pageData.highlightedTracker.touch('shippingType');
        this.pageData.product.cartonShippingType = value;
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
        this.helper.calcDimension();
        this.helper.calcSubmittedTotal();
        if (value == 2) {
            if (this.pageData.product.specialUpperFlapFlag != 1) {
                this.pageData.product.upperFlap = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
            }
        } else {
            this.pageData.product.upperFlap = 0;
        }
        this._upperFlapTmp = this.pageData.product.upperFlap;
        if (value == 2) {
            if (this.pageData.product.specialLowerFlapFlag != 1) {
                this.pageData.product.lowerFlap = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
            }
        } else {
            this.pageData.product.lowerFlap = 0;
        }
        this._lowerFlapTmp = this.pageData.product.lowerFlap;
        // Task: 1918, #1757
        if (value === 1) {
            this.pageData.product.sizeW = null;
            this.pageData.product.sizeD = null;
            this.pageData.product.sizeH = null;
            this._sizeDTmp = null;
            this._sizeHTmp = null;
            this._sizeWTmp = null

            for (let i = 1; i < 13; i++) {
                this.calcSize(i);
            }
        } else {
            this.isChanged = false;
        }
        this.pageData.product.blankPaperSizeW = null;
        this.pageData.product.blankPaperSizeH = null;
        this.helper.calcDimension();
        this._blankSizeHTmp = null;
        this._blankSizeWTmp = null;
    }

    public setChange(): void {
        this.isChanged = true;
    }

    get sizeW(): number {
        return this.pageData.product.sizeW;
    }

    set sizeW(value: number) {
        this.pageData.highlightedTracker.touch('size');
        this.pageData.product.sizeW = value;
        this.calcBlankSize(false);
        this.helper.calcMaterialCostTotalCarton();
        this.helper.calcMaterialUnitPriceCarton();
        this.helper.calcShipTotalCarton();
        this.helper.calcProcessingTotalCarton();
        this._sizeWTmp = value;
        for (let i = 1; i < 13; i++) {
            this.calcSize(i);
        }


    }

    get sizeD(): number {
        return this.pageData.product.sizeD;
    }

    set sizeD(value: number) {
        this.pageData.highlightedTracker.touch('size');
        this.pageData.product.sizeD = value;
        this.helper.calcMaterialCostTotalCarton();
        this.helper.calcMaterialUnitPriceCarton();
        this.helper.calcShipTotalCarton();
        this.helper.calcProcessingTotalCarton();
        if (this.pageData.product.specialUpperFlapFlag != 1) {
            this.pageData.product.upperFlap = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
        }
        this._upperFlapTmp = this.pageData.product.upperFlap;
        if (this.pageData.product.specialLowerFlapFlag != 1) {
            this.pageData.product.lowerFlap = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
        }
        this._lowerFlapTmp = this.pageData.product.lowerFlap;
        this.calcBlankSize(false);
        this._sizeDTmp = value;
        for (let i = 1; i < 13; i++) {
            this.calcSize(i);
        }
        this.setOtherNote1();

    }

    get sizeH(): number {
        return this.pageData.product.sizeH;
    }

    set sizeH(value: number) {
        this.pageData.highlightedTracker.touch('size');
        this.pageData.product.sizeH = value;
        this.calcBlankSize(false);
        this.helper.calcMaterialCostTotalCarton();
        this.helper.calcMaterialUnitPriceCarton();
        this.helper.calcShipTotalCarton();
        this.helper.calcProcessingTotalCarton();
        this._sizeHTmp = value;
        for (let i = 1; i < 13; i++) {
            this.calcSize(i);
        }
    }

    get blankPaperSizeW(): number {
        return this.pageData.product.blankPaperSizeW;
    }

    set blankPaperSizeW(value: number) {
        this.pageData.highlightedTracker.touch('blankPaperSize');
        this.pageData.product.blankPaperSizeW = value;
        if (this.pageData.product.cartonTapeCutting > 0) {
            if (this.pageData.product.blankPaperSizeH > this.pageData.product.blankPaperSizeW) {
                this.pageData.product.cartonTapeCutting = this.pageData.product.blankPaperSizeH;
            } else {
                this.pageData.product.cartonTapeCutting = this.pageData.product.blankPaperSizeW;
            }
        }
        this.helper.calcDimension();
        this.helper.calcMaterialCostTotalCarton();
        this.helper.calcMaterialUnitPriceCarton();
        this.helper.calcShipTotalCarton();
        this.helper.calcProcessingTotalCarton();

    }

    get blankPaperSizeH(): number {
        return this.pageData.product.blankPaperSizeH;
    }

    set blankPaperSizeH(value: number) {
        this.pageData.highlightedTracker.touch('blankPaperSize');

        this.pageData.product.blankPaperSizeH = value;
        if (this.pageData.product.cartonTapeCutting > 0) {
            if (this.pageData.product.blankPaperSizeH > this.pageData.product.blankPaperSizeW) {
                this.pageData.product.cartonTapeCutting = this.pageData.product.blankPaperSizeH;
            } else {
                this.pageData.product.cartonTapeCutting = this.pageData.product.blankPaperSizeW;
            }
        }
        this.helper.calcDimension();
        this.helper.calcMaterialCostTotalCarton();
        this.helper.calcMaterialUnitPriceCarton();
        this.helper.calcShipTotalCarton();
        this.helper.calcProcessingTotalCarton();

    }

    get cartonFluteOption() {
        return CARTON_FLUTE;
    }

    // フルート
    get checkBorderLaminationFulte(): { style: string, radius: string } {

        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.xCheck) {
                return this.pageData.defaultFieldBorderCss;
            } else {
                return this.pageData.noneFieldBorderCss;
            }
        }
    }

    // 製品寸法（mm)
    get checkBorderSizeW(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveSizeW) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    get checkBorderSizeD(): { style: string, radius: string } {

        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveSizeD) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }

    }

    get checkBorderSizeH(): { style: string, radius: string } {

        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveSizeH) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    // 展開寸法（mm）
    get checkBorderBlankPaperSizeW(): { style: string, radius: string } {

        return this.pageData.noneFieldBorderCss;
    }

    get checkBorderBlankPaperSizeH(): { style: string, radius: string } {
        return this.pageData.noneFieldBorderCss;
    }

    set upperFlap(value: number) {
        this.pageData.highlightedTracker.touch('flap');
        let result = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
        if (MathUtil.checkNaN(value) == result) {
            this.pageData.product.specialUpperFlapFlag = 0;
            this.pageData.product.upperFlap = result;
            this._upperFlapTmp = this.pageData.product.upperFlap;
        }
        if (this.pageData.product.upperFlap !== value) {
            this.pageData.product.specialUpperFlapFlag = 1;
            this.pageData.product.upperFlap = value;
            this._upperFlapTmp = value;
        }
        this.calcBlankSize(false);
        for (let i = 1; i < 13; i++) {
            this.calcSize(i);
        }
        this.setOtherNote1();
    }

    get upperFlap() {
        return this.pageData.product.upperFlap;
    }

    _upperFlapTmp: number;
    _sizeDTmp: number;
    _sizeHTmp: number;
    _sizeWTmp: number;
    _laminationFluteTmp: number;
    _blankSizeWTmp: number;
    _blankSizeHTmp: number;
    _lowerFlapTmp: number;

    set upperFlapTmp(value: number) {
        let result = this.helper.calcFlap(this.pageData.product.cartonShippingType, this._laminationFluteTmp, this._sizeDTmp);
        if (MathUtil.checkNaN(value) == result) {
            this.pageData.product.specialUpperFlapFlag = 0;
            this._upperFlapTmp = result;
        }
        if (result != value) {
            this.pageData.product.specialUpperFlapFlag = 1;
            this._upperFlapTmp = value;

        }

        this.calcBlankSizeTmp(false);

        for (let i = 1; i < 13; i++) {
            this.calcSize(i);
        }
    }

    get upperFlapTmp() {
        if (isUndefined(this._upperFlapTmp)) {
            this._upperFlapTmp = this.pageData.product.upperFlap;
        }
        return this._upperFlapTmp;
    }

    set sizeDTmp(value: number) {
        this._sizeDTmp = value;
        if (this.pageData.product.specialUpperFlapFlag != 1) {
            this._upperFlapTmp = this.helper.calcFlap(this.pageData.product.cartonShippingType, this._laminationFluteTmp, this._sizeDTmp);
        }
        if (this.pageData.product.specialLowerFlapFlag != 1) {
            this._lowerFlapTmp = this.helper.calcFlap(this.pageData.product.cartonShippingType, this._laminationFluteTmp, this._sizeDTmp);
        }
        this.calcBlankSizeTmp(false);
        for (let i = 1; i < 13; i++) {
            this.calcSize(i);
        }

    }

    get sizeDTmp() {
        if (isUndefined(this._sizeDTmp)) {
            this._sizeDTmp = this.sizeD;
        }
        return this._sizeDTmp;
    }

    set sizeHTmp(value: number) {
        this._sizeHTmp = value;
        this.calcBlankSizeTmp(false);

        for (let i = 1; i < 13; i++) {
            this.calcSize(i);
        }

    }


    get sizeHTmp() {
        if (isUndefined(this._sizeHTmp)) {
            this._sizeHTmp = this.sizeH;
        }
        return this._sizeHTmp;
    }

    set sizeWTmp(value: number) {
        this._sizeWTmp = value;
        this.calcBlankSizeTmp(false);
        for (let i = 1; i < 13; i++) {
            this.calcSize(i);
        }

    }

    get sizeWTmp() {
        if (isUndefined(this._sizeWTmp)) {
            this._sizeWTmp = this.sizeW;
        }
        return this._sizeWTmp;
    }

    set laminationFluteTmp(value: number) {
        this._laminationFluteTmp = value;
        if (this.pageData.product.specialUpperFlapFlag != 1) {
            this._upperFlapTmp = this.helper.calcFlap(this.pageData.product.cartonShippingType, this._laminationFluteTmp, this._sizeDTmp);
        }
        if (this.pageData.product.specialLowerFlapFlag != 1) {
            this._lowerFlapTmp = this.helper.calcFlap(this.pageData.product.cartonShippingType, this._laminationFluteTmp, this._sizeDTmp);
        }

        this.calcBlankSizeTmp(true);
        for (let i = 1; i < 13; i++) {
            this.calcSize(i);
        }

    }

    get laminationFluteTmp() {
        if (isUndefined(this._laminationFluteTmp)) {
            this._laminationFluteTmp = this.laminationFlute;
        }
        return this._laminationFluteTmp;
    }

    saveFlap() {

        this.saveProduct();
        this.pageData.checkInputSave = false;
    }

    get blankPaperSizeWTmp() {
        if (isUndefined(this._blankSizeWTmp)) {
            this._blankSizeWTmp = this.blankPaperSizeW;
        }
        return MathUtil.checkNaN(this._blankSizeWTmp);
    }

    set blankPaperSizeWTmp(value: number) {
        this._blankSizeWTmp = value;

    }

    get blankPaperSizeHTmp() {
        if (isUndefined(this._blankSizeHTmp)) {
            this._blankSizeHTmp = this.blankPaperSizeH;
        }
        return MathUtil.checkNaN(this._blankSizeHTmp);
    }

    set blankPaperSizeHTmp(value: number) {
        this._blankSizeHTmp = value;

    }

    calcBlankSizeTmp(laminationChange: boolean) {
        var size1;
        var size2;
        let defaultFlap = this.helper.calcFlap(this.pageData.product.cartonShippingType, this._laminationFluteTmp, this._sizeDTmp);
        if (this._laminationFluteTmp == 1) {
            size1 = MathUtil.checkNaN((this._sizeWTmp + this._sizeDTmp) * 2 + 35);
            size2 = MathUtil.checkNaN((this._sizeDTmp + this._sizeHTmp) + 6);
        } else if (this._laminationFluteTmp == 2) {
            size1 = MathUtil.checkNaN((this._sizeWTmp + this._sizeDTmp) * 2 + 30);
            size2 = MathUtil.checkNaN((this._sizeDTmp + this._sizeHTmp) + 4);
        } else if (this._laminationFluteTmp == 3) {
            size1 = MathUtil.checkNaN((this._sizeWTmp + this._sizeDTmp) * 2 + 40);
            size2 = MathUtil.checkNaN((this._sizeDTmp + this._sizeHTmp) + 10);
        } else if (this._laminationFluteTmp == 4) {
            size1 = MathUtil.checkNaN((this._sizeWTmp + this._sizeDTmp) * 2 + 35);
            size2 = MathUtil.checkNaN((this._sizeDTmp + this._sizeHTmp) + 5);
        }
        if (size1 < 0) {
            size1 = 0;
        }
        if (size2 < 0) {
            size2 = 0;
        }
        let upperFlap = this._upperFlapTmp;
        if (isNullOrUndefined(upperFlap) || laminationChange) {
            upperFlap = defaultFlap;
        }
        let lowerFlap = this._lowerFlapTmp;
        if (isNullOrUndefined(lowerFlap) || laminationChange) {
            lowerFlap = defaultFlap;
        }
        this.blankPaperSizeWTmp = MathUtil.checkNaN(size2 + (upperFlap - defaultFlap) + (lowerFlap - defaultFlap));
        this.blankPaperSizeHTmp = MathUtil.checkNaN(size1);

    }

    get laminationFluteTmpName() {
        if (this._laminationFluteTmp != 0) {
            CARTON_FLUTE.forEach(data => {
                if (data.id == this._laminationFluteTmp) {
                    return data.name;
                }
            })
        } else {
            return null;
        }
    }

    get calcDimension() {
        if (this._laminationFluteTmp != 0) {
            let result = this.size01;
            let factor = this.size11;
            if (this._laminationFluteTmp == 1) {
                return MathUtil.roundDecimal(MathUtil.checkNaN(result / 1000 * factor / 1000), 4);
            } else if (this._laminationFluteTmp == 2) {
                return MathUtil.roundDecimal(MathUtil.checkNaN(result / 1000 * factor / 1000), 4);
            } else if (this._laminationFluteTmp == 3) {
                return MathUtil.roundDecimal(MathUtil.checkNaN(result / 1000 * factor / 1000 * 1.5), 4);
            } else if (this._laminationFluteTmp == 4) {
                return MathUtil.roundDecimal(MathUtil.checkNaN(result / 1000 * factor / 1000), 4);
            }
        } else {
            return 0;
        }

    }

    get pageData(): SF00302Data {
        return this.helper.getSF00302Data();
    }

    saveProduct() {
        this.pageData.product.laminationFlute = this._laminationFluteTmp;
        this.pageData.product.sizeD = this._sizeDTmp;
        this.pageData.product.sizeH = this._sizeHTmp;
        this.pageData.product.sizeW = this._sizeWTmp;
        this.pageData.product.upperFlap = this._upperFlapTmp;
        this.pageData.product.lowerFlap = this._lowerFlapTmp;
        this.pageData.product.blankPaperSizeW = this._blankSizeWTmp;
        this.pageData.product.blankPaperSizeH = this._blankSizeHTmp;
        let product = new Product();
        product.setProduct(this.pageData.product);
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
        this.sv00302Service.sv003012UpdateProductInput(product).then(res => {
            $.notify({message: Messages.get(MSG.SF00302.INF006)}, {type: 'info'});
        })
        this.setOtherNote1();
        this.closeModal(true);

    }

    closeModal(isSave: boolean) {
        $("#draw-modal").modal('hide');
        this._sizeHTmp = this.sizeH;
        this._sizeWTmp = this.sizeW;
        this._sizeDTmp = this.sizeD;
        this._laminationFluteTmp = this.laminationFlute;
        this._blankSizeHTmp = this.blankPaperSizeH;
        this._blankSizeWTmp = this.blankPaperSizeW;
        this._upperFlapTmp = this.upperFlap;
        this._lowerFlapTmp = this.lowerFlap;
        this.helper.validateForm();
        if (!isSave) {
            this.pageData.product.specialUpperFlapFlag = this.specialUpperFlapFlag;
            this.pageData.product.specialLowerFlapFlag = this.specialLowerFlapFlag;
        }
    }

    getSize(pos: number): number {
        let value = 0;
        switch (pos) {
            case 1:
                value = this.size01;
                break;
            case 2:
                value = this.size02;
                break;
            case 3:
                value = this.size03;
                break;
            case 4:
                value = this.size04;
                break;
            case 5:
                value = this.size05;
                break;
            case 6:
                value = this.size06;
                break;
            case 7:
                value = this.size07;
                break;
            case 8:
                value = this.size08;
                break;
            case 9:
                value = this.size09;
                break;
            case 10:
                value = this.size10;
                break;
            case 11:
                value = this.size11;
                break;
            case 12:
                value = this.size12;
                break;
        }
        if (isNaN(value)) {
            return 0;
        } else {
            return value;
        }
    }

    calcSize(pos: number): number {
        let value = 0;
        switch (pos) {
            case 1:
                if (!(isNullOrUndefined(this.size02) && isNullOrUndefined(this.size03) && isNullOrUndefined(this.size04))) {
                    value = MathUtil.checkNaN(this.size02 + this.size03 + this.size04);
                    this.size01 = value;
                }
                break;
            case 2:
                if (!(isNullOrUndefined(this.size05) && isNullOrUndefined(this.size06))) {
                    value = MathUtil.checkNaN(this.size05 + this.size06);
                    this.size02 = value;
                    this.calcSize(1);
                }
                break;
            case 3:
                if (!(isNullOrUndefined(this.size07) && isNullOrUndefined(this.size08))) {
                    value = MathUtil.checkNaN(this.size07 + this.size08);
                    this.size03 = value;
                    this.calcSize(1);
                }
                break;
            case 4:
                if (this.laminationFluteTmp == 1) {
                    value = 35;
                } else if (this.laminationFluteTmp == 2) {
                    value = 30;
                } else if (this.laminationFluteTmp == 3) {
                    value = 40;
                } else if (this.laminationFluteTmp == 4) {
                    value = 35;
                }
                this.size04 = value;
                this.calcSize(1);
                break;
            case 5:
                if (this.sizeWTmp >= 3) {
                    value = MathUtil.checkNaN(this.sizeWTmp - 3);
                }
                this.size05 = MathUtil.checkNaN(value);
                this.calcSize(2);
                break;
            case 6:
                value = this.sizeDTmp;
                this.size06 = MathUtil.checkNaN(value);
                this.calcSize(2);
                break;
            case 7:
                value = this.sizeWTmp;
                this.size07 = MathUtil.checkNaN(value);
                this.calcSize(3);
                break;
            case 8:
                if (this.laminationFluteTmp == 1) {
                    value = this.sizeDTmp - 3;
                } else if (this.laminationFluteTmp == 2) {
                    value = this.sizeDTmp - 2;
                } else if (this.laminationFluteTmp == 3) {
                    value = this.sizeDTmp - 4;
                } else if (this.laminationFluteTmp == 4) {
                    value = this.sizeDTmp - 3;
                }
                if (value < 0) {
                    value = 0;
                }
                this.size08 = MathUtil.checkNaN(value);
                this.calcSize(3);
                break;
            case 9:
                value = this.upperFlapTmp;
                if (isNullOrUndefined(value)) {
                    value = this.defaultFlapTmp;
                }
                ;
                this.size09 = MathUtil.checkNaN(value);
                this.calcSize(11);
                break;
            case 10:
                value = this.sizeHTmp;
                this.size10 = MathUtil.checkNaN(value);
                this.calcSize(11);
                break;
            case 11:
                value = MathUtil.checkNaN(this.size10 + this.size09 + this.size12);
                this.size11 = value;
                break;
            case 12:
                value = this.lowerFlapTmp;
                if (isNullOrUndefined(value)) {
                    value = this.defaultFlapTmp;
                }
                ;
                this.size12 = MathUtil.checkNaN(value);
                this.calcSize(11);
                break;
        }
        if (isNaN(value)) {
            return 0;
        } else {
            return value;
        }
    }

    get isCreat(): boolean {
        return this.pageData.product == null || this.pageData.product.id == null;
    }

    get defaultFlap() {
        return this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
    }

    get defaultFlapTmp() {
        return this.helper.calcFlap(this.pageData.product.cartonShippingType, this._laminationFluteTmp, this._sizeDTmp);
    }

    get takenNumber(): number {
        this.pageData.product.takenNumber = MathUtil.checkNaN(this.pageData.product.takenNumber);
        return this.pageData.product.takenNumber;
    }

    set takenNumber(value: number) {

        this.pageData.highlightedTracker.touch('takenNumber');
        this.pageData.product.takenNumber = value;
    }

    get checkBorderTakenNumber(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveTakenNumber) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                if (this.pageData.xCheck) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

    get upperFlapChange() {
        let result = MathUtil.checkNaN(this.pageData.product.upperFlap - this.defaultFlap);
        if (result > 0) {
            return "+" + FormatUtil.formatNumber(MathUtil.round(result, 1), 1);
        } else if (result < 0) {
            return FormatUtil.formatNumber(MathUtil.round(result, 1), 1);
        }
        return result.toString();
    }

    get lowerFlapChange() {
        let result = MathUtil.checkNaN(this.pageData.product.lowerFlap - this.defaultFlap);
        if (result > 0) {
            return "+" + FormatUtil.formatNumber(MathUtil.round(result, 1), 1);
        } else if (result < 0) {
            return FormatUtil.formatNumber(MathUtil.round(result, 1), 1);
        }
        return result.toString();
    }

    get upperFlapChangeTmp() {
        let result = MathUtil.checkNaN(this._upperFlapTmp - this.defaultFlapTmp);
        if (result > 0) {
            return "+" + FormatUtil.formatNumber(MathUtil.round(result, 1), 1);
        } else if (result < 0) {
            return FormatUtil.formatNumber(MathUtil.round(result, 1), 1);
        }
        return result.toString();
    }


    get lowerFlapChangeTmp() {
        let result = MathUtil.checkNaN(this._lowerFlapTmp - this.defaultFlapTmp);
        if (result > 0) {
            return "+" + FormatUtil.formatNumber(MathUtil.round(result, 1), 1);
        } else if (result < 0) {
            return FormatUtil.formatNumber(MathUtil.round(result, 1), 1);
        }
        return result.toString();
    }

    get lowerFlap() {
        return this.pageData.product.lowerFlap;
    }

    set lowerFlap(value: number) {
        this.pageData.highlightedTracker.touch('flap');
        let result = this.helper.calcFlap(this.pageData.product.cartonShippingType, this.pageData.product.laminationFlute, this.pageData.product.sizeD);
        if (MathUtil.checkNaN(value) == result) {
            this.pageData.product.specialLowerFlapFlag = 0;
            this.pageData.product.lowerFlap = result;
            this._lowerFlapTmp = this.pageData.product.lowerFlap;
        }
        if (this.pageData.product.lowerFlap !== value) {
            this.pageData.product.specialLowerFlapFlag = 1;
            this.pageData.product.lowerFlap = value;
            this._lowerFlapTmp = value;
        }
        this.calcBlankSize(false);
        for (let i = 1; i < 13; i++) {
            this.calcSize(i);
        }
        this.setOtherNote1();
    }

    set lowerFlapTmp(value: number) {
        let result = this.helper.calcFlap(this.pageData.product.cartonShippingType, this._laminationFluteTmp, this._sizeDTmp);
        if (MathUtil.checkNaN(value) == result) {
            this.pageData.product.specialLowerFlapFlag = 0;
            this._lowerFlapTmp = result;
        }
        if (result != value) {
            this.pageData.product.specialLowerFlapFlag = 1;
            this._lowerFlapTmp = value;

        }

        this.calcBlankSizeTmp(false);

        for (let i = 1; i < 13; i++) {
            this.calcSize(i);
        }
    }

    get lowerFlapTmp() {
        if (isUndefined(this._lowerFlapTmp)) {
            this._lowerFlapTmp = this.pageData.product.lowerFlap;
        }
        return this._lowerFlapTmp;
    }

    cloneValue(value: number): number {
        return value;
    }

    autoCalcSize() {
        this.specialUpperFlapFlag = this.cloneValue(this.pageData.product.specialUpperFlapFlag);
        this.specialLowerFlapFlag = this.cloneValue(this.pageData.product.specialLowerFlapFlag);
        for (let i = 1; i < 13; i++) {
            this.calcSize(i);
        }
        this.calcBlankSizeTmp(false);

        $("#draw-modal").modal('show');
    }

    openImage() {
        window.open("/assets/img/SGSK_cartonMachine_170523.jpg", '_blank');
    }

    setOtherNote1() {
        if (this.pageData.product.specialNote1Flag != 1) {
            let method1 = OTHER_METHOD[this.pageData.product.otherMethod1];
            if (this.pageData.product.otherMethod1 == 4) {
                method1 = method1 + "上" + this.upperFlapChange + "mm" + "下" + this.lowerFlapChange + "mm";
            }
            let method2 = OTHER_METHOD[this.pageData.product.otherMethod2]
            if (this.pageData.product.otherMethod2 == 4) {
                method2 = method2 + "上" + this.upperFlapChange + "mm" + "下" + this.lowerFlapChange + "mm";
            }
            if (method1 == "なし") {
                if (method2 != undefined && method2 != "なし") {
                    this.pageData.product.memo1 = method2;
                } else {
                    this.pageData.product.memo1 = "";
                }
            } else {
                if (method2 != undefined && method2 != "なし") {
                    this.pageData.product.memo1 = method1 + "／" + method2;
                } else {
                    this.pageData.product.memo1 = method1;
                }
            }
        }

    }
}