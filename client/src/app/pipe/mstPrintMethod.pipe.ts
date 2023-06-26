/**
 * Created by VuPT on 12/1/2016.
 */
import {Pipe, PipeTransform} from "@angular/core";
import {PRINT_METHOD} from "../helper/mst-data-type";
@Pipe({name: 'MstPaperPipe'})
export class MstPaperPipe implements PipeTransform {
    transform(value: any): any {
        return PRINT_METHOD[value];
    }
}