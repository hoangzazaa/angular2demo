import {Component, Input, OnInit} from "@angular/core";
import {SF00302Data} from "../../SF00302.data";
import MathUtil from "../../../../../util/math-util";
import {SF0030218Helper} from "./SF0030218.helper";
import {CARTON_LAMINATION_FIRST_OPTION, CARTON_LAMINATION_SECOND_OPTION} from "../../helper/master-option";
import ValidatorUtil from "../../../../../util/validator-util";
import {PaperModel} from "../../model/paper.model";
import DataUtil from "../../../../../util/data-util";
import {isNullOrUndefined} from "util";

declare var $: JQueryStatic;
declare var App: any;


const PAPER_1 = 1, PAPER_2 = 2, PAPER_3 = 3, PAPER_4 = 4, PAPER_5 = 5;
const BATCH_USER = 272;
const TYPE_FRONT = 100, TYPE_B = 101, TYPE_MEDIUM = 102, TYPE_A = 103, TYPE_BACK = 104;

@Component({
    selector: "sf0030218",
    templateUrl: "SF0030218.component.html",
    styles: [`
        #laminationA .form-control[disabled], #laminationB .form-control[disabled] {
            background-color: white;
            color: grey;
        }`]
})
/**
 * Component quotation info
 * @author DungTQ
 * */

export class SF0030218Component implements OnInit {

    ngOnInit(): void {
        // create contructor
        this.pageData.paperTmp1 = new PaperModel();
        this.pageData.paperTmp2 = new PaperModel();
        this.pageData.paperTmp3 = new PaperModel();
        this.pageData.paperTmp4 = new PaperModel();
        this.pageData.paperTmp5 = new PaperModel();
        // init mst data
        this.initDataMst();
    }

    get paperTmp1(): PaperModel {
        return this.pageData.paperTmp1;
    }

    get paperTmp2(): PaperModel {
        return this.pageData.paperTmp2;
    }

    get paperTmp3(): PaperModel {
        return this.pageData.paperTmp3;
    }

    get paperTmp4(): PaperModel {
        return this.pageData.paperTmp4;
    }

    get paperTmp5(): PaperModel {
        return this.pageData.paperTmp5;
    }

    @Input()
    helper: SF0030218Helper;

    // value selected after
    idSelectedTmp: number;

    // input option = [1,2,3,4,5]
    inputPaperOption: number;

    constructor(public sf00302Data: SF00302Data) {
    }

    get isRequestDesign() {
        return this.pageData.isRequestDesign;
    }

    get isCreateNewProduct() {
        return this.pageData.isCreateNewProduct;
    }

    isHighlighted(input) {
        return this.pageData.highlightedTracker.isHighlightedProperty(input);
    }

    _laminationWeightBackOption: any
    _laminationWeightMediumOption: any;
    _laminationWeightFrontOption: any;
    _laminationWeightAOption: any;
    _laminationWeightBOption: any;

    get laminationMediumBasicWeight(): number {
        if (this.pageData.product.laminationMediumBasicWeight == undefined) {
            if (this.pageData.product.laminationPaperTypeMedium < 99 && this.pageData.product.laminationPaperTypeMedium != 0) {
                this.pageData.product.laminationMediumBasicWeight = +Object.keys(this._laminationWeightMediumOption)[0];
            } else {
                this.pageData.product.laminationMediumBasicWeight = undefined;
            }
        }
        return this.pageData.product.laminationMediumBasicWeight;
    }

    setLaminationMediumBasicWeightConcealed(value: number) {
        this.pageData.product.laminationMediumBasicWeight = value;

        if (this.pageData.product.laminationPaperTypeMedium != 0) {
            if (!isNullOrUndefined(this._laminationWeightMediumOption)) {
                this.setLaminationMediumThroughWageConcealed(MathUtil.checkNaN(this._laminationWeightMediumOption[value]["throughWage"]));
            } else {
                this.setLaminationMediumThroughWageConcealed(0);
            }
        }
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    }

    set laminationMediumBasicWeight(value: number) {
        this.pageData.highlightedTracker.touch('laminationMediumBasicWeight');
        this.setLaminationMediumBasicWeightConcealed(value);

    }

    get laminationMediumThroughWage(): number {
        return MathUtil.checkNaN(this.pageData.product.laminationMediumThroughWage);

    }

    set laminationMediumThroughWage(value: number) {
        this.setLaminationMediumThroughWageConcealed(value);
    }

    get laminationPaperTypeMedium(): number {
        if (this.pageData.product.id && this.pageData.product.laminationPaperTypeMedium == TYPE_MEDIUM) {
            this._laminationWeightMediumOption = this.pageData.product.laminationPaperTypeMedium;

            return this.pageData.product.laminationPaperTypeMedium;
        }

        if (this.pageData.product.laminationPaperTypeMedium != undefined) {
            this._laminationWeightMediumOption = this.pageData.mstData.mstLamination[this.pageData.product.laminationPaperTypeMedium];
            return this.pageData.product.laminationPaperTypeMedium
        }
        this.pageData.product.laminationPaperTypeMedium = 0;
        return 0;
    }

