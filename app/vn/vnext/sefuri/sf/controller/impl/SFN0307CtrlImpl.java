package vn.vnext.sefuri.sf.controller.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

import com.google.common.base.Strings;

import play.db.jpa.JPAApi;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SFN0307Ctrl;
import vn.vnext.sefuri.sf.dao.ProductDao;
import vn.vnext.sefuri.sf.dao.UserDao;
import vn.vnext.sefuri.sf.dto.ChecksheetDto;
import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.dto.FileDto;
import vn.vnext.sefuri.sf.dto.LoadingAddressDto;
import vn.vnext.sefuri.sf.dto.MstLaminationDto;
import vn.vnext.sefuri.sf.dto.MstPaperDto;
import vn.vnext.sefuri.sf.dto.MstWoodenDto;
import vn.vnext.sefuri.sf.dto.OrderDto;
import vn.vnext.sefuri.sf.dto.OrderItemDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.ProductFileDto;
import vn.vnext.sefuri.sf.dto.ShippingDestinationDto;
import vn.vnext.sefuri.sf.dto.ShippingPlanDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.json.SFN0307.model.CustomerJson;
import vn.vnext.sefuri.sf.json.SFN0307.model.DealJson;
import vn.vnext.sefuri.sf.json.SFN0307.model.DepartmentJson;
import vn.vnext.sefuri.sf.json.SFN0307.model.DestinationJson;
import vn.vnext.sefuri.sf.json.SFN0307.model.LoadingJson;
import vn.vnext.sefuri.sf.json.SFN0307.model.OrderItemJson;
import vn.vnext.sefuri.sf.json.SFN0307.model.PaperJson;
import vn.vnext.sefuri.sf.json.SFN0307.model.ProductJson;
import vn.vnext.sefuri.sf.json.SFN0307.model.ShippingJson;
import vn.vnext.sefuri.sf.json.SFN0307.model.UserJson;
import vn.vnext.sefuri.sf.json.SFN0307.request.SFN030701Req;
import vn.vnext.sefuri.sf.json.SFN0307.request.SFN030702Req;
import vn.vnext.sefuri.sf.json.SFN0307.request.SFN030703Req;
import vn.vnext.sefuri.sf.json.SFN0307.request.SFN030705Req;
import vn.vnext.sefuri.sf.json.SFN0307.response.SFN030701Res;
import vn.vnext.sefuri.sf.json.SFN0307.response.SFN030702Res;
import vn.vnext.sefuri.sf.json.SFN0307.response.SFN030703Res;
import vn.vnext.sefuri.sf.json.SFN0307.response.SFN030705Res;
import vn.vnext.sefuri.sf.module.export.ReportGenerator;
import vn.vnext.sefuri.sf.module.jms.JmsApi;
import vn.vnext.sefuri.sf.module.jms.json.if0121.IF0121Json;
import vn.vnext.sefuri.sf.module.jms.json.if0131.IF0131Json;
import vn.vnext.sefuri.sf.service.SV002UserService;
import vn.vnext.sefuri.sf.service.SV003DealService;
import vn.vnext.sefuri.sf.service.SV004QuotationService;
import vn.vnext.sefuri.sf.service.SV005CustomerService;
import vn.vnext.sefuri.sf.service.SV006FileService;
import vn.vnext.sefuri.sf.service.SV008ProductService;
import vn.vnext.sefuri.sf.service.SV009OrderService;
import vn.vnext.sefuri.sf.service.SV011WoodenService;
import vn.vnext.sefuri.sf.service.SV013MstDataService;
import vn.vnext.sefuri.sf.service.SV014DealProductService;
import vn.vnext.sefuri.sf.service.SV015DepartmentService;

public class SFN0307CtrlImpl extends CommonCtrl implements SFN0307Ctrl {

    @Inject
    private SV003DealService dealService;

    @Inject
    private SV002UserService userService;

    @Inject
    private SV005CustomerService customerService;

    @Inject
    private SV015DepartmentService departmentService;

    @Inject
    private SV014DealProductService dealProductService;

    @Inject
    private SV008ProductService productService;

    @Inject
    private SV004QuotationService quotationService;

    @Inject
    private SV009OrderService orderService;

    @Inject
    private SV006FileService fileService;

    @Inject
    private SV013MstDataService mstDataService;

    @Inject
    private JmsApi jmsApi;

    @Inject
    private JPAApi jpaApi;

    @Inject
    private ReportGenerator reportGenerator;

    @Inject
    private ProductDao productDao;

    @Inject
    private SV011WoodenService woodenService;

