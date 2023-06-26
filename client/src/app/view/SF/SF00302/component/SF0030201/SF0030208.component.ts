import {AfterViewInit, Component, Input} from "@angular/core";
import {SF0030208Helper} from "./SF0030208.helper";
import DataUtil from "../../../../../util/data-util";
import {CARTON_COLOR, COLOR_2685, DIGITAL_COLOR, OFFSET_COLOR, PRINT_METHOD} from "../../helper/master-option";
import {SF00302Data} from "../../SF00302.data";
import {isNullOrUndefined} from "util";
import UnicodeUtil from "../../../../../util/unicode-util";

interface Select2Options {
    data?: any;
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
    templateUrl: "SF0030208.component.html",
    selector: 'sf0030208'
})
/**
 * Component quotation info
 * @author DungTQ
 * */
export class SF0030208Component implements AfterViewInit {
    mstColorFtext1: any;
    mstColorFtext2: any;
    mstColorFtext3: any;
    mstColorFtext4: any;
    mstColorFtext5: any;
    mstColorFtext6: any;
    mstColorFtext7: any;
    mstColorFtext8: any;

    mstColorBtext1: any;
    mstColorBtext2: any;
    mstColorBtext3: any;
    mstColorBtext4: any;

    // check create printMethod
    checkCreatePrintMethod_ColorF: boolean = false;
    checkCreatePrintMethod_ColorB: boolean = false;


    // //Add memo to list if not exist
    ngAfterViewInit(): void {
        this.handleColorOption();
        let select2Option = this.select2Option();
        if (this.pageData.product.printMethod != 0) {
            this.initColorF(select2Option);
            this.checkCreatePrintMethod_ColorF = true;
            if (this.pageData.product.printMethod != 3) {
                this.initColorB(select2Option);
                this.checkCreatePrintMethod_ColorB = true;
            }
        }
    }

    //3007
    mstColor_2685 = DataUtil.toSelectBoxDataSource(COLOR_2685);

    get pageData(): SF00302Data {
        return this.helper.getSF00302Data();
    }


    private select2Option(): Select2Options {
        let self = this;
        return {
            data: self.mstColor_2685.map(opt => ({id: opt.name, text: opt.name})),
            tags: true,
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
            minimumResultsForSearch: 0
        };
    };

    /**
     * Handle color option selected 2
     */
    private handleColorOption() {
        let self = this;

        // init data
        // create list mst data color
        self.mstColorBtext1 = [];
        self.mstColorFtext1 = [];
        self.mstColorFtext2 = [];
        self.mstColorFtext3 = [];
        self.mstColorFtext4 = [];
        self.mstColorFtext5 = [];
        self.mstColorFtext6 = [];
        self.mstColorFtext7 = [];
        self.mstColorFtext8 = [];

        self.mstColorBtext1 = [];
        self.mstColorBtext2 = [];
        self.mstColorBtext3 = [];
        self.mstColorBtext4 = [];

        // add item mst data
        COLOR_2685.forEach(item => {
            //color f
            self.mstColorFtext1.push(item);
            self.mstColorFtext2.push(item);
            self.mstColorFtext3.push(item);
            self.mstColorFtext4.push(item);
            self.mstColorFtext5.push(item);
            self.mstColorFtext6.push(item);
            self.mstColorFtext7.push(item);
            self.mstColorFtext8.push(item);
            //color b
            self.mstColorBtext1.push(item);
            self.mstColorBtext2.push(item);
            self.mstColorBtext3.push(item);
            self.mstColorBtext4.push(item);
        })
    }