    set laminationPaperTypeMedium(value: number) {
        //FIXME: 2409
        if (value == 99) {
            this.inputPaperOption = PAPER_3;
            this.idSelectedTmp = DataUtil.cloneObject(this.pageData.product).laminationPaperTypeMedium;
            this.modalShow();
        } else {
            this.pageData.highlightedTracker.touch('laminationMediumBasicWeight');
            this.setLaminationPaperTypeMediumConcealed(value);
            //this.helper.validateForm();
        }
    }

    setLaminationPaperTypeMediumConcealed(value: number) {
        this.pageData.product.laminationPaperTypeMedium = value;
        if (value != 99 && value != 0) {
            this._laminationWeightMediumOption = this.pageData.mstData.mstLamination[value];
            if (!isNullOrUndefined(this._laminationWeightMediumOption)) {
                let result = Object.keys(this._laminationWeightMediumOption);
                if (this.pageData.product.laminationPaperTypeMedium == 6) {
                    result.splice(result.indexOf("170"), 1);
                }
                this.setLaminationMediumBasicWeightConcealed(+result[0]);
            } else {
                this.setLaminationMediumBasicWeightConcealed(0);
                this.setLaminationMediumThroughWageConcealed(0);
            }
        } else {
            this.setLaminationMediumBasicWeightConcealed(0);
            this.setLaminationMediumThroughWageConcealed(0);
        }
    }


    get laminationWeightMediumOption(): any {
        if (this._laminationWeightMediumOption != undefined) {
            if (this._laminationWeightMediumOption != TYPE_MEDIUM) {
                let result = Object.keys(this._laminationWeightMediumOption);
                if (this.pageData.product.laminationPaperTypeMedium == 6) {
                    result.splice(result.indexOf("170"), 1);
                }
                return result;
            } else {
                let result = [];
                result.push(this.pageData.product.laminationMediumBasicWeight);
                return result;
            }
        }
        let result = [];
        result.push(0);
        return result;
    }

    setLaminationMediumThroughWageConcealed(value: number) {
        this.pageData.product.laminationMediumThroughWage = value;
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    }

    get laminationFrontBasicWeight(): number {
        if (this.pageData.product.laminationFrontBasicWeight == undefined) {
            if (this.pageData.product.laminationPaperTypeFront < 99 && this.pageData.product.laminationPaperTypeFront != 0) {
                this.pageData.product.laminationFrontBasicWeight = +Object.keys(this._laminationWeightFrontOption)[0];
            } else {
                this.pageData.product.laminationFrontBasicWeight = undefined;
            }
        }
        return this.pageData.product.laminationFrontBasicWeight;
    }

    setLaminationFrontBasicWeightConcealed(value: number) {
        this.pageData.product.laminationFrontBasicWeight = value;

        if (this.pageData.product.laminationPaperTypeFront != 0) {
            if (!isNullOrUndefined(this._laminationWeightFrontOption)) {
                this.setLaminationFrontThroughWageConcealed(MathUtil.checkNaN(this._laminationWeightFrontOption[value]["throughWage"]));
            } else {
                this.setLaminationFrontThroughWageConcealed(0);
            }
        }

        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    }

    set laminationFrontBasicWeight(value: number) {
        this.pageData.highlightedTracker.touch('laminationFrontBasicWeight');
        this.setLaminationFrontBasicWeightConcealed(value);
        this.helper.validateForm();
    }

    get laminationFrontThroughWage(): number {
        return MathUtil.checkNaN(this.pageData.product.laminationFrontThroughWage);

    }

    set laminationFrontThroughWage(value: number) {
        this.setLaminationFrontThroughWageConcealed(value);
    }

    get laminationPaperTypeFront(): number {
        if (this.pageData.product.id && this.pageData.product.laminationPaperTypeFront == TYPE_FRONT) {
            this._laminationWeightFrontOption = this.pageData.product.laminationPaperTypeFront;
            return this.pageData.product.laminationPaperTypeFront;
        }

        if (this.pageData.product.laminationPaperTypeFront != undefined) {
            this._laminationWeightFrontOption = this.pageData.mstData.mstLamination[this.pageData.product.laminationPaperTypeFront];
            return this.pageData.product.laminationPaperTypeFront
        }
        this.pageData.product.laminationPaperTypeFront = 0;
        return 0;
    }

    set laminationPaperTypeFront(value: number) {
        //FIXME: 2409
        if (value == 99) {
            this.inputPaperOption = PAPER_1;
            this.idSelectedTmp = DataUtil.cloneObject(this.pageData.product).laminationPaperTypeFront;
            this.modalShow();
        } else {
            this.pageData.highlightedTracker.touch('laminationFrontBasicWeight');
            this.setLaminationPaperTypeFrontConcealed(value);
        }
        //this.helper.validateForm();
    }

