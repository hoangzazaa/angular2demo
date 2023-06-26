package vn.vnext.sefuri.sf.controller.impl;

import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import org.apache.commons.lang3.ArrayUtils;
import org.joda.time.DateTime;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00307Ctrl;
import vn.vnext.sefuri.sf.dao.ProductDao;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.json.SF00307.model.*;
import vn.vnext.sefuri.sf.json.SF00307.request.SF0030703Req;
import vn.vnext.sefuri.sf.json.SF00307.request.SF0030704Req;
import vn.vnext.sefuri.sf.json.SF00307.request.SF0030705Req;
import vn.vnext.sefuri.sf.json.SF00307.response.SF0030701Res;
import vn.vnext.sefuri.sf.json.SF00307.response.SF0030703Res;
import vn.vnext.sefuri.sf.json.SF00307.response.SF0030704Res;
import vn.vnext.sefuri.sf.json.SF00307.response.SF0030705Res;
import vn.vnext.sefuri.sf.module.export.ReportGenerator;
import vn.vnext.sefuri.sf.module.jms.JmsApi;
import vn.vnext.sefuri.sf.service.*;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.DateUtil;
import vn.vnext.sefuri.sf.util.LogUtil;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class SF00307CtrlImpl extends CommonCtrl implements SF00307Ctrl, Constants {
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
    private JmsApi jmsApi;

    @Inject
    private SV013MstDataService sv013MstDataService;

    @Inject
    private ReportGenerator reportGenerator;

    @Inject
    private ProductDao productDao;

    @Override
    public Result sf0030701Init(String dealCode) {
        SF0030701Res res = new SF0030701Res();
        // init deal by dealStatus [3,4]
        DealDto deal = dealService.sv00329GetDealByDealCode(dealCode, Enums.DealStatus.WAITING_FOR_SHIPMENT.getStatus());
        if (deal != null) {
            if (deal.getTemplateFlag() == Constants.TEMPLATE || deal.getDealStatus() < 3 || deal.getClosedFlag() == 1) {
                return responseError(MessageCode.SF00307.WRN001);
            }
        } else {
            return responseError(MessageCode.SF00307.WRN001);
        }

        //1. Get Deal info
        SF00307_DealJson dealJson = new SF00307_DealJson();
        dealJson.setModel(deal);

        //Get saler's name
        UserDto saler = userService.sv00204GetUserById(deal.getSalesId());
        if (saler != null && saler.getDepartmentId() != null) {
            DepartmentDto departmentDto = departmentService.sv01509GetDepartmentById(saler.getDepartmentId());
            if (departmentDto != null)
                dealJson.setSalerName(departmentDto.getDepartment() + Constants.SLASH_JP + saler.getUsername());
        }

        //Get customer's name
        CustomerDto customer = customerService.sv00501GetCustomerByCustomerId(deal.getCustomerId());
        List<ShippingDestinationDto> shippingDestinationDtos = new ArrayList<>();
        if (customer != null) {
            dealJson.setCustomerName(customer.getName());
            dealJson.setCustomerCode(customer.getCustomerCode());
            //5. get mst data
            shippingDestinationDtos = customerService.sv00517GetShippingDestinationByCustomerId(customer.getId());
        } else {
            dealJson.setCustomerName(deal.getCustomerName());
        }
        res.setDeal(dealJson);

        //2. get list quotation by dealId
        List<QuotationDto> quots = quotationService.sv00402GetQuotationsByDealId(deal.getId());
        List<SF00307_Quotation> quotJsons = CollectionUtil.isEmpty(quots) ? Collections.emptyList() : quots.stream()
                .map(q -> {
                    SF00307_Quotation json = new SF00307_Quotation();
                    json.setId(q.getId());
                    json.setUpdatedDate(q.getUpdatedDate());
                    json.setSubject(q.getSubject());
                    json.setQuotationCode(q.getQuotationCode());
                    json.setDealId(q.getDealId());
                    json.setMemo(q.getMemo());

                    List<QuotationItemDto> quotationItemDtos = quotationService
                            .sv00401GetQuotationItemsByQuotationId(q.getId());

                    QuotationItemDto maxQuantityItem = quotationItemDtos
                            .stream()
                            .filter(item -> item.getDealProductId() != null)
                            .reduce((item1, item2) -> {
                                if (item1.getQuantity() == null || item2.getQuantity() == null) {
                                    return item2;
                                }
                                return item1.getQuantity().compareTo(item2.getQuantity()) == 1 ? item1 : item2;
                            })
                            .orElse(null);

                    if (maxQuantityItem != null && maxQuantityItem.getQuantity() != null) {
                        json.setLot(maxQuantityItem.getQuantity().intValue());
                        json.setUnitPrice(maxQuantityItem.getSubmittedPrice());
                        json.setTotalCost(maxQuantityItem.getTotal());
                        json.setInterestRate(maxQuantityItem.getInterestRate());
                    }

                    return json;
                })
                .sorted(Comparator.comparing(SF00307_Quotation::getUpdatedDate).reversed())
                .collect(Collectors.toList());
        res.setQuotations(quotJsons);
        //3. get list product by quotationId and type quotationItem = 3
        List<SF00307_ProductBox> productBoxes = new ArrayList<>();

        if (CollectionUtil.isNotEmpty(quotJsons)) {
            productBoxes = this.getListProductBox(deal, quotJsons.get(0));
        }
        res.setProductBoxes(productBoxes);

        //4. get mst data shipping destination
        List<SF00307_ShippingDestination> shippingDestinationJsons =
                CollectionUtil.isEmpty(shippingDestinationDtos) ? Collections.emptyList() :
                        shippingDestinationDtos.stream()
                                .map(shipping -> {
                                    SF00307_ShippingDestination shippingDestination = new SF00307_ShippingDestination();
                                    shippingDestination.setData(shipping);

                                    return shippingDestination;
                                })
                                .collect(Collectors.toList());
        res.setShippingHistory(shippingDestinationJsons);

        return responseJson(res, MessageCode.SF00307.INF001);
    }

    @Override
    public Result sf0030702ExportProduct() {
        SF0030704Req req = requestJson(SF0030704Req.class);
        String pdfFolder = reportGenerator.exportProductFile(req.getProductId(), req.getDealCode());
        if (Strings.isNullOrEmpty(pdfFolder))
            return responseError(MessageCode.SF00307.ERR003);

        String result[] = pdfFolder.split(Constants.SLASH);
        if (ArrayUtils.isEmpty(result) || result.length < 2) {
            return responseError(MessageCode.SF00307.ERR003);
        }
        ProductDto productDto = productDao.find(req.getProductId());
        Integer productType = productDto.getProductType();
        SF0030704Res res = new SF0030704Res();
        res.setFileName(result[1]);
        String filePath = fileService.sv00621GetJasperProductReportURI(result[0], result[1], productType);
        res.setFilePath(filePath);

        return responseJson(res, MessageCode.SF00307.INF001);
    }

    @Override
    public Result sf0030703FindProducts() {
        //1.request
        SF0030703Req req = requestJson(SF0030703Req.class);
        //1.1 parse data
        Integer dealId = req.getDealId();
        DealDto dealDto = dealService.sv00301GetDealById(dealId);
        Integer quotationId = req.getQuotationId();

        QuotationDto quotationDto = quotationService.sv00410GetQuotationById(quotationId);
        SF00307_Quotation selectedQuotation = new SF00307_Quotation();
        selectedQuotation.setId(quotationDto.getId());
        selectedQuotation.setUpdatedDate(quotationDto.getUpdatedDate());
        selectedQuotation.setSubject(quotationDto.getSubject());
        selectedQuotation.setQuotationCode(quotationDto.getQuotationCode());
        selectedQuotation.setDealId(quotationDto.getDealId());
        selectedQuotation.setMemo(quotationDto.getMemo());

        //2. response
        SF0030703Res res = new SF0030703Res();

        List<SF00307_ProductBox> productBoxes = new ArrayList<>();

        if (quotationDto != null) {
            productBoxes = this.getListProductBox(dealDto, selectedQuotation);
            // list product box by quotationId
            res.setProductBoxes(productBoxes);

            return responseJson(res, MessageCode.SF00307.INF001);
        }

        return responseError(MessageCode.ERR001);
    }

    @Override
    public Result sf0030704RequestOrder() {
        SF0030705Req req = requestJson(SF0030705Req.class);

        DealDto target = this.dealService.sv00301GetDealById(req.getDealId());
        //Check deal status order
        if (canCreatOrder(target)) {
            return this.createOrder(target, req);
        }
        // else deal status = 4 -> repeat order
        else if (canRepeatOrder(target)) {
            target = this.dealService.sv00332RepeatDeal(target);
            return this.createOrder(target, req);
        }

        return responseError(MessageCode.SF00307.ERR005);
    }

    private boolean canCreatOrder(DealDto deal) {
        return Enums.DealStatus.DESIGN_COMPLETE.getStatus().equals(deal.getDealStatus());
    }

    private boolean canRepeatOrder(DealDto deal) {
        return Enums.DealStatus.ORDER_CONFIRMATION.getStatus().equals(deal.getDealStatus());
    }

    private Result createOrder(DealDto target, SF0030705Req req) {
        SF00307_ShippingDestination shippingDestination = req.getShippingDestination();
        List<SF00307_ShippingInstruction> shippingInstructions = req.getShippingInstructions();
        if (shippingDestination == null || CollectionUtil.isEmpty(shippingInstructions))
            return responseError(MessageCode.SF00307.ERR004);

        // flag to check
        //FIXME - based on #2798
        Integer saveToDennoFlag = 1;//shippingDestination.getSaveToDennoFlag();
        Integer defaultFlag = shippingDestination.getDefaultFlag();

        OrderDto orderDto = new OrderDto();
        orderDto.setDealId(target.getId());

        // save order
        orderDto = orderService.sv00903SaveOrderDto(orderDto);

        // get list product id
        List<Integer> productIds = shippingInstructions.stream()
                .filter(si -> si.getProductId() != null)
                .map(SF00307_ShippingInstruction::getProductId)
                .collect(Collectors.toList());

        if (CollectionUtil.isNotEmpty(shippingInstructions)) {
            final Integer orderId = orderDto.getId();
            List<OrderItemDto> orderItems = Lists.newArrayList();

            shippingInstructions.forEach(st -> {
                orderItems.add(getOrderItemDto(st, orderId));
            });

            orderDto.setOrderItems(orderItems);
        }

        ShippingDestinationDto shippingDto = shippingDestination.getData();
        if (shippingDestination.getCustomerId() != null) {
            //If '得意先名を出荷元名として表示する' checkbox is checked then update delivery name by customer name
            CustomerDto customer = customerService.sv00501GetCustomerByCustomerId(shippingDestination.getCustomerId());
            if (defaultFlag == 1) {
                shippingDto.setDeliveryName(customer.getName());
            }
        }

        int result = 0;
        final boolean BYPASS_IF = true;
        if (!BYPASS_IF) {
            //FOR IF execute {0 - success, 99 - failure}
            // call IF to update shipping destination
            // TODO: comment test
//        synchronized (this) {
//            result = jmsApi.callIF0121(shippingDto);
//        }
//
//        if (result != 0)
//            return responseError(MessageCode.SF00307.ERR001);
//
//        // call IF to create order
//        synchronized (this) {
//            result = jmsApi.callIF0131(orderDto);
//        }
//
//        if (result != 0)
//            return responseError(MessageCode.SF00307.ERR002);

        }

        // if update Denno success then update salesfront system
        productService.sv00837RequestOrder(orderDto, shippingDto, saveToDennoFlag, defaultFlag, productIds);

        SF0030705Res res = new SF0030705Res();
        res.setDealCode(target.getDealCode());

        return responseJson(res, MessageCode.SF00307.INF001);
    }

    private OrderItemDto getOrderItemDto(final SF00307_ShippingInstruction shippingInstruction, final Integer orderId) {
        //FIXME - based on #2798
        OrderItemDto orderItem = new OrderItemDto();
        orderItem.setOrderId(orderId);
        orderItem.setProductId(shippingInstruction.getProductId());
        orderItem.setQuantity(shippingInstruction.getQuantity());
        orderItem.setSubmittedPrice(shippingInstruction.getSubmittedPrice());
//        orderItem.setLimitQuantity(shippingInstruction.getLimitQuantity());
//        orderItem.setShipTime(shippingInstruction.getShipTime());
//        orderItem.setShippingCompanyId(shippingInstruction.getShippingCompanyId());
//        orderItem.setMemo(shippingInstruction.getMemo());

        try {
            if (!Strings.isNullOrEmpty(shippingInstruction.getShipDate())) {
                String shipDate = DateUtil.formatDate(new DateTime(shippingInstruction.getShipDate()), DateUtil.MM_DD_DATE_FORMAT);
//                orderItem.setShipDate(shipDate);
            }
        } catch (Exception e) {
            LogUtil.getLogger(SF00307CtrlImpl.class).error("shipDate not a date", e.getCause());
        }

        return orderItem;
    }

    private Integer calculateNoOfDays(final DateTime updatedDate) {
        if (updatedDate != null) {
            long millisecondsPerDay = 24 * 60 * 60 * 1000;
            return Math.round(Math.abs((DateUtil.getSysDate().getMillis() - updatedDate.getMillis()) / (millisecondsPerDay)));
        }

        return null;
    }

    private SF00307_Product getProductJson(final ProductDto product, final QuotationItemDto quotationItem) {
        SF00307_Product productJson = new SF00307_Product();
        productJson.setModel(product);
        productJson.setMemo(productService.sv00836GetMemoProduct(product));
        // set paperName
        productJson.setPaperName(sv013MstDataService.sv01329GetPaperNameHaveId100(product));
        //1. set product file
        ProductFileDto productFile = productService.sv00829GetPrimaryProductFile(product.getId());
        if (productFile != null) {
            FileDto fileDto = fileService.sv00609GetFileInfo(productFile.getFileId());
            productJson.setSrcImg(fileService.sv00618GetThumbnail(fileDto));
        }

        productJson.setLot(quotationItem.getQuantity().intValue());
        productJson.setUnitPrice(quotationItem.getSubmittedPrice());
        productJson.setTotalCost(quotationItem.getTotal());

        return productJson;
    }

    private List<SF00307_TransHistory> getStocks(final DealDto deal, final Integer productId) {
        List<OrderItemDto> orderItems = orderService.sv00901GetOrderItemByDealId(deal.getId());
        if (CollectionUtil.isEmpty(orderItems))
            return Collections.emptyList();


        List<SF00307_TransHistory> transHistoryJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(orderItems)) {
            for (OrderItemDto orderItemDto : orderItems) {
                if (orderItemDto.getProductId().equals(productId)) {
                    SF00307_TransHistory transHistoryJson = new SF00307_TransHistory();
                    transHistoryJson.setDealName(deal.getDealName());
                    transHistoryJson.setProductId(orderItemDto.getProductId());
                    transHistoryJson.setSubmittedPrice(orderItemDto.getSubmittedPrice());
                    transHistoryJson.setTotal(orderItemDto.getTotal());
                    transHistoryJson.setQuantity(orderItemDto.getQuantity());

                    //set orderJson
                    if (orderItemDto.getOrderId() != null) {
                        OrderDto orderDto = orderService.sv00902GetOrderById(orderItemDto.getOrderId());
                        transHistoryJson.setUpdatedDate(orderDto.getUpdatedDate());
                    }
                    transHistoryJsons.add(transHistoryJson);
                }
            }
        }

        return transHistoryJsons;
    }

    private SF00307_Inventory getInventoryJson(final ProductDto product, final DealProductDto dealProduct,
                                               final List<SF00307_TransHistory> transHistoryJsons) {
        SF00307_Inventory inventoryJson = new SF00307_Inventory();
        if (CollectionUtil.isEmpty(transHistoryJsons))
            return inventoryJson;

        inventoryJson.setProductName(product.getProductName());
        //set Lot+Estimated Unit Price
        ProductOutputDto productOutPutSelected = productService.sv00827GetProductOutPutSelected(dealProduct.getId());
        if (productOutPutSelected != null) {
            inventoryJson.setQuantity(productOutPutSelected.getLot());
            inventoryJson.setUnitPrice(productOutPutSelected.getEstimatedUnitPrice());
        }

        //set quantity Stock
        //26-Apr-17: replace check 'dennoProductCode' by 'itemCode'
        if (product.getItemCode() != null) {
            CurrentStockDto currentStock = orderService.sv00904GetCurrentStock(product.getItemCode());
            if (currentStock != null)
                inventoryJson.setQuantity(currentStock.getTotal());
        }

        DateTime updatedDate = transHistoryJsons.get(0).getUpdatedDate();
        inventoryJson.setDays(calculateNoOfDays(updatedDate));

        return inventoryJson;
    }

    private List<SF00307_ProductBox> getListProductBox(final DealDto dealDto, final SF00307_Quotation quotation) {

        List<SF00307_ProductBox> productBoxes = new ArrayList<>();

        Integer quotationId = quotation.getId();
        //3.1 get list quotationItems by quotationId and sort, filter item.dealProductId != null
        List<QuotationItemDto> quotationItemDtos = quotationService.sv00401GetQuotationItemsByQuotationId(quotationId)
                .stream().filter(item -> {
                    return item.getDealProductId() != null
                            && item.getItemType() == Constants.TYPE_PRODUCT;
                }).collect(Collectors.toList());

        if (CollectionUtil.isNotEmpty(quotationItemDtos)) {
            // sort quotationItems
            Collections.sort(quotationItemDtos, (o1, o2) -> o2.getQuantity().compareTo(o1.getQuantity()));
            List<QuotationItemDto> quotationItemResult = new ArrayList<>();
            // list product box in quotation
            quotationItemResult.add(quotationItemDtos.get(0));
            for (int i = 1; i < quotationItemDtos.size(); i++) {
                Integer dealProductIdTmp = quotationItemDtos.get(i).getDealProductId();
                // find by dealProductId
                QuotationItemDto quotationItemDto = quotationItemResult.stream().filter(item -> {
                    return dealProductIdTmp.equals(item.getDealProductId());
                }).findFirst().orElse(null);
                // add quotationItemDto
                if (quotationItemDto == null) {
                    quotationItemResult.add(quotationItemDtos.get(i));
                }
            }

            for (QuotationItemDto quotationItemDto : quotationItemResult) {
                ProductDto productDto = quotationItemDto.getDealProduct().getProduct();
                DealProductDto dealProduct = dealProductService.sv01405GetDealProductByDealIdAndProductId(dealDto.getId()
                        , productDto.getId());

                //Set product info
                SF00307_Product productJson = getProductJson(productDto, quotationItemDto);

                //Parse basic product info
                SF00307_ProductBox productBoxJson = new SF00307_ProductBox();
                productBoxJson.setProduct(productJson);

                //Parse transaction history
                List<SF00307_TransHistory> transHistoryJsons = getStocks(dealDto, productDto.getId());
                productBoxJson.setTransactions(transHistoryJsons);

                //Parse inventory item
                SF00307_Inventory inventoryJson = getInventoryJson(productDto, dealProduct, transHistoryJsons);
                productBoxJson.setInventory(inventoryJson);

                // add to list
                productBoxes.add(productBoxJson);
            }
        }

        return productBoxes;
    }
}
