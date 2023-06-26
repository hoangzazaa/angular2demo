import {Pipe, PipeTransform} from "@angular/core";
import {DEAL_STATUS} from "./mst-data-type";

@Pipe({name: 'DealStatus'})
export class DealStatus implements PipeTransform {
    transform(value: any): any {
        return DEAL_STATUS[value];
    }
}