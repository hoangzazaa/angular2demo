import {Component, Input, Output, EventEmitter} from "@angular/core";
import {SF00308Data} from "../SF00308.data";
import {FormatUtil} from "../../../../util/format-util";
import {SELECT_2001} from "../../../../helper/mst-data-type";
import DataUtil from "../../../../util/data-util";
import { Constants } from "../../../../helper/constants";
import { SF00308CheckSheet } from "../model/SF00308_CheckSheet.model";

/** バーコード: JAN */
type QuestionCodeBarcodeJan = 2061;
/** バーコード: JAN */
const QUESTION_CODE_BARCODE_JAN: QuestionCodeBarcodeJan = 2061;
/** バーコード: ITF */
type QuestionCodeBarcodeItf = 2062;
/** バーコード: ITF */
const QUESTION_CODE_BARCODE_ITF:QuestionCodeBarcodeItf = 2062;
/** バーコード: GTIN */
type QuestionCodeBarcodeGtin = 2063;
/** バーコード: GTIN */
const QUESTION_CODE_BARCODE_GTIN: QuestionCodeBarcodeGtin = 2063;
/** バーコード: UPC */
type QuestionCodeBarcodeUpc = 2064;
/** バーコード: UPC */
const QUESTION_CODE_BARCODE_UPC: QuestionCodeBarcodeUpc = 2064;
/** バーコード: その他 */
type QuestionCodeBarcodeOther = 2065;
/** バーコード: その他 */
const QUESTION_CODE_BARCODE_OTHER: QuestionCodeBarcodeOther = 2065;

/** バーコード質問コード型 */
type QuestionCodeBarcode = QuestionCodeBarcodeJan | QuestionCodeBarcodeItf | QuestionCodeBarcodeGtin | QuestionCodeBarcodeUpc | QuestionCodeBarcodeOther;
/** バーコード質問コードの配列 */
const QUESTION_CODE_LIST_BARCODE: QuestionCodeBarcode[]
    = [
        QUESTION_CODE_BARCODE_JAN,
        QUESTION_CODE_BARCODE_ITF,
        QUESTION_CODE_BARCODE_GTIN,
        QUESTION_CODE_BARCODE_UPC,
        QUESTION_CODE_BARCODE_OTHER
    ];


/**
 * Created by hoangtd on 3/16/2017.
 */
@Component({
    selector: 'div[sf0030802]',
    templateUrl: 'SF0030802.component.html'
})
export class SF0030802Component {
    @Input() pageData: SF00308Data;
    @Output() emitCancel: EventEmitter<any> = new EventEmitter();
    @Output() emitSave: EventEmitter<any> = new EventEmitter();

    cancelTab2() {
        this.emitCancel.emit();
    }

    saveTab2() {
        this.emitSave.emit(this.pageData.TAB_2);
    }

    mstSelect2001 = DataUtil.toSelectBoxDataSource(SELECT_2001);

    get question2001_Select(): number {
        let question = this.pageData.answerMap(2001);
        return question.selectBox1;
    }

    set question2001_Select(value: number) {
        let question = this.pageData.answerMap(2001);
        question.selectBox1 = value;
    }

    get question2002_Radio(): number {
        let question = this.pageData.answerMap(2002);
        return question.radioButton;
    }

    _question2002_Radio(value: number) {
        let question = this.pageData.answerMap(2002);
        question.radioButton = value;
    }

    get question2003_Radio(): number {
        let question = this.pageData.answerMap(2003);
        return question.radioButton;
    }

    _question2003_Radio(value: number) {
        let question = this.pageData.answerMap(2003);
        question.radioButton = value;
    }

    get question2004_Radio(): number {
        let question = this.pageData.answerMap(2004);
        return question.radioButton;
    }

    _question2004_Radio(value: number) {
        let question = this.pageData.answerMap(2004);
        if (value == 2) {
            question.textArea1 = '';
        }
        question.radioButton = value;
    }

