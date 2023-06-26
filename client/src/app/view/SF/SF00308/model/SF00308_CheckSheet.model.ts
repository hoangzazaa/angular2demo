/**
 * Created by hoangtd on 3/16/2017.
 */
export class SF00308CheckSheet {
    id: number;

    questionCode: number;

    textArea1: string;

    textArea2: string;

    radioButton: number;

    selectBox1: number;

    selectBox2: number;

    selectBox3: number;

    dealId: number;

    checkBox1: number;

    checkBox2: number;

    checkBox3: number;

    public setData(data: any) {
        this.id = data["id"];
        this.questionCode = data["questionCode"];
        this.textArea1 = data["textArea1"];
        this.textArea2 = data["textArea2"];
        this.radioButton = data["radioButton"];
        this.selectBox1 = data["selectBox1"];
        this.selectBox2 = data["selectBox2"];
        this.selectBox3 = data["selectBox3"];
        this.dealId = data["dealId"];
        this.checkBox1 = data["checkBox1"];
        this.checkBox2 = data["checkBox2"];
        this.checkBox3 = data["checkBox3"];
    }
}