    setLaminationPaperTypeFrontConcealed(value: number) {
        this.pageData.product.laminationPaperTypeFront = value;
        if (value != 99 && value != 0) {
            this._laminationWeightFrontOption = this.pageData.mstData.mstLamination[value];
            if (!isNullOrUndefined(this._laminationWeightFrontOption)) {
                let result = Object.keys(this._laminationWeightFrontOption);
                if (this.pageData.product.laminationPaperTypeFront == 6) {
                    result.splice(result.indexOf("170"), 1);
                }
                this.setLaminationFrontBasicWeightConcealed(+result[0]);
            } else {
                this.setLaminationFrontBasicWeightConcealed(0);
                this.setLaminationFrontThroughWageConcealed(0);
            }
        } else {
            this.setLaminationFrontBasicWeightConcealed(0);
            this.setLaminationFrontThroughWageConcealed(0);
        }
    }


    get laminationWeightFrontOption(): any {
        if (this._laminationWeightFrontOption != undefined) {
            if (this._laminationWeightFrontOption != TYPE_FRONT) {
                let result = Object.keys(this._laminationWeightFrontOption);
                if (this.pageData.product.laminationPaperTypeFront == 6) {
                    result.splice(result.indexOf("170"), 1);
                }
                return result;
            } else {
                let result = [];
                result.push(this.pageData.product.laminationFrontBasicWeight);
                return result;
            }
        }
        let result = [];
        result.push(0);
        return result;
    }

    setLaminationFrontThroughWageConcealed(value: number) {
        this.pageData.product.laminationFrontThroughWage = value;
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    }

    get laminationBackBasicWeight(): number {
        if (this.pageData.product.laminationBackBasicWeight == undefined) {
            if (this.pageData.product.laminationPaperTypeBack < 99 && this.pageData.product.laminationPaperTypeBack != 0) {
                this.pageData.product.laminationBackBasicWeight = +Object.keys(this._laminationWeightBackOption)[0];
            } else {
                this.pageData.product.laminationBackBasicWeight = undefined;
            }
        }
        return this.pageData.product.laminationBackBasicWeight;
    }

    setLaminationBackBasicWeightConcealed(value: number) {
        this.pageData.product.laminationBackBasicWeight = value;

        if (this.pageData.product.laminationPaperTypeBack != 0) {
            if (!isNullOrUndefined(this._laminationWeightBackOption)) {
                this.setLaminationBackThroughWageConcealed(MathUtil.checkNaN(this._laminationWeightBackOption[value]["throughWage"]));
            } else {
                this.setLaminationBackThroughWageConcealed(0);
            }
        }

        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    }

    set laminationBackBasicWeight(value: number) {
        this.pageData.highlightedTracker.touch('laminationBackBasicWeight');
        this.setLaminationBackBasicWeightConcealed(value);

    }

    get laminationBackThroughWage(): number {
        return MathUtil.checkNaN(this.pageData.product.laminationBackThroughWage);

    }

    set laminationBackThroughWage(value: number) {
        this.setLaminationBackThroughWageConcealed(value);

    }

    get laminationPaperTypeBack(): number {
        if (this.pageData.product.id && this.pageData.product.laminationPaperTypeBack == TYPE_BACK) {
            this._laminationWeightBackOption = this.pageData.product.laminationPaperTypeBack;
            return this.pageData.product.laminationPaperTypeBack;
        }

        if (this.pageData.product.laminationPaperTypeBack != undefined) {
            this._laminationWeightBackOption = this.pageData.mstData.mstLamination[this.pageData.product.laminationPaperTypeBack];
            return this.pageData.product.laminationPaperTypeBack
        }
        this.pageData.product.laminationPaperTypeBack = 0;
        return 0;
    }

    set laminationPaperTypeBack(value: number) {
        //this.helper.validateForm();
        //FIXME: 2409
        if (value == 99) {
            this.inputPaperOption = PAPER_5;
            this.idSelectedTmp = DataUtil.cloneObject(this.pageData.product).laminationPaperTypeBack;
            this.modalShow();
        } else {
            this.pageData.highlightedTracker.touch('laminationBackBasicWeight');
            this.setLaminationPaperTypeBackConcealed(value);
        }
    }

    setLaminationPaperTypeBackConcealed(value: number) {
        this.pageData.product.laminationPaperTypeBack = value;
        if (value != 99 && value != 0) {
            this._laminationWeightBackOption = this.pageData.mstData.mstLamination[value];
            if (!isNullOrUndefined(this._laminationWeightBackOption)) {
                let result = Object.keys(this._laminationWeightBackOption);
                if (this.pageData.product.laminationPaperTypeBack == 6) {
                    result.splice(result.indexOf("170"), 1);
                }
                this.setLaminationBackBasicWeightConcealed(+result[0]);
            } else {
                this.setLaminationBackBasicWeightConcealed(0);
                this.setLaminationBackThroughWageConcealed(0);
            }
        } else {
            this.setLaminationBackBasicWeightConcealed(0);
            this.setLaminationBackThroughWageConcealed(0);
        }
    }


