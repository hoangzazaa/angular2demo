import {CheckSheetModel} from "./model/CheckSheet.model";

export class CheckSheetData {
    checkSheets: CheckSheetModel[];
    canEdit: boolean;

    public answerMap(key: number) {
        // get answer by questionCode = key
        let answer = this.checkSheets[key];
        // check answer undefined => new CheckSheet() with questionCode = key
        if (answer == undefined) {
            answer = new CheckSheetModel();
        }

        return answer;
    }

    public valueItem(data: any): string {
        if (data)
            return data.name;

        return '';
    }
}
