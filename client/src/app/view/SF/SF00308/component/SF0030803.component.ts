import {Component, Input, Output, EventEmitter} from "@angular/core";
import {SF00308Data} from "../SF00308.data";
import {FormatUtil} from "../../../../util/format-util";
import {SELECT_3002} from "../../../../helper/mst-data-type";
import DataUtil from "../../../../util/data-util";
/**
 * Created by hoangtd on 3/16/2017.
 */
@Component({
    selector: 'div[sf0030803]',
    templateUrl: 'SF0030803.component.html'
})

export class SF0030803Component {
    @Input() pageData: SF00308Data;
    @Output() emitCancel: EventEmitter<any> = new EventEmitter();
    @Output() emitSave: EventEmitter<any> = new EventEmitter();

    cancelTab3() {
        this.emitCancel.emit();
    }

    saveTab3() {
        this.emitSave.emit(this.pageData.TAB_3);
    }

    mstSelect3002 = DataUtil.toSelectBoxDataSource(SELECT_3002);

    get question3001_Radio(): number {
        let question = this.pageData.answerMap(3001);
        return question.radioButton;
    }

    _question3001_Radio(value: number) {
        let question = this.pageData.answerMap(3001);
        question.radioButton = value;
    }

    get question3002_Select(): number {
        let question = this.pageData.answerMap(3002);
        return question.selectBox1;
    }

    set question3002_Select(value: number) {
        let question = this.pageData.answerMap(3002);
        question.selectBox1 = value;
    }

    get question3003_Radio(): number {
        let question = this.pageData.answerMap(3003);
        return question.radioButton;
    }

    _question3003_Radio(value: number) {
        let question = this.pageData.answerMap(3003);
        question.radioButton = value;
    }

    get question3004_Radio(): number {
        let question = this.pageData.answerMap(3004);
        return question.radioButton;

    }

    _question3004_Radio(value: number) {
        let question = this.pageData.answerMap(3004);
        question.radioButton = value;
    }

    get question3005_Radio(): number {
        let question = this.pageData.answerMap(3005);
        return question.radioButton;
    }

    _question3005_Radio(value: number) {
        let question = this.pageData.answerMap(3005);
        question.radioButton = value;
    }

    get question3006_Radio(): number {
        let question = this.pageData.answerMap(3006);
        return question.radioButton;
    }

    _question3006_Radio(value: number) {
        let question = this.pageData.answerMap(3006);
        question.radioButton = value;
    }

    get question3007_Radio(): number {
        let question = this.pageData.answerMap(3007);
        return question.radioButton;
    }

    _question3007_Radio(value: number) {
        let question = this.pageData.answerMap(3007);
        if (value != 1) {
            question.textArea1 = '';
        }
        question.radioButton = value;
    }

    get question3007_Text(): number {
        let question = this.pageData.answerMap(3007);
        return FormatUtil.isNaN(parseInt(question.textArea1));
    }

    set question3007_Text(value: number) {
        let question = this.pageData.answerMap(3007);
        question.textArea1 = value + '';
    }

    get question3008_Text(): string {
        let question = this.pageData.answerMap(3008);
        return question.textArea1;
    }

    set question3008_Text(value: string) {
        let question = this.pageData.answerMap(3008);
        question.textArea1 = value;
    }

    checkInput(evt) {
        if (evt.which == 45) {
            evt.preventDefault();
            return;
        }
    }

}