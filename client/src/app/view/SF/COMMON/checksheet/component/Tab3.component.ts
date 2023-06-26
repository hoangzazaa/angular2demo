/**
 * Created by manhnv on 3/21/2017.
 */
import {Component, Input} from "@angular/core";
import {CheckSheetData} from "../CheckSheet.data";
import {NumberFormatPipe} from "../../../../../pipe/number-format.pipe";
import DataUtil from "../../../../../util/data-util";
import {SELECT_3002} from "../../../../../helper/mst-data-type";
@Component({
    selector: '[component-tab3]',
    templateUrl: 'Tab3.component.html'
})

export class Tab3Component {
    @Input() dataTab: CheckSheetData;
    // implement method get question tab 3
    numberFormat: NumberFormatPipe = new NumberFormatPipe();

    get question3001_Radio(): string {
        let question = this.dataTab.answerMap(3001);
        if (question.radioButton == 1) {
            return 'オフセット';
        } else if (question.radioButton == 2) {
            return 'グラビア';
        } else if (question.radioButton == 3) {
            return 'デジタル';
        }
    }

    get question3002_Select(): string {
        let question = this.dataTab.answerMap(3002);
        let distances = DataUtil.toSelectBoxDataSource(SELECT_3002);
        let data = distances.find(item => {
            return item.id == question.selectBox1;
        })
        // get name
        return this.dataTab.valueItem(data);
    }


    get question3003_Radio(): string {
        let question = this.dataTab.answerMap(3003);
        if (question.radioButton == 1) {
            return 'はい';
        } else if (question.radioButton == 2) {
            return 'いいえ';
        }
    }

    get question3004_Radio(): string {
        let question = this.dataTab.answerMap(3004);
        if (question.radioButton == 1) {
            return 'はい';
        } else if (question.radioButton == 2) {
            return 'いいえ';
        }
    }

    get question3005_Radio(): string {
        let question = this.dataTab.answerMap(3005);
        if (question.radioButton == 1) {
            return '手詰め';
        } else if (question.radioButton == 2) {
            return 'オートケーサー';
        }
    }

    get question3006_Radio(): string {
        let question = this.dataTab.answerMap(3006);
        if (question.radioButton == 1) {
            return '事前胴貼り';
        } else if (question.radioButton == 2) {
            return 'ブランク納品';
        }
    }

    get question3007_Text(): string {
        let question = this.dataTab.answerMap(3007);
        let text = '';
        if (question.radioButton == 1) {
            if (question.textArea1) {
                text = 'あり (' + this.numberFormat.transform(question.textArea1, 0) + '枚）';
            } else {
                text = 'あり';
            }
        } else if (question.radioButton == 2) {
            text = 'なし';
        }
        return text;
    }
}