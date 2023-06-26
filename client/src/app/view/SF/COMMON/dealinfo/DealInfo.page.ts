import {Component, Input} from "@angular/core";
import {DealInfoData} from "./DealInfo.data";
import {DealInfoModel} from "./model/DealModel";
import {DEAL_STATUS, DEAL_TYPE} from "../../../../helper/mst-data-type";
import DataUtil from "../../../../util/data-util";
import {Constants} from "../../../../helper/constants";

@Component({
    selector   : "deal-info",
    templateUrl: "DealInfo.page.html",
    styleUrls: ["DealInfo.page.css"]
})
export class DealInfoPage {

    @Input() set dealInfo(value: DealInfoModel) {
        if (value) {
            this.pageData.dealInfo = value;
        }
    }

    pageData: DealInfoData;

    constructor() {
        this.pageData          = new DealInfoData();
        this.pageData.dealInfo = new DealInfoModel();
    }

    get dealInfo(): DealInfoModel {
        return this.pageData.dealInfo;
    }

    get dealType(): string {
        return DataUtil.getData(DEAL_TYPE, Constants.BLANK, this.dealInfo.dealType);
    }

    get dealStatus(): string {
        let distances = DataUtil.toSelectBoxDataSource(DEAL_STATUS);
        let data      = distances.find(item => {
            return item.id == this.dealInfo.dealStatus;
        });

        return this.valueItem(data);
    }

    public valueItem(data: any): string {
        if (data)
            return data.name;

        return '';
    }
}