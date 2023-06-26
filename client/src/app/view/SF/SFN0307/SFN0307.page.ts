import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {HeaderProvider} from "../SF00100/Header.provider";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonPage} from "../COMMON/common.page";
import {SFN0307Service} from "./SFN0307.service";
import {SFN0307Data} from "./SFN0307.data";
import Messages, {MSG} from "../../../helper/message";
import {CC00100Service} from "../../CC/CC00100/CC00100.service";
import {User} from "../../../model/core/User.model";
import {Constants} from "../../../helper/constants";
import {OrderItemModel} from "./model/OrderItem.model";
import {SFN0307Constants} from "./SFN0307.constants";
import {ShippingPlanModel} from "./model/ShippingPlan.model";
import {SFN0307Helper} from "./SFN0307.helper";
import {SDMDestination} from "../../../component/shipping-destination-modal/model/SDMDestination.model";
import {DEAL_STATUS_VALUES} from "../../../helper/mst-data-type";
import {PathUtil} from "../../../util/path-util";

// use OneUI
declare let OneUI: OneUI;

@Component({
    templateUrl: "SFN0307.page.html",
    styleUrls: ["SFN0307.page.css"],
    providers: [SFN0307Service],
    encapsulation: ViewEncapsulation.None
})
export class SFN0307Page extends CommonPage implements OnInit {

    // pageData
    pageData: SFN0307Data;
    // current User
    user: User;
    // order button preventDC
    orderBtnEnable: boolean;
    // is repeat
    isRepeat: boolean;
    // is create new shipping
    isShipping: boolean;

    // check deal repeat or order revision -> 3367
    isRepeatOrOderRevision: boolean = false;

    //region Initialize page
    constructor(public router: Router, public route: ActivatedRoute, public headerProvider: HeaderProvider,
                private service: SFN0307Service, authService: CC00100Service) {
        super(router, route, headerProvider);

        // init page data
        this.pageData = new SFN0307Data();
        service.pageData = this.pageData;

        // get current user
        this.user = authService.user;

        this.orderBtnEnable = true;
    }

    // init breadcrumb
    protected initBreadcrumb(): void {
        let self = this;

        let sf0301Path = "/home/deal/" + self.route.snapshot.params["dealCode"];

        self.headerProvider.reset();
        self.headerProvider.pageName = "受注登録（製造・出荷指示）";
        self.headerProvider.addBreadCrumb(Constants.TOP, [Constants.SLASH]); //Dashboard
        self.headerProvider.addBreadCrumb(Constants.DEAL_OVERVIEW_BREADCRUMB, [sf0301Path]); //SF003-01
        self.headerProvider.addBreadCrumb("受注登録");
    }

    //endregion

    // get data on page load
    ngOnInit(): void {

        this.service.navigateTo("受注登録（製造・出荷指示）", this.router.url);

        this.pageData.dealCode = this.route.snapshot.params["dealCode"];

        // check for repeat mode
        this.isRepeat = false;
        let paths = this.route.snapshot.pathFromRoot;
        if (paths.length > 1) {
            let checkpath = paths[paths.length - 2];
            let urls = checkpath.url;
            if (urls.length > 0) {
                if (urls[0].path == "repeat-order") {
                    this.isRepeat = true;
                }
            }
        }
        // check for add shipping mode
        this.isShipping = false;
        let productCode = this.route.snapshot.queryParams[SFN0307Constants.PARAM_PRODUCT];
        let stockNumberStr = this.route.snapshot.queryParams[SFN0307Constants.PARAM_STOCK];
        if (stockNumberStr != undefined) {
            let stockNumber = +stockNumberStr;
            if (!isNaN(stockNumber)) {
                this.pageData.shippingStock = stockNumber;
                this.pageData.shippingProduct = productCode;
                this.isShipping = true;
            }
        }

        // show loader
        OneUI.contentLoader('show');
        // notify loading
        let notify = $.notify({
            message: MSG.SFN0307.INF001
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 0
        });
        notify.update("progress", 10);
        // load data
        this.service.SFN030701().then(() => {
            // done
            this.notifyDone(notify);
            // verify can order deal
            let dealInfo = this.pageData.dealInfo;
            if (dealInfo.closedFlag == 1
                || dealInfo.templateFlag == 1
                || dealInfo.dealStatus < DEAL_STATUS_VALUES.DESIGN_CONFIRMED) {
                swal({
                        title: "",
                        text: Messages.get(MSG.SFN0307.ERR003),
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d26a5c",
                        confirmButtonText: "Yes",
                        closeOnConfirm: true
                    },
                    res => this.goBack()
                );
                return;
            }

            // setup orders
            for (let i = 0; i < this.pageData.orders.length; i++) {
                this.pageData.orders[i] = this.generateOrderProduct(this.pageData.orders[i].productId);
            }
            // set checked if only 1 order
            if (this.pageData.orders.length == 1) {
                this.pageData.orders[0].checked = true;
            }

            // set default screen mode
            if (this.isRepeat) {
                this.pageData.screenMode = SFN0307Constants.MODE_CREATE;
                this.pageData.canChangeMode = false;
                this.isRepeatOrOderRevision = true;
            } else {
                if (dealInfo.dealStatus == DEAL_STATUS_VALUES.DESIGN_CONFIRMED) {
                    this.pageData.screenMode = SFN0307Constants.MODE_CREATE;
                    // this.pageData.canChangeMode = false;
                } else {
                    this.pageData.screenMode = SFN0307Constants.MODE_UPDATE;
                    if (dealInfo.dealStatus == DEAL_STATUS_VALUES.ORDER_CONFIRMED
                                    || dealInfo.dealStatus == DEAL_STATUS_VALUES.SHIPPED) {
                        // this.pageData.canChangeMode = false;
                        this.isRepeatOrOderRevision = true;
                    } else {
                        this.pageData.canChangeMode = true;
                    }
                }
            }
        });
    }

