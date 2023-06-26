import {PIBProduct} from "./model/PIBProduct.model";
import {FACTORY} from "../../helper/mst-data-type";
import {FormatUtil} from "../../util/format-util";
import {Constants} from "../../helper/constants";
export class ProductInfoBoxHelper {

    static isCommercialProduct(product: PIBProduct): boolean {
        return false;
    }

    static getProductTypeName(productType: number) {
        if (productType == 0) {
            return "紙器・貼合";
        } else if (productType == 1) {
            return "段ボール";
        } else {
            return "美粧シート";
        }
    }

    static getDimension(product: any) {
        return FormatUtil.getDimension(product);
    }

    static getMaterial(product: any, mstLamination: any): string {
        let paperName = FormatUtil.getPaperName(product, mstLamination);
        let color = FormatUtil.formatColorsViaPrintMethod(product);

        let value = [];
        if(!!paperName){
            value.push(paperName);
        }

        if(!!color){
            value.push(color);
        }

        let material = value.join(Constants.SPACE);
        return material;
    }

    static getMemo(memo1: string, memo2: string, memo3: string): string {
        let memos = [];
        if (memo1 != undefined) {
            memos.push(memo1);
        }
        if (memo2 != undefined) {
            memos.push(memo2);
        }
        if (memo3 != undefined) {
            memos.push(memo3);
        }
        let sizeStr = memos.join("、");
        return sizeStr;
    }

    static getManufacture(factoryId: number) {
        let factory = FACTORY[factoryId];
        if (factory == undefined) {
            return "";
        } else {
            return factory;
        }
    }
}