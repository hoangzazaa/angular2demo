import {Component, ElementRef, Inject, ViewChild, ViewEncapsulation} from "@angular/core";
import {ShippingDestinationModalData} from "./ShippingDestinationModal.data";
import {ShippingDestinationModalModel} from "./ShippingDestinationModal.model";
import {SpecifyTimeModalComponent} from "../specify-time-modal/SpecifyTimeModal.component";
import {GenericProvider} from "../GenericProvider";
import {SDMDestination} from "./model/SDMDestination.model";
import {CommonHelper, Option} from "../../helper/common-helper";
import { DISTRICT_NAME, FORM_NAME, VEHICLE_SIZE, DISTRICT_CODE_LIST, VEHICLE_SIZE_CODE_LIST, EXTRA_METHOD_CODE_LIST, EXTRA_METHOD_NAME } from '../../helper/mst-data-type';
import {SpecifyTimeModalModel} from "../specify-time-modal/SpecifyTimeModal.model";
import {SDMSpecifyTimeModalModel} from "./component-model/SDMSpecifyTimeModal.model";

const DISTRICT_OPTIONS = CommonHelper.getList(DISTRICT_CODE_LIST, DISTRICT_NAME);
const VEHICLE_OPTIONS = CommonHelper.getList(VEHICLE_SIZE_CODE_LIST, VEHICLE_SIZE);
const FORM_OPTIONS = CommonHelper.getList(EXTRA_METHOD_CODE_LIST, EXTRA_METHOD_NAME);

@Component({
    selector: "shipping-destination-modal",
    templateUrl: "ShippingDestinationModal.component.html",
    styleUrls: ["ShippingDestinationModal.component.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: SpecifyTimeModalModel.PROVIDER, useFactory: () => new GenericProvider<SpecifyTimeModalModel>()}
    ]
})
export class ShippingDestinationModalComponent {

    model: ShippingDestinationModalModel;
    data: ShippingDestinationModalData;
    curDestination: SDMDestination;
    saveEnable: boolean;
    @ViewChild("modal") modalE: ElementRef;
    @ViewChild(SpecifyTimeModalComponent) specifyTime: SpecifyTimeModalComponent;

    constructor(@Inject(ShippingDestinationModalModel.PROVIDER) provider: GenericProvider<ShippingDestinationModalModel>,
                @Inject(SpecifyTimeModalModel.PROVIDER) stmProvider: GenericProvider<SpecifyTimeModalModel>) {
        // get init
        this.model = provider.provider;
        this.data = this.model.data;

        // specify time modal
        stmProvider.provider = new SDMSpecifyTimeModalModel(this);

        // init
        this.saveEnable = true;
        this.curDestination = <SDMDestination>{};
    }

    //region Bindings

    get destinationId(): number {
        return this.curDestination.sdm_id;
    }

    set destinationId(value: number) {
        this.selectDestination(value);
    }

    get destination(): SDMDestination {
        return this.curDestination;
    }

    get destinationList(): SDMDestination[] {
        return this.data.destinationList;
    }

    get districtList(): Option[] {
        return DISTRICT_OPTIONS;
    }

    get vehicleList(): Option[] {
        return VEHICLE_OPTIONS;
    }

    get formList(): Option[] {
        return FORM_OPTIONS;
    }

    //endregion

    //region Actions

    open(destinationId: number) {
        // set value
        this.selectDestination(destinationId);

        // open modal
        $(this.modalE.nativeElement).modal('show');
    }

    close() {
        $(this.modalE.nativeElement).modal('hide');
    }

    pickSpecifyTime() {
        this.specifyTime.open(this.curDestination);
    }

    cancel() {
        this.close();
    }

    save() {
        this.saveEnable = false;
        this.model.saveDestination(this.curDestination).then(() => {
            this.saveEnable = true;
        });
    }

    //endregion

    //region private
    selectDestination(destinationId: number) {
        let dest = <SDMDestination>{};
        for (let iDest of this.data.destinationList) {
            if (iDest.sdm_id == destinationId) {
                dest = iDest;
                break;
            }
        }
        // cache obj
        this.curDestination = <SDMDestination>{};
        // Id
        this.curDestination.sdm_id = dest.sdm_id;
        // ext
        this.curDestination.sdm_ext = dest.sdm_ext;
        // option name
        this.curDestination.sdm_name = dest.sdm_name;
        // 納入先名
        this.curDestination.sdm_deliveryName = dest.sdm_deliveryName;
        // 納入先名（略称）
        this.curDestination.sdm_abbreviation = dest.sdm_abbreviation;
        // フリガナ
        this.curDestination.sdm_furigana = dest.sdm_furigana;
        // 略称カナ
        this.curDestination.sdm_abbrFurigana = dest.sdm_abbrFurigana;
        // 郵便番号
        this.curDestination.sdm_postalCode = dest.sdm_postalCode;
        // 地区コード
        this.curDestination.sdm_districtCode = dest.sdm_districtCode;
        // 住所１
        this.curDestination.sdm_address1 = dest.sdm_address1;
        // 住所２
        this.curDestination.sdm_address2 = dest.sdm_address2;
        // TEL
        this.curDestination.sdm_tel = dest.sdm_tel;
        // FAX
        this.curDestination.sdm_fax = dest.sdm_fax;
        // 時間指定
        this.curDestination.sdm_specifyTime = dest.sdm_specifyTime;
        this.curDestination.stm_pattern = dest.stm_pattern;
        this.curDestination.stm_hour = dest.stm_hour;
        this.curDestination.stm_minute = dest.stm_minute;
        this.curDestination.stm_period = dest.stm_period;
        // 担当部署
        this.curDestination.sdm_deptName = dest.sdm_deptName;
        // 得意先担当者
        this.curDestination.sdm_salerName = dest.sdm_salerName;
        // 納入可能車両サイズ
        this.curDestination.sdm_availableVehicleSize = dest.sdm_availableVehicleSize;
        // 付帯作業
        this.curDestination.sdm_extraWork = dest.sdm_extraWork;
        // 専用伝票有無
        this.curDestination.sdm_extraMethod = dest.sdm_extraMethod;
        // 備考
        this.curDestination.sdm_memo = dest.sdm_memo;
    }

    //endregion
}