    get laminationWeightBackOption(): any {
        if (this._laminationWeightBackOption != undefined) {
            if (this._laminationWeightBackOption != TYPE_BACK) {
                let result = Object.keys(this._laminationWeightBackOption);
                if (this.pageData.product.laminationPaperTypeBack == 6) {
                    result.splice(result.indexOf("170"), 1);
                }
                return result;
            } else {
                let result: number[] = [];
                result.push(this.pageData.product.laminationBackBasicWeight);
                return result;
            }
        }
        let result = [];
        result.push(0);
        return result;
    }

    setLaminationBackThroughWageConcealed(value: number) {
        this.pageData.product.laminationBackThroughWage = value;
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    }

    get laminationABasicWeight(): number {
        if (this.pageData.product.laminationABasicWeight == undefined) {
            if (this.pageData.product.laminationPaperTypeA < 99 && this.pageData.product.laminationPaperTypeA != 0) {

                this.pageData.product.laminationABasicWeight = +Object.keys(this._laminationWeightAOption)[0];
            } else {
                this.pageData.product.laminationABasicWeight = undefined;
            }
        }
        return this.pageData.product.laminationABasicWeight;
    }

    setLaminationABasicWeightConcealed(value: number) {
        this.pageData.product.laminationABasicWeight = value;

        if (this.pageData.product.laminationPaperTypeA != 0) {
            if (!isNullOrUndefined(this._laminationWeightAOption)) {
                this.setLaminationAThroughWageConcealed(MathUtil.checkNaN(this._laminationWeightAOption[value]["throughWage"]));
            } else {
                this.setLaminationAThroughWageConcealed(0);
            }
        }

        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    }

    set laminationABasicWeight(value: number) {
        this.pageData.highlightedTracker.touch('laminationABasicWeight');
        this.setLaminationABasicWeightConcealed(value);
    }

    get laminationAThroughWage(): number {
        return MathUtil.checkNaN(this.pageData.product.laminationAThroughWage);

    }

    set laminationAThroughWage(value: number) {
        this.setLaminationAThroughWageConcealed(value);

    }

    get laminationPaperTypeA(): number {
        if (this.pageData.product.id && this.pageData.product.laminationPaperTypeA == TYPE_A) {
            this._laminationWeightAOption = this.pageData.product.laminationPaperTypeA;
            return this.pageData.product.laminationPaperTypeA;
        }
        if (this.pageData.product.laminationPaperTypeA != undefined) {
            this._laminationWeightAOption = this.pageData.mstData.mstLamination[this.pageData.product.laminationPaperTypeA];
            return this.pageData.product.laminationPaperTypeA
        }
        this.pageData.product.laminationPaperTypeA = 0;
        return 0;
    }

    set laminationPaperTypeA(value: number) {
        //FIXME: 2409
        if (value == 99) {
            this.inputPaperOption = PAPER_4;
            this.idSelectedTmp = DataUtil.cloneObject(this.pageData.product).laminationPaperTypeA;
            this.modalShow();
        } else {
            this.pageData.highlightedTracker.touch('laminationABasicWeight');
            this.setLaminationPaperTypeAConcealed(value);
        }
    }

    setLaminationPaperTypeAConcealed(value: number) {
        this.pageData.product.laminationPaperTypeA = value;
        if (value != 99 && value != 0) {
            this._laminationWeightAOption = this.pageData.mstData.mstLamination[value];
            if (!isNullOrUndefined(this._laminationWeightAOption)) {
                let result = Object.keys(this._laminationWeightAOption);
                //TODO: hard code to display only one data
                // if (this.pageData.product.laminationPaperTypeA == 4) {
                //     result.splice(3, 1);
                //     result.splice(0, 1);
                // } else if (this.pageData.product.laminationPaperTypeA == 5) {
                //     result.splice(0, 2);
                // }
                if (this.pageData.product.laminationPaperTypeA == 6) {
                    result.splice(result.indexOf("170"), 1);
                }
                this.setLaminationABasicWeightConcealed(+result[0]);
            } else {
                this.setLaminationABasicWeightConcealed(0);
                this.setLaminationAThroughWageConcealed(0);
            }
        } else {
            this.setLaminationABasicWeightConcealed(0);
            this.setLaminationAThroughWageConcealed(0);
        }
    }


