import {Product} from "../model/core/Product.model";
import {PaperModel} from "../view/SF/SF00302/model/paper.model";

export class SF0030203Req {
    product: Product;
    paperNews: PaperModel[];

    constructor( product: Product, paperNews?: PaperModel[]) {
        this.product = product;
        this.paperNews = paperNews;
    }
}
