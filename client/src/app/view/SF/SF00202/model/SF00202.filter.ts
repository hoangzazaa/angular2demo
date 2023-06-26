export class SF00202RuleFilter {
    public dealCode: string;
    public dealName: string;
    public salesName: string;
    public dealType: number = 99;
    public customerCode: string;
    public customerName: string;
    public contactName: string;
    public productName: string;
    public shapeId: number = 0;
    public productCode: string;
    public productApplication: string;
    public sizeW: number;
    public sizeD: number;
    public sizeH: number;
    public paperName: string;
    public printMethod: number = 0;
    public orderValueFrom: number;
    public orderValueTo: number;
    public lotFrom: number;
    public lotTo: number;
    public dealStatus: number = 0;
    public periodFrom: Date;
    public periodTo: Date;
    public periodType: number =1;
    public productNo: number;

    public clone() {
        let ruleFilter: SF00202RuleFilter = new SF00202RuleFilter();
        ruleFilter.dealCode = this.dealCode;
        ruleFilter.dealName = this.dealName;
        ruleFilter.salesName = this.salesName;
        ruleFilter.dealType = this.dealType;
        ruleFilter.customerCode = this.customerCode;
        ruleFilter.customerName = this.customerName;
        ruleFilter.contactName = this.contactName;
        ruleFilter.productName = this.productName;
        ruleFilter.shapeId = this.shapeId;
        ruleFilter.productCode = this.productCode;
        ruleFilter.productApplication = this.productApplication;
        ruleFilter.sizeW = this.sizeW;
        ruleFilter.sizeD = this.sizeD;
        ruleFilter.sizeH = this.sizeH;
        ruleFilter.paperName = this.paperName;
        ruleFilter.printMethod = this.printMethod;
        ruleFilter.orderValueFrom = this.orderValueFrom;
        ruleFilter.orderValueTo = this.orderValueTo;
        ruleFilter.lotFrom = this.lotFrom;
        ruleFilter.lotTo = this.lotTo;
        ruleFilter.dealStatus = this.dealStatus;
        ruleFilter.periodFrom = this.periodFrom;
        ruleFilter.periodTo = this.periodTo;
        ruleFilter.periodType = this.periodType;
        return ruleFilter;
    }

}
