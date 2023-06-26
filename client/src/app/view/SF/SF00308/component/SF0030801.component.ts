import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SF00308Data} from "../SF00308.data";
import {FormatUtil} from "../../../../util/format-util";
import {
    DISTANCE,
    SELECT_1008_1,
    SELECT_1008_2,
    SELECT_1008_3,
    SELECT_1010,
    SELECT_1011_1,
    SELECT_1011_2
} from "../../../../helper/mst-data-type";
import DataUtil from "../../../../util/data-util";
/**
 * Created by hoangtd on 3/16/2017.
 */
@Component({
    selector   : 'div[sf0030801]',
    templateUrl: 'SF0030801.component.html',
})

export class SF0030801Component {
    @Input() pageData: SF00308Data;
    @Output() emitCancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() emitSave: EventEmitter<any>   = new EventEmitter<any>();

    cancelTab1() {
        this.emitCancel.emit();
    }

    saveTab1() {
        // emit save data tab number
        this.emitSave.emit(this.pageData.TAB_1);
    }

    mstDistances = DataUtil.toSelectBoxDataSource(DISTANCE);

    mstSelect1008_1 = DataUtil.toSelectBoxDataSource(SELECT_1008_1);

    mstSelect1008_2 = DataUtil.toSelectBoxDataSource(SELECT_1008_2);

    mstSelect1008_3 = DataUtil.toSelectBoxDataSource(SELECT_1008_3);

    mstSelect1010 = DataUtil.toSelectBoxDataSource(SELECT_1010);

    mstSelect1011_1 = DataUtil.toSelectBoxDataSource(SELECT_1011_1);

    mstSelect1011_2 = DataUtil.toSelectBoxDataSource(SELECT_1011_2);
    get question1001_Radio(): number {
        let question = this.pageData.answerMap(1001);
        return question.radioButton;
    }

    _question1001_Radio(value: number) {
        let question         = this.pageData.answerMap(1001);
        question.radioButton = value;
    }

    get question1002_Radio(): number {
        let question = this.pageData.answerMap(1002);
        return question.radioButton;
    }

    _question1002_Radio(value: number) {
        let question = this.pageData.answerMap(1002);
        if (value === 1) {
            question.textArea1 = '';
        }
        question.radioButton = value;
    }

    get question1002_Text(): string {
        let question = this.pageData.answerMap(1002);
        return question.textArea1;
    }

    set question1002_Text(value: string) {
        let question       = this.pageData.answerMap(1002);
        question.textArea1 = value;
    }

    get question1003_Radio(): number {
        let question = this.pageData.answerMap(1003);
        return question.radioButton;
    }

    _question1003_Radio(value: number) {
        let question         = this.pageData.answerMap(1003);
        question.radioButton = value;

    }

    get question1004_Text1(): string {
        let question = this.pageData.answerMap(1004);
        return question.textArea1;
    }

    set question1004_Text1(value: string) {
        let question       = this.pageData.answerMap(1004);
        question.textArea1 = value;
    }

    get question1004_Text2(): string {
        let question = this.pageData.answerMap(1004);
        return question.textArea2;
    }

    set question1004_Text2(value: string) {
        let question       = this.pageData.answerMap(1004);
        question.textArea2 = value;
    }

    get question1005_Radio(): number {
        let question = this.pageData.answerMap(1005);
        return question.radioButton;
    }

    _question1005_Radio(value: number) {
        let question         = this.pageData.answerMap(1005);
        question.radioButton = value;
    }

    get question1005_Select(): number {
        let question = this.pageData.answerMap(1005);
        return question.selectBox1;
    }

    set question1005_Select(value: number) {
        let question        = this.pageData.answerMap(1005);
        question.selectBox1 = value;
    }

    get question1006_Text1(): Date {
        let question = this.pageData.answerMap(1006);
        if (question.textArea1) {
            return new Date(question.textArea1);
        }
        return null;
    }

    _question1006_Text1_Date(value) {
        let question       = this.pageData.answerMap(1006);
        question.textArea1 = value;
    }

    get question1006_Text2(): Date {
        let question = this.pageData.answerMap(1006);
        if (question.textArea2) {
            return new Date(question.textArea2);
        }
        return null;
    }

    _question1006_Text2_Date(value) {
        let question       = this.pageData.answerMap(1006);
        question.textArea2 = value;
    }

