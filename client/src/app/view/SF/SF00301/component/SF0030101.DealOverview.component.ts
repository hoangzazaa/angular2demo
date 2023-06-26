import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {default as Messages, MSG} from "../../../../helper/message";
import {DEAL_STATUS, DEAL_STATUS_VALUES, NEW_DEAL_TYPE} from "../../../../helper/mst-data-type";
import DataUtil from "../../../../util/data-util";
import {FormatUtil} from "../../../../util/format-util";
import ValidatorUtil from "../../../../util/validator-util";
import {SF00301_Customer} from "../model/SF00301_Customer.model";
import {SF00301_Deal} from "../model/SF00301_Deal.model";
import {SF00301_Department} from "../model/SF00301_Department.model";
import {SF00301_User} from "../model/SF00301_User.model";
import {SF00301Data} from "../SF00301.data";
import {SF00301Service} from "../SF00301.service";

interface Select2Options {
    tags?: any;
    allowClear?: any;
    language?: {noResults: () => string} | any;
    escapeMarkup?: any;
    processResults?: any;
    templateResult?: (object: Select2SelectionObject) => any;
    placeholder?: string | IdTextPair;
    minimumResultsForSearch?: number;
    createTag?: (params) => any;
    insertTag?: (data, tag) => any;
}

interface Select2SelectionObject {
    loading: boolean;
    disabled: boolean;
    element: HTMLOptionElement;
    id: string;
    selected: boolean;
    text: string;
    title: string;
    newOption: any;
}

@Component({
    selector: "sf0030101-dealOverview",
    templateUrl: "SF0030101.DealOverview.component.html",
    styleUrls: ['SF0030101.DealOverview.component.css']
})
export class SF0030101Component implements AfterViewInit, OnInit {

    static MODE_COPY: symbol = Symbol("SF00301Service.MODE_COPY");
    @Input() deal: SF00301_Deal;
    @Input() departments: SF00301_Department[];
    @Input() customers: SF00301_Customer[];
    @Input() loginUser: SF00301_User;
    @Input() canSelectCustomer: boolean;
    @Input() defaultDeliveryDate: Date;

    @Output() requestSubmitDeal: EventEmitter<any> = new EventEmitter<any>();
    @Output() requestOrder: EventEmitter<string> = new EventEmitter<string>();
    @Output() requestDesign: EventEmitter<void> = new EventEmitter<void>();
    @Output() requestCancel: EventEmitter<void> = new EventEmitter<void>();

    private SELECT_NONE: number = -1;
    private stagingDepIndex: number = this.SELECT_NONE;
    private stagingPicIndex: number = this.SELECT_NONE;

    private customersDatasourceLoaded: boolean = false;

    get pageData(): SF00301Data{
        return this.sf00301Service.pageData;
    }

    ngOnInit(): void {
        // clone sale deal
        // http://fridaynight.vnext.vn/issues/2795
        this.pageData.departmentIdTmp = DataUtil.cloneObject(this.deal).saler.department.id;
    }

    private select2Option: Select2Options = {
        tags: true,
        language: {
            noResults: function () {
                return "No any customer";
            }
        },
        escapeMarkup: function (markup) {
            return markup;
        },
        createTag: (params) => {
            return {
                id: this.sf00301Service.nextNegativeId(),
                text: params.term.slice(0, 30),
                newOption: true
            }
        },
        templateResult: (data: Select2SelectionObject) => {
            let $result = $("<span></span>");

            $result.text(data.text);

            if (data.newOption) {
                $result.append(" <em>(new)</em>");
            }

            return $result;
        },
        placeholder: "得意先名",
        minimumResultsForSearch: 0
    };

    constructor(private sf00301Service: SF00301Service) {
    }

    ngAfterViewInit(): void {
        this.manipulateCustomers(this.deal.saler);
        this.highlightCurrentPIC();
    }

    private clearDealNameErrMsg() {
        let errEl = $("#dealName-error");
        errEl.parent().parent().removeClass("has-error");
        errEl.remove();
    }

