import {Component, Input, EventEmitter, Output} from "@angular/core";
import {SF00308Data} from "../SF00308.data";
import {FormatUtil} from "../../../../util/format-util";
import {SELECT_4001} from "../../../../helper/mst-data-type";
import DataUtil from "../../../../util/data-util";
/**
 * Created by hoangtd on 3/16/2017.
 */
@Component({
    selector: 'div[sf0030804]',
    templateUrl: 'SF0030804.component.html'
})

export class SF0030804Component {
    @Input() pageData: SF00308Data;
    @Output() emitCancel: EventEmitter<any> = new EventEmitter();
    @Output() emitSave: EventEmitter<any> = new EventEmitter();

    cancelTab4() {
        this.emitCancel.emit();
    }

    saveTab4() {
        this.emitSave.emit(this.pageData.TAB_4);
    }

    mstSelect4001 = DataUtil.toSelectBoxDataSource(SELECT_4001);

    get question4002_Radio(): number {
        let question = this.pageData.answerMap(4002);
        return question.radioButton;
    }

    _question4002_Radio(value: number) {
        let question = this.pageData.answerMap(4002);
        if (value != 1) {
            question.textArea1 = '';
        }
        question.radioButton = value;
    }

    get question4002_Text(): number {
        let question = this.pageData.answerMap(4002);
        return FormatUtil.isNaN(parseInt(question.textArea1));
    }

    set question4002_Text(value: number) {
        let question = this.pageData.answerMap(4002);
        question.textArea1 = value + '';
    }

    get question4003_Radio(): number {
        let question = this.pageData.answerMap(4003);
        return question.radioButton;
    }

    _question4003_Radio(value: number) {
        let question = this.pageData.answerMap(4003);
        question.radioButton = value;
    }

    get question4004_Radio(): number {
        let question = this.pageData.answerMap(4004);
        return question.radioButton;
    }

    _question4004_Radio(value: number) {
        let question = this.pageData.answerMap(4004);
        question.radioButton = value;
    }

    get question4005_Radio(): number {
        let question = this.pageData.answerMap(4005);
        return question.radioButton;
    }

    _question4005_Radio(value: number) {
        let question = this.pageData.answerMap(4005);
        if (value != 1) {
            question.textArea1 = '';
        }
        question.radioButton = value;
    }

    get question4005_Text(): string {
        let question = this.pageData.answerMap(4005);
        return question.textArea1;
    }

    set question4005_Text(value: string) {
        let question = this.pageData.answerMap(4005);
        question.textArea1 = value;
    }

    get question4006_Text(): string {
        let question = this.pageData.answerMap(4006);
        return question.textArea1;
    }

    set question4006_Text(value: string) {
        let question = this.pageData.answerMap(4006);
        question.textArea1 = value;
    }

    get question4007_Select(): number {
        let question = this.pageData.answerMap(4007);
        if (question.selectBox1 == null || question.selectBox1 == undefined) {
            question.selectBox1 = 1;
        }
        return question.selectBox1;
    }

    set question4007_Select(value: number) {
        let question = this.pageData.answerMap(4007);
        question.selectBox1 = value;
    }

    get question4008_Text(): string {
        let question = this.pageData.answerMap(4008);
        return question.textArea1;
    }

    set question4008_Text(value: string) {
        let question = this.pageData.answerMap(4008);
        question.textArea1 = value;
    }

    get question4009_Radio(): number {
        let question = this.pageData.answerMap(4009);
        return question.radioButton;
    }

    _question4009_Radio(value: number) {
        let question = this.pageData.answerMap(4009);
        question.radioButton = value;
    }

    get question4010_CheckBox1(): number {
        let question = this.pageData.answerMap(4010);
        return FormatUtil.convertDataCheckBox(question.checkBox1);
    }

    set question4010_CheckBox1(value: number) {
        let question = this.pageData.answerMap(4010);
        question.checkBox1 = FormatUtil.convertDataCheckBox(value);
    }

    get question4010_CheckBox2(): number {
        let question = this.pageData.answerMap(4010);
        return FormatUtil.convertDataCheckBox(question.checkBox2);
    }

    set question4010_CheckBox2(value: number) {
        let question = this.pageData.answerMap(4010);
        question.checkBox2 = FormatUtil.convertDataCheckBox(value);
    }

    get question4010_CheckBox3(): number {
        let question = this.pageData.answerMap(4010);
        return FormatUtil.convertDataCheckBox(question.checkBox3);
    }

    set question4010_CheckBox3(value: number) {
        let question = this.pageData.answerMap(4010);
        question.checkBox3 = FormatUtil.convertDataCheckBox(value);
    }

    get question4011_Text(): string {
        let question = this.pageData.answerMap(4011);
        return question.textArea1;
    }

    set question4011_Text(value: string) {
        let question = this.pageData.answerMap(4011);
        question.textArea1 = value;
    }

    get question4012_Radio(): number {
        let question = this.pageData.answerMap(4012);
        return question.radioButton;
    }

    _question4012_Radio(value: number) {
        let question = this.pageData.answerMap(4012);
        question.radioButton = value;
    }

    get question4013_Text(): string {
        let question = this.pageData.answerMap(4013);
        return question.textArea1;
    }

    set question4013_Text(value: string) {
        let question = this.pageData.answerMap(4013);
        question.textArea1 = value;
    }

    get question4014_Number(): string {
        let question = this.pageData.answerMap(4014);
        return question.textArea1;
    }

    set question4014_Number(value: string) {
        let question = this.pageData.answerMap(4014);
        question.textArea1 = value + '';
    }

    get question4015_Text01(): number {
        let question = this.pageData.answerMap(4015);
        return FormatUtil.isNaN(parseInt(question.textArea1));
    }

    set question4015_Text01(value: number) {
        let question = this.pageData.answerMap(4015);
        question.textArea1 = value + '';
    }

    get question4015_Text02(): number {
        let question = this.pageData.answerMap(4015);
        return FormatUtil.isNaN(parseInt(question.textArea2));
    }

    set question4015_Text02(value: number) {
        let question = this.pageData.answerMap(4015);
        question.textArea2 = value + '';
    }

    get question4016_Radio(): number {
        let question = this.pageData.answerMap(4016);
        return question.radioButton;
    }

    _question4016_Radio(value: number) {
        let question = this.pageData.answerMap(4016);
        question.radioButton = value;
    }


    get question4017_Radio(): number {
        let question = this.pageData.answerMap(4017);
        return question.radioButton;
    }

    _question4017_Radio(value: number) {
        let question = this.pageData.answerMap(4017);
        question.radioButton = value;
    }

    get question4018_Radio(): number {
        let question = this.pageData.answerMap(4018);
        return question.radioButton;
    }

    _question4018_Radio(value: number) {
        let question = this.pageData.answerMap(4018);
        question.radioButton = value;
    }

    get question4019_Radio(): number {
        let question = this.pageData.answerMap(4019);
        return question.radioButton;
    }

    _question4019_Radio(value: number) {
        let question = this.pageData.answerMap(4019);
        question.radioButton = value;
    }

    get question4020_Text(): string {
        let question = this.pageData.answerMap(4020);
        return question.textArea1;
    }

    set question4020_Text(value: string) {
        let question = this.pageData.answerMap(4020);
        question.textArea1 = value;
    }

    checkInput(evt) {
        if (evt.which == 45) {
            evt.preventDefault();
            return;
        }
    }
}