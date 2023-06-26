import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonService} from "../../service/common.service";


@Injectable()
export class FileViewerService extends CommonService {

    constructor(http: Http, router: Router, route: ActivatedRoute) {
        super(http, router);
    }

    checkResource(url: string): Promise<boolean> {
        let self = this;
        return new Promise(
            function (resolve, reject) {
                if (!url) return reject();
                self.http.get(url)
                    .toPromise()
                    .then((res: any) => {
                        let hasImage = res.headers.get("content-type").includes("image");
                        hasImage ? resolve() : reject();
                    })
                    .catch(() => {
                        reject();
                    })
            })
            .then(() => true)
            .catch(() => false);
    }

}