    private manipulateCustomers(saler: SF00301_User) {
        let self = this;
        self.customersDatasourceLoaded = false;

        let departmentForCustomersSource = null;
        if (!!saler.department) {
            departmentForCustomersSource = saler.department.id;
        }

        if (!!departmentForCustomersSource) {
            self.sf00301Service
                .getCustomers(departmentForCustomersSource)
                .then(resultList => {
                    self.applyCustomersList(resultList);
                });
        } else {
            self.applyCustomersList([]);
        }
    }

    private applyCustomersList(customers: SF00301_Customer[]) {
        let self = this;
        self.customers = customers;

        if (self.deal.customer) {
            // trường hợp deal có customer, và customer ko trực thuộc sale của deal quản lý thì vẫn phải add vào list
            // để duplicate
            let customer = self.customers.find(item => item.id == self.deal.customer.id);
            // nếu customer có trong deal nhưng không có trong list customers thì add thêm vào
            if(!!self.deal.customer.id && !customer){
                self.customers.unshift(self.deal.customer);
            }else if (!self.deal.customer.id && !customer) {
                let customer: SF00301_Customer = new SF00301_Customer();
                customer.id = self.sf00301Service.nextNegativeId();
                customer.customerName = self.deal.customer.customerName;
                self.deal.customer = customer;
                // clone customer
                // add customer to list customers
                self.customers.unshift(self.deal.customer);
            }

            if(!!!this.pageData.isUpdated){
                this.pageData.customerTmp = DataUtil.cloneObject(self.deal.customer);
            }
        }

        //check sale clone and isUpdated
        if(!!this.sf00301Service.pageData.isUpdated){
            if(this.pageData.departmentIdTmp == this.deal.saler.department.id){
                this.deal.customer = this.pageData.customerTmp;
            }
        }

        let $select2El = $("#customerSelector");
        if (!$select2El.length)
            return;

        // turn on this flag will show select2 element, it's took a litle time before we can initialize select2,
        // so setTimeout is needed
        self.customersDatasourceLoaded = true;
        setTimeout(() => {
            $select2El
                .select2(self.select2Option)
                .on("select2:select", (event: any) => {
                    let id = parseInt(event.target.value);
                    let cus: SF00301_Customer = self.customers.find(item => item.id == id);
                    if (!cus) { // for new customer who is not register to system
                        cus = new SF00301_Customer();
                        cus.id = id; // id always let then zero (negative number)
                        cus.customerName = event.target.options[event.target.selectedIndex].text;
                        self.deal.customerId = undefined;
                    }else{
                        self.deal.customerName = undefined;
                    }
                    self.deal.customer = cus;

                    // set save state is false
                    self.deal.hasRegisteredCustomer = false;
                    // check page is updated
                    this.sf00301Service.pageData.isUpdated = true;
                })
                .val(self.deal.customer ? self.deal.customer.id : null)
                .trigger("change");
            $(".select2-search__field").css({"outline": "0 !important;"});
        }, 50);
    }

    get dealType(): number {
        if (ValidatorUtil.isEmpty(this.deal.id) || this.sf00301Service.pageData.screenMode === SF00301Service.MODE_COPY) {
            if (!this.deal.isSaveCustomer) {
                $('.select2-selection__rendered').css({"border": "solid 2px #5c90d2", "border-radius": "3px"});
            }
        }
        return this.deal.dealType;
    }

    set dealType(value:number){
        this.deal.dealType = value;
    }

    get dealTypeOption(){
        //http://fridaynight.vnext.vn/issues/2944
        return NEW_DEAL_TYPE;
    }

    /**
     * @deprecated Use SF00301_Deal::dealStatusDisplayName
     */
    get dealStatus(): string {
        return this.deal.dealStatusDisplayName;
    }

    get canRequestOrder(): boolean {
        return (this.deal.dealStatus >= DEAL_STATUS_VALUES.DESIGN_CONFIRMED && this.deal.dealStatus < DEAL_STATUS_VALUES.SHIPPED);
    }

    get canRepeatOrder(): boolean {
        return this.deal.dealStatus == DEAL_STATUS_VALUES.SHIPPED;
    }