    @Override
    public Result sfn030701GetOrderInfo() {

        // A. find deal
        SFN030701Req req = requestJson(SFN030701Req.class);
        String dealCode = req.getDealCode();
        DealDto dealDto = null;
        if (dealCode != null) {
            dealDto = dealService.sv00306GetDealByDealCode(dealCode);
        }
        if (dealDto == null) {
            return responseError(MessageCode.ERR001);
        } else if (dealDto.getCustomerId() == null) {
            return responseError(MessageCode.ERR002);
        }

        // B. get data
        // 1. products
        Integer dealId = dealDto.getId();
        List<ProductDto> productDtos = productService.sv00828GetProductsByDealIds(Arrays.asList(dealId));
        productDtos = productDtos.stream()
                .filter(productDto -> productDto.getRequestDesignFlag() != null && productDto.getRequestDesignFlag() == 1)
                .collect(Collectors.toList());
        // 2. order items
        List<OrderItemDto> orderItemDtos = orderService.sv00901GetOrderItemByDealId(dealId);
        // 3. shipping plans
        Map<Integer, List<ShippingPlanDto>> shippingMap = new HashMap<>();
        Map<Integer, LoadingAddressDto> loadingMap = new HashMap<>();
        for (OrderItemDto orderItemDto : orderItemDtos) {
            shippingMap.put(orderItemDto.getId(), new ArrayList<>());
        }
        List<ShippingPlanDto> allShippings = orderService.sv00907GetShippingPlanByOrderItemIds(shippingMap.keySet());
        for (ShippingPlanDto shipping : allShippings) {
            shippingMap.get(shipping.getOrderItemId()).add(shipping);
            loadingMap.put(shipping.getLoadingAddressId(), null);
        }
        List<LoadingAddressDto> addressDtos = orderService.sv00909GetLoadingAddressByIds(loadingMap.keySet());
        for (LoadingAddressDto addressDto : addressDtos) {
            loadingMap.put(addressDto.getId(), addressDto);
        }
        // 4. loading address
        List<LoadingAddressDto> loadingAddressDtos = orderService.sv00908GetAvailableLoadingAddress();
        // 5. customer
        CustomerDto customerDto = customerService.sv00501GetCustomerByCustomerId(dealDto.getCustomerId());
        // 6. shipping destination
        List<ShippingDestinationDto> shippingDestinationDtos = customerService.sv00517GetShippingDestinationByCustomerId(dealDto.getCustomerId());
        // 7. user
        UserDto userDto = null;
        if (dealDto.getSalesId() != null) {
            userDto = userService.sv00204GetUserById(dealDto.getSalesId());
        }
        // 8. department
        DepartmentDto departmentDto = null;
        if (userDto != null && userDto.getDepartmentId() != null) {
            departmentDto = departmentService.sv01509GetDepartmentById(userDto.getDepartmentId());
        }

        // C. prepare response
        SFN030701Res res = new SFN030701Res();
        // 1. deal
        DealJson dealJson = new DealJson();
        res.setDeal(dealJson);
        // id
        dealJson.setId(dealDto.getId());
        // dealCode
        dealJson.setDealCode(dealDto.getDealCode());
        // dealName
        dealJson.setDealName(dealDto.getDealName());
        // customerId
        dealJson.setCustomerId(dealDto.getCustomerId());
        // salerId
        dealJson.setSalerId(dealDto.getSalesId());
        // dealType
        dealJson.setDealType(dealDto.getDealType());
        // dealStatus
        dealJson.setDealStatus(dealDto.getDealStatus());
        // deliveryDate
        dealJson.setDeliveryDate(dealDto.getDeliveryDate());
        // estTotalDeal
        dealJson.setEstTotalDeal(dealDto.getEstTotalDeal());
        // templateFlag
        dealJson.setTemplateFlag(dealDto.getTemplateFlag());
        // closedFlag
        dealJson.setClosedFlag(dealDto.getClosedFlag());

        // 2. customer
        CustomerJson customerJson = new CustomerJson();
        res.setCustomer(customerJson);
        // id
        customerJson.setId(customerDto.getId());
        // name
        customerJson.setName(customerDto.getName());
        // code
        customerJson.setCode(customerDto.getCustomerCode());

        // 4. departments
        DepartmentJson departmentJson = new DepartmentJson();
        res.setDepartment(departmentJson);
        if (departmentDto != null) {
            // id
            departmentJson.setId(departmentDto.getId());
            // name
            departmentJson.setName(departmentDto.getDepartment());
        }

        // 3. users
        UserJson userJson = new UserJson();
        res.setUser(userJson);
        if (userDto != null) {
            // id
            userJson.setId(userDto.getId());
            // name
            userJson.setName(userDto.getUsername());
            // department
            userJson.setDepartmentId(userDto.getDepartmentId());
        }

        // 5. products
        List<ProductJson> productJsons = new ArrayList<>();
        res.setProducts(productJsons);
        for (ProductDto productDto : productDtos) {
            ProductJson productJson = new ProductJson();
            productJsons.add(productJson);
            // id
            productJson.setId(productDto.getId());
            // productName
            productJson.setProductName(productDto.getProductName());
            // productType
            productJson.setProductType(productDto.getProductType());
            // productCode
            productJson.setProductCode(productDto.getProductCode());
            // lot
            productJson.setLot(productDto.getRequestLot());
            // sizeH
            productJson.setSizeH(productDto.getSizeH());
            // sizeD
            productJson.setSizeD(productDto.getSizeD());
            // sizeW
            productJson.setSizeW(productDto.getSizeW());
            // paperSizeW
            productJson.setPaperSizeW(productDto.getPaperSizeW());
            // paperSizeH
            productJson.setPaperSizeH(productDto.getPaperSizeH());
            // paperNameId
            productJson.setPaperNameId(productDto.getPaperNameId());
            // paperWeight
            productJson.setPaperWeight(productDto.getPaperWeight());
            // colorIdF
            productJson.setColorIdF(productDto.getColorIdF());
            // specialColorF
            productJson.setSpecialColorF(productDto.getSpecialColorF());
            // colorIdB
            productJson.setColorIdB(productDto.getColorIdB());
            // specialColorB
            productJson.setSpecialColorB(productDto.getSpecialColorB());
            // printMethod
            productJson.setPrintMethod(productDto.getPrintMethod());
            // laminationFlute
            productJson.setLaminationFlute(productDto.getLaminationFlute());
            // laminationMediumBasicWeight
            productJson.setLaminationMediumBasicWeight(productDto.getLaminationMediumBasicWeight());
            // laminationBackBasicWeight
            productJson.setLaminationBackBasicWeight(productDto.getLaminationBackBasicWeight());
            // customerProductCode
            productJson.setCustomerProductCode(productDto.getCustomerProductCode());
            // factoryId
            productJson.setFactoryId(productDto.getFactoryId());
            // memo1
            productJson.setMemo1(productDto.getMemo1());
            // memo2
            productJson.setMemo2(productDto.getMemo2());
            // memo3
            productJson.setMemo3(productDto.getMemo3());
            // shapeId
            productJson.setShapeId(productDto.getShapeId());
            // laminationPaperTypeMedium
            productJson.setLaminationPaperTypeMedium(productDto.getLaminationPaperTypeMedium());
            // laminationPaperTypeBack
            productJson.setLaminationPaperTypeBack(productDto.getLaminationPaperTypeBack());
            // laminationFrontBasicWeight
            productJson.setLaminationFrontBasicWeight(productDto.getLaminationFrontBasicWeight());
            // laminationPaperTypeFront
            productJson.setLaminationPaperTypeFront(productDto.getLaminationPaperTypeFront());
            // laminationABasicWeight
            productJson.setLaminationABasicWeight(productDto.getLaminationABasicWeight());
            // laminationPaperTypeA
            productJson.setLaminationPaperTypeA(productDto.getLaminationPaperTypeA());
            // laminationBBasicWeight
            productJson.setLaminationBBasicWeight(productDto.getLaminationBBasicWeight());
            // laminationPaperTypeB
            productJson.setLaminationPaperTypeB(productDto.getLaminationPaperTypeB());
            // itemCode
            productJson.setItemCode(productDto.getItemCode());
            // laminationAId
            productJson.setLaminationAId(productDto.getLaminationAId());
            // laminationBId
            productJson.setLaminationBId(productDto.getLaminationBId());
            // laminationFrontId
            productJson.setLaminationFrontId(productDto.getLaminationFrontId());
            // laminationBackId
            productJson.setLaminationBackId(productDto.getLaminationBackId());
            // laminationMediumId
            productJson.setLaminationMediumId(productDto.getLaminationMediumId());
            // updateDate
            productJson.setUpdateDate(productDto.getUpdatedDate());

            productJson.setCartonShippingType(productDto.getCartonShippingType());

            // 木型情報
            productJson.setHasWooden(productService.hasWooden(productDto));
            productJson.setWoodenExpiredDate(productService.woodenExpireDate(productDto));

            // find master
            // paperJson
            if (productDto.getPaperId() != null) {
                MstPaperDto mstPaperDto = mstDataService.sv01314GetMstPaperById(productDto.getPaperId());
                if (mstPaperDto != null) {
                    PaperJson paperJson = new PaperJson();
                    productJson.setPaperJson(paperJson);
                    // id
                    paperJson.setId(mstPaperDto.getId());
                    // paperName
                    paperJson.setPaperName(mstPaperDto.getPaperName());
                    // abbr
                    paperJson.setAbbr(mstPaperDto.getAbbr());
                    // materialName
                    paperJson.setMaterialName(mstPaperDto.getMaterialName());
                }
            }
            // laminationPaperTypeAJson
            productJson.setLaminationPaperTypeAJson(createLaminationPaperJson(productDto.getLaminationPaperTypeA()));
            // laminationPaperTypeBJson
            productJson.setLaminationPaperTypeBJson(createLaminationPaperJson(productDto.getLaminationPaperTypeB()));
            // laminationPaperTypeFrontJson
            productJson.setLaminationPaperTypeFrontJson(createLaminationPaperJson(productDto.getLaminationPaperTypeFront()));
            // laminationPaperTypeBackJson
            productJson.setLaminationPaperTypeBackJson(createLaminationPaperJson(productDto.getLaminationPaperTypeBack()));
            // laminationPaperTypeMediumJson
            productJson.setLaminationPaperTypeMediumJson(createLaminationPaperJson(productDto.getLaminationPaperTypeMedium()));
            // laminationAJson
            productJson.setLaminationAJson(createLaminationPaperJson(productDto.getLaminationAId()));
            // laminationBJson
            productJson.setLaminationBJson(createLaminationPaperJson(productDto.getLaminationBId()));
            // laminationFrontJson
            productJson.setLaminationFrontJson(createLaminationPaperJson(productDto.getLaminationFrontId()));
            // laminationBackJson
            productJson.setLaminationBackJson(createLaminationPaperJson(productDto.getLaminationBackId()));
            // laminationMediumJson
            productJson.setLaminationMediumJson(createLaminationPaperJson(productDto.getLaminationMediumId()));

            // img
            String imgUrl = StringUtils.EMPTY;
            ProductFileDto productFile = productService.sv00829GetPrimaryProductFile(productDto.getId());
            if (productFile != null) {
                FileDto fileDto = fileService.sv00609GetFileInfo(productFile.getFileId());
                imgUrl = fileService.sv00618GetThumbnail(fileDto);
            }
            productJson.setImgUrl(imgUrl);
        }
        // 6. orderItems
        List<OrderItemJson> orderItemJsons = new ArrayList<>();
        res.setOrderItems(orderItemJsons);
        for (OrderItemDto orderItemDto : orderItemDtos) {
            OrderItemJson orderItemJson = constructOrderItemJson(orderItemDto, shippingMap.get(orderItemDto.getId()), loadingMap);
            orderItemJsons.add(orderItemJson);
        }
        // 7. destinations
        List<DestinationJson> destinationJsons = new ArrayList<>();
        res.setDestinations(destinationJsons);
        for (ShippingDestinationDto shippingDestinationDto : shippingDestinationDtos) {
            DestinationJson destinationJson = constructDestinationJson(shippingDestinationDto);
            destinationJsons.add(destinationJson);
        }
        // 8. loadings
        List<LoadingJson> loadingJsons = new ArrayList<>();
        res.setLoadings(loadingJsons);
        for (LoadingAddressDto loadingAddressDto : loadingAddressDtos) {
            LoadingJson loadingJson = new LoadingJson();
            loadingJsons.add(loadingJson);
            // id
            loadingJson.setId(loadingAddressDto.getId());
            // code
            loadingJson.setCode(loadingAddressDto.getCode());
            // name
            loadingJson.setName(loadingAddressDto.getName());
            // abbr
            loadingJson.setAbbr(loadingAddressDto.getAbbr());
        }

        return responseUsingGzip(res, MessageCode.INF001);
    }

