package vn.vnext.sefuri.sf.controller.impl;

import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import org.apache.commons.lang3.ArrayUtils;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import play.db.jpa.JPAApi;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00306Ctrl;
import vn.vnext.sefuri.sf.dao.ProductDao;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.helper.UrlHelper;
import vn.vnext.sefuri.sf.json.SF00306.model.*;
import vn.vnext.sefuri.sf.json.SF00306.request.SF0030602Req;
import vn.vnext.sefuri.sf.json.SF00306.request.SF0030603Req;
import vn.vnext.sefuri.sf.json.SF00306.request.SF0030604Req;
import vn.vnext.sefuri.sf.json.SF00306.response.SF0030601Res;
import vn.vnext.sefuri.sf.json.SF00306.response.SF0030604Res;
import vn.vnext.sefuri.sf.json.core.MstLaminationJson;
import vn.vnext.sefuri.sf.json.core.MstPaperJson;
import vn.vnext.sefuri.sf.module.export.ReportGenerator;
import vn.vnext.sefuri.sf.module.jms.JmsApi;
import vn.vnext.sefuri.sf.module.jms.json.if0111.IF0111Json;
import vn.vnext.sefuri.sf.module.jms.json.mailjob.MailJson;
import vn.vnext.sefuri.sf.service.*;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.DateUtil;
import vn.vnext.sefuri.sf.util.GenerateUtil;
import vn.vnext.sefuri.sf.util.MessagesUtil;

import javax.inject.Inject;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static vn.vnext.sefuri.sf.util.CollectionUtil.safeList;

public class SF00306CtrlImpl extends CommonCtrl implements SF00306Ctrl, Constants {

    private static final Logger logger = LoggerFactory.getLogger(SF00306CtrlImpl.class);

    private static final String COMMENT_PATTERN = "設計依頼（ {0} ）";
    private static final Integer JOB_INPROCESS = 1;
    @Inject
    private SV003DealService dealService;
    @Inject
    private SV002UserService userService;
    @Inject
    private SV005CustomerService customerService;
    @Inject
    private SV015DepartmentService departmentService;
    @Inject
    private SV008ProductService productService;
    @Inject
    private SV017MailService sv017MailService;
    @Inject
    private SV009OrderService orderService;
    @Inject
    private SV006FileService fileService;
    @Inject
    private SV004QuotationService quotationService;
    @Inject
    private SV014DealProductService dealProductService;
    @Inject
    private SV003DealService sv003DealService;
    @Inject
    private JmsApi jmsApi;
    @Inject
    private SV013MstDataService sv013MstDataService;
    @Inject
    private JPAApi jpaApi;
    @Inject
    private ProductDao productDao;
    @Inject
    private ReportGenerator reportGenerator;



