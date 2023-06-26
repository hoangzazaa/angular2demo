import {OnInit, Component, Input} from "@angular/core";
import DataUtil from "../../../../../../util/data-util";
import {CARTON_NOT_A_FLUTE, PAPER_LAMINATION_FLUTE} from "../../../helper/master-option";
import {SF0030225Helper} from "./SF0030225.helper";
import {SF00302Data} from "../../../SF00302.data";
import MathUtil from "../../../../../../util/math-util";

declare var $: JQueryStatic;
declare var App: any;

@Component({
    templateUrl: "SF0030225.component.html",
    selector: 'sf0030225'
})
export class SF0030225Component implements OnInit {
    @Input()
    helper: SF0030225Helper;

    ngOnInit() {
        // [!] paperSize, cutPaperSizeの項目を追加したため、変更前の保存分について、paperSize = blankPaperSizeを適用しておく。
        let bw = this.pageData.product.blankPaperSizeW, bh = this.pageData.product.blankPaperSizeH;
        if ( bw !== undefined && bw != 0 ) {
            if (this.pageData.product.paperSizeW === undefined) this.pageData.product.paperSizeW = bw;
            if (this.pageData.product.cutPaperSizeW === undefined) this.pageData.product.cutPaperSizeW = bw;
        }
        if (this.pageData.product.cutPaperSizeH === undefined && bh !== undefined && bh != 0) {
            this.pageData.product.cutPaperSizeH = bh;
        }
    }

    isHighlighted(input) {
        return this.pageData.highlightedTracker.isHighlightedProperty(input);
    }

    get laminationFluteOption () {
        let temp = Object.assign({}, CARTON_NOT_A_FLUTE); //"なしを除く"
        delete temp[0];
        return DataUtil.toSelectBoxDataSource(temp);
    }

    get pageData(): SF00302Data {
        return this.helper.getSF00302Data();
    }

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

    // 原紙寸法 (mm) * 一旦SF0030215Componentからコピー
    get checkBorderPaperSizeW(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSavePaperSizeW) {
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

    get checkBorderPaperSizeH(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSavePaperSizeH) {
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

    // シート寸法 (mm) * 一旦SF0030206Componentからコピー
    get checkBorderCutPaperSizeW(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveCutSizeW) {
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

    get checkBorderCutPaperSizeH(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveCutSizeH) {
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

    // 展開寸法（mm） * SF0030217Componentを参照
    get checkBorderBlankPaperSizeW(): { style: string, radius: string } {
        return this.pageData.noneFieldBorderCss;
    }

    get checkBorderBlankPaperSizeH(): { style: string, radius: string } {
        return this.pageData.noneFieldBorderCss;
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

    get laminationFlute(): number {
        if (this.pageData.product.laminationFlute == undefined) {
            this.pageData.product.laminationFlute = 1;
        }
        return this.pageData.product.laminationFlute;
    }

    set laminationFlute(value: number) {
        this.pageData.highlightedTracker.touch('laminationFlute');
        this.pageData.product.laminationFlute = value;
        this.helper.calcMaterialCostCarton();
        this.helper.calcDieCuttingThroughWage();
        this.helper.calcShipFareCarton();
    }

    get paperSizeW(): number {
        return this.pageData.product.paperSizeW;
    }

    set paperSizeW(value: number) {
        this.pageData.highlightedTracker.touch('paperSize');
        this.pageData.product.paperSizeW = value;
        this.onChangePaperSize();
    }

    get cutPaperSizeW(): number {
        return this.pageData.product.cutPaperSizeW;
    }

    set cutPaperSizeW(value: number) {
        this.pageData.highlightedTracker.touch('cutPaperSize');
        this.pageData.product.cutPaperSizeW = value;
        this.onChangePaperSize();
    }

    get cutPaperSizeH(): number {
        return this.pageData.product.cutPaperSizeH;
    }

    set cutPaperSizeH(value: number) {
        this.pageData.highlightedTracker.touch('cutPaperSize');
        this.pageData.product.cutPaperSizeH = value;
        this.onChangePaperSize();
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
        this.onChangePaperSize();
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
        this.onChangePaperSize();
    }

    // とりあえず全部計算させておく。
    onChangePaperSize() {
        this.helper.calcDieCuttingThroughWage();
        this.helper.calcPasteBasicCost();
        this.helper.calcPasteThroughWage();
        this.helper.calcAdditionFare();
        this.helper.calcTotalCarton();        
    }

    get takenNumber(): number {
        this.pageData.product.takenNumber = MathUtil.checkNaN(this.pageData.product.takenNumber);
        return this.pageData.product.takenNumber;
    }

    set takenNumber(value: number) {

        this.pageData.highlightedTracker.touch('takenNumber');
        this.pageData.product.takenNumber = value;
        this.helper.calcPasteBasicCost();
        this.helper.calcAdditionFare();
        this.helper.calcCartonLotGap();
        this.helper.calcTotalCarton();
        //this.helper.validateForm();
    }
    get isView() {
        if(this.isRequestDesign) {
            return false
        } else {
            return this.pageData.isView;
        }
    }

    get isCreateNewProduct() {
        return this.pageData.isCreateNewProduct;
    }

    get isRequestDesign() {
        return this.pageData.isRequestDesign;
    }
}