    get question1007_Text(): number {
        let question = this.pageData.answerMap(1007);
        return FormatUtil.isNaN(parseInt(question.textArea1));
    }

    set question1007_Text(value: number) {
        let question       = this.pageData.answerMap(1007);
        question.textArea1 = value + '';
    }

    get question1008_Select1(): number {
        let question = this.pageData.answerMap(1008);
        if (question.selectBox1 == null || question.selectBox1 == undefined) {
            // set default is x/x
            question.selectBox1 = 4;
        }
        return question.selectBox1;
    }

    set question1008_Select1(value: number) {
        let question        = this.pageData.answerMap(1008);
        question.selectBox1 = value;
    }

    get question1008_Number(): number {
        let question = this.pageData.answerMap(1008);
        if(!question.textArea1)
            question.textArea1 = '0';
        return FormatUtil.isNaN(parseInt(question.textArea1));
    }

    set question1008_Number(value: number) {
        let question       = this.pageData.answerMap(1008);
        let numberLimit: number = value;
        if(!numberLimit || numberLimit == undefined) numberLimit = 0;
        question.textArea1 = numberLimit + '';
    }

    get question1008_Select2(): number {
        //http://fridaynight.vnext.vn/issues/1635
        let question = this.pageData.answerMap(1008);
        if (!question.selectBox2)
            question.selectBox2 = 0;
        return question.selectBox2;
    }

    set question1008_Select2(value: number) {
        let question        = this.pageData.answerMap(1008);
        question.selectBox2 = value;
    }

    get question1008_Select3(): number {
        let question = this.pageData.answerMap(1008);
        return question.selectBox3;
    }

    set question1008_Select3(value: number) {
        let question        = this.pageData.answerMap(1008);
        question.selectBox3 = value;
    }

    get question1009_Number(): number {
        let question = this.pageData.answerMap(1009);
        return FormatUtil.isNaN(parseInt(question.textArea1));
    }

    set question1009_Number(value: number) {
        let question       = this.pageData.answerMap(1009);
        question.textArea1 = value + '';
    }

    get question1009_Date(): Date {
        let question = this.pageData.answerMap(1009);
        if (question.textArea2) {
            return new Date(question.textArea2);
        }
        return null;
    }

    get defaultQuestion1009_Date(): Date {
        return this.pageData.defaultQuestion1009_Date;
    }

    _question1009_Date(value) {
        let question       = this.pageData.answerMap(1009);
        question.textArea2 = value;
    }

    get question1010_Select(): number {
        let question = this.pageData.answerMap(1010);
        return question.selectBox1;
    }

    set question1010_Select(value: number) {
        let question        = this.pageData.answerMap(1010);
        question.selectBox1 = value;
    }

    get question1011_Select1(): number {
        let question = this.pageData.answerMap(1011);
        return question.selectBox1;
    }

    set question1011_Select1(value: number) {
        let question        = this.pageData.answerMap(1011);
        question.selectBox1 = value;
    }

    get question1011_Radio(): number {
        let question = this.pageData.answerMap(1011);
        return question.radioButton;
    }

    _question1011_Radio(value: number) {
        let question         = this.pageData.answerMap(1011);
        question.radioButton = value;
    }

    get question1011_Select3(): number {
        let question = this.pageData.answerMap(1011);
        return question.selectBox3;
    }

    set question1011_Select3(value: number) {
        let question        = this.pageData.answerMap(1011);
        question.selectBox3 = value;
    }

    get question1012_Select1(): number {
        let question = this.pageData.answerMap(1011);
        return question.selectBox1;
    }

    set question1012_Select1(value: number) {
        let question        = this.pageData.answerMap(1011);
        question.selectBox1 = value;
    }

    get question1012(): string {
        let question = this.pageData.answerMap(1012);
        return question.textArea1;
    }

    set question1012(value: string) {
        let question       = this.pageData.answerMap(1012);
        question.textArea1 = value;
    }

    get question1011_Select2(): number {
        let question = this.pageData.answerMap(1011);
        return question.selectBox2;
    }

    set question1011_Select2(value: number) {
        let question        = this.pageData.answerMap(1011);
        question.selectBox2 = value;
    }

    checkInput(evt) {
        if (evt.which == 45) {
            evt.preventDefault();
            return;
        }
    }

    get defaultStyle():{style: string, radius: string} {
        return this.pageData.defaultFieldBorderCss;
    }
}
