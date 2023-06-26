import {Constants} from "../helper/constants";
import {LAMINATION_FLUTE, PRINT_METHOD_VALUE} from "../helper/mst-data-type";
import {MstPaper} from "../model/core/MstPaper.model";
import {Product} from "../model/core/Product.model";
import {MstLamination} from "../view/SF/COMMON/model/MstLamination.model";
import {
    CARTON_FLUTE,
    CARTON_LAMINATION_FIRST_OPTION,
    CARTON_LAMINATION_SECOND_OPTION,
    PAPER_CARD,
    PAPER_COAT_BALL,
    PAPER_LAMINATION_FIRST_OPTION,
    PAPER_LAMINATION_SECOND_OPTION
} from "../view/SF/SF00302/helper/master-option";
import {FileUtil} from "./file-util";
import ValidatorUtil from "./validator-util";

const TYPE_FRONT = 100, TYPE_B = 101, TYPE_MEDIUM = 102, TYPE_A = 103, TYPE_BACK = 104;

/**
 * Class util use to format display value on screens.
 * @author manhnv
 */
export class FormatUtil {
    /*Format dimension default display as 'size x depth x height'*/
    static formatDimension(pattern: string = Constants.X_SEPARATOR, ...args: any[]) {
        let seperator = Constants.SPACE + pattern + Constants.SPACE;
        return (args || [])
            .filter(arg => ValidatorUtil.isNotEmpty(arg))
            .join(seperator);
    }

    static getDimension(product: {
        productType: number;
        shapeId: number;
        paperSizeW: number;
        paperSizeH: number;
        sizeW: number;
        sizeD: number;
        sizeH: number;
    }) {
        //#2519
        if (product.productType == 0 && product.shapeId == 98) {
            // My pham ->  paperSizeW + paperSizeH
            return FormatUtil.formatDimension(Constants.X_SEPARATOR, product.paperSizeW, product.paperSizeH);
        }

        return FormatUtil.formatDimension(Constants.X_SEPARATOR, product.sizeW, product.sizeD, product.sizeH);
    }

    static formatPaperName_V1(product?: { paperName: string, paperWeight: number }) {
        if (this.hasProduct(product) && ValidatorUtil.isNotEmpty(product.paperName) && ValidatorUtil.isNotEmpty(product.paperWeight)) {
            return product.paperName + Constants.SPACE + product.paperWeight + Constants.GRAM;
        }

        return undefined;
    }

    static formatProductDescription(product: {
        productType: number,
        shapeId: number,
        sizeH: number,
        sizeD: number,
        sizeW: number,
        cartonShippingType: number,
        blankPaperSizeH: number,
        blankPaperSizeW: number,
        paperSizeH,
        paperSizeW,
        laminationFlute: number,
        paper: MstPaper,
        paperNameId: number,
        paperWeight: number,
        laminationPaperTypeA: number,
        laminationABasicWeight: number,
        laminationPaperTypeB: number,
        laminationBBasicWeight: number,
        laminationPaperTypeFront: number,
        laminationPaperTypeBack: number,
        laminationPaperTypeMedium: number,
        laminationFrontBasicWeight: number,
        laminationMediumBasicWeight: number,
        laminationBackBasicWeight: number,
        printMethod: number,
        colorIdF: number,
        specialColorF: number,
        colorIdB: number,
        specialColorB: number,
        laminationAId: number,
        laminationBId: number,
        laminationFrontId: number,
        laminationBackId: number,
        laminationMediumId: number,
    }, mstLaminations: MstLamination[]) {
        if (!product)
            return undefined;

        let descriptions = Constants.BLANK;

        //1. kích thước
        let dimension = FormatUtil.formatProductDimension(product);

        //2. phương thức
        let flute = FormatUtil.formatProductFlute(product);

        //3. Vật liệu
        let material = FormatUtil.getPaperName(product, mstLaminations);

        //4. Số màu
        let colors = FormatUtil.formatColorsViaPrintMethod(product);

        // combine
        if (!!dimension) {
            descriptions += dimension.trim();
        }
        if (!!flute) {
            descriptions += Constants.SPACE + flute;
        }
        if (!!material) {
            descriptions += Constants.SPACE + material.trim();
        }
        if (!!colors) {
            descriptions += Constants.SPACE + colors.trim() + Constants.SPACE;
        }

        return descriptions.trim();
    }

