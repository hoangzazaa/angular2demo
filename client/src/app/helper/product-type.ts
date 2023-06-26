import {Pipe, PipeTransform} from "@angular/core";
import {PRODUCT_TYPE} from "./mst-data-type";

@Pipe({name: 'ProductType'})
export class ProductType implements PipeTransform {
    transform(value: any): any {
        return PRODUCT_TYPE[value];
    }
}