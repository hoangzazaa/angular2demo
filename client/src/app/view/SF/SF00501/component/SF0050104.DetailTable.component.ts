import {Component, AfterViewInit, ChangeDetectionStrategy} from "@angular/core";
import {SF00501Page} from "../SF00501.page";
import {DetailWrapperModel} from "../model/SF00501_DetailWrapper.model";
import ColumnDefsSettings = DataTables.ColumnDefsSettings;

@Component({
    selector: "[sf0050104]",
    templateUrl: "SF0050104.DetailTable.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SF0050104Component implements AfterViewInit {

    constructor(private page: SF00501Page) {
    }

    ngAfterViewInit(): void {
        this.initDataTable();

        // trigger select staff
        let self = this;
        $(".sf0050105-staff").click(function (event) {
            let staffId = $(this).data("staff");
            self.filterStaff(staffId);
        });
    }

    initDataTable() {

        if (this.page.pageData.displayTable
            && this.page.pageData.displayDetails != undefined
            && this.page.pageData.displayDetails.length > 0) {

            let columnDefs = this.getColumnDefs();

            let dataTable = $("#sf0050104-table").DataTable({
                searching: false,
                ordering: false,
                paging: false,
                info: false,
                scrollX: true,
                columnDefs: columnDefs,
                fixedColumns: {
                    leftColumns: 2
                }
            });
        }
    }

    get dateList(): number[] {
        return this.page.pageData.dateList;
    }

    get dataWrapper(): DetailWrapperModel[] {
        return this.page.pageData.displayDetails;
    }

    //region Functions

    getColumnDefs(): ColumnDefsSettings[] {
        let columnDefs = [{width: "60px", targets: 0}];

        let dateLength = this.page.pageData.dateList.length;
        let clmWidth = "10%";
        if (dateLength == 12) {
            columnDefs.push({width: "60px", targets: 1});
            clmWidth = "8%";
        } else if (dateLength == 6) {
            columnDefs.push({width: "10%", targets: 1});
            clmWidth = "15%";
        } else if (dateLength == 3) {
            columnDefs.push({width: "10%", targets: 1});
            clmWidth = "30%";
        } else if (dateLength > 12) {
            columnDefs.push({width: "60px", targets: 1});
            clmWidth = "70px";
        }

        for (let i = 0; i < dateLength; i++) {
            columnDefs.push({width: clmWidth, targets: i + 2});
        }

        return columnDefs;
    }


    filterStaff(staffId: number) {
        let staffs = this.page.pageData.staffs;
        let selectedStaff;
        for (let staff of staffs) {
            if (staff.id == staffId) {
                selectedStaff = staff;
                break;
            }
        }
        if (selectedStaff != undefined) {
            this.page.pageData.selectedFilter.staff = selectedStaff;
            this.page.doFilter();
        }
    }

    //endregion
}