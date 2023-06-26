import {Component, Host, OnInit, ViewChild, ElementRef, AfterViewInit, Input} from "@angular/core";
import {SF00502Constants} from "../SF00502.constants";
import {NoteModel} from "../model/Note.model";
import {SF0050203Component} from "./SF0050203.CustomerTable.component";
import {SF00502Page} from "../SF00502.page";
import {RevenueModel} from "../model/Revenue.model";
import {MSG} from "../../../../helper/message";
import {CustomerModel} from "../model/Customer.model";
import {SF00502Helper} from "../SF00502.helper";

@Component({
    selector: "[sf0050204]",
    templateUrl: "SF0050204.TableRow.component.html"
})
export class SF0050204Component implements OnInit, AfterViewInit {

    // row data
    rowData: NoteModel;
    // new amount
    newAmount: RevenueModel;
    // row Index
    @Input() index: number;
    // select element
    @ViewChild("sf0050204Select") selectEl: ElementRef;

    constructor(private page: SF00502Page, @Host() private customerTable: SF0050203Component) {
    }

    ngOnInit(): void {
        // set row data
        if (this.index != undefined) {
            this.rowData = this.customerTable.tableNotes[this.index];

            // set data
            // row No
            // this.rowNo = this.index + 1;
            // customer name
            let customer = this.page.pageData.dataRepo.getCustomer(this.rowData.customerId);
            this.customerName = customer.name;
            // amount
            if (this.isPrediction) {
                this.newAmount = this.rowData.prediction;
            } else {
                this.newAmount = this.rowData.newRevenue;
            }
        } else {
            // wait row
            //this.rowNo = this.customerTable.tableNotes.length + 1;
        }
    }

    ngAfterViewInit(): void {
        if (this.selectEl != undefined) {
            // init select2
            let selectData = [];
            for (let customer of this.page.pageData.availableCustomers) {
                let cOption = {
                    id: customer.id,
                    text: customer.name,
                    disabled: false
                }
                // check if customer selected
                let noteList = this.page.pageData.increaseList.concat(this.page.pageData.decreaseList);
                for (let note of noteList) {
                    if (note.customerId == customer.id) {
                        // disable customer
                        cOption.disabled = true;
                    }
                }
                selectData.push(cOption);
            }

            let self = this;
            $(this.selectEl.nativeElement).select2({
                placeholder: "Select customer",
                minimumResultsForSearch: 6
            });
        }
    }

    get customerList(): CustomerModel[] {
        return this.page.pageData.availableCustomers;
    }

    updateSelect() {
        if (this.selectEl != undefined) {
            // init select2
            let selectData = [];
            for (let customer of this.page.pageData.availableCustomers) {
                let cOption = {
                    id: customer.id,
                    text: customer.name,
                    disabled: false
                }
                selectData.push(cOption);
            }
            $(this.selectEl.nativeElement).select2({
                placeholder: "Select customer",
                data: selectData,
                minimumResultsForSearch: 6
            });
        }
    }

    //region Screen bindings

    // row no.
    get rowNo(): number {
        if (this.index != undefined) {
            return this.index + 1;
        } else {
            return this.customerTable.tableNotes.length + 1;
        }
    }

    // customerName
    customerName: string;

    get isWaitRow(): boolean {
        return (this.index == undefined);
    }

    get isPrediction(): boolean {
        return (this.page.pageData.screenMode == SF00502Constants.SCREEN_MODE_PREDICTION);
    }

    get isEditMode(): boolean {
        return this.page.pageData.canEdit;
    }

    get newAmount1(): number {
        return this.newAmount.amount1;
    }

    set newAmount1(value: number) {
        this.newAmount.amount1 = value;
        // only prediction can update value
        this.rowData.prediction.calculateTotal();
        this.rowData.calculatePredictionDiffRate();
    }

    get newAmount2(): number {
        return this.newAmount.amount2;
    }

    set newAmount2(value: number) {
        this.newAmount.amount2 = value;
        // only prediction can update value
        this.rowData.prediction.calculateTotal();
        this.rowData.calculatePredictionDiffRate();
    }

    get newAmount3(): number {
        return this.newAmount.amount3;
    }

    set newAmount3(value: number) {
        this.newAmount.amount3 = value;
        // only prediction can update value
        this.rowData.prediction.calculateTotal();
        this.rowData.calculatePredictionDiffRate();
    }

    get oldAmount1(): number {
        return this.rowData.oldRevenue.amount1;
    }

    get oldAmount2(): number {
        return this.rowData.oldRevenue.amount2;
    }

    get oldAmount3(): number {
        return this.rowData.oldRevenue.amount3;
    }

    get totalNewAmount(): number {
        return this.newAmount.total;
    }

    get totalOldAmount(): number {
        return this.rowData.oldRevenue.total;
    }

    get isNanDiffRate(): boolean {
        return isNaN(this.rowData.diffRate) || !isFinite(this.rowData.diffRate);
    }

    get diffRate(): number {
        return this.rowData.diffRate;
    }

    get comment(): string {
        return this.rowData.comment;
    }

    set comment(value: string) {
        this.rowData.comment = value;
    }

    //endregion

    //region Screen actions

    goCustomerDetail() {
        this.page.navigateToCustomerDetail(this.rowData.customerId);
    }

    removeRow() {
        this.customerTable.removeRow(this.index);
    }

    addRow() {
        let customerId = $(this.selectEl.nativeElement).val();
        if (customerId == "") {
            // warning for select
            $.notify({
                message: MSG.SF00502.WRN002
            }, {
                type: "warning",
                delay: 1000
            });
        } else {
            customerId = +customerId;
            // check if customer selected
            let notedCustomer = false;
            let noteList = this.page.pageData.increaseList.concat(this.page.pageData.decreaseList);
            for (let note of noteList) {
                if (note.customerId == customerId) {
                    // disable customer
                    notedCustomer = true;
                    break;
                }
            }
            if (notedCustomer) {
                // warning for select duplicate
                $.notify({
                    message: MSG.SF00502.WRN003
                }, {
                    type: "warning",
                    delay: 1000
                });
            } else {
                // add customer note
                this.customerTable.addRow(customerId);
                // reset select
                $(this.selectEl.nativeElement).val("").trigger("change");
            }
        }
    }

    //endregion

    //convertYenToThousanYen
    convertYenToThousanYen(value: number){
        return SF00502Helper.convertYenToThousanYen(value);
    }
}