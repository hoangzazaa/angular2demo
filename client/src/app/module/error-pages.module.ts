import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Error404Page} from "../view/ERROR/404/error-404.page";
import {Error500Page} from "../view/ERROR/500/error-500.page";
import {Error403Page} from "../view/ERROR/403/error-403.page";
import {Error401Page} from "../view/ERROR/401/error-401.page";
import {Error400Page} from "../view/ERROR/400/error-400.page";

/**
 * Common Error Pages declaration.
 * @author manhnv
 */
@NgModule({
    imports: [CommonModule],
    declarations: [ // components and directives...
        Error400Page,
        Error401Page,
        Error403Page,
        Error404Page,
        Error500Page
    ],
    providers: [], // provides if need as services...
    exports: [
        Error400Page,
        Error401Page,
        Error403Page,
        Error404Page,
        Error500Page
    ]
})
export class ErrorPagesModule {
}