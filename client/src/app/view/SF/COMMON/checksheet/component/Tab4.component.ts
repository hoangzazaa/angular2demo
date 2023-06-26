/**
 * Created by manhnv on 3/21/2017.
 */
import {Component, Input} from "@angular/core";
import {CheckSheetData} from "../CheckSheet.data";
import {NumberFormatPipe} from "../../../../../pipe/number-format.pipe";
import {FormatUtil} from "../../../../../util/format-util";
@Component({
    selector: '[component-tab4]',
    templateUrl: 'Tab4.component.html'
})

export class Tab4Component {
    @Input() dataTab: CheckSheetData;
    // implement method get question tab 4

    numberFormat: NumberFormatPipe = new NumberFormatPipe();

    get question4001_Text(): string {
        let question = this.dataTab.answerMap(4002);
        let text = '';
        if (question.radioButton == 1) {
            if (question.textArea1) {
                text = 'あり (' + this.numberFormat.transform(question.textArea1, 0) + ' 枚）';
            } else {
                text = 'あり'
            }
        } else if (question.radioButton == 2) {
            text = 'なし（適量)';
        }
        return text;
    }

    get question4002_Radio(): string {
        let question = this.dataTab.answerMap(4003);
        if (question.radioButton == 1) {
            return 'はい';
        } else if (question.radioButton == 2) {
            return 'いいえ';
        }
    }

    get question4003_Radio(): string {
        let question = this.dataTab.answerMap(4004);
        if (question.radioButton == 1) {
            return 'はい';
        } else if (question.radioButton == 2) {
            return 'いいえ';
        }
    }

    get question4004_Text(): string {
        let question = this.dataTab.answerMap(4005);
        let text = '';
        if (question.radioButton == 1) {
            if (question.textArea1) {
                text = 'あり' + '(' + question.textArea1 + ')';
            } else {
                text = 'あり';
            }
        } else if (question.radioButton == 2) {
            text = 'なし';
        }
        return text;
    }

    get question4005_Text(): string {
        let question = this.dataTab.answerMap(4006);
        return question.textArea1;
    }

    get question4006_Select(): string {
        let question = this.dataTab.answerMap(4007);
        if (question.selectBox1 == 1) {
            return 'なし（社用）';
        } else if (question.selectBox1 == 2) {
            return 'あり（専用）';
        }
    }

    get question4007_Text(): string {
        let question = this.dataTab.answerMap(4008);
        return question.textArea1;
    }

    get question4008_Radio(): string {
        let question = this.dataTab.answerMap(4009);
        if (question.radioButton == 1) {
            return 'はい';
        } else if (question.radioButton == 2) {
            return 'いいえ';
        }
    }

    get question4009_CheckBox(): string {
        let question = this.dataTab.answerMap(4010);
        let checkBox1 = '';
        let checkBox2 = '';
        let checkBox3 = '';
        if (question.checkBox1) {
            checkBox1 = "10ｔ";
        }
        if (question.checkBox2) {
            checkBox2 = "4ｔ";
        }
        if (question.checkBox3) {
            checkBox3 = "2ｔ";
        }
        return FormatUtil.getAnswer(checkBox1, checkBox2, checkBox3);
    }

    get question4010_Text(): string {
        let question = this.dataTab.answerMap(4011);
        if (question.textArea1)
            return question.textArea1;
    }

    get question4011_Radio(): string {
        let question = this.dataTab.answerMap(4012);
        if (question.radioButton == 1) {
            return 'はい';
        } else if (question.radioButton == 2) {
            return 'いいえ';
        }
    }

    get question4012_Text(): string {
        let question = this.dataTab.answerMap(4013);
        let text1 = '';
        if (question.textArea1) {
            text1 = this.numberFormat.transform(question.textArea1, 0) + '㎡';
        }
        return text1;
    }

    get question4013_Text(): string {
        let question = this.dataTab.answerMap(4014);
        let text1 = '';
        if (question.textArea1) {
            text1 = question.textArea1;
        }
        return text1;
    }

    get question4014_Text(): string {
        let question = this.dataTab.answerMap(4015);
        let text1 = '';
        let text2 = '';
        if (question.textArea1) {
            text1 = this.numberFormat.transform(question.textArea1, 0) + ' X ';
        }
        if (question.textArea2) {
            text2 = this.numberFormat.transform(question.textArea2, 0) + '㎜';
        }
        return text1 + text2;
    }


    get question4015_Radio(): string {
        let question = this.dataTab.answerMap(4016);
        if (question.radioButton == 1) {
            return 'はい';
        } else if (question.radioButton == 2) {
            return 'いいえ';
        }
    }

    get question4016_Radio(): string {
        let question = this.dataTab.answerMap(4017);
        if (question.radioButton == 1) {
            return 'あり';
        } else if (question.radioButton == 2) {
            return 'なし';
        }
    }

    get question4017_Radio(): string {
        let question = this.dataTab.answerMap(4018);
        if (question.radioButton == 1) {
            return '可能';
        } else if (question.radioButton == 2) {
            return '不可';
        }
    }

    get question4018_Radio(): string {
        let question = this.dataTab.answerMap(4019);
        if (question.radioButton == 1) {
            return 'はい';
        } else if (question.radioButton == 2) {
            return 'いいえ';
        }
    }

}


