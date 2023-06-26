import {Injectable} from "@angular/core";

/**
 * Provider for store header data
 */
@Injectable()
export class HeaderProvider {
    public pageName: String;
    public breadcrumbs: Array<BreadCrumbData>;
    private _checkHeader: boolean;

    public reset(): void {
        this.pageName = "";
        this.breadcrumbs = [];
        this._checkHeader = true;
    }

    public addBreadCrumb(name: String, router: Array<String> = []): void {
        let breadcrumb = new BreadCrumbData();
        breadcrumb.name = name;
        breadcrumb.router = router;
        this.breadcrumbs.push(breadcrumb);
    }

    get checkHeader(): boolean {
        return this._checkHeader;
    }

    set checkHeader(value: boolean) {
        this._checkHeader = value;
    }
}

export class BreadCrumbData {
    public name: String;
    public router: Array<String>;

    constructor() {
        this.router = [];
    }
}