    @Override
    public Result sfn030702AddShippingAddress() {

        // get request
        SFN030702Req req = requestJson(SFN030702Req.class);

        DestinationJson destinationJson = req.getDestination();

        // create new shipping destination
        ShippingDestinationDto destinationDto = new ShippingDestinationDto();
        // customerId
        destinationDto.setCustomerId(destinationJson.getCustomerId());
        // 納入先名
        destinationDto.setDeliveryName(destinationJson.getDeliveryName());
        // 納入先名（略称）
        destinationDto.setAbbreviation(destinationJson.getAbbreviation());
        // フリガナ
        destinationDto.setFurigana(destinationJson.getFurigana());
        // 略称カナ
        destinationDto.setAbbrFurigana(destinationJson.getAbbrFurigana());
        // 郵便番号
        destinationDto.setPostalCode(destinationJson.getPostalCode());
        // 地区コード
        destinationDto.setDistrictCode(destinationJson.getDistrictCode());
        // 住所１
        destinationDto.setDeliveryAddress1(destinationJson.getAddress1());
        // 住所２
        destinationDto.setDeliveryAddress2(destinationJson.getAddress2());
        // TEL
        destinationDto.setTel(destinationJson.getTel());
        // FAX
        destinationDto.setFax(destinationJson.getFax());
        // 担当部署
        destinationDto.setDeptName(destinationJson.getDeptName());
        // 得意先担当者
        destinationDto.setSalerName(destinationJson.getSalerName());
        // 納入可能車両サイズ
        destinationDto.setAvailableVehicleSize(destinationJson.getAvailableVehicleSize());
        // 時間指定有無
        destinationDto.setSpecifyTime(destinationJson.getSpecifyTime());
        destinationDto.setSpecifyTimeHour(destinationJson.getSpecifyTimeHour());
        destinationDto.setSpecifyTimeMinute(destinationJson.getSpecifyTimeMinute());
        destinationDto.setSpecifyTimePeriod(destinationJson.getSpecifyTimePeriod());
        // 付帯作業
        destinationDto.setExtraWork(destinationJson.getExtraWork());
        // 専用伝票有無
        destinationDto.setExtraMethod(destinationJson.getExtraMethod());
        // 備考
        String memo = destinationJson.getMemo();
        String memo1 = StringUtils.substring(memo, 0, 30);
        String memo2 = StringUtils.substring(memo, 30);
        destinationDto.setMemo1(memo1);
        destinationDto.setMemo2(memo2);

        // save destination
        jpaApi.withTransaction(() -> customerService.sv00518SaveNewShippingDestination(destinationDto));
        Integer destinationId = destinationDto.getId();

        // prepare jms call
        IF0121Json if0121Json = new IF0121Json();
        if0121Json.setDestinationId(destinationId);
        // call jms
        int ifResult = jmsApi.callIF0121(if0121Json);
        if (ifResult == JmsApi.RESULT_NG) {
            // delete failed shipping destination
            jpaApi.withTransaction(() -> customerService.sv00520RemoveShipingDestination(destinationDto));
            // IF NG
            return responseError(MessageCode.ERR001);
        }

        // refresh db
        ShippingDestinationDto rDestinationDto = jpaApi.withTransaction(() -> customerService.sv00519GetShippingDestinationById(destinationId));

        // prepare response
        SFN030702Res res = new SFN030702Res();
        DestinationJson rDestinationJson = constructDestinationJson(rDestinationDto);
        res.setDestination(rDestinationJson);

        return responseJson(res, MessageCode.INF001);
    }

