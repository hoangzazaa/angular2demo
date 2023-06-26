import {ProductFile} from "../model/core/ProductFile.model";
export class SF0030206Req {
    productFile: ProductFile;
    fileCode: string;

    constructor(productFile: ProductFile, fileCode: string) {
        this.productFile = productFile;
        this.fileCode = fileCode;
    }


}