    @Override
    public Result sf0030601Init(final String dealCode) {
        if (Strings.isNullOrEmpty(dealCode))
            return responseError(MessageCode.SF00306.WRN001);

        SF0030601Res res = new SF0030601Res();
        // check dealStatus <4
        DealDto deal = dealService.sv00329GetDealByDealCode(dealCode, Enums.DealStatus.ORDER_CONFIRMATION.getStatus());
        if (deal == null || deal.getClosedFlag() == 1)
            return responseError(MessageCode.SF00306.WRN001);

        //Get Deal info
        SF00306_DealJson dealJson = new SF00306_DealJson();
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
        if (customer != null) {
            dealJson.setCustomerName(customer.getName());
            dealJson.setCustomerCode(customer.getCustomerCode());
        } else {
            dealJson.setCustomerName(deal.getCustomerName());
        }

        res.setDeal(dealJson);

        //Get checksheets
        List<ChecksheetDto> checksheets = dealService.sv00326GetCheckSheetsByDealId(deal.getId());
        if (CollectionUtil.isNotEmpty(checksheets)) {
            List<SF00306_CheckSheetJson> checkSheetJsons = checksheets.stream().map(cs -> {
                SF00306_CheckSheetJson checkSheetJson = new SF00306_CheckSheetJson();
                checkSheetJson.setModel(cs);
                return checkSheetJson;
            }).collect(Collectors.toList());

            res.setCheckSheets(checkSheetJsons);
        }

        //Get product info (only product is remarked)
        List<SF00306_ProductBoxJson> productBoxJsons = parseProductBoxInfo(deal);
        // check list productRequest
        if (productBoxJsons == null) {
            return responseError(MessageCode.SF00306.WRN001);
        }

        res.setProductBoxes(productBoxJsons);

        //Create emailTemplate
        SF00306_TemplateMailJson templateMailJson = createTemplateMail(deal, saler, customer);
        res.setTemplateMail(templateMailJson);

        //6.Get department
        List<SF00306_DepartmentJson> departmentJsons;
        //http://118.70.209.113:30000/issues/2428
        List<DepartmentDto> departmentDtos = new ArrayList<>();
        departmentDtos.addAll(departmentService.sv01520GetDepartmentByType(SALE));
        departmentDtos.addAll(departmentService.sv01520GetDepartmentByType(SUPPORT));
        departmentDtos.addAll(departmentService.sv01521GetMailGroups());

        departmentJsons = getDepartmentJsonList(departmentDtos);

        res.setDepartments(departmentJsons);

        //12 get mst lamination
        List<MstLaminationDto> laminationDtos = sv013MstDataService.sv01332GetMasterLamination();
        if (CollectionUtil.isNotEmpty(laminationDtos)) {
            List<MstLaminationJson> laminationJsons = laminationDtos.stream().map(lamination -> {
                MstLaminationJson mstJson = new MstLaminationJson();
                mstJson.setData(lamination);

                return mstJson;
            }).collect(Collectors.toList());
            res.setLaminations(laminationJsons);
        }

        return responseJson(res, MessageCode.SF00306.INF001);
    }

    private SF00306_TemplateMailJson createTemplateMail(final DealDto deal, final UserDto saler, final CustomerDto customer) {
        SF00306_TemplateMailJson templateMailJson = new SF00306_TemplateMailJson();
        DepartmentSupportDto departmentSupportDto = departmentService.sv01513GetDepartmentSupport(
                saler.getDepartmentId(), Enums.RequestType.REQUEST_DESIGN_TO.getReqType());
        if (departmentSupportDto == null) {
            departmentSupportDto = departmentService.sv01514GetDefaultEmailByMailType(Enums.RequestType.REQUEST_DESIGN_TO.getReqType());
        }

        //#2337
        List<String> emailTo = Arrays.asList(departmentSupportDto.getEmailToName()+ "<" + departmentSupportDto.getDepartmentEmail() + ">");

        //#2578
        List<String> emailCc = Lists.newArrayList();
        if (Strings.isNullOrEmpty(departmentSupportDto.getDepartmentEmailCc())) {
            departmentSupportDto = departmentService.sv01514GetDefaultEmailByMailType(Enums.RequestType.REQUEST_DESIGN_TO.getReqType());
        }
        emailCc.add(departmentSupportDto.getEmailCCName() + "<" + departmentSupportDto.getDepartmentEmailCc() + ">");

        String dealCode = deal.getDealCode();
        String customerCode = customer != null ? customer.getCustomerCode() : Constants.BLANK;
        String customerName = customer != null ? customer.getName() : deal.getCustomerName();

        String subject = MessagesUtil.get("template/mail_template.properties", "SF00306_SUBJECT", dealCode);

        //SALE_NAME(0), DEAL_CODE(1), DEAL_NAME(2), CUSTOMER_CODE(3), CUSTOMER_NAME(4), DELIVERY_DATE(5),DELIVERY_INFO_URL(6);
        String content = MessagesUtil.get("template/mail_template.properties", "SF00306_BODY_CONTENT",
                Strings.nullToEmpty(saler.getUsername()), dealCode, deal.getDealName(), Strings.nullToEmpty(customerCode),
                Strings.nullToEmpty(customerName), DateUtil.formatDate(deal.getDeliveryDate()), UrlHelper.getRequestDesignUrl(dealCode));

        // fill into template
        templateMailJson.setTo(emailTo);
        if (CollectionUtil.isNotEmpty(emailCc))
            templateMailJson.setCc(emailCc);

        templateMailJson.setSubject(subject);
        templateMailJson.setContent(content);

        return templateMailJson;
    }