    get orders(): OrderItemModel[] {
        return this.pageData.orders;
    }

    get screenMode(): number {
        return this.pageData.screenMode;
    }

    set screenMode(value: number) {
        this.pageData.screenMode = value;
        // change screen by mode
        this.initScreen();
    }

    get isModeChangable(): boolean {
        return this.pageData.canChangeMode;
    }

    //region Actions
    goBack() {
        this.navigate2(["home/deal", this.pageData.dealInfo.dealCode]).then(null);
    }

    viewProductInfo(index: number): void {
        let dealCode = this.pageData.dealInfo.dealCode;
        let product = this.pageData.orders[index].product;
        let productType = product.type;
        let shapeId = product.shapeId;
        let productCode = product.code;
        let cartonShippingType = product.cartonShippingType;
        PathUtil.redirectToPageProduct(this.router,dealCode,productCode,productType,shapeId,cartonShippingType);
    }

    initScreen() {
        // note screen real mode
        if (this.pageData.screenMode == SFN0307Constants.MODE_CREATE
            && this.pageData.dealInfo.dealStatus > DEAL_STATUS_VALUES.ORDER_CONFIRMED) {
            this.isRepeat = true;
        } else {
            this.isRepeat = false;
        }
        // setup orders
        for (let i = 0; i < this.pageData.orders.length; i++) {
            this.pageData.orders[i] = this.generateOrderProduct(this.pageData.orders[i].productId);
        }
        // set checked if only 1 order
        if (this.pageData.orders.length == 1) {
            this.pageData.orders[0].checked = true;
        }
    }

    saveDestination(destination: SDMDestination): Promise<void> {
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        let notify = $.notify({
            message: MSG.SFN0307.INF004
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 140000,
            z_index: 2000
        });
        notify.update("progress", 10);
        return this.service.SFN030702(destination).then(() => {
            this.notifyDone(notify);
        }, (err) => {
            this.notifyError(notify);
            swal({
                title: Constants.BLANK,
                text: MSG.SFN0307.ERR005,
                confirmButtonColor: '#66ccff',
                confirmButtonText: "閉じる",
            }, () => {
                this.goBack();
            });
        });
    }

    exportPdf(index: number) {
        let productId = this.pageData.orders[index].productId;
        this.service.SFN030704(productId)
            .then(result => {
                $.notify({message: Messages.get(MSG.SF00307.INF002)}, {type: 'success'});
                let link = document.createElement('a');
                link.setAttribute('target', '_blank');
                link.href = result.filePath;
                link.click();
            })
            .catch(err => {
                swal(Constants.BLANK, Messages.get(MSG.SF00307.ERR004), "error")
            });
    }

