import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import "rxjs/add/operator/toPromise";
import {Location} from "@angular/common";
import {CommonService} from "./common.service";
import {File} from "../model/core/File.model";

@Injectable()
export class CM00101Service extends CommonService {

    constructor(http: Http, router: Router, private location: Location) {
        super(http, router);
    }

    getTempFileByFileName(fileName: string): Promise<File> {
        return this.getApi("/CM0010102/" + fileName).then(data => {
            let file = new File();
            file.setFile(data);
            return file;
        });
    }

    getFileByFileId(fileId: number): Promise<File> {
        return this.getApi("/CM0010103/" + fileId).then(data => {
            let file = new File();
            file.setFile(data);
            return file;
        });
    }

}
