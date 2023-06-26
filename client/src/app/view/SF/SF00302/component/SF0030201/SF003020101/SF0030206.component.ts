import {Component, Input, OnInit} from "@angular/core";
import DataUtil from "../../../../../../util/data-util";
import ValidatorUtil from "../../../../../../util/validator-util";
import MathUtil from "../../../../../../util/math-util";
import {PaperModel} from "../../../model/paper.model";
import {FormatUtil} from "../../../../../../util/format-util";
import {SF0030206Helper} from "./SF0030206.helper";
import {PAPER_CARD, PAPER_COAT_BALL} from "../../../helper/master-option";
import {MstSheetSize} from "../../../../../../model/core/MstSheetSize.model";
import { SF003020101Helper } from './SF003020101.helper';
import { TEMPLATE_DEAL } from '../../../../../../helper/mst-data-type';

declare var $: any;
declare var App: any;
const PAPER_1 = 1, TAB_1 = 1, TAB_2 = 2;

/**
 * 紙器の製品情報入力フォーム
 * @author DungTQ
 */
@Component({
    templateUrl: "SF0030206.component.html",
    selector   : 'sf0030206'
})
export class SF0030206Component implements OnInit {
    /** ヘルパー {@see SF003020101Helper} */
    @Input()
    helper: SF0030206Helper;

    private _paperOptions: any;

    // value selected after
    idSelectedTmp: number;
    // input option = [1,2]
    inputPaperOption: number;
    paperWeightTmp: number;

    constructor() {
        this._paperOptions = {};
    }

    get paperTmp(): PaperModel {
        return this.pageData.paperTmp;
    }

    ngOnInit(): void {
        this.pageData.paperTmp = new PaperModel();
        // init data
        this.initDataMst();
        // issue 2344
        // find index by paperSizeW và paperSizeH
        this.pageData.mstSheetSizeDisplay = [];
        // init sheetSize
        this.initSheetSize();
    }

    /**
     * シートサイズの初期化
     */
    initSheetSize() {
        let sheetSizeList = (this.helper as SF003020101Helper).createSheetSizeList();
        this.pageData.mstSheetSizeDisplay = sheetSizeList.sheetSizes;
        this.pageData._sheetSize = sheetSizeList.selectedIndex != null ? sheetSizeList.selectedIndex + 1 : 0;
    }

    changePaperSheetSize(paperNameId?: number) {
        this.pageData.mstSheetSizeDisplay = [];
        // check neu la paper new va khong phai paper clone se coi nhu la moi
        if (paperNameId == 100 && !!this.paperTmp.isNew && this.paperTmp.isPaperClone != 1) {
            this.pageData._sheetSize = 0;
            this.pageData.product.specialSizeFlag = 1;
            return;
        }

        // 原紙サイズ手入力フラグを落とす
        this.pageData.product.specialSizeFlag = 0;

        // get list mst sheetSize
        if (paperNameId == 100 && this.paperTmp.tabNumber == 2) {
            // 特殊原紙の場合
            let sheetSize = this.pageData.paperTmp.toMstSheetSize();
            this.pageData._sheetSize          = 1;
            this.pageData.mstSheetSizeDisplay.push(sheetSize);
        } else {
            let paperId                       = this.pageData.product.paperId;
            let sheetSizes                    = this.mstSheetSizes.filter(item => {
                return item.paperId != undefined && item.paperId == paperId;
            });
            this.pageData.mstSheetSizeDisplay = sheetSizes;

            let sheetSize = sheetSizes[0];
            if (!!sheetSizes && sheetSizes.length > 0) {
                this.pageData._sheetSize          = 1;
                this.pageData.product.sheetSizeId = sheetSize.id;
                this.pageData.product.paperSizeW  = sheetSize.width;
                this.pageData.product.paperSizeH  = sheetSize.height;
            } else {
                this.pageData._sheetSize = 0;
            }
        }
    }

    get sheetSize(): number {
        return this.pageData._sheetSize;
    }

