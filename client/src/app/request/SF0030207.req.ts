import {ProductFile} from "../model/core/ProductFile.model";
export class SF0030207Req {
    productFile: ProductFile;
    fileCode: string

    constructor(productFile: ProductFile, fileCode: string) {
        this.productFile = productFile;
        this.fileCode = fileCode;
    }

}
