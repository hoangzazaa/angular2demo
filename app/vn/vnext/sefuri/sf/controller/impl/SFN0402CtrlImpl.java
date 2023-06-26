package vn.vnext.sefuri.sf.controller.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;

import com.google.common.collect.Lists;

import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SFN0402Ctrl;
import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.dto.CustomerGoalItemDto;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.FileDto;
import vn.vnext.sefuri.sf.dto.InventoryDto;
import vn.vnext.sefuri.sf.dto.MstLaminationDto;
import vn.vnext.sefuri.sf.dto.MstPaperDto;
import vn.vnext.sefuri.sf.dto.MstWoodenDto;
import vn.vnext.sefuri.sf.dto.OrderItemDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.RevenueDto;
import vn.vnext.sefuri.sf.dto.ShippingDestinationDto;
import vn.vnext.sefuri.sf.dto.ShippingDestinationImageDto;
import vn.vnext.sefuri.sf.dto.SupplierDto;
import vn.vnext.sefuri.sf.dto.SupplyOrderDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.helper.SfrException;
import vn.vnext.sefuri.sf.helper.SfrExceptionCode;
import vn.vnext.sefuri.sf.json.SFN0402.model.AmountJson;
import vn.vnext.sefuri.sf.json.SFN0402.model.InventoryJson;
import vn.vnext.sefuri.sf.json.SFN0402.model.MailJson;
import vn.vnext.sefuri.sf.json.SFN0402.model.OrderJson;
import vn.vnext.sefuri.sf.json.SFN0402.model.PaperJson;
import vn.vnext.sefuri.sf.json.SFN0402.model.PartnerJson;
import vn.vnext.sefuri.sf.json.SFN0402.model.ProductJson;
import vn.vnext.sefuri.sf.json.SFN0402.model.RevenueJson;
import vn.vnext.sefuri.sf.json.SFN0402.model.UserJson;
import vn.vnext.sefuri.sf.json.SFN0402.request.SFN040201Req;
import vn.vnext.sefuri.sf.json.SFN0402.request.SFN040202Req;
import vn.vnext.sefuri.sf.json.SFN0402.request.SFN040203Req;
import vn.vnext.sefuri.sf.json.SFN0402.request.SFN040204Req;
import vn.vnext.sefuri.sf.json.SFN0402.request.SFN040205Req;
import vn.vnext.sefuri.sf.json.SFN0402.request.SFN040206Req;
import vn.vnext.sefuri.sf.json.SFN0402.request.SFN040207Req;
import vn.vnext.sefuri.sf.json.SFN0402.request.SFN040208Req;
import vn.vnext.sefuri.sf.json.SFN0402.request.SFN040211Req;
import vn.vnext.sefuri.sf.json.SFN0402.request.SFN040212Req;
import vn.vnext.sefuri.sf.json.SFN0402.request.SFN040215Req;
import vn.vnext.sefuri.sf.json.SFN0402.response.SFN040201Res;
import vn.vnext.sefuri.sf.json.SFN0402.response.SFN040202Res;
import vn.vnext.sefuri.sf.json.SFN0402.response.SFN040203Res;
import vn.vnext.sefuri.sf.json.SFN0402.response.SFN040204Res;
import vn.vnext.sefuri.sf.json.SFN0402.response.SFN040205Res;
import vn.vnext.sefuri.sf.json.SFN0402.response.SFN040208Res;
import vn.vnext.sefuri.sf.json.SFN0402.response.SFN040211Res;
import vn.vnext.sefuri.sf.json.SFN0402.response.SFN040212Res;
import vn.vnext.sefuri.sf.json.SFN0402.response.SFN040213Res;
import vn.vnext.sefuri.sf.json.SFN0402.response.SFN040214Res;
import vn.vnext.sefuri.sf.json.SFN0402.response.SFN040215Res;
import vn.vnext.sefuri.sf.json.SFN0402.response.SFN040217Res;
import vn.vnext.sefuri.sf.json.core.CustomerJson;
import vn.vnext.sefuri.sf.json.core.ShippingDestinationDetailJson;
import vn.vnext.sefuri.sf.json.core.ShippingDestinationImageJson;
import vn.vnext.sefuri.sf.json.core.SimpleShippingDestinationJson;
import vn.vnext.sefuri.sf.module.export.ReportGenerator;
import vn.vnext.sefuri.sf.procedure.dto.SFN040201Dto;
import vn.vnext.sefuri.sf.procedure.impl.SFN0402Procedure;
import vn.vnext.sefuri.sf.service.SV002UserService;
import vn.vnext.sefuri.sf.service.SV003DealService;
import vn.vnext.sefuri.sf.service.SV005CustomerService;
import vn.vnext.sefuri.sf.service.SV006FileService;
import vn.vnext.sefuri.sf.service.SV009OrderService;
import vn.vnext.sefuri.sf.service.SV013MstDataService;
import vn.vnext.sefuri.sf.service.SV015DepartmentService;
import vn.vnext.sefuri.sf.service.SV016RevenueService;
import vn.vnext.sefuri.sf.service.SV017MailService;
import vn.vnext.sefuri.sf.service.SV021InventoryService;
import vn.vnext.sefuri.sf.service.SV022SupplierService;
import vn.vnext.sefuri.sf.util.DateUtil;
import vn.vnext.sefuri.sf.util.FormatUtil;
import vn.vnext.sefuri.sf.util.LogUtil;
import vn.vnext.sefuri.sf.util.MessagesUtil;

/**
 * Created by Teddy on 7/26/2017.
 */
public class SFN0402CtrlImpl extends CommonCtrl implements SFN0402Ctrl {

    private static final String TEMPLATE_FILE = "template/SFN0402.properties";
    private final static Integer PAPER = 1;
    private final static Integer LAMINATION = 2;
    /** ファイル取得 API の URL パス */
    private static final String WEB_API_FILE = "/CM0010103/";

