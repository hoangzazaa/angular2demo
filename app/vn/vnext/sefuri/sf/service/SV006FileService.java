package vn.vnext.sefuri.sf.service;

import java.io.File;
import java.io.InputStream;
import java.util.List;

import com.google.inject.ImplementedBy;

import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.Enums.ExportType;
import vn.vnext.sefuri.sf.dto.FileDto;
import vn.vnext.sefuri.sf.service.impl.SV006FileServiceImpl;

/**
 * Service that works with files that uploaded from user's client.
 * Sefuri use a `TEMP` directory to temporary store files that just uploaded from user's client, and before when
 * they're logged into database as a part of Sefuri system, the file will be moving out of that directory.
 * So we need an implement to control how, when and where the file are moving out to as well as logging to database.
 * In addition, this service help to check the file out from `TEMP` directory as well as location that it moved to.
 */
@ImplementedBy(SV006FileServiceImpl.class)
public interface SV006FileService {

    /**
     * Save given input stream to temporary file and return temp file name
     *
     * @param inputStream   file content
     * @param fileExtension extension of file
     * @return temp file name
     */
    String sv00601SaveTempFile(InputStream inputStream, String fileExtension);

    /**
     * Save given file to temporary file and return temp file name
     *
     * @param file          file content
     * @param fileExtension extension of file
     * @return hashcode that used to naming the file
     */
    String sv00602SaveTempFile(File file, String fileExtension);

    /**
     * get temp file by file name
     *
     * @param fileName
     * @return File object
     */
    File sv00603GetTempFile(String fileName);

    /**
     * Save temporary file to data file
     *
     * @param tempFileName temporary file name
     * @return fileDto
     */
    FileDto sv00604SaveTempFile(String tempFileName, Enums.ModuleType moduleType);

    /**
     * get physics file of given file Id
     *
     * @param fileId
     * @return io.File object
     */
    File sv00605GetFile(Integer fileId);

    /**
     * get physics file of given file code
     *
     * @param fileCode
     * @return io.File object
     */
    File sv00606GetFile(String fileCode);

    /**
     * Delete file by fileId
     *
     * @param fileId
     * @return `true` if and only if the file is successfully deleted; `false` otherwise
     */
    boolean sv00607DeleteFile(Integer fileId);

    /**
     * Save file to data file
     *
     * @param file          input file
     * @param fileExtension file extension
     * @param moduleType    filetype
     * @return fileDto
     */
    FileDto sv00608SaveFile(File file, String fileExtension, Enums.ModuleType moduleType);

    /**
     * get file info by file Id
     *
     * @param fileID
     * @return
     */
    FileDto sv00609GetFileInfo(Integer fileID);

    /**
     * get file info by file code
     *
     * @param fileCode
     * @return
     */
    FileDto sv00610GetFileInfoByFileCode(String fileCode);

    /**
     * duplicate file of given fileId
     *
     * @param fileID
     * @return
     */
    FileDto sv00611DuplicateFile(Integer fileID);

    /**
     * Get file uri of temp file by file name.
     *
     * @param tempFileName
     * @return file uri
     */
    String sv00612GetTempFileURI(String tempFileName);

    /**
     * Get file uri by fileId.
     *
     * @param fileId
     * @return file uri
     */
    String sv00613GetFileURI(Integer fileId);

    /**
     * Get file uri by fileDto.
     *
     * @param fileDto
     * @return file uri
     */
    String sv00614GetFileURI(FileDto fileDto);

    String sv00615GetFileURI(String fileCode);

    List<FileDto> sv00616GetFileByModuleTypeAndProductId(Integer productId, Enums.ModuleType moduleType);

    String sv00617GetTempPath();

    /**
     * Get thumbnail's uri of file that follow given fileDto
     *
     * @param fileDto the current file dto
     * @return thumbnail's uri of file that follow given fileDto
     * image
     */
    String sv00618GetThumbnail(FileDto fileDto);

    String sv00619GetFileURI(String fileCode, String fileName);

    File sv00620GetJasperReport(String folderName, String fileName, String exportType);

    /** @deprecated Use {@link vn.vnext.sefuri.sf.service.SV006FileService.sv00624GetJasperReportURI(String, String, ExportType)} */
    String sv00621GetJasperProductReportURI(String folderName, String fileName, Integer productType);

    /** @deprecated Use {@link vn.vnext.sefuri.sf.service.SV006FileService.sv00624GetJasperReportURI(String, String, ExportType)} */
    String sv00622GetJasperQuotationReportURI(String folderName, String fileName);

    /** @deprecated Use {@link vn.vnext.sefuri.sf.service.SV006FileService.sv00624GetJasperReportURI(String, String, ExportType)} */
    String sv00622GetJasperInventoryReportURI(String folderName, String fileName);

    File sv00622GetThumbnail(String uuid);

    String sv00623GetQuotationThumbUri(String fileName);

    /**
     * PDF 取得 URI (当システムのパス) を取得する
     *
     * @param folderName フォルダー名
     * @param fileName ファイル名
     * @param exportType 出力タイプ
     * @return PDF 取得 URI
     */
    String sv00624GetJasperReportURI(String folderName, String fileName, ExportType exportType);

    /**
     * PDF 取得 URI (当システムのパス) を取得する (ファイル名が URL の最後尾につく版)
     *
     * @param folderName フォルダー名
     * @param fileName ファイル名
     * @param exportType 出力タイプ
     * @return PDF 取得 URI
     */
    String sv00624GetFriendlyJasperReportURI(String folderName, String fileName, ExportType exportType);

}