    private initColorF(select2Options) {
        let self = this;
        //
        let $colorFText1 = $("#colorFText1");
        let $colorFText2 = $("#colorFText2");
        let $colorFText3 = $("#colorFText3");
        let $colorFText4 = $("#colorFText4");
        let $colorFText5 = $("#colorFText5");
        let $colorFText6 = $("#colorFText6");
        let $colorFText7 = $("#colorFText7");
        let $colorFText8 = $("#colorFText8");

        // add color_f_text_1 new
        if (!isNullOrUndefined(self.colorFText1) && self.colorFText1 != "" && self.colorFText1 != "　　") {
            if (!self.mstColorFtext1.find(item => item == self.colorFText1)) {
                self.mstColorFtext1.unshift(self.colorFText1);
            }
        }
        if (!isNullOrUndefined(self.colorFText2) && self.colorFText2 != "" && self.colorFText2 != "　　") {
            if (!self.mstColorFtext2.find(item => item == self.colorFText2)) {
                self.mstColorFtext2.unshift(self.colorFText2);
            }
        }
        if (!isNullOrUndefined(self.colorFText3) && self.colorFText3 != "" && self.colorFText3 != "　　") {
            if (!self.mstColorFtext3.find(item => item == self.colorFText3)) {
                self.mstColorFtext3.unshift(self.colorFText3);
            }
        }
        if (!isNullOrUndefined(self.colorFText4) && self.colorFText4 != "" && self.colorFText4 != "　　") {
            if (!self.mstColorFtext4.find(item => item == self.colorFText4)) {
                self.mstColorFtext4.unshift(self.colorFText4);
            }
        }
        if (!isNullOrUndefined(self.colorFText5) && self.colorFText5 != "" && self.colorFText5 != "　　") {
            if (!self.mstColorFtext5.find(item => item == self.colorFText5)) {
                self.mstColorFtext5.unshift(self.colorFText5);
            }
        }
        if (!isNullOrUndefined(self.colorFText6) && self.colorFText6 != "" && self.colorFText6 != "　　") {
            if (!self.mstColorFtext6.find(item => item == self.colorFText6)) {
                self.mstColorFtext6.unshift(self.colorFText6);
            }
        }
        if (!isNullOrUndefined(self.colorFText7) && self.colorFText7 != "" && self.colorFText7 != "　　") {
            if (!self.mstColorFtext7.find(item => item == self.colorFText7)) {
                self.mstColorFtext7.unshift(self.colorFText7);
            }
        }
        if (!isNullOrUndefined(self.colorFText8) && self.colorFText8 != "" && self.colorFText8 != "　　") {
            if (!self.mstColorFtext8.find(item => item == self.colorFText8)) {
                self.mstColorFtext8.unshift(self.colorFText8);
            }
        }

        // //assign select2
        setTimeout(() => {
            $colorFText1
                .select2(select2Options)
                .on("select2:select", (event: any) => {
                    self.pageData.product.colorFText1 = event.target.value;
                    this.pageData.highlightedTracker.touch('colorIdF');
                })
                .val(self.pageData.product.colorFText1)
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});

            $colorFText2
                .select2(select2Options)
                .on("select2:select", (event: any) => {
                    self.pageData.product.colorFText2 = event.target.value;
                    this.pageData.highlightedTracker.touch('colorIdF');
                })
                .val(self.pageData.product.colorFText2)
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});

            $colorFText3
                .select2(select2Options)
                .on("select2:select", (event: any) => {
                    self.pageData.product.colorFText3 = event.target.value;
                    this.pageData.highlightedTracker.touch('colorIdF');
                })
                .val(self.pageData.product.colorFText3)
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});


            $colorFText4
                .select2(select2Options)
                .on("select2:select", (event: any) => {
                    self.pageData.product.colorFText4 = event.target.value;
                    this.pageData.highlightedTracker.touch('colorIdF');
                })
                .val(self.pageData.product.colorFText4)
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});

            $colorFText5
                .select2(select2Options)
                .on("select2:select", (event: any) => {
                    self.pageData.product.colorFText5 = event.target.value;
                    this.pageData.highlightedTracker.touch('colorIdF');
                })
                .val(self.pageData.product.colorFText5)
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});

            $colorFText6
                .select2(select2Options)
                .on("select2:select", (event: any) => {
                    self.pageData.product.colorFText6 = event.target.value;
                    this.pageData.highlightedTracker.touch('colorIdF');
                })
                .val(self.pageData.product.colorFText6)
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});

            $colorFText7
                .select2(select2Options)
                .on("select2:select", (event: any) => {
                    self.pageData.product.colorFText7 = event.target.value;
                    this.pageData.highlightedTracker.touch('colorIdF');
                })
                .val(self.pageData.product.colorFText7)
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});

            $colorFText8
                .select2(select2Options)
                .on("select2:select", (event: any) => {
                    self.pageData.product.colorFText8 = event.target.value;
                    this.pageData.highlightedTracker.touch('colorIdF');
                })
                .val(self.pageData.product.colorFText8)
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});
        }, 50);
    }

    private initColorB(select2Options) {
        let self = this;
        // assign color B
        let $colorBText1 = $("#colorBText1");
        let $colorBText2 = $("#colorBText2");
        let $colorBText3 = $("#colorBText3");
        let $colorBText4 = $("#colorBText4");
        let $colorBText5 = $("#colorBText5");
        let $colorBText6 = $("#colorBText6");
        let $colorBText7 = $("#colorBText7");
        let $colorBText8 = $("#colorBText8");

        if (!isNullOrUndefined(self.colorBText1) && self.colorBText1 != "" && self.colorBText1 != "　　") {
            if (!self.mstColorBtext1.find(item => item == self.colorBText1)) {
                self.mstColorBtext1.unshift(self.colorBText1);
            }
        }
        if (!isNullOrUndefined(self.colorBText2) && self.colorBText2 != "" && self.colorBText2 != "　　") {
            if (!self.mstColorBtext2.find(item => item == self.colorBText2)) {
                self.mstColorBtext2.unshift(self.colorBText2);
            }
        }
        if (!isNullOrUndefined(self.colorBText3) && self.colorBText3 != "" && self.colorBText3 != "　　") {
            if (!self.mstColorBtext3.find(item => item == self.colorBText3)) {
                self.mstColorBtext3.unshift(self.colorBText3);
            }
        }
        if (!isNullOrUndefined(self.colorBText4) && self.colorBText4 != "" && self.colorBText4 != "　　") {
            if (!self.mstColorBtext4.find(item => item == self.colorBText4)) {
                self.mstColorBtext4.unshift(self.colorBText4);
            }
        }

        // show select 2 color option
        setTimeout(() => {
            //Assign variables for dom
            $colorBText1
                .select2(select2Options)
                .on("select2:select", (event: any) => {
                    self.pageData.product.colorBText1 = event.target.value;
                    this.pageData.highlightedTracker.touch('colorIdB');
                })
                .val(!!self.pageData.product.colorBText1 ? self.pageData.product.colorBText1 : null)
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});

            $colorBText2
                .select2(select2Options)
                .on("select2:select", (event: any) => {
                    self.pageData.product.colorBText2 = event.target.value;
                    this.pageData.highlightedTracker.touch('colorIdB');
                })
                .val(self.pageData.product.colorBText2)
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});

            $colorBText3
                .select2(select2Options)
                .on("select2:select", (event: any) => {
                    self.pageData.product.colorBText3 = event.target.value;
                    this.pageData.highlightedTracker.touch('colorIdB');
                })
                .val(self.pageData.product.colorBText3)
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});

            $colorBText4
                .select2(select2Options)
                .on("select2:select", (event: any) => {
                    self.pageData.product.colorBText4 = event.target.value;
                    this.pageData.highlightedTracker.touch('colorIdB');
                })
                .val(self.pageData.product.colorBText4)
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});

            $colorBText5
                .select2(select2Options)
                .on("select2:select", (event: any) => {
                })
                .val("")
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});

            $colorBText6
                .select2(select2Options)
                .on("select2:select", (event: any) => {
                })
                .val("")
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});

            $colorBText7
                .select2(select2Options)
                .on("select2:select", (event: any) => {
                })
                .val("")
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});

            $colorBText8
                .select2(select2Options)
                .on("select2:select", (event: any) => {
                })
                .val("")
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});

        }, 50);
    }

    @Input()
    helper: SF0030208Helper;

    /**
     * Get state if Product Print Accordion is filled with data or not
     * */
    get stateProductPrint() {
        if (this.pageData.product.printMethod != undefined) {
            if (this.pageData.product.printMethod == 1) {
                if (this.pageData.product.colorIdF != undefined
                    && this.pageData.product.colorIdB != undefined
                    && this.pageData.product.specialColorF != undefined
                    && this.pageData.product.specialColorB != undefined
                    && this.pageData.product.printMethod != 0
                    && this.pageData.product.colorIdF != 0
                    && this.pageData.product.colorIdB != 0
                    && this.pageData.product.specialColorF != 0
                    && this.pageData.product.specialColorB != 0) {
                    return true;
                } else {
                    return false;
                }
            } else if (this.pageData.product.printMethod == 2) {
                if (this.pageData.product.colorIdF != undefined
                    && this.pageData.product.colorIdB != undefined
                    && this.pageData.product.printMethod != 0) {
                    return true;
                } else {
                    return false;
                }

            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    get isRequestDesign() {
        return this.pageData.isRequestDesign;
    }

    get isView(): boolean {
        if (this.isRequestDesign) {
            return false;
        } else {
            return this.pageData.isView;
        }
    }

    get isCreateNewProduct() {
        return this.pageData.isCreateNewProduct;
    }

    isHighlighted(input) {
        return this.pageData.highlightedTracker.isHighlightedProperty(input);
    }

    get printMethod(): number {
        if (this.pageData.product.printMethod == undefined) {
            if(this.pageData.product.shapeId!=98) {
                this.pageData.product.printMethod = 0;
            } else {
                this.pageData.product.printMethod = 3;
            }
        }
        return this.pageData.product.printMethod;
    }

    set printMethod(value: number) {
        this.pageData.highlightedTracker.touch('printMethod');
        this.setColorIdFTouched();
        this.setSpecialColorFTouched();
        this.setSpecialColorBTouched();
        this.setColorIdBTouched();

        this.pageData.product.printMethod = value;
        if (this.pageData.product.printMethod == 1) {
            this.setColorIdBConcealed(1);
            this.setColorIdIfConcealed(1);
        } else if (this.pageData.product.printMethod == 2) {
            this.setColorIdBConcealed(1);
            this.setColorIdIfConcealed(1);
            this.pageData.productOutput.colorPlateCostB = 0;
            this.pageData.productOutput.colorPrintThroughWageB = 0;
            this.pageData.productOutput.colorPrintBasicCostB = 0;
            this.pageData.productOutput.colorPrintTotalCostB = 0;
            this.pageData.productOutput.colorPrintPerPacketCostB = 0;
            this.pageData.productOutput.colorPrintSpecialCostB = 0;
            if (this.pageData.product.surfaceTreatmentIdF == 8 || this.pageData.product.surfaceTreatmentIdF == 17 || this.pageData.product.surfaceTreatmentIdF > 18) {
                this.helper.calcColorPlateCost(1);
                this.helper.calcColorPrintLoss(1);
                this.helper.calcColorCostPerPacket(1);
                this.helper.calcColorBasicCost(1);
                this.helper.calcColorThroughWage(1);
                this.helper.calcColorSpecial(1);
            }
            if (this.pageData.product.surfaceTreatmentIdB == 8 || this.pageData.product.surfaceTreatmentIdB == 17 || this.pageData.product.surfaceTreatmentIdB > 18) {
                this.helper.calcColorPlateCost(2);
                this.helper.calcColorPrintLoss(2);
                this.helper.calcColorCostPerPacket(2);
                this.helper.calcColorBasicCost(2);
                this.helper.calcColorThroughWage(2);
                this.helper.calcColorSpecial(2);
            }
        } else {
            this.pageData.productOutput.colorPlateCostB = 0;
            this.pageData.productOutput.colorPrintThroughWageB = 0;
            this.pageData.productOutput.colorPrintBasicCostB = 0;
            this.pageData.productOutput.colorPrintTotalCostB = 0;
            this.pageData.productOutput.colorPrintPerPacketCostB = 0;
            this.pageData.productOutput.colorPrintSpecialCostB = 0;
            this.pageData.productOutput.colorPlateCostF = 0;
            this.pageData.productOutput.colorPrintThroughWageF = 0;
            this.pageData.productOutput.colorPrintBasicCostF = 0;
            this.pageData.productOutput.colorPrintTotalCostF = 0;
            this.pageData.productOutput.colorPrintPerPacketCostF = 0;
            this.pageData.productOutput.colorPrintSpecialCostF = 0;
            if (this.pageData.product.surfaceTreatmentIdF == 8 || this.pageData.product.surfaceTreatmentIdF == 17 || this.pageData.product.surfaceTreatmentIdF > 18) {
                this.helper.calcColorPlateCost(1);
                this.helper.calcColorPrintLoss(1);
                this.helper.calcColorCostPerPacket(1);
                this.helper.calcColorBasicCost(1);
                this.helper.calcColorThroughWage(1);
                this.helper.calcColorSpecial(1);
            }
            if (this.pageData.product.surfaceTreatmentIdB == 8 || this.pageData.product.surfaceTreatmentIdB == 17 || this.pageData.product.surfaceTreatmentIdB > 18) {
                this.helper.calcColorPlateCost(2);
                this.helper.calcColorPrintLoss(2);
                this.helper.calcColorCostPerPacket(2);
                this.helper.calcColorBasicCost(2);
                this.helper.calcColorThroughWage(2);
                this.helper.calcColorSpecial(2);
            }
        }

        this.setSpecialColorFConcealed(1);
        this.setSpecialColorBConcealed(1);

        // fix issues color
        this.pageData.product.colorIdB = 1;
        this.pageData.product.colorIdF = 1;

        
        //start init selected 2
        if (this.pageData.product.printMethod != 0) {
            let self = this;
            // using setTimeout paint select 2
            setTimeout(function () {
                if (!self.checkCreatePrintMethod_ColorF) {
                    self.initColorF(self.select2Option());
                    self.checkCreatePrintMethod_ColorF = true;
                }
                if (self.pageData.product.printMethod != 3) {
                    if (!self.checkCreatePrintMethod_ColorB) {
                        self.initColorB(self.select2Option());
                        self.checkCreatePrintMethod_ColorB = true;
                    }
                } else {
                    self.pageData.product.colorBText1 = '';
                    self.pageData.product.colorBText2 = '';
                    self.pageData.product.colorBText3 = '';
                    self.pageData.product.colorBText4 = '';
                    self.checkCreatePrintMethod_ColorB = false;
                }
            }, 50);
        }

        if (this.pageData.product.printMethod == 0) {
            this.checkCreatePrintMethod_ColorF = false;
            this.checkCreatePrintMethod_ColorB = false;
            //reset color text
            this.pageData.product.colorFText1 = '';
            this.pageData.product.colorFText2 = '';
            this.pageData.product.colorFText3 = '';
            this.pageData.product.colorFText4 = '';
            this.pageData.product.colorFText5 = '';
            this.pageData.product.colorFText6 = '';
            this.pageData.product.colorFText7 = '';
            this.pageData.product.colorFText8 = '';

            this.pageData.product.colorBText1 = '';
            this.pageData.product.colorBText2 = '';
            this.pageData.product.colorBText3 = '';
            this.pageData.product.colorBText4 = '';
        }
        //end init selected 2
    }

    get colorIdF(): number {
        if (this.pageData.product.colorIdF == undefined) {
            this.pageData.product.colorIdF = 0;
            // this.setColorIdIfConcealed(0);
        }
        // this.setColorIdIfConcealed(this.pageData.product.colorIdF);
        return this.pageData.product.colorIdF;
    }

    setColorIdIfConcealed(value: number) {
        this.pageData.product.colorIdF = value;

        if(this.pageData.product.printMethod!=2) {
            this.helper.calcColorPlateCost(1);
            this.helper.calcColorPrintLoss(1);
            this.helper.calcColorCostPerPacket(1);
            this.helper.calcColorBasicCost(1);
            this.helper.calcColorThroughWage(1);
            this.helper.calcColorSpecial(1);
        } else {
            this.helper.calcDigitalBasicCost();
            this.helper.calcDigitalThroughWage();
            if (this.pageData.product.surfaceTreatmentIdF == 8 || this.pageData.product.surfaceTreatmentIdF == 17 || this.pageData.product.surfaceTreatmentIdF > 18) {
                this.helper.calcColorPlateCost(1);
                this.helper.calcColorPrintLoss(1);
                this.helper.calcColorCostPerPacket(1);
                this.helper.calcColorBasicCost(1);
                this.helper.calcColorThroughWage(1);
                this.helper.calcColorSpecial(1);
            }
            if (this.pageData.product.surfaceTreatmentIdB == 8 || this.pageData.product.surfaceTreatmentIdB == 17 || this.pageData.product.surfaceTreatmentIdB > 18) {
                this.helper.calcColorPlateCost(2);
                this.helper.calcColorPrintLoss(2);
                this.helper.calcColorCostPerPacket(2);
                this.helper.calcColorBasicCost(2);
                this.helper.calcColorThroughWage(2);
                this.helper.calcColorSpecial(2);
            }

        }
    }

    set colorIdF(value: number) {
        this.setColorIdFTouched();
        this.setColorIdIfConcealed(value);
    }

    setColorIdFTouched() {
        this.pageData.highlightedTracker.touch('colorIdF');
    }

    get specialColorF(): number {
        if (this.pageData.product.specialColorF == undefined) {
            this.pageData.product.specialColorF = 0;
        }
        return this.pageData.product.specialColorF;
    }

    setSpecialColorFConcealed(value: number) {
        this.pageData.product.specialColorF = value;

        this.helper.calcColorSpecial(1);
    }

    set specialColorF(value: number) {
        this.setSpecialColorFTouched();
        this.setSpecialColorFConcealed(value);

        
    }

    setSpecialColorFTouched() {
        this.pageData.highlightedTracker.touch('specialColorF');
    }

    get specialColorB(): number {
        return this.pageData.product.specialColorB || 0;
    }

    set specialColorB(value: number) {
        this.setSpecialColorBTouched();
        this.setSpecialColorBConcealed(value);
        
    }

    setSpecialColorBConcealed(value: number) {
        this.pageData.product.specialColorB = value;

        const ID_BACK: number = 2;
        this.helper.calcColorSpecial(ID_BACK);
    }

    setSpecialColorBTouched() {
        this.pageData.highlightedTracker.touch('specialColorB');
    }

    get colorIdB(): number {
        if (this.pageData.product.colorIdB == undefined) {
            this.pageData.product.colorIdB = 1;
        }

        return this.pageData.product.colorIdB;
    }

    setColorIdBConcealed(value: number) {
        this.pageData.product.colorIdB = value;

        if (this.pageData.product.printMethod != 2) {
            this.helper.calcColorPlateCost(2);
            this.helper.calcColorPrintLoss(2);
            this.helper.calcColorCostPerPacket(2);
            this.helper.calcColorBasicCost(2);
            this.helper.calcColorThroughWage(2);
            this.helper.calcColorSpecial(2);
        } else {
            this.helper.calcDigitalBasicCost();
            this.helper.calcDigitalThroughWage();
            if (this.pageData.product.surfaceTreatmentIdF == 8 || this.pageData.product.surfaceTreatmentIdF == 17 || this.pageData.product.surfaceTreatmentIdF > 18) {
                this.helper.calcColorPlateCost(1);
                this.helper.calcColorPrintLoss(1);
                this.helper.calcColorCostPerPacket(1);
                this.helper.calcColorBasicCost(1);
                this.helper.calcColorThroughWage(1);
                this.helper.calcColorSpecial(1);
            }
            if (this.pageData.product.surfaceTreatmentIdB == 8 || this.pageData.product.surfaceTreatmentIdB == 17 || this.pageData.product.surfaceTreatmentIdB > 18) {
                this.helper.calcColorPlateCost(2);
                this.helper.calcColorPrintLoss(2);
                this.helper.calcColorCostPerPacket(2);
                this.helper.calcColorBasicCost(2);
                this.helper.calcColorThroughWage(2);
                this.helper.calcColorSpecial(2);
            }
        }

    }

    set colorIdB(value: number) {
        this.setColorIdBTouched();
        this.setColorIdBConcealed(value);

        
    }

    setColorIdBTouched() {
        this.pageData.highlightedTracker.touch('colorIdB');
    }

    // color memo
    //colorBText
    //TODO: 2463
    get colorBText1(): string {
        return this.pageData.product.colorBText1 || "";
    }

    set colorBText1(value: string) {
        this.pageData.highlightedTracker.touch('colorBText');
        this.pageData.product.colorBText1 = value || "";
        
    }

    get colorBText2(): string {
        return this.pageData.product.colorBText2 || "";
    }

    set colorBText2(value: string) {
        this.pageData.highlightedTracker.touch('colorBText');
        this.pageData.product.colorBText2 = value || "";
        
    }

    get colorBText3(): string {
        return this.pageData.product.colorBText3 || "";
    }

    set colorBText3(value: string) {
        this.pageData.highlightedTracker.touch('colorBText');
        this.pageData.product.colorBText3 = value || "";
        
    }

    get colorBText4(): string {
        return this.pageData.product.colorBText4 || "";
    }

    set colorBText4(value: string) {
        this.pageData.highlightedTracker.touch('colorBText');
        this.pageData.product.colorBText4 = value || "";
        
    }

    get colorBText5(): string {
        return "";
    }

    set colorBText5(value: string) {

    }

    get colorBText6(): string {
        return "";
    }

    set colorBText6(value: string) {

    }

    get colorBText7(): string {
        return "";
    }

    set colorBText7(value: string) {

    }

    get colorBText8(): string {
        return "";
    }

    set colorBText8(value: string) {

    }

    get colorFText1(): string {
        return this.pageData.product.colorFText1;
    }

    set colorFText1(value: string) {
        this.pageData.highlightedTracker.touch('colorMemo');
        this.pageData.product.colorFText1 = value;

        
    }

    get colorFText2(): string {
        return this.pageData.product.colorFText2 || "";
    }

    set colorFText2(value: string) {
        this.pageData.highlightedTracker.touch('colorMemo');
        this.pageData.product.colorFText2 = value;

        
    }

    get colorFText3(): string {
        return this.pageData.product.colorFText3 || "";
    }

    set colorFText3(value: string) {
        this.pageData.highlightedTracker.touch('colorMemo');
        this.pageData.product.colorFText3 = value;

        
    }

    get colorFText4(): string {
        return this.pageData.product.colorFText4 || "";
    }

    set colorFText4(value: string) {
        this.pageData.highlightedTracker.touch('colorMemo');
        this.pageData.product.colorFText4 = value;

        
    }

    get colorFText5(): string {
        return this.pageData.product.colorFText5 || "";
    }

    set colorFText5(value: string) {
        this.pageData.highlightedTracker.touch('colorMemo');
        this.pageData.product.colorFText5 = value;

        
    }

    get colorFText6(): string {
        return this.pageData.product.colorFText6 || "";
    }

    set colorFText6(value: string) {
        this.pageData.highlightedTracker.touch('colorMemo');
        this.pageData.product.colorFText6 = value;

        
    }

    get colorFText7(): string {
        return this.pageData.product.colorFText7 || "";
    }

    set colorFText7(value: string) {
        this.pageData.highlightedTracker.touch('colorMemo');
        this.pageData.product.colorFText7 = value;

        
    }

    get colorFText8(): string {
        return this.pageData.product.colorFText8 || "";
    }

    set colorFText8(value: string) {
        this.pageData.highlightedTracker.touch('colorMemo');
        this.pageData.product.colorFText8 = value;

        
    }

    //3007
    printMethodOption = DataUtil.toSelectBoxDataSource(PRINT_METHOD);

    digitalColorOption = DataUtil.toSelectBoxDataSource(DIGITAL_COLOR);

    offsetColorOption  =DataUtil.toSelectBoxDataSource(OFFSET_COLOR);

    cartonColorOption = DataUtil.toSelectBoxDataSource(CARTON_COLOR);

}