    /** 届け先担当者の最大件数 */
    private static final int MAX_SHIPPING_DESTINATION_PIC_COUNTS = 5;

    @Inject
    private SV005CustomerService customerService;

    @Inject
    private SV022SupplierService supplierService;

    @Inject
    private SV003DealService dealService;

    @Inject
    private SV016RevenueService revenueService;

    @Inject
    private SV021InventoryService inventoryService;

    @Inject
    private SV009OrderService orderService;

    @Inject
    private SV002UserService userService;

    @Inject
    private SV015DepartmentService departmentService;

    @Inject
    private SV017MailService mailService;

    @Inject
    private SV006FileService fileService;

    @Inject
    private ReportGenerator reportGenerator;

    @Inject
    private SFN0402Procedure procedure;

    @Inject
    private SV013MstDataService mstDataService;

    @Override
    public Result sfn040201GetBasicInfo() {

        // A. get request
        SFN040201Req req = requestJson(SFN040201Req.class);

        int partnerType = req.getType();
        String partnerCode = req.getCode();

        // B. get data
        // 1. customer
        CustomerDto customerDto = null;
        UserDto userDto = null;
        if (partnerType == TYPE_CUSTOMER) {
            customerDto = customerService.sv00522GetCustomerByCode(partnerCode);
            if (customerDto == null) {
                responseError(MessageCode.ERR001);
            }
            // address
            ShippingDestinationDto addressDto = customerService.sv00521GetCustomerDefaultAddress(customerDto.getId());
            customerDto.setShippingDestinations(Arrays.asList(addressDto));
            // sales
            userDto = userService.sv00104getUserByUserCode(customerDto.getPicCode());
        }
        // 2. supplier
        SupplierDto supplierDto = null;
        if (partnerType == TYPE_SUPPLIER) {
            supplierDto = supplierService.sv02203GetSupplierByCode(partnerCode);
            if (supplierDto == null) {
                responseError(MessageCode.ERR001);
            }
        }

        // C. response
        SFN040201Res res = new SFN040201Res();

        PartnerJson partnerJson = new PartnerJson();
        res.setPartnerJson(partnerJson);
        // 1. 得意先
        if (customerDto != null) {
            // 1. basic info
            // id
            partnerJson.setId(customerDto.getId());
            // code
            partnerJson.setCode(customerDto.getCustomerCode());
            // name
            partnerJson.setName(customerDto.getName());
            // abbr
            partnerJson.setAbbr(customerDto.getAbbreviation());
            // createdDate
            partnerJson.setCreatedDate(customerDto.getCreatedDate());
            // startYear
            partnerJson.setStartYear(customerDto.getStartYear());
            // contactName
            partnerJson.setContactName(customerDto.getCustomerContact());
            // hpInfo
            partnerJson.setHpInfo(customerDto.getHpInfo());
            // billingMethod
            partnerJson.setBillingMethod(customerDto.getBillingMethod());
            // 備考(営業カルテ)
            partnerJson.setMemo(customerDto.getMemo());
            // 備考(出荷部門用カルテ)
            partnerJson.setRemarksForShipping(customerDto.getRemarksForShipping());

            // 2. address info
            ShippingDestinationDto addressDto = customerDto.getShippingDestinations().get(0);
            if (addressDto != null) {
                // postalCode
                partnerJson.setPostalCode(addressDto.getPostalCode());
                // address1
                partnerJson.setAddress1(addressDto.getDeliveryAddress1());
                // address2
                partnerJson.setAddress2(addressDto.getDeliveryAddress2());
                // tel
                partnerJson.setTel(addressDto.getTel());
                // ext
                partnerJson.setExt(addressDto.getExtension());
                // fax
                partnerJson.setFax(addressDto.getFax());
                // note1
                partnerJson.setNote1(addressDto.getMemo1());
                // note2
                partnerJson.setNote2(addressDto.getMemo2());
            }
        }
        // 2. 仕入先
        if (supplierDto != null) {
            // code
            partnerJson.setCode(supplierDto.getSupplierCode());
            // name
            partnerJson.setName(supplierDto.getName());
            // abbr
            partnerJson.setAbbr(supplierDto.getAbbreviation());
            // createdDate
            partnerJson.setCreatedDate(supplierDto.getCreatedDate());
            // contactName
            partnerJson.setContactName(supplierDto.getContactName());
            // postalCode
            partnerJson.setPostalCode(supplierDto.getPostalCode());
            // address1
            partnerJson.setAddress1(supplierDto.getAddress1());
            // address2
            partnerJson.setAddress2(supplierDto.getAddress2());
            // tel
            partnerJson.setTel(supplierDto.getTel());
            // fax
            partnerJson.setFax(supplierDto.getFax());
            // note1
            partnerJson.setNote1(supplierDto.getMemo1());
            // note2
            partnerJson.setNote2(supplierDto.getMemo2());
            // memo
            partnerJson.setMemo(supplierDto.getMemo());
        }
        // 3. pic
        UserJson sales = new UserJson();
        partnerJson.setSales(sales);
        if (userDto != null) {
            sales.setName(userDto.getUsername());
            if (userDto.getDepartment() != null) {
                sales.setDepartmentName(userDto.getDepartment().getDepartment());
            }
        }
        // 4. timenow
        res.setNow(DateUtil.getSysDate());
        // 5. mail template
        if (partnerType == TYPE_CUSTOMER) {
            // 5.1 product disposal
            MailJson pdMail = new MailJson();
            pdMail.setTo(Arrays.asList("seisan@sgsk.jp"));
            pdMail.setCc(Arrays.asList());
            pdMail.setSubject(MessagesUtil.getPropertyUTF8(TEMPLATE_FILE, "MAIL_PRODUCT_DISPOSAL_SUBJECT"));
            pdMail.setContent(MessagesUtil.getPropertyUTF8(TEMPLATE_FILE, "MAIL_PRODUCT_DISPOSAL_CONTENT"));
            res.setProductDisposalMail(pdMail);

            // 5.2 wooden return
            MailJson wrMail = new MailJson();
            wrMail.setTo(Arrays.asList("seisan@sgsk.jp"));
            wrMail.setCc(Arrays.asList());
            wrMail.setSubject(MessagesUtil.getPropertyUTF8(TEMPLATE_FILE, "MAIL_WOODEN_RETURN_SUBJECT"));
            wrMail.setContent(MessagesUtil.getPropertyUTF8(TEMPLATE_FILE, "MAIL_WOODEN_RETURN_CONTENT"));
            res.setWoodenReturnMail(wrMail);

            // 5.3 wooden pending
            MailJson wpMail = new MailJson();
            wpMail.setTo(Arrays.asList("seisan@sgsk.jp"));
            wpMail.setCc(Arrays.asList());
            wpMail.setSubject(MessagesUtil.getPropertyUTF8(TEMPLATE_FILE, "MAIL_WOODEN_PENDING_SUBJECT"));
            wpMail.setContent(MessagesUtil.getPropertyUTF8(TEMPLATE_FILE, "MAIL_WOODEN_PENDING_CONTENT"));
            res.setWoodenPendingMail(wpMail);
        }

        return responseJson(res, MessageCode.INF001);
    }

