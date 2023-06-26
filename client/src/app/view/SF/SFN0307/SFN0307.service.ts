import {Injectable} from "@angular/core";
import {CommonService} from "../../../service/common.service";
import {SFN0307Data} from "./SFN0307.data";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {DealInfoModel} from "../COMMON/dealinfo/model/DealModel";
import {OrderItemModel} from "./model/OrderItem.model";
import {ProductModel} from "./model/Product.model";
import {DepartmentModel} from "./model/Department.model";
import {UserModel} from "./model/User.model";
import {FormatUtil} from "../../../util/format-util";
import {DateUtil} from "../../../util/date-util";
import {CustomerModel} from "./model/Customer.model";
import {ProductInfoBoxHelper} from "../../../component/product-info-box/ProductInfoBox.helper";
import {ShippingPlanModel} from "./model/ShippingPlan.model";
import {SpecifyTimeModalHelper} from "../../../component/specify-time-modal/SpecifyTimeModal.helper";
import {ShippingDestinationModel} from './model/ShippingDestination.model';
import {ShippingDestinationModalHelper} from "../../../component/shipping-destination-modal/ShippingDestinationModal.helper";
import {LoadingAddressModel} from "./model/LoadingAddress.model";
import {SDMDestination} from "../../../component/shipping-destination-modal/model/SDMDestination.model";
import {MstPaper} from "../../../model/core/MstPaper.model";
import {MstLamination} from "../../../model/core/MstLamination.model";
import { ShippingDestinationJson } from '../../../model/core/ShippingDestination.model';

@Injectable()
export class SFN0307Service extends CommonService {