    set sheetSize(value: number) {
        if (value != 0) {
            // DB に登録されているシートサイズの場合
            this.pageData.product.specialSizeFlag = 0;
            let mstSheetSize                  = this.pageData.mstSheetSizeDisplay[value - 1];
            this.paperSizeW                   = mstSheetSize.width;
            this.paperSizeH                   = mstSheetSize.height;
            this.pageData.product.sheetSizeId = mstSheetSize.id;
        } else {
            // その他のサイズの場合
            this.pageData.product.specialSizeFlag = 1;
        }
        this.pageData._sheetSize = value;
    }

    get mstPapersBackground() {
        return this.pageData.mstPapersBackgroundTab1;
    }

    get mstPapersBackgroundTab2() {
        return this.pageData.mstPapersBackgroundTab2;
    }

    /**
     * Get state if Product Material Accordion is filled with data or not
     * */
    get stateProductMaterial() {
        return this.pageData.product.paperSizeW != undefined
            && this.pageData.product.paperSizeH != undefined
            && this.pageData.product.cutPaperSizeH != undefined
            && this.pageData.product.cutPaperSizeW != undefined
            && this.pageData.product.impositionNumber != undefined
            && this.pageData.product.takenNumber != undefined
            && this.pageData.product.paperNameId != undefined
            && this.pageData.product.paperNameId != 0;
    }

    get mstSheetSizes(): MstSheetSize[] {
        return this.pageData.mstSheetSizes;
    }

    isNumeric($event) {
        return ValidatorUtil.isNumeric($event);
    }

