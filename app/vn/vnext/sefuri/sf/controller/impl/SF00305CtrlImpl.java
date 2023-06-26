package vn.vnext.sefuri.sf.controller.impl;

import com.google.common.base.Strings;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00305Ctrl;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.helper.EmailParams;
import vn.vnext.sefuri.sf.helper.EmailTemplate;
import vn.vnext.sefuri.sf.json.SF00305.request.SF0030502Req;
import vn.vnext.sefuri.sf.json.SF00305.response.SF0030501Res;
import vn.vnext.sefuri.sf.module.export.ReportGenerator;
import vn.vnext.sefuri.sf.service.*;
import vn.vnext.sefuri.sf.util.CollectionUtil;

import javax.inject.Inject;
import javax.mail.SendFailedException;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class SF00305CtrlImpl extends CommonCtrl implements SF00305Ctrl {
    private static final String DELIVERY_DATE_DEFAULT = "別途打ち合わせにて";
    private static final String COMMENT_PATTERN = "見積書提出（ {0} ）";
    private Logger logger = LoggerFactory.getLogger(SF00305CtrlImpl.class);
    @Inject
    private SV004QuotationService sv004QuotationService;
    @Inject
    private SV005CustomerService sv005CustomerService;
    @Inject
    private SV012QuotationTemplate sv012ReportGeneration;
    @Inject
    private ReportGenerator reportGenerator;
    @Inject
    private SV017MailService sv017MailService;
    @Inject
    private SV006FileService sv006FileService;
    @Inject
    private SV002UserService sv002UserService;
    @Inject
    private SV003DealService dealService;
    @Inject
    private SV002UserService userService;
    @Inject
    private SV015DepartmentService departmentService;

    @Override
    public Result sf0030501Init(String quotationCode) {
        SF0030501Res sf0030501Res = new SF0030501Res();

        // 1.0 Get Quotation and Deal info
        Object obj[] = sv004QuotationService.sv00408GetQuotationAndDealByQuotationCode(quotationCode);
        if (obj == null) {
            // Quotation Code not found
            return responseError(MessageCode.SF00305.ERR002);
        }
        QuotationDto quotationDto = (QuotationDto) obj[0];
        DealDto dealDto = (DealDto) obj[1];
        CustomerDto customerDto;
        if (dealDto.getCustomerId() != null) {
            customerDto = sv005CustomerService.sv00501GetCustomerByCustomerId(dealDto.getCustomerId());
        } else {
            customerDto = new CustomerDto();
        }

        // 1.1 Get template
        Integer printTemplate = quotationDto.getPrintTemplateId();
        if (quotationDto.getPrintTemplateId() == null) {
            printTemplate = 1;
        }
        QuotationPrintTemplateDto printTemplateDto = sv012ReportGeneration
                .sv01204GetPrintTemplateById(printTemplate);
        String fileName = "見積書" + quotationCode;
        String timeStamp = null;
        try {
            timeStamp = reportGenerator.exportQuotationFile(quotationCode, printTemplateDto.getSelectOption(), fileName);
        } catch (IOException e) {
            logger.debug("sf0030501Init: ", e);
        }

        sf0030501Res.setTimestamp(timeStamp);

        sf0030501Res.setMailAddress(customerDto.getCustomerContact());

        // 2.0 Get Email Template
        String params[] = new String[6];
        // 2.1 得意先担当者名
//        if (quotationDto.getInvoicePic() != null) {
//            params[EmailParams.QuotationEmailTemplateEnum.INVOICE_PIC.value] = quotationDto.getInvoicePic();
//        } else {
//            params[EmailParams.QuotationEmailTemplateEnum.INVOICE_PIC.value] = "";
//        }

        // 2.1 http://fridaynight.vnext.vn/issues/2607

        String invCusName = null;
        if (Strings.isNullOrEmpty(quotationDto.getInvoiceCustomerName())) {
            DealDto deal = quotationDto.getDeal();
            if (deal != null && deal.getCustomer() != null) {
                invCusName = deal.getCustomer().getName();
            } else if (deal != null && !Strings.isNullOrEmpty(deal.getCustomerName())) {
                invCusName = deal.getCustomerName();
            }
        } else {
            invCusName = quotationDto.getInvoiceCustomerName();
        }

        String fTitle = quotationDto.getTitle() == 2 ? "　様" : "　御中";
        if (Strings.isNullOrEmpty(quotationDto.getInvoiceDeptName()) && Strings.isNullOrEmpty(quotationDto.getInvoicePic())) {
            params[EmailParams.QuotationEmailTemplateEnum.INVOICE_PIC.value] = new StringBuilder(16)
                    .append(Strings.nullToEmpty(invCusName))
                    .append(fTitle)
                    .toString();
        } else if (Strings.isNullOrEmpty(quotationDto.getInvoiceDeptName())) {
            params[EmailParams.QuotationEmailTemplateEnum.INVOICE_PIC.value] = new StringBuilder(16)
                    .append(Strings.nullToEmpty(invCusName))
                    .append("\n")
                    .append(Strings.nullToEmpty(quotationDto.getInvoicePic()))
                    .append(fTitle)
                    .toString();
        } else
            params[EmailParams.QuotationEmailTemplateEnum.INVOICE_PIC.value] = new StringBuilder(16)
                    .append(Strings.nullToEmpty(invCusName))
                    .append("\n")
                    .append(Strings.nullToEmpty(quotationDto.getInvoiceDeptName()))
                    .append(Constants.SPACE)
                    .append(Strings.nullToEmpty(quotationDto.getInvoicePic()))
                    .append(fTitle)
                    .toString();


        // 2.2 担当営業名
        if (dealDto.getSalesId() != null) {
            UserDto userDto = sv002UserService.sv00204GetUserById(dealDto.getSalesId());
            params[EmailParams.QuotationEmailTemplateEnum.SALER_NAME.value] = userDto.getUsername();
        } else {
            params[EmailParams.QuotationEmailTemplateEnum.SALER_NAME.value] = "";
        }

        // 2.3 案件名
        if (dealDto.getDealName() != null) {
            params[EmailParams.QuotationEmailTemplateEnum.DEAL_NAME.value] = dealDto.getDealName();
        } else {
            params[EmailParams.QuotationEmailTemplateEnum.DEAL_NAME.value] = "";
        }

        // 2.4 納期
        SimpleDateFormat sdf = new SimpleDateFormat(Constants.DEFAULT_DATE_FORMAT);
        if (!Strings.isNullOrEmpty(quotationDto.getInvoiceDeliveryDate())) {
            params[EmailParams.QuotationEmailTemplateEnum.INVOICE_DELIVERY_DATE.value] = quotationDto.getInvoiceDeliveryDate();
        } else {
            params[EmailParams.QuotationEmailTemplateEnum.INVOICE_DELIVERY_DATE.value] = DELIVERY_DATE_DEFAULT;
        }


        // 2.6 見積有効期限
        //Fix #2596
        if (quotationDto.getInvoiceExpirationDate() != null) {
            params[EmailParams.QuotationEmailTemplateEnum.EST_DATE.value] = sdf.format(quotationDto.getInvoiceExpirationDate().toDate());
        } else {
            params[EmailParams.QuotationEmailTemplateEnum.EST_DATE.value] = "次回お見積りまで";
        }

        try {
            sf0030501Res.setMailTemplate(EmailTemplate.parseEmail(EmailTemplate.QUOTATION_EMAIL_TEMPLATE, params));
        } catch (UnsupportedEncodingException e) {
            logger.error("sf0030501Init: ", e);
            return responseError(MessageCode.SF00503.ERR003);
        }
        sf0030501Res.setAttachFile(fileName);

        sf0030501Res.setAttachFileUri(sv006FileService.sv00623GetQuotationThumbUri(fileName + Constants.UNDERSCORE + printTemplateDto.getSelectOption()));
        return responseJson(sf0030501Res, MessageCode.SF00305.INF001);
    }

    @Override
    public Result sf0030502SendMail() {
        SF0030502Req req = requestJson(SF0030502Req.class);

        List<String> recipients = req.getRecipients();
        List<String> cc = req.getCc();
        String subject = req.getSubject();
        String mailContent = req.getMailContent();
        if (CollectionUtil.isEmpty(recipients) || mailContent == null || "".equals(mailContent)) {
            return responseError(MessageCode.SF00305.ERR004);
        }
        mailContent = mailContent.replaceAll("(\r\n|\n)", "<br />");
        List<String> attachFiles = req.getAttachFiles();
        List<String> mimeTypes = req.getMimeTypes();

        try {
            List<InputStream> attachFilesStream = new ArrayList<>();

            // 2.0 Add upload file to attachment
            if (CollectionUtil.isNotEmpty(attachFiles)) {
                File result = sv006FileService.sv00620GetJasperReport(req.getTimestamp(),
                        attachFiles.get(0) + Enums.FileType.PDF.toString(), Enums.ExportType.QUOTATION.getType());
                for (String fileCode : attachFiles) {
                    InputStream targetStream;
                    String fileName = fileCode + ".pdf";
                    if (!fileName.equals(result.getName())) {
                        File file = sv006FileService.sv00603GetTempFile(fileCode);
                        targetStream = FileUtils.openInputStream(file);
                        attachFilesStream.add(targetStream);
                    } else {
                        targetStream = FileUtils.openInputStream(result);
                        attachFilesStream.add(targetStream);
                    }
                }
            }

            // http://fridaynight.vnext.vn/issues/3118
            UserDto loginUser = sv001AuthService.getCurrentUser();
            // 3.0 Send mail
            sv017MailService.sv01702SendMailWithAttachFiles(loginUser.getUsername(), loginUser.getEmail(),
                    recipients, cc, subject, mailContent, attachFilesStream, attachFiles, mimeTypes);

            // 4.0 Add deal activity
            addComment(req.getDealCode(), req.getQuotationCode());
        } catch (SendFailedException e) {
            logger.error("sf0030502SendMail", e);
            return responseError(MessageCode.SF00305.ERR005);
        } catch (Exception e) {
            logger.error("sf0030502SendMail", e);
            return responseError(MessageCode.SF00305.ERR001);
        }

        return responseJson(null, MessageCode.SF00305.INF001);
    }

    private void addComment(String dealCode, String quotationCode) {
        CommentDto comment = new CommentDto();

        DealDto deal = dealService.sv00306GetDealByDealCode(dealCode);
        comment.setDealId(deal.getId());

        String msg = MessageFormat.format(COMMENT_PATTERN, quotationCode);
        comment.setValue(msg);
        comment.setCommentType(1);
        comment.setUserId(getUserId());

        dealService.sv00308SaveComment(comment);
    }

}
