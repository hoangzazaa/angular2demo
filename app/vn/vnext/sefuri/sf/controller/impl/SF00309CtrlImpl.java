package vn.vnext.sefuri.sf.controller.impl;

import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import play.mvc.Result;
import com.google.common.collect.Lists;
import org.apache.commons.io.FileUtils;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00309Ctrl;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.dao.CommentFileDao;
import vn.vnext.sefuri.sf.helper.EmailTemplate;
import vn.vnext.sefuri.sf.helper.UrlHelper;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_DealFileJson;
import vn.vnext.sefuri.sf.json.SF00301.request.SF0030104Req;
import vn.vnext.sefuri.sf.json.SF00301.response.SF0030104Res;
import vn.vnext.sefuri.sf.json.SF00309.model.*;
import vn.vnext.sefuri.sf.json.SF00309.request.SF0030902Req;
import vn.vnext.sefuri.sf.json.SF00309.response.SF0030901Res;
import vn.vnext.sefuri.sf.json.core.MstLaminationJson;
import vn.vnext.sefuri.sf.json.core.MstPaperJson;
import vn.vnext.sefuri.sf.module.export.ReportGenerator;
import vn.vnext.sefuri.sf.module.jms.JmsApi;
import vn.vnext.sefuri.sf.service.*;
import vn.vnext.sefuri.sf.util.*;


import javax.inject.Inject;
import javax.mail.MessagingException;
import java.io.*;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.net.FileNameMap;
import java.net.URLConnection;

import static vn.vnext.sefuri.sf.util.CollectionUtil.safeList;

/**
 * Created by ASUS on 5/8/2017.
 */
public class SF00309CtrlImpl extends CommonCtrl implements SF00309Ctrl, Constants {
    @Inject
    private SV003DealService dealService;

    @Inject
    private SV002UserService userService;

    @Inject
    private SV005CustomerService customerService;

    @Inject
    private SV006FileService sv006FileService;

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
    private JmsApi jmsApi;

    @Inject
    private ReportGenerator reportGenerator;

    @Inject
    private SV013MstDataService mstDataService;

    @Inject
    private CommentFileDao commentFileDao;

    private static final String COMMENT_PATTERN = "サンプル依頼（ {0} ）";
    private static final Integer COMMENT_TYPE = 3;

    private Logger logger = LoggerFactory.getLogger(SF00309CtrlImpl.class);

    @Override
    public Result sf0030901Init(final String dealCode, Integer requestType) {
        SF0030901Res res = new SF0030901Res();
        //1. Get deal's info
        DealDto deal = dealService.sv00306GetDealByDealCode(dealCode);
        if (deal == null || deal.getClosedFlag() == 1)
            return responseError(MessageCode.SF00309.WRN001);

        //parse deal json
        SF00309_DealJson dealJson = new SF00309_DealJson();
        dealJson.setModel(deal);

        //2. Get saler's info
        DepartmentDto department = null;
        UserDto saler = userService.sv00204GetUserById(deal.getSalesId());
        department = departmentService.sv01509GetDepartmentById(saler.getDepartmentId());
        dealJson.setSalerName(department.getDepartment() + Constants.SLASH_JP + saler.getUsername());

        //3. Get customer's info
        CustomerDto customer = customerService.sv00501GetCustomerByCustomerId(deal.getCustomerId());
        if (customer != null) {
            dealJson.setCustomerName(customer.getName());
            dealJson.setCustomerCode(customer.getCustomerCode());
        } else {
            dealJson.setCustomerName(deal.getCustomerName());
        }
        res.setDeal(dealJson);

        //4. Get product's info (only product is remarked)
        List<SF00309_ProductBoxJson> productBoxJsons = parseProductBoxInfo(deal);
        res.setProductBoxes(productBoxJsons);

        //5. Create mail template
        SF00309_MailTemplateJson templateMailJson = createTemplateMail(requestType, dealJson, saler, department);
        res.setMailTemplate(templateMailJson);

        //6.Get department
        List<SF00309_DepartmentJson> departmentJsons;
        List<DepartmentDto> departmentDtos = new ArrayList<>();
        //http://118.70.209.113:30000/issues/2428
        departmentDtos.addAll(departmentService.sv01520GetDepartmentByType(SALE));
        departmentDtos.addAll(departmentService.sv01520GetDepartmentByType(SUPPORT));
        departmentDtos.addAll(departmentService.sv01521GetMailGroups());

        departmentJsons = getDepartmentJsonList(departmentDtos);
        if (departmentJsons.size() == 0) {
            departmentDtos = departmentService.sv01501FindAllDepartment();
            departmentJsons = getDepartmentJsonList(departmentDtos);
        }

        res.setDepartments(departmentJsons);

        List<MstLaminationDto> laminationDtos = mstDataService.sv01332GetMasterLamination();
        if (CollectionUtil.isNotEmpty(laminationDtos)) {
            List<MstLaminationJson> laminationJsons = laminationDtos.stream().map(lamination -> {
                MstLaminationJson mstJson = new MstLaminationJson();
                mstJson.setData(lamination);
                return mstJson;
            }).collect(Collectors.toList());
            res.setLaminationJsons(laminationJsons);
        }

        return responseJson(res, MessageCode.SF00309.INF001);
    }