    static formatProductDimension(product: {
        productType: number,
        shapeId: number,
        sizeH: number,
        sizeD: number,
        sizeW: number,
        cartonShippingType: number,
        blankPaperSizeH: number,
        blankPaperSizeW: number,
        paperSizeH: number,
        paperSizeW: number
    }) {

        // 紙器・貼合・A式以外ダンボール
        if (FormatUtil.isPaperWave(product) || (FormatUtil.isCarton(product) && product.cartonShippingType == 2)) {
            return FormatUtil.formatDimension(Constants.X_SEPARATOR, product.sizeW, product.sizeD, product.sizeH);

            // A式ダンボール
            // 美粧
        } else if ((FormatUtil.isCarton(product) && product.cartonShippingType == 1) || FormatUtil.isMakeupSheet(product)) {
            return FormatUtil.formatDimension(Constants.X_SEPARATOR, product.blankPaperSizeW, product.blankPaperSizeH);
        }
    }

    static formatProductFlute(product: {
        productType: number,
        shapeId: number,
        laminationFlute: number
    }) {
        if (FormatUtil.isCarton(product)) {
            if (product.laminationFlute != 0) {
                var res = null;
                CARTON_FLUTE.map(data => {
                    if (data.id == product.laminationFlute) {
                        res = data.name;
                    }
                });
                return res;
            } else {
                return null;
            }
        }
        return product.laminationFlute != 1 ? LAMINATION_FLUTE[product.laminationFlute] : null;
    }

    static formatProductMaterial(product: {
        productType: number,
        shapeId: number,
        laminationFlute: number,
        paper: MstPaper,
        paperNameId: number,
        paperWeight: number
    }) {
        let material = Constants.BLANK;
        if (!product.paper || !product.paper.name) {
            if (!!product.paperNameId) {
                for (const paper of PAPER_CARD) {
                    if (paper.id == product.paperNameId) {
                        material = paper.name;
                        break;
                    }
                }
                if (!material) {
                    for (const paper of PAPER_COAT_BALL) {
                        if (paper.id == product.paperNameId) {
                            material = paper.name;
                            break;
                        }
                    }
                }
                if (!!material) {
                    material += product.paperWeight + Constants.GRAM;
                }
            }
        } else {
            if (product.paperNameId != 100) {
                material = product.paper.name + Constants.SPACE + product.paperWeight + Constants.GRAM;
            } else {
                material = product.paper.name;
            }

        }

        return material;
    }

    static getPaperName(product: {
        productType: number,
        shapeId: number,
        paper: MstPaper,
        paperNameId: number,
        paperWeight: number,
        laminationFlute: number,
        laminationPaperTypeA: number,
        laminationABasicWeight: number,
        laminationPaperTypeB: number,
        laminationBBasicWeight: number,
        laminationPaperTypeFront: number,
        laminationPaperTypeBack: number,
        laminationPaperTypeMedium: number,
        laminationFrontBasicWeight: number,
        laminationMediumBasicWeight: number,
        laminationBackBasicWeight: number,
        laminationAId: number,
        laminationBId: number,
        laminationFrontId: number,
        laminationBackId: number,
        laminationMediumId: number
    }, mstLaminations: MstLamination[]): string {
        // My Pham(decorative) or Carton
        if ((product.productType == 0 && product.shapeId == 98) || product.productType == 1) {
            return FormatUtil.formatProductLamination(product, mstLaminations);
        }

        // Hop giay (product.productType == 0 && product.shapeId != 98)
        let material   = FormatUtil.formatProductMaterial(product);
        let lamination = FormatUtil.formatProductLamination(product, mstLaminations);

        if (!!material && !!lamination) {
            return material + Constants.SLASH_JP + lamination;
        }

        return (material == undefined ? Constants.BLANK : material) + (lamination == undefined ? Constants.BLANK : lamination);
    }

