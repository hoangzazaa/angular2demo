import {SF00301_ProductFile} from "../model/SF00301_ProductFile.model";
export class SF0030105Req {
    productFile: SF00301_ProductFile = new SF00301_ProductFile();
    fileCode: string;

    constructor(productFile: SF00301_ProductFile, fileCode: string) {
        this.productFile = productFile;
        this.fileCode = fileCode;
    }
}
