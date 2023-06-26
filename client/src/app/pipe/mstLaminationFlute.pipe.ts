/**
 * Created by VuPT on 12/1/2016.
 */
import {Pipe, PipeTransform} from "@angular/core";
import {LAMINATION_FLUTE} from "../helper/mst-data-type";
@Pipe({name: 'MstPaperPipe'})
export class MstPaperPipe implements PipeTransform {
    transform(value: any): any {
        return LAMINATION_FLUTE[value];
    }
}