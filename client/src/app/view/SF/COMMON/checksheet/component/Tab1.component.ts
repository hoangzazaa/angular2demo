import {Component, Input} from "@angular/core";
import {NumberFormatPipe} from "../../../../../pipe/number-format.pipe";
import DataUtil from "../../../../../util/data-util";
import {
    DISTANCE,
    SELECT_1008_1,
    SELECT_1008_2,
    SELECT_1008_3,
    SELECT_1010,
    SELECT_1011_1,
    SELECT_1011_2,
} from "../../../../../helper/mst-data-type";
import {FormatUtil} from "../../../../../util/format-util";
import {CheckSheetData} from "../CheckSheet.data";

@Component({
    selector   : '[component-tab1]',
    templateUrl: 'Tab1.component.html',
})

export class Tab1Component {
    @Input() dataTab: CheckSheetData;
    // implement method get question tab 1
             numberFormat: NumberFormatPipe = new NumberFormatPipe();

    get question1001_Radio(): string {
        let question = this.dataTab.answerMap(1001);
        if (question.radioButton == 1) {
            return 'はい';
        } else if (question.radioButton == 2) {
            return 'いいえ';
        }
    }

    get question1002_Text(): string {
        let question = this.dataTab.answerMap(1002);
        if (question.radioButton == 1) {
            return '食品';
        } else if (question.radioButton == 2) {
            return FormatUtil.getAnswer('その他', question.textArea1);
        }
    }

    get question1003_Radio(): string {
        let question = this.dataTab.answerMap(1003);
        if (question.radioButton == 1) {
            return 'はい';
        } else if (question.radioButton == 2) {
            return 'いいえ';
        }
    }

    get question1004_Text(): string {
        let question = this.dataTab.answerMap(1004);
        let text1    = '';
        if (question.textArea1) {
            text1 = this.numberFormat.transform(question.textArea1, 0) + 'g';
        }
        let text2 = '';
        if (question.textArea2) {
            text2 = this.numberFormat.transform(question.textArea2, 0) + '個';
        }

        return FormatUtil.getAnswer(text1, text2);
    }

    get question1005_Text(): string {
        let question = this.dataTab.answerMap(1005);
        let value    = '';
        if (question.radioButton == 1) {
            value = '常温';
        } else if (question.radioButton == 2) {
            value = '冷蔵';
        } else if (question.radioButton == 3) {
            value = '冷凍';
        }
        let distances = DataUtil.toSelectBoxDataSource(DISTANCE);
        let data      = distances.find(item => {
            return item.id == question.selectBox1;
        })
        // get name
        return FormatUtil.getAnswer(value, this.dataTab.valueItem(data));
    }

    get question1006_Text(): string {
        let question = this.dataTab.answerMap(1006);
        let value1   = '';
        if (question.textArea1) {
            value1 += FormatUtil.formatDateToString(question.textArea1, 'yyyy/MM/dd');
        }
        let value2 = '';
        if (question.textArea2) {
            value2 += FormatUtil.formatDateToString(question.textArea2, 'yyyy/MM/dd');
        }

        return FormatUtil.getAnswer(value1, value2);
    }

    get question1007_Number(): string {
        let question = this.dataTab.answerMap(1007);
        if (question.textArea1) {
            return this.formatStringToNumber(question.textArea1) + '個';
        }
        return '';
    }

    get question1008_Text(): string {
        let question   = this.dataTab.answerMap(1008);
        let distances1 = DataUtil.toSelectBoxDataSource(SELECT_1008_1);
        // get name
        let data1      = distances1.find(item => {
            return item.id == question.selectBox1;
        })
        let distances2 = DataUtil.toSelectBoxDataSource(SELECT_1008_2);
        let data2      = distances2.find(item => {
            return item.id == question.selectBox2;
        })
        // get name
        let distances3 = DataUtil.toSelectBoxDataSource(SELECT_1008_3);
        let data3      = distances3.find(item => {
            return item.id == question.selectBox3;
        })

        return FormatUtil.getAnswer(this.dataTab.valueItem(data1),
            this.formatStringToNumber(question.textArea1)
            + this.dataTab.valueItem(data2)
            + this.dataTab.valueItem(data3));
    }

    get question1009_Text(): string {
        let question = this.dataTab.answerMap(1009);
        let date     = '';
        if (question.textArea2)
            date = FormatUtil.formatDateToString(question.textArea2, 'yyyy/MM/dd');
        return FormatUtil.getAnswer(question.textArea1, date);
    }

    get question1010_Select(): string {
        let question  = this.dataTab.answerMap(1010);
        let distances = DataUtil.toSelectBoxDataSource(SELECT_1010);
        let data      = distances.find(item => {
            return item.id == question.selectBox1;
        })
        // get name
        return this.dataTab.valueItem(data);
    }

    get question1011_Select1(): string {
        let question  = this.dataTab.answerMap(1011);
        let distances = DataUtil.toSelectBoxDataSource(SELECT_1011_1);
        let data      = distances.find(item => {
            return item.id == question.selectBox1;
        })
        // get name
        return this.dataTab.valueItem(data);
    }

    get question1011_2(): string {
        let question = this.dataTab.answerMap(1011);
        let answer   = '';
        if (question.radioButton == 1) {
            answer = 'あり';
        } else if (question.radioButton == 2) {
            answer = 'なし';
        } else if (question.radioButton == 3) {
            answer = '容器以外及び対象外';
        }

        return answer;
    }

    get question1011_Select2(): string {
        let question  = this.dataTab.answerMap(1011);
        let distances = DataUtil.toSelectBoxDataSource(SELECT_1011_2);
        let data      = distances.find(item => {
            return item.id == question.selectBox2;
        })
        // get name
        return this.dataTab.valueItem(data);
    }

    formatStringToNumber(value: any): string {
        let output = '';
        if (value != undefined) {
            output = this.numberFormat.transform(FormatUtil.isNaN(parseInt(value)));
        }

        return output;
    }
}