    get question2004_Text(): string {
        let question = this.pageData.answerMap(2004);
        return question.textArea1;
    }

    set question2004_Text(value: string) {
        let question = this.pageData.answerMap(2004);
        question.textArea1 = value;
    }

    get question2005_Radio(): number {
        let question = this.pageData.answerMap(2005);
        return question.radioButton;
    }

    _question2005_Radio(value: number) {
        let question = this.pageData.answerMap(2005);
        question.radioButton = value;
    }

    get question2006_Checkbox(): number {
        let question = this.pageData.answerMap(2006);

        return FormatUtil.convertDataCheckBox(question.checkBox1);
    }

    set question2006_Checkbox(value: number) {
        let question = this.pageData.answerMap(2006);
        question.checkBox1 = FormatUtil.convertDataCheckBox(value);
    }

    get question20061_Text(): string {
        let question = this.pageData.answerMap(2061);
        return question.textArea1;
    }

    set question20061_Text(value: string) {
        let question = this.pageData.answerMap(2061);
        question.textArea1 = value;
    }

    get question20061_TextBorderStyle() {
        return this.get_question2006_style(2061);
    }

    get question20061_Checkbox(): number {
        let question = this.pageData.answerMap(2061);
        return FormatUtil.convertDataCheckBox(question.checkBox1);
    }

    set question20061_Checkbox(value: number) {
        let question = this.pageData.answerMap(2061);
        question.checkBox1 = FormatUtil.convertDataCheckBox(value);
        if (question.checkBox1 == 0) {
            question.textArea1 = ''
        }
    }

    get question20062_Text(): string {
        let question = this.pageData.answerMap(2062);
        return question.textArea1;
    }

    set question20062_Text(value: string) {
        let question = this.pageData.answerMap(2062);
        question.textArea1 = value;
    }

    get question20062_TextBorderStyle() {
        return this.get_question2006_style(2062);
    }

    get question20062_Checkbox(): number {
        let question = this.pageData.answerMap(2062);
        return FormatUtil.convertDataCheckBox(question.checkBox1);
    }

    set question20062_Checkbox(value: number) {
        let question = this.pageData.answerMap(2062);
        question.checkBox1 = FormatUtil.convertDataCheckBox(value);
        if (question.checkBox1 == 0) {
            question.textArea1 = ''
        }
    }

    get question20063_Text(): string {
        let question = this.pageData.answerMap(2063);
        return question.textArea1;
    }

    set question20063_Text(value: string) {
        let question = this.pageData.answerMap(2063);
        question.textArea1 = value;
    }

    get question20063_TextBorderStyle() {
        return this.get_question2006_style(2063);
    }

    get question20063_Checkbox(): number {
        let question = this.pageData.answerMap(2063);
        return FormatUtil.convertDataCheckBox(question.checkBox1);
    }

    set question20063_Checkbox(value: number) {
        let question = this.pageData.answerMap(2063);
        question.checkBox1 = FormatUtil.convertDataCheckBox(value);
        if (question.checkBox1 == 0) {
            question.textArea1 = ''
        }
    }

    get question20064_Text(): string {
        let question = this.pageData.answerMap(2064);
        return question.textArea1;
    }

    set question20064_Text(value: string) {
        let question = this.pageData.answerMap(2064);
        question.textArea1 = value;
    }

    get question20064_TextBorderStyle() {
        return this.get_question2006_style(2064);
    }

    get question20064_Checkbox(): number {
        let question = this.pageData.answerMap(2064);
        return FormatUtil.convertDataCheckBox(question.checkBox1);
    }

    set question20064_Checkbox(value: number) {
        let question = this.pageData.answerMap(2064);
        question.checkBox1 = FormatUtil.convertDataCheckBox(value);
        if (question.checkBox1 == 0) {
            question.textArea1 = ''
        }
    }


