package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.CM00101FileCtrlImpl;

import java.io.IOException;

// @RoleNeeded
@ImplementedBy(CM00101FileCtrlImpl.class)
public interface CM00101FileCtrl {
    @Transactional
    Result cm0010101UploadFileAsTempFile() throws IOException;

    @Transactional
    Result cm0010102GetTempFileByFileName(String fileName);

    @Transactional
    Result cm0010103GetFileByFileId(String fileCode);

    @Transactional
    Result cm0010104Download(String fileCode, String fileName);

    @Transactional
    Result cm0010105GetJasperReport(String folderName, String fileName, String exportType);

    @Transactional
    Result cm0010106GetThumbnail(String uuid);
}