    get isView() {
        if (this.isRequestDesign) {
            return false;
        } else {
            return this.pageData.isView;
        }
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

    get paperNameId(): number {
        //http://fridaynight.vnext.vn/issues/1887
        if (this.pageData.product.paperNameId == 99) {
            // get data paper with paperNameId = 99
            this.setPaperIdConcealed(99);
        }

        if (this.pageData.product.id && this.pageData.product.paperNameId == 100) {
            return this.pageData.product.paperNameId;
        }

        this.calcPaperWeightOptions();
        if (this.pageData.product.paperWeight != undefined) {
            this.setPaperWeightConcealed(this.pageData.product.paperWeight);
        }

        return this.pageData.product.paperNameId;
    }

    setPaperIdConcealed(value: number) {
        this.pageData.product.paperNameId = value;

        this.calcPaperWeightOptions();
        if (this._paperOptions != undefined) {
            this.setPaperWeightConcealed(+Object.keys(this._paperOptions)[0]);
        }
    }


    set paperNameId(value: number) {
        // set paperIdTmp
        this.idSelectedTmp  = DataUtil.cloneObject(this.pageData.product).paperNameId;
        this.paperWeightTmp = DataUtil.cloneObject(this.pageData.product).paperWeight;
        if (value == 99) {
            // reset paper model
            this.pageData.paperModel          = new PaperModel();
            // update status selectbox
            this.pageData.product.paperNameId = 99;

            this.pageData.mstPapersBackgroundTab1 = [];

            this.inputPaperOption = PAPER_1;

            this.pageData.showModal2903 = true;
            //push data
            this.modalShow();
        } else {
            this.setPaperIdConcealed(value);
            this.changePaperSheetSize(value);
        }
        //this.helper.validateForm();
    }

    get paperWeight(): number {
        return FormatUtil.isNaN(this.pageData.product.paperWeight);
    }

    setPaperWeightConcealed(value: number) {
        //http://fridaynight.vnext.vn/issues/1887
        if (value != 99 && this._paperOptions && Object.keys(this._paperOptions).indexOf(value.toString()) > 0) {
            this.pageData.product.paperWeight = value;
        } else {
            // check this._paperOptions == 0
            if (!!this._paperOptions) {
                this.pageData.product.paperWeight = +Object.keys(this._paperOptions)[0];
            } else {
                this.pageData.product.paperWeight = +0;
            }
        }
        if (this.pageData.product.paperNameId != 100 && this.pageData.product.paperNameId != 99) {
            this.pageData.product.paperId = DataUtil.getData(this.pageData.mstData.mstPaper, 0,
                this.pageData.product.factoryId, this.pageData.product.paperNameId, this.pageData.product.paperWeight, "paperId");
        } else if (this.pageData.product.paperNameId == 100) {
            if (this.pageData.paperTmp.id != null) {
                this.pageData.product.paperId = DataUtil.cloneObject(this.pageData.paperTmp).id;
            }
        }
        this.helper.calcPaperActualWeight();
        this.helper.calcShippingCost();
    }


    set paperWeight(value: number) {
        this.pageData.highlightedTracker.touch('paper');
        this.setPaperWeightConcealed(value);
        //this.helper.validateForm();
    }

    calcPaperWeightOptions(): any {
        if (this.pageData.product.paperNameId != undefined) {
            this._paperOptions = DataUtil.getData(this.pageData.mstData.mstPaper, 0, this.pageData.product.factoryId, this.pageData.product.paperNameId);
        } else {
            this._paperOptions = {};
        }
    }

    get paperOptions() {
        if (this.pageData.product.paperNameId == 100) {
            let result = [];
            result.push(this.pageData.product.paperWeight);
            return result;
        }
        if (this._paperOptions != undefined) {
            return Object.keys(this._paperOptions);
        } else {
            return null;
        }
    }

    get paperNormValue(): number {
        if (this.pageData.mstData != undefined && this.pageData.product.paperNameId != undefined) {
            let value = DataUtil.getData(this.pageData.mstData.mstPaper, 0,
                this.pageData.product.factoryId, this.pageData.product.paperNameId,
                this.pageData.product.paperWeight, "normValue");
            return FormatUtil.isNaN(value);
        } else if (this.pageData.product.paperNameId == undefined) {
            // Bug 1567
            return 0;
        }
    }

    get paperSizeW(): number {
        return this.pageData.product.paperSizeW;
    }

    setPaperSizeWConcealed(value: number) {
        this.pageData.product.paperSizeW = value;
        this.helper.calcPaperActualWeight();

    }

    set paperSizeW(value: number) {
        this.pageData.highlightedTracker.touch('paperSize');
        this.setPaperSizeWConcealed(value);
    }

    changeValueSheetSize() {
        let self = this;
        setTimeout(function () {
            let index = self.pageData.mstSheetSizeDisplay.findIndex(item => {
                return item.width == self.pageData.product.paperSizeW
                    && item.height == self.pageData.product.paperSizeH;
            })

            if (index > -1) {
                self.pageData._sheetSize = index + 1;
            } else {
                self.pageData._sheetSize = 0;
            }
        }, 60);
    }

    get paperSizeH(): number {
        return this.pageData.product.paperSizeH;
    }

    setPaperSizeHConcealed(value: number) {
        this.pageData.product.paperSizeH = value;
        this.helper.calcPaperActualWeight();

    }

    set paperSizeH(value: number) {
        this.pageData.highlightedTracker.touch('paperSize');
        this.setPaperSizeHConcealed(value);
    }

    get cutPaperSizeW(): number {
        return this.pageData.product.cutPaperSizeW;
    }

    set cutPaperSizeW(value: number) {
        this.pageData.highlightedTracker.touch('cutPaperSize');
        this.pageData.product.cutPaperSizeW = value;

        this.helper.calcSurfaceBasicCost(1);
        this.helper.calcSurfaceBasicCost(2);
        this.helper.calcSurfaceBasicCost(3);
        this.helper.calcSurfaceThroughWage(1);
        this.helper.calcSurfaceThroughWage(2);
        this.helper.calcSurfaceThroughWage(3);
        this.helper.calcDieCuttingBasicCost();
        this.helper.calcDieCuttingThroughWage();
    }

    get cutPaperSizeH(): number {
        return this.pageData.product.cutPaperSizeH;
    }

    set cutPaperSizeH(value: number) {
        this.pageData.highlightedTracker.touch('cutPaperSize');
        this.pageData.product.cutPaperSizeH = value;

        this.helper.calcSurfaceBasicCost(1);
        this.helper.calcSurfaceBasicCost(2);
        this.helper.calcSurfaceBasicCost(3);
        this.helper.calcSurfaceThroughWage(1);
        this.helper.calcSurfaceThroughWage(2);
        this.helper.calcSurfaceThroughWage(3);
        this.helper.calcDieCuttingBasicCost();
        this.helper.calcDieCuttingThroughWage();

        //this.helper.validateForm();
        this.pageData.checkInputSave = true;
    }

    get impositionNumber(): number {
        this.pageData.product.impositionNumber = MathUtil.checkNaN(this.pageData.product.impositionNumber);
        return this.pageData.product.impositionNumber;
    }

    set impositionNumber(value: number) {

        this.pageData.highlightedTracker.touch('impositionNumber');
        this.pageData.product.impositionNumber = value;
        if (MathUtil.checkNaN(this.pageData.product.specialDieCuttingNumberFlag) == 0) {
            this.pageData.product.dieCuttingThroughNumber = value;
        }

        this.helper.calcLaminationTotalCost();
        this.helper.calcSurfaceBasicCost(1);
        this.helper.calcSurfaceThroughWage(1);
        this.helper.calcSurfaceTotalCost(1);
        this.helper.calcSurfaceBasicCost(2);
        this.helper.calcSurfaceThroughWage(2);
        this.helper.calcSurfaceTotalCost(2);
        this.helper.calcSurfaceBasicCost(3);
        this.helper.calcSurfaceThroughWage(3);
        this.helper.calcSurfaceTotalCost(3);
        this.helper.calcDieCuttingBasicCost();
        this.helper.calcDieCuttingThroughWage();
        this.helper.calcDieCuttingTotalCost();
        this.helper.calcPasteBasicCost();
        this.helper.calcPasteThroughWage();
    }

    get takenNumber(): number {
        this.pageData.product.takenNumber = MathUtil.checkNaN(this.pageData.product.takenNumber);
        return this.pageData.product.takenNumber;
    }

    set takenNumber(value: number) {

        this.pageData.highlightedTracker.touch('takenNumber');
        this.pageData.product.takenNumber = value;
        this.helper.calcPaperTotalCost();
        //this.helper.validateForm();
    }

    get paperHeadApprovalFlag(): boolean {

        if (this.pageData.product.paperHeadApprovalFlag > 0) {
            this.pageData.mstData.mstPaper = this.pageData.mstData.mstPaperHead;
            return true;
        }
        this.pageData.mstData.mstPaper = this.pageData.mstData.mstPaperNormal;
        return false;
    }

    set paperHeadApprovalFlag(value: boolean) {
        this.pageData.highlightedTracker.touch('paperApprovalFlag');
        this.setPaperHeadApprovalConcealed(value);
    }

    setPaperHeadApprovalConcealed(value: boolean) {
        if (value) {
            this.pageData.product.paperHeadApprovalFlag = 1;
            this.pageData.mstData.mstPaper              = this.pageData.mstData.mstPaperHead;
        } else {
            this.pageData.product.paperHeadApprovalFlag = 0;
            this.pageData.mstData.mstPaper              = this.pageData.mstData.mstPaperNormal;
        }
    }

    get checkImposition() {
        if (MathUtil.checkNaN(this.pageData.productOutput.lot / this.pageData.product.impositionNumber) >= 10000) {
            return true;
        } else {
            return false;
        }
    }

    get paperCoalBallOption() {
        return PAPER_COAT_BALL;
    }

    get paperCardBOption() {
        return PAPER_CARD;
    }

    get checkBorderPaperNameId(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSavePaperName) {
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

    get checkBorderPaperWeight(): { style: string, radius: string } {

        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSavePaperWeight) {
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

    get checkBorderPaperSheetSize(): { style: string, radius: string } {
        // giai đoạn sau khi tạo product xong
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            // giai đoạn khởi tạo sau khi create product
            if (this.pageData.yCheck) {
                if (!this.pageData.productRequiredItem.isSavePaperSizeW) {
                    // giai đoạn sau khi save lần tiếp theo
                    if (this.pageData.xCheck) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                } else {
                    return this.pageData.noneFieldBorderCss;
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

    get checkBorderPaperSizeW(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSavePaperSizeW) {
                    return this.pageData.errFieldBorderCss;
                } else {
                    // chỉ trường hợp đã nhập vào "その他/ Others" ở pulldown thì 2 item bên dưới mới có thể nhập và nằm trong khung màu xanh.
                    if (this.pageData.xCheck && this.pageData._sheetSize == 0) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                // chỉ trường hợp đã nhập vào "その他/ Others" ở pulldown thì 2 item bên dưới mới có thể nhập và nằm trong khung màu xanh.
                if (this.pageData.xCheck && this.pageData._sheetSize == 0) {
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
                    // chỉ trường hợp đã nhập vào "その他/ Others" ở pulldown thì 2 item bên dưới mới có thể nhập và nằm trong khung màu xanh.
                    if (this.pageData.xCheck && this.pageData._sheetSize == 0) {
                        return this.pageData.defaultFieldBorderCss;
                    } else {
                        return this.pageData.noneFieldBorderCss;
                    }
                }
            } else {
                // chỉ trường hợp đã nhập vào "その他/ Others" ở pulldown thì 2 item bên dưới mới có thể nhập và nằm trong khung màu xanh.
                if (this.pageData.xCheck && this.pageData._sheetSize == 0) {
                    return this.pageData.defaultFieldBorderCss;
                } else {
                    return this.pageData.noneFieldBorderCss;
                }
            }
        }
    }

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

    get checkBorderImpositionNumber(): { style: string, radius: string } {
        if (this.pageData.zCheck) {
            return this.pageData.defaultFieldBorderCss;
        } else {
            if (this.pageData.yCheck) {
                if (this.pageData.productRequiredItem.isSaveImpositionNumber) {
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

    // TODO:start http://fridaynight.vnext.vn/issues/2408
    // closed modal
    closedModal() {
        this.pageData.product.paperNameId = this.idSelectedTmp;
        if (this.idSelectedTmp == 100) {
            this.pageData.product.paperWeight = this.paperWeightTmp;
            this.helper.calcPaperActualWeight();
            this.helper.calcShippingCost();
        }

        this.modalHide();
    }

    // calculator data result SF0030222
    setPaperModalResult(paperModel: PaperModel) {
        // 1.set paper_weight ->
        this.pageData.paperTmp = new PaperModel();
        if (!!paperModel.paperId && !paperModel.isNew) {
            this.paperNameId = paperModel.paperId;
            this.paperWeight = paperModel.basicWeight;
            this.pageData.product.specialSizeFlag = 0;
        } else {
            // add paper new
            this.addNewPaper(paperModel);
            // set option input
            paperModel.optionId = this.inputPaperOption;

            // set paper_name -> khong goi ham tinh
            // issue 2344
            this.pageData.paperTmp.isNew        = paperModel.isNew;
            this.pageData.paperTmp.paperName    = paperModel.paperName;
            this.pageData.paperTmp.id           = paperModel.id;
            this.pageData.paperTmp.basicWeight  = paperModel.basicWeight;
            this.pageData.paperTmp.isPaperClone = paperModel.isPaperClone;
            this.pageData.paperTmp.tabNumber    = paperModel.tabNumber;
            this.pageData.paperTmp.paperSizeId  = paperModel.paperSizeId;

            this.pageData.product.paperId     = DataUtil.cloneObject(this.pageData.paperTmp).id;
            this.pageData.product.paperNameId = 100;
            this.pageData.product.paperWeight = paperModel.basicWeight;
            this.pageData.product.sheetSizeId = paperModel.paperSizeId;
            // 2903
            if (paperModel.paper2903) {
                this.pageData.paperTmp.paperSizeW = paperModel.paperSizeW;
                this.pageData.paperTmp.paperSizeH = paperModel.paperSizeH;
                this.pageData.product.paperSizeW  = paperModel.paperSizeW;
                this.pageData.product.paperSizeH  = paperModel.paperSizeH;
                this.pageData.checkPaper2903      = true;
            } else {
                this.pageData.checkPaper2903 = false;
            }
            this.pageData.addPaperModel(paperModel, 100, PAPER_1);
            this.helper.calcPaperActualWeight();
            this.helper.calcShippingCost();
            // get mst sheetSize
            this.changePaperSheetSize(100);
        }

        //2. hide modal
        this.modalHide();

        //3. Dong thoi neu da chon thi phai xu ly phan highlightedTracker.touch
        this.pageData.highlightedTracker.touch('paperNameId');
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

    getDataMstLaminations() {
        // reset paper model
        this.pageData.paperModel = new PaperModel();

        // tab1
        this.pageData.mstPapersBackgroundTab1 = [];
        let mstPapers: PaperModel[]           = this.pageData.mstPapers;
        if (this.pageData.product.paperHeadApprovalFlag == 1) {
            mstPapers = this.pageData.mstPapersHeader;
        }
        this.pageData.mstPapersBackgroundTab1 = mstPapers.filter(item => {
            return item.factoryId == this.pageData.product.factoryId
                && item.tabNumber == TAB_1
                && item.commonFlag != 1
                && item.commonFlag != undefined;
        }).map(item => {
            let paper = DataUtil.cloneObject(item);
            if (paper.factoryId != this.pageData.product.factoryId) {
                paper.normValue = 0;
            }

            return paper;
        });

        // tab2
        this.pageData.mstPapersBackgroundTab2 = [];
        this.pageData.mstPapersBackgroundTab2 = mstPapers.filter(item => {
            return item.factoryId == this.pageData.product.factoryId
                && item.tabNumber == TAB_2
                && item.commonFlag != 1
                && item.commonFlag != undefined;
        }).map(item => {
            let paper = DataUtil.cloneObject(item);
            if (paper.factoryId != this.pageData.product.factoryId) {
                paper.normValue = 0;
            }

            return paper;
        });

        // update status selectbox
        switch (this.inputPaperOption) {
            //中芯（g/㎡）
            case PAPER_1:
                this.pageData.product.paperNameId = 99;
                break;
            default:
                break;
        }
    }

    modalHide() {
        this.pageData.showModal2903 = false;
        $("#paperModal").modal('hide');
    }

    //ISSUE: http://fridaynight.vnext.vn/issues/2408
    get pageData() {
        return this.helper.getSF00302Data();
    }

    addNewPaper(paperModel: PaperModel) {
        // nếu là clone thì sẽ set list sheetsize vào paper
        // 3090
        if (paperModel.isPaperClone == 1) {
            paperModel.sheetSizeClone = [];
            if (!!paperModel.paperSizeH && !!paperModel.paperSizeW) {
                let sheetSize = this.pageData.mstSheetSizes.filter(item => {
                    return item.width == paperModel.paperSizeW
                        && item.height == paperModel.paperSizeH
                        && item.paperId == paperModel.id;
                });
                if (!!sheetSize) {
                    paperModel.sheetSizeClone.push(sheetSize[0]);
                }
            } else if (!!paperModel.id) {
                paperModel.sheetSizeClone = this.pageData.mstSheetSizes.filter(item => {
                    return item.paperId == paperModel.id;
                });
            }
        }
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
        let product = this.pageData.product;

        // 原紙がモーダルで選択されていない場合は何もしない
        if (!product.id　|| product.paperNameId != 100) {
            return;     // Do nothing
        }

        const PAPER = 1;
        let paperModel;

        // 選択されている原紙を検索する
        let paperModels = this.pageData.mstPapers.filter(item => item.id == product.paperId && item.factoryId == product.factoryId);

        if (paperModels.length == 1) {
            paperModel = paperModels[0];
        } else if (product.sheetSizeId) {
            // 原紙サイズ ID を元に検索する
            paperModel = paperModels.find(item => item.paperSizeId == product.sheetSizeId);
        } else {
            // 原紙サイズを元に検索する
            paperModel = paperModels.find(item => {
                return item.paperSizeW == product.paperSizeW
                    && item.paperSizeH == product.paperSizeH;
            });
        }

        if (!!paperModel) {
            this.pageData.paperTmp = paperModel;
            this.pageData.addPaperModel(paperModel, 100, PAPER);
        }
    }

    get disabledIssue2344(): boolean {
        if (!!!this.pageData.product.paperNameId) {
            return true;
        }

        return false;
    }

    // TODO:start http://fridaynight.vnext.vn/issues/2408
}