    static formatProductLamination(product: {
        productType: number,
        shapeId: number,
        laminationFlute: number,
        laminationPaperTypeA: number,
        laminationPaperTypeB: number,
        laminationABasicWeight: number,
        laminationBBasicWeight: number,
        laminationPaperTypeFront: number,
        laminationPaperTypeBack: number,
        laminationPaperTypeMedium: number,
        laminationFrontBasicWeight: number,
        laminationMediumBasicWeight: number,
        laminationBackBasicWeight: number,
        laminationAId: number,
        laminationBId: number,
        laminationFrontId: number,
        laminationBackId: number,
        laminationMediumId: number
    }, mstLaminations: MstLamination[]) {
        let rule_4  = Constants.BLANK;
        let rule_4x = Constants.BLANK;
        if (!FormatUtil.isCarton(product)) {
            if (product.laminationFlute != 1) {
                //2408 1
                if (FormatUtil.isMakeupSheet(product)) {
                    if (product.laminationPaperTypeFront != undefined) {
                        rule_4x = undefined;
                        if (product.laminationPaperTypeFront == 0) {
                            rule_4x = "指定なし";
                        } else if (product.laminationPaperTypeFront == TYPE_FRONT) {
                            rule_4x = findLaminationAbbr(product.laminationFrontId);
                        } else if (product.laminationPaperTypeFront > 0) {
                            rule_4x = PAPER_LAMINATION_FIRST_OPTION[product.laminationPaperTypeFront];
                            if (rule_4x == undefined) {
                                rule_4x = PAPER_LAMINATION_SECOND_OPTION[product.laminationPaperTypeFront];
                            }

                            //http://fridaynight.vnext.vn/issues/2462
                            if (!!rule_4x) {
                                rule_4x += Constants.SPACE + product.laminationFrontBasicWeight + Constants.GRAM;
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
                    } else if (product.laminationPaperTypeMedium == TYPE_MEDIUM) {
                        rule_4x = findLaminationAbbr(product.laminationMediumId);
                    } else if (product.laminationPaperTypeMedium > 0) {
                        rule_4x = PAPER_LAMINATION_FIRST_OPTION[product.laminationPaperTypeMedium];
                        if (rule_4x == undefined) {
                            rule_4x = PAPER_LAMINATION_SECOND_OPTION[product.laminationPaperTypeMedium];
                        }

                        //http://fridaynight.vnext.vn/issues/2462
                        if (!!rule_4x) {
                            rule_4x += Constants.SPACE + product.laminationMediumBasicWeight + Constants.GRAM;
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
                    } else if (product.laminationPaperTypeBack == TYPE_BACK) {
                        rule_4x = findLaminationAbbr(product.laminationBackId);
                    } else if (product.laminationPaperTypeBack > 0) {
                        rule_4x = PAPER_LAMINATION_FIRST_OPTION[product.laminationPaperTypeBack];
                        if (rule_4x == undefined) {
                            rule_4x = PAPER_LAMINATION_SECOND_OPTION[product.laminationPaperTypeBack];
                        }

                        //http://fridaynight.vnext.vn/issues/2462
                        if (!!rule_4x) {
                            rule_4x += Constants.SPACE + product.laminationBackBasicWeight + Constants.GRAM;
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
        } else {
            if (product.laminationFlute != 0) {
                //2407 1
                if (product.laminationPaperTypeFront != undefined) {
                    rule_4x = undefined;
                    if (product.laminationPaperTypeFront == TYPE_FRONT) {
                        rule_4x = findLaminationAbbr(product.laminationFrontId);
                    } else if (product.laminationPaperTypeFront > 0) {
                        CARTON_LAMINATION_FIRST_OPTION.forEach(carton => {
                            if (carton.id == product.laminationPaperTypeFront) {
                                rule_4x = carton["name"];
                            }
                        });
                        if (rule_4x == undefined) {
                            CARTON_LAMINATION_SECOND_OPTION.forEach(carton => {
                                if (carton.id == product.laminationPaperTypeFront) {
                                    rule_4x = carton["name"];
                                }
                            });
                        }
                        //http://fridaynight.vnext.vn/issues/2462
                        if (!!rule_4x) {
                            rule_4x += Constants.SPACE + product.laminationFrontBasicWeight + Constants.GRAM;
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
                    } else if (product.laminationPaperTypeB > 0) {
                        CARTON_LAMINATION_FIRST_OPTION.forEach(carton => {
                            if (carton.id == product.laminationPaperTypeB) {
                                rule_4x = carton["name"];
                            }
                        });
                        if (rule_4x == undefined) {
                            CARTON_LAMINATION_SECOND_OPTION.forEach(carton => {
                                if (carton.id == product.laminationPaperTypeB) {
                                    rule_4x = carton["name"];
                                }
                            });
                        }
                        //http://fridaynight.vnext.vn/issues/2462
                        if (!!rule_4x) {
                            rule_4x += Constants.SPACE + product.laminationBBasicWeight + Constants.GRAM;
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
                    } else if (product.laminationPaperTypeMedium > 0) {
                        CARTON_LAMINATION_FIRST_OPTION.forEach(carton => {
                            if (carton.id == product.laminationPaperTypeMedium) {
                                rule_4x = carton["name"];
                            }
                        });
                        if (rule_4x == undefined) {
                            CARTON_LAMINATION_SECOND_OPTION.forEach(carton => {
                                if (carton.id == product.laminationPaperTypeMedium) {
                                    rule_4x = carton["name"];
                                }
                            });
                        }
                        //http://fridaynight.vnext.vn/issues/2462
                        if (!!rule_4x) {
                            rule_4x += Constants.SPACE + product.laminationMediumBasicWeight + Constants.GRAM;
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
                    } else if (product.laminationPaperTypeA > 0) {
                        CARTON_LAMINATION_FIRST_OPTION.forEach(carton => {
                            if (carton.id == product.laminationPaperTypeA) {
                                rule_4x = carton["name"];
                            }
                        });
                        if (rule_4x == undefined) {
                            CARTON_LAMINATION_SECOND_OPTION.forEach(carton => {
                                if (carton.id == product.laminationPaperTypeA) {
                                    rule_4x = carton["name"];
                                }
                            });
                        }
                        //http://fridaynight.vnext.vn/issues/2462
                        if (!!rule_4x) {
                            rule_4x += Constants.SPACE + product.laminationABasicWeight + Constants.GRAM;
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
                    } else if (product.laminationPaperTypeBack > 0) {
                        CARTON_LAMINATION_FIRST_OPTION.forEach(carton => {
                            if (carton.id == product.laminationPaperTypeBack) {
                                rule_4x = carton["name"];
                            }
                        });
                        if (rule_4x == undefined) {
                            CARTON_LAMINATION_SECOND_OPTION.forEach(carton => {
                                if (carton.id == product.laminationPaperTypeBack) {
                                    rule_4x = carton["name"];
                                }
                            });
                        }
                        //http://fridaynight.vnext.vn/issues/2462
                        if (!!rule_4x) {
                            rule_4x += Constants.SPACE + product.laminationBackBasicWeight + Constants.GRAM;
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

        function findLaminationAbbr(idLamination: number): string {
            for (let lamination of mstLaminations) {
                if (lamination.id == idLamination) {
                    let result = Constants.BLANK;
                    if (!!lamination.abbr)
                        result = lamination.abbr;
                    else if (!!lamination.paperName)
                        result = lamination.paperName;
                    else
                        result = lamination.materialName;

                    return result;
                }
            }

            return Constants.BLANK;
        }
    }

    /**
     * Check product type is 'Hop giay - 新規製品（紙器・貼合）を追加'
     * <code>
     *     product.productType == 0 && product.shapeId != 98
     * </code>
     * @param product
     * @return {boolean}
     */
    static isPaperWave(product: { productType: number, shapeId: number }): boolean {
        return (product && product.productType == 0 && product.shapeId != 98);
    }

    /**
     * Check product type is 'My Pham - 新規製品（美粧シート）を追加'
     * <code>
     *     product.productType == 0 && product.shapeId == 98
     * </code>
     * @param product
     * @return {boolean}
     */
    static isMakeupSheet(product: { productType: number, shapeId: number }): boolean {
        return (product && product.productType == 0 && product.shapeId == 98);
    }

    /**
     * Check product type is 'Carton - 新規製品（段ボール）を追加'
     * <code>
     *     product.productType == 1
     * </code>
     * @param product
     * @return {boolean}
     */
    static isCarton(product: { productType: number , shapeId: number}): boolean {
        return (product && product.productType == 1);
    }

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
    static isCarton3458(product: { productType: number , shapeId: number}): boolean {
        return (product && product.productType == 1 && product.shapeId != 100);
    }

    static formatColorsViaPrintMethod(product: {
        productType: number,
        shapeId: number,
        printMethod?: number,
        colorIdF?: number,
        specialColorF?: number,
        colorIdB?: number,
        specialColorB: number
    }) {
        const UNSPECIFIED = "印刷なし";

        const COLOR_UNIT = "c";
        if (FormatUtil.isCarton(product) || product.printMethod == PRINT_METHOD_VALUE.FLEXOGRAPHIC_PRINTING) {
            if (!product.colorIdF)
                return UNSPECIFIED;

            let colors = FormatUtil.offsetColorToValue(product.colorIdF);
            return `${colors}${COLOR_UNIT}`;
        }

        if (!product.printMethod)
            return UNSPECIFIED;

        if (product.printMethod == PRINT_METHOD_VALUE.OFFSET_PRINTING) {
            let colorsF = product.colorIdF - 1;
            let colorsB = product.colorIdB - 1;
            if (!colorsF && !colorsB) {
                return UNSPECIFIED;
            } else {
                return `${colorsF}${COLOR_UNIT}` + Constants.SLASH_JP + `${colorsB}${COLOR_UNIT}`
            }
        } else if (product.printMethod == PRINT_METHOD_VALUE.DIGITAL_PRINTING) {
            const symbol: string = "モノクロ";
            let colorsF          = FormatUtil.digitalColorToValue(product.colorIdF);
            let colorsB          = FormatUtil.digitalColorToValue(product.colorIdB);
            if (!colorsF && !colorsB) {
                return UNSPECIFIED;
            }
            let readColorsF = colorsF == 1 ? symbol : `${colorsF}${COLOR_UNIT}`;
            let readColorsB = colorsB == 1 ? symbol : `${colorsB}${COLOR_UNIT}`;
            return `${readColorsF}` + Constants.SLASH_JP + `${readColorsB}`
        } else {
            return UNSPECIFIED;
        }
    }

    private static offsetColorCount(...offsetColors: number[]): number {
        return offsetColors.reduce((previousValue, currentValue) => FormatUtil.offsetColorToValue(previousValue) + FormatUtil.offsetColorToValue(currentValue));
    }

    private static offsetColorToValue(offsetColor: number): number {
        return !offsetColor ? 0 : offsetColor - 1;
    }

    private static digitalColorToValue(digitalColor: number): number {
        if (!digitalColor || digitalColor == 1)
            return 0;
        else if (digitalColor == 9)
            return 1;
        else if (digitalColor == 10)
            return 4;
        else if (digitalColor == 11)
            return 7;
    }

    /*Check current deals-product includes product*/
    static hasProduct(product?: Product | any) {
        return product !== undefined && product != undefined;
    }
    /**
     * value が undefined または NaN であれば 0、それ以外は value を返す
     *
     * @param value 値
     * @return 値
     */
    static isNaN(value: any) {
        // check value string true -> value = 0
        if (value == undefined || isNaN(value)) {
            return 0;
        }

        // value default
        return value;
    }

    /**
     * Convert date to the number of milliseconds.
     * @param date the date tobe converted.
     * @returns {number of milliseconds}
     */
    static dateToMilliseconds(date: Date): number {
        if (ValidatorUtil.isEmpty(date))
            return undefined;

        /*month start from 0..11*/
        return Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }

    /**
     * Convert data checkBox to boolean from int
     * @param value
     * @returns {number}
     */
    static convertDataCheckBox(value: any): number {
        if (value == undefined || value == false) {
            return 0;
        } else {
            return 1;
        }
    }

    /**
     * Format number value to string
     *
     * @param value
     * @param precisionNumber
     * @param sectionLength
     * @returns {string}
     */
    static formatNumber(value: number, precisionNumber?: number, sectionLength?: number): string {
        // n: length of decimal
        let n = precisionNumber;
        if (n == undefined) {
            // default no precision
            n = 0;
        }

        // x: length of sections
        let x = sectionLength;
        if (x == undefined) {
            // default section = 3
            x = 3;
        }

        if (ValidatorUtil.isEmpty(value)) {
            return Constants.ZERO.toString();
        } else if (n == undefined) {
            let re = '\\d(?=(\\d{' + (x || 3) + '})+\\.)';
            return (Constants.BLANK + value).replace(new RegExp(re, Constants.GROUP), '$&,');
        } else {
            let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
            return value.toFixed(n).replace(new RegExp(re, Constants.GROUP), '$&,');
        }
    }

    /**
     * TODO: format date to string by formatter parttern
     * @param value
     * @return {null}
     */
    static formatDateToString(value: string, parttern: string): string {
        let dateString = undefined;
        if (value) {
            let date = new Date(value);
            if (parttern == 'yyyy/MM/dd') {
                dateString = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
            }
        }

        return dateString;
    }

    static getAnswer(...answer: any[]): string {
        let answers = answer.filter(item => {
            return item != undefined && item != '';
        });

        if (answers.length == 1)
            return answers[0];

        //loop array
        let answerList = Constants.BLANK;
        for (let i = 0; i < answers.length; i++) {
            if (i < answers.length - 1)
                answerList += answers[i] + Constants.COLON_WITH_SPACE;
            else
                answerList += answers[i]
        }
        return answerList;
    }

    static IMAGE_EXTENSIONS: string[] = ["JPG", "JPEG", "PNG"];

    static checkFileImg(originalName: string): boolean {
        let fileType = new FileUtil().transform(originalName);
        return !!fileType && $.inArray(fileType.toUpperCase(), FormatUtil.IMAGE_EXTENSIONS) >= 0;
    }

    static formatSalesName(departmentName: string, salesName: string): string {
        let formatedName = "";
        if (departmentName != undefined) {
            formatedName += departmentName;
            formatedName += "／";
        }
        if (salesName != undefined) {
            formatedName += salesName;
        }
        return formatedName;
    }

    static  productType(productType: number, shapeId: number,cartonShippingType: number): string {
        let productTypeStr = "";

        if (productType == 0 && shapeId == 98) {
            productTypeStr = "美粧";
        } else if (productType == 0 && shapeId == 100) {
            productTypeStr = "片段";
        } else if (productType == 1 && cartonShippingType == 1) {
            productTypeStr = "A式以外段ボール";
        } else if (productType == 1) {
            productTypeStr = "段ボール";
        } else {
            productTypeStr = "紙器・貼合";
        }

        return productTypeStr;
    }
}
