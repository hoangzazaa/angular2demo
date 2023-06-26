export class RequestModel {
    /*ランク*/
    rank: number = 0;
    /*ターゲット*/
    target: string;
    /*用途*/
    rse: string;
    /*売り場*/
    department: string;
    /*デザインコンセプト*/
    designConcept: string;
    /*プレゼン方法 立体ダミー*/
    methodStereoscopicDummy: string;
    /*平面出力*/
    flatOutput: string;
    /*希望納期*/
    desiredDeliveryDate: Date;
    /*入稿期限*/
    submissionDeadline: Date;
    /*メモ*/
    memo: string;
}
