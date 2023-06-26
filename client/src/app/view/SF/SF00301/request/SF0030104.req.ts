import {SF00301_DealFile} from "../model/SF00301_DealFile.model";
export class SF0030104Req {
    dealFile: SF00301_DealFile = new SF00301_DealFile();
    fileCode: string;

    constructor(dealFile: SF00301_DealFile, fileCode: string) {
        this.dealFile = dealFile;
        this.fileCode = fileCode;
    }
}