    get laminationWeightAOption(): any {
        if (this._laminationWeightAOption != undefined) {
            if (this._laminationWeightAOption != TYPE_A) {
                let result = Object.keys(this._laminationWeightAOption)
                //TODO: hard code to display only one data
                // if (this.pageData.product.laminationPaperTypeA == 4) {
                //     result.splice(3, 1);
                //     result.splice(0, 1);
                // } else if (this.pageData.product.laminationPaperTypeA == 5) {
                //     result.splice(0, 2);
                // }
                if (this.pageData.product.laminationPaperTypeA == 6) {
                    result.splice(result.indexOf("170"), 1);
                }
                return result;
            } else {
                let result = [];
                result.push(this.pageData.product.laminationABasicWeight);
                return result;
            }
        }
        let result = [];
        result.push(0);
        return result;
    }

    setLaminationAThroughWageConcealed(value: number) {
        this.pageData.product.laminationAThroughWage = value;
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    }

    get laminationBBasicWeight(): number {
        if (this.pageData.product.laminationBBasicWeight == undefined) {
            if (this.pageData.product.laminationPaperTypeB < 99 && this.pageData.product.laminationPaperTypeB != 0) {
                this.pageData.product.laminationBBasicWeight = +Object.keys(this._laminationWeightBOption)[0];
            } else {
                this.pageData.product.laminationBBasicWeight = undefined;
            }
        }
        return this.pageData.product.laminationBBasicWeight;
    }

    setLaminationBBasicWeightConcealed(value: number) {
        this.pageData.product.laminationBBasicWeight = value;

        if (this.pageData.product.laminationPaperTypeB != 0) {
            if (!isNullOrUndefined(this._laminationWeightBOption)) {
                this.setLaminationBThroughWageConcealed(MathUtil.checkNaN(this._laminationWeightBOption[value]["throughWage"]));
            } else {
                this.setLaminationBThroughWageConcealed(0);
            }
        }

        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    }

    set laminationBBasicWeight(value: number) {
        this.pageData.highlightedTracker.touch('laminationBBasicWeight');
        this.setLaminationBBasicWeightConcealed(value);

    }

    get laminationBThroughWage(): number {
        return MathUtil.checkNaN(this.pageData.product.laminationBThroughWage);

    }

    set laminationBThroughWage(value: number) {
        this.setLaminationBThroughWageConcealed(value);

    }

    get laminationPaperTypeB(): number {

        if (this.pageData.product.id && this.pageData.product.laminationPaperTypeB == TYPE_B) {
            this._laminationWeightBOption = this.pageData.product.laminationPaperTypeB;
            return this.pageData.product.laminationPaperTypeB;
        }

        if (this.pageData.product.laminationPaperTypeB != undefined) {
            this._laminationWeightBOption = this.pageData.mstData.mstLamination[this.pageData.product.laminationPaperTypeB];
            return this.pageData.product.laminationPaperTypeB;
        }

        this.pageData.product.laminationPaperTypeB = 0;
        return 0;
    }

    set laminationPaperTypeB(value: number) {
        //FIXME: 2409
        if (value == 99) {
            this.inputPaperOption = PAPER_2;
            this.idSelectedTmp = DataUtil.cloneObject(this.pageData.product).laminationPaperTypeB;
            this.modalShow();
        } else {
            this.pageData.highlightedTracker.touch('laminationBBasicWeight');
            this.setLaminationPaperTypeBConcealed(value);
        }
    }

    setLaminationPaperTypeBConcealed(value: number) {
        this.pageData.product.laminationPaperTypeB = value;
        if (value != 99 && value != 0) {
            this._laminationWeightBOption = this.pageData.mstData.mstLamination[value];
            if (!isNullOrUndefined(this._laminationWeightBOption)) {
                let result = Object.keys(this._laminationWeightBOption);
                //TODO: hard code to display only one data
                // if (this.pageData.product.laminationPaperTypeB == 4) {
                //     result.splice(3, 1);
                //     result.splice(0, 1);
                // } else if (this.pageData.product.laminationPaperTypeB == 5) {
                //     result.splice(0, 2);
                // }
                if (this.pageData.product.laminationPaperTypeB == 6) {
                    result.splice(result.indexOf("170"), 1);
                }
                this.setLaminationBBasicWeightConcealed(+result[0]);
            } else {
                this.setLaminationBBasicWeightConcealed(0);
                this.setLaminationBThroughWageConcealed(0);
            }
        } else {
            this.setLaminationBBasicWeightConcealed(0);
            this.setLaminationBThroughWageConcealed(0);
        }
    }


    get laminationWeightBOption(): any {
        if (this._laminationWeightBOption != undefined) {
            if (this._laminationWeightBOption != TYPE_B) {
                let result = Object.keys(this._laminationWeightBOption);
                //TODO: hard code to display only one data
                // if (this.pageData.product.laminationPaperTypeB == 4) {
                //     result.splice(3, 1);
                //     result.splice(0, 1);
                // } else if (this.pageData.product.laminationPaperTypeB == 5) {
                //     result.splice(0, 2);
                // }
                if (this.pageData.product.laminationPaperTypeB == 6) {
                    result.splice(result.indexOf("170"), 1);
                }
                return result;
            } else {
                let result = [];
                result.push(this.pageData.product.laminationBBasicWeight);
                return result;
            }
        }
        let result = [];
        result.push(0);
        return result;
    }

