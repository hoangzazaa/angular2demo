import {Constants} from "../../../helper/constants";
import {MstLamination} from "../COMMON/model/MstLamination.model";
import {ChartModel} from "./model/SF001_ChartData";
import {DataTableModel} from "./model/SF001_DataTable";
import {DealModel} from "./model/SF001_Deal";
import {DepartmentModel} from "./model/SF001_Department";
import {ModelFilter} from "./model/SF001_ModelFilter";
import {UserModel} from "./model/SF001_User";
import {SF00101Page} from "./SF00101.page";
/**
 * Created by manhnv on 6/5/2017.
 */
declare let Handsontable: any;

export class SF00101Data {

    constructor(private page: SF00101Page) {
        this.receipts = new ChartModel();
        this.newReceipts = new ChartModel();
        this.recordNew = new ChartModel();
        this.digitalSale = new ChartModel();

        this.dataTable = [];
        this.departments = [];
        this.salesTab1 = [];
        this.salesTab2 = [];
        this.deals = [];
        this.inprogressDeals = [];

        this.modelFilterTab1 = new ModelFilter();
        this.modelFilterTab1.timeFilter = 1;
        this.modelFilterTab2 = new ModelFilter();
        this.modelFilterTab2.timeFilter = 1;
    }

    /*tab1*/
    //売上
    receipts: ChartModel;
    //新規売上
    newReceipts: ChartModel;
    //新規件数
    recordNew: ChartModel;
    //デジタル売上
    digitalSale: ChartModel;
    // list sale filter by department tab1
    salesTab1: UserModel[];

    /*tab2*/
    //table sort
    dataTable: DataTableModel[];
    //revenue
    product_Type0: number = 0;

    product_Type1: number = 0;

    product_Type2: number = 0;

    /*data screen*/
    //department
    departments: DepartmentModel[];
    // list sale filter by department tab1
    salesTab2: UserModel[];
    //filter date
    periods: number[] = [1, 2, 3];
    //deals
    deals: DealModel[];
    //inprogressDeals
    inprogressDeals: DealModel[];
    //systemDate
    systemDate: Date;
    // data filter
    modelFilterTab1: ModelFilter;

    modelFilterTab2: ModelFilter;

    mstLaminations: MstLamination[];

    get sumTotal(): number {
        return this.product_Type0 + this.product_Type1 + this.product_Type2;
    }

    handsonTable: any;

    loadDataTable() {
        let self = this;
        setTimeout(function () {
            const headers = ['日付', '案件ID', '案件名', '製品種類', '注文数', '単価', '売上(税抜）'];
            const config = {
                columns: [
                    {
                        data: 'invoiceDate',
                        type: 'text',
                        className: 'text-center'
                    },
                    {
                        data: 'dealCode',
                        type: 'text',
                        // renderer: linkRender,
                        className: 'text-left'
                    },
                    {
                        data: 'dealName',
                        type: 'text',
                        // renderer: linkRender,
                        className: 'text-left'
                    },
                    {
                        data: 'productTypeDisplay',
                        type: 'text',
                        className: 'text-center'
                    },
                    {
                        data: 'numberOfOrder',
                        type: 'numeric',
                        format: '0,000'
                    },
                    {
                        data: 'unitPrice',
                        type: 'text',
                        className: 'text-center'
                    },
                    {
                        data: 'amountOfMoney',
                        type: 'numeric',
                        format: '0,000',
                    }
                ],
                colWidths: [80, 120, 250, 80, 80, 80, 80],
                stretchH: 'all',
                autoWrapRow: true,
                rowHeaders: false,
                colHeaders: headers,
                columnSorting: true,
                readOnly: true,
                sortIndicator: true,
            };

            function linkRender(instance, td, row, col, prop, value, cellProperties) {
                if (value != undefined) {
                    let dealCode = instance.getDataAtCell(row, 1); // always at second column
                    let escaped = Handsontable.helper.stringify(value);
                    let link = '<button class="btn btn-link" style="padding-left: 0px">' + escaped + '</button>';
                    td.innerHTML = link;
                    $(td).click(event => self.onClickLink(dealCode));

                    return td;
                }
            }

            let container = document.getElementById('revenueOntable');
            self.handsonTable = new Handsontable(container, config);
        }, 1);

    }

    onClickLink(dealCode: string): void {
        this.page.viewDealDetail(dealCode);
    }

    // total records when search|load page
    totalRecords: number = Constants.ZERO;

    // records per page to paginator
    pageSize: number = Constants.PAGE_SIZE;

}