"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var common_service_1 = require("../../../service/common.service");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var DealModel_1 = require("../COMMON/dealinfo/model/DealModel");
var OrderItem_model_1 = require("./model/OrderItem.model");
var Product_model_1 = require("./model/Product.model");
var Department_model_1 = require("./model/Department.model");
var User_model_1 = require("./model/User.model");
var format_util_1 = require("../../../util/format-util");
var date_util_1 = require("../../../util/date-util");
var Customer_model_1 = require("./model/Customer.model");
var ProductInfoBox_helper_1 = require("../../../component/product-info-box/ProductInfoBox.helper");
var ShippingPlan_model_1 = require("./model/ShippingPlan.model");
var SpecifyTimeModal_helper_1 = require("../../../component/specify-time-modal/SpecifyTimeModal.helper");
var ShippingDestination_model_1 = require('./model/ShippingDestination.model');
var ShippingDestinationModal_helper_1 = require("../../../component/shipping-destination-modal/ShippingDestinationModal.helper");
var LoadingAddress_model_1 = require("./model/LoadingAddress.model");
var MstPaper_model_1 = require("../../../model/core/MstPaper.model");
var MstLamination_model_1 = require("../../../model/core/MstLamination.model");
var SFN0307Service = (function (_super) {
    __extends(SFN0307Service, _super);
    function SFN0307Service(http, router) {
        _super.call(this, http, router);
    }
    /**
     * send SFN030701 post request
     * @returns {Promise<TResult>}
     */
    SFN0307Service.prototype.SFN030701 = function () {
        var _this = this;
        var req = {
            dealCode: this.pageData.dealCode
        };
        return this.postApi("/SFN030701", req).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            if (messageCode == "INF001") {
                // INF001 data
                var pageData = _this.pageData;
                var dataRepo = pageData.dataRepo;
                // 1. department
                var departmentData = data["department"];
                var department = new Department_model_1.DepartmentModel();
                // id
                department.id = departmentData["id"];
                // name
                department.name = departmentData["name"];
                // 2. user
                var userData = data["user"];
                var user = new User_model_1.UserModel();
                // id
                user.id = userData["id"];
                // name
                user.name = userData["name"];
                // department
                user.departmentId = userData["departmentId"];
                // 3. customer
                var customerData = data["customer"];
                var customer = new Customer_model_1.CustomerModel();
                pageData.customer = customer;
                // id
                customer.id = customerData["id"];
                // name
                customer.name = customerData["name"];
                // code
                customer.code = customerData["code"];
                // 4. deal
                var dealData = data["deal"];
                var deal = new DealModel_1.DealInfoModel();
                pageData.dealInfo = deal;
                // id
                deal.dealId = dealData["id"];
                // dealCode
                deal.dealCode = dealData["dealCode"];
                // dealName
                deal.dealName = dealData["dealName"];
                // customer code
                deal.customerCode = customer.code;
                // customer name
                deal.customerName = customer.name;
                // salerId
                deal.saleName = format_util_1.FormatUtil.formatSalesName(department.name, user.name);
                // dealType
                deal.dealType = dealData["dealType"];
                // dealStatus
                deal.dealStatus = dealData["dealStatus"];
                // deliveryDate
                deal.deliveryDate = date_util_1.DateUtil.getDate(dealData["deliveryDate"]);
                // estTotalDeal
                deal.estimateTotal = dealData["estTotalDeal"];
                // templateFlag
                deal.templateFlag = dealData["templateFlag"];
                // closedFlag
                deal.closedFlag = dealData["closedFlag"];
                // 5. products
                var productsData = data["products"];
                var orders = [];
                pageData.orders = orders;
                for (var _i = 0, productsData_1 = productsData; _i < productsData_1.length; _i++) {
                    var productData = productsData_1[_i];
                    var product = new Product_model_1.ProductModel();
                    // id
                    product.id = productData["id"];
                    // 製品ID/ Product ID
                    product.code = productData["productCode"];
                    // 製品種類/ Product type
                    product.type = productData["productType"];
                    product.type_name = ProductInfoBox_helper_1.ProductInfoBoxHelper.getProductTypeName(product.type);
                    // 製品名/ Product name
                    product.name = productData["productName"];
                    // 品目C/Hạng mục C
                    product.itemCode = productData["itemCode"];
                    // メモ/ Memo
                    var memo1 = productData["memo1"];
                    var memo2 = productData["memo2"];
                    var memo3 = productData["memo3"];
                    product.memo = ProductInfoBox_helper_1.ProductInfoBoxHelper.getMemo(memo1, memo2, memo3);
                    // 得意先製品番号/ Mã product của customer
                    product.customerProductCode = productData["customerProductCode"];
                    // 製造依頼先/ Nơi request production
                    var factoryId = productData["factoryId"];
                    product.manufacture = ProductInfoBox_helper_1.ProductInfoBoxHelper.getManufacture(factoryId);
                    // ロット/ Lot
                    product.lot = productData["lot"];
                    // Image
                    product.image = productData["imgUrl"];
                    // update date
                    product.updateDate = date_util_1.DateUtil.getDate(productData["updateDate"]);
                    // shapeId
                    product.shapeId = productData["shapeId"];
                    // laminationFlute
                    product.laminationFlute = productData["laminationFlute"];
                    // laminationPaperTypeA
                    product.laminationPaperTypeA = productData["laminationPaperTypeA"];
                    // laminationPaperTypeB
                    product.laminationPaperTypeB = productData["laminationPaperTypeB"];
                    // laminationABasicWeight
                    product.laminationABasicWeight = productData["laminationABasicWeight"];
                    // laminationBBasicWeight
                    product.laminationBBasicWeight = productData["laminationBBasicWeight"];
                    // laminationPaperTypeFront
                    product.laminationPaperTypeFront = productData["laminationPaperTypeFront"];
                    // laminationPaperTypeBack
                    product.laminationPaperTypeBack = productData["laminationPaperTypeBack"];
                    // laminationPaperTypeMedium
                    product.laminationPaperTypeMedium = productData["laminationPaperTypeMedium"];
                    // laminationFrontBasicWeight
                    product.laminationFrontBasicWeight = productData["laminationFrontBasicWeight"];
                    // laminationMediumBasicWeight
                    product.laminationMediumBasicWeight = productData["laminationMediumBasicWeight"];
                    // laminationBackBasicWeight
                    product.laminationBackBasicWeight = productData["laminationBackBasicWeight"];
                    // laminationAId
                    product.laminationAId = productData["laminationAId"];
                    // laminationBId
                    product.laminationBId = productData["laminationBId"];
                    // laminationFrontId
                    product.laminationFrontId = productData["laminationFrontId"];
                    // laminationBackId
                    product.laminationBackId = productData["laminationBackId"];
                    // laminationMediumId
                    product.laminationMediumId = productData["laminationMediumId"];
                    // printMethod
                    product.printMethod = productData["printMethod"];
                    // colorIdF
                    product.colorIdF = productData["colorIdF"];
                    // specialColorF
                    product.specialColorF = productData["specialColorF"];
                    // colorIdB
                    product.colorIdB = productData["colorIdB"];
                    // specialColorB
                    product.specialColorB = productData["specialColorB"];
                    // 木型情報
                    product.woodenExpiredDate = productData["woodenExpiredDate"];
                    product.hasWooden = !!productData["hasWooden"];
                    // size
                    // サイズ/ Size
                    product.sizeW = productData["sizeW"];
                    product.sizeD = productData["sizeD"];
                    product.sizeH = productData["sizeH"];
                    product.paperSizeW = productData["paperSizeW"];
                    product.paperSizeH = productData["paperSizeH"];
                    product.size = ProductInfoBox_helper_1.ProductInfoBoxHelper.getDimension(product);
                    product.cartonShippingType = productData["cartonShippingType"];
                    // parse paper and color
                    product.mstLaminations = [];
                    product.paper = new MstPaper_model_1.MstPaper();
                    var paper = productData["paper"];
                    if (!!paper) {
                        product.paper.id = paper["id"];
                        product.paper.name = paper["paperName"] == null ? paper["paperName"] : paper["materialName"];
                    }
                    var laminationPaperTypeAJson = productData["laminationPaperTypeAJson"];
                    if (!!laminationPaperTypeAJson) {
                        product.mstLaminations.push(_this.parsePaper(laminationPaperTypeAJson));
                    }
                    var laminationPaperTypeBJson = productData["laminationPaperTypeBJson"];
                    if (!!laminationPaperTypeBJson) {
                        product.mstLaminations.push(_this.parsePaper(laminationPaperTypeBJson));
                    }
                    var laminationPaperTypeFrontJson = productData["laminationPaperTypeFrontJson"];
                    if (!!laminationPaperTypeFrontJson) {
                        product.mstLaminations.push(_this.parsePaper(laminationPaperTypeFrontJson));
                    }
                    var laminationPaperTypeBackJson = productData["laminationPaperTypeBackJson"];
                    if (!!laminationPaperTypeBackJson) {
                        product.mstLaminations.push(_this.parsePaper(laminationPaperTypeBackJson));
                    }
                    var laminationPaperTypeMediumJson = productData["laminationPaperTypeMediumJson"];
                    if (!!laminationPaperTypeMediumJson) {
                        product.mstLaminations.push(_this.parsePaper(laminationPaperTypeMediumJson));
                    }
                    var laminationAJson = productData["laminationAJson"];
                    if (!!laminationAJson) {
                        product.mstLaminations.push(_this.parsePaper(laminationAJson));
                    }
                    var laminationBJson = productData["laminationBJson"];
                    if (!!laminationBJson) {
                        product.mstLaminations.push(_this.parsePaper(laminationBJson));
                    }
                    var laminationFrontJson = productData["laminationFrontJson"];
                    if (!!laminationFrontJson) {
                        product.mstLaminations.push(_this.parsePaper(laminationFrontJson));
                    }
                    var laminationBackJson = productData["laminationBackJson"];
                    if (!!laminationBackJson) {
                        product.mstLaminations.push(_this.parsePaper(laminationBackJson));
                    }
                    var laminationMediumJson = productData["laminationMediumJson"];
                    if (!!laminationMediumJson) {
                        product.mstLaminations.push(_this.parsePaper(laminationMediumJson));
                    }
                    // 材料/ Vật liệu
                    product.material = ProductInfoBox_helper_1.ProductInfoBoxHelper.getMaterial(product, product.mstLaminations);
                    // add to repo
                    dataRepo.setProduct(product, product.id);
                    // create placeholder order
                    var order = new OrderItem_model_1.OrderItemModel();
                    order.productId = product.id;
                    orders.push(order);
                }
                // 6. orderItems
                var ordersData = data["orderItems"];
                for (var _a = 0, ordersData_1 = ordersData; _a < ordersData_1.length; _a++) {
                    var orderData = ordersData_1[_a];
                    var order = new OrderItem_model_1.OrderItemModel();
                    // id
                    order.id = orderData["id"];
                    // product
                    order.productId = orderData["productId"];
                    // quantity
                    order.quantity = orderData["quantity"];
                    // orderCode
                    order.orderCode = orderData["orderCode"];
                    // orderCode
                    order.orderCode2 = orderData["orderCode2"];
                    // unit price
                    order.unitPrice = orderData["unitPrice"];
                    //
                    order.customerManagedId = orderData["customerManagedId"];
                    // productionSpecs
                    order.productionSpecs = orderData["productionSpecs"];
                    // printVersion
                    order.printVersion = orderData["printVersion"];
                    // wooden
                    order.wooden = orderData["wooden"];
                    // mold
                    order.mold = orderData["mold"];
                    // passageOrder
                    order.passageOrder = orderData["passageOrder"];
                    // sampleLift
                    order.sampleLift = orderData["sampleLift"];
                    // sampleSales
                    order.sampleSales = orderData["sampleSales"];
                    // sampleCustomer
                    order.sampleCustomer = orderData["sampleCustomer"];
                    // sampleItem
                    order.sampleItem = orderData["sampleItem"];
                    // sampleProduct
                    order.sampleProduct = orderData["sampleProduct"];
                    // specialNote
                    order.specialNote = orderData["specialNote"];
                    // console.log("Get : " + orderData["customerManagedId"]);
                    // shippings
                    var shippingsData = orderData["shippings"];
                    var shippings = [];
                    order.shippings = shippings;
                    for (var _b = 0, shippingsData_1 = shippingsData; _b < shippingsData_1.length; _b++) {
                        var shippingData = shippingsData_1[_b];
                        var shipping = new ShippingPlan_model_1.ShippingPlanModel();
                        shippings.push(shipping);
                        // id
                        shipping.id = shippingData["id"];
                        // no
                        shipping.no = shippingData["no"];
                        // shippingDate
                        shipping.shippingDate = date_util_1.DateUtil.getDate(shippingData["shippingDate"]);
                        // deliveryDate
                        shipping.deliveryDate = date_util_1.DateUtil.getDate(shippingData["deliveryDate"]);
                        // quantity
                        shipping.quantity = shippingData["quantity"];
                        // shippingCompany
                        shipping.shippingCompany = shippingData["shippingCompany"];
                        // specifyTime
                        shipping.specifyTime = shippingData["specifyTime"];
                        // specifyTimeHour
                        shipping.specifyTimeHour = shippingData["specifyTimeHour"];
                        // specifyTimeMinute
                        shipping.specifyTimeMinute = shippingData["specifyTimeMinute"];
                        // specifyTimePeriod
                        shipping.specifyTimePeriod = shippingData["specifyTimePeriod"];
                        // specifyTimeStr
                        shipping.specifyTimeStr = shippingData["specifyTimeName"] != null ? shippingData["specifyTimeName"] : SpecifyTimeModal_helper_1.SpecifyTimeModalHelper.getSpecifyTimeName(shipping.specifyTime, shipping.specifyTimeHour, shipping.specifyTimeMinute);
                        // destinationId
                        shipping.destinationId = shippingData["destinationId"];
                        // loadingAddress
                        var loadingAddressData = shippingData["loadingAddress"];
                        shipping.loadingAddressId = loadingAddressData["id"];
                        shipping.loadingAddressName = shippingData["loadingAddressName"] != null ? shippingData["loadingAddressName"] : loadingAddressData["abbr"];
                    }
                    // add to repo
                    dataRepo.setOrder(order, order.productId);
                }
                // 7. destinations
                var destinationsData = data["destinations"];
                var destinations = [];
                pageData.destinations = destinations;
                for (var _c = 0, destinationsData_1 = destinationsData; _c < destinationsData_1.length; _c++) {
                    var destinationData = destinationsData_1[_c];
                    var destination = new ShippingDestination_model_1.ShippingDestinationModel();
                    destinations.push(destination);
                    // Id
                    destination.id = destinationData["id"];
                    // dennoPartnerCode
                    destination.code = destinationData["code"];
                    destination.ext = ShippingDestinationModal_helper_1.ShippingDestinationModalHelper.getDestinationExt(destination.code);
                    // customerId
                    destination.customerId = destinationData["customerId"];
                    // 納入先名
                    destination.deliveryName = destinationData["deliveryName"];
                    // 納入先名（略称）
                    destination.abbreviation = destinationData["abbreviation"];
                    // フリガナ
                    destination.furigana = destinationData["furigana"];
                    // 略称カナ
                    destination.abbrFurigana = destinationData["abbrFurigana"];
                    // 郵便番号
                    destination.postalCode = destinationData["postalCode"];
                    // 地区コード
                    destination.districtCode = destinationData["districtCode"];
                    // 住所１
                    destination.address1 = destinationData["address1"];
                    // 住所２
                    destination.address2 = destinationData["address2"];
                    // TEL
                    destination.tel = destinationData["tel"];
                    // FAX
                    destination.fax = destinationData["fax"];
                    // 担当部署
                    destination.deptName = destinationData["deptName"];
                    // 得意先担当者
                    destination.salerName = destinationData["salerName"];
                    // 納入可能車両サイズ
                    destination.availableVehicleSize = destinationData["availableVehicleSize"];
                    // 時間指定有無
                    destination.specifyTime = destinationData["specifyTime"];
                    destination.specifyTimeHour = destinationData["specifyTimeHour"];
                    destination.specifyTimeMinute = destinationData["specifyTimeMinute"];
                    destination.specifyTimePeriod = destinationData["specifyTimePeriod"];
                    destination.specifyTimeStr = SpecifyTimeModal_helper_1.SpecifyTimeModalHelper.getSpecifyTimeName(destination.specifyTime, destination.specifyTimeHour, destination.specifyTimeMinute);
                    // 付帯作業
                    destination.extraWork = destinationData["extraWork"];
                    // 専用伝票有無
                    destination.extraMethod = destinationData["extraMethod"];
                    // 備考
                    destination.memo = destinationData["memo"];
                    // option name
                    destination.name = ShippingDestinationModal_helper_1.ShippingDestinationModalHelper.getDestinationName(destination.ext, destination.deliveryName);
                }
                // sort destination by ext
                pageData.destinations.sort(function (d1, d2) { return d1.sdm_ext.localeCompare(d2.sdm_ext); });
                // 8. loadings
                var loadingsData = data["loadings"];
                var loadings = [];
                pageData.loadings = loadings;
                for (var _d = 0, loadingsData_1 = loadingsData; _d < loadingsData_1.length; _d++) {
                    var loadingData = loadingsData_1[_d];
                    var loading = new LoadingAddress_model_1.LoadingAddressModel();
                    loadings.push(loading);
                    // id
                    loading.id = loadingData["id"];
                    // name
                    loading.name = loadingData["name"];
                    // code
                    loading.code = loadingData["code"];
                    // abbr
                    loading.abbr = loadingData["abbr"];
                }
            }
            else if (messageCode == "ERR001") {
            }
            else if (messageCode == "ERR002") {
            }
        });
    };
    /**
     * send SFN030702 post request: save new destination
     */
    SFN0307Service.prototype.SFN030702 = function (destination) {
        var _this = this;
        var customer = this.pageData.customer;
        var requestData = {
            destination: {
                customerId: customer.id,
                deliveryName: destination.sdm_deliveryName,
                abbreviation: destination.sdm_abbreviation,
                furigana: destination.sdm_furigana,
                abbrFurigana: destination.sdm_abbrFurigana,
                postalCode: destination.sdm_postalCode,
                districtCode: destination.sdm_districtCode,
                address1: destination.sdm_address1,
                address2: destination.sdm_address2,
                tel: destination.sdm_tel,
                fax: destination.sdm_fax,
                deptName: destination.sdm_deptName,
                salerName: destination.sdm_salerName,
                availableVehicleSize: destination.sdm_availableVehicleSize,
                specifyTime: destination.stm_pattern,
                specifyTimeHour: destination.stm_hour,
                specifyTimeMinute: destination.stm_minute,
                specifyTimePeriod: destination.stm_period,
                extraWork: destination.sdm_extraWork,
                extraMethod: destination.sdm_extraMethod,
                memo: destination.sdm_memo
            }
        };
        return this.postApi("/SFN030702", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            if (messageCode == "INF001") {
                // INF001 data
                // parse destination data
                var destinationData = data["destination"];
                var destination_1 = new ShippingDestination_model_1.ShippingDestinationModel();
                // Id
                destination_1.id = destinationData["id"];
                // dennoPartnerCode
                destination_1.code = destinationData["code"];
                destination_1.ext = ShippingDestinationModal_helper_1.ShippingDestinationModalHelper.getDestinationExt(destination_1.code);
                // customerId
                destination_1.customerId = destinationData["customerId"];
                // 納入先名
                destination_1.deliveryName = destinationData["deliveryName"];
                // 納入先名（略称）
                destination_1.abbreviation = destinationData["abbreviation"];
                // フリガナ
                destination_1.furigana = destinationData["furigana"];
                // 略称カナ
                destination_1.abbrFurigana = destinationData["abbrFurigana"];
                // 郵便番号
                destination_1.postalCode = destinationData["postalCode"];
                // 地区コード
                destination_1.districtCode = destinationData["districtCode"];
                // 住所１
                destination_1.address1 = destinationData["address1"];
                // 住所２
                destination_1.address2 = destinationData["address2"];
                // TEL
                destination_1.tel = destinationData["tel"];
                // FAX
                destination_1.fax = destinationData["fax"];
                // 担当部署
                destination_1.deptName = destinationData["deptName"];
                // 得意先担当者
                destination_1.salerName = destinationData["salerName"];
                // 納入可能車両サイズ
                destination_1.availableVehicleSize = destinationData["availableVehicleSize"];
                // 時間指定有無
                destination_1.specifyTime = destinationData["specifyTime"];
                destination_1.specifyTimeHour = destinationData["specifyTimeHour"];
                destination_1.specifyTimeMinute = destinationData["specifyTimeMinute"];
                destination_1.specifyTimePeriod = destinationData["specifyTimePeriod"];
                destination_1.specifyTimeStr = destinationData["specifyTimeName"] != null ? destinationData["specifyTimeName"] : SpecifyTimeModal_helper_1.SpecifyTimeModalHelper.getSpecifyTimeName(destination_1.specifyTime, destination_1.specifyTimeHour, destination_1.specifyTimeMinute);
                // 付帯作業
                destination_1.extraWork = destinationData["extraWork"];
                // 専用伝票有無
                destination_1.extraMethod = destinationData["extraMethod"];
                // 備考
                destination_1.memo = destinationData["memo"];
                // option name
                destination_1.name = ShippingDestinationModal_helper_1.ShippingDestinationModalHelper.getDestinationName(destination_1.ext, destination_1.deliveryName);
                // add new destination to list
                _this.pageData.destinations.push(destination_1);
            }
            else if (messageCode == "ERR001") {
                throw 1;
            }
        });
    };
    /**
     * send SFN030703 post request: create order
     */
    SFN0307Service.prototype.SFN030703 = function () {
        var _this = this;
        // create request
        var requestData = {
            mode: this.pageData.screenMode,
            dealId: this.pageData.dealInfo.dealId,
            orders: []
        };
        var ordersData = requestData.orders;
        for (var _i = 0, _a = this.pageData.orders; _i < _a.length; _i++) {
            var order = _a[_i];
            // check if order selected
            if (!order.checked) {
                continue;
            }
            // create order data
            var orderData = {
                id: order.id,
                productId: order.productId,
                customerManagedId: order.customerManagedId,
                quantity: order.quantity,
                unitPrice: order.unitPrice,
                productionSpecs: order.productionSpecs,
                printVersion: order.printVersion,
                wooden: order.wooden,
                mold: order.mold,
                passageOrder: order.passageOrder,
                sampleLift: order.sampleLift,
                sampleSales: order.sampleSales,
                sampleCustomer: order.sampleCustomer,
                sampleItem: order.sampleItem,
                sampleProduct: order.sampleProduct,
                specialNote: order.specialNote,
                shippings: []
            };
            ordersData.push(orderData);
            // add shipping data
            var shippingsData = orderData.shippings;
            for (var _b = 0, _c = order.shippings; _b < _c.length; _b++) {
                var shipping = _c[_b];
                var shippingData = {
                    id: shipping.id,
                    no: shipping.no,
                    shippingDate: shipping.shippingDate,
                    deliveryDate: shipping.deliveryDate,
                    loadingAddress: {
                        id: shipping.loadingAddressId
                    },
                    loadingAddressName: shipping.loadingAddressName,
                    quantity: shipping.quantity,
                    shippingCompany: shipping.shippingCompany,
                    specifyTime: (shipping.specifyTime === undefined) ? 10 : shipping.specifyTime,
                    specifyTimeName: shipping.specifyTimeStr,
                    specifyTimeHour: shipping.specifyTimeHour,
                    specifyTimeMinute: shipping.specifyTimeMinute,
                    specifyTimePeriod: shipping.specifyTimePeriod,
                    destinationId: shipping.destinationId
                };
                shippingsData.push(shippingData);
            }
        }
        // send request
        return this.postApi("/SFN030703", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            if (messageCode == "INF001") {
                // INF001 data
                // update deal info
                var dealData = data["deal"];
                var dealInfo = _this.pageData.dealInfo;
                dealInfo.dealCode = dealData["dealCode"];
                dealInfo.dealStatus = dealData["dealStatus"];
                dealInfo.deliveryDate = date_util_1.DateUtil.getDate(dealData["deliveryDate"]);
                dealInfo.estimateTotal = dealData["estTotalDeal"];
                // update background orders
                var dataRepo = _this.pageData.dataRepo;
                var ordersData_2 = data["orders"];
                dataRepo.clearOrder();
                for (var _i = 0, ordersData_3 = ordersData_2; _i < ordersData_3.length; _i++) {
                    var orderData = ordersData_3[_i];
                    var order = new OrderItem_model_1.OrderItemModel();
                    // id
                    order.id = orderData["id"];
                    // product
                    order.productId = orderData["productId"];
                    // quantity
                    order.quantity = orderData["quantity"];
                    // unit price
                    order.unitPrice = orderData["unitPrice"];
                    // 相手管理No
                    order.customerManagedId = orderData["customerManagedId"];
                    // shippings
                    var shippingsData = orderData["shippings"];
                    var shippings = [];
                    order.shippings = shippings;
                    for (var _a = 0, shippingsData_2 = shippingsData; _a < shippingsData_2.length; _a++) {
                        var shippingData = shippingsData_2[_a];
                        var shipping = new ShippingPlan_model_1.ShippingPlanModel();
                        shippings.push(shipping);
                        // id
                        shipping.id = shippingData["id"];
                        // no
                        shipping.no = shippingData["no"];
                        // shippingDate
                        shipping.shippingDate = date_util_1.DateUtil.getDate(shippingData["shippingDate"]);
                        // deliveryDate
                        shipping.deliveryDate = date_util_1.DateUtil.getDate(shippingData["deliveryDate"]);
                        // quantity
                        shipping.quantity = shippingData["quantity"];
                        // shippingCompany
                        shipping.shippingCompany = shippingData["shippingCompany"];
                        // specifyTime
                        shipping.specifyTime = shippingData["specifyTime"];
                        // specifyTimeHour
                        shipping.specifyTimeHour = shippingData["specifyTimeHour"];
                        // specifyTimeMinute
                        shipping.specifyTimeMinute = shippingData["specifyTimeMinute"];
                        // specifyTimePeriod
                        shipping.specifyTimePeriod = shippingData["specifyTimePeriod"];
                        // specifyTimeStr
                        shipping.specifyTimeStr = shippingData["specifyTimeName"] != null ? shippingData["specifyTimeName"] : SpecifyTimeModal_helper_1.SpecifyTimeModalHelper.getSpecifyTimeName(shipping.specifyTime, shipping.specifyTimeHour, shipping.specifyTimeMinute);
                        // destinationId
                        shipping.destinationId = shippingData["destinationId"];
                        // loadingAddress
                        var loadingAddressData = shippingData["loadingAddress"];
                        shipping.loadingAddressId = loadingAddressData["id"];
                        shipping.loadingAddressName = shippingData["loadingAddressName"] != null ? shippingData["loadingAddressName"] : loadingAddressData["abbr"];
                    }
                    // add to repo
                    dataRepo.setOrder(order, order.productId);
                }
                // update screen orders
                var orders = _this.pageData.orders;
                for (var _b = 0, orders_1 = orders; _b < orders_1.length; _b++) {
                    var order = orders_1[_b];
                    var orderData = dataRepo.getOrder(order.productId);
                    if (orderData == undefined) {
                        // product not ordered
                        continue;
                    }
                    order.id = orderData.id;
                    order.quantity = orderData.quantity;
                    order.unitPrice = orderData.unitPrice;
                    order.customerManagedId = orderData.customerManagedId;
                }
            }
            else if (messageCode == "ERR001") {
                throw 1;
            }
        });
    };
    /**
     * send SFN030705 post request: get product specs
     */
    SFN0307Service.prototype.SFN030704 = function (productId) {
        var req = {
            productId: productId,
            dealCode: this.pageData.dealInfo.dealCode
        };
        return this.postApi("/SFN030704", req)
            .then(function (res) {
            return { fileName: res.data.fileName, filePath: res.data.filePath };
        })
            .catch(function (err) {
            throw err;
        });
    };
    SFN0307Service.prototype.parsePaper = function (data) {
        var mst = new MstLamination_model_1.MstLamination();
        mst.id = data["id"];
        mst.abbr = data["abbr"];
        mst.paperName = data["paperName"];
        mst.materialName = data["materialName"];
        return mst;
    };
    SFN0307Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SFN0307Service);
    return SFN0307Service;
}(common_service_1.CommonService));
exports.SFN0307Service = SFN0307Service;
//# sourceMappingURL=SFN0307.service.js.map