    @Override
    public Result sfn040202GetSalesPerformance() {

        // A. get data
        SFN040202Req req = requestJson(SFN040202Req.class);
        String code = req.getCode();
        int fYear = req.getYear();

        // B. get data
        // 1. get current year revenue
        List<SFN040201Dto> nSfn040201Dtos = procedure.sfn040201GetCustomerRevenue(code, fYear);
        // 2. get last year revenue
        List<SFN040201Dto> oSfn040201Dtos = procedure.sfn040201GetCustomerRevenue(code, fYear - 1);
        // 3. get customer goal
        List<CustomerGoalItemDto> customerGoalItemDtos = customerService.sv00524GetCustomerGoalSummary(code, fYear);

        // C. response
        SFN040202Res res = new SFN040202Res();
        // 1. current year revenue
        List<AmountJson> cartonNew = new ArrayList<>();
        List<AmountJson> paperNew = new ArrayList<>();
        List<AmountJson> commercialNew = new ArrayList<>();
        res.setCartonNew(cartonNew);
        res.setPaperNew(paperNew);
        res.setCommercialNew(commercialNew);
        for (SFN040201Dto sfn040201Dto : nSfn040201Dtos) {
            AmountJson amountJson = new AmountJson();

            amountJson.setMonth(sfn040201Dto.getMonth());
            amountJson.setValue(sfn040201Dto.getAmount());

            if (sfn040201Dto.getType() == 0) {
                // 段ボール
                cartonNew.add(amountJson);
            } else if (sfn040201Dto.getType() == 1) {
                // 紙器
                paperNew.add(amountJson);
            } else if (sfn040201Dto.getType() == 2) {
                // 商事
                commercialNew.add(amountJson);
            }
        }
        // 2. last year revenue
        List<AmountJson> cartonOld = new ArrayList<>();
        List<AmountJson> paperOld = new ArrayList<>();
        List<AmountJson> commercialOld = new ArrayList<>();
        res.setCartonOld(cartonOld);
        res.setPaperOld(paperOld);
        res.setCommercialOld(commercialOld);
        for (SFN040201Dto sfn040201Dto : oSfn040201Dtos) {
            AmountJson amountJson = new AmountJson();

            amountJson.setMonth(sfn040201Dto.getMonth());
            amountJson.setValue(sfn040201Dto.getAmount());

            if (sfn040201Dto.getType() == 0) {
                // 段ボール
                cartonOld.add(amountJson);
            } else if (sfn040201Dto.getType() == 1) {
                // 紙器
                paperOld.add(amountJson);
            } else if (sfn040201Dto.getType() == 2) {
                // 商事
                commercialOld.add(amountJson);
            }
        }
        // 3. goal
        List<AmountJson> goal = new ArrayList<>();
        res.setGoal(goal);
        for (CustomerGoalItemDto customerGoalItemDto : customerGoalItemDtos) {
            AmountJson amountJson = new AmountJson();
            goal.add(amountJson);

            amountJson.setMonth(customerGoalItemDto.getMonth());
            amountJson.setValue(customerGoalItemDto.getGoal());
        }

        return responseJson(res, MessageCode.INF001);
    }

    @Override
    public Result sfn040203GetCustomerRevenueList() {
        // A. get request
        SFN040203Req req = requestJson(SFN040203Req.class);
        // 1. customer
        String code = req.getCode();
        CustomerDto customerDto = customerService.sv00522GetCustomerByCode(code);
        if (customerDto == null) {
            return responseError(MessageCode.ERR001);
        }
        // 2. filter
        String keyword = req.getKeyword();
        DateTime startDate = req.getStartDate();
        DateTime endDate = req.getEndDate();

        // B. query data
        List<RevenueDto> revenueDtos = revenueService.sv001604GetRevenuesByCustomer(customerDto.getId(), keyword, startDate, endDate);

        // C. response
        SFN040203Res res = new SFN040203Res();
        // hits
        res.setHits(revenueDtos.size());
        // inventory
        List<RevenueJson> revenueJsons = new ArrayList<>();
        res.setRevenues(revenueJsons);
        for (RevenueDto revenueDto : revenueDtos) {
            RevenueJson revenueJson = new RevenueJson();
            revenueJsons.add(revenueJson);

            // salesDate
            revenueJson.setSalesDate(revenueDto.getInvoiceSalesDate());
            // quantity
            revenueJson.setQuantity(revenueDto.getSalesNumber());
            // unitPrice
            revenueJson.setUnitPrice(revenueDto.getSalesUnitPrice());
            // total
            revenueJson.setTotal(revenueDto.getSalesAmount());

            // product
            ProductJson productJson = generateProductJson(revenueDto.getOrderItemDto());
            revenueJson.setProduct(productJson);
        }

        return responseJson(res, MessageCode.INF001);
    }