    @Override
    public Result sfn030703RequestOrder() {

        // A. get request
        SFN030703Req req = requestJson(SFN030703Req.class);
        // request mode
        int mode = req.getMode();
        // 1. 案件情報取得
        // 注文作成の場合は元案件に対してリピート注文されたことにする。
        DealDto dealDto = mode == MODE_CREATE
                ? dealService.getSourceDealById(req.getDealId())
                : dealService.sv00301GetDealById(req.getDealId());
        int dealId = dealDto.getId();
        // current user
        UserDto currentUser = sv001AuthService.getCurrentUser();
        // orders
        List<OrderItemJson> orders = req.getOrders();
        // 2. validate
        // 3. check action creat/update/repeat
        boolean tmpIsRepeatOrder = false;
        if ((dealDto.getDealStatus() != null && dealDto.getDealStatus() > Enums.DealStatus.DESIGN_COMPLETE.getStatus())
                && mode == MODE_CREATE) {
            tmpIsRepeatOrder = true;
        }
        final boolean isRepeatOrder = tmpIsRepeatOrder;
        // 4. get current data
        List<OrderDto> bkOrderDtos = new ArrayList<>();
        List<OrderItemDto> bkOrderItemDtos = new ArrayList<>();
        List<ShippingPlanDto> bkShippingPlanDtos = new ArrayList<>();

        int currentSalesId;
        if (isRepeatOrder) {
            CustomerDto customerDto = customerService.sv00501GetCustomerByCustomerId(dealDto.getCustomerId());
            String picCode = customerDto.getPicCode();
            UserDto currentSales = userService.sv00104getUserByUserCode(picCode);
            currentSalesId = currentSales.getId();
        }else{
            // order
            OrderDto orderDto = orderService.sv00910GetOrderByDealId(dealId);
            if (orderDto != null) {
                bkOrderDtos.add(orderDto);
            }
            // order item
            bkOrderItemDtos.addAll(orderService.sv00901GetOrderItemByDealId(dealId));
            // shippings
            List<Integer> tmpOrderItemIds = bkOrderItemDtos.stream().map(orderItemDto -> orderItemDto.getId()).collect(Collectors.toList());
            bkShippingPlanDtos.addAll(orderService.sv00907GetShippingPlanByOrderItemIds(tmpOrderItemIds));
            currentSalesId = dealDto.getSalesId();
        }

        // B. save DB
        List<OrderDto> nOrderDto = new ArrayList<>();
        Map<Integer, OrderItemDto> nOrderItemDtos = new HashMap<>();
        Map<Integer, ShippingPlanDto> nShippingPlanDtos = new HashMap<>();

        int finalCurrentSalesId = currentSalesId;
        int oDealId = jpaApi.withTransaction(() -> {
            // 0. create new temp deal if repeat
            int tmpDealId = dealId;
            if (isRepeatOrder) {
                // create temporary order
                DealDto tmpDeal = new DealDto();
                // 案件名
                tmpDeal.setDealName(dealDto.getDealName());
                // 案件区分
                tmpDeal.setDealType(Enums.DealType.REPEAT.getType());
                // 担当営業名
                tmpDeal.setSalesId(finalCurrentSalesId);
                tmpDeal.setCreatedUser(finalCurrentSalesId);
                // 受注予定額
                tmpDeal.setEstTotalDeal(dealDto.getEstTotalDeal());
                // ステータス
                tmpDeal.setDealStatus(Enums.DealStatus.ORDER_CONFIRMATION.getStatus());
                // 得意先ID
                tmpDeal.setCustomerId(dealDto.getCustomerId());
                // 得意先
                tmpDeal.setCustomerName(dealDto.getCustomerName());
                // 納期
                tmpDeal.setDeliveryDate(dealDto.getDeliveryDate());
                // jobInprocess
                tmpDeal.setJobInprocess(0);
                // templateFlag
                tmpDeal.setTemplateFlag(0);
                // deleteFlag - mark temporary as deleted
                tmpDeal.setDeleteFlag(1);
                // closedFlag
                tmpDeal.setClosedFlag(0);
                // リピート元案件
                tmpDeal.setSourceDealId(dealDto.getId());
                // save tmp deal
                DealDto tmpDealDto = dealService.sv00307SaveDeal(tmpDeal);
                tmpDealId = tmpDealDto.getId();
            }

            // 1. get order
            OrderDto orderDto = orderService.sv00910GetOrderByDealId(tmpDealId);
            if (orderDto == null) {
                // create order if not exists
                orderDto = new OrderDto();
                orderDto.setDealId(tmpDealId);
            }
            // save
            orderService.sv00903SaveOrderDto(orderDto);
            nOrderDto.add(orderDto);

            // 2. construct data
            // 2.1 create data map
            // 2.2.1 order item
            List<OrderItemDto> orderItemDtos = orderService.sv00901GetOrderItemByDealId(tmpDealId);
            Map<Integer, OrderItemDto> orderItemMap = new HashMap<>();
            orderItemDtos.forEach(orderItemDto -> orderItemMap.put(orderItemDto.getId(), orderItemDto));
            // 2.2.2 shipping
            List<ShippingPlanDto> shippingPlanDtos = orderService.sv00907GetShippingPlanByOrderItemIds(orderItemMap.keySet());
            Map<Integer, ShippingPlanDto> shippingMap = new HashMap<>();
            shippingPlanDtos.forEach(shippingPlanDto -> shippingMap.put(shippingPlanDto.getId(), shippingPlanDto));

            // 2.2 order
            for (OrderItemJson order : orders) {
                // 2.2.1 construct
                OrderItemDto orderItemDto = null;
                if (order.getId() != null && !isRepeatOrder) {
                    // update
                    orderItemDto = orderItemMap.remove(order.getId());
                } else {
                    // create new
                    orderItemDto = new OrderItemDto();
                    // orderId
                    orderItemDto.setOrderId(orderDto.getId());
                    // productId
                    orderItemDto.setProductId(order.getProductId());
                }
                // quantity
                Integer quantity = order.getQuantity();
                if (quantity == null) {
                    quantity = 0;
                }
                orderItemDto.setQuantity(quantity);
                // submittedPrice
                BigDecimal unitPrice = order.getUnitPrice();
                if (unitPrice == null) {
                    unitPrice = BigDecimal.ZERO;
                }
                orderItemDto.setSubmittedPrice(unitPrice);
                // total
                BigDecimal total = unitPrice.multiply(BigDecimal.valueOf(quantity));
                orderItemDto.setTotal(total);
                // productionSpecs
                orderItemDto.setProductionSpecs(order.getProductionSpecs());
                // printVersion
                orderItemDto.setPrintVersion(order.getPrintVersion());
                // wooden
                orderItemDto.setWooden(order.getWooden());
                // mold
                orderItemDto.setMold(order.getMold());
                // passageOrder
                orderItemDto.setPassageOrder(order.getPassageOrder());
                // sampleLift
                orderItemDto.setSampleLift(order.getSampleLift());
                // sampleSales
                orderItemDto.setSampleSales(order.getSampleSales());
                // sampleCustomer
                orderItemDto.setSampleCustomer(order.getSampleCustomer());
                // sampleItem
                orderItemDto.setSampleItem(order.getSampleItem());
                // sampleProduct
                orderItemDto.setSampleProduct(order.getSampleProduct());
                // specialNote
                orderItemDto.setSpecialNote(order.getSpecialNote());
                // 相手管理No
                orderItemDto.setCustomerManagedId(order.getCustomerManagedId());

                // 2.2.2 save order
                orderService.sv00911SaveOrderItem(orderItemDto);
                nOrderItemDtos.put(orderItemDto.getId(), orderItemDto);

                // 2.3 shippings
                List<ShippingJson> shippings = order.getShippings();
                for (ShippingJson shipping : shippings) {
                    // 2.3.1 construct
                    ShippingPlanDto shippingDto = null;
                    if (shipping.getId() != null && !isRepeatOrder) {
                        // update
                        shippingDto = shippingMap.remove(shipping.getId());
                    } else {
                        // create
                        shippingDto = new ShippingPlanDto();
                        // orderItemId
                        shippingDto.setOrderItemId(orderItemDto.getId());
                    }
                    // no
                    shippingDto.setNo(shipping.getNo());
                    // shippingDate
                    shippingDto.setShippingDate(shipping.getShippingDate());
                    // deliveryDate
                    shippingDto.setDeliveryDate(shipping.getDeliveryDate());
                    // loadingAddressId
                    Integer loadingAddressId = null;
                    LoadingJson loadingAddress = shipping.getLoadingAddress();
                    if (loadingAddress != null) {
                        loadingAddressId = loadingAddress.getId();
                    }
                    shippingDto.setLoadingAddressName(shipping.getLoadingAddressName());
                    shippingDto.setLoadingAddressId(loadingAddressId);
                    // quantity
                    shippingDto.setQuantity(shipping.getQuantity());
                    // shippingCompany
                    shippingDto.setShippingCompany(shipping.getShippingCompany());
                    // specifyTime
                    shippingDto.setSpecifyTime(shipping.getSpecifyTime());
                    // specifyTime
                    shippingDto.setSpecifyTimeName(shipping.getSpecifyTimeName());
                    // specifyTimeHour
                    shippingDto.setSpecifyTimeHour(shipping.getSpecifyTimeHour());
                    // specifyTimeMinute
                    shippingDto.setSpecifyTimeMinute(shipping.getSpecifyTimeMinute());
                    // specifyTimePeriod
                    shippingDto.setSpecifyTimePeriod(shipping.getSpecifyTimePeriod());
                    // destinationId
                    shippingDto.setDestinationId(shipping.getDestinationId());

                    // 2.3.2 save
                    orderService.sv00914SaveShippingPlan(shippingDto);
                    nShippingPlanDtos.put(shippingDto.getId(), shippingDto);
                }
            }

            // 2.3 remove redundant
            shippingMap.values().forEach(shippingPlanDto -> orderService.sv00913RemoveShippingPlan(shippingPlanDto));
            orderItemMap.values().forEach(orderItemDto -> orderService.sv00912RemoveOrderItem(orderItemDto));

            return tmpDealId;
        });

        // C. call IF
        IF0131Json if0131Json = new IF0131Json();
        if0131Json.setDealId(oDealId);
        if0131Json.setUserId(currentUser.getId());

        // D. call jms
        int ifResult = jmsApi.callIF0131(if0131Json);
        if (ifResult == JmsApi.RESULT_NG) {
            // IF NG
            // revert db change
            jpaApi.withTransaction(() -> {
                // 1. update order item
                for (OrderItemDto bkOrderItemDto : bkOrderItemDtos) {
                    // revert order item
                    orderService.sv00911SaveOrderItem(bkOrderItemDto);
                    // remove from redundant list
                    nOrderItemDtos.remove(bkOrderItemDto.getId());
                }
                // 2. update shipping
                for (ShippingPlanDto bkShippingPlanDto : bkShippingPlanDtos) {
                    // revert shipping
                    orderService.sv00914SaveShippingPlan(bkShippingPlanDto);
                    // remove from redundant list
                    nShippingPlanDtos.remove(bkShippingPlanDto.getId());
                }
                // 3. remove redundant shipping
                nShippingPlanDtos.values().forEach(shippingPlanDto -> orderService.sv00913RemoveShippingPlan(shippingPlanDto));
                // 4. remove redundant order item
                nOrderItemDtos.values().forEach(orderItemDto -> orderService.sv00912RemoveOrderItem(orderItemDto));
                // 5. revert order
                if (!bkOrderDtos.isEmpty()) {
                    // revert order
                    orderService.sv00903SaveOrderDto(bkOrderDtos.get(0));
                } else {
                    // delete order
                    orderService.sv00915RemoveOrder(nOrderDto.get(0));
                }
                // 6. revert deal
                if (isRepeatOrder) {
                    dealService.sv003033RemoveDealById(oDealId);
                }
            });

            // response error
            return responseError(MessageCode.ERR001);
        }

        // E. reload data
        final List<OrderItemDto> orderItemDtos = new ArrayList<>();
        Map<Integer, List<ShippingPlanDto>> shippingMap = new HashMap<>();
        Map<Integer, LoadingAddressDto> loadingMap = new HashMap<>();
        DealDto nDealDto = jpaApi.withTransaction(() -> {
            // 1. deal info
            DealDto rDealDto = dealService.sv00301GetDealById(oDealId);
            if (isRepeatOrder) {
                // remark deleted flag
                rDealDto.setDeleteFlag(0);

                dealService.sv00307SaveDeal(rDealDto);
            }

            // 2. order info
            orderItemDtos.addAll(orderService.sv00901GetOrderItemByDealId(oDealId));
            for (OrderItemDto orderItemDto : orderItemDtos) {
                shippingMap.put(orderItemDto.getId(), new ArrayList<>());
            }
            // 3. shipping info
            List<ShippingPlanDto> allShippings = orderService.sv00907GetShippingPlanByOrderItemIds(shippingMap.keySet());
            for (ShippingPlanDto shipping : allShippings) {
                shippingMap.get(shipping.getOrderItemId()).add(shipping);
                loadingMap.put(shipping.getLoadingAddressId(), null);
            }
            // 4. order loading address
            List<LoadingAddressDto> addressDtos = orderService.sv00909GetLoadingAddressByIds(loadingMap.keySet());
            for (LoadingAddressDto addressDto : addressDtos) {
                loadingMap.put(addressDto.getId(), addressDto);
            }
            // 5. generate deal data
            if (isRepeatOrder) {
                // 5.1 add product to new deal
                for (OrderItemDto orderItemDto : orderItemDtos) {
                    Integer productId = orderItemDto.getProductId();
                    ProductDto productDto = productService.sv00810GetProductById(productId);
                    DealProductDto oldDealProductDto = dealProductService.sv01405GetDealProductByDealIdAndProductId(dealId, productId);

                    dealService.sv00330UsingProductFromDeal(oldDealProductDto, oDealId, productDto);
                }

                // 5.2 save checklist
                List<ChecksheetDto> checksheetDtos = dealService.sv00326GetCheckSheetsByDealId(dealId);
                for (ChecksheetDto checksheetDto : checksheetDtos) {
                    ChecksheetDto newChecksheet = new ChecksheetDto();
                    newChecksheet.setDealId(oDealId);
                    newChecksheet.setQuestionCode(checksheetDto.getQuestionCode());
                    newChecksheet.setTextArea1(checksheetDto.getTextArea1());
                    newChecksheet.setTextArea2(checksheetDto.getTextArea2());
                    newChecksheet.setRadioButton(checksheetDto.getRadioButton());
                    newChecksheet.setSelectBox1(checksheetDto.getSelectBox1());
                    newChecksheet.setSelectBox2(checksheetDto.getSelectBox2());
                    newChecksheet.setSelectBox3(checksheetDto.getSelectBox3());
                    newChecksheet.setCheckBox1(checksheetDto.getCheckBox1());
                    newChecksheet.setCheckBox2(checksheetDto.getCheckBox2());
                    newChecksheet.setCheckBox3(checksheetDto.getCheckBox3());

                    dealService.sv00327SaveCheckSheet(newChecksheet);
                }
            }

            return rDealDto;
        });

        // F. response
        SFN030703Res res = new SFN030703Res();
        // 1. deal
        DealJson dealJson = new DealJson();
        res.setDeal(dealJson);
        // deal code
        dealJson.setDealCode(nDealDto.getDealCode());
        // status
        dealJson.setDealStatus(nDealDto.getDealStatus());
        // deal delivery date
        dealJson.setDeliveryDate(nDealDto.getDeliveryDate());
        // deal total
        dealJson.setEstTotalDeal(nDealDto.getEstTotalDeal());
        // 2. order item
        List<OrderItemJson> orderItemJsons = new ArrayList<>();
        res.setOrderItems(orderItemJsons);
        for (OrderItemDto orderItemDto : orderItemDtos) {
            OrderItemJson orderItemJson = constructOrderItemJson(orderItemDto, shippingMap.get(orderItemDto.getId()), loadingMap);
            orderItemJsons.add(orderItemJson);
        }

        return responseJson(res, MessageCode.INF001);
    }

