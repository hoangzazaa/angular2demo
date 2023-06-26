import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ShippingDestinationModel} from "../model/ShippingDestination.model";
import {DISTRICT_NAME, FORM_NAME, SPECIFY_TIME, VEHICLE_SIZE} from "../../../../helper/mst-data-type";
import {Constants} from "../../../../helper/constants";
import DataUtil from "../../../../util/data-util";
import {DealInfoModel} from "../../COMMON/dealinfo/model/DealModel";

type SelectBoxItem = {id: any, name: string};

@Component({
    selector: 'shipping-component',
    templateUrl: 'SF0030702.ShippingInfo.component.html'
})


export class SF0030702ShippingInfo {

    @Input() shippingData: ShippingDestinationModel;
    @Input() _selectShipment: ShippingDestinationModel;
    @Input() mstShippings: ShippingDestinationModel[];
    @Input() dealInfo: DealInfoModel;
    @Output() requestSelectShippingDestination: EventEmitter<ShippingDestinationModel> = new EventEmitter<ShippingDestinationModel>();
    @Output() timePermistionChanged: EventEmitter<number> = new EventEmitter<number>();

    timePermissions(): {id: any, name: string}[] {
        return DataUtil.toSelectBoxDataSource(SPECIFY_TIME);
    }

    formIds(): {id: any, name: string}[] {
        return DataUtil.toSelectBoxDataSource(FORM_NAME);
    }

    get telMask(): (string | RegExp)[] {
        return [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    }

    get districOptions(): any[] {
        return Object.keys(DISTRICT_NAME)
            .map(key => {
                let id = parseInt(key);
                let val = ("000" + key).slice(-3) + "：" + DISTRICT_NAME[key];
                return {id: id, name: val};
            });
    }

    get vehicleOptions(): SelectBoxItem[] {
        return DataUtil.toSelectBoxDataSource(VEHICLE_SIZE);
    }

    get formnameOptions(): SelectBoxItem[] {
        return DataUtil.toSelectBoxDataSource(FORM_NAME);
    }

    get specifyTimeOptions(): SelectBoxItem[] {
        return [
            {id: 10, name: SPECIFY_TIME[10]},
            {id: 1, name: SPECIFY_TIME[1]},
            {id: 4, name: SPECIFY_TIME[4]},
            {id: 6, name: SPECIFY_TIME[6]},
            {id: 7, name: SPECIFY_TIME[7]},
            {id: 8, name: SPECIFY_TIME[8]},
            {id: 9, name: SPECIFY_TIME[9]},
            {id: 2, name: SPECIFY_TIME[2]},
            {id: 11, name: SPECIFY_TIME[11]},
            {id: 12, name: SPECIFY_TIME[12]},
            {id: 13, name: SPECIFY_TIME[13]},
            {id: 14, name: SPECIFY_TIME[14]},
        ];
    }

    get selectName() {
        return this._selectShipment;
    }

    set selectName(target: ShippingDestinationModel) {
        this._selectShipment = target;
        this.requestSelectShippingDestination.emit(target);
    }

    get saveToDennoFlag(): boolean {
        return !!this.shippingData.saveToDennoFlag;
    }

    set saveToDennoFlag(val: boolean) {
        this.shippingData.saveToDennoFlag = val ? 1 : 0;
    }

    get defaultFlag(): boolean {
        return !!this.shippingData.defaultFlag;
    }

    set defaultFlag(val: boolean) {
        this.shippingData.defaultFlag = val ? 1 : 0;
    }

    get district(): number {
        if (!this.shippingData.districtCode)
            return 0;
        else
            return parseInt(this.shippingData.districtCode);
    }

    set district(val: number) {
        if (val == 0)
            this.shippingData.districtCode = "";
        else {
            this.shippingData.districtCode = this.districOptions.find(item => item.id == val).id + "";
        }
    }

    get districName() {
        return DataUtil.getData(DISTRICT_NAME, Constants.BLANK, parseInt(this.shippingData.districtCode));
    }

    get vehicle() {
        return DataUtil.getData(VEHICLE_SIZE, Constants.BLANK, this.shippingData.availableVehicleSize);
    }

    get timePermission(): number {
        return this.shippingData.timePermission;
    }

    set timePermission(val: number) {
        this.shippingData.timePermission = val;
        this.timePermistionChanged.emit(val);
    }

    get timePermissionText() {
        return DataUtil.getData(SPECIFY_TIME, Constants.BLANK, this.shippingData.timePermission);
    }

    get formName() {
        return DataUtil.getData(FORM_NAME, Constants.BLANK, this.shippingData.formNameId);
    }

}
