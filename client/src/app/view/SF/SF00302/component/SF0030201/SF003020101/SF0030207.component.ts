import {Component, Input, OnInit} from "@angular/core";
import {SF0030207Helper} from "./SF0030207.helper";
import DataUtil from "../../../../../../util/data-util";
import {
    PAPER_LAMINATION_FIRST_OPTION,
    PAPER_LAMINATION_FLUTE,
    PAPER_LAMINATION_SECOND_OPTION
} from "../../../helper/master-option";
import MathUtil from "../../../../../../util/math-util";
import {PaperModel} from "../../../model/paper.model";
import {isNullOrUndefined} from "util";
import {FormatUtil} from "../../../../../../util/format-util";

declare var $: JQueryStatic;
declare var App: any;
const PAPER_3 = 3, PAPER_5 = 5, BATCH_USER = 272;
const TYPE_FRONT = 100,TYPE_B = 101,TYPE_MEDIUM = 102,TYPE_A = 103,TYPE_BACK = 104;
@Component({
    templateUrl: "SF0030207.component.html",
    selector: 'sf0030207'
})
/**
 * Component quotation info
 * @author DungTQ
 * */

export class SF0030207Component implements OnInit{
    ngOnInit(): void {
        this.pageData.paperTmp3 = new PaperModel();
        this.pageData.paperTmp5 = new PaperModel();
        // init data
        this.initDataMst();
    }
    @Input()
    helper: SF0030207Helper;

    // value selected after
    idSelectedTmp: number;
    // input option = [1,2]
    inputPaperOption: number;

    _laminationWeightBackOption: any
    _laminationWeightMediumOption: any;

    constructor() {
    }

    /**
     * Get state if Product Lamination Accordion is filled with data or not
     * */
    get stateProductLamination() {
        if ((this.pageData.product.laminationNumber != undefined
            && this.pageData.product.laminationWidth != undefined
            && this.pageData.product.laminationCuttingFlow != undefined
            && this.pageData.product.laminationNumber.toString() != ""
            && this.pageData.product.laminationWidth.toString() != ""
            && this.pageData.product.laminationCuttingFlow.toString() != ""
            && this.pageData.product.laminationFlute != undefined) || this.pageData.product.laminationFlute == 1) {
            return true;
        } else {
            return false;
        }
    }

    get paperTmp3(): PaperModel{
        return this.pageData.paperTmp3
    }

