package vn.vnext.sefuri.sf.controller.impl;

import com.google.common.base.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00304Ctrl;
import vn.vnext.sefuri.sf.json.response.SF0030401Res;
import vn.vnext.sefuri.sf.json.response.SF0030404Res;
import vn.vnext.sefuri.sf.module.export.ReportGenerator;
import vn.vnext.sefuri.sf.service.SV006FileService;
import vn.vnext.sefuri.sf.service.SV012QuotationTemplate;

import javax.inject.Inject;
import java.io.IOException;

/**
 * Created by haipt on 11/8/2016.
 */
public class SF00304CtrlImpl extends CommonCtrl implements SF00304Ctrl {
    Logger logger = LoggerFactory.getLogger(SF00304CtrlImpl.class);
    @Inject
    private ReportGenerator reportGeneration;

    @Inject
    private SV012QuotationTemplate sv012QuotationTemplate;

    @Inject
    private SV006FileService sv006FileService;

    @Override
    public Result sf0030401GetQuotationTemplates() {
        SF0030404Res res = new SF0030404Res();
        res.createJson(sv012QuotationTemplate.sv01203GetAllQuotationTemplates());
        return responseJson(res, MessageCode.COM.INF001);
    }

    @Override
    public Result sf0030402ExportFiles(final String quotationCode, final int option, final String fileName) {
        String result;
        try {
            result = reportGeneration.exportQuotationFile(quotationCode, option, fileName);
        } catch (IOException e) {
            logger.error("sf0030402exportFiles: ", e);
            return responseError(MessageCode.COM.ERR001);
        }
        if (Strings.isNullOrEmpty(result)) {
            logger.error("sf0030402exportFiles: could not get export file path!");
            return responseError(MessageCode.COM.ERR001);
        }
        String pdfUrl = sv006FileService.sv00622GetJasperQuotationReportURI(result, fileName + Enums.FileType.PDF.toString());
        String pngUrl = sv006FileService.sv00622GetJasperQuotationReportURI(result, fileName + Enums.FileType.PNG.toString());
        SF0030401Res res = new SF0030401Res();

        res.setPdfFilePath(pdfUrl);
        res.setPngFilePath(pngUrl);
        return responseJson(res, MessageCode.COM.INF001);
    }
}