    pageData: SFN0307Data;

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    /**
     * send SFN030701 post request
     * @returns {Promise<TResult>}
     */
    SFN030701(): Promise<void> {
        let req = {
            dealCode: this.pageData.dealCode
        }
        return this.postApi("/SFN030701", req).then(res => {
            let data        = res["data"];
            let messageCode = res["messageCode"];
            if (messageCode == "INF001") {
                // INF001 data
                let pageData = this.pageData;
                let dataRepo = pageData.dataRepo;

                // 1. department
                let departmentData = data["department"];
                let department     = new DepartmentModel();
                // id
                department.id      = departmentData["id"];
                // name
                department.name    = departmentData["name"];

                // 2. user
                let userData      = data["user"]
                let user          = new UserModel();
                // id
                user.id           = userData["id"];
                // name
                user.name         = userData["name"];
                // department
                user.departmentId = userData["departmentId"];

                // 3. customer
                let customerData  = data["customer"]
                let customer      = new CustomerModel();
                pageData.customer = customer;
                // id
                customer.id       = customerData["id"];
                // name
                customer.name     = customerData["name"];
                // code
                customer.code     = customerData["code"];

                // 4. deal
                let dealData       = data["deal"];
                let deal           = new DealInfoModel();
                pageData.dealInfo  = deal;
                // id
                deal.dealId        = dealData["id"];
                // dealCode
                deal.dealCode      = dealData["dealCode"];
                // dealName
                deal.dealName      = dealData["dealName"];
                // customer code
                deal.customerCode  = customer.code;
                // customer name
                deal.customerName  = customer.name;
                // salerId
                deal.saleName      = FormatUtil.formatSalesName(department.name, user.name);
                // dealType
                deal.dealType      = dealData["dealType"];
                // dealStatus
                deal.dealStatus    = dealData["dealStatus"];
                // deliveryDate
                deal.deliveryDate  = DateUtil.getDate(dealData["deliveryDate"]);
                // estTotalDeal
                deal.estimateTotal = dealData["estTotalDeal"];
                // templateFlag
                deal.templateFlag  = dealData["templateFlag"];
                // closedFlag
                deal.closedFlag    = dealData["closedFlag"];

                // 5. products
                let productsData = data["products"];
                let orders       = [];
                pageData.orders  = orders;
                for (let productData of productsData) {
                    let product                         = new ProductModel();
                    // id
                    product.id                          = productData["id"];
                    // 製品ID/ Product ID
                    product.code                        = productData["productCode"];
                    // 製品種類/ Product type
                    product.type                        = productData["productType"];
                    product.type_name                   = ProductInfoBoxHelper.getProductTypeName(product.type);
                    // 製品名/ Product name
                    product.name                        = productData["productName"];
                    // 品目C/Hạng mục C
                    product.itemCode                    = productData["itemCode"];
                    // メモ/ Memo
                    let memo1                           = productData["memo1"];
                    let memo2                           = productData["memo2"];
                    let memo3                           = productData["memo3"];
                    product.memo                        = ProductInfoBoxHelper.getMemo(memo1, memo2, memo3);
                    // 得意先製品番号/ Mã product của customer
                    product.customerProductCode         = productData["customerProductCode"];
                    // 製造依頼先/ Nơi request production
                    let factoryId                       = productData["factoryId"];
                    product.manufacture                 = ProductInfoBoxHelper.getManufacture(factoryId)
                    // ロット/ Lot
                    product.lot                         = productData["lot"];
                    // Image
                    product.image                       = productData["imgUrl"];
                    // update date
                    product.updateDate                  = DateUtil.getDate(productData["updateDate"]);
                    // shapeId
                    product.shapeId                     = productData["shapeId"];
                    // laminationFlute
                    product.laminationFlute             = productData["laminationFlute"];
                    // laminationPaperTypeA
                    product.laminationPaperTypeA        = productData["laminationPaperTypeA"];
                    // laminationPaperTypeB
                    product.laminationPaperTypeB        = productData["laminationPaperTypeB"];
                    // laminationABasicWeight
                    product.laminationABasicWeight      = productData["laminationABasicWeight"];
                    // laminationBBasicWeight
                    product.laminationBBasicWeight      = productData["laminationBBasicWeight"];
                    // laminationPaperTypeFront
                    product.laminationPaperTypeFront    = productData["laminationPaperTypeFront"];
                    // laminationPaperTypeBack
                    product.laminationPaperTypeBack     = productData["laminationPaperTypeBack"];
                    // laminationPaperTypeMedium
                    product.laminationPaperTypeMedium   = productData["laminationPaperTypeMedium"];
                    // laminationFrontBasicWeight
                    product.laminationFrontBasicWeight  = productData["laminationFrontBasicWeight"];
                    // laminationMediumBasicWeight
                    product.laminationMediumBasicWeight = productData["laminationMediumBasicWeight"];
                    // laminationBackBasicWeight
                    product.laminationBackBasicWeight   = productData["laminationBackBasicWeight"];
                    // laminationAId
                    product.laminationAId               = productData["laminationAId"];
                    // laminationBId
                    product.laminationBId               = productData["laminationBId"];
                    // laminationFrontId
                    product.laminationFrontId           = productData["laminationFrontId"];
                    // laminationBackId
                    product.laminationBackId            = productData["laminationBackId"];
                    // laminationMediumId
                    product.laminationMediumId          = productData["laminationMediumId"];
                    // printMethod
                    product.printMethod                 = productData["printMethod"];
                    // colorIdF
                    product.colorIdF                    = productData["colorIdF"];
                    // specialColorF
                    product.specialColorF               = productData["specialColorF"];
                    // colorIdB
                    product.colorIdB                    = productData["colorIdB"];
                    // specialColorB
                    product.specialColorB               = productData["specialColorB"];
                    // 木型情報
                    product.woodenExpiredDate           = productData["woodenExpiredDate"];
                    product.hasWooden                   = !!productData["hasWooden"];

                    // size
                    // サイズ/ Size
                    product.sizeW      = productData["sizeW"];
                    product.sizeD      = productData["sizeD"];
                    product.sizeH      = productData["sizeH"];
                    product.paperSizeW = productData["paperSizeW"];
                    product.paperSizeH = productData["paperSizeH"];
                    product.size       = ProductInfoBoxHelper.getDimension(product);
                    product.cartonShippingType = productData["cartonShippingType"];

                    // parse paper and color
                    product.mstLaminations = [];
                    product.paper          = new MstPaper();
                    let paper              = productData["paper"];
                    if (!!paper) {
                        product.paper.id   = paper["id"];
                        product.paper.name = paper["paperName"] == null ? paper["paperName"] : paper["materialName"];
                    }
                    let laminationPaperTypeAJson = productData["laminationPaperTypeAJson"];
                    if (!!laminationPaperTypeAJson) {
                        product.mstLaminations.push(this.parsePaper(laminationPaperTypeAJson));
                    }
                    let laminationPaperTypeBJson = productData["laminationPaperTypeBJson"];
                    if (!!laminationPaperTypeBJson) {
                        product.mstLaminations.push(this.parsePaper(laminationPaperTypeBJson));
                    }
                    let laminationPaperTypeFrontJson = productData["laminationPaperTypeFrontJson"];
                    if (!!laminationPaperTypeFrontJson) {
                        product.mstLaminations.push(this.parsePaper(laminationPaperTypeFrontJson));
                    }
                    let laminationPaperTypeBackJson = productData["laminationPaperTypeBackJson"];
                    if (!!laminationPaperTypeBackJson) {
                        product.mstLaminations.push(this.parsePaper(laminationPaperTypeBackJson));
                    }
                    let laminationPaperTypeMediumJson = productData["laminationPaperTypeMediumJson"];
                    if (!!laminationPaperTypeMediumJson) {
                        product.mstLaminations.push(this.parsePaper(laminationPaperTypeMediumJson));
                    }
                    let laminationAJson = productData["laminationAJson"];
                    if (!!laminationAJson) {
                        product.mstLaminations.push(this.parsePaper(laminationAJson));
                    }
                    let laminationBJson = productData["laminationBJson"];
                    if (!!laminationBJson) {
                        product.mstLaminations.push(this.parsePaper(laminationBJson));
                    }
                    let laminationFrontJson = productData["laminationFrontJson"];
                    if (!!laminationFrontJson) {
                        product.mstLaminations.push(this.parsePaper(laminationFrontJson));
                    }
                    let laminationBackJson = productData["laminationBackJson"];
                    if (!!laminationBackJson) {
                        product.mstLaminations.push(this.parsePaper(laminationBackJson));
                    }
                    let laminationMediumJson = productData["laminationMediumJson"];
                    if (!!laminationMediumJson) {
                        product.mstLaminations.push(this.parsePaper(laminationMediumJson));
                    }
                    // 材料/ Vật liệu
                    product.material = ProductInfoBoxHelper.getMaterial(product, product.mstLaminations);
                    // add to repo
                    dataRepo.setProduct(product, product.id);
                    // create placeholder order
                    let order       = new OrderItemModel();
                    order.productId = product.id;
                    orders.push(order);
                }

                // 6. orderItems
                let ordersData = data["orderItems"];
                for (let orderData of ordersData) {
                    let order             = new OrderItemModel();
                    // id
                    order.id              = orderData["id"];
                    // product
                    order.productId       = orderData["productId"];
                    // quantity
                    order.quantity        = orderData["quantity"];
                    // orderCode
                    order.orderCode       = orderData["orderCode"];
                    // orderCode
                    order.orderCode2      = orderData["orderCode2"];
                    // unit price
                    order.unitPrice       = orderData["unitPrice"];
                    //
                    order.customerManagedId = orderData["customerManagedId"];
                    // productionSpecs
                    order.productionSpecs = orderData["productionSpecs"];
                    // printVersion
                    order.printVersion    = orderData["printVersion"];
                    // wooden
                    order.wooden          = orderData["wooden"];
                    // mold
                    order.mold            = orderData["mold"];
                    // passageOrder
                    order.passageOrder    = orderData["passageOrder"];
                    // sampleLift
                    order.sampleLift      = orderData["sampleLift"];
                    // sampleSales
                    order.sampleSales     = orderData["sampleSales"];
                    // sampleCustomer
                    order.sampleCustomer  = orderData["sampleCustomer"];
                    // sampleItem
                    order.sampleItem      = orderData["sampleItem"];
                    // sampleProduct
                    order.sampleProduct   = orderData["sampleProduct"];
                    // specialNote
                    order.specialNote     = orderData["specialNote"];

                    // console.log("Get : " + orderData["customerManagedId"]);

                    // shippings
                    let shippingsData = orderData["shippings"];
                    let shippings     = [];
                    order.shippings   = shippings;
                    for (let shippingData of shippingsData) {
                        let shipping = new ShippingPlanModel();
                        shippings.push(shipping);
                        // id
                        shipping.id                 = shippingData["id"];
                        // no
                        shipping.no                 = shippingData["no"];
                        // shippingDate
                        shipping.shippingDate       = DateUtil.getDate(shippingData["shippingDate"]);
                        // deliveryDate
                        shipping.deliveryDate       = DateUtil.getDate(shippingData["deliveryDate"]);
                        // quantity
                        shipping.quantity           = shippingData["quantity"];
                        // shippingCompany
                        shipping.shippingCompany    = shippingData["shippingCompany"];
                        // specifyTime
                        shipping.specifyTime        = shippingData["specifyTime"];
                        // specifyTimeHour
                        shipping.specifyTimeHour    = shippingData["specifyTimeHour"];
                        // specifyTimeMinute
                        shipping.specifyTimeMinute  = shippingData["specifyTimeMinute"];
                        // specifyTimePeriod
                        shipping.specifyTimePeriod  = shippingData["specifyTimePeriod"];
                        // specifyTimeStr
                        shipping.specifyTimeStr     = shippingData["specifyTimeName"] !=null ?shippingData["specifyTimeName"]: SpecifyTimeModalHelper.getSpecifyTimeName(shipping.specifyTime, shipping.specifyTimeHour, shipping.specifyTimeMinute);
                        // destinationId
                        shipping.destinationId      = shippingData["destinationId"];
                        // loadingAddress
                        let loadingAddressData      = shippingData["loadingAddress"];
                        shipping.loadingAddressId   = loadingAddressData["id"];
                        shipping.loadingAddressName = shippingData["loadingAddressName"] != null ? shippingData["loadingAddressName"] : loadingAddressData["abbr"];
                    }

                    // add to repo
                    dataRepo.setOrder(order, order.productId);
                }
                // 7. destinations
                let destinationsData  = data["destinations"];
                let destinations      = [];
                pageData.destinations = destinations;
                for (let destinationData of destinationsData) {
                    let destination = new ShippingDestinationModel();
                    destinations.push(destination);

                    // Id
                    destination.id                   = destinationData["id"];
                    // dennoPartnerCode
                    destination.code                 = destinationData["code"];
                    destination.ext                  = ShippingDestinationModalHelper.getDestinationExt(destination.code);
                    // customerId
                    destination.customerId           = destinationData["customerId"];
                    // 納入先名
                    destination.deliveryName         = destinationData["deliveryName"];
                    // 納入先名（略称）
                    destination.abbreviation         = destinationData["abbreviation"];
                    // フリガナ
                    destination.furigana             = destinationData["furigana"];
                    // 略称カナ
                    destination.abbrFurigana         = destinationData["abbrFurigana"];
                    // 郵便番号
                    destination.postalCode           = destinationData["postalCode"];
                    // 地区コード
                    destination.districtCode         = destinationData["districtCode"];
                    // 住所１
                    destination.address1             = destinationData["address1"];
                    // 住所２
                    destination.address2             = destinationData["address2"];
                    // TEL
                    destination.tel                  = destinationData["tel"];
                    // FAX
                    destination.fax                  = destinationData["fax"];
                    // 担当部署
                    destination.deptName             = destinationData["deptName"];
                    // 得意先担当者
                    destination.salerName            = destinationData["salerName"];
                    // 納入可能車両サイズ
                    destination.availableVehicleSize = destinationData["availableVehicleSize"];
                    // 時間指定有無
                    destination.specifyTime          = destinationData["specifyTime"];
                    destination.specifyTimeHour      = destinationData["specifyTimeHour"];
                    destination.specifyTimeMinute    = destinationData["specifyTimeMinute"];
                    destination.specifyTimePeriod    = destinationData["specifyTimePeriod"];
                    destination.specifyTimeStr       = SpecifyTimeModalHelper.getSpecifyTimeName(destination.specifyTime, destination.specifyTimeHour, destination.specifyTimeMinute);
                    // 付帯作業
                    destination.extraWork            = destinationData["extraWork"];
                    // 専用伝票有無
                    destination.extraMethod          = destinationData["extraMethod"];
                    // 備考
                    destination.memo                 = destinationData["memo"];
                    // option name
                    destination.name                 = ShippingDestinationModalHelper.getDestinationName(destination.ext, destination.deliveryName);
                }
                // sort destination by ext
                pageData.destinations.sort((d1, d2) => d1.sdm_ext.localeCompare(d2.sdm_ext));

                // 8. loadings
                let loadingsData  = data["loadings"];
                let loadings      = [];
                pageData.loadings = loadings;
                for (let loadingData of loadingsData) {
                    let loading = new LoadingAddressModel();
                    loadings.push(loading);
                    // id
                    loading.id   = loadingData["id"];
                    // name
                    loading.name = loadingData["name"];
                    // code
                    loading.code = loadingData["code"];
                    // abbr
                    loading.abbr = loadingData["abbr"];
                }
            } else if (messageCode == "ERR001") {

            } else if (messageCode == "ERR002") {

            }
        });
    }

