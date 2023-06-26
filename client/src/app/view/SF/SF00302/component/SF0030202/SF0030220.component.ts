import {AfterViewInit, Component, Input} from "@angular/core";
import {SF00302Data} from "../../SF00302.data";
import {SF0030220Helper} from "./SF0030220.helper";
import DataUtil from "../../../../../util/data-util";
import {
    CARTON_COLOR, CARTON_COLOR_MEMO, CARTON_WATER_REPELLENT, HAND_SIZE, HAND_TYPE,
    OTHER_METHOD
} from "../../helper/master-option";
import MathUtil from "../../../../../util/math-util";
import {isNullOrUndefined} from "util";
import {FormatUtil} from "../../../../../util/format-util";
import UnicodeUtil from "../../../../../util/unicode-util";
import { SF003020202Helper } from "./SF003020202/SF003020202.helper";

interface Select2Options {
    tags?: any;
    allowClear?: any;
    language?: { noResults: () => string } | any;
    escapeMarkup?: any;
    processResults?: any;
    templateResult?: (object: Select2SelectionObject) => any;
    placeholder?: string | IdTextPair;
    minimumResultsForSearch?: number;
    createTag?: (params) => any;
    insertTag?: (data, tag) => any;
}

interface Select2SelectionObject {
    loading: boolean;
    disabled: boolean;
    element: HTMLOptionElement;
    id: string;
    selected: boolean;
    text: string;
    title: string;
    newOption: any;
}
declare var $: JQueryStatic;
declare var App: any;

@Component({
    selector: "sf0030220",
    templateUrl: "SF0030220.component.html",
    styleUrls: ["SF0030220.component.css"]
})
/**
 * Component quotation info
 * @author DungTQ
 * */

export class SF0030220Component implements AfterViewInit {

    colorFText1Options: any;
    colorFText2Options: any;
    colorFText3Options: any;

    @Input()
    helper: SF0030220Helper;

    private select2Option: Select2Options = {
        tags: true,
        language: {
            noResults: function () {
                return "No color";
            }
        },
        escapeMarkup: function (markup) {
            return markup;
        },
        createTag: (params) => {
            return {
                id: UnicodeUtil.truncBySjisByte(params.term, 8),
                text: UnicodeUtil.truncBySjisByte(params.term, 8),
                newOption: true
            }
        },
        templateResult: (data: Select2SelectionObject) => {
            let $result = $("<span style='font-size:11px!important'></span>");

            $result.text(data.text);

            if (data.newOption) {
                $result.append(" <em>(new)</em>");
            }

            return $result;
        },
        placeholder: "",
        minimumResultsForSearch: 0,
    };

    get isRequestDesign() {
        return this.helper.getSF00302Data().isRequestDesign;
    }

    get isCreateNewProduct() {
        return this.helper.getSF00302Data().isCreateNewProduct;
    }

    constructor(public sf00302Data: SF00302Data) {
    }

    ngAfterViewInit(): void {
        this.handleColorOption();
    }