    @Override
    public Result sfn040204GetStockList() {
        // A. get request
        SFN040204Req req = requestJson(SFN040204Req.class);
        // 1. customer
        String code = req.getCode();
        CustomerDto customerDto = customerService.sv00522GetCustomerByCode(code);
        if (customerDto == null) {
            return responseError(MessageCode.ERR001);
        }
        // 2. stock days
        int stockDays = req.getStockDays();
        Integer dayLimit = null;
        if (stockDays == 1) {
            dayLimit = 30;
        } else if (stockDays == 2) {
            dayLimit = 90;
        } else if (stockDays == 3) {
            dayLimit = 120;
        }
        // 3. stock type
        int stockType = req.getStockType();
        Integer deposit = null;
        if (stockType == 1) {
            deposit = 0;
        } else if (stockType == 2) {
            deposit = 1;
        }

        // B. query data
        List<InventoryDto> inventoryDtos = inventoryService.sv02102GetInventoryByCustomer(customerDto.getId(), deposit, dayLimit);

        // C. response
        SFN040204Res res = new SFN040204Res();
        // hits
        res.setHits(inventoryDtos.size());
        // inventory
        List<InventoryJson> inventoryJsons = new ArrayList<>();
        res.setInventories(inventoryJsons);
        DateTime now = DateUtil.getSysDate();
        for (InventoryDto inventoryDto : inventoryDtos) {
            InventoryJson inventoryJson = new InventoryJson();
            inventoryJsons.add(inventoryJson);

            // id
            inventoryJson.setId(inventoryDto.getId());
            // type
            OrderItemDto orderItemDto = inventoryDto.getOrderItemDto();
            int inventoryType = 1;
            if (orderItemDto != null) {
                if (Integer.valueOf(1).equals(orderItemDto.getDeposit())) {
                    inventoryType = 2;
                }
            }
            inventoryJson.setType(inventoryType);
            // quantity
            int quantity = inventoryDto.getQuantity();
            inventoryJson.setQuantity(quantity);
            // unitPrice
            BigDecimal unitPrice = BigDecimal.ZERO;
            if (orderItemDto != null) {
                unitPrice = orderItemDto.getSubmittedPrice();
            }
            inventoryJson.setUnitPrice(unitPrice);
            // total
            BigDecimal total = BigDecimal.valueOf(quantity).multiply(unitPrice);
            inventoryJson.setTotal(total);
            // manufactureDate
            DateTime registrationDate = inventoryDto.getRegistrationDate();
            inventoryJson.setManufactureDate(registrationDate);
            // storageDays
            int daysDiff = DateUtil.daysDiff(registrationDate, now);
            if (daysDiff < 0) {
                daysDiff = 0;
            } else {
                daysDiff = daysDiff + 1;
            }
            inventoryJson.setStorageDays(daysDiff);

            // product
            ProductJson productJson = generateProductJson(orderItemDto);
            inventoryJson.setProduct(productJson);
        }

        return responseJson(res, MessageCode.INF001);
    }

    @Override
    public Result sfn040205GetProductList() {
        // A. get request
        SFN040205Req req = requestJson(SFN040205Req.class);
        // 1. customer
        String code = req.getCode();
        CustomerDto customerDto = customerService.sv00522GetCustomerByCode(code);
        if (customerDto == null) {
            return responseError(MessageCode.ERR001);
        }
        // 2. filter
        String keyword = req.getKeyword();
        DateTime startDate = req.getStartDate();
        DateTime endDate = req.getEndDate();

        // B. query data
        List<OrderItemDto> orderItemDtos = orderService.sv00917getOrderItemByCustomer(customerDto.getId(), keyword, startDate, endDate);

        // C. response
        SFN040205Res res = new SFN040205Res();
        // hits
        res.setHits(orderItemDtos.size());
        // inventory
        List<OrderJson> orderJsons = new ArrayList<>();
        res.setOrders(orderJsons);
        for (OrderItemDto orderItemDto : orderItemDtos) {
            OrderJson orderJson = new OrderJson();
            orderJsons.add(orderJson);

            // quantity
            orderJson.setQuantity(orderItemDto.getQuantity());
            // unitPrice
            orderJson.setUnitPrice(orderItemDto.getSubmittedPrice());
            // total
            orderJson.setTotal(orderItemDto.getTotal());

            // product
            ProductJson productJson = generateProductJson(orderItemDto);
            orderJson.setProduct(productJson);
        }

        return responseJson(res, MessageCode.INF001);
    }

    @Override
    public Result sfn040206SaveNote() {

        // A. get request
        SFN040206Req req = requestJson(SFN040206Req.class);
        int type = req.getType();
        String code = req.getCode();
        String memo = req.getMemo();

        // B. do update
        if (type == TYPE_CUSTOMER) {
            CustomerDto customerDto = customerService.sv00522GetCustomerByCode(code);
            if (customerDto != null) {
                customerDto.setMemo(memo);
                customerDto.setRemarksForShipping(req.getRemarksForShipping());
                customerService.sv00523UpdateCustomer(customerDto);
            }
        } else if (type == TYPE_SUPPLIER) {
            SupplierDto supplierDto = supplierService.sv02203GetSupplierByCode(code);
            if (supplierDto != null) {
                supplierDto.setMemo(memo);
                supplierService.sv02204UpdateSupplier(supplierDto);
            }
        }

        // C. response
        return responseJson(null, MessageCode.INF001);
    }

    @Override
    public Result sfn040207ProductDisposal() {

        // get request
        SFN040207Req req = requestJson(SFN040207Req.class);
        MailJson mail = req.getMail();

        // send mail
        return sendEmail(mail);
    }

