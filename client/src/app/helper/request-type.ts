import {Pipe, PipeTransform} from "@angular/core";
import {REQUEST_TYPE} from "./mst-data-type";

@Pipe({name: 'RequestType'})
export class RequestType implements PipeTransform {
    transform(value: any): any {
        return REQUEST_TYPE[value];
    }
}