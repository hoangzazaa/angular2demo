import {AfterViewInit, Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonPage} from "../COMMON/common.page";
import {HeaderProvider} from "./Header.provider";
import {CommonEvents} from "../../../helper/common-events";

declare let OneUI: OneUI;

@Component({
    selector: "main-layout",
    templateUrl: "./SF00100.page.html"
})
export class SF00100Page extends CommonPage implements AfterViewInit {
    constructor(router: Router, route: ActivatedRoute, public headerProvider: HeaderProvider) {
        super(router, route);
    }

    ngAfterViewInit(): void {
        OneUI.init();

        // fix for multiple modal
        $(document).on('show.bs.modal', '.modal', function (event) {
            var zIndex = 1040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);
            setTimeout(function () {
                $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
            }, 0);
        });

        $('[data-toggle="layout"]').on('click', function () {
            $(window).trigger(CommonEvents.LAYOUT_CHANGE);
        });
    }
}