    @Override
    public Result sfn030704ExportProduct() {

        //リクエスト取得
        SFN030705Req req = requestJson(SFN030705Req.class);

        //
        String pdfFolder = reportGenerator.exportProductFile(req.getProductId(), req.getDealCode());
        if (Strings.isNullOrEmpty(pdfFolder)) return responseError(MessageCode.SF00307.ERR003);

        String result[] = pdfFolder.split(Constants.SLASH);
        if (ArrayUtils.isEmpty(result) || result.length < 2) {
            return responseError(MessageCode.SF00307.ERR003);
        }
        ProductDto productDto = productDao.find(req.getProductId());
        Integer productType = productDto.getProductType();
        SFN030705Res res = new SFN030705Res();
        res.setFileName(result[1]);
        String filePath = fileService.sv00621GetJasperProductReportURI(result[0], result[1], productType);
        res.setFilePath(filePath);

        return responseJson(res, MessageCode.SF00307.INF001);
    }

    private PaperJson createLaminationPaperJson(Integer laminationId) {
        if (laminationId != null) {
            MstLaminationDto mstLaminationDto = mstDataService.sv01336GetMstLaminationById(laminationId);
            if (mstLaminationDto != null) {
                PaperJson paperJson = new PaperJson();
                // id
                paperJson.setId(mstLaminationDto.getId());
                // paperName
                paperJson.setPaperName(mstLaminationDto.getPaperName());
                // abbr
                paperJson.setAbbr(mstLaminationDto.getAbbr());
                // materialName
                paperJson.setMaterialName(mstLaminationDto.getMaterialName());

                return paperJson;
            }
        }
        return null;
    }