    /**
     * send SFN030702 post request: save new destination
     */
    SFN030702(destination: SDMDestination): Promise<void> {
        let customer    = this.pageData.customer;
        let requestData = {
            destination: {
                customerId          : customer.id,
                deliveryName        : destination.sdm_deliveryName,
                abbreviation        : destination.sdm_abbreviation,
                furigana            : destination.sdm_furigana,
                abbrFurigana        : destination.sdm_abbrFurigana,
                postalCode          : destination.sdm_postalCode,
                districtCode        : destination.sdm_districtCode,
                address1            : destination.sdm_address1,
                address2            : destination.sdm_address2,
                tel                 : destination.sdm_tel,
                fax                 : destination.sdm_fax,
                deptName            : destination.sdm_deptName,
                salerName           : destination.sdm_salerName,
                availableVehicleSize: destination.sdm_availableVehicleSize,
                specifyTime         : destination.stm_pattern,
                specifyTimeHour     : destination.stm_hour,
                specifyTimeMinute   : destination.stm_minute,
                specifyTimePeriod   : destination.stm_period,
                extraWork           : destination.sdm_extraWork,
                extraMethod         : destination.sdm_extraMethod,
                memo                : destination.sdm_memo
            }
        };
        return this.postApi("/SFN030702", requestData).then(res => {
            let data        = res["data"];
            let messageCode = res["messageCode"];
            if (messageCode == "INF001") {
                // INF001 data
                // parse destination data
                let destinationData              = data["destination"];
                let destination                  = new ShippingDestinationModel();
                // Id
                destination.id                   = destinationData["id"];
                // dennoPartnerCode
                destination.code                 = destinationData["code"];
                destination.ext                  = ShippingDestinationModalHelper.getDestinationExt(destination.code);
                // customerId
                destination.customerId           = destinationData["customerId"];
                // 納入先名
                destination.deliveryName         = destinationData["deliveryName"];
                // 納入先名（略称）
                destination.abbreviation         = destinationData["abbreviation"];
                // フリガナ
                destination.furigana             = destinationData["furigana"];
                // 略称カナ
                destination.abbrFurigana         = destinationData["abbrFurigana"];
                // 郵便番号
                destination.postalCode           = destinationData["postalCode"];
                // 地区コード
                destination.districtCode         = destinationData["districtCode"];
                // 住所１
                destination.address1             = destinationData["address1"];
                // 住所２
                destination.address2             = destinationData["address2"];
                // TEL
                destination.tel                  = destinationData["tel"];
                // FAX
                destination.fax                  = destinationData["fax"];
                // 担当部署
                destination.deptName             = destinationData["deptName"];
                // 得意先担当者
                destination.salerName            = destinationData["salerName"];
                // 納入可能車両サイズ
                destination.availableVehicleSize = destinationData["availableVehicleSize"];
                // 時間指定有無
                destination.specifyTime          = destinationData["specifyTime"];
                destination.specifyTimeHour      = destinationData["specifyTimeHour"];
                destination.specifyTimeMinute    = destinationData["specifyTimeMinute"];
                destination.specifyTimePeriod    = destinationData["specifyTimePeriod"];
                destination.specifyTimeStr       = destinationData["specifyTimeName"] != null?destinationData["specifyTimeName"]: SpecifyTimeModalHelper.getSpecifyTimeName(destination.specifyTime, destination.specifyTimeHour, destination.specifyTimeMinute);
                // 付帯作業
                destination.extraWork            = destinationData["extraWork"];
                // 専用伝票有無
                destination.extraMethod          = destinationData["extraMethod"];
                // 備考
                destination.memo                 = destinationData["memo"];
                // option name
                destination.name                 = ShippingDestinationModalHelper.getDestinationName(destination.ext, destination.deliveryName);

                // add new destination to list
                this.pageData.destinations.push(destination);
            } else if (messageCode == "ERR001") {
                throw 1;
            }
        });
    }

