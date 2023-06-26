"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var activity_component_1 = require("../component/activity/activity.component");
var file_viewer_component_1 = require("../component/file-viewer/file-viewer.component");
var pagination_component_1 = require("../component/pagination/pagination.component");
var ellipsis_pipe_1 = require("../helper/ellipsis.pipe");
var number_format_pipe_1 = require("../pipe/number-format.pipe");
var DealInfo_page_1 = require("../view/SF/COMMON/dealinfo/DealInfo.page");
var date_input_directive_1 = require("./date-input.directive");
var date_input2_directive_1 = require("./date-input2.directive");
var number_input_directive_1 = require("./number-input.directive");
var prevent_double_click_directive_1 = require("./prevent-double-click.directive");
var PreventDoubleClick_directive_1 = require("./PreventDoubleClick.directive");
var tags_input_directive_1 = require("./tags-input.directive");
var CommonDirectiveModule = (function () {
    function CommonDirectiveModule() {
    }
    CommonDirectiveModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                // directives
                number_input_directive_1.NumberInputDirective,
                prevent_double_click_directive_1.PreventDoubleClick,
                PreventDoubleClick_directive_1.PreventDoubleClickDirective,
                date_input_directive_1.DateInputDirective,
                date_input2_directive_1.DateInput2Directive,
                ellipsis_pipe_1.EllipsisPipe,
                number_format_pipe_1.NumberFormatPipe,
                pagination_component_1.PaginationComponent,
                file_viewer_component_1.FileViewerComponent,
                tags_input_directive_1.TagsInputDirective,
                DealInfo_page_1.DealInfoPage,
                activity_component_1.ActivityComponent
            ],
            exports: [
                number_input_directive_1.NumberInputDirective,
                prevent_double_click_directive_1.PreventDoubleClick,
                PreventDoubleClick_directive_1.PreventDoubleClickDirective,
                date_input_directive_1.DateInputDirective,
                date_input2_directive_1.DateInput2Directive,
                ellipsis_pipe_1.EllipsisPipe,
                number_format_pipe_1.NumberFormatPipe,
                pagination_component_1.PaginationComponent,
                file_viewer_component_1.FileViewerComponent,
                tags_input_directive_1.TagsInputDirective,
                DealInfo_page_1.DealInfoPage,
                activity_component_1.ActivityComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CommonDirectiveModule);
    return CommonDirectiveModule;
}());
exports.CommonDirectiveModule = CommonDirectiveModule;
//# sourceMappingURL=CommonDirective.module.js.map