    @Override
    public Result sfn040208ExportStockList() {

        // A. get request
        SFN040208Req req = requestJson(SFN040208Req.class);
        // 1. customer
        String code = req.getCode();
        CustomerDto customerDto = customerService.sv00522GetCustomerByCode(code);
        if (customerDto == null) {
            return responseError(MessageCode.ERR001);
        }
        // 2. stock days
        int stockDays = req.getStockDays();
        Integer dayLimit = null;
        if (stockDays == 1) {
            dayLimit = 30;
        } else if (stockDays == 2) {
            dayLimit = 90;
        } else if (stockDays == 3) {
            dayLimit = 120;
        }
        // 3. stock type
        int stockType = req.getStockType();
        Integer deposit = null;
        if (stockType == 1) {
            deposit = 0;
        } else if (stockType == 2) {
            deposit = 1;
        }

        // B. query data
        List<InventoryDto> inventoryDtos = inventoryService.sv02102GetInventoryByCustomer(customerDto.getId(), deposit, dayLimit);

        // C. create pdf
        String pdfFolder = reportGenerator.r009(inventoryDtos, customerDto);

        if (StringUtils.isEmpty(pdfFolder))
            return responseError(MessageCode.ERR002);

        String result[] = pdfFolder.split(Constants.SLASH);
        if (ArrayUtils.isEmpty(result) || result.length < 2) {
            return responseError(MessageCode.ERR002);
        }

        // D. response
        SFN040208Res res = new SFN040208Res();
        res.setFileName(result[1]);
        String filePath = fileService.sv00622GetJasperInventoryReportURI(result[0], result[1]);
        res.setFilePath(filePath);

        return responseJson(res, MessageCode.INF001);
    }

    @Override
    public Result sfn040209WoodenReturning() {
        // get request
        SFN040207Req req = requestJson(SFN040207Req.class);
        MailJson mail = req.getMail();

        // send mail
        return sendEmail(mail);
    }

    @Override
    public Result sfn040210WoodenPending() {
        // get request
        SFN040207Req req = requestJson(SFN040207Req.class);
        MailJson mail = req.getMail();

        // send mail
        return sendEmail(mail);
    }

    @Override
    public Result sfn040211ExportProductList() {
        // A. get request
        SFN040211Req req = requestJson(SFN040211Req.class);
        // 1. customer
        String code = req.getCode();
        CustomerDto customerDto = customerService.sv00522GetCustomerByCode(code);
        if (customerDto == null) {
            return responseError(MessageCode.ERR001);
        }
        // 2. filter
        String keyword = req.getKeyword();
        DateTime startDate = req.getStartDate();
        DateTime endDate = req.getEndDate();

        // B. query data
        List<OrderItemDto> orderItemDtos = orderService.sv00917getOrderItemByCustomer(customerDto.getId(), keyword, startDate, endDate);

        // C. create pdf
        String pdfFolder = reportGenerator.r010(orderItemDtos, customerDto);
        if (StringUtils.isEmpty(pdfFolder))
            return responseError(MessageCode.ERR002);

        String result[] = pdfFolder.split(Constants.SLASH);
        if (ArrayUtils.isEmpty(result) || result.length < 2) {
            return responseError(MessageCode.SF00307.ERR002);
        }
        // D. response
        SFN040211Res res = new SFN040211Res();
        res.setFileName(result[1]);
        String filePath = fileService.sv00622GetJasperInventoryReportURI(result[0], result[1]);
        res.setFilePath(filePath);

        return responseJson(res, MessageCode.INF001);
    }

    @Override
    public Result sfn040212GetSupplierRevenueList() {
        // A. get request
        SFN040212Req req = requestJson(SFN040212Req.class);
        // 1. customer
        String code = req.getCode();
        SupplierDto supplierDto = supplierService.sv02203GetSupplierByCode(code);
        if (supplierDto == null) {
            return responseError(MessageCode.ERR001);
        }
        // 2. filter
        String keyword = req.getKeyword();
        DateTime startDate = req.getStartDate();
        DateTime endDate = req.getEndDate();

        // B. query data
        List<SupplyOrderDto> orderDtos = supplierService.sv2206GetSupplyOrders(supplierDto.getId(), keyword, startDate, endDate);

        // C. response
        SFN040212Res res = new SFN040212Res();
        // hits
        res.setHits(orderDtos.size());
        // inventory
        List<RevenueJson> revenueJsons = new ArrayList<>();
        res.setRevenues(revenueJsons);
        for (SupplyOrderDto orderDto : orderDtos) {
            RevenueJson revenueJson = new RevenueJson();
            revenueJsons.add(revenueJson);

            // salesDate
            revenueJson.setSalesDate(orderDto.getCreatedDate());
            // quantity
            if (orderDto.getQuantity() == null) {
                revenueJson.setQuantity(BigDecimal.ZERO);
            } else {
                revenueJson.setQuantity(BigDecimal.valueOf(orderDto.getQuantity()));
            }
            // unitPrice
            revenueJson.setUnitPrice(orderDto.getPrice());
            // total
            revenueJson.setTotal(orderDto.getAmount());

            // product
            ProductJson productJson = generateProductJson(orderDto.getOrderItemDto());
            revenueJson.setProduct(productJson);
        }

        return responseJson(res, MessageCode.INF001);
    }