    private DestinationJson constructDestinationJson(ShippingDestinationDto shippingDestinationDto) {
        DestinationJson destinationJson = new DestinationJson();
        // id
        destinationJson.setId(shippingDestinationDto.getId());
        // code
        destinationJson.setCode(shippingDestinationDto.getDennoPartnerCode());
        // customerId
        destinationJson.setCustomerId(shippingDestinationDto.getCustomerId());
        // deliveryName
        destinationJson.setDeliveryName(shippingDestinationDto.getDeliveryName());
        // abbreviation
        destinationJson.setAbbreviation(shippingDestinationDto.getAbbreviation());
        // furigana
        destinationJson.setFurigana(shippingDestinationDto.getFurigana());
        // abbrFurigana
        destinationJson.setAbbrFurigana(shippingDestinationDto.getAbbrFurigana());
        // postalCode
        destinationJson.setPostalCode(shippingDestinationDto.getPostalCode());
        // districtCode
        destinationJson.setDistrictCode(shippingDestinationDto.getDistrictCode());
        // address1
        destinationJson.setAddress1(shippingDestinationDto.getDeliveryAddress1());
        // address2
        destinationJson.setAddress2(shippingDestinationDto.getDeliveryAddress2());
        // tel
        destinationJson.setTel(shippingDestinationDto.getTel());
        // fax
        destinationJson.setFax(shippingDestinationDto.getFax());
        // deptName
        destinationJson.setDeptName(shippingDestinationDto.getDeptName());
        // salerName
        destinationJson.setSalerName(shippingDestinationDto.getSalerName());
        // availableVehicleSize
        destinationJson.setAvailableVehicleSize(shippingDestinationDto.getAvailableVehicleSize());
        // specifyTime
        destinationJson.setSpecifyTime(shippingDestinationDto.getSpecifyTime());
        destinationJson.setSpecifyTimeHour(shippingDestinationDto.getSpecifyTimeHour());
        destinationJson.setSpecifyTimeMinute(shippingDestinationDto.getSpecifyTimeMinute());
        destinationJson.setSpecifyTimePeriod(shippingDestinationDto.getSpecifyTimePeriod());
        // extraWork
        destinationJson.setExtraWork(shippingDestinationDto.getExtraWork());
        // extraMethod
        destinationJson.setExtraMethod(shippingDestinationDto.getExtraMethod());
        // memo
        String memo1 = shippingDestinationDto.getMemo1();
        String memo2 = shippingDestinationDto.getMemo2();
        StringBuilder memo = new StringBuilder();
        if (memo1 != null) {
            memo.append(memo1).append(Constants.NEW_LINE);
        }
        if (memo2 != null) {
            memo.append(memo2);
        }
        destinationJson.setMemo(memo.toString());

        return destinationJson;
    }

