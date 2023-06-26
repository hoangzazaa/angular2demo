"use strict";
var constants_1 = require("../helper/constants");
var mst_data_type_1 = require("../helper/mst-data-type");
var master_option_1 = require("../view/SF/SF00302/helper/master-option");
var file_util_1 = require("./file-util");
var validator_util_1 = require("./validator-util");
var TYPE_FRONT = 100, TYPE_B = 101, TYPE_MEDIUM = 102, TYPE_A = 103, TYPE_BACK = 104;
/**
 * Class util use to format display value on screens.
 * @author manhnv
 */
var FormatUtil = (function () {
    function FormatUtil() {
    }
    /*Format dimension default display as 'size x depth x height'*/
    FormatUtil.formatDimension = function (pattern) {
        if (pattern === void 0) { pattern = constants_1.Constants.X_SEPARATOR; }
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var seperator = constants_1.Constants.SPACE + pattern + constants_1.Constants.SPACE;
        return (args || [])
            .filter(function (arg) { return validator_util_1.default.isNotEmpty(arg); })
            .join(seperator);
    };
    FormatUtil.getDimension = function (product) {
        //#2519
        if (product.productType == 0 && product.shapeId == 98) {
            // My pham ->  paperSizeW + paperSizeH
            return FormatUtil.formatDimension(constants_1.Constants.X_SEPARATOR, product.paperSizeW, product.paperSizeH);
        }
        return FormatUtil.formatDimension(constants_1.Constants.X_SEPARATOR, product.sizeW, product.sizeD, product.sizeH);
    };
    FormatUtil.formatPaperName_V1 = function (product) {
        if (this.hasProduct(product) && validator_util_1.default.isNotEmpty(product.paperName) && validator_util_1.default.isNotEmpty(product.paperWeight)) {
            return product.paperName + constants_1.Constants.SPACE + product.paperWeight + constants_1.Constants.GRAM;
        }
        return undefined;
    };
    FormatUtil.formatProductDescription = function (product, mstLaminations) {
        if (!product)
            return undefined;
        var descriptions = constants_1.Constants.BLANK;
        //1. kích thước
        var dimension = FormatUtil.formatProductDimension(product);
        //2. phương thức
        var flute = FormatUtil.formatProductFlute(product);
        //3. Vật liệu
        var material = FormatUtil.getPaperName(product, mstLaminations);
        //4. Số màu
        var colors = FormatUtil.formatColorsViaPrintMethod(product);
        // combine
        if (!!dimension) {
            descriptions += dimension.trim();
        }
        if (!!flute) {
            descriptions += constants_1.Constants.SPACE + flute;
        }
        if (!!material) {
            descriptions += constants_1.Constants.SPACE + material.trim();
        }
        if (!!colors) {
            descriptions += constants_1.Constants.SPACE + colors.trim() + constants_1.Constants.SPACE;
        }
        return descriptions.trim();
    };
    FormatUtil.formatProductDimension = function (product) {
        // 紙器・貼合・A式以外ダンボール
        if (FormatUtil.isPaperWave(product) || (FormatUtil.isCarton(product) && product.cartonShippingType == 2)) {
            return FormatUtil.formatDimension(constants_1.Constants.X_SEPARATOR, product.sizeW, product.sizeD, product.sizeH);
        }
        else if ((FormatUtil.isCarton(product) && product.cartonShippingType == 1) || FormatUtil.isMakeupSheet(product)) {
            return FormatUtil.formatDimension(constants_1.Constants.X_SEPARATOR, product.blankPaperSizeW, product.blankPaperSizeH);
        }
    };
    FormatUtil.formatProductFlute = function (product) {
        if (FormatUtil.isCarton(product)) {
            if (product.laminationFlute != 0) {
                var res = null;
                master_option_1.CARTON_FLUTE.map(function (data) {
                    if (data.id == product.laminationFlute) {
                        res = data.name;
                    }
                });
                return res;
            }
            else {
                return null;
            }
        }
        return product.laminationFlute != 1 ? mst_data_type_1.LAMINATION_FLUTE[product.laminationFlute] : null;
    };
    FormatUtil.formatProductMaterial = function (product) {
        var material = constants_1.Constants.BLANK;
        if (!product.paper || !product.paper.name) {
            if (!!product.paperNameId) {
                for (var _i = 0, PAPER_CARD_1 = master_option_1.PAPER_CARD; _i < PAPER_CARD_1.length; _i++) {
                    var paper = PAPER_CARD_1[_i];
                    if (paper.id == product.paperNameId) {
                        material = paper.name;
                        break;
                    }
                }
                if (!material) {
                    for (var _a = 0, PAPER_COAT_BALL_1 = master_option_1.PAPER_COAT_BALL; _a < PAPER_COAT_BALL_1.length; _a++) {
                        var paper = PAPER_COAT_BALL_1[_a];
                        if (paper.id == product.paperNameId) {
                            material = paper.name;
                            break;
                        }
                    }
                }
                if (!!material) {
                    material += product.paperWeight + constants_1.Constants.GRAM;
                }
            }
        }
        else {
            if (product.paperNameId != 100) {
                material = product.paper.name + constants_1.Constants.SPACE + product.paperWeight + constants_1.Constants.GRAM;
            }
            else {
                material = product.paper.name;
            }
        }
        return material;
    };
    FormatUtil.getPaperName = function (product, mstLaminations) {
        // My Pham(decorative) or Carton
        if ((product.productType == 0 && product.shapeId == 98) || product.productType == 1) {
            return FormatUtil.formatProductLamination(product, mstLaminations);
        }
        // Hop giay (product.productType == 0 && product.shapeId != 98)
        var material = FormatUtil.formatProductMaterial(product);
        var lamination = FormatUtil.formatProductLamination(product, mstLaminations);
        if (!!material && !!lamination) {
            return material + constants_1.Constants.SLASH_JP + lamination;
        }
        return (material == undefined ? constants_1.Constants.BLANK : material) + (lamination == undefined ? constants_1.Constants.BLANK : lamination);
    };
    FormatUtil.formatProductLamination = function (product, mstLaminations) {
        var rule_4 = constants_1.Constants.BLANK;
        var rule_4x = constants_1.Constants.BLANK;
        if (!FormatUtil.isCarton(product)) {
            if (product.laminationFlute != 1) {
                //2408 1
                if (FormatUtil.isMakeupSheet(product)) {
                    if (product.laminationPaperTypeFront != undefined) {
                        rule_4x = undefined;
                        if (product.laminationPaperTypeFront == 0) {
                            rule_4x = "指定なし";
                        }
                        else if (product.laminationPaperTypeFront == TYPE_FRONT) {
                            rule_4x = findLaminationAbbr(product.laminationFrontId);
                        }
                        else if (product.laminationPaperTypeFront > 0) {
                            rule_4x = master_option_1.PAPER_LAMINATION_FIRST_OPTION[product.laminationPaperTypeFront];
                            if (rule_4x == undefined) {
                                rule_4x = master_option_1.PAPER_LAMINATION_SECOND_OPTION[product.laminationPaperTypeFront];
                            }
                            //http://fridaynight.vnext.vn/issues/2462
                            if (!!rule_4x) {
                                rule_4x += constants_1.Constants.SPACE + product.laminationFrontBasicWeight + constants_1.Constants.GRAM;
                            }
                        }
                        if (!!rule_4x) {
                            rule_4 += rule_4x.trim();
                        }
                    }
                }
                //2408 2
                if (product.laminationPaperTypeMedium != undefined) {
                    rule_4x = undefined;
                    if (product.laminationPaperTypeMedium == 0) {
                        rule_4x = "指定なし";
                    }
                    else if (product.laminationPaperTypeMedium == TYPE_MEDIUM) {
                        rule_4x = findLaminationAbbr(product.laminationMediumId);
                    }
                    else if (product.laminationPaperTypeMedium > 0) {
                        rule_4x = master_option_1.PAPER_LAMINATION_FIRST_OPTION[product.laminationPaperTypeMedium];
                        if (rule_4x == undefined) {
                            rule_4x = master_option_1.PAPER_LAMINATION_SECOND_OPTION[product.laminationPaperTypeMedium];
                        }
                        //http://fridaynight.vnext.vn/issues/2462
                        if (!!rule_4x) {
                            rule_4x += constants_1.Constants.SPACE + product.laminationMediumBasicWeight + constants_1.Constants.GRAM;
                        }
                    }
                    if (!!rule_4x) {
                        if (!!rule_4) {
                            rule_4 = rule_4 + "／";
                        }
                        rule_4 += rule_4x.trim();
                    }
                }
                //2408 3
                if (product.laminationPaperTypeBack != undefined) {
                    rule_4x = undefined;
                    if (product.laminationPaperTypeBack == 0) {
                        rule_4x = "指定なし";
                    }
                    else if (product.laminationPaperTypeBack == TYPE_BACK) {
                        rule_4x = findLaminationAbbr(product.laminationBackId);
                    }
                    else if (product.laminationPaperTypeBack > 0) {
                        rule_4x = master_option_1.PAPER_LAMINATION_FIRST_OPTION[product.laminationPaperTypeBack];
                        if (rule_4x == undefined) {
                            rule_4x = master_option_1.PAPER_LAMINATION_SECOND_OPTION[product.laminationPaperTypeBack];
                        }
                        //http://fridaynight.vnext.vn/issues/2462
                        if (!!rule_4x) {
                            rule_4x += constants_1.Constants.SPACE + product.laminationBackBasicWeight + constants_1.Constants.GRAM;
                        }
                    }
                    if (!!rule_4x) {
                        if (!!rule_4) {
                            rule_4 += "／";
                        }
                        rule_4 += rule_4x.trim();
                    }
                }
            }
        }
        else {
            if (product.laminationFlute != 0) {
                //2407 1
                if (product.laminationPaperTypeFront != undefined) {
                    rule_4x = undefined;
                    if (product.laminationPaperTypeFront == TYPE_FRONT) {
                        rule_4x = findLaminationAbbr(product.laminationFrontId);
                    }
                    else if (product.laminationPaperTypeFront > 0) {
                        master_option_1.CARTON_LAMINATION_FIRST_OPTION.forEach(function (carton) {
                            if (carton.id == product.laminationPaperTypeFront) {
                                rule_4x = carton["name"];
                            }
                        });
                        if (rule_4x == undefined) {
                            master_option_1.CARTON_LAMINATION_SECOND_OPTION.forEach(function (carton) {
                                if (carton.id == product.laminationPaperTypeFront) {
                                    rule_4x = carton["name"];
                                }
                            });
                        }
                        //http://fridaynight.vnext.vn/issues/2462
                        if (!!rule_4x) {
                            rule_4x += constants_1.Constants.SPACE + product.laminationFrontBasicWeight + constants_1.Constants.GRAM;
                        }
                    }
                    if (!!rule_4x) {
                        rule_4 += rule_4x.trim();
                    }
                }
                //2407 2
                if (product.laminationPaperTypeB != undefined
                    && (product.laminationFlute == 3 || product.laminationFlute == 0)) {
                    rule_4x = undefined;
                    if (product.laminationPaperTypeB == TYPE_B) {
                        rule_4x = findLaminationAbbr(product.laminationBId);
                    }
                    else if (product.laminationPaperTypeB > 0) {
                        master_option_1.CARTON_LAMINATION_FIRST_OPTION.forEach(function (carton) {
                            if (carton.id == product.laminationPaperTypeB) {
                                rule_4x = carton["name"];
                            }
                        });
                        if (rule_4x == undefined) {
                            master_option_1.CARTON_LAMINATION_SECOND_OPTION.forEach(function (carton) {
                                if (carton.id == product.laminationPaperTypeB) {
                                    rule_4x = carton["name"];
                                }
                            });
                        }
                        //http://fridaynight.vnext.vn/issues/2462
                        if (!!rule_4x) {
                            rule_4x += constants_1.Constants.SPACE + product.laminationBBasicWeight + constants_1.Constants.GRAM;
                        }
                    }
                    if (rule_4x != undefined) {
                        if (rule_4 != undefined) {
                            rule_4 += "／";
                        }
                        rule_4 += rule_4x.trim();
                    }
                }
                //2407 3
                if (product.laminationPaperTypeMedium != undefined) {
                    rule_4x = undefined;
                    if (product.laminationPaperTypeMedium == TYPE_MEDIUM) {
                        rule_4x = findLaminationAbbr(product.laminationMediumId);
                    }
                    else if (product.laminationPaperTypeMedium > 0) {
                        master_option_1.CARTON_LAMINATION_FIRST_OPTION.forEach(function (carton) {
                            if (carton.id == product.laminationPaperTypeMedium) {
                                rule_4x = carton["name"];
                            }
                        });
                        if (rule_4x == undefined) {
                            master_option_1.CARTON_LAMINATION_SECOND_OPTION.forEach(function (carton) {
                                if (carton.id == product.laminationPaperTypeMedium) {
                                    rule_4x = carton["name"];
                                }
                            });
                        }
                        //http://fridaynight.vnext.vn/issues/2462
                        if (!!rule_4x) {
                            rule_4x += constants_1.Constants.SPACE + product.laminationMediumBasicWeight + constants_1.Constants.GRAM;
                        }
                    }
                    if (rule_4x != undefined) {
                        if (rule_4 != undefined) {
                            rule_4 += "／";
                        }
                        rule_4 += rule_4x.trim();
                    }
                }
                //2407 4
                if (product.laminationPaperTypeA != undefined
                    && (product.laminationFlute == 3 || product.laminationFlute == 0)) {
                    rule_4x = undefined;
                    if (product.laminationPaperTypeA == TYPE_A) {
                        rule_4x = findLaminationAbbr(product.laminationAId);
                    }
                    else if (product.laminationPaperTypeA > 0) {
                        master_option_1.CARTON_LAMINATION_FIRST_OPTION.forEach(function (carton) {
                            if (carton.id == product.laminationPaperTypeA) {
                                rule_4x = carton["name"];
                            }
                        });
                        if (rule_4x == undefined) {
                            master_option_1.CARTON_LAMINATION_SECOND_OPTION.forEach(function (carton) {
                                if (carton.id == product.laminationPaperTypeA) {
                                    rule_4x = carton["name"];
                                }
                            });
                        }
                        //http://fridaynight.vnext.vn/issues/2462
                        if (!!rule_4x) {
                            rule_4x += constants_1.Constants.SPACE + product.laminationABasicWeight + constants_1.Constants.GRAM;
                        }
                    }
                    if (rule_4x != undefined) {
                        if (rule_4 != undefined) {
                            rule_4 += "／";
                        }
                        rule_4 += rule_4x.trim();
                    }
                }
                //2407 5
                if (product.laminationPaperTypeBack != undefined) {
                    rule_4x = undefined;
                    if (product.laminationPaperTypeBack == TYPE_BACK) {
                        rule_4x = findLaminationAbbr(product.laminationBackId);
                    }
                    else if (product.laminationPaperTypeBack > 0) {
                        master_option_1.CARTON_LAMINATION_FIRST_OPTION.forEach(function (carton) {
                            if (carton.id == product.laminationPaperTypeBack) {
                                rule_4x = carton["name"];
                            }
                        });
                        if (rule_4x == undefined) {
                            master_option_1.CARTON_LAMINATION_SECOND_OPTION.forEach(function (carton) {
                                if (carton.id == product.laminationPaperTypeBack) {
                                    rule_4x = carton["name"];
                                }
                            });
                        }
                        //http://fridaynight.vnext.vn/issues/2462
                        if (!!rule_4x) {
                            rule_4x += constants_1.Constants.SPACE + product.laminationBackBasicWeight + constants_1.Constants.GRAM;
                        }
                    }
                    if (rule_4x != undefined) {
                        if (rule_4 != undefined) {
                            rule_4 += "／";
                        }
                        rule_4 += rule_4x.trim();
                    }
                }
            }
        }
        return rule_4;
        function findLaminationAbbr(idLamination) {
            for (var _i = 0, mstLaminations_1 = mstLaminations; _i < mstLaminations_1.length; _i++) {
                var lamination = mstLaminations_1[_i];
                if (lamination.id == idLamination) {
                    var result = constants_1.Constants.BLANK;
                    if (!!lamination.abbr)
                        result = lamination.abbr;
                    else if (!!lamination.paperName)
                        result = lamination.paperName;
                    else
                        result = lamination.materialName;
                    return result;
                }
            }
            return constants_1.Constants.BLANK;
        }
    };
    /**
     * Check product type is 'Hop giay - 新規製品（紙器・貼合）を追加'
     * <code>
     *     product.productType == 0 && product.shapeId != 98
     * </code>
     * @param product
     * @return {boolean}
     */
    FormatUtil.isPaperWave = function (product) {
        return (product && product.productType == 0 && product.shapeId != 98);
    };
    /**
     * Check product type is 'My Pham - 新規製品（美粧シート）を追加'
     * <code>
     *     product.productType == 0 && product.shapeId == 98
     * </code>
     * @param product
     * @return {boolean}
     */
    FormatUtil.isMakeupSheet = function (product) {
        return (product && product.productType == 0 && product.shapeId == 98);
    };
    /**
     * Check product type is 'Carton - 新規製品（段ボール）を追加'
     * <code>
     *     product.productType == 1
     * </code>
     * @param product
     * @return {boolean}
     */
    FormatUtil.isCarton = function (product) {
        return (product && product.productType == 1);
    };
    /**
     * Check product type is 'Carton - 新規製品（段ボール）を追加'
     * <code>
     *     product.productType == 1
     *     &&
     *     product.shapeId != 100
     * </code>
     * @param product
     * @return {boolean}
     */
    FormatUtil.isCarton3458 = function (product) {
        return (product && product.productType == 1 && product.shapeId != 100);
    };
    FormatUtil.formatColorsViaPrintMethod = function (product) {
        var UNSPECIFIED = "印刷なし";
        var COLOR_UNIT = "c";
        if (FormatUtil.isCarton(product) || product.printMethod == mst_data_type_1.PRINT_METHOD_VALUE.FLEXOGRAPHIC_PRINTING) {
            if (!product.colorIdF)
                return UNSPECIFIED;
            var colors = FormatUtil.offsetColorToValue(product.colorIdF);
            return "" + colors + COLOR_UNIT;
        }
        if (!product.printMethod)
            return UNSPECIFIED;
        if (product.printMethod == mst_data_type_1.PRINT_METHOD_VALUE.OFFSET_PRINTING) {
            var colorsF = product.colorIdF - 1;
            var colorsB = product.colorIdB - 1;
            if (!colorsF && !colorsB) {
                return UNSPECIFIED;
            }
            else {
                return ("" + colorsF + COLOR_UNIT) + constants_1.Constants.SLASH_JP + ("" + colorsB + COLOR_UNIT);
            }
        }
        else if (product.printMethod == mst_data_type_1.PRINT_METHOD_VALUE.DIGITAL_PRINTING) {
            var symbol = "モノクロ";
            var colorsF = FormatUtil.digitalColorToValue(product.colorIdF);
            var colorsB = FormatUtil.digitalColorToValue(product.colorIdB);
            if (!colorsF && !colorsB) {
                return UNSPECIFIED;
            }
            var readColorsF = colorsF == 1 ? symbol : "" + colorsF + COLOR_UNIT;
            var readColorsB = colorsB == 1 ? symbol : "" + colorsB + COLOR_UNIT;
            return ("" + readColorsF) + constants_1.Constants.SLASH_JP + ("" + readColorsB);
        }
        else {
            return UNSPECIFIED;
        }
    };
    FormatUtil.offsetColorCount = function () {
        var offsetColors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            offsetColors[_i - 0] = arguments[_i];
        }
        return offsetColors.reduce(function (previousValue, currentValue) { return FormatUtil.offsetColorToValue(previousValue) + FormatUtil.offsetColorToValue(currentValue); });
    };
    FormatUtil.offsetColorToValue = function (offsetColor) {
        return !offsetColor ? 0 : offsetColor - 1;
    };
    FormatUtil.digitalColorToValue = function (digitalColor) {
        if (!digitalColor || digitalColor == 1)
            return 0;
        else if (digitalColor == 9)
            return 1;
        else if (digitalColor == 10)
            return 4;
        else if (digitalColor == 11)
            return 7;
    };
    /*Check current deals-product includes product*/
    FormatUtil.hasProduct = function (product) {
        return product !== undefined && product != undefined;
    };
    /**
     * value が undefined または NaN であれば 0、それ以外は value を返す
     *
     * @param value 値
     * @return 値
     */
    FormatUtil.isNaN = function (value) {
        // check value string true -> value = 0
        if (value == undefined || isNaN(value)) {
            return 0;
        }
        // value default
        return value;
    };
    /**
     * Convert date to the number of milliseconds.
     * @param date the date tobe converted.
     * @returns {number of milliseconds}
     */
    FormatUtil.dateToMilliseconds = function (date) {
        if (validator_util_1.default.isEmpty(date))
            return undefined;
        /*month start from 0..11*/
        return Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate());
    };
    /**
     * Convert data checkBox to boolean from int
     * @param value
     * @returns {number}
     */
    FormatUtil.convertDataCheckBox = function (value) {
        if (value == undefined || value == false) {
            return 0;
        }
        else {
            return 1;
        }
    };
    /**
     * Format number value to string
     *
     * @param value
     * @param precisionNumber
     * @param sectionLength
     * @returns {string}
     */
    FormatUtil.formatNumber = function (value, precisionNumber, sectionLength) {
        // n: length of decimal
        var n = precisionNumber;
        if (n == undefined) {
            // default no precision
            n = 0;
        }
        // x: length of sections
        var x = sectionLength;
        if (x == undefined) {
            // default section = 3
            x = 3;
        }
        if (validator_util_1.default.isEmpty(value)) {
            return constants_1.Constants.ZERO.toString();
        }
        else if (n == undefined) {
            var re = '\\d(?=(\\d{' + (x || 3) + '})+\\.)';
            return (constants_1.Constants.BLANK + value).replace(new RegExp(re, constants_1.Constants.GROUP), '$&,');
        }
        else {
            var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
            return value.toFixed(n).replace(new RegExp(re, constants_1.Constants.GROUP), '$&,');
        }
    };
    /**
     * TODO: format date to string by formatter parttern
     * @param value
     * @return {null}
     */
    FormatUtil.formatDateToString = function (value, parttern) {
        var dateString = undefined;
        if (value) {
            var date = new Date(value);
            if (parttern == 'yyyy/MM/dd') {
                dateString = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
            }
        }
        return dateString;
    };
    FormatUtil.getAnswer = function () {
        var answer = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            answer[_i - 0] = arguments[_i];
        }
        var answers = answer.filter(function (item) {
            return item != undefined && item != '';
        });
        if (answers.length == 1)
            return answers[0];
        //loop array
        var answerList = constants_1.Constants.BLANK;
        for (var i = 0; i < answers.length; i++) {
            if (i < answers.length - 1)
                answerList += answers[i] + constants_1.Constants.COLON_WITH_SPACE;
            else
                answerList += answers[i];
        }
        return answerList;
    };
    FormatUtil.checkFileImg = function (originalName) {
        var fileType = new file_util_1.FileUtil().transform(originalName);
        return !!fileType && $.inArray(fileType.toUpperCase(), FormatUtil.IMAGE_EXTENSIONS) >= 0;
    };
    FormatUtil.formatSalesName = function (departmentName, salesName) {
        var formatedName = "";
        if (departmentName != undefined) {
            formatedName += departmentName;
            formatedName += "／";
        }
        if (salesName != undefined) {
            formatedName += salesName;
        }
        return formatedName;
    };
    FormatUtil.productType = function (productType, shapeId, cartonShippingType) {
        var productTypeStr = "";
        if (productType == 0 && shapeId == 98) {
            productTypeStr = "美粧";
        }
        else if (productType == 0 && shapeId == 100) {
            productTypeStr = "片段";
        }
        else if (productType == 1 && cartonShippingType == 1) {
            productTypeStr = "A式以外段ボール";
        }
        else if (productType == 1) {
            productTypeStr = "段ボール";
        }
        else {
            productTypeStr = "紙器・貼合";
        }
        return productTypeStr;
    };
    FormatUtil.IMAGE_EXTENSIONS = ["JPG", "JPEG", "PNG"];
    return FormatUtil;
}());
exports.FormatUtil = FormatUtil;
//# sourceMappingURL=format-util.js.map