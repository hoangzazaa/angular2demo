import {Pipe, PipeTransform} from "@angular/core";
import {DEAL_TYPE} from "./mst-data-type";

@Pipe({name: 'DealType'})
export class DealType implements PipeTransform {
    transform(value: any): any {
        return DEAL_TYPE[value];
    }
}