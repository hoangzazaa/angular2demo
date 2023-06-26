import {SF00501DataRepo} from "./SF00501.datarepo";
import {DepartmentModel} from "./model/SF00501_Department.model";
import {StaffModel} from "./model/SF00501_Staff.model";
import {DateModel} from "./model/SF00501_Date.model";
import {SummaryModel} from "./model/SF00501_Summary.model";
import {ViewModeModel} from "./model/SF00501_ViewMode.model";
import {DetailModel} from "./model/SF00501_Detail.model";
import {DetailWrapperModel} from "./model/SF00501_DetailWrapper.model";
import {GraphDataModel} from "./model/SF00501_GraphData.model";
import {FilterModel} from "./model/SF00501_Filter.model";
import {DealModel} from "./model/SF00501_Deal.model";
import {ProductInfoModel} from "../COMMON/productinfo/model/ProductInfo.model";
import {MstLamination} from "../COMMON/model/MstLamination.model";

export class SF00501Data {

    constructor() {
        this.dataRepo = new SF00501DataRepo();
        this.currentFilter = new FilterModel();
        this.selectedFilter = new FilterModel();

        this.showDealList = false;
        this.mstLaminations = [];

        // Trello 846 集計方法を「出荷済」のみにするため、summaryTypeは固定値の1を代入
        this.currentFilter.sumaryType = 1;
        this.selectedFilter.sumaryType = 1;
    }

    //region Background data

    // data map
    dataRepo: SF00501DataRepo;
    // current time
    currentTime: Date;
    // details data
    details: Array<DetailModel>;
    // agent list
    dataAgents: Array<DepartmentModel>;
    // graph data
    graphData: GraphDataModel;
    // deal data
    deals: DealModel[];
    // list product data
    products: ProductInfoModel[];

    //endregion

    //region Screen data

    // agent list
    departments: Array<DepartmentModel>;
    // staff list
    staffs: Array<StaffModel>;
    // date select list
    dateOptions: Array<DateModel>;
    // view mode list
    viewModes: Array<ViewModeModel>;
    // header date list
    dateList: Array<number>;

    // current filter
    currentFilter: FilterModel;
    // selected filter
    selectedFilter: FilterModel;
    // selected view mode
    selectedViewMode: ViewModeModel;

    // show deals
    showDealList: boolean;
    // show summary
    showSummaryTable: boolean;
    // summary table data
    summary: SummaryModel;

    // selectedDealType
    selectedDealType: number;

    // headline title
    headline: string;
    // details data
    displayDetails: Array<DetailWrapperModel>;

    // redraw dataTable/chart
    displayTable: boolean = false;
    displayGraph: boolean = false;

    //endregion
    mstLaminations: MstLamination[];
}