    addOrder() {
        // validate input
        let validated = this.validate();

        if (!validated) {
            return;
        }
        // do order
        this.orderBtnEnable = false;
        // call service to create/update
        // show loader
        OneUI.contentLoader('show');
        // notify loading
        let notify = $.notify({
            message: MSG.SFN0307.INF003
        }, {
            allow_dismiss: false,
            showProgressbar: true,
            delay: 140000,
            z_index: 2000
        });
        notify.update("progress", 10);
        // call service
        this.service.SFN030703().then(() => {
            // re-enable button
            this.orderBtnEnable = true;
            // show success
            this.notifyDone(notify);
            swal({
                title: Constants.BLANK,
                text: MSG.SFN0307.INF002,
                confirmButtonColor: '#66ccff',
                confirmButtonText: "閉じる",
                customClass: "order-success-msg"
            }, () => {
                this.reloadPage();
            });
        }, (err) => {
            this.notifyError(notify);
            swal({
                title: Constants.BLANK,
                text: MSG.SFN0307.ERR004,
                confirmButtonColor: '#66ccff',
                confirmButtonText: "閉じる",
            }, () => {
                this.goBack();
            });
        });
    }

    reloadPage() {
        this.router.navigateByUrl('/blank', {skipLocationChange: true}).then(() => {
            this.navigate2(['/home/deal', this.pageData.dealInfo.dealCode, 'order'], {replaceUrl: true});
        });
    }

    //endregion

    //region functions

    private notifyDone(notify: NotifyReturn): void {
        // notify update and close
        notify.update("progress", 100);
        notify.update("type", "success");
        setTimeout((ntf: NotifyReturn) => {
            ntf.close();
        }, 1000, notify);
        // hide content loader
        OneUI.contentLoader('hide');
    }

    private notifyError(notify: NotifyReturn): void {
        // notify update and close
        notify.update("progress", 100);
        notify.update("type", "danger");
        setTimeout((ntf: NotifyReturn) => {
            ntf.close();
        }, 1000, notify);
        // hide content loader
        OneUI.contentLoader('hide');
    }

