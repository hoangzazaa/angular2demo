import {Pipe, PipeTransform} from "@angular/core";

/**
 * Format result type file
 * Input original file
 * @author hoangtd
 */
@Pipe({
    name: "fileTypeUtil"
})
export class FileUtil implements PipeTransform {
    transform(data) {
        let dataFormat = data;
        if (data != null) {
            try {
                dataFormat = dataFormat.slice((dataFormat.lastIndexOf(".") - 1 >>> 0) + 2);
            } catch (err) {
                return dataFormat;
            }
        }
        return dataFormat;
    }
}