    onRequestOrder(): void {
        if (this.canRequestOrder && !this.deal.isClosed) {
            this.requestOrder.emit("REQUEST_ORDER");
        }
    }

    onRepeatOrder(): void {
        if (this.canRepeatOrder && !this.deal.isClosed) {
            this.requestOrder.emit("REPEAT_ORDER");
        }
    }

    onRequestDesign(): void {
        if (this.deal.canRequestDesign && !this.deal.isClosed && !this.deal.isJobInprocess)
            this.requestDesign.emit();
    }

    submitDeal(): void {
        if (this.validateForm()) {
            this.requestSubmitDeal.emit();
        } else {
            $.notify({message: Messages.get(MSG.SF00301.ERR015)}, {type: 'danger'});
        }
    }

    cancel(): void {
        this.requestCancel.emit();
    }

    removeCustomer() {
        $("#customerSelector").select2().val(null).trigger("change").select2(this.select2Option);
        this.deal.customer = null;
        this.deal.isSaveCustomer = true;
        // check page is updated
        this.sf00301Service.pageData.isUpdated = true;
    }

    toggleBookmark(): void {
        this.sf00301Service.toggleBookmark(this.deal).then(result => {
            this.deal.isInMybox = result;
        })
    }

    toggleLock(): void {
        this.sf00301Service.toggleLock(this.deal).then(result => {
            this.deal.isInLock = result;
        })
    }

    showModalToAssignPIC() {
        $("#modalSelectPIC").modal('show');
    }

    applyStagingPIC(): void {
        if (!this.choosingPIC)
            return;

        this.deal.saler = this.choosingPIC;
        this.manipulateCustomers(this.deal.saler);
        this.hideModalToAssignPIC();
        this.sf00301Service.pageData.isUpdated = true;
    }

    hideModalToAssignPIC() {
        $("#modalSelectPIC").modal("hide");
        this.highlightCurrentPIC();
    }

    resetPIC() {
        if (this.deal.saler.id != this.loginUser.id) {
            this.deal.saler = this.loginUser;
            this.manipulateCustomers(this.deal.saler);
            this.highlightCurrentPIC();
            this.sf00301Service.pageData.isUpdated = true;
            if (!this.deal.customer || !this.deal.customer.customerName) {
                this.deal.isSaveCustomer = true;
            }
        }
    }

    get deliveryDate(): Date {
        return this.deal.deliveryDate;
    }

    setDeliveryDate(value: Date): void {
        let dateBefore = FormatUtil.formatDateToString(this.deal.deliveryDate + "", "yyyy/MM/dd");
        let dateAfter = FormatUtil.formatDateToString(value + "", "yyyy/MM/dd");
        if (dateBefore != dateAfter) {
            this.changeData();
        }
        this.deal.deliveryDate = value;
        //this.validateForm();
    }

    get saleNameFolowByDepartment(): string {
        let ret = "";

        if (!!this.deal.saler) {
            ret += this.deal.saler.username;

            if (!!this.deal.saler.department)
                ret = this.deal.saler.department.departmentName + "／" + ret;
        }

        return ret;
    }

    private highlightCurrentPIC() {
        this.stagingDepIndex = this.findDepIndex(this.deal.saler);
        this.stagingPicIndex = this.findSaleIndex(this.deal.saler);
    }

    get choosingDep(): SF00301_Department {
        return this.stagingDepIndex !== this.SELECT_NONE ? this.departments[this.stagingDepIndex] : null;
    }

    get choosingPIC(): SF00301_User {
        return this.stagingPicIndex !== this.SELECT_NONE ? this.allUsersOfChoosingDep[this.stagingPicIndex] : null;
    }

    get allUsersOfChoosingDep(): SF00301_User[] {
        return !this.choosingDep ? [] : this.choosingDep.users || [];
    }

    get dealName(): string {
        return this.deal.dealName;
    }

    set dealName(value: string) {
        this.deal.dealName = value;
        //this.validateForm();
    }

    get estTotalDeal(): number {
        return this.deal.estTotalDeal;
    }

