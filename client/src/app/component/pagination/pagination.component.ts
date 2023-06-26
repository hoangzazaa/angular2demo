import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
/**
 * Common component for pagination
 * Input/Output
 *  [total]     total record
 *  [pageSize]  number record per page
 *  [currentPage]   set current page number
 *  (currentPageChange) event change current page
 *
 * @author haipt
 */
@Component({
    selector: "pagination-component",
    templateUrl: "pagination.component.html",
    styleUrls: ["pagination.component.css"]
})
export class PaginationComponent implements OnChanges {

    /* Total records */
    @Input()
    private total: number;
    /* Records per page */
    @Input()
    private pageSize: number;
    /* current page */
    @Input()
    private currentPage: number;
    @Output()
    private currentPageChange: EventEmitter<number> = new EventEmitter<number>();
    /* Total pages */
    private totalPage: number;
    /* previous disabled */
    private previousDisabled: boolean;
    /* next disabled */
    private nextDisabled: boolean;
    /* page numbers */
    private mid1Page: number;
    private mid2Page: number;
    private mid3Page: number;
    private mid4Page: number;
    private mid5Page: number;
    /* hidden variables */
    private isHidden: boolean;
    private prevEtcHidden: boolean;
    private nextEtcHidden: boolean;
    private lastHidden: boolean;
    private mid1Hidden: boolean;
    private mid2Hidden: boolean;
    private mid3Hidden: boolean;
    private mid4Hidden: boolean;
    private mid5Hidden: boolean;

    constructor(private element: ElementRef) {
        this.isHidden = true;
        this.total = 0;
        this.currentPage = 0;
        this.pageSize = 10;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["total"] || changes["pageSize"]) {
            if (this.pageSize <= 0) {
                this.pageSize = 10;
            }
            let totalPage = Math.ceil(this.total / this.pageSize);
            this.setTotalPage(totalPage);
        }
        if (changes["currentPage"]) {
            // if currentPage change
            let pageValue = changes["currentPage"].currentValue;
            // check if value valid
            if (isNaN(pageValue) || pageValue < 0 || pageValue > this.totalPage) {
                // set first page if value invalid
                pageValue = 1;
            }
            this.goPage(pageValue);
        }
    }

    private setTotalPage(value: number): void {
        // update total page
        this.totalPage = value;
        // update display
        if (this.totalPage == 0) {
            this.isHidden = true;
        } else {
            this.isHidden = false;
        }
        // go first page
        this.setPage(1);
    }

    goPrevious(): void {
        if (this.currentPage > 1) {
            this.goPage(this.currentPage - 1);
        }
    }

    goNext(): void {
        if (this.currentPage < this.totalPage) {
            this.goPage(this.currentPage + 1);
        }
    }

    goPage(page: number): void {
        if (page == this.currentPage) {
            this.activePreLastPage();

            // no change page
            return;
        } else {
            // update page display
            this.setPage(page);
            // emit change event
            this.currentPageChange.emit(this.currentPage);
        }
    }

    setPage(page: number): void {
        // update current page
        this.currentPage = page;
        // page displays
        if (this.totalPage > 7) {
            // update page value
            if (this.currentPage < 5) {
                this.mid1Page = 2;
                this.mid2Page = 3;
                this.mid3Page = 4;
                this.mid4Page = 5;
                this.mid5Page = 6;
            } else if (this.currentPage > this.totalPage - 4) {
                this.mid1Page = this.totalPage - 5;
                this.mid2Page = this.totalPage - 4;
                this.mid3Page = this.totalPage - 3;
                this.mid4Page = this.totalPage - 2;
                this.mid5Page = this.totalPage - 1;
            } else {
                this.mid2Page = this.currentPage - 1;
                this.mid3Page = this.currentPage;
                this.mid4Page = this.currentPage + 1;
            }

            // update show-hide btns
            if (this.currentPage < 5) {
                // hide prevEtc, show mid1Page
                this.prevEtcHidden = true;
                this.mid1Hidden = false;
                // show nextEtc, hide mid5Page
                this.nextEtcHidden = false;
                this.mid5Hidden = true;
            } else if (this.currentPage > this.totalPage - 4) {
                // show prevEtc, hide mid1Page
                this.prevEtcHidden = false;
                this.mid1Hidden = true;
                // hide nextEtc, show mid5Page
                this.nextEtcHidden = true;
                this.mid5Hidden = false;
            } else {
                // show prevEtc, hide mid1Page
                this.prevEtcHidden = false;
                this.mid1Hidden = true;
                // show nextEtc, hide mid5Page
                this.nextEtcHidden = false;
                this.mid5Hidden = true;
            }
            // show other mid pages
            this.mid2Hidden = false;
            this.mid3Hidden = false;
            this.mid4Hidden = false;
            // display last page
            this.lastHidden = false;
        } else {
            // update page values
            this.mid1Page = 2;
            this.mid2Page = 3;
            this.mid3Page = 4;
            this.mid4Page = 5;
            this.mid5Page = 6;

            // display mid pages
            this.mid1Hidden = (this.totalPage < 2);
            this.mid2Hidden = (this.totalPage < 3);
            this.mid3Hidden = (this.totalPage < 4);
            this.mid4Hidden = (this.totalPage < 5);
            this.mid5Hidden = (this.totalPage < 6);
            // display last page
            this.lastHidden = (this.totalPage < 7);
            // hide etc buttons
            this.prevEtcHidden = true;
            this.nextEtcHidden = true;
        }

        // disable buttons
        this.activePreLastPage();
    }

    activePreLastPage() {
        if (this.currentPage == 1) {
            this.previousDisabled = true;
        } else {
            this.previousDisabled = false;
        }
        if (this.currentPage == this.totalPage) {
            this.nextDisabled = true;
        } else {
            this.nextDisabled = false;
        }
    }

}