    @Override
    public Result sf0030902RequestSample() {
        SF0030902Req req = requestJson(SF0030902Req.class);

        // get To
        List<String> to = req.getTo();
        if (CollectionUtil.isEmpty(to)) {
            return responseError(MessageCode.SF00309.ERR003);
        }


        // get CC
        List<String> cc = req.getCc();

        // get Subject
        String subject = req.getSubject();

        // get message

        String msg = !Strings.isNullOrEmpty(req.getContent()) ?
                req.getContent().replaceAll("(\r\n|\n)", "<br />") : Constants.BLANK;

        //#2337
        //parseEmailAddress
        List<String> addressTo = to.stream().map(item -> {
            return GenerateUtil.parseMailAddress(item);
        }).collect(Collectors.toList());

        List<String> addressCc = cc.stream().map(item -> {
            return GenerateUtil.parseMailAddress(item);
        }).collect(Collectors.toList());

        // CCに自分の宛先を追加
        UserDto userDto = userService.sv00204GetUserById(getUserId());
        if(userDto != null && userDto.getEmail() != null && addressCc != null && !addressCc.contains(userDto.getEmail())){
            addressCc.add(userDto.getEmail());
            logger.debug("add current user email to cc.");
        } else {
            logger.warn("==============================");
            logger.warn("| Cannot add user email to cc.");
            logger.warn("| userId exists?   : {}", (getUserId() != null));
            logger.warn("| userId           : {}", getUserId());
            logger.warn("| userDto exists?  : {}", (userDto != null));
            logger.warn("| email exists?    : {}", userDto.getEmail() != null);
            logger.warn("| not containt cc? : {}", !addressCc.contains(userDto.getEmail()));
            logger.warn("==============================");
        }

        DealDto deal = dealService.sv00301GetDealById(req.getDealId());

        List<String> fileNames = Lists.newArrayList();
        List<String> mimeTypes = Lists.newArrayList();
        List<InputStream> attachments = Lists.newArrayList();

        List<SF00309_AttachmentFileJson> attachmentFiles = req.getAttachmentFiles();

        if ( attachmentFiles.size() > 0 ) {
            FileNameMap fileNameMap = URLConnection.getFileNameMap();
            try {
                for (SF00309_AttachmentFileJson attachmentFile : attachmentFiles) {
                    String fileName = attachmentFile.getName();
                    fileNames.add(fileName.substring(0, fileName.lastIndexOf(Constants.DOT)));
                    
                    String mimeType = fileNameMap.getContentTypeFor(attachmentFile.getName());
                    mimeTypes.add(mimeType);

                    File file = fileService.sv00603GetTempFile(attachmentFile.getTmpName());
                    InputStream targetStream = FileUtils.openInputStream(file);
                    attachments.add(targetStream);
                }
            }
            catch (Exception e) {
                logger.error("sf0030902RequestSample", e);
                return responseError(MessageCode.SF00309.ERR003);
            }

        }


        boolean isSuccess = true;
        try {
            sv017MailService.sv01702SendMailWithAttachFiles(userDto.getUsername(), userDto.getEmail(), addressTo,
                    addressCc, subject, msg, attachments, fileNames, mimeTypes);
        } catch (MessagingException | IOException e) {
            isSuccess = false;

            LogUtil.getLogger(SF00309CtrlImpl.class).error("MessagingException | IOException", e);
        }

        if (isSuccess) {

            addComment(deal.getId(), req.getRequestType(), MailUtil.toPlainTextMail(msg), subject, attachmentFiles);

            return responseJson(null, MessageCode.SF00309.INF001);
        }

        return responseError(MessageCode.SF00309.ERR004);
    }

