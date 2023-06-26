import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ActivityComponent} from "../component/activity/activity.component";
import {FileViewerComponent} from "../component/file-viewer/file-viewer.component";
import {PaginationComponent} from "../component/pagination/pagination.component";
import {EllipsisPipe} from "../helper/ellipsis.pipe";
import {NumberFormatPipe} from "../pipe/number-format.pipe";
import {DealInfoPage} from "../view/SF/COMMON/dealinfo/DealInfo.page";
import {DateInputDirective} from "./date-input.directive";
import {DateInput2Directive} from "./date-input2.directive";
import {NumberInputDirective} from "./number-input.directive";
import {PreventDoubleClick} from "./prevent-double-click.directive";
import {PreventDoubleClickDirective} from "./PreventDoubleClick.directive";
import {TagsInputDirective} from "./tags-input.directive";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        // directives
        NumberInputDirective,
        PreventDoubleClick,
        PreventDoubleClickDirective,
        DateInputDirective,
        DateInput2Directive,
        EllipsisPipe,
        NumberFormatPipe,
        PaginationComponent,
        FileViewerComponent,
        TagsInputDirective,
        DealInfoPage,
        ActivityComponent
    ],
    exports: [
        NumberInputDirective,
        PreventDoubleClick,
        PreventDoubleClickDirective,
        DateInputDirective,
        DateInput2Directive,
        EllipsisPipe,
        NumberFormatPipe,
        PaginationComponent,
        FileViewerComponent,
        TagsInputDirective,
        DealInfoPage,
        ActivityComponent
    ]
})
export class CommonDirectiveModule {
}