    private generateOrderProduct(productId: number): OrderItemModel {
        let order = new OrderItemModel();
        // productId
        order.productId = productId;
        // product
        let product = this.pageData.dataRepo.getProduct(productId);
        order.product = product;

        // order
        let oldOrder = this.pageData.dataRepo.getOrder(productId);
        if (oldOrder == undefined) {
            // first time
            // checked
            order.checked = false;
            // quantity
            order.quantity = product.lot;
            // default shipping plan
            let shippingPlan = SFN0307Helper.createNewShipping(order, this.pageData);
            order.shippings = [shippingPlan];
            // no
            shippingPlan.no = 0;
            // productionSpecs
            if (!SFN0307Helper.isRevProduct(product)) {
                order.productionSpecs = 1;
            } else {
                order.productionSpecs = 2;
            }

            //http://fridaynight.vnext.vn/issues/2998
            if(this.pageData.dealInfo.dealType == 2) {
                order.productionSpecs = 2;
            }

            // printVersion
            order.printVersion = 2;
            // wooden
            order.wooden = 2;
            // mold
            order.mold = 1;
            // passageOrder
            order.passageOrder = "";
            // sampleLift
            order.sampleLift = 0;
            // sampleSales
            order.sampleSales = 0;
            // sampleCustomer
            order.sampleCustomer = 0;
            // sampleItem
            order.sampleItem = 0;
            // sampleProduct
            order.sampleProduct = 0;

            order.pib_customerManagedId = "";
            order.customerManagedId = "";
        } else {
            // not first time
            // checked
            order.checked = true;
            // quantity
            order.quantity = oldOrder.quantity;
            // unit price (trigger calculate)
            order.unitPrice = oldOrder.unitPrice;
            order.pib_unitPrice = oldOrder.unitPrice;

            order.orderCode = oldOrder.orderCode;
            order.orderCode2 = oldOrder.orderCode2;
            // 相手管理No
            order.pib_customerManagedId = oldOrder.pib_customerManagedId;
            order.customerManagedId = oldOrder.customerManagedId;


            let shippings = [];
            order.shippings = shippings;
            if (!this.isRepeat) {
                // update
                order.id = oldOrder.id;
                // productionSpecs
                order.productionSpecs = oldOrder.productionSpecs;
                // printVersion
                order.printVersion = oldOrder.printVersion;
                // wooden
                order.wooden = oldOrder.wooden;
                // mold
                order.mold = oldOrder.mold;
                // passageOrder
                order.passageOrder = oldOrder.passageOrder;
                // sampleLift
                order.sampleLift = oldOrder.sampleLift;
                // sampleSales
                order.sampleSales = oldOrder.sampleSales;
                // sampleCustomer
                order.sampleCustomer = oldOrder.sampleCustomer;
                // sampleItem
                order.sampleItem = oldOrder.sampleItem;
                // sampleProduct
                order.sampleProduct = oldOrder.sampleProduct;
                // shipping
                for (let oldShipping of oldOrder.shippings) {
                    let shipping = new ShippingPlanModel();
                    shippings.push(shipping);
                    // id
                    shipping.id = oldShipping.id;
                    // no
                    shipping.no = oldShipping.no;
                    // shippingDate
                    shipping.shippingDate = oldShipping.shippingDate;
                    // deliveryDate
                    shipping.deliveryDate = oldShipping.deliveryDate;
                    // loadingAddressId
                    shipping.loadingAddressId = oldShipping.loadingAddressId;
                    // loadingAddressName
                    shipping.loadingAddressName = oldShipping.loadingAddressName;
                    // quantity
                    shipping.quantity = oldShipping.quantity;
                    // shippingCompany
                    shipping.shippingCompany = oldShipping.shippingCompany;
                    // specifyTime
                    shipping.specifyTime = oldShipping.specifyTime;
                    // specifyTimeHour
                    shipping.specifyTimeHour = oldShipping.specifyTimeHour;
                    // specifyTimeMinute
                    shipping.specifyTimeMinute = oldShipping.specifyTimeMinute;
                    // specifyTimePeriod
                    shipping.specifyTimePeriod = oldShipping.specifyTimePeriod;
                    // destinationId
                    shipping.destinationId = oldShipping.destinationId;
                    // specifyTimeStr
                    shipping.specifyTimeStr = oldShipping.specifyTimeStr;
                }

                // shipping stock
                if (this.isShipping) {
                    // check for right product
                    if (this.pageData.shippingProduct == product.code) {
                        // add new shipping
                        let shipping = SFN0307Helper.createNewShipping(order, this.pageData);
                        shipping.quantity = this.pageData.shippingStock;
                        shippings.push(shipping);
                    }
                }
            } else {
                // repeat
                // productionSpecs
                order.productionSpecs = 4;
                // printVersion
                order.printVersion = 4;
                // wooden
                order.wooden = 4;
                // mold
                order.mold = 1;
                // passageOrder
                // issue 3367
                order.passageOrder = oldOrder.passageOrder;
                // sampleLift
                order.sampleLift = 0;
                // sampleSales
                order.sampleSales = 0;
                // sampleCustomer
                order.sampleCustomer = 0;
                // sampleItem
                order.sampleItem = 0;
                // sampleProduct
                order.sampleProduct = 0;
                // shipping
                for (let oldShipping of oldOrder.shippings) {
                    let shipping = new ShippingPlanModel();
                    shippings.push(shipping);
                    // no
                    shipping.no = oldShipping.no;
                    // quantity
                    shipping.quantity = oldShipping.quantity;
                    // specifyTimeHour
                    shipping.specifyTimeHour = oldShipping.specifyTimeHour;
                    // specifyTimeMinute
                    shipping.specifyTimeMinute = oldShipping.specifyTimeMinute;
                    // specifyTimePeriod
                    shipping.specifyTimePeriod = oldShipping.specifyTimePeriod;
                    // issue 3367
                    // loadingAddressId
                    shipping.loadingAddressId = oldShipping.loadingAddressId;
                    shipping.loadingAddressName = oldShipping.loadingAddressName;
                    // shippingCompany
                    shipping.shippingCompany = oldShipping.shippingCompany;
                    // specifyTime
                    shipping.specifyTime = oldShipping.specifyTime;
                    // specifyTimeStr
                    shipping.specifyTimeStr = oldShipping.specifyTimeStr;
                    // destinationId
                    shipping.destinationId = oldShipping.destinationId;
                }
                // create default shipping if no shipping plan (IF mistake)
                if (shippings.length == 0) {
                    // default shipping plan
                    let shippingPlan = SFN0307Helper.createNewShipping(order, this.pageData);
                    order.shippings = [shippingPlan];
                    // no
                    shippingPlan.no = 0;
                }
            }
            // re-sort shipping by no
            shippings.sort((s1, s2) => {
                return s1.no - s2.no;
            });
        }

        return order;
    }

    private validate(): boolean {
        // require
        if ($(".input-required").length > 0) {
            // illegal way
            $.notify({message: Messages.get(MSG.SFN0307.ERR001)}, {type: 'danger'});
            return false;
        }
        // order number
        let checkedNumber = this.orders.filter(order => order.checked).length;
        if (checkedNumber == 0) {
            $.notify({message: Messages.get(MSG.SFN0307.ERR002)}, {type: 'danger'});
            return false;
        }

        return true;
    }

    //endregion
}