    private ProductJson generateProductJson(OrderItemDto orderItemDto) {
        ProductJson productJson = new ProductJson();
        if (orderItemDto != null) {
            ProductDto productDto = orderItemDto.getProductDto();
            if (productDto != null) {

                // dealCode
                DealDto dealDto = orderItemDto.getDealDto();
                if (dealDto != null) {
                    productJson.setDealCode(dealDto.getDealCode());
                }

                // itemCode
                productJson.setItemCode(productDto.getItemCode());
                // code
                productJson.setCode(productDto.getProductCode());
                // type
                productJson.setType(productDto.getProductType());
                // shapeId
                productJson.setShapeId(productDto.getShapeId());
                // name
                productJson.setName(productDto.getProductName());
                // sizeH
                productJson.setSizeH(productDto.getSizeH());
                // sizeD
                productJson.setSizeD(productDto.getSizeD());
                // sizeW
                productJson.setSizeW(productDto.getSizeW());

                //description
                //cartonShippingType
                productJson.setCartonShippingType(productDto.getCartonShippingType());
                //blankPaperSizeH
                productJson.setBlankPaperSizeH(productDto.getBlankPaperSizeH());
                //blankPaperSizeW
                productJson.setBlankPaperSizeW(productDto.getBlankPaperSizeW());
                //paperSizeH
                productJson.setPaperSizeH(productDto.getPaperSizeH());
                //paperSizeW
                productJson.setPaperSizeW(productDto.getPaperSizeW());
                //laminationFlute
                productJson.setLaminationFlute(productDto.getLaminationFlute());
                //paperNameId
                productJson.setPaperNameId(productDto.getPaperNameId());
                //paperWeight
                productJson.setPaperWeight(productDto.getPaperWeight());
                //laminationPaperTypeA
                productJson.setLaminationPaperTypeA(productDto.getLaminationPaperTypeA());
                //laminationABasicWeight
                productJson.setLaminationABasicWeight(productDto.getLaminationABasicWeight());
                //laminationPaperTypeB
                productJson.setLaminationPaperTypeB(productDto.getLaminationPaperTypeB());
                //laminationBBasicWeight
                productJson.setLaminationBBasicWeight(productDto.getLaminationBBasicWeight());
                //laminationPaperTypeFront
                productJson.setLaminationPaperTypeFront(productDto.getLaminationPaperTypeFront());
                //laminationPaperTypeBack
                productJson.setLaminationPaperTypeBack(productDto.getLaminationPaperTypeBack());
                //laminationPaperTypeMedium
                productJson.setLaminationPaperTypeMedium(productDto.getLaminationPaperTypeMedium());
                //laminationFrontBasicWeight
                productJson.setLaminationFrontBasicWeight(productDto.getLaminationFrontBasicWeight());
                //laminationMediumBasicWeight
                productJson.setLaminationMediumBasicWeight(productDto.getLaminationMediumBasicWeight());
                //laminationBackBasicWeight
                productJson.setLaminationBackBasicWeight(productDto.getLaminationBackBasicWeight());
                //printMethod
                productJson.setPrintMethod(productDto.getPrintMethod());
                //colorIdF
                productJson.setColorIdF(productDto.getColorIdF());
                //specialColorF
                productJson.setSpecialColorF(productDto.getSpecialColorF());
                //colorIdB
                productJson.setColorIdB(productDto.getColorIdB());
                //specialColorB
                productJson.setSpecialColorB(productDto.getSpecialColorB());

                //laminationAId
                productJson.setLaminationAId(productDto.getLaminationAId());
                PaperJson laminationA = this.createPaperJson(productDto.getLaminationAId(), LAMINATION);
                List<PaperJson> laminations = new ArrayList<>();
                if (laminationA != null) {
                    laminations.add(laminationA);
                }
                //laminationBId
                productJson.setLaminationBId(productDto.getLaminationBId());
                PaperJson laminationB = this.createPaperJson(productDto.getLaminationBId(), LAMINATION);
                if (laminationB != null) {
                    laminations.add(laminationB);
                }
                //laminationFrontId
                productJson.setLaminationFrontId(productDto.getLaminationFrontId());
                PaperJson laminationFront = this.createPaperJson(productDto.getLaminationFrontId(), LAMINATION);
                if (laminationFront != null) {
                    laminations.add(laminationFront);
                }
                //laminationBackId
                productJson.setLaminationBackId(productDto.getLaminationBackId());
                PaperJson laminationBack = this.createPaperJson(productDto.getLaminationBackId(), LAMINATION);
                if (laminationBack != null) {
                    laminations.add(laminationBack);
                }
                //laminationMediumId
                productJson.setLaminationMediumId(productDto.getLaminationMediumId());
                PaperJson laminationMedium = this.createPaperJson(productDto.getLaminationMediumId(), LAMINATION);
                if (laminationMedium != null) {
                    laminations.add(laminationMedium);
                }
                productJson.setLaminations(laminations);
                //paper
                if (productDto.getPaperId() != null) {
                    PaperJson paperJson = this.createPaperJson(productDto.getPaperId(), PAPER);
                    productJson.setPaper(paperJson);
                }
                // wooden
                productJson.setWooden(FormatUtil.concatItem(Constants.SLASH_JP, productDto.getWoodenCode(),productDto.getWoodenCode2()));
                //woodenDto
                MstWoodenDto woodenDto = productDto.getMstWoodenDto();
                if (woodenDto != null) {
                    // woodenExp
                    DateTime lastUse = woodenDto.getLastUse();
                    if (lastUse != null) {
                        DateTime now = DateUtil.getSysDate();
                        int daysDiff = DateUtil.daysDiff(lastUse, now);
                        if (daysDiff < 0) {
                            daysDiff = 0;
                        } else {
                            daysDiff = daysDiff + 1;
                        }
                        productJson.setWoodenExp(daysDiff);
                    }
                    // wooden status
                    productJson.setWoodenStatus(woodenDto.getWoodenStatus());
                }
            }
        }

        return productJson;
    }

    private PaperJson createPaperJson(Integer paperId, Integer type) {
        if (paperId != null) {
            Integer id;
            String name;
            if (type == PAPER) {
                MstPaperDto mstPaperDto = mstDataService.sv01314GetMstPaperById(paperId);
                id = mstPaperDto.getId();
                name = mstPaperDto.getPaperName() == null ?
                        mstPaperDto.getMaterialName() : mstPaperDto.getPaperName();
            } else {
                MstLaminationDto mstLaminationDto = mstDataService.sv01336GetMstLaminationById(paperId);
                id = mstLaminationDto.getId();
                name = mstLaminationDto.getPaperName() == null ?
                        mstLaminationDto.getMaterialName() : mstLaminationDto.getPaperName();
            }

            PaperJson paperJson = new PaperJson();
            // id
            paperJson.setId(id);
            // paperName
            paperJson.setPaperName(name);
            // fix bug 3041 <Note: Hiện tại đang fix để chạy>
            //name
            paperJson.setName(name);
            return paperJson;
        }

        return null;
    }

