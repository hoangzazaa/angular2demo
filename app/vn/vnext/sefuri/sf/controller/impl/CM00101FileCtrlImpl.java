package vn.vnext.sefuri.sf.controller.impl;

import java.io.File;
import java.io.IOException;
import java.net.FileNameMap;
import java.net.URLConnection;

import com.auth0.jwt.internal.org.apache.commons.io.FilenameUtils;
import com.google.inject.Inject;

import play.mvc.Http;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.CM00101FileCtrl;
import vn.vnext.sefuri.sf.helper.SfrException;
import vn.vnext.sefuri.sf.helper.SfrExceptionCode;
import vn.vnext.sefuri.sf.json.response.CM0010101Res;
import vn.vnext.sefuri.sf.json.response.CM0010102Res;
import vn.vnext.sefuri.sf.service.SV006FileService;

public class CM00101FileCtrlImpl extends CommonCtrl implements CM00101FileCtrl {
    @Inject
    private SV006FileService fileService;

    private static final String THUMB_PREFIX = "Thumb_";

    @Override
    public Result cm0010101UploadFileAsTempFile() throws IOException {

        dbLoggingService.sv90106ButtonOperation("画像一時アップロード", "upload file as temporary.");

        Http.MultipartFormData<File> body = request().body().asMultipartFormData();
        Http.MultipartFormData.FilePart<File> filePart = body.getFile("file");

        if (filePart == null) {
            return responseError(MessageCode.CM00101.ERR001);
        }
        String extension = FilenameUtils.getExtension(filePart.getFilename());
        String uuid;
        try {
            uuid = fileService.sv00602SaveTempFile(filePart.getFile(), extension);
        } catch (SfrException e) {
            //http://fridaynight.vnext.vn/issues/3491
            if (SfrExceptionCode.ERR_SV006_GENERATE_PDF_THUMBNAIL.equals(e.getErrCode()))
                return responseJson(null, MessageCode.CM00101.ERR003);

            return responseJson(null, MessageCode.CM00101.ERR002);
        }
        CM0010101Res res = new CM0010101Res();
        res.setFileName(uuid + Constants.DOT + extension);

        boolean notAnImage = extension.toUpperCase().equals("PDF");
        if (notAnImage) {
            res.setThumbnail(THUMB_PREFIX + uuid + Enums.FileType.PNG.toString());
        }

        return responseJson(res, MessageCode.CM00101.INF001);
    }

    @Override
    public Result cm0010102GetTempFileByFileName(String fileName) {
        File file = fileService.sv00603GetTempFile(fileName);
        CM0010102Res cm0010102Res = new CM0010102Res();
        cm0010102Res.setFile(file);

        FileNameMap fileNameMap = URLConnection.getFileNameMap();
        String mimeType = fileNameMap.getContentTypeFor(fileName);
        return ok(file).as(mimeType).withHeader("Content-Disposition", "attachment; filename=" + fileName);
    }

    @Override
    public Result cm0010103GetFileByFileId(String fileName) {
        String fileCode = FilenameUtils.removeExtension(fileName);
        File file = fileService.sv00606GetFile(fileCode);
        FileNameMap fileNameMap = URLConnection.getFileNameMap();
        String mimeType = fileNameMap.getContentTypeFor(fileName);
        //String mimeType = Files.probeContentType(file.toPath());
        if (file != null) {
            return ok(file).as(mimeType);
        }

        return badRequest();
    }

    @Override
    public Result cm0010104Download(String fileCode, String fileName) {
        File file = fileService.sv00606GetFile(fileCode);
        if (file != null) {
            FileNameMap fileNameMap = URLConnection.getFileNameMap();
            String mimeType = fileNameMap.getContentTypeFor(fileName);
            return ok(file).as(mimeType).withHeader("Content-Disposition", "attachment; filename=" + fileName);
        }

        return badRequest();
    }

    @Override
    public Result cm0010105GetJasperReport(String folderName, String fileName, String exportType) {
        File file;
        if (Enums.ExportType.QUOTATION.getType().equals(exportType)) {
            file = fileService.sv00620GetJasperReport(folderName, fileName, Enums.ExportType.QUOTATION.getType());
        } else if (Enums.ExportType.PRODUCT_SHAPE.getType().equals(exportType)) {
            file = fileService.sv00620GetJasperReport(folderName, fileName, Enums.ExportType.PRODUCT_SHAPE.getType());
        } else if (Enums.ExportType.PRODUCT_CARTON.getType().equals(exportType)) {
            file = fileService.sv00620GetJasperReport(folderName, fileName, Enums.ExportType.PRODUCT_CARTON.getType());
        } else if (Enums.ExportType.INVENTORY.getType().equals(exportType)) {
            file = fileService.sv00620GetJasperReport(folderName, fileName, Enums.ExportType.INVENTORY.getType());
        } else if (Enums.ExportType.CUSTOMER_KARTE.getType().equals(exportType)) {
            file = fileService.sv00620GetJasperReport(folderName, fileName, Enums.ExportType.CUSTOMER_KARTE.getType());
        } else if (Enums.ExportType.SHIPPING_DESTINATION_KARTE.getType().equals(exportType)) {
            file = fileService.sv00620GetJasperReport(folderName, fileName, Enums.ExportType.SHIPPING_DESTINATION_KARTE.getType());
        } else {
            return badRequest();
        }

        FileNameMap fileNameMap = URLConnection.getFileNameMap();
        String mimeType = fileNameMap.getContentTypeFor(fileName);
        if (file != null && mimeType == null) {
            mimeType = fileNameMap.getContentTypeFor(file.getName());
        }
        if (file != null) {
            return ok(file).as(mimeType);
        }

        return badRequest();
    }

    @Override
    public Result cm0010106GetThumbnail(String uuid) {
        File file = fileService.sv00622GetThumbnail(uuid);

        if (file != null) {
            String mimeType = URLConnection.getFileNameMap().getContentTypeFor(file.getName());
            return ok(file).as(mimeType);
        }

        return badRequest();
    }
}
