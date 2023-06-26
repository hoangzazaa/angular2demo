/**
 * Created by manhnv on 3/21/2017.
 */
import {Component, Input} from "@angular/core";
import {CheckSheetData} from "../CheckSheet.data";
import {SELECT_2001} from "../../../../../helper/mst-data-type";
import DataUtil from "../../../../../util/data-util";
import {FormatUtil} from "../../../../../util/format-util";

@Component({
    selector: '[component-tab2]',
    templateUrl: 'Tab2.component.html'
})

export class Tab2Component {
    @Input() dataTab: CheckSheetData;
    // implement method get question tab 2


    get question2001_Select(): string {
        let question = this.dataTab.answerMap(2001);
        let distances = DataUtil.toSelectBoxDataSource(SELECT_2001);
        let data = distances.find(item => {
            return item.id == question.selectBox1;
        })
        // get name
        return this.dataTab.valueItem(data);
    }

    get question2002_Radio(): string {
        let question = this.dataTab.answerMap(2002);
        if (question.radioButton == 1) {
            return 'はい';
        } else if (question.radioButton == 2) {
            return 'いいえ';
        }
    }

    get question2003_Radio(): string {
        let question = this.dataTab.answerMap(2003);
        if (question.radioButton == 1) {
            return 'コスト';
        } else if (question.radioButton == 2) {
            return '作業性';
        } else if (question.radioButton == 3) {
            return 'デザイン';
        } else if (question.radioButton == 4) {
            return 'その他';
        }
    }

    get question2004_Text(): string {
        let question = this.dataTab.answerMap(2004);

        if (question.radioButton == 1 && question.textArea1) {
            let answer = null;
            if (question.textArea1 != undefined) {
                answer = 'はい' + '(材料名 ' + question.textArea1 + ')';
            }

            return answer;
        } else if (question.radioButton == 2) {
            return 'いいえ';
        }

        return "";
    }

    get question2005_Radio(): string {
        let question = this.dataTab.answerMap(2005);
        if (question.radioButton == 1) {
            return 'はい';
        } else if (question.radioButton == 2) {
            return 'いいえ';
        }
    }

    get question2006_CheckBox(): string {
        let question = this.dataTab.answerMap(2006);
        if (question.checkBox1 == 1) {
            return 'リサイクル';
        }
    }

    get question2061_Text(): string {
        let question = this.dataTab.answerMap(2061);
        if (question.checkBox1)
            return FormatUtil.getAnswer('JAN', question.textArea1);
        return '';
    }

    get question2062_Text(): string {
        let question = this.dataTab.answerMap(2062);
        if (question.checkBox1)
            return FormatUtil.getAnswer('ITF', question.textArea1);
        return '';
    }

    get question2063_Text(): string {
        let question = this.dataTab.answerMap(2063);
        if (question.checkBox1)
            return FormatUtil.getAnswer('GTIN', question.textArea1);
        return '';
    }

    get question2007_Text(): string {
        let question = this.dataTab.answerMap(2007);
        let answer1 = '';
        if (question.textArea1) {
            answer1 = question.textArea1 + '色';
        }
        let answer2 = '';
        if (question.textArea2) {
            answer2 = question.textArea2 + '色（特殊色）';
        }
        return FormatUtil.getAnswer(answer1, answer2);
    }

    get question2008_Radio(): string {
        let question = this.dataTab.answerMap(2008);
        if (question.radioButton == 1) {
            return 'はい';
        } else if (question.radioButton == 2) {
            return 'いいえ';
        }
    }

    get question2009_Radio(): string {
        let question = this.dataTab.answerMap(2009);
        if (question.radioButton == 1) {
            return 'はい';
        } else if (question.radioButton == 2) {
            return 'いいえ';
        }
    }
}