    private List<SF00306_ProductBoxJson> parseProductBoxInfo(final DealDto deal) {
        //Get product info (only product is remarked)
        List<ProductDto> productAlls = productService.sv00832GetProductsOrderByUpdatedDate(deal.getId(), false,
                Enums.Status.HIGHLIGHT_FLAG_ON.getStatus());
        if (CollectionUtil.isEmpty(productAlls))
            return Collections.emptyList();

        List<SF00306_ProductBoxJson> productBoxJsons = Lists.newArrayList();
        List<ProductDto> products = productAlls.stream().filter(productDto ->
                productDto.getRequestDesignFlag() == null || productDto.getRequestDesignFlag().equals(0)
        ).collect(Collectors.toList());
        if (CollectionUtil.isEmpty(products))
            return Collections.emptyList();

        List<Integer> productIds = products.stream().map(p -> p.getId()).collect(Collectors.toList());
        for (ProductDto p : products) {
            DealProductDto dealProduct = dealProductService.sv01405GetDealProductByDealIdAndProductId(deal.getId(), p.getId());

            //Set product info
            SF00306_ProductJson productJson = getProductJson(deal, p, productIds, dealProduct);

            //Parse basic product info
            SF00306_ProductBoxJson productBoxJson = new SF00306_ProductBoxJson();
            productBoxJson.setProduct(productJson);

            //Parse transaction history
            List<SF00306_TransHistoryJson> transHistoryJsons = getStocks(deal, productJson.getId());
            productBoxJson.setTransactions(transHistoryJsons);

            //Parse inventory item
            SF00306_InventoryJson inventoryJson = getInventoryJson(p, dealProduct, transHistoryJsons);
            productBoxJson.setInventory(inventoryJson);

            // add to list
            productBoxJsons.add(productBoxJson);
        }
        return productBoxJsons;

    }

    private SF00306_ProductJson getProductJson(final DealDto deal, final ProductDto product, final List<Integer> productIds, final DealProductDto dealProduct) {
        SF00306_ProductJson productJson = new SF00306_ProductJson();
        productJson.setData(product);
        // get memo product
        productJson.setMemo(productService.sv00836GetMemoProduct(product));
        // set paperName
        productJson.setPaperName(sv013MstDataService.sv01329GetPaperNameHaveId100(product));

        // 0. parse mst paper
        MstPaperJson mstPaperJson = new MstPaperJson();
        if (product.getPaperId() != null && product.getPaperId() != 0) {
            MstPaperDto mstPaperDto = sv013MstDataService.sv01337GetMstPaperByIdAndSheetSizeId(product.getPaperId(), product.getSheetSizeId());
            if (mstPaperDto != null)
                mstPaperJson.setData(mstPaperDto);

            productJson.setPaper(mstPaperJson);
        }

        //1. set product file
        ProductFileDto productFile = productService.sv00829GetPrimaryProductFile(product.getId());
        if (productFile != null) {
            FileDto fileDto = fileService.sv00609GetFileInfo(productFile.getFileId());
            productJson.setSrcImg(fileService.sv00618GetThumbnail(fileDto));
        }

        //2. set Lot+Estimated Unit Price
        //2.1. find list item based on selected product.
        //Get list QuotationItem by dealId
        List<QuotationItemDto> quotationItems = quotationService.sv00409GetQuotationItemsByDealIdAndProductId(deal.getId(), productIds);
        if (CollectionUtil.isNotEmpty(quotationItems)) {
            //2.2. get item has maximum quantity value
            QuotationItemDto quotationItem = quotationService.sv00410GetDefaultQuotationItem(quotationItems, false, deal.getId(), dealProduct);
            if (quotationItem != null) {
                //2.3. parse data to current product json
                productJson.setLot(quotationItem.getQuantity().intValue());
                productJson.setUnitPrice(quotationItem.getSubmittedPrice());
                productJson.setTotalCost(quotationItem.getTotal());
            }
        }

        return productJson;
    }

