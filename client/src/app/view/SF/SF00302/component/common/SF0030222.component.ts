/**
 * Created by hoangtd on 4/21/2017.
 */
import {Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";
import {PaperModel} from "../../model/paper.model";
import {SF0030222Helper} from "./SF0030222.helper";
import {FormatUtil} from "../../../../../util/format-util";
import DataUtil from "../../../../../util/data-util";
import UnicodeUtil from "../../../../../util/unicode-util";

declare let $: any;
declare let App: any;
const PAGE_SIZE: number = 50;
@Component({
    selector: '[paper-modal]',
    templateUrl: 'SF0030222.component.html',
    styleUrls: ['SF0030222.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class SF0030222Component {
    @Input() helper: SF0030222Helper;
    @Input() tags: string[];
    @Input() set mstPapersBackground(value: PaperModel[]) {
        this.papersSearch = value;
        this.dataPaging   = this.papersSearch.slice(0, PAGE_SIZE);
    }

    @Input() set mstPapersBackgroundTab2(value: PaperModel[]) {
        this.papersSearchTab2 = value;
        this.dataPagingTab2   = this.papersSearchTab2.slice(0, PAGE_SIZE);
    }

    @Output() emitClosed: EventEmitter<any>     = new EventEmitter<any>();
    @Output() emitSubmitData: EventEmitter<any> = new EventEmitter<any>();

    tabNumber: number = 1;
    // tab1
    papersSearch: PaperModel[];
    dataPaging: PaperModel[];
    pageIndex: number = 1;
    paperModelTmp: PaperModel;

    //tab2
    papersSearchTab2: PaperModel[];
    pageIndexTab2: number = 1;
    dataPagingTab2: PaperModel[];
    paperModelTmpTab2: PaperModel;

    constructor() {
        this.createListData();
    }

    get pageData() {
        return this.helper.getSF00302Data();
    }

    //1.cancel
    closeModal() {
        //create data tags;
        this.tags                    = [];
        //remove class active
        this.pageData.indexPaperTab1 = null;
        //reset list data;
        this.resetListData();
        // reset tab
        this.tabNumber = 1;
        //emit closed
        this.emitClosed.emit();
    }

    //2. click row event emit value to SF00206
    submitData() {
        if (!this.isSubmit)
            return;
        //remove class active
        this.pageData.indexPaperTab1 = null;
        //check paperNew
        let paperModelTmp            = new PaperModel();
        if(this.tabNumber ==1){
            paperModelTmp = this.paperModelTmp;
        }else{
            paperModelTmp = this.paperModelTmpTab2;
        }
        let paperModel = this.pageData.paperModel;
        // check product is new
        if (paperModelTmp.paperName == paperModel.paperName
            && paperModelTmp.basicWeight == paperModel.basicWeight
            && paperModelTmp.normValue == paperModel.normValue) {
            paperModel.isNew = false;
        } else {
            paperModel.isNew = true;
        }
        // check clone paper
        if (paperModelTmp.paperName == paperModel.paperName
            && paperModelTmp.basicWeight == paperModel.basicWeight
            && paperModelTmp.normValue != paperModel.normValue) {
            paperModel.isPaperClone = 1;
        } else {
            paperModel.isPaperClone = 0;
        }
        // reset tab
        this.tabNumber = 1;
        //submit data paperModal
        this.emitSubmitData.emit(paperModel);
        //reset list data;
        this.resetListData();
    }

    //3. apply filter search list key
    onKeywordsChange(tags: string[]) {
        // search tab 1
        this.tags = tags;
        if (this.tabNumber == 1) {
            // reset index
            this.pageData.indexPaperTab1 = null;
            //
            this.papersSearch            = [];
            this.dataPaging              = [];
            // check key search
            if (tags.length > 0) {
                this.papersSearch = this.getPaperSearch(this.pageData.mstPapersBackgroundTab1, tags);
                this.dataPaging = this.papersSearch.slice(0, PAGE_SIZE);
            } else {
                this.papersSearch = this.pageData.mstPapersBackgroundTab1;
                this.dataPaging   = this.papersSearch.slice(0, PAGE_SIZE);
            }
        } else {
            // reset index
            this.pageData.indexPaperTab2 = null;
            //
            this.papersSearchTab2        = [];
            this.dataPagingTab2          = [];
            // check key search
            if (tags.length > 0) {
                this.papersSearchTab2 = this.getPaperSearch(this.pageData.mstPapersBackgroundTab2, tags);
                this.dataPagingTab2 = this.papersSearchTab2.slice(0, PAGE_SIZE);
            } else {
                this.papersSearchTab2 = this.pageData.mstPapersBackgroundTab2;
                this.dataPagingTab2   = this.papersSearchTab2.slice(0, PAGE_SIZE);
            }
        }

        // reset value
        this.pageData.paperModel = new PaperModel();
    }

    getPaperSearch(targetDdata: PaperModel[], tags: string[]): PaperModel[] {
        var res = [];
        // search by paperName or NormValue or basicWeight
        targetDdata.map(item => {
            // 'and' search
            if (item.paperName) {
                let upperItemNameHan = UnicodeUtil.convertKanaF2H(item.paperName.toUpperCase());
                let upperItemNameFull = UnicodeUtil.toFullWidth(item.paperName.toUpperCase());
                let hit_count = 0, tag_length = tags.length;
                for (let i = 0; i < tag_length; i++) {
                    let tagHan = UnicodeUtil.convertKanaF2H(tags[i].toUpperCase());
                    let tagFull = UnicodeUtil.toFullWidth(tags[i].toUpperCase());
                    if (upperItemNameHan.indexOf(tagHan) >= 0 || upperItemNameFull.indexOf(tagFull) >= 0) {
                        hit_count++;
                    }
                }
                if (hit_count >= tag_length) {
                    res.push(item);
                }
            }
        })

        return res;
    }

    //4. get record
    get record(): number {
        if(this.tabNumber ==1){
            return this.papersSearch.length;
        }else{
            return this.papersSearchTab2.length;
        }
    }

    get checkShowTab2():boolean{
        return this.pageData.showModal2903;
    }


    //5. set active row click
    changeDataRow(index: number) {
        // reset model
        this.pageData.paperModel = new PaperModel();
        if (this.tabNumber == 1) {
            this.pageData.paperModel     = DataUtil.cloneObject(this.dataPaging[index]);
            // set paperModelTmp
            this.paperModelTmp           = DataUtil.cloneObject(this.dataPaging[index]);
            // indexPaper
            this.pageData.indexPaperTab1 = index;
        } else {
            this.pageData.paperModel = DataUtil.cloneObject(this.dataPagingTab2[index]);
            // set paperModelTmp
            this.paperModelTmpTab2   = DataUtil.cloneObject(this.dataPagingTab2[index]);
            // indexPaper
            this.pageData.indexPaperTab2 = index;
        }
    }

    //6. paging by index
    onPageChanged(pageIndex?: number): void {
        //tab1
        if (this.tabNumber == 1) {
            //page index
            this.pageIndex               = pageIndex;
            //reset forcus index
            this.pageData.indexPaperTab1 = null;
            //image loading
            App.loader('show');
            this.dataPaging = [];
            let page        = PAGE_SIZE * (pageIndex - 1);
            this.dataPaging = this.papersSearch.slice(page, page + PAGE_SIZE);
            App.loader('hide');
        }
        //tab2
        else {
            //page index
            this.pageIndexTab2           = pageIndex;
            //reset forcus index
            this.pageData.indexPaperTab2 = null;
            //image loading
            App.loader('show');
            this.dataPagingTab2 = [];
            let page            = PAGE_SIZE * (pageIndex - 1);
            this.dataPagingTab2 = this.papersSearchTab2.slice(page, page + PAGE_SIZE);
            App.loader('hide');
        }
        // scoll top
        $('.table-fixed tbody').scrollTop(0);
    }

    changeTab(value: number) {
        this.tabNumber = value;
        // reset search
        this.tags      = [];
        // update list
        this.resetListData();
        if (value == 1) {
            this.pageData.indexPaperTab1 = null;
        } else {
            this.pageData.indexPaperTab2 = null;
        }
    }

    get pageSize(): number {
        return PAGE_SIZE;
    }

    get paperNormValueDisplay() {
        if (this.pageData.paperModel != undefined) {
            return this.pageData.paperModel.normValue;
        }
    }

    set paperNormValueDisplay(value: number) {
        this.pageData.paperModel.normValue = value;
    }

    get paperWeightDisplay() {
        if (this.pageData.paperModel != undefined) {
            return this.pageData.paperModel.basicWeight;
        }
    }

    set paperWeightDisplay(value: number) {
        this.pageData.paperModel.basicWeight = value;
    }


    get paperNameDisplay() {
        if (this.pageData.paperModel != undefined) {
            return this.pageData.paperModel.paperName;
        }
    }

    set paperNameDisplay(value: string) {
        this.pageData.paperModel.paperName = value;
    }

    // reset list item when closed modal and save modal
    resetListData() {
        this.createListData();
        //tab1
        this.papersSearch     = this.pageData.mstPapersBackgroundTab1;
        this.dataPaging       = this.papersSearch.slice(0, PAGE_SIZE);
        //tab2
        this.papersSearchTab2 = this.pageData.mstPapersBackgroundTab2;
        this.dataPagingTab2   = this.papersSearchTab2.slice(0, PAGE_SIZE);
    }

    // create and reset list
    createListData() {
        //reset tags
        this.tags             = [];
        //tab1
        this.pageIndex        = 1;
        this.papersSearch     = [];
        this.dataPaging       = [];
        //tab2
        this.pageIndexTab2    = 1;
        this.papersSearchTab2 = [];
        this.dataPagingTab2   = [];
        // fix undefined when input data paper new
        this.paperModelTmp = new PaperModel();
        this.paperModelTmpTab2 = new PaperModel();
    }

    // check validate data
    get isSubmit(): boolean {
        // check value is submit ok
        if (FormatUtil.isNaN(this.pageData.paperModel.normValue) > 0
            && this.pageData.paperModel.paperName != undefined
            && this.pageData.paperModel.paperName.trim() != ""
            && FormatUtil.isNaN(this.pageData.paperModel.basicWeight) > 0)
            return true;
        return false;
    }

}