    private List<SF00309_ProductBoxJson> parseProductBoxInfo(final DealDto deal) {
        //Get product info (only product is remarked)
        List<ProductDto> productAlls = productService.sv00832GetProductsOrderByUpdatedDate(
                deal.getId(), false, Enums.Status.HIGHLIGHT_FLAG_ON.getStatus());
        if (CollectionUtil.isEmpty(productAlls))
            return Collections.emptyList();

        List<SF00309_ProductBoxJson> productBoxJsons = Lists.newArrayList();

        List<Integer> productIds = productAlls.stream().map(p -> p.getId()).collect(Collectors.toList());
        for (ProductDto p : productAlls) {
            DealProductDto dealProduct = dealProductService.sv01405GetDealProductByDealIdAndProductId(
                    deal.getId(), p.getId());

            //Set product info
            SF00309_ProductJson productJson = getProductJson(deal, p, productIds, dealProduct);

            //Parse basic product info
            SF00309_ProductBoxJson productBoxJson = new SF00309_ProductBoxJson();
            productBoxJson.setProduct(productJson);

            //Parse transaction history
            List<SF00309_TransHistoryJson> transHistoryJsons = getStocks(deal, productJson.getId());
            productBoxJson.setTransactions(transHistoryJsons);

            //Parse inventory item
            SF00309_InventoryJson inventoryJson = getInventoryJson(p, dealProduct, transHistoryJsons);
            productBoxJson.setInventory(inventoryJson);

            // add to list
            productBoxJsons.add(productBoxJson);
        }
        return productBoxJsons;

    }