    /**
     * send SFN030703 post request: create order
     */
    SFN030703(): Promise<void> {
        // create request
        let requestData = {
            mode  : this.pageData.screenMode,
            dealId: this.pageData.dealInfo.dealId,
            orders: []
        };
        let ordersData  = requestData.orders;
        for (let order of this.pageData.orders) {
            // check if order selected
            if (!order.checked) {
                continue;
            }
            // create order data
            let orderData = {
                id             : order.id,
                productId      : order.productId,
                customerManagedId: order.customerManagedId,
                quantity       : order.quantity,
                unitPrice      : order.unitPrice,
                productionSpecs: order.productionSpecs,
                printVersion   : order.printVersion,
                wooden         : order.wooden,
                mold           : order.mold,
                passageOrder   : order.passageOrder,
                sampleLift     : order.sampleLift,
                sampleSales    : order.sampleSales,
                sampleCustomer : order.sampleCustomer,
                sampleItem     : order.sampleItem,
                sampleProduct  : order.sampleProduct,
                specialNote    : order.specialNote,
                shippings      : []
            }
            ordersData.push(orderData);
            // add shipping data
            let shippingsData = orderData.shippings;
            for (let shipping of order.shippings) {
                let shippingData = {
                    id                : shipping.id,
                    no                : shipping.no,
                    shippingDate      : shipping.shippingDate,
                    deliveryDate      : shipping.deliveryDate,
                    loadingAddress    : {
                        id: shipping.loadingAddressId
                    },
                    loadingAddressName: shipping.loadingAddressName,
                    quantity          : shipping.quantity,
                    shippingCompany   : shipping.shippingCompany,
                    specifyTime       : (shipping.specifyTime === undefined) ? 10 : shipping.specifyTime,
                    specifyTimeName   : shipping.specifyTimeStr,
                    specifyTimeHour   : shipping.specifyTimeHour,
                    specifyTimeMinute : shipping.specifyTimeMinute,
                    specifyTimePeriod : shipping.specifyTimePeriod,
                    destinationId     : shipping.destinationId
                }
                shippingsData.push(shippingData);
            }
        }
        // send request
        return this.postApi("/SFN030703", requestData).then(res => {
            let data        = res["data"];
            let messageCode = res["messageCode"];
            if (messageCode == "INF001") {
                // INF001 data
                // update deal info
                let dealData           = data["deal"];
                let dealInfo           = this.pageData.dealInfo;
                dealInfo.dealCode      = dealData["dealCode"];
                dealInfo.dealStatus    = dealData["dealStatus"];
                dealInfo.deliveryDate  = DateUtil.getDate(dealData["deliveryDate"]);
                dealInfo.estimateTotal = dealData["estTotalDeal"];

                // update background orders
                let dataRepo   = this.pageData.dataRepo;
                let ordersData = data["orders"];
                dataRepo.clearOrder();
                for (let orderData of ordersData) {
                    let order         = new OrderItemModel();
                    // id
                    order.id          = orderData["id"];
                    // product
                    order.productId   = orderData["productId"]
                    // quantity
                    order.quantity    = orderData["quantity"]
                    // unit price
                    order.unitPrice   = orderData["unitPrice"]
                    // 相手管理No
                    order.customerManagedId = orderData["customerManagedId"]
                    // shippings
                    let shippingsData = orderData["shippings"];
                    let shippings     = [];
                    order.shippings   = shippings;
                    for (let shippingData of shippingsData) {
                        let shipping = new ShippingPlanModel();
                        shippings.push(shipping);
                        // id
                        shipping.id                 = shippingData["id"];
                        // no
                        shipping.no                 = shippingData["no"];
                        // shippingDate
                        shipping.shippingDate       = DateUtil.getDate(shippingData["shippingDate"]);
                        // deliveryDate
                        shipping.deliveryDate       = DateUtil.getDate(shippingData["deliveryDate"]);
                        // quantity
                        shipping.quantity           = shippingData["quantity"];
                        // shippingCompany
                        shipping.shippingCompany    = shippingData["shippingCompany"];
                        // specifyTime
                        shipping.specifyTime        = shippingData["specifyTime"];
                        // specifyTimeHour
                        shipping.specifyTimeHour    = shippingData["specifyTimeHour"];
                        // specifyTimeMinute
                        shipping.specifyTimeMinute  = shippingData["specifyTimeMinute"];
                        // specifyTimePeriod
                        shipping.specifyTimePeriod  = shippingData["specifyTimePeriod"];
                        // specifyTimeStr
                        shipping.specifyTimeStr     = shippingData["specifyTimeName"] != null?shippingData["specifyTimeName"]: SpecifyTimeModalHelper.getSpecifyTimeName(shipping.specifyTime, shipping.specifyTimeHour, shipping.specifyTimeMinute);
                        // destinationId
                        shipping.destinationId      = shippingData["destinationId"];
                        // loadingAddress
                        let loadingAddressData      = shippingData["loadingAddress"];
                        shipping.loadingAddressId   = loadingAddressData["id"];
                        shipping.loadingAddressName = shippingData["loadingAddressName"] != null ? shippingData["loadingAddressName"] : loadingAddressData["abbr"];
                    }

                    // add to repo
                    dataRepo.setOrder(order, order.productId);
                }
                // update screen orders
                let orders = this.pageData.orders;
                for (let order of orders) {
                    let orderData = dataRepo.getOrder(order.productId);
                    if (orderData == undefined) {
                        // product not ordered
                        continue;
                    }
                    order.id        = orderData.id;
                    order.quantity  = orderData.quantity;
                    order.unitPrice = orderData.unitPrice;
                    order.customerManagedId = orderData.customerManagedId;

                }
            } else if (messageCode == "ERR001") {
                throw 1;
            }
        });
    }

    /**
     * send SFN030705 post request: get product specs
     */
    SFN030704(productId: number): Promise<{ fileName: string, filePath: string }> {
        let req = {
            productId: productId,
            dealCode : this.pageData.dealInfo.dealCode
        };
        return this.postApi("/SFN030704", req)
            .then(res => {
                return {fileName: res.data.fileName, filePath: res.data.filePath};
            })
            .catch(err => {
                throw err;
            });
    }

    private parsePaper(data: any): MstLamination {
        let mst          = new MstLamination();
        mst.id           = data["id"];
        mst.abbr         = data["abbr"];
        mst.paperName    = data["paperName"];
        mst.materialName = data["materialName"];

        return mst;
    }
}