    private Result sendEmail(MailJson mail) {
        try {
            // get login user-info (never null)
            UserDto userDto = userService.sv00204GetUserById(getUserId());
            mailService.sv01704SendMail(userDto.getUsername(), userDto.getEmail(), Lists.newArrayList(mail.getTo()), Lists
                    .newArrayList(mail.getCc()), mail.getSubject(), mail.getContent());
            return responseJson(null, MessageCode.INF001);
        } catch (Exception e) {
            LogUtil.getLogger(SFN0402CtrlImpl.class).error(e.getMessage());
            return responseError(MessageCode.ERR001);
        }
    }

    @Override
    public Result sfn040213GetShippingDestinationList(String customerCode) {
        // 得意先解決
        CustomerDto customer = customerService.sv00522GetCustomerByCode(customerCode);
        if (customer == null) {
            // エラー: 得意先が見つからない
            return responseError(MessageCode.SFN0402.ERR001);
        }

        // 届け先一覧照会
        List<ShippingDestinationDto> shippingDestinationDtos = customerService.sv00517GetShippingDestinationByCustomerId(customer.getId());

        // 応答電文生成
        SFN040213Res res = new SFN040213Res();
        res.setDestinations(
                shippingDestinationDtos
                    .stream()
                    .map(dto -> {
                        SimpleShippingDestinationJson json = new SimpleShippingDestinationJson();
                        json.setData(dto);
                        return json;
                    })
                    .collect(Collectors.toList())
        );

        // 応答
        return responseJson(res, MessageCode.INF001);
    }

    @Override
    public Result sfn040214GetShippingDestinationDetail(String customerCode, int shippingDestinationId) {
        // 得意先解決
        CustomerDto customer = customerService.sv00522GetCustomerByCode(customerCode);
        if (customer == null) {
            // エラー: 得意先が見つからない
            return responseError(MessageCode.SFN0402.ERR001);
        }

        // 届け先詳細取得
        ShippingDestinationDto shippingDestinationDto = customerService.sv00525GetShippingDestinationDetail(customer.getId(), shippingDestinationId);
        if (shippingDestinationDto == null) {
            // エラー: 届け先が見つからない
            return responseError(MessageCode.SFN0402.ERR004);
        }

        // 応答電文生成
        SFN040214Res res = createSFN040214Res(customer, shippingDestinationDto);

        // 応答
        return responseJson(res, MessageCode.INF001);
    }

    /**
     * sfn040214GetShippingDestinationDetail() の応答電文を生成する
     *
     * @param customer 得意先
     * @param shippingDestination 届け先
     * @return 応答電文
     */
    private SFN040214Res createSFN040214Res(CustomerDto customer, ShippingDestinationDto shippingDestination) {
        // 応答電文生成 (得意先, 届け先詳細)
        CustomerJson customerJson = new CustomerJson();
        customerJson.setData(customer);
        ShippingDestinationDetailJson destinationJson = new ShippingDestinationDetailJson();
        destinationJson.setData(shippingDestination);
        destinationJson.setCustomer(customerJson);

        // 応答電文生成 (画像情報)
        List<ShippingDestinationImageJson> imageListJson = new ArrayList<>(shippingDestination.getImageList().size());
        for (ShippingDestinationImageDto imageDto : shippingDestination.getImageList()) {
            ShippingDestinationImageJson imageJson = new ShippingDestinationImageJson();

            imageJson.setId(imageDto.getId());
            imageJson.setMemo(imageDto.getMemo());

            // 画像 URL 生成
            String extension = imageDto.getFile().getFileExtension();
            extension = StringUtils.isEmpty(extension) ? "" : "." + extension;
            imageJson.setImage(WEB_API_FILE + imageDto.getFile().getFileCode() + extension);

            imageListJson.add(imageJson);
        }
        destinationJson.setImageList(imageListJson);

        // 応答電文生成 (全体)
        SFN040214Res res = new SFN040214Res();
        res.setDestination(destinationJson);
        return res;
    }

    @Override
    public Result sfn040215SaveShippingDestinationDetail(String customerCode, int shippingDestinationId) {
        // 得意先解決
        CustomerDto customer = customerService.sv00522GetCustomerByCode(customerCode);
        if (customer == null) {
            // エラー: 得意先が見つからない
            return responseError(MessageCode.SFN0402.ERR001);
        }

        // 届け先詳細取得   (FIXME ロストアップデート防止のため、 FOR UPDATE してほしい)
        ShippingDestinationDto shippingDestinationDto = customerService.sv00525GetShippingDestinationDetail(customer.getId(), shippingDestinationId);
        if (shippingDestinationDto == null) {
            // エラー: 届け先が見つからない
            return responseError(MessageCode.SFN0402.ERR004);
        }

        // 要求取得
        SFN040215Req req = requestJson(SFN040215Req.class);
        if (req.getDestination() == null) {
            // エラー: 電文形式エラー
            return responseError(MessageCode.ERR004);
        }

        // 保存用データ生成
        ShippingDestinationDto form = req.getDestination().getData();
        shippingDestinationDto.setDeliveryCompany(StringUtils.stripToNull(form.getDeliveryCompany()));
        shippingDestinationDto.setSpecifyVehicle(form.getSpecifyVehicle());
        shippingDestinationDto.setSpecifyVehicleOthers(StringUtils.stripToNull(form.getSpecifyVehicleOthers()));
        shippingDestinationDto.setDeliveryTime(StringUtils.stripToNull(form.getDeliveryTime()));
        shippingDestinationDto.setTelBeforeDelivery(form.getTelBeforeDelivery());
        shippingDestinationDto.setAttachmentEbo(form.getAttachmentEbo());
        shippingDestinationDto.setDeliveryInCaseOfBadWeather(form.getDeliveryInCaseOfBadWeather());
        shippingDestinationDto.setStretchFilm(form.getStretchFilm());
        shippingDestinationDto.setUpstairs(form.getUpstairs());
        shippingDestinationDto.setUpstairsDetail(form.getUpstairsDetail());
        shippingDestinationDto.setUpstairsDetailOthers(StringUtils.stripToNull(form.getUpstairsDetailOthers()));
        shippingDestinationDto.setPaletteDelivery(form.getPaletteDelivery());
        shippingDestinationDto.setPaletteTakeBack(form.getPaletteTakeBack());
        shippingDestinationDto.setLimitQuantity(form.getLimitQuantity());
        shippingDestinationDto.setUnloadingPlace(StringUtils.stripToNull(form.getUnloadingPlace()));
        shippingDestinationDto.setParkingPlace(StringUtils.stripToNull(form.getParkingPlace()));
        shippingDestinationDto.setLiftUserInUnloading(form.getLiftUserInUnloading());
        shippingDestinationDto.setUnloadForm(StringUtils.stripToNull(form.getUnloadForm()));
        shippingDestinationDto.setAttention(StringUtils.stripToNull(form.getAttention()));
        shippingDestinationDto.setMemo1(form.getMemo1() != null ? form.getMemo1() : "");
        shippingDestinationDto.setMemo2(form.getMemo2() != null ? form.getMemo2() : "");

        // 画像情報
        shippingDestinationDto.setImageList(
                mergeShippingDestinationImage(
                        shippingDestinationDto.getImageList(),
                        req.getDestination().getImageList()));

        // 保存処理
        customerService.sv00526SaveShippingDestinationDetail(shippingDestinationDto);

        // 応答電文生成
        SFN040215Res res = new SFN040215Res();

        // 応答
        return responseJson(res, MessageCode.INF001);
    }