    set estTotalDeal(value: number) {
        this.deal.estTotalDeal = value;
        //this.validateForm();
    }

    onDeparmentChanged(index: number) {
        this.stagingDepIndex = index;
        this.stagingPicIndex = this.SELECT_NONE;
    }

    onPicChanged(index: number) {
        this.stagingPicIndex = index;
    }

    private findDepIndex(saler: SF00301_User) {
        let index = this.departments.findIndex(dep => dep.hasUser(saler));
        return index === -1 ? this.SELECT_NONE : index;
    }

    private findSaleIndex(saler: SF00301_User) {
        let index = this.allUsersOfChoosingDep.findIndex(usr => usr.id === saler.id);
        return index === -1 ? this.SELECT_NONE : index;
    }

    get defaultFieldBorderCss(): {style: string, radius: string} {
        return {style: "solid 2px #5c90d2", radius: "3px"};
    }

    get errFieldBorderCss(): {style: string, radius: string} {
        return {style: "solid 2px #FF0000", radius: "3px"};
    }

    get noneFieldBorderCss(): {style: string, radius: string} {
        return {style: "", radius: ""};
    }

    get checkBorderDealName(): {style: string, radius: string} {
        if (ValidatorUtil.isNotEmpty(this.deal.id) && this.sf00301Service.pageData.screenMode !== SF00301Service.MODE_COPY) {
            if (this.deal.isSaveDealName) {
                return this.errFieldBorderCss;
            } else {
                return this.noneFieldBorderCss;
            }
        } else {
            if (this.deal.isSaveDealName) {
                return this.errFieldBorderCss;
            } else {
                return this.defaultFieldBorderCss;
            }
        }
    }

    get checkBorderDealType(): {style: string, radius: string} {
        if (ValidatorUtil.isNotEmpty(this.deal.id) && this.sf00301Service.pageData.screenMode !== SF00301Service.MODE_COPY) {
            return this.noneFieldBorderCss;
        } else {
            return this.defaultFieldBorderCss;
        }
    }

    get checkBorderDeliveryDate(): {style: string, radius: string} {
        if (ValidatorUtil.isNotEmpty(this.deal.id) && this.sf00301Service.pageData.screenMode !== SF00301Service.MODE_COPY) {
            if (this.deal.isSaveDeliveryDate) {
                return this.errFieldBorderCss;
            } else {
                return this.noneFieldBorderCss;
            }
        } else {
            if (this.deal.isSaveDeliveryDate) {
                return this.errFieldBorderCss;
            } else {
                return this.defaultFieldBorderCss;
            }
        }
    }

    get checkBorderEstimate(): {style: string, radius: string} {

        if (ValidatorUtil.isEmpty(this.deal.id) || this.sf00301Service.pageData.screenMode == SF00301Service.MODE_COPY) {
            return this.defaultFieldBorderCss;
        } else {
            return this.noneFieldBorderCss;
        }
    }

    // validate form data deal
    private validateForm(): boolean {
        let isValidate = true;

        // check deal name
        if (!this.deal.dealName) {
            this.deal.isSaveDealName = true;
            // check validate false
            isValidate = false;
        } else {
            this.deal.isSaveDealName = false;
        }

        // check customer
        if (!this.deal.customer || (!this.deal.customer && ValidatorUtil.isEmpty(this.deal.customer.customerName))) {
            this.deal.isSaveCustomer = true;
            $('.select2-selection__rendered').css({"border": "solid 2px red", "border-radius": "3px"});
            // check validate false
            isValidate = false;
        } else {
            this.deal.isSaveCustomer = false;
            $('.select2-selection__rendered').css({"border": "solid 2px white", "border-radius": "3px"});
        }


        // check delivery date
        if (!this.deal.deliveryDate) {
            this.deal.isSaveDeliveryDate = true;
            // check validate false
            isValidate = false;
        } else {
            this.deal.isSaveDeliveryDate = false;
        }

        return isValidate;
    }

    changeData() {
        this.sf00301Service.pageData.isUpdated = true;
    }
}