    get paperTmp5(): PaperModel{
        return this.pageData.paperTmp5
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

    get laminationFlute(): number {
        if (this.pageData.product.laminationFlute == undefined) {
            this.pageData.product.laminationFlute = 1;
        }
        return this.pageData.product.laminationFlute;
    }

    set laminationFlute(value: number) {

        this.pageData.highlightedTracker.touch('laminationFlute');
        this.pageData.product.laminationFlute = value;

        this.helper.calcLaminationUnitPrice();
        this.helper.calcLaminationSheetCost();
        this.helper.calcLaminationTotalCost();
        this.helper.calcWindowTotalCost();
        this.helper.calcDieCuttingBasicCost();
        this.helper.calcDieCuttingThroughWage();
        this.helper.calcPasteBasicCost();
        this.helper.calcPasteThroughWage();

    }

    get laminationMediumBasicWeight(): number {
        if (this.pageData.product.laminationMediumBasicWeight == undefined) {
            if (this.pageData.product.laminationPaperTypeMedium != 8 && this.pageData.product.laminationPaperTypeMedium != 0) {
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
            if(!isNullOrUndefined(this._laminationWeightMediumOption)) {
                this.setLaminationMediumThroughWageConcealed(MathUtil.checkNaN(this._laminationWeightMediumOption[value]["throughWage"]));
            } else {
                this.setLaminationMediumThroughWageConcealed(0);
            }
        }

        this.helper.calcLaminationUnitPrice();
    }

    set laminationMediumBasicWeight(value: number) {

        this.pageData.highlightedTracker.touch('laminationMediumBasicWeight');
        this.setLaminationMediumBasicWeightConcealed(value);

    }

    get laminationMediumThroughWage(): number {
        return FormatUtil.isNaN(this.pageData.product.laminationMediumThroughWage);

    }

    set laminationMediumThroughWage(value: number) {
        this.setLaminationMediumThroughWageConcealed(value);

    }

    get laminationBackBasicWeight(): number {

        if (this.pageData.product.laminationBackBasicWeight == undefined) {
            if (this.pageData.product.laminationPaperTypeBack != 8 && this.pageData.product.laminationPaperTypeBack != 0) {
                this.pageData.product.laminationBackBasicWeight = +Object.keys(this._laminationWeightBackOption)[0];
            } else {
                this.pageData.product.laminationBackBasicWeight = undefined;
            }
        }
        return this.pageData.product.laminationBackBasicWeight;
    }

    setLaminationBackBasicWeightConcealned(value: number) {

        this.pageData.product.laminationBackBasicWeight = value;
        if (this.pageData.product.laminationPaperTypeBack != 0) {
            if(!isNullOrUndefined(this._laminationWeightBackOption)) {
                this.setLaminationBackThroughWageConcealed(MathUtil.checkNaN(this._laminationWeightBackOption[value]["throughWage"]));
            } else {
                this.setLaminationBackThroughWageConcealed(0);
            }
        }
        this.helper.calcLaminationUnitPrice();

    }

    setLaminationBackThroughWageConcealed(value: number) {

        this.pageData.product.laminationBackThroughWage = value;

        this.helper.calcLaminationUnitPrice();
    }

    setLaminationMediumThroughWageConcealed(value: number) {

        this.pageData.product.laminationMediumThroughWage = value;

        this.helper.calcLaminationUnitPrice();
    }

    set laminationBackBasicWeight(value: number) {

        this.pageData.highlightedTracker.touch('laminationBackBasicWeight');
        this.setLaminationBackBasicWeightConcealned(value);

    }

    get laminationBackThroughWage(): number {
        return FormatUtil.isNaN(this.pageData.product.laminationBackThroughWage);
    }

    set laminationBackThroughWage(value: number) {
        this.setLaminationBackThroughWageConcealed(value);

    }

    get laminationNumber(): number {
        this.pageData.product.laminationNumber = MathUtil.checkNaN(this.pageData.product.laminationNumber);
        return this.pageData.product.laminationNumber;
    }

    set laminationNumber(value: number) {

        this.pageData.highlightedTracker.touch('laminationNumber');
        this.pageData.product.laminationNumber = value;

        this.helper.calcLaminationSheetCost();

    }

    get laminationWidth(): number {
        this.pageData.product.laminationWidth = MathUtil.checkNaN(this.pageData.product.laminationWidth);
        return this.pageData.product.laminationWidth;
    }

    set laminationWidth(value: number) {
        this.pageData.highlightedTracker.touch('laminationWidth');
        this.pageData.product.laminationWidth = value;

        this.helper.calcLaminationSheetCost();

    }

    get laminationCuttingFlow(): number {
        this.pageData.product.laminationCuttingFlow = MathUtil.checkNaN(this.pageData.product.laminationCuttingFlow);
        return this.pageData.product.laminationCuttingFlow;
    }

    set laminationCuttingFlow(value: number) {
        this.pageData.highlightedTracker.touch('laminationCuttingFlow');
        this.pageData.product.laminationCuttingFlow = value;

        this.helper.calcLaminationSheetCost();

    }

    get laminationPaperTypeBack(): number {
        if (this.pageData.product.id && this.pageData.product.laminationPaperTypeBack == TYPE_BACK) {
            this._laminationWeightBackOption = this.pageData.product.laminationPaperTypeBack;
            return this.pageData.product.laminationPaperTypeBack;
        }

        if (this.pageData.product.laminationPaperTypeBack != undefined) {
            this._laminationWeightBackOption = this.pageData.mstData.mstLamination[this.pageData.product.laminationPaperTypeBack];
            return this.pageData.product.laminationPaperTypeBack;
        }
        this.pageData.product.laminationPaperTypeBack = 0;
        return 0;
    }

    set laminationPaperTypeBack(value: number) {
        if (value == 8) {
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

        if (value != 8 && value != 0) {
            this._laminationWeightBackOption = this.pageData.mstData.mstLamination[value];
            if (!isNullOrUndefined(this._laminationWeightBackOption)) {
                this.setLaminationBackBasicWeightConcealned(+Object.keys(this._laminationWeightBackOption)[0]);
            } else {
                this.setLaminationBackBasicWeightConcealned(0);
                this.setLaminationBackThroughWageConcealed(0);
            }
        } else {
            this.setLaminationBackBasicWeightConcealned(0);
            this.setLaminationBackThroughWageConcealed(0);
        }
    }


    get laminationWeightBackOption(): any {
        if (this._laminationWeightBackOption != undefined) {
            //TODO: hard code to display only one data
            if (this.pageData.product.laminationPaperTypeBack == TYPE_BACK) {
                let result = [];
                result.push(this.pageData.product.laminationBackBasicWeight);
                return result;
            } else if (this.pageData.product.laminationPaperTypeBack == 4) {
                return Object.keys(this._laminationWeightBackOption).splice(0, 4);
            } else if (this.pageData.product.laminationPaperTypeBack == 5) {
                return Object.keys(this._laminationWeightBackOption).splice(0, 2);
            } else {
                return Object.keys(this._laminationWeightBackOption);
            }
        }
        let result = [];
        result.push(0);
        return result;
    }

    get laminationPaperTypeMedium(): number {
        if (this.pageData.product.id && this.pageData.product.laminationPaperTypeMedium == TYPE_MEDIUM) {
            this._laminationWeightMediumOption = this.pageData.product.laminationPaperTypeMedium;

            return this.pageData.product.laminationPaperTypeMedium;
        }

        if (this.pageData.product.laminationPaperTypeMedium != undefined) {
            this._laminationWeightMediumOption = this.pageData.mstData.mstLamination[this.pageData.product.laminationPaperTypeMedium];
            return this.pageData.product.laminationPaperTypeMedium;
        }
        this.pageData.product.laminationPaperTypeMedium = 0;
        return 0;
    }

    set laminationPaperTypeMedium(value: number) {
        if (value == 8) {
            this.inputPaperOption = PAPER_3;
            this.idSelectedTmp = DataUtil.cloneObject(this.pageData.product).laminationPaperTypeMedium;
            this.modalShow();
        } else {
            this.pageData.highlightedTracker.touch('laminationMediumBasicWeight');
            this.setLaminationPaperTypeMediumConcealed(value);
        }
    }


    setLaminationPaperTypeMediumConcealed(value: number) {

        this.pageData.product.laminationPaperTypeMedium = value;

        if (value != 8 && value != 0) {
            this._laminationWeightMediumOption = this.pageData.mstData.mstLamination[value];
            if(!isNullOrUndefined(this._laminationWeightMediumOption)) {
                this.setLaminationMediumBasicWeightConcealed(+Object.keys(this._laminationWeightMediumOption)[0]);
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
            if (this.pageData.product.laminationPaperTypeMedium== TYPE_MEDIUM) {
                let result = [];
                result.push(this.pageData.product.laminationMediumBasicWeight);
                return result;
            } else if (this.pageData.product.laminationPaperTypeMedium == 4) {
                return Object.keys(this._laminationWeightMediumOption).splice(0, 4);
            } else if (this.pageData.product.laminationPaperTypeMedium == 5) {
                return Object.keys(this._laminationWeightMediumOption).splice(0, 2);
            } else {
                return Object.keys(this._laminationWeightMediumOption);
            }
        }
        let result = [];
        result.push(0);
        return result;
    }

    //3007
    laminationFluteOption = DataUtil.toSelectBoxDataSource(PAPER_LAMINATION_FLUTE);

    laminationFirstOption = DataUtil.toSelectBoxDataSource(PAPER_LAMINATION_FIRST_OPTION);

    laminationSecondOption = DataUtil.toSelectBoxDataSource(PAPER_LAMINATION_SECOND_OPTION);

    // TODO:start http://fridaynight.vnext.vn/issues/2408
    setPaperModalResult(paperModel: PaperModel) {


        //1. set option input
        paperModel.optionId = this.inputPaperOption;
        paperModel.factoryId = this.pageData.product.factoryId;

        // input list paper new
        if(!!paperModel.paperId && !paperModel.isNew){
            switch (this.inputPaperOption) {
                //表中芯（g/㎡）
                case PAPER_3:
                    this.laminationPaperTypeMedium = paperModel.paperId;
                    this.laminationMediumBasicWeight = paperModel.basicWeight;
                    break;
                //裏ライナ （g/㎡）
                case PAPER_5:
                    this.laminationPaperTypeBack = paperModel.paperId;
                    this.laminationBackBasicWeight = paperModel.basicWeight;
                    break;
                default:
                    break;
            }
        }else{
            this.addNewPaper(paperModel);

            //2 check input option
            switch (this.inputPaperOption) {
                //表中芯（g/㎡）
                case PAPER_3:
                    // get data tmp
                    this.pageData.paperTmp3 = paperModel;
                    this.pageData.product.laminationMediumId = paperModel.id;
                    this.pageData.product.laminationPaperTypeMedium = TYPE_MEDIUM;
                    this.setLaminationMediumBasicWeightConcealed(paperModel.basicWeight);
                    this.setLaminationMediumThroughWageConcealed(paperModel.normValue);
                    this.pageData.addPaperModel(paperModel,TYPE_MEDIUM);
                    break;
                //裏ライナ （g/㎡）
                case PAPER_5:
                    // get data tmp
                    this.pageData.paperTmp5 = paperModel;
                    this.pageData.product.laminationBackId = paperModel.id;
                    this.pageData.product.laminationPaperTypeBack = TYPE_BACK;
                    this.setLaminationBackBasicWeightConcealned(paperModel.basicWeight);
                    this.setLaminationBackThroughWageConcealed(paperModel.normValue);
                    this.pageData.addPaperModel(paperModel,TYPE_BACK);
                    break;
                default:
                    break;
            }
        }

        //2 hide modal
        this.modalHide();

        //3.set highlightedTracker
        switch (this.inputPaperOption) {
            //表中芯（g/㎡）
            case PAPER_3:
                // Dong thoi neu da chon thi phai xu ly phan highlightedTracker.touch
                this.pageData.highlightedTracker.touch('laminationMediumBasicWeight');
                break;
            //裏ライナ （g/㎡）
            case PAPER_5:
                // Dong thoi neu da chon thi phai xu ly phan highlightedTracker.touch
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

        $("#paperModal_2").modal('show');
        $('.modal-body').css('overflow-y', 'auto');
        $('.modal-body').css('max-height', $(window).height() * 0.86);
    }

    modalHide() {
        $("#paperModal_2").modal('hide');
    }

    closedModal() {
        switch (this.inputPaperOption) {
            //中芯（g/㎡）
            case PAPER_3:
                this.pageData.product.laminationPaperTypeMedium = this.idSelectedTmp;
                break;
            //裏ライナ （g/㎡）
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
        let papers: PaperModel[]              = this.pageData.mstLaminations;

        //1. role admin map normValue
        if (this.pageData.product.paperHeadApprovalFlag == 1) {
            papers = this.pageData.mstLaminationsHeader;
        }

        //2. filter data by factoryId
        this.pageData.mstPapersBackgroundTab1 = papers.filter(item => {
            // nếu paperId != null -> by theo factoryId và createdUser
            if(!!!item.paperId){
                return item.createdUser == BATCH_USER && item.hiddenFlag != 1;
            }
            // else sẽ hiển thị cả
            else{
                return item.hiddenFlag != 1;
            }
        }).map(item => {
            let paper = DataUtil.cloneObject(item);
            return paper;
        });

        // update status selectbox
        switch (this.inputPaperOption) {
            //中芯（g/㎡）
            case PAPER_3:
                this.pageData.product.laminationPaperTypeMedium = 8;
                break;
            //裏ライナ （g/㎡）
            case PAPER_5:
                this.pageData.product.laminationPaperTypeBack = 8;
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
    initDataMst(){
        if (this.pageData.product.id ) {
            if (this.pageData.product.laminationPaperTypeMedium == TYPE_MEDIUM) {
                let paperModel = this.pageData.mstLaminations.find(item => {
                    return item.id == this.pageData.product.laminationMediumId;
                });
                if(!!paperModel){
                    this.pageData.paperTmp3.paperName = paperModel.paperName;
                    this.pageData.addPaperModel(paperModel, TYPE_MEDIUM);
                }
            }

            if (this.pageData.product.laminationPaperTypeBack == TYPE_BACK) {
                let paperModel = this.pageData.mstLaminations.find(item => {
                    return item.id == this.pageData.product.laminationBackId;
                });
                if(!!paperModel){
                    this.pageData.paperTmp5.paperName = paperModel.paperName;
                    this.pageData.addPaperModel(paperModel, TYPE_BACK);
                }
            }
        }

    }
    // TODO:end http://fridaynight.vnext.vn/issues/2408
}
