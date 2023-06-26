import {AfterViewInit, Component, ElementRef, forwardRef, Inject, ViewChild} from "@angular/core";
import {ProductInfoBoxComponent} from "../ProductInfoBox.component";
import {PIBLoading} from "../model/PIBLoading.model";
import DataUtil from "../../../util/data-util";
import CellProperties = ht.CellProperties;

@Component({
    selector: "loading-address",
    templateUrl: "LoadingAddress.component.html"
})
export class LoadingAddressComponent implements AfterViewInit {

    @ViewChild("modal") modalE: ElementRef;
    @ViewChild("hot") hotE: ElementRef;
    private hotData: PIBLoading[];
    private _keywords: string[];
    private hot: ht.Methods;
    private selected: number;

    constructor(@Inject(forwardRef(() => ProductInfoBoxComponent)) private component: ProductInfoBoxComponent) {
        this._keywords = [];
        this.hotData = [];
    }

    ngAfterViewInit(): void {

        let self = this;

        // init table
        var hotElement = this.hotE.nativeElement;
        this.hotData = this.hotGetData();
        var hotSettings = {
            data: this.hotData,
            columns: [
                {
                    data: DataUtil.data('pib_code'),
                    type: 'text',
                    readOnly: true,
                    width: 40
                },
                {
                    data: DataUtil.data('pib_abbr'),
                    readOnly: true,
                    type: 'text'
                },
                {
                    data: DataUtil.data('pib_name'),
                    readOnly: true,
                    type: 'text'
                }
            ],
            colHeaders: [
                'ID',
                '略称漢字',
                '場所名'
            ],
            stretchH: 'last',
            manualColumnResize: [150, 200, 300],
            height: 400,
            cells: function (row, col, prop) {
                var cellProperties: CellProperties = {};
                if (row == self.selected) {
                    cellProperties.className = "selected-address";
                } else {
                    cellProperties.className = "";
                }
                return cellProperties;
            },
            multiSelect: false
        };

        this.hot = new Handsontable(hotElement, hotSettings);
        this.hot.addHook("beforeOnCellMouseDown", function (event, coords) {
            self.preventSelectCell(event, coords);
        });
        this.hot.addHook("afterSelectionEnd", function (r) {
            self.selectRow(r);
        });
    }

    //region Screen bindings

    get keywords(): string [] {
        return this._keywords;
    }

    set keywords(value: string[]) {
        // check if need filter
        this._keywords = value;

        this.doFilter();
    }

    //endregion

    //region Screen actions

    open() {
        // clear keywords
        this._keywords = [];
        this.doFilter();

        // open modal
        $(this.modalE.nativeElement).modal('show');

        this.hot.updateSettings({
            width: "100%"
        });

        // scroll to selected
        let selectedId = this.component.data.tmpShipping.pib_loadingAddressId;
        if (selectedId != undefined) {
            let len = this.hotData.length;
            for (let i = 0; i < len; i++) {
                if (this.hotData[i].pib_id == selectedId) {
                    this.hot.selectCell(len - 1, 0, len - 1, 0, true);
                    this.hot.selectCell(i, 0, i, 0, true);
                    break;
                }
            }
        }
    }

    close() {
        $(this.modalE.nativeElement).modal('hide');
    }

    cancel() {
        this.close();
    }

    select() {
        // set selected value
        let tmpShipping = this.component.data.tmpShipping;
        if (this.selected != undefined) {
            let selectedData = this.hotData[this.selected];
            tmpShipping.pib_loadingAddressId = selectedData.pib_id;
            tmpShipping.pib_loadingAddressName = selectedData.pib_abbr;
            tmpShipping.pib_loadingAddressCode = selectedData.pib_code;
        } else {
            tmpShipping.pib_loadingAddressId = undefined;
            tmpShipping.pib_loadingAddressName = "";
            tmpShipping.pib_loadingAddressCode = "";
        }
        // close modal
        this.close();
    }

    doFilter() {
        this.hotData = this.hotGetData();
        this.hot.loadData(this.hotData);

        // clear selected
        this.selectRow(undefined);
    }

    //endregion

    //region private functions

    private preventSelectCell(event, coords) {
        if (coords.row < 0) {
            event.stopImmediatePropagation();
        }
    }

    selectRow(row: number) {
        if (row != undefined) {
            this.selected = row;
        } else {
            this.selected = undefined;
        }
        this.hot.render();
    }

    private hotGetData(): PIBLoading[] {
        let tableData = [];

        // filter
        let sourceData = this.getSourceData();
        let self = this;
        if (sourceData != undefined) {
            tableData = sourceData.filter((value) => {
                return self.filter(value);
            });
        }

        return tableData;
    }

    private filter(value: PIBLoading): boolean {
        // match all keywords
        for (let keyword of this._keywords) {
            let match = false;
            if (value.pib_code != undefined && value.pib_code.indexOf(keyword) >= 0) {
                // code
                match = true;
            } else if (value.pib_abbr != undefined && value.pib_abbr.indexOf(keyword) >= 0) {
                // abbr
                match = true;
            } else if (value.pib_name != undefined && value.pib_name.indexOf(keyword) >= 0) {
                // name
                match = true;
            }
            if (!match) {
                return false;
            }
        }
        return true;
    }

    private getSourceData(): PIBLoading[] {
        return this.component.data.loadings;
    }

    //endregion
}