import {Headers, Http} from "@angular/http";
import {Router} from "@angular/router";

declare let App: any;

/**
 * Created by Teddy on 18/09/2016.
 */
export abstract class CommonService {
    constructor(public http: Http, public router: Router) {
    }

    protected getApi(webApi: string): Promise<any> {
        let self = this;
        return new Promise(
            function (resolve, reject) {
                self.http.get(webApi)
                    .toPromise()
                    .then((response) => {
                        let body = response.json();
                        resolve(body);
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
            .then((body) => {
                if (body["error"] == undefined) {
                    return body["res"];
                } else {
                    throw body["error"];
                }
            }, (err) => {
                App.loader('hide');
                if (err.status == 500) { // Internal Server Error
                    this.navigateTo("500 error", "/error/500");
                    return this.router.navigate(['/error/500']);
                }
                throw err;
            });
    }

    protected postApi(webApi: string, data: any): Promise<any> {
        let self = this;
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        return new Promise(
            function (resolve, reject) {
                self.http.post(webApi, JSON.stringify(data), {headers: headers})
                    .toPromise()
                    .then((response) => {
                        let body = response.json();
                        resolve(body);
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
            .then((body) => {
                if (body["error"] == undefined) {
                    return body["res"];
                } else {
                    throw body["error"];
                }
            }, (err) => {
                App.loader('hide');
                if (err.status == 500) { // Internal Server Error
                    this.navigateTo("500 error", "/error/500");
                    return this.router.navigate(['/error/500']);
                }
                throw err;
            });
    }

    public navigateTo(functionName: string, path: string): void {
        let self = this;
        let req = {
            function : functionName,
            transitionPath : path
        };
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        self.http.post("/CC0010102", JSON.stringify(req), {headers: headers})
            .toPromise().then().catch();
    }
}