    private SF00309_ProductJson getProductJson(final DealDto deal, final ProductDto product,
                                               final List<Integer> productIds, final DealProductDto dealProduct) {
        SF00309_ProductJson productJson = new SF00309_ProductJson();
        productJson.setData(product);
        // get memo product
        productJson.setMemo(productService.sv00836GetMemoProduct(product));
        // 0. parse mst paper
        MstPaperJson mstPaperJson = new MstPaperJson();
        if (product.getPaperId() != null && product.getPaperId() != 0) {
            MstPaperDto mstPaperDto = mstDataService.sv01337GetMstPaperByIdAndSheetSizeId(product.getPaperId(), product.getSheetSizeId());
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
        List<QuotationItemDto> quotationItems = quotationService.sv00409GetQuotationItemsByDealIdAndProductId(
                deal.getId(), productIds);
        if (CollectionUtil.isNotEmpty(quotationItems)) {
            //2.2. get item has maximum quantity value
            QuotationItemDto quotationItem = quotationService.sv00410GetDefaultQuotationItem(
                    quotationItems, false, deal.getId(), dealProduct);
            if (quotationItem != null) {
                //2.3. parse data to current product json
                productJson.setLot(quotationItem.getQuantity().intValue());
                productJson.setUnitPrice(quotationItem.getSubmittedPrice());
                productJson.setTotalCost(quotationItem.getTotal());
            }
        }

        return productJson;
    }

    private List<SF00309_TransHistoryJson> getStocks(final DealDto deal, final Integer productId) {
        List<OrderItemDto> orderItems = orderService.sv00901GetOrderItemByDealId(deal.getId());
        if (CollectionUtil.isEmpty(orderItems))
            return Collections.emptyList();

        List<SF00309_TransHistoryJson> transHistoryJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(orderItems)) {
            for (OrderItemDto orderItemDto : orderItems) {
                if (orderItemDto.getProductId().equals(productId)) {
                    SF00309_TransHistoryJson transHistoryJson = new SF00309_TransHistoryJson();
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

    private SF00309_InventoryJson getInventoryJson(final ProductDto product, final DealProductDto dealProduct,
                                                   final List<SF00309_TransHistoryJson> transHistoryJsons) {
        SF00309_InventoryJson inventoryJson = new SF00309_InventoryJson();
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

//    private SF00309_MailTemplateJson createTemplateMail(final DealDto deal, final UserDto saler,
//                                                        final DepartmentDto department, final CustomerDto customer) {
//        SF00309_MailTemplateJson mailTemplate = new SF00309_MailTemplateJson();
//
//        //#2337 && http://fridaynight.vnext.vn/issues/3147
//        /* DepartmentSupportDto departmentSupportDto = departmentService.sv01513GetDepartmentSupport(
//                department.getId(), EnumsPDF.RequestType.SAMPLE_REQUEST_TO.getReqType());
//        if (departmentSupportDto == null) {
//            departmentSupportDto = departmentService.sv01514GetDefaultEmailByMailType(EnumsPDF.RequestType.SAMPLE_REQUEST_TO.getReqType());
//        }*/
//        // List<String> emailTo = Arrays.asList(departmentSupportDto.getEmailToName() + "<" + departmentSupportDto.getDepartmentEmail() + ">");
//
//        String dealCode = deal.getDealCode();
//        String customerCode = customer != null ? customer.getCustomerCode() : Constants.BLANK;
//        String customerName = customer != null ? customer.getName() : deal.getCustomerName();
//
//        String subject = MessagesUtil.get("template/mail_template.properties", "SF00309_SUBJECT",
//                dealCode, deal.getDealName());
//
//        //DEPT_NAME(0), SALER_NAME(1), DEAL_CODE(2), DEAL_NAME(3), CUSTOMER_CODE(4), CUSTOMER_NAME(5), DELIVERY_DATE(6), DEAL_URL(7);
//        String content = MessagesUtil.get("template/mail_template.properties", "SF00309_BODY_CONTENT",
//                Strings.nullToEmpty(department.getDepartment()),
//                Strings.nullToEmpty(saler.getUsername()),
//                dealCode,
//                deal.getDealName(),
//                Strings.nullToEmpty(customerCode),
//                Strings.nullToEmpty(customerName),
//                DateUtil.formatDate(deal.getDeliveryDate()), UrlHelper.getDealUrl(dealCode));
//
//        // fill into template
//        mailTemplate.setSubject(subject);
//        mailTemplate.setContent(content);
//
//        return mailTemplate;
//    }


    private SF00309_MailTemplateJson createTemplateMail(final int requestType, final SF00309_DealJson deal, final UserDto saler, final DepartmentDto department) {
        EmailTemplate.Type type = EmailTemplate.Type.find(requestType);
        if(type == null) {
            logger.warn("mail template not found. use default (normal sample request template).");
            type = EmailTemplate.Type.NORMAL_SAMPLE;
        }
        SF00309_MailTemplateJson mailTemplate = new SF00309_MailTemplateJson();
        String subject = EmailTemplate.getEMailSubject(type, deal.getDealCode(), deal.getDealName());
        String content = EmailTemplate.getEmailTemplate(type,
                department.getDepartment(), saler.getUsername(), deal.getDealCode(), deal.getDealName(),
                deal.getCustomerCode(), deal.getCustomerName(), DateUtil.formatDate(deal.getDeliveryDate())
        );
        mailTemplate.setSubject(subject);
        mailTemplate.setContent(content);
        return mailTemplate;
    }


//    private void addComment(Integer dealId, final List<ProductDto> products) {
//        safeList(products).stream()
//                .map(ProductDto::getProductName)
//                .forEach(name -> {
//                    CommentDto c = new CommentDto();
//                    c.setDealId(dealId);
//
//                    String msg = MessageFormat.format(COMMENT_PATTERN, name);
//                    c.setValue(msg);
//                    c.setCommentType(3);
//                    c.setUserId(getUserId());
//
//                    dealService.sv00308SaveComment(c);
//                });
//    }

    private void addComment(Integer dealId, Integer commentType, String commentContent, String title, List<SF00309_AttachmentFileJson> attachments){
        CommentDto c = new CommentDto();
        c.setDealId(dealId);
        c.setValue(commentContent);
        c.setCommentType(commentType);
        c.setUserId(getUserId());
        c.setTitle(title);
        CommentDto comment = dealService.sv00308SaveComment(c);
        
        if ( attachments != null && attachments.size() > 0 ) {
            for (SF00309_AttachmentFileJson file : attachments) {
                // String tmpFileCode = FilenameUtils.removeExtension(file.getTmpName());
                FileDto fileDto = sv006FileService.sv00604SaveTempFile(file.getTmpName(), Enums.ModuleType.COMMENT_FILE);

                DateTime now = DateTime.now();
                CommentFileDto commentFile = new CommentFileDto();
                commentFile.setFileId(fileDto.getId());
                commentFile.setCreatedDate(now);
                commentFile.setUpdatedDate(now);
                commentFile.setCreatedUser(getUserId());
                commentFile.setUpdatedUser(getUserId());
                commentFile.setOriginalName(file.getName());
                commentFile.setCommentId(comment.getId());
                commentFileDao.create(commentFile);
            }
        }
        
    }

    private List<SF00309_DepartmentJson> getDepartmentJsonList(List<DepartmentDto> departmentDtos) {
        List<SF00309_DepartmentJson> departmentJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(departmentDtos)) {
            for (DepartmentDto departmentDto : departmentDtos) {
                SF00309_DepartmentJson departmentJson = new SF00309_DepartmentJson();
                departmentJson.setData(departmentDto);
                List<UserDto> userDtos = userService.sv00205GetUsersByDepartmentId(departmentDto.getId());
                List<SF00309_UserJson> userJsons = new ArrayList<>();
                if (CollectionUtil.isNotEmpty(userDtos)) {
                    for (UserDto userDto : userDtos) {
                        SF00309_UserJson userJson = new SF00309_UserJson();
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

}
