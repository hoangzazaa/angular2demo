"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var data_util_1 = require("../../../../../util/data-util");
var master_option_1 = require("../../helper/master-option");
var util_1 = require("util");
var unicode_util_1 = require("../../../../../util/unicode-util");
var SF0030208Component = (function () {
    function SF0030208Component() {
        // check create printMethod
        this.checkCreatePrintMethod_ColorF = false;
        this.checkCreatePrintMethod_ColorB = false;
        //3007
        this.mstColor_2685 = data_util_1.default.toSelectBoxDataSource(master_option_1.COLOR_2685);
        //3007
        this.printMethodOption = data_util_1.default.toSelectBoxDataSource(master_option_1.PRINT_METHOD);
        this.digitalColorOption = data_util_1.default.toSelectBoxDataSource(master_option_1.DIGITAL_COLOR);
        this.offsetColorOption = data_util_1.default.toSelectBoxDataSource(master_option_1.OFFSET_COLOR);
        this.cartonColorOption = data_util_1.default.toSelectBoxDataSource(master_option_1.CARTON_COLOR);
    }
    // //Add memo to list if not exist
    SF0030208Component.prototype.ngAfterViewInit = function () {
        this.handleColorOption();
        var select2Option = this.select2Option();
        if (this.pageData.product.printMethod != 0) {
            this.initColorF(select2Option);
            this.checkCreatePrintMethod_ColorF = true;
            if (this.pageData.product.printMethod != 3) {
                this.initColorB(select2Option);
                this.checkCreatePrintMethod_ColorB = true;
            }
        }
    };
    Object.defineProperty(SF0030208Component.prototype, "pageData", {
        get: function () {
            return this.helper.getSF00302Data();
        },
        enumerable: true,
        configurable: true
    });
    SF0030208Component.prototype.select2Option = function () {
        var self = this;
        return {
            data: self.mstColor_2685.map(function (opt) { return ({ id: opt.name, text: opt.name }); }),
            tags: true,
            escapeMarkup: function (markup) {
                return markup;
            },
            createTag: function (params) {
                return {
                    id: unicode_util_1.default.truncBySjisByte(params.term, 8),
                    text: unicode_util_1.default.truncBySjisByte(params.term, 8),
                    newOption: true
                };
            },
            templateResult: function (data) {
                var $result = $("<span style='font-size:11px!important'></span>");
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
    ;
    /**
     * Handle color option selected 2
     */
    SF0030208Component.prototype.handleColorOption = function () {
        var self = this;
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
        master_option_1.COLOR_2685.forEach(function (item) {
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
        });
    };
    SF0030208Component.prototype.initColorF = function (select2Options) {
        var _this = this;
        var self = this;
        //
        var $colorFText1 = $("#colorFText1");
        var $colorFText2 = $("#colorFText2");
        var $colorFText3 = $("#colorFText3");
        var $colorFText4 = $("#colorFText4");
        var $colorFText5 = $("#colorFText5");
        var $colorFText6 = $("#colorFText6");
        var $colorFText7 = $("#colorFText7");
        var $colorFText8 = $("#colorFText8");
        // add color_f_text_1 new
        if (!util_1.isNullOrUndefined(self.colorFText1) && self.colorFText1 != "" && self.colorFText1 != "　　") {
            if (!self.mstColorFtext1.find(function (item) { return item == self.colorFText1; })) {
                self.mstColorFtext1.unshift(self.colorFText1);
            }
        }
        if (!util_1.isNullOrUndefined(self.colorFText2) && self.colorFText2 != "" && self.colorFText2 != "　　") {
            if (!self.mstColorFtext2.find(function (item) { return item == self.colorFText2; })) {
                self.mstColorFtext2.unshift(self.colorFText2);
            }
        }
        if (!util_1.isNullOrUndefined(self.colorFText3) && self.colorFText3 != "" && self.colorFText3 != "　　") {
            if (!self.mstColorFtext3.find(function (item) { return item == self.colorFText3; })) {
                self.mstColorFtext3.unshift(self.colorFText3);
            }
        }
        if (!util_1.isNullOrUndefined(self.colorFText4) && self.colorFText4 != "" && self.colorFText4 != "　　") {
            if (!self.mstColorFtext4.find(function (item) { return item == self.colorFText4; })) {
                self.mstColorFtext4.unshift(self.colorFText4);
            }
        }
        if (!util_1.isNullOrUndefined(self.colorFText5) && self.colorFText5 != "" && self.colorFText5 != "　　") {
            if (!self.mstColorFtext5.find(function (item) { return item == self.colorFText5; })) {
                self.mstColorFtext5.unshift(self.colorFText5);
            }
        }
        if (!util_1.isNullOrUndefined(self.colorFText6) && self.colorFText6 != "" && self.colorFText6 != "　　") {
            if (!self.mstColorFtext6.find(function (item) { return item == self.colorFText6; })) {
                self.mstColorFtext6.unshift(self.colorFText6);
            }
        }
        if (!util_1.isNullOrUndefined(self.colorFText7) && self.colorFText7 != "" && self.colorFText7 != "　　") {
            if (!self.mstColorFtext7.find(function (item) { return item == self.colorFText7; })) {
                self.mstColorFtext7.unshift(self.colorFText7);
            }
        }
        if (!util_1.isNullOrUndefined(self.colorFText8) && self.colorFText8 != "" && self.colorFText8 != "　　") {
            if (!self.mstColorFtext8.find(function (item) { return item == self.colorFText8; })) {
                self.mstColorFtext8.unshift(self.colorFText8);
            }
        }
        // //assign select2
        setTimeout(function () {
            $colorFText1
                .select2(select2Options)
                .on("select2:select", function (event) {
                self.pageData.product.colorFText1 = event.target.value;
                _this.pageData.highlightedTracker.touch('colorIdF');
            })
                .val(self.pageData.product.colorFText1)
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
            $colorFText2
                .select2(select2Options)
                .on("select2:select", function (event) {
                self.pageData.product.colorFText2 = event.target.value;
                _this.pageData.highlightedTracker.touch('colorIdF');
            })
                .val(self.pageData.product.colorFText2)
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
            $colorFText3
                .select2(select2Options)
                .on("select2:select", function (event) {
                self.pageData.product.colorFText3 = event.target.value;
                _this.pageData.highlightedTracker.touch('colorIdF');
            })
                .val(self.pageData.product.colorFText3)
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
            $colorFText4
                .select2(select2Options)
                .on("select2:select", function (event) {
                self.pageData.product.colorFText4 = event.target.value;
                _this.pageData.highlightedTracker.touch('colorIdF');
            })
                .val(self.pageData.product.colorFText4)
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
            $colorFText5
                .select2(select2Options)
                .on("select2:select", function (event) {
                self.pageData.product.colorFText5 = event.target.value;
                _this.pageData.highlightedTracker.touch('colorIdF');
            })
                .val(self.pageData.product.colorFText5)
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
            $colorFText6
                .select2(select2Options)
                .on("select2:select", function (event) {
                self.pageData.product.colorFText6 = event.target.value;
                _this.pageData.highlightedTracker.touch('colorIdF');
            })
                .val(self.pageData.product.colorFText6)
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
            $colorFText7
                .select2(select2Options)
                .on("select2:select", function (event) {
                self.pageData.product.colorFText7 = event.target.value;
                _this.pageData.highlightedTracker.touch('colorIdF');
            })
                .val(self.pageData.product.colorFText7)
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
            $colorFText8
                .select2(select2Options)
                .on("select2:select", function (event) {
                self.pageData.product.colorFText8 = event.target.value;
                _this.pageData.highlightedTracker.touch('colorIdF');
            })
                .val(self.pageData.product.colorFText8)
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
        }, 50);
    };
    SF0030208Component.prototype.initColorB = function (select2Options) {
        var _this = this;
        var self = this;
        // assign color B
        var $colorBText1 = $("#colorBText1");
        var $colorBText2 = $("#colorBText2");
        var $colorBText3 = $("#colorBText3");
        var $colorBText4 = $("#colorBText4");
        var $colorBText5 = $("#colorBText5");
        var $colorBText6 = $("#colorBText6");
        var $colorBText7 = $("#colorBText7");
        var $colorBText8 = $("#colorBText8");
        if (!util_1.isNullOrUndefined(self.colorBText1) && self.colorBText1 != "" && self.colorBText1 != "　　") {
            if (!self.mstColorBtext1.find(function (item) { return item == self.colorBText1; })) {
                self.mstColorBtext1.unshift(self.colorBText1);
            }
        }
        if (!util_1.isNullOrUndefined(self.colorBText2) && self.colorBText2 != "" && self.colorBText2 != "　　") {
            if (!self.mstColorBtext2.find(function (item) { return item == self.colorBText2; })) {
                self.mstColorBtext2.unshift(self.colorBText2);
            }
        }
        if (!util_1.isNullOrUndefined(self.colorBText3) && self.colorBText3 != "" && self.colorBText3 != "　　") {
            if (!self.mstColorBtext3.find(function (item) { return item == self.colorBText3; })) {
                self.mstColorBtext3.unshift(self.colorBText3);
            }
        }
        if (!util_1.isNullOrUndefined(self.colorBText4) && self.colorBText4 != "" && self.colorBText4 != "　　") {
            if (!self.mstColorBtext4.find(function (item) { return item == self.colorBText4; })) {
                self.mstColorBtext4.unshift(self.colorBText4);
            }
        }
        // show select 2 color option
        setTimeout(function () {
            //Assign variables for dom
            $colorBText1
                .select2(select2Options)
                .on("select2:select", function (event) {
                self.pageData.product.colorBText1 = event.target.value;
                _this.pageData.highlightedTracker.touch('colorIdB');
            })
                .val(!!self.pageData.product.colorBText1 ? self.pageData.product.colorBText1 : null)
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
            $colorBText2
                .select2(select2Options)
                .on("select2:select", function (event) {
                self.pageData.product.colorBText2 = event.target.value;
                _this.pageData.highlightedTracker.touch('colorIdB');
            })
                .val(self.pageData.product.colorBText2)
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
            $colorBText3
                .select2(select2Options)
                .on("select2:select", function (event) {
                self.pageData.product.colorBText3 = event.target.value;
                _this.pageData.highlightedTracker.touch('colorIdB');
            })
                .val(self.pageData.product.colorBText3)
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
            $colorBText4
                .select2(select2Options)
                .on("select2:select", function (event) {
                self.pageData.product.colorBText4 = event.target.value;
                _this.pageData.highlightedTracker.touch('colorIdB');
            })
                .val(self.pageData.product.colorBText4)
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
            $colorBText5
                .select2(select2Options)
                .on("select2:select", function (event) {
            })
                .val("")
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
            $colorBText6
                .select2(select2Options)
                .on("select2:select", function (event) {
            })
                .val("")
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
            $colorBText7
                .select2(select2Options)
                .on("select2:select", function (event) {
            })
                .val("")
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
            $colorBText8
                .select2(select2Options)
                .on("select2:select", function (event) {
            })
                .val("")
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
        }, 50);
    };
    Object.defineProperty(SF0030208Component.prototype, "stateProductPrint", {
        /**
         * Get state if Product Print Accordion is filled with data or not
         * */
        get: function () {
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
                    }
                    else {
                        return false;
                    }
                }
                else if (this.pageData.product.printMethod == 2) {
                    if (this.pageData.product.colorIdF != undefined
                        && this.pageData.product.colorIdB != undefined
                        && this.pageData.product.printMethod != 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return true;
                }
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "isRequestDesign", {
        get: function () {
            return this.pageData.isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "isView", {
        get: function () {
            if (this.isRequestDesign) {
                return false;
            }
            else {
                return this.pageData.isView;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.pageData.isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    SF0030208Component.prototype.isHighlighted = function (input) {
        return this.pageData.highlightedTracker.isHighlightedProperty(input);
    };
    Object.defineProperty(SF0030208Component.prototype, "printMethod", {
        get: function () {
            if (this.pageData.product.printMethod == undefined) {
                if (this.pageData.product.shapeId != 98) {
                    this.pageData.product.printMethod = 0;
                }
                else {
                    this.pageData.product.printMethod = 3;
                }
            }
            return this.pageData.product.printMethod;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('printMethod');
            this.setColorIdFTouched();
            this.setSpecialColorFTouched();
            this.setSpecialColorBTouched();
            this.setColorIdBTouched();
            this.pageData.product.printMethod = value;
            if (this.pageData.product.printMethod == 1) {
                this.setColorIdBConcealed(1);
                this.setColorIdIfConcealed(1);
            }
            else if (this.pageData.product.printMethod == 2) {
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
            }
            else {
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
                var self_1 = this;
                // using setTimeout paint select 2
                setTimeout(function () {
                    if (!self_1.checkCreatePrintMethod_ColorF) {
                        self_1.initColorF(self_1.select2Option());
                        self_1.checkCreatePrintMethod_ColorF = true;
                    }
                    if (self_1.pageData.product.printMethod != 3) {
                        if (!self_1.checkCreatePrintMethod_ColorB) {
                            self_1.initColorB(self_1.select2Option());
                            self_1.checkCreatePrintMethod_ColorB = true;
                        }
                    }
                    else {
                        self_1.pageData.product.colorBText1 = '';
                        self_1.pageData.product.colorBText2 = '';
                        self_1.pageData.product.colorBText3 = '';
                        self_1.pageData.product.colorBText4 = '';
                        self_1.checkCreatePrintMethod_ColorB = false;
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "colorIdF", {
        get: function () {
            if (this.pageData.product.colorIdF == undefined) {
                this.pageData.product.colorIdF = 0;
            }
            // this.setColorIdIfConcealed(this.pageData.product.colorIdF);
            return this.pageData.product.colorIdF;
        },
        set: function (value) {
            this.setColorIdFTouched();
            this.setColorIdIfConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030208Component.prototype.setColorIdIfConcealed = function (value) {
        this.pageData.product.colorIdF = value;
        if (this.pageData.product.printMethod != 2) {
            this.helper.calcColorPlateCost(1);
            this.helper.calcColorPrintLoss(1);
            this.helper.calcColorCostPerPacket(1);
            this.helper.calcColorBasicCost(1);
            this.helper.calcColorThroughWage(1);
            this.helper.calcColorSpecial(1);
        }
        else {
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
    };
    SF0030208Component.prototype.setColorIdFTouched = function () {
        this.pageData.highlightedTracker.touch('colorIdF');
    };
    Object.defineProperty(SF0030208Component.prototype, "specialColorF", {
        get: function () {
            if (this.pageData.product.specialColorF == undefined) {
                this.pageData.product.specialColorF = 0;
            }
            return this.pageData.product.specialColorF;
        },
        set: function (value) {
            this.setSpecialColorFTouched();
            this.setSpecialColorFConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030208Component.prototype.setSpecialColorFConcealed = function (value) {
        this.pageData.product.specialColorF = value;
        this.helper.calcColorSpecial(1);
    };
    SF0030208Component.prototype.setSpecialColorFTouched = function () {
        this.pageData.highlightedTracker.touch('specialColorF');
    };
    Object.defineProperty(SF0030208Component.prototype, "specialColorB", {
        get: function () {
            return this.pageData.product.specialColorB || 0;
        },
        set: function (value) {
            this.setSpecialColorBTouched();
            this.setSpecialColorBConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030208Component.prototype.setSpecialColorBConcealed = function (value) {
        this.pageData.product.specialColorB = value;
        var ID_BACK = 2;
        this.helper.calcColorSpecial(ID_BACK);
    };
    SF0030208Component.prototype.setSpecialColorBTouched = function () {
        this.pageData.highlightedTracker.touch('specialColorB');
    };
    Object.defineProperty(SF0030208Component.prototype, "colorIdB", {
        get: function () {
            if (this.pageData.product.colorIdB == undefined) {
                this.pageData.product.colorIdB = 1;
            }
            return this.pageData.product.colorIdB;
        },
        set: function (value) {
            this.setColorIdBTouched();
            this.setColorIdBConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030208Component.prototype.setColorIdBConcealed = function (value) {
        this.pageData.product.colorIdB = value;
        if (this.pageData.product.printMethod != 2) {
            this.helper.calcColorPlateCost(2);
            this.helper.calcColorPrintLoss(2);
            this.helper.calcColorCostPerPacket(2);
            this.helper.calcColorBasicCost(2);
            this.helper.calcColorThroughWage(2);
            this.helper.calcColorSpecial(2);
        }
        else {
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
    };
    SF0030208Component.prototype.setColorIdBTouched = function () {
        this.pageData.highlightedTracker.touch('colorIdB');
    };
    Object.defineProperty(SF0030208Component.prototype, "colorBText1", {
        // color memo
        //colorBText
        //TODO: 2463
        get: function () {
            return this.pageData.product.colorBText1 || "";
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('colorBText');
            this.pageData.product.colorBText1 = value || "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "colorBText2", {
        get: function () {
            return this.pageData.product.colorBText2 || "";
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('colorBText');
            this.pageData.product.colorBText2 = value || "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "colorBText3", {
        get: function () {
            return this.pageData.product.colorBText3 || "";
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('colorBText');
            this.pageData.product.colorBText3 = value || "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "colorBText4", {
        get: function () {
            return this.pageData.product.colorBText4 || "";
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('colorBText');
            this.pageData.product.colorBText4 = value || "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "colorBText5", {
        get: function () {
            return "";
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "colorBText6", {
        get: function () {
            return "";
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "colorBText7", {
        get: function () {
            return "";
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "colorBText8", {
        get: function () {
            return "";
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "colorFText1", {
        get: function () {
            return this.pageData.product.colorFText1;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('colorMemo');
            this.pageData.product.colorFText1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "colorFText2", {
        get: function () {
            return this.pageData.product.colorFText2 || "";
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('colorMemo');
            this.pageData.product.colorFText2 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "colorFText3", {
        get: function () {
            return this.pageData.product.colorFText3 || "";
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('colorMemo');
            this.pageData.product.colorFText3 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "colorFText4", {
        get: function () {
            return this.pageData.product.colorFText4 || "";
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('colorMemo');
            this.pageData.product.colorFText4 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "colorFText5", {
        get: function () {
            return this.pageData.product.colorFText5 || "";
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('colorMemo');
            this.pageData.product.colorFText5 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "colorFText6", {
        get: function () {
            return this.pageData.product.colorFText6 || "";
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('colorMemo');
            this.pageData.product.colorFText6 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "colorFText7", {
        get: function () {
            return this.pageData.product.colorFText7 || "";
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('colorMemo');
            this.pageData.product.colorFText7 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030208Component.prototype, "colorFText8", {
        get: function () {
            return this.pageData.product.colorFText8 || "";
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('colorMemo');
            this.pageData.product.colorFText8 = value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030208Component.prototype, "helper", void 0);
    SF0030208Component = __decorate([
        core_1.Component({
            templateUrl: "SF0030208.component.html",
            selector: 'sf0030208'
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030208Component);
    return SF0030208Component;
}());
exports.SF0030208Component = SF0030208Component;
//# sourceMappingURL=SF0030208.component.js.map