    /**
     * テンポラリファイルを DB, S3 に登録して、現在の届け先画像情報に画像情報入力値をマージする。
     *
     * @param currentImages 現在の届け先画像情報
     * @param imagesJson JSON 形式画像情報
     * @return　マージ後の画像情報
     */
    private List<ShippingDestinationImageDto> mergeShippingDestinationImage(
            @Nonnull Collection<? extends ShippingDestinationImageDto> currentImages,
            Collection<? extends ShippingDestinationImageJson> imagesJson) {
        if (imagesJson == null || imagesJson.isEmpty()) {
            return Collections.emptyList();
        }

        // 現在の画像情報を map 化
        Map<Integer, ShippingDestinationImageDto> currentImageMap
            = currentImages.stream().collect(Collectors.toMap(ShippingDestinationImageDto::getId, Function.identity()));

        // マージ処理
        List<ShippingDestinationImageDto> mergedImages = new ArrayList<>(imagesJson.size());
        int displayOrder = 0;
        for (ShippingDestinationImageJson imageJson : imagesJson) {
            ShippingDestinationImageDto imageDto = currentImageMap.get(imageJson.getId());
            boolean newEntry = imageDto == null;  // true: 届け先画像投稿新規追加
            if (newEntry) {
                // 新規追加
                imageDto = new ShippingDestinationImageDto();
            } else {
                // id 多重指定を防ぐため、 currentImageMap から該当 ID を削除する
                currentImageMap.remove(imageJson.getId());
            }

            if (imageJson.getTemporaryFileName() != null) {
                // 画像追加・更新の場合
                try {
                    // DB, S3 に登録
                    FileDto fileDto = fileService.sv00604SaveTempFile(imageJson.getTemporaryFileName(), Enums.ModuleType.SHIPPING_DESTINATION_FILE);
                    imageDto.setFile(fileDto);
                } catch (SfrException e) {
                    if (e.getErrCode() == SfrExceptionCode.ERR_SV006_FILE_NOT_EXISTS) {
                        // テンポラリファイルが見つからない
                        logger.warn("Missing temporary file. name=" + imageJson.getTemporaryFileName() + " (Ignored)");
                        continue;
                    } else {
                        throw e;        // システムエラー
                    }
                }
            } else if (newEntry) {
                // リクエストで指定された届け先画像情報 ID が見つからない
                logger.warn("Missing sfr_sf_shipping_destination_image. id=" + imageJson.getId() + " (Ignored)");
                continue;
            }

            // コメントと並び順
            imageDto.setMemo(imageJson.getMemo());
            imageDto.setDisplayOrder(++displayOrder);

            // DB 投入リストに追加
            mergedImages.add(imageDto);
        }

        return mergedImages;
    }

    @Override
    public Result sfn040217ExportShippingDestinationKartePdf(String customerCode, int shippingDestinationId) {
        // ファイル名を決定
        String fileName = "届け先カルテ" + customerCode + '_' + shippingDestinationId;

        // PDF 生成
        ReportGenerator.OutputFile outputFile;
        try {
            outputFile = reportGenerator.exportShippingDestinationKarte(customerCode, shippingDestinationId, fileName);
        } catch (SfrException e) {
            if (e.getErrCode() == SfrExceptionCode.ERR_CUSTOMER_NOT_FOUND) {
                // エラー: 得意先が見つからない
                return responseError(MessageCode.SFN0402.ERR001);
            } else if (e.getErrCode() == SfrExceptionCode.ERR_CUSTOMER_NOT_FOUND) {
                // エラー: 届け先が見つからない
                return responseError(MessageCode.SFN0402.ERR004);
            } else {
                throw e;
            }
        }
        if (outputFile == null) {
            return responseError(MessageCode.SFN0402.ERR005);
        }

        // 応答電文生成
        SFN040217Res res = new SFN040217Res();
        res.setFileName(outputFile.getFileName());
        String filePath = fileService.sv00624GetFriendlyJasperReportURI(outputFile.getFolderName(), outputFile.getFileName(), Enums.ExportType.SHIPPING_DESTINATION_KARTE);
        res.setFilePath(filePath);

        return responseJson(res, MessageCode.INF001);
    }

}