    private List<SF00306_TransHistoryJson> getStocks(final DealDto deal, final Integer productId) {
        List<OrderItemDto> orderItems = orderService.sv00901GetOrderItemByDealId(deal.getId());
        if (CollectionUtil.isEmpty(orderItems))
            return Collections.emptyList();


        List<SF00306_TransHistoryJson> transHistoryJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(orderItems)) {
            for (OrderItemDto orderItemDto : orderItems) {
                if (orderItemDto.getProductId().equals(productId)) {
                    SF00306_TransHistoryJson transHistoryJson = new SF00306_TransHistoryJson();
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

    private SF00306_InventoryJson getInventoryJson(final ProductDto product, final DealProductDto dealProduct, final List<SF00306_TransHistoryJson> transHistoryJsons) {
        SF00306_InventoryJson inventoryJson = new SF00306_InventoryJson();
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

    private Integer calculateNoOfDays(final DateTime updatedDate) {
        if (updatedDate != null) {
            long millisecondsPerDay = 24 * 60 * 60 * 1000;
            return Math.round(Math.abs((DateUtil.getSysDate().getMillis() - updatedDate.getMillis()) / (millisecondsPerDay)));
        }

        return null;
    }

    @Override
    public Result sf0030602SendMail() {
        SF0030602Req req = requestJson(SF0030602Req.class);

        List<String> recipients = req.getTo();
        List<String> cc = req.getCc();
        String subject = req.getSubject();
        String mailContent = req.getContent();
        //0. prepare log content
        String programCode = "SF003-06";
        String dateTime = DateUtil.formatDateTime(DateUtil.getSysDate());
        String userName = sv001AuthService.getCurrentUser().getUsername();

        //#2337
        //parseEmailAddress
        List<String> addressTo = recipients.stream().filter(item -> GenerateUtil.parseMailAddress(item) !=null).map(item
                -> GenerateUtil.parseMailAddress(item)).collect(Collectors.toList());

        List<String> addressCc = cc.stream().filter(item -> GenerateUtil.parseMailAddress(item) !=null).map(item
                -> GenerateUtil.parseMailAddress(item)).collect(Collectors.toList());

        mailContent = mailContent.replaceAll("(\r\n|\n)", "<br />");

        //2. get list product request
        List<SF00306_ProductJson> productJsons = req.getProducts();
        List<Integer> productIds = productJsons.stream()
                .map(sf00306_productJson -> sf00306_productJson.getId()).collect(Collectors.toList());

        Integer dealId = req.getDealId();

        // check job_inprogress
        DealDto dealDto = sv003DealService.sv00301GetDealById(dealId);
        if (dealDto.getJobInprocess() == JOB_INPROCESS) {
            // response OK
            return responseOk();
        }

        // 3. call interface deno
        // 3.1 construct json
        IF0111Json if0111Json = new IF0111Json();
        if0111Json.setDealId(dealId);
        if0111Json.setProducts(productIds);
        if0111Json.setUserId(sv001AuthService.getCurrentUser().getId());

        MailJson mailJson = new MailJson();
        if0111Json.setMail(mailJson);
        mailJson.setAddressTo(addressTo);
        mailJson.setAddressCC(addressCc);
        mailJson.setSubject(subject);
        mailJson.setContent(mailContent);

        // 3.2 prepare db, set IF state to inprogress
        jpaApi.withTransaction(() -> {
            dealDto.setJobInprocess(1);
            //update request lot
            if (CollectionUtil.isNotEmpty(productJsons)) {
                productJsons.forEach(productJson -> {
                    productService.sv00840UpdateRequestLot(productJson.getId(), productJson.getRequestLot());
                });
            }

            sv003DealService.sv00307SaveDeal(dealDto);
        });

        // 3.3 send request
        int jmsResult = jmsApi.callIF0111(if0111Json);
//        int jmsResult = JmsApi.RESULT_OK;

        //4. check result denno
        if (JmsApi.RESULT_NG == jmsResult) {
            // 4.1 logging request fail
            logger.debug(getMsgLog(dateTime, userName, MessageCode.SF00306.ERR002, programCode,
                    "IF01-1-1 was executed failure."));

            // 4.2 revert IF state
            dealDto.setJobInprocess(0);
            sv003DealService.sv00307SaveDeal(dealDto);

            // 4.3 response request fail
            return responseError(MessageCode.SF00306.ERR002);
        }

        // 5. update product
        List<ProductDto> products = productService.sv00834GetProductsByIds(productIds);

        // send request success
        if (CollectionUtil.isNotEmpty(productJsons)) {
            productJsons.forEach(productJson -> {
                productService.
                        sv00838UpdateDesignRequested(productJson.getId(), productJson.getRequestLot());
            });
        }

        // 6. update dealStatus
        sv003DealService.sv00329UpdateDealStatus(dealId);
        // 7. add deal activity
        addComment(dealId, products);

        // response OK
        return responseOk();
    }

    @Override
    public Result sf0030603UpdateRequestLot() {
        SF0030603Req req = requestJson(SF0030603Req.class);
        productService.sv00840UpdateRequestLot(req.getId(), req.getRequestLot());

        return responseJson(null, MessageCode.COM.INF001);
    }

    private String getMsgLog(final String dateTime, final String userName, final String errorCode,
                             final String programCode, final String content) {
        return new StringBuilder("\nDateTime: ").append(dateTime).append("\nUser: ").append(userName)
                .append("\nError code: ").append(errorCode).append("\nProgram code: ").append(programCode)
                .append("\nContent: ").append(content).toString();
    }

    private List<SF00306_DepartmentJson> getDepartmentJsonList(List<DepartmentDto> departmentDtos) {
        List<SF00306_DepartmentJson> departmentJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(departmentDtos)) {
            for (DepartmentDto departmentDto : departmentDtos) {
                SF00306_DepartmentJson departmentJson = new SF00306_DepartmentJson();
                departmentJson.setData(departmentDto);
                List<UserDto> userDtos = userService.sv00205GetUsersByDepartmentId(departmentDto.getId());
                List<SF00306_UserJson> userJsons = new ArrayList<>();
                if (CollectionUtil.isNotEmpty(userDtos)) {
                    for (UserDto userDto : userDtos) {
                        SF00306_UserJson userJson = new SF00306_UserJson();
                        userJson.setData(userDto);
                        // check email undefined
                        if (userDto.getEmail() != null && !userDto.getEmail().trim().equals(""))
                            userJsons.add(userJson);
                    }
                }
                departmentJson.setUsers(userJsons);
                departmentJsons.add(departmentJson);
            }
        }
        return departmentJsons;
    }


    private void addComment(Integer dealId, final List<ProductDto> products) {
        safeList(products).stream()
                .map(ProductDto::getProductName)
                .forEach(name -> {
                    CommentDto c = new CommentDto();
                    c.setDealId(dealId);

                    String msg = MessageFormat.format(COMMENT_PATTERN, name);
                    c.setValue(msg);
                    c.setCommentType(2);
                    c.setUserId(getUserId());

                    dealService.sv00308SaveComment(c);
                });

    }

    @Override
    public Result sf0030604ExportSpecificationPdf() {

        // リクエスト取得
        SF0030604Req req = requestJson(SF0030604Req.class);

        // productId取得
        Integer productId = productDao.getProductId(req.getProductCode());

        // pdfファイル生成及び設置場所のパスを取得
        String pdfFolder = reportGenerator.exportProductFile(productId, req.getDealCode());
        if (Strings.isNullOrEmpty(pdfFolder)) return responseError(MessageCode.SF00307.ERR003);

        //
        String result[] = pdfFolder.split(Constants.SLASH);
        if (ArrayUtils.isEmpty(result) || result.length < 2) {
            return responseError(MessageCode.SF00307.ERR003);
        }
        ProductDto productDto = productDao.find(productId);
        Integer productType = productDto.getProductType();
        SF0030604Res res = new SF0030604Res();
        res.setFileName(result[1]);
        String filePath = fileService.sv00621GetJasperProductReportURI(result[0], result[1], productType);
        res.setFilePath(filePath);

        return responseJson(res, MessageCode.SF00307.INF001);
    }

}