    private OrderItemJson constructOrderItemJson(OrderItemDto orderItemDto,
                                                 List<ShippingPlanDto> shippingPlanDtos, Map<Integer, LoadingAddressDto> loadingMap) {
        OrderItemJson orderItemJson = new OrderItemJson();
        // id
        orderItemJson.setId(orderItemDto.getId());
        // productId
        orderItemJson.setProductId(orderItemDto.getProductId());
        // quantity
        orderItemJson.setQuantity(orderItemDto.getQuantity());
        // orderCode
        orderItemJson.setOrderCode(orderItemDto.getOrderCode());
        // orderCode2
        if ( orderItemDto.getOrderCode2() != null ) {
            orderItemJson.setOrderCode2(orderItemDto.getOrderCode2());
        }
        // unitPrice
        orderItemJson.setUnitPrice(orderItemDto.getSubmittedPrice());
        // 相手管理No
        orderItemJson.setCustomerManagedId(orderItemDto.getCustomerManagedId());
        // productionSpecs
        orderItemJson.setProductionSpecs(orderItemDto.getProductionSpecs());
        // printVersion
        orderItemJson.setPrintVersion(orderItemDto.getPrintVersion());
        // wooden
        orderItemJson.setWooden(orderItemDto.getWooden());
        // mold
        orderItemJson.setMold(orderItemDto.getMold());
        // passageOrder
        orderItemJson.setPassageOrder(orderItemDto.getPassageOrder());
        // sampleLift
        orderItemJson.setSampleLift(orderItemDto.getSampleLift());
        // sampleSales
        orderItemJson.setSampleSales(orderItemDto.getSampleSales());
        // sampleCustomer
        orderItemJson.setSampleCustomer(orderItemDto.getSampleCustomer());
        // sampleItem
        orderItemJson.setSampleItem(orderItemDto.getSampleItem());
        // sampleProduct
        orderItemJson.setSampleProduct(orderItemDto.getSampleProduct());
        // sampleNote
        orderItemJson.setSpecialNote(orderItemDto.getSpecialNote());

        List<ShippingJson> shippingJsons = new ArrayList<>();
        orderItemJson.setShippings(shippingJsons);
        if (shippingPlanDtos != null) {
            for (ShippingPlanDto shippingPlanDto : shippingPlanDtos) {
                ShippingJson shippingJson = new ShippingJson();
                shippingJsons.add(shippingJson);
                // id
                shippingJson.setId(shippingPlanDto.getId());
                // no
                shippingJson.setNo(shippingPlanDto.getNo());
                // shippingDate
                shippingJson.setShippingDate(shippingPlanDto.getShippingDate());
                // deliveryDate
                shippingJson.setDeliveryDate(shippingPlanDto.getDeliveryDate());
                // quantity
                shippingJson.setQuantity(shippingPlanDto.getQuantity());
                // shippingCompany
                shippingJson.setShippingCompany(shippingPlanDto.getShippingCompany());
                // specifyTime
                shippingJson.setSpecifyTime(shippingPlanDto.getSpecifyTime());
                shippingJson.setSpecifyTimeName(shippingPlanDto.getSpecifyTimeName());
                // specifyTimeHour
                shippingJson.setSpecifyTimeHour(shippingPlanDto.getSpecifyTimeHour());
                // specifyTimeMinute
                shippingJson.setSpecifyTimeMinute(shippingPlanDto.getSpecifyTimeMinute());
                // specifyTimePeriod
                shippingJson.setSpecifyTimePeriod(shippingPlanDto.getSpecifyTimePeriod());
                // destinationId
                shippingJson.setDestinationId(shippingPlanDto.getDestinationId());
                // loadingAddress
                LoadingJson loadingJson = new LoadingJson();
                shippingJson.setLoadingAddress(loadingJson);
                LoadingAddressDto loadingAddressDto = loadingMap.get(shippingPlanDto.getLoadingAddressId());
                if (loadingAddressDto != null) {
                    // id
                    loadingJson.setId(loadingAddressDto.getId());
                    // code
                    loadingJson.setCode(loadingAddressDto.getCode());
                    // name
                    loadingJson.setName(loadingAddressDto.getName());
                    // abbr
                    loadingJson.setAbbr(loadingAddressDto.getAbbr());
                    shippingJson.setLoadingAddressName(shippingPlanDto.getLoadingAddressName());
                }else{
                    shippingJson.setLoadingAddressName(shippingPlanDto.getLoadingAddressName());
                }
            }
        }

        return orderItemJson;
    }
}
