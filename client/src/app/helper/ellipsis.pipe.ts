import {Pipe, PipeTransform} from "@angular/core";
import {Constants} from "./constants";
import ValidatorUtil from "../util/validator-util";

/**
 * Format data display apply for (Quotation Memo | Product Name | File Name | Field).
 * If length less than 20 characters and display all.
 * Else if length greater than 20 characters then display as '...' from at 20 characters.
 *
 * @author manhnv
 */
@Pipe({
    name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
    /**
     * Function use to transform data.
     *
     * @param value the data will be transformed
     * @return new formatted text
     */
    transform(value: string, offset: number): string {
        if (ValidatorUtil.isEmpty(value))
            return null;

        if (!Number.isInteger(offset))
            offset = 20;

        if (value.length > offset)
            return value.substring(0, offset - 1) + Constants.THREE_DOT;

        return value;
    }
}