    setLaminationBThroughWageConcealed(value: number) {
        this.pageData.product.laminationBThroughWage = value;
        this.helper.calcMaterialLossCarton();
        this.helper.calcMaterialCostTotalCarton();
    }

    get isView() {
        if (this.isRequestDesign) {
            return false
        } else {
            return this.pageData.isView;
        }
    }

    get checkImposition() {
        if (MathUtil.checkNaN(this.pageData.productOutput.lot / this.pageData.product.impositionNumber) >= 10000) {
            return true;
        } else {
            return false;
        }
    }

    get laminationFlute() {
        return this.pageData.product.laminationFlute;
    }

    get cartonLaminationFirstOption() {
        return CARTON_LAMINATION_FIRST_OPTION;
    }

    get cartonLaminationSecondOption() {
        return CARTON_LAMINATION_SECOND_OPTION;
    }

    // 表ライナー（g/㎡）
    get checkBorderLaminationPaperTypeFront(): { style: string, radius: string } {
        if (ValidatorUtil.isNotEmpty(this.helper.sf00302Data.product.id)) {

            if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeFront) {
                return this.pageData.errFieldBorderCss;
            } else {
                return this.pageData.noneFieldBorderCss;
            }
        } else {
            if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeFront) {
                return this.pageData.errFieldBorderCss;
            } else {
                return this.pageData.defaultFieldBorderCss;
            }
        }
    }

    get checkBorderLaminationFrontBasicWeight(): { style: string, radius: string } {

        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveLaminationFrontBasicWeight) {
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

    get checkBorderLaminationFrontThroughWage(): { style: string, radius: string } {
        if (this.pageData.product.laminationPaperTypeFront == 99) {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            } else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveLaminationFrontThroughWage) {
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
        } else {
            return this.pageData.noneFieldBorderCss;
        }
    }

    // 中芯（g/㎡）
    get checkBorderLaminationPaperTypeMedium(): { style: string, radius: string } {
        if (ValidatorUtil.isNotEmpty(this.helper.sf00302Data.product.id)) {
            if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeMedium) {
                return this.pageData.errFieldBorderCss;
            } else {
                return this.pageData.noneFieldBorderCss;
            }
        } else {
            if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeMedium) {
                return this.pageData.errFieldBorderCss;
            } else {
                return this.pageData.defaultFieldBorderCss;
            }
        }
    }

    get checkBorderLaminationMediumBasicWeight(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveLaminationMediumBasicWeight) {
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

    // 裏ライナ（g/㎡）
    get checkBorderLaminationPaperTypeBack(): { style: string, radius: string } {
        if (ValidatorUtil.isNotEmpty(this.helper.sf00302Data.product.id)) {
            if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeBack) {
                return this.pageData.errFieldBorderCss;
            } else {
                return this.pageData.noneFieldBorderCss;
            }
        } else {
            if (this.pageData.productRequiredItem.isSaveLaminationPaperTypeBack) {
                return this.pageData.errFieldBorderCss;
            } else {
                return this.pageData.defaultFieldBorderCss;
            }
        }
    }

    get checkBorderLaminationBackBasicWeight(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveLaminationBackBasicWeight) {
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

    get checkBorderLaminationMediumThroughWage(): { style: string, radius: string } {
        if (this.pageData.product.laminationPaperTypeMedium == 99) {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            } else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveLaminationMediumThroughWage) {
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
        } else {
            return this.pageData.noneFieldBorderCss;
        }
    }

    get checkBorderLaminationBackThroughWage(): { style: string, radius: string } {
        if (this.pageData.product.laminationPaperTypeBack == 99) {
            if (this.pageData.zCheck) {
                return this.pageData.defaultFieldBorderCss;
            } else {
                if (this.pageData.yCheck) {
                    if (this.pageData.productRequiredItem.isSaveLaminationBackThroughWage) {
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
        } else {
            return this.pageData.noneFieldBorderCss;
        }
    }

    // TODO:start http://fridaynight.vnext.vn/issues/2409
    setPaperModalResult(paperModel: PaperModel) {

        //1. set option input
        paperModel.optionId = this.inputPaperOption;
        paperModel.factoryId = this.pageData.product.factoryId;

        //2. add paper
        if (!!paperModel.paperId && !paperModel.isNew) {
            switch (this.inputPaperOption) {
                //表ライナー
                case 1:
                    this.laminationPaperTypeFront = paperModel.paperId;
                    this.laminationFrontBasicWeight = paperModel.basicWeight;
                    break;
                //B中芯
                case 2:
                    this.laminationPaperTypeB = paperModel.paperId;
                    this.laminationBBasicWeight = paperModel.basicWeight;
                    break;
                //中芯
                case 3:
                    this.laminationPaperTypeMedium = paperModel.paperId;
                    this.laminationMediumBasicWeight = paperModel.basicWeight;
                    break;
                //A中芯
                case 4:
                    this.laminationPaperTypeA = paperModel.paperId;
                    this.laminationABasicWeight = paperModel.basicWeight;
                    break;
                //裏ライナ
                case 5:
                    this.laminationPaperTypeBack = paperModel.paperId;
                    this.laminationBackBasicWeight = paperModel.basicWeight;
                    break;
                default:
                    break;
            }
        } else {
            // input list paper new
            this.addNewPaper(paperModel);

            // check input option
            switch (this.inputPaperOption) {
                //表ライナー
                case 1:
                    // get data tmp
                    this.pageData.paperTmp1 = paperModel;
                    this.pageData.product.laminationFrontId = paperModel.id;
                    this.pageData.product.laminationPaperTypeFront = TYPE_FRONT;
                    this.setLaminationFrontBasicWeightConcealed(paperModel.basicWeight);
                    this.setLaminationFrontThroughWageConcealed(paperModel.normValue);
                    // add to mst data
                    this.pageData.addPaperModel(paperModel, TYPE_FRONT);
                    break;
                //B中芯
                case 2:
                    // get data tmp
                    this.pageData.paperTmp2 = paperModel;
                    this.pageData.product.laminationBId = paperModel.id;
                    this.pageData.product.laminationPaperTypeB = TYPE_B;
                    this.setLaminationBBasicWeightConcealed(paperModel.basicWeight);
                    this.setLaminationBThroughWageConcealed(paperModel.normValue);
                    // add to mst data
                    this.pageData.addPaperModel(paperModel, TYPE_B);

                    break;
                //中芯
                case 3:
                    // get data tmp
                    this.pageData.paperTmp3 = paperModel;
                    this.pageData.product.laminationMediumId = paperModel.id;
                    this.pageData.product.laminationPaperTypeMedium = TYPE_MEDIUM;
                    this.setLaminationMediumBasicWeightConcealed(paperModel.basicWeight);
                    this.setLaminationMediumThroughWageConcealed(paperModel.normValue);
                    // add to mst data
                    this.pageData.addPaperModel(paperModel, TYPE_MEDIUM);
                    break;
                //A中芯
                case 4:
                    // get data tmp
                    this.pageData.paperTmp4 = paperModel;
                    this.pageData.product.laminationAId = paperModel.id;
                    this.pageData.product.laminationPaperTypeA = TYPE_A;
                    this.setLaminationABasicWeightConcealed(paperModel.basicWeight);
                    this.setLaminationAThroughWageConcealed(paperModel.normValue);
                    // add to mst data
                    this.pageData.addPaperModel(paperModel, TYPE_A);
                    break;
                //裏ライナ
                case 5:
                    // get data tmp
                    this.pageData.paperTmp5 = paperModel;
                    this.pageData.product.laminationBackId = paperModel.id;
                    this.pageData.product.laminationPaperTypeBack = TYPE_BACK;
                    this.setLaminationBackBasicWeightConcealed(paperModel.basicWeight);
                    this.setLaminationBackThroughWageConcealed(paperModel.normValue);
                    // add to mst data
                    this.pageData.addPaperModel(paperModel, TYPE_BACK);

                    break;
                default:
                    break;
            }
        }

        //2 hide modal
        this.modalHide();

        //3. highlightedTracker
        switch (this.inputPaperOption) {
            //表ライナー
            case 1:
                this.pageData.highlightedTracker.touch('laminationFrontBasicWeight');
                break;
            //B中芯
            case 2:
                this.pageData.highlightedTracker.touch('laminationBBasicWeight');
                break;
            //中芯
            case 3:
                this.pageData.highlightedTracker.touch('laminationMediumBasicWeight');
                break;
            //A中芯
            case 4:
                this.pageData.highlightedTracker.touch('laminationABasicWeight');
                break;
            //裏ライナ
            case 5:
                this.pageData.highlightedTracker.touch('laminationBackBasicWeight');
                break;
            default:
                break;
        }
    }

    modalShow() {
        this.getDataMstLaminations();

        setTimeout(function () {
            //scoll userPic
            $('.table-body-paperOther').scrollTop(0);
        },300);

        $("#paperModal").modal('show');
        $('.modal-body').css('overflow-y', 'auto');
        $('.modal-body').css('max-height', $(window).height() * 0.86);
    }

    modalHide() {
        $("#paperModal").modal('hide');
    }

    closedModal() {
        switch (this.inputPaperOption) {
            //表ライナー
            case PAPER_1:
                this.pageData.product.laminationPaperTypeFront = this.idSelectedTmp;
                break;
            //B中芯
            case PAPER_2:
                this.pageData.product.laminationPaperTypeB = this.idSelectedTmp;
                break;
            //中芯
            case PAPER_3:
                this.pageData.product.laminationPaperTypeMedium = this.idSelectedTmp;
                break;
            //A中芯
            case PAPER_4:
                this.pageData.product.laminationPaperTypeA = this.idSelectedTmp;
                break;
            //裏ライナ
            case PAPER_5:
                this.pageData.product.laminationPaperTypeBack = this.idSelectedTmp;
                break;
            default:
                break;
        }

        this.modalHide();
    }

    getDataMstLaminations() {
        // reset paper model
        this.pageData.paperModel = new PaperModel();

        this.pageData.mstPapersBackgroundTab1 = [];
        let papers: PaperModel[] = this.pageData.mstLaminations;
        //1. role admin map normValue
        if (this.pageData.product.paperHeadApprovalFlag == 1) {
            papers = this.pageData.mstLaminationsHeader;
        }
        //2. filter data by factoryId
        this.pageData.mstPapersBackgroundTab1 = papers.filter(item => {
            // nếu paperId != null -> by theo factoryId và createdUser
            let base_flag = (item.hiddenFlag != 1 && item.commonFlag != 1 && item.commonFlag != undefined);
            if (!!!item.paperId) {
                return item.createdUser == BATCH_USER && base_flag;
            }
            return base_flag;
        }).map(item => {
            let paper = DataUtil.cloneObject(item);
            return paper;
        });

        // update status selectbox
        switch (this.inputPaperOption) {
            //表ライナー
            case PAPER_1:
                this.pageData.product.laminationPaperTypeFront = 99;
                break;
            //B中芯
            case PAPER_2:
                this.pageData.product.laminationPaperTypeB = 99;
                break;
            //中芯
            case PAPER_3:
                this.pageData.product.laminationPaperTypeMedium = 99;
                break;
            //A中芯
            case PAPER_4:
                this.pageData.product.laminationPaperTypeA = 99;
                break;
            //裏ライナ
            case PAPER_5:
                this.pageData.product.laminationPaperTypeBack = 99;
                break;
            default:
                break;
        }
    }

    get mstPapersBackground() {
        return this.pageData.mstPapersBackgroundTab1;
    }

    get pageData() {
        return this.helper.getSF00302Data();
    }

    addNewPaper(paperModel: PaperModel) {
        // nếu nó khác thì sẽ push thêm vào list, nếu nó đã có thì cập nhật vào list paperModel
        let index = this.pageData.paperModelNews.findIndex(item => {
            return paperModel.optionId == item.optionId;
        })

        // nếu không có -> sẽ add vào list new
        if (index < 0 && !!paperModel.isNew) {
            this.pageData.paperModelNews.push(paperModel);
        }
        // nếu có, sẽ replace thằng cũ đi
        else if (index > 0) {
            // thay thế thằng cũ tại vị trí index, thay thế 1, và paperModel
            this.pageData.paperModelNews.splice(index, 1, paperModel);
        }
    }

    // init data
    initDataMst() {
        if (this.pageData.product.id) {
            if (this.pageData.product.laminationPaperTypeFront == TYPE_FRONT) {
                let paperModel = this.pageData.mstLaminations.find(item => {
                    return item.id == this.pageData.product.laminationFrontId;
                });

                if (!!paperModel) {
                    this.pageData.paperTmp1.paperName = paperModel.paperName;
                    this.pageData.addPaperModel(paperModel, TYPE_FRONT);
                }
            }
            if (this.pageData.product.laminationPaperTypeB == TYPE_B) {
                let paperModel = this.pageData.mstLaminations.find(item => {
                    return item.id == this.pageData.product.laminationBId;
                });
                if (!!paperModel) {
                    this.pageData.paperTmp2.paperName = paperModel.paperName;
                    this.pageData.addPaperModel(paperModel, TYPE_B);
                }
            }

            if (this.pageData.product.laminationPaperTypeMedium == TYPE_MEDIUM) {
                let paperModel = this.pageData.mstLaminations.find(item => {
                    return item.id == this.pageData.product.laminationMediumId;
                });
                if (!!paperModel) {
                    this.pageData.paperTmp3.paperName = paperModel.paperName;
                    this.pageData.addPaperModel(paperModel, TYPE_MEDIUM);
                }
            }

            if (this.pageData.product.laminationPaperTypeA == TYPE_A) {
                let paperModel = this.pageData.mstLaminations.find(item => {
                    return item.id == this.pageData.product.laminationAId;
                });
                if (!!paperModel) {
                    this.pageData.paperTmp4.paperName = paperModel.paperName;
                    this.pageData.addPaperModel(paperModel, TYPE_A);
                }
            }

            if (this.pageData.product.laminationPaperTypeBack == TYPE_BACK) {
                let paperModel = this.pageData.mstLaminations.find(item => {
                    return item.id == this.pageData.product.laminationBackId;
                });
                if (!!paperModel) {
                    this.pageData.paperTmp5.paperName = paperModel.paperName;
                    this.pageData.addPaperModel(paperModel, TYPE_BACK);
                }
            }
        }

    }


    // TODO:end http://fridaynight.vnext.vn/issues/2409
}