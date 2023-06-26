package vn.vnext.sefuri.sf.controller.impl;

import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import org.joda.time.DateTime;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00310Ctrl;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.helper.UrlHelper;
import vn.vnext.sefuri.sf.json.SF00310.model.*;
import vn.vnext.sefuri.sf.json.SF00310.request.SF0031002Req;
import vn.vnext.sefuri.sf.json.SF00310.response.SF0031001Res;
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

import static vn.vnext.sefuri.sf.util.CollectionUtil.safeList;

public class SF00310CtrlImpl extends CommonCtrl implements SF00310Ctrl, Constants {
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
    private ReportGenerator reportGenerator;

    @Inject
    private SV013MstDataService mstDataService;

    private static final String COMMENT_PATTERN = "デザイン依頼（ {0} ）";

    @Override
    public Result sf00310Init(final String dealCode) {
        SF0031001Res res = new SF0031001Res();
        // get deal by dealCode
        DealDto deal = dealService.sv00306GetDealByDealCode(dealCode);
        if (deal == null || deal.getClosedFlag() == 1)
            return responseError(MessageCode.SF00310.WRN001);

        //Get Deal info
        SF00310_DealJson dealJson = new SF00310_DealJson();
        dealJson.setModel(deal);

        //Get saler's name
        UserDto saler = userService.sv00204GetUserById(deal.getSalesId());
        DepartmentDto departmentDto = new DepartmentDto();
        if (saler != null && saler.getDepartmentId() != null) {
            departmentDto = departmentService.sv01509GetDepartmentById(saler.getDepartmentId());
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

        //Get product info (only product is remarked)
        List<SF00310_ProductBoxJson> productBoxJsons = parseProductBoxInfo(deal);
        // check list productRequest
        res.setProductBoxes(productBoxJsons);

        //5. Create mail template
        SF00310_MailTemplateJson templateMailJson = createTemplateMail(deal, saler, departmentDto, customer);
        res.setMailTemplate(templateMailJson);

        //6.Get department
        List<SF00310_DepartmentJson> departmentJsons;
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

        //12 get mst lamination
        List<MstLaminationDto> laminationDtos = mstDataService.sv01332GetMasterLamination();
        if (CollectionUtil.isNotEmpty(laminationDtos)) {
            List<MstLaminationJson> laminationJsons = laminationDtos.stream().map(lamination -> {
                MstLaminationJson mstJson = new MstLaminationJson();

                mstJson.setData(lamination);

                return mstJson;
            }).collect(Collectors.toList());
            res.setLaminationJsons(laminationJsons);
        }

        res.setDepartments(departmentJsons);

        return responseJson(res, MessageCode.SF00310.INF001);
    }

    @Override
    public Result sf00310RequestDesign() {
        try {
            SF0031002Req req = requestJson(SF0031002Req.class);
            //1. parse data mail request
            SF00310_MailTemplateJson mailSpec = req.getMail();
            if (req.getMail() == null || CollectionUtil.isEmpty(req.getMail().getTo()))
                return responseError(MessageCode.SF00310.ERR001);

            List<String> to = mailSpec.getTo();
            List<String> cc = mailSpec.getCc();
            String subject = mailSpec.getSubject();
            String msg = mailSpec.getContent();
            if (msg == null) msg = "";
            msg = msg.replaceAll("(\r\n|\n)", "<br />");

            //#2337
            //parseEmailAddress
            List<String> addressTo = to.stream().map(item -> {
                return GenerateUtil.parseMailAddress(item);
            }).collect(Collectors.toList());

            List<String> addressCc = cc.stream().map(item -> {
                return GenerateUtil.parseMailAddress(item);
            }).collect(Collectors.toList());

            SF00310_RequestModel requestModel = req.getRequestModel();
            SF00310_DealJson deal = req.getDeal();
            List<SF00310_ParsedProductInfoJson> productInfoJsonList = req.getProducts();

            //2. send mail
            List<String> fileNames = Lists.newArrayList();
            List<String> mimeTypes = Lists.newArrayList();
            List<InputStream> attachments = Lists.newArrayList();

            for (SF00310_ParsedProductInfoJson productInfoJson : productInfoJsonList) {
                InputStream fileInputStream = null;
                String reportPdfPath = reportGenerator.sv01208ExportRequestCreateR005Pdf(requestModel, productInfoJson, deal);
                if (reportPdfPath == null)
                    continue;

                String[] stringArr = reportPdfPath.split(Constants.SLASH);
                File reportPdf = null;
                Integer productType = productInfoJson.getProductType();
                if (productType == 0) {
                    reportPdf = fileService.sv00620GetJasperReport(stringArr[0], stringArr[1], Enums.ExportType.PRODUCT_SHAPE.getType());
                } else if (productType == 1) {
                    reportPdf = fileService.sv00620GetJasperReport(stringArr[0], stringArr[1], Enums.ExportType.PRODUCT_CARTON.getType());
                }

                try {
                    fileInputStream = new FileInputStream(reportPdf);
                } catch (FileNotFoundException e) {
                    continue;
                }
                fileNames.add(stringArr[1].substring(0, stringArr[1].lastIndexOf(Constants.DOT)));
                mimeTypes.add(Enums.MimeType.PDF.getType());
                attachments.add(fileInputStream);
            }
            sv017MailService.sv01702SendMailWithAttachFiles(null, null, addressTo,
                    addressCc, subject, msg, attachments, fileNames, mimeTypes);

            int dealId = req.getDeal().getId();
            List<String> pNames = req.getProducts().stream().map(SF00310_ParsedProductInfoJson::getProductName).collect(Collectors.toList());
            //3. add comment
            this.addComment(dealId, pNames);

            //4. response
            return responseJson(null, MessageCode.SF00310.INF001);
        } catch (MessagingException | IOException e) {
            LogUtil.getLogger(SF00309CtrlImpl.class).error("MessagingException | IOException", e);
            return responseError(MessageCode.SF00310.ERR003);
        }
    }

    private void addComment(final int dealId, final List<String> productNames) {
        safeList(productNames)
                .forEach(name -> {
                    CommentDto c = new CommentDto();
                    c.setDealId(dealId);

                    String msg = MessageFormat.format(COMMENT_PATTERN, name);
                    c.setValue(msg);
                    c.setCommentType(5);
                    c.setUserId(getUserId());

                    dealService.sv00308SaveComment(c);
                });
    }

    private List<SF00310_ProductBoxJson> parseProductBoxInfo(final DealDto deal) {
        //Get product info (only product is remarked)
        List<ProductDto> productAlls = productService.sv00832GetProductsOrderByUpdatedDate(deal.getId(), false,
                Enums.Status.HIGHLIGHT_FLAG_ON.getStatus());
        if (CollectionUtil.isEmpty(productAlls))
            return Collections.emptyList();

        List<SF00310_ProductBoxJson> productBoxJsons = Lists.newArrayList();
        List<Integer> productIds = productAlls.stream().map(BaseDto::getId).collect(Collectors.toList());
        for (ProductDto p : productAlls) {
            DealProductDto dealProduct = dealProductService.sv01405GetDealProductByDealIdAndProductId(deal.getId(), p.getId());

            //Set product info
            SF00310_ProductJson productJson = getProductJson(deal, p, productIds, dealProduct);

            //Parse basic product info
            SF00310_ProductBoxJson productBoxJson = new SF00310_ProductBoxJson();
            productBoxJson.setProduct(productJson);

            //Parse transaction history
            List<SF00310_TransHistoryJson> transHistoryJsons = getStocks(deal, productJson.getId());
            productBoxJson.setTransactions(transHistoryJsons);

            //Parse inventory item
            SF00310_InventoryJson inventoryJson = getInventoryJson(p, dealProduct, transHistoryJsons);
            productBoxJson.setInventory(inventoryJson);

            // add to list
            productBoxJsons.add(productBoxJson);
        }
        return productBoxJsons;

    }

    private SF00310_ProductJson getProductJson(final DealDto deal, final ProductDto product, final List<Integer> productIds, final DealProductDto dealProduct) {
        SF00310_ProductJson productJson = new SF00310_ProductJson();
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

    private List<SF00310_TransHistoryJson> getStocks(final DealDto deal, final Integer productId) {
        List<OrderItemDto> orderItems = orderService.sv00901GetOrderItemByDealId(deal.getId());
        if (CollectionUtil.isEmpty(orderItems))
            return Collections.emptyList();

        List<SF00310_TransHistoryJson> transHistoryJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(orderItems)) {
            for (OrderItemDto orderItemDto : orderItems) {
                if (orderItemDto.getProductId().equals(productId)) {
                    SF00310_TransHistoryJson transHistoryJson = new SF00310_TransHistoryJson();
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

    private SF00310_InventoryJson getInventoryJson(final ProductDto product, final DealProductDto dealProduct, final List<SF00310_TransHistoryJson> transHistoryJsons) {
        SF00310_InventoryJson inventoryJson = new SF00310_InventoryJson();
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

    private SF00310_MailTemplateJson createTemplateMail(final DealDto deal, final UserDto saler,
                                                        final DepartmentDto department, final CustomerDto customer) {
        SF00310_MailTemplateJson mailTemplate = new SF00310_MailTemplateJson();
        DepartmentSupportDto departmentSupportDto = departmentService.sv01513GetDepartmentSupport(
                department.getId(), Enums.RequestType.DESIGN_REQUEST_TO.getReqType());
        if (departmentSupportDto == null) {
            departmentSupportDto = departmentService.sv01514GetDefaultEmailByMailType(Enums.RequestType.DESIGN_REQUEST_TO.getReqType());
        }
        //#2337
        List<String> emailTo = Arrays.asList(departmentSupportDto.getEmailToName() + "<" + departmentSupportDto.getDepartmentEmail() + ">");

        String dealCode = deal.getDealCode();
        String customerCode = customer != null ? customer.getCustomerCode() : Constants.BLANK;
        String customerName = customer != null ? customer.getName() : deal.getCustomerName();

        String subject = MessagesUtil.get("template/mail_template.properties", "SF00310_SUBJECT",
                dealCode, deal.getDealName());

        //DEPT_NAME(0), SALER_NAME(1), DEAL_CODE(2), DEAL_NAME(3), CUSTOMER_CODE(4), CUSTOMER_NAME(5), DELIVERY_DATE(6), DEAL_URL(7);
        String content = MessagesUtil.get("template/mail_template.properties", "SF00310_BODY_CONTENT",
                Strings.nullToEmpty(department.getDepartment()),
                Strings.nullToEmpty(saler.getUsername()),
                dealCode,
                deal.getDealName(),
                Strings.nullToEmpty(customerCode),
                Strings.nullToEmpty(customerName),
                DateUtil.formatDate(deal.getDeliveryDate()), UrlHelper.getDealUrl(dealCode));

        // fill into template
        mailTemplate.setTo(emailTo);
        mailTemplate.setSubject(subject);
        mailTemplate.setContent(content);

        return mailTemplate;
    }

    private List<SF00310_DepartmentJson> getDepartmentJsonList(List<DepartmentDto> departmentDtos) {
        List<SF00310_DepartmentJson> departmentJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(departmentDtos)) {
            for (DepartmentDto departmentDto : departmentDtos) {
                SF00310_DepartmentJson departmentJson = new SF00310_DepartmentJson();
                departmentJson.setData(departmentDto);
                List<UserDto> userDtos = userService.sv00205GetUsersByDepartmentId(departmentDto.getId());
                List<SF00310_UserJson> userJsons = new ArrayList<>();
                if (CollectionUtil.isNotEmpty(userDtos)) {
                    for (UserDto userDto : userDtos) {
                        SF00310_UserJson userJson = new SF00310_UserJson();
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