    /** @return バーコードその他の入力値 */
    get question20065_Text(): string {
        let question = this.pageData.answerMap(2065);
        return question.textArea1;
    }

    /** @param value バーコードその他の入力値 */
    set question20065_Text(value: string) {
        let question = this.pageData.answerMap(2065);
        question.textArea1 = value;
    }

    /** @return バーコードその他のボーダースタイル */
    get question20065_TextBorderStyle() {
        return this.get_question2006_style(2065);
    }

    /** @return バーコードその他のチェックボックス */
    get question20065_Checkbox(): number {
        let question = this.pageData.answerMap(2065);
        return FormatUtil.convertDataCheckBox(question.checkBox1);
    }

    /** @param value バーコードその他のチェックボックス */
    set question20065_Checkbox(value: number) {
        let question = this.pageData.answerMap(2065);
        question.checkBox1 = FormatUtil.convertDataCheckBox(value);
        if (question.checkBox1 == 0) {
            question.textArea1 = ''
        }
    }

    get_question2006_style(value: number): String {
        let question = this.pageData.answerMap(value);
        if (question.checkBox1 == 1 && (question.textArea1 == undefined || question.textArea1 == null || question.textArea1 =="" )) {
            // return "solid 2px #FF0000";
            return 'solid 2px #5c90d2';
        }
        return "";
    }

    /**
     * バーコードのチェックボックスを無効化するかどうか判定する
     *
     * @param questionCode 質問コード
     * @returns true: 無効, false: 有効
     */
    checkboxBarcodeDisabled(questionCode: QuestionCodeBarcode): boolean {
        // 表示モード時は常に disable
        if (this.pageData.isView) {
            return false;
        }

        // チェックが入っている or 値が入力されていれば常に有効
        let question = this.pageData.answerMap(questionCode);
        if (hasBarcodeValue(question)) {
            return false;
        }

        // 既に 3 項目入力されていれば無効
        let barcodeCounts = 0;
        for (let code of QUESTION_CODE_LIST_BARCODE) {
            if (code != questionCode && hasBarcodeValue(this.pageData.answerMap(code))) {
                ++barcodeCounts;
            }
        }
        return barcodeCounts >= 3;
    }

    get question2007_Text01(): string {
        let question = this.pageData.answerMap(2007);
        return question.textArea1;
    }

    set question2007_Text01(value: string) {
        let question = this.pageData.answerMap(2007);
        question.textArea1 = value;
    }

    get question2007_Text02(): string {
        let question = this.pageData.answerMap(2007);
        return question.textArea2;

    }

    set question2007_Text02(value: string) {
        let question = this.pageData.answerMap(2007);
        question.textArea2 = value;
    }

    get question2008_Radio(): number {
        let question = this.pageData.answerMap(2008);
        return question.radioButton;

    }

    _question2008_Radio(value: number) {
        let question = this.pageData.answerMap(2008);
        question.radioButton = value;
    }

    get question2009_Radio(): number {
        let question = this.pageData.answerMap(2009);
        return question.radioButton;
    }

    _question2009_Radio(value: number) {
        let question = this.pageData.answerMap(2009);
        question.radioButton = value;
    }

    get question2010_Text(): string {
        let question = this.pageData.answerMap(2010);
        return question.textArea1;
    }

    set question2010_Text(value: string) {
        let question = this.pageData.answerMap(2010);
        question.textArea1 = value;
    }

    checkInput(evt) {
        if (evt.which == 45) {
            evt.preventDefault();
            return;
        }
    }

}

/**
 * チェックシートバーコード欄に値が入っているかどうか判定する
 *
 * @param question チェックシートバーコード欄
 * @returns true: 入力されている, false: 入力されていない
 */
function hasBarcodeValue(question: SF00308CheckSheet): boolean {
    return !!(question.checkBox1 || (question.textArea1 && question.textArea1.length));
}
