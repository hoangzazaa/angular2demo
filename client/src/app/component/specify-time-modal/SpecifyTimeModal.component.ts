import {AfterViewInit, Component, ElementRef, Inject, ViewChild, ViewEncapsulation} from "@angular/core";
import {CommonHelper, Option} from "../../helper/common-helper";
import { SPECIFY_TIME, SPECIFY_TIME_PERIOD, SPECIFY_TIME_CODE_LIST, SPECIFY_TIME_PERIOD_CODE_LIST } from '../../helper/mst-data-type';
import {STMTime} from "./model/STMTime.model";
import {SpecifyTimeModalHelper} from "./SpecifyTimeModal.helper";
import {SpecifyTimeModalModel} from "./SpecifyTimeModal.model";
import {GenericProvider} from "../GenericProvider";

const SPECIFY_TIME_OPTIONS = CommonHelper.getList(SPECIFY_TIME_CODE_LIST, SPECIFY_TIME);
const SPECIFY_TIME_PERIOD_OPTIONS = CommonHelper.getList(SPECIFY_TIME_PERIOD_CODE_LIST, SPECIFY_TIME_PERIOD);

@Component({
    selector: "specify-time-modal",
    templateUrl: "SpecifyTimeModal.component.html",
    styleUrls: ["SpecifyTimeModal.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class SpecifyTimeModalComponent implements AfterViewInit {

    @ViewChild("modal") modalE: ElementRef;
    @ViewChild("timePeriod") timePeriodE: ElementRef;
    private specifyTime: STMTime;
    private originTime: STMTime;
    private model: SpecifyTimeModalModel;

    constructor(@Inject(SpecifyTimeModalModel.PROVIDER) provider: GenericProvider<SpecifyTimeModalModel>) {

        this.model = provider.provider;
        this.specifyTime = <STMTime>{};
    }

    ngAfterViewInit(): void {
        $(this.timePeriodE.nativeElement).slimScroll({
            height: "210px"
        });

        // 3249
        $('.modal').on('hidden.bs.modal', function (e) {
            if($('.modal').hasClass('in')) {
                $('body').addClass('modal-open');
            }
        });
    }

    //region Bindings

    get timeOptions(): Option[] {
        return SPECIFY_TIME_OPTIONS;
    }

    get periodOptions(): Option[] {
        return SPECIFY_TIME_PERIOD_OPTIONS;
    }

    //endregion

    //region Actions

    open(specifyTime: STMTime) {
        // set value
        this.specifyTime.stm_pattern = specifyTime.stm_pattern;
        this.specifyTime.stm_hour = specifyTime.stm_hour;
        this.specifyTime.stm_minute = specifyTime.stm_minute;
        this.specifyTime.stm_period = specifyTime.stm_period;
        // cache shipping
        this.originTime = specifyTime;

        // open modal
        $(this.modalE.nativeElement).modal('show');

        // scroll to seleted value
        if (this.specifyTime.stm_pattern != undefined) {
            let self = this;
            setTimeout(() => {
                let wrapper = $(self.timePeriodE.nativeElement);
                let activated = wrapper.children("div.active").first();
                var scrollToVal = wrapper.scrollTop() + activated.position().top;
                wrapper.slimScroll({scrollTo: scrollToVal + 'px'});
            }, 50);
        }
    }

    close() {
        $(this.modalE.nativeElement).modal('hide');
    }

    cancel() {
        this.close();
    }

    select() {
        // update value
        this.originTime.stm_pattern = this.specifyTime.stm_pattern;
        this.originTime.stm_hour = this.specifyTime.stm_hour;
        this.originTime.stm_minute = this.specifyTime.stm_minute;
        this.originTime.stm_period = this.specifyTime.stm_period;

        this.model.timeSelected();

        // close modal
        this.close();
    }

    setPattern(value: number) {
        this.specifyTime.stm_pattern = value;
    }

    //endregion
}