    private handleColorOption() {
        let self = this;
        self.colorFText1Options = [];
        self.colorFText2Options = [];
        self.colorFText3Options = [];

        // Assign data
        CARTON_COLOR_MEMO.forEach(data => {
            self.colorFText1Options.push(data);
            self.colorFText2Options.push(data);
            self.colorFText3Options.push(data);
        })

        //Add memo to list if not exist
        if (!isNullOrUndefined(self.colorFText1) && self.colorFText1 != "" && self.colorFText1 != "　　") {
            if (!self.colorFText1Options.find(item => item == self.colorFText1)) {
                self.colorFText1Options.unshift(self.colorFText1);
            }
        }
        if (!isNullOrUndefined(self.colorFText2) && self.colorFText2 != "" && self.colorFText2 != "　　") {
            if (!self.colorFText2Options.find(item => item == self.colorFText2)) {
                self.colorFText2Options.unshift(self.colorFText2);
            }
        }
        if (!isNullOrUndefined(self.colorFText3) && self.colorFText3 != "" && self.colorFText3 != "　　") {
            if (!self.colorFText3Options.find(item => item == self.colorFText3)) {
                self.colorFText3Options.unshift(self.colorFText3);
            }
        }

        //Assign variables for dom
        let $colorFText1 = $("#colorFText1");
        let $colorFText2 = $("#colorFText2");
        let $colorFText3 = $("#colorFText3");

        //assign select2
        setTimeout(() => {
            $colorFText1
                .select2(self.select2Option)
                .on("select2:select", (event: any) => {
                    self.helper.getSF00302Data().product.colorFText1 = event.target.value;
                    this.helper.getSF00302Data().highlightedTracker.touch('colorIdF');
                })
                .val(self.helper.getSF00302Data().product.colorFText1)
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});
        }, 50);

        setTimeout(() => {
            $colorFText2
                .select2(self.select2Option)
                .on("select2:select", (event: any) => {
                    self.helper.getSF00302Data().product.colorFText2 = event.target.value;
                    this.helper.getSF00302Data().highlightedTracker.touch('colorIdF');
                })
                .val(self.helper.getSF00302Data().product.colorFText2)
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});
        }, 50);

        setTimeout(() => {
            $colorFText3
                .select2(self.select2Option)
                .on("select2:select", (event: any) => {
                    self.helper.getSF00302Data().product.colorFText3 = event.target.value;
                    this.helper.getSF00302Data().highlightedTracker.touch('colorIdF');
                })
                .val(self.helper.getSF00302Data().product.colorFText3)
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});
        }, 50);

    }

    isHighlighted(input) {
        return this.helper.getSF00302Data().highlightedTracker.isHighlightedProperty(input);
    }

    get colorIdF(): number {
        if (this.helper.getSF00302Data().product.colorIdF == undefined) {
            this.helper.getSF00302Data().product.colorIdF = 0;
            // this.setColorIdIfConcealed(0);
        }
        // this.setColorIdIfConcealed(this.helper.getSF00302Data().product.colorIdF);
        return this.helper.getSF00302Data().product.colorIdF;
    }

    setColorIdIfConcealed(value: number) {
        this.helper.getSF00302Data().product.colorIdF = value;
        this.helper.calcUsageColorCostCarton();
    }

    set colorIdF(value: number) {
        this.setColorIdFTouched();
        this.setColorIdIfConcealed(value);

    }

    setColorIdFTouched() {
        this.helper.getSF00302Data().highlightedTracker.touch('colorIdF');
    }

    get colorFText1(): string {
        return this.helper.getSF00302Data().product.colorFText1;
    }

    set colorFText1(value: string) {
        this.helper.getSF00302Data().product.colorFText1 = value;
    }

    get colorFText2(): string {
        return this.helper.getSF00302Data().product.colorFText2;
    }

    set colorFText2(value: string) {
        this.helper.getSF00302Data().product.colorFText2 = value;
    }

    get colorFText3(): string {
        return this.helper.getSF00302Data().product.colorFText3;
    }

    set colorFText3(value: string) {
        this.helper.getSF00302Data().product.colorFText3 = value;
    }

    get cartonTapeCutting() {
        this.helper.getSF00302Data().product.cartonTapeCutting = MathUtil.checkNaN(this.helper.getSF00302Data().product.cartonTapeCutting);
        if (this.helper.getSF00302Data().product.cartonTapeCutting > 0) {
            return true;
        } else {
            return false;
        }
    }

    set cartonTapeCutting(value: boolean) {
        if (value) {
            if (this.helper.getSF00302Data().product.blankPaperSizeH == undefined || this.helper.getSF00302Data().product.blankPaperSizeW == undefined) {
                this.helper.getSF00302Data().product.cartonTapeCutting = 0;
            }
            else if (this.helper.getSF00302Data().product.blankPaperSizeH > this.helper.getSF00302Data().product.blankPaperSizeW) {
                this.helper.getSF00302Data().product.cartonTapeCutting = this.helper.getSF00302Data().product.blankPaperSizeH;
            } else {
                this.helper.getSF00302Data().product.cartonTapeCutting = this.helper.getSF00302Data().product.blankPaperSizeW;
            }
        } else {
            this.helper.getSF00302Data().product.cartonTapeCutting = 0;
        }
        this.helper.getSF00302Data().highlightedTracker.touch('tapeCutting');
        this.helper.calcTapeCutCarton();
    }

    get cartonLinerCutting() {
        this.helper.getSF00302Data().product.cartonLinerCutting = MathUtil.checkNaN(this.helper.getSF00302Data().product.cartonLinerCutting);
        return this.helper.getSF00302Data().product.cartonLinerCutting;
    }

    set cartonLinerCutting(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('linerCutting');
        this.helper.getSF00302Data().product.cartonLinerCutting = value;
        this.helper.calcLinerCutCarton();
    }

    get waterRepellent() {
        if (this.helper.getSF00302Data().product.waterRepellentFlag == undefined) {
            this.helper.getSF00302Data().product.waterRepellentFlag = 0;
        }
        return this.helper.getSF00302Data().product.waterRepellentFlag;
    }

    set waterRepellent(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('waterRepellent');
        this.helper.getSF00302Data().product.waterRepellentFlag = value;
        this.helper.calcWaterRepellentCarton();
    }

    setHandProcessingFlag(value: number) {
        this.handProcessingFlag = value;
    }

    get handProcessingFlag() {
        if (this.helper.getSF00302Data().product.handProcessingFlag == undefined) {
            this.helper.getSF00302Data().product.handProcessingFlag = 0;
        }
        return this.helper.getSF00302Data().product.handProcessingFlag;
    }

    set handProcessingFlag(value: number) {
        this.helper.getSF00302Data().highlightedTracker.touch('handProcessing');
        this.helper.getSF00302Data().product.handProcessingFlag = value;
        this.helper.calcCartonHandProcessingCarton();
    }

    get isView() {
        if (this.isRequestDesign) {
            return false;
        } else {
            return this.helper.getSF00302Data().isView;
        }
    }

    get stateProductPrint() {
        if (this.helper.getSF00302Data().product.cartonTapeCutting != undefined && this.helper.getSF00302Data().product.cartonTapeCutting.toString() != "" &&
            this.helper.getSF00302Data().product.cartonLinerCutting != undefined && this.helper.getSF00302Data().product.cartonLinerCutting.toString() != ""
            && this.helper.getSF00302Data().product.handProcessingFlag != undefined) {
            return true;
        }
        return false;
    }

    colorOption = DataUtil.toSelectBoxDataSource(CARTON_COLOR);

    get colorOptions(){
        if(this.helper.getSF00302Data().product.shapeId==100){
            return this.colorOption.slice(0,5);
        } else {
            return this.colorOption;
        }
    }
    waterRepellentOption = DataUtil.toSelectBoxDataSource(CARTON_WATER_REPELLENT);

    set handPosition(value: number) {
        this.helper.getSF00302Data().product.handPosition = value;
        this.helper.getSF00302Data().highlightedTracker.touch('handProcessing');
    }

    get handPosition() {
        this.helper.getSF00302Data().product.handPosition = MathUtil.checkNaN(this.helper.getSF00302Data().product.handPosition);

        return this.helper.getSF00302Data().product.handPosition;
    }

    set handType(value: any) {
        this.helper.getSF00302Data().product.handType = value;
        this.helper.getSF00302Data().highlightedTracker.touch('handProcessing');
        this.helper.getSF00302Data().product.handSize = 1;
    }

    get handType() {
        if (!isNullOrUndefined(this.helper.getSF00302Data().product.handType)) {
            this.helper.getSF00302Data().product.handType = MathUtil.checkNaN(this.helper.getSF00302Data().product.handType);
        } else {
            this.helper.getSF00302Data().product.handType = 2;
        }
        return MathUtil.checkNaN(this.helper.getSF00302Data().product.handType);
    }

    set handSize(value: any) {
        this.helper.getSF00302Data().product.handSize = value;
        this.helper.getSF00302Data().highlightedTracker.touch('handProcessing');
    }

    get handSize() {
        if (!isNullOrUndefined(this.helper.getSF00302Data().product.handSize)) {
            this.helper.getSF00302Data().product.handSize = MathUtil.checkNaN(this.helper.getSF00302Data().product.handSize);
        } else {
            this.helper.getSF00302Data().product.handSize = 1;
        }

        return MathUtil.checkNaN(this.helper.getSF00302Data().product.handSize);
    }

    handTypeOption = DataUtil.toSelectBoxDataSource(HAND_TYPE);

    get handSizeOption() {
        if (!isNullOrUndefined(this.handType) && this.handType != 0) {
            return HAND_SIZE[this.handType];
        } else {
            return [];
        }
    }

    otherMethodOption = DataUtil.toSelectBoxDataSource(OTHER_METHOD);

    set otherMethod1(value: any) {
        this.helper.getSF00302Data().product.otherMethod1 = value;
        this.helper.getSF00302Data().highlightedTracker.touch('otherMethod');
        this.setMemo1();
    }

    get otherMethod1() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().product.otherMethod1);
    }

    set otherMethod2(value: any) {
        this.helper.getSF00302Data().product.otherMethod2 = value;
        this.helper.getSF00302Data().highlightedTracker.touch('otherMethod');
        this.setMemo1();
    }

    get otherMethod2() {
        return MathUtil.checkNaN(this.helper.getSF00302Data().product.otherMethod2);
    }

    get upperFlapChange() {
        let result = MathUtil.checkNaN(this.helper.getSF00302Data().product.upperFlap - this.defaultFlap);
        if (result > 0) {
            return "+" + FormatUtil.formatNumber(MathUtil.round(result, 1), 1);
        } else if (result < 0) {
            return FormatUtil.formatNumber(MathUtil.round(result, 1), 1);
        }
        return result.toString();
    }

    get lowerFlapChange() {
        let result = MathUtil.checkNaN(this.helper.getSF00302Data().product.lowerFlap - this.defaultFlap);
        if (result > 0) {
            return "+" + FormatUtil.formatNumber(MathUtil.round(result, 1), 1);
        } else if (result < 0) {
            return FormatUtil.formatNumber(MathUtil.round(result, 1), 1);
        }
        return result.toString();
    }

    get defaultFlap() {
        return this.helper.calcFlap(this.helper.getSF00302Data().product.cartonShippingType, this.helper.getSF00302Data().product.laminationFlute, this.helper.getSF00302Data().product.sizeD);
    }

    get cartonShippingType () {
        return this.helper.getSF00302Data().product.cartonShippingType;
    }

    setMemo1() {
        if (this.helper.getSF00302Data().product.specialNote1Flag != 1) {
            let method1 = OTHER_METHOD[this.helper.getSF00302Data().product.otherMethod1];
            if (this.helper.getSF00302Data().product.otherMethod1 == 4) {
                method1 = method1 + "上" + this.upperFlapChange + "mm" + "下" + this.lowerFlapChange + "mm";
            }
            let method2 = OTHER_METHOD[this.helper.getSF00302Data().product.otherMethod2]
            if (this.helper.getSF00302Data().product.otherMethod2 == 4) {
                method2 = method2 + "上" + this.upperFlapChange + "mm" + "下" + this.lowerFlapChange + "mm";
            }
            if (method1 == "なし") {
                if (method2 != undefined && method2 != "なし") {
                    this.helper.getSF00302Data().product.memo1 = method2;
                } else {
                    this.helper.getSF00302Data().product.memo1 = "";
                }
            } else {
                if (method2 != undefined && method2 != "なし") {
                    this.helper.getSF00302Data().product.memo1 = method1 + "／" + method2;
                } else {
                    this.helper.getSF00302Data().product.memo1 = method1;
                }
            }
        }

    }

}