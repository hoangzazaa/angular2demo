package vn.vnext.sefuri.sf.service.impl;

import java.awt.Image;
import java.awt.image.RenderedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.FileNameMap;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.filefilter.IOFileFilter;
import org.apache.commons.io.filefilter.TrueFileFilter;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.Validate;
import org.ghost4j.document.PDFDocument;
import org.joda.time.DateTime;
import org.slf4j.Logger;

import com.google.inject.Inject;

import net.coobird.thumbnailator.Thumbnails;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.Enums.ExportType;
import vn.vnext.sefuri.sf.dao.FileDao;
import vn.vnext.sefuri.sf.dto.FileDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.helper.PDFRenderer;
import vn.vnext.sefuri.sf.helper.SfrException;
import vn.vnext.sefuri.sf.helper.SfrExceptionCode;
import vn.vnext.sefuri.sf.module.export.conf.ReportConf;
import vn.vnext.sefuri.sf.module.s3.S3Api;
import vn.vnext.sefuri.sf.service.SV001AuthService;
import vn.vnext.sefuri.sf.service.SV006FileService;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.LogUtil;
import vn.vnext.sefuri.sf.util.SettingUtil;

/**
 * TODO リファクタリング可能。サムネイル生成処理を一本化すること。
 */
public class SV006FileServiceImpl implements SV006FileService {

    private static final Logger logger = LogUtil.getLogger(SV006FileServiceImpl.class);

    /* settings */
    private static final String SETTING = "directory";
    private static final String SETTING_BASE = "local.base";
    private static final String SETTING_TMP = "local.temp";
    private static final String SETTING_S3_CACHE = "local.s3Cache";

    // Thumbnail
    private static final String SETTING_THUMB = "local.thumb";
    private static final String THUMB_PREFIX = "Thumb_";
    private static final Integer THUMB_QUALITY = 1;
    private static final Integer BASE_SIZE = 300;

    /* web services */
    private static final String WEB_API_FILE = "/CM0010103/";
    private static final String WEB_API_FILE_TMP = "/CM0010102/";
    private static final String WEB_API_FILE_DOWNLOAD = "/CM0010104/";
    private static final String WEB_API_REPORT = "/CM0010105/";
    private static final String WEB_API_THUMB_FILE = "/CM0010106/";
    private static final String WEB_API_REPORT_FRIENDLY = "/CM0010107/";

    @Inject
    private S3Api s3Api;

    @Inject
    private FileDao fileDao;

    @Inject
    private SV001AuthService authService;


    private String getTempFilePath(String fileName) {
        return getLocalTempPath() + fileName;
    }

    private static String getThumbPath(String module) {
        return new StringBuilder()
                .append(SettingUtil.getString(SETTING, SETTING_BASE))
                .append(Constants.SLASH)
                .append(module)
                .append(Constants.SLASH)
                .append(SettingUtil.getString(SETTING, SETTING_THUMB))
                .append(Constants.SLASH)
                .toString();
    }

    private static String getLocalTempPath() {
        return new StringBuilder()
                .append(SettingUtil.getString(SETTING, SETTING_BASE, StringUtils.EMPTY))
                .append(Constants.SLASH)
                .append(SettingUtil.getString(SETTING, SETTING_TMP, StringUtils.EMPTY))
                .append(Constants.SLASH)
                .toString();
    }

    private static String getLocalFilePath(String fileName) {
        return new StringBuilder()
                .append(SettingUtil.getString(SETTING, SETTING_BASE))
                .append(Constants.SLASH)
                .append(fileName)
                .toString();
    }

    private static String getS3CachePath() {
        return new StringBuilder()
                .append(SettingUtil.getString(SETTING, SETTING_BASE))
                .append(Constants.SLASH)
                .append(SettingUtil.getString(SETTING, SETTING_S3_CACHE))
                .append(Constants.SLASH)
                .toString();
    }

    public File sv00622GetThumbnail(String uuid) {
        try {
            FileDto fileDto = fileDao.getFileByFileCode(uuid);

            // file not found
            if (fileDto == null) {
                return null;
            }

            String fileModule = fileDto.getFilePath();
            String fileExt = fileDto.getFileExtension();
            String fullName = uuid + Constants.DOT + fileExt;

            if (!s3Api.isEnabled()) {

                String localPath = getLocalFilePath(fileModule + Constants.SLASH + uuid);
                File localFile = new File(localPath);

                if (!localFile.exists() || !localFile.isFile())
                    return null;

                // Check folder to store thumbnail image
                String thumbPath = getThumbPath(fileModule);
                File thumbDir = new File(thumbPath);
                if (!thumbDir.exists() || !thumbDir.isDirectory()) {
                    FileUtils.forceMkdir(thumbDir);
                }

                String thumbfilePath = "";
                if (isImageFile(fullName, fileExt)) {
                    thumbfilePath = Paths.get(thumbPath, THUMB_PREFIX + fullName).toString();

                }

                if (isPdfFile(fullName, fileExt)) {
                    thumbfilePath = Paths.get(thumbPath, THUMB_PREFIX + uuid + Enums.FileType.PNG.toString()).toString();
                }

                File thumbFile = new File(thumbfilePath);
                if (!thumbFile.exists() || !thumbFile.isFile()) {
                    generateThumbnail(localFile, fileExt, thumbfilePath);
                }

                return thumbFile;
            } else {
                String s3CachePath = getS3CachePath();

                // Get Thumbnail image from local if it exist
                String localThumbDirPath = Paths.get(s3CachePath, SettingUtil.getString(SETTING, SETTING_THUMB)).toString();
                String localThumbnailPath = "";
                if (isImageFile(fullName, null)) {
                    localThumbnailPath = Paths.get(localThumbDirPath, THUMB_PREFIX + fullName).toString();
                } else if (isPdfFile(fullName, null)) {
                    localThumbnailPath = Paths.get(localThumbDirPath, THUMB_PREFIX + uuid + Enums.FileType.PNG.toString()).toString();
                }
                File localThumbnail = new File(localThumbnailPath);

                if (localThumbnail.exists() && localThumbnail.isFile()) {
                    return localThumbnail;
                }

                // If thumbnail is not exist -> try to generate thumb from local original file
                String localFilePath = Paths.get(s3CachePath, uuid).toString();
                File localFile = new File(localFilePath);
                if (!localFile.exists() || !localFile.isFile()) {
                    // if local file is not exist, get it from s3 first
                    StringBuffer s3ThumbPathBuilder = new StringBuffer()
                            .append(fileDto.getFilePath()).append(Constants.SLASH)
                            .append(SettingUtil.getString(SETTING, SETTING_THUMB)).append(Constants.SLASH)
                            .append(THUMB_PREFIX).append(fileDto.getFileCode());
                    File s3ThumbFileTemp = s3Api.getFile(s3ThumbPathBuilder.toString(), fileExt);
                    if (s3ThumbFileTemp != null) {
                        // save temp thumb file to local
                        FileUtils.copyFile(s3ThumbFileTemp, localThumbnail);
                        // delete temp thumb file
                        s3ThumbFileTemp.delete();
                        // return thumb file
                        return localThumbnail;
                    } else {
                        String s3Key = fileDto.getFilePath() + Constants.SLASH + uuid;
                        File s3FileTemp = s3Api.getFile(s3Key, fileExt);
                        if (s3FileTemp == null) {
                            return null;
                        }
                        FileUtils.copyFile(s3FileTemp, localFile);
                        // delete temp thumb file
                        s3FileTemp.delete();
                    }
                }

                // Check folder to store thumbnail image
                File localThumbDir = new File(localThumbDirPath);
                if (!localThumbDir.exists() || !localThumbDir.isDirectory()) {
                    FileUtils.forceMkdir(localThumbDir);
                }

                // generate new thumbnail from local file
                generateThumbnail(localFile, fileExt, localThumbnailPath);

                return localThumbnail;
            }
        } catch (IOException e) {
            logger.error("sv00622GetThumbnail", e);
            throw new SfrException(SfrExceptionCode.ERR_SV006_GET_THUMBNAIL);
        }
    }

    @Override
    public String sv00623GetQuotationThumbUri(String fileName) {
        String latestFolder = getLatestPdf(fileName + Enums.FileType.PNG.toString());
        if (latestFolder != null) {
            return sv00622GetJasperQuotationReportURI(latestFolder, fileName + Enums.FileType.PNG.toString());
        }
        return null;
    }

    private File getPhysicsFile(FileDto fileDto) {
        String ext = fileDto.getFileExtension();
        String key = fileDto.getFilePath() + Constants.SLASH + fileDto.getFileCode();

        if (!s3Api.isEnabled()) {
            String path = getLocalFilePath(key);
            File file = new File(path);
            if (file.exists() && file.isFile()) {
                return file;
            }
        } else {

            Path cachePath = Paths.get(getS3CachePath(), fileDto.getFileCode());
            File cache = cachePath.toFile();
            if (cache.exists() && cache.isFile()) {
                return cache;
            }

            File temp = s3Api.getFile(key, ext);
            try {
                if (temp != null) {
                    FileUtils.moveFile(temp, cache);
                    return cache;
                }
            } catch (IOException e) {
                logger.error("Cache s3 file error", e);
            }
        }

        return null;
    }

    @Override
    public String sv00601SaveTempFile(InputStream inputStream, String fileExtension) {
        Validate.notBlank(fileExtension);

        // create a new file name
        String uuid = UUID.randomUUID().toString();
        String fileName = uuid + Constants.DOT + fileExtension;
        String tmpFilePath = getTempFilePath(fileName);

        // save temp file
        try {
            File file = new File(tmpFilePath);
            FileUtils.copyInputStreamToFile(inputStream, file);
            if (isPdfFile(fileName, fileExtension)) {
                String thumbFilePath = getTempFilePath(THUMB_PREFIX + uuid + Enums.FileType.PNG.toString());
                generatePdfThumbnail(file, thumbFilePath);
            }
        } catch (IOException e) {
            logger.error("Create temp file error", e);
            throw new SfrException(SfrExceptionCode.ERR_SV006_CREATE_TEMP_FILE);
        }

        // use the name of file that saved as a return
        return fileName;
    }

    @Override
    public String sv00602SaveTempFile(File file, String fileExtension) {
        Validate.notBlank(fileExtension);

        // create a new file name
        String uuid = UUID.randomUUID().toString();
        String fileName = uuid + Constants.DOT + fileExtension;
        String tmpFilePath = getTempFilePath(fileName);

        // save temp file
        try {
            FileUtils.copyFile(file, new File(tmpFilePath));
            if (isPdfFile(fileName, fileExtension)) {
                String thumbFilePath = getTempFilePath(THUMB_PREFIX + uuid + Enums.FileType.PNG.toString());
                generatePdfThumbnail(new File(tmpFilePath), thumbFilePath);
            }
        } catch (IOException e) {
            logger.error("Create temp file error", e);
            if ("PdfThumbnailEx".equals(e.getMessage()))
                throw new SfrException(SfrExceptionCode.ERR_SV006_GENERATE_PDF_THUMBNAIL);

            throw new SfrException(SfrExceptionCode.ERR_SV006_CREATE_TEMP_FILE);
        }

        // use the name of file that saved as a return
        return uuid;
    }


    @Override
    public File sv00603GetTempFile(String fileName) {
        String tempFilePath = getTempFilePath(fileName);
        return new File(tempFilePath);
    }

    @Override
    public FileDto sv00604SaveTempFile(String tempFileName, Enums.ModuleType moduleType) {
        // get temp file
        File srcFile = sv00603GetTempFile(tempFileName);
        if (!srcFile.isFile() || !srcFile.exists()) {
            throw new SfrException(SfrExceptionCode.ERR_SV006_FILE_NOT_EXISTS);
        }
        // save file
        return sv00608SaveFile(srcFile, FilenameUtils.getExtension(tempFileName), moduleType);
    }

    @Override
    public File sv00605GetFile(Integer fileId) {
        // find file record
        FileDto fileDto = fileDao.find(fileId);
        if (fileDto == null) {
            // file record not found
            return null;
        }
        // get physics file
        return getPhysicsFile(fileDto);
    }

    @Override
    public File sv00606GetFile(String fileCode) {
        // find file record
        FileDto fileDto = fileDao.getFileByFileCode(fileCode);
        if (fileDto == null) {
            // file record not found
            return null;
        }
        // get physics file
        return getPhysicsFile(fileDto);
    }

    @Override
    public boolean sv00607DeleteFile(Integer fileId) {
        // find file record
        FileDto fileDto = fileDao.find(fileId);
        if (fileDto == null || fileId == null) {
            // file record not found
            return true;
        }
        // get file key
        String fileKey = fileDto.getFilePath() + Constants.SLASH + fileDto.getFileCode();
        // delete database
        fileDao.delete(fileId);

        // 1.0 If s3 is disable -> only delete in local
        String fileName = fileDto.getFileCode() + Constants.DOT + fileDto.getFileExtension();
        if (!s3Api.isEnabled()) {
            // 1.1 Delete original file
            String localFilePath = getLocalFilePath(fileKey);
            File file = new File(localFilePath);
            if (file.isFile() && file.exists()) {
                file.delete();
            }

            // 1.2 Delete thumbnail file if need
            if (isImageFile(fileName, fileDto.getFileExtension())) {
                localFilePath = this.getThumbPath(fileDto.getFilePath()) + THUMB_PREFIX + fileName;
                file = new File(localFilePath);
                if (file.isFile() && file.exists()) {
                    file.delete();
                }
            }
        } else {
            // 1.1 Delete in S3. S3 folder will be deleted by Job
            s3Api.deleteFile(fileKey);

            if (isImageFile(fileName, fileDto.getFileExtension())) {
                StringBuffer keyBuff = new StringBuffer();
                keyBuff.append(fileDto.getFilePath()).append(Constants.SLASH).append(SettingUtil.getString(SETTING, SETTING_THUMB))
                        .append(Constants.SLASH).append(THUMB_PREFIX).append(fileDto.getFileCode());
                s3Api.deleteFile(keyBuff.toString());
            }
        }

        return true;
    }

    @Override
    public FileDto sv00608SaveFile(File file, String fileExtension, Enums.ModuleType moduleType) {
        return sv00608SaveFile(file, fileExtension, moduleType.getName());
    }

    //    @Override
    private FileDto sv00608SaveFile(File file, String fileExtension, String moduleTypeName) {
        String uuid = UUID.randomUUID().toString();
        String fileKey = moduleTypeName + Constants.SLASH + uuid;
        // save tmp file to physics file
        String localFilePath;

        try {
            // if s3 is disable -> store to local folder
            if (!s3Api.isEnabled()) {
                // 1.0 Copy file to local
                localFilePath = getLocalFilePath(fileKey);
                // 1.1 Copy original file
                FileUtils.copyFile(file, new File(localFilePath));

                // Check folder to store thumbnail image
                File thumbPath = new File(getThumbPath(moduleTypeName));
                if (!thumbPath.exists()) {
                    FileUtils.forceMkdir(thumbPath);
                }

                // Create thumbnail image if it is image file
                if (isImageFile(file.getName(), fileExtension)) {
                    String thumbName = getThumbPath(moduleTypeName) + THUMB_PREFIX + uuid + Constants.DOT + fileExtension;

                    generateImageThumbnail(file, thumbName);
                } else if (isPdfFile(file.getName(), fileExtension)) {
                    String previousThumbFileName = THUMB_PREFIX + FilenameUtils.removeExtension(file.getName()) + Enums.FileType.PNG.toString();
                    File previousThumb = Paths.get(file.getParent(), previousThumbFileName).toFile();

                    String thumbName = getThumbPath(moduleTypeName) + THUMB_PREFIX + uuid + Enums.FileType.PNG.toString();

                    if (previousThumb.exists()) {
                        FileUtils.moveFile(previousThumb, new File(thumbName));
                    } else {
                        generatePdfThumbnail(file, thumbName);
                    }

                }

            } else {
                // get s3 cache path
                String s3CachePath = getS3CachePath();

                // create directory if not exists
                File s3CacheDir = new File(s3CachePath);
                if (!s3CacheDir.exists()) {
                    FileUtils.forceMkdir(s3CacheDir);
                }

                // copy file to s3 cache directory
                File s3File = Paths.get(s3CachePath, uuid).toFile();
                FileUtils.copyFile(file, s3File);

                // 2.0 Create thumbnail and store to S3 cache if it is image file

                // generate s3 thumb path
                String s3ThumbDirPath = new StringBuilder().append(getS3CachePath())
                        .append(SettingUtil.getString(SETTING, SETTING_THUMB))
                        .append(Constants.SLASH).toString();

                // create s3 thumb dir if not exists
                File s3ThumbDir = new File(s3ThumbDirPath);
                if (!s3ThumbDir.exists()) {
                    FileUtils.forceMkdir(s3ThumbDir);
                }

                if (isImageFile(file.getName(), fileExtension)) {
                    // generate s3 thumb file path
                    String s3ThumbPath = new StringBuilder().append(s3ThumbDirPath)
                            .append(THUMB_PREFIX).append(uuid).append(Constants.DOT).append(fileExtension)
                            .toString();
                    File s3ThumbFile = generateImageThumbnail(file, s3ThumbPath);

                    // try to store thumb file into s3
                    String previousThumb = new StringBuilder()
                            .append(moduleTypeName).append(Constants.SLASH)
                            .append(SettingUtil.getString(SETTING, SETTING_THUMB)).append(Constants.SLASH)
                            .append(THUMB_PREFIX).append(uuid)
                            .toString();
                    boolean saved = s3Api.saveFile(previousThumb, s3ThumbFile);

                    // log if there was an error
                    if (!saved) {
                        logger.debug("Put image to S3 error: Key =" + previousThumb + "; FileName: " + s3ThumbFile.getName());
                        throw new SfrException(SfrExceptionCode.ERR_SV006_SAVE_FILE);
                    }
                } else if (isPdfFile(file.getName(), fileExtension)) {
                    // generate s3 thumb file path
                    String s3ThumbFilePath = new StringBuilder().append(s3ThumbDirPath)
                            .append(THUMB_PREFIX).append(uuid).append(Enums.FileType.PNG.toString())
                            .toString();
                    File s3ThumbFile = new File(s3ThumbFilePath);

                    // try to store thumb file into s3
                    String previousThumbFileName = THUMB_PREFIX + FilenameUtils.removeExtension(file.getName()) + Enums.FileType.PNG.toString();
                    File previousThumb = Paths.get(file.getParent(), previousThumbFileName).toFile();
                    if (previousThumb.exists()) {
                        FileUtils.moveFile(previousThumb, s3ThumbFile);
                    } else {
                        generatePdfThumbnail(file, s3ThumbFile.getPath());
                    }
                    boolean saved = s3Api.saveFile(previousThumb.getPath(), s3ThumbFile);

                    // log if there was an error
                    if (!saved) {
                        logger.debug("Put image to S3 error: Key =" + previousThumb + "; FileName: " + s3ThumbFilePath);
                        throw new SfrException(SfrExceptionCode.ERR_SV006_SAVE_FILE);
                    }

                }

                // 3.0 Store original file and thumbnail to S3
                boolean saved = s3Api.saveFile(fileKey, file);
                if (!saved) {
                    logger.debug("Put image to S3 error: Key =" + fileKey + "; FileName: " + file.getName());
                    throw new SfrException(SfrExceptionCode.ERR_SV006_SAVE_FILE);
                }
            }
        } catch (IOException e) {
            logger.error("Save file error", e);
            throw new SfrException(SfrExceptionCode.ERR_SV006_SAVE_FILE);
        }

        // save current file into database
        Integer currentUserId = null;
        UserDto currentUser = authService.getCurrentUser();
        if (currentUser != null) {
            currentUserId = currentUser.getId();
        }
        DateTime now = DateTime.now();

        FileDto fileDto = new FileDto();
        fileDto.setFileCode(uuid);
        fileDto.setFilePath(moduleTypeName);
        fileDto.setFileExtension(fileExtension);
        fileDto.setCreatedDate(now);
        fileDto.setCreatedUser(currentUserId);
        fileDto.setUpdatedDate(now);
        fileDto.setUpdatedUser(currentUserId);

        fileDto = fileDao.create(fileDto);
        fileDao.flush();

        return fileDto;
    }

    private File generateThumbnail(File file, String extension, String thumbName) throws IOException {
        if (isPdfFile(file.getName(), extension)) {
            return generatePdfThumbnail(file, thumbName);
        } else if (isImageFile(file.getName(), extension)) {
            return generateImageThumbnail(file, thumbName);
        }

        return null;
    }


    private File generatePdfThumbnail(File input, String outputPath) throws IOException {
        // load PDF document
        PDFDocument document = new PDFDocument();
        File baseFile = input;
        document.load(baseFile);

        // create renderer
        PDFRenderer renderer = new PDFRenderer();

        // set resolution (in DPI)
        renderer.setResolution(80);

        // render
        List<Image> images = null;
        try {
            images = renderer.render(document);
        } catch (Exception e) {
            logger.debug("generatePdfThumbnail: ", e);
            throw new IOException("PdfThumbnailEx");
        }

        if (CollectionUtil.isNotEmpty(images)) {
            for (int i = 0; i < images.size(); i++) {
                ImageIO.write((RenderedImage) images.get(i), "png",
                        new File(outputPath));
            }
        }
        return new File(outputPath);
    }

    private File generateImageThumbnail(File file, String thumbName) throws IOException {
        File thumbFileImage = new File(thumbName);
        Thumbnails.of(file)
                .size(BASE_SIZE, BASE_SIZE)
                .outputQuality(THUMB_QUALITY)
                .toFile(thumbName);
        return thumbFileImage;
    }

    @Override
    public FileDto sv00609GetFileInfo(Integer fileID) {
        return fileDao.find(fileID);
    }

    @Override
    public FileDto sv00610GetFileInfoByFileCode(String fileCode) {
        return fileDao.getFileByFileCode(fileCode);
    }

    @Override
    public FileDto sv00611DuplicateFile(Integer fileID) {
        // Task 2202
        FileDto fileDto = fileDao.find(fileID);
        if (fileDto == null) {
            throw new SfrException(SfrExceptionCode.ERR_SV006_FILE_NOT_EXISTS);
        }
        File originalFile = this.getPhysicsFile(fileDto);
        // copy physicFile but using another name
        if (originalFile != null) {
            return sv00608SaveFile(originalFile, fileDto.getFileExtension(), fileDto.getFilePath());
        }
        return null;
    }

    @Override
    public String sv00612GetTempFileURI(String tempFileName) {
        String webApi = WEB_API_FILE_TMP + tempFileName;
        return webApi;
    }

    @Override
    public String sv00613GetFileURI(Integer fileId) {
        FileDto fileDto = fileDao.find(fileId);
        return sv00614GetFileURI(fileDto);
    }

    @Override
    public String sv00614GetFileURI(FileDto fileDto) {
        if (fileDto == null) { // If file does not exist then set default image
            return null;
        }

        // call service to return real file path
        String fileName = fileDto.getFileCode() + Constants.DOT + fileDto.getFileExtension();
        String webApi = WEB_API_FILE + fileName;
        return webApi;
    }

    @Override
    public String sv00615GetFileURI(String fileCode) {
        FileDto fileDto = fileDao.getFileByFileCode(fileCode);
        return sv00614GetFileURI(fileDto);
    }

    @Override
    public List<FileDto> sv00616GetFileByModuleTypeAndProductId(Integer productId, Enums.ModuleType moduleType) {
        return fileDao.getFileByModudleTypeAndProductId(productId, moduleType);
    }

    @Override
    public String sv00617GetTempPath() {
        String basePath = SettingUtil.getString(SETTING, SETTING_BASE, StringUtils.EMPTY);
        String tmpPath = SettingUtil.getString(SETTING, SETTING_TMP, StringUtils.EMPTY);
        return basePath + Constants.SLASH + tmpPath + Constants.SLASH;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String sv00618GetThumbnail(FileDto fileDto) {
        // 1. If file not exist then set default image
        if (fileDto == null)
            return null;

        // get file extension
        String ext = fileDto.getFileExtension();
        String uuid = fileDto.getFileCode();

        // 2. Only display if file extension is ".png, .jpg, .jpeg"
        if (isImageFile(uuid, ext) || isPdfFile(uuid, ext)) {
            // call service to return real file path
            return WEB_API_THUMB_FILE + uuid;
        }

        // 3. If file extension not in ".png, .jpg, .jpeg" then show default.
        return null;
    }

    @Override
    public String sv00619GetFileURI(final String fileCode, final String fileName) {
        // call service to return real file path
        return WEB_API_FILE_DOWNLOAD + fileCode + Constants.SLASH + fileName;
    }

    @Override
    public File sv00620GetJasperReport(String folderName, String fileName, String exportType) {
        String filePath;
        String temPath = sv00617GetTempPath();
        if (Enums.ExportType.QUOTATION.getType().equals(exportType)) {
            filePath = ReportConf.getJasperQuotationReportPath(temPath) + folderName + Constants.SLASH;
        } else if (Enums.ExportType.PRODUCT_SHAPE.getType().equals(exportType)) {
            filePath = ReportConf.getJasperProductReportPath(temPath) + folderName + Constants.SLASH;
        } else if (Enums.ExportType.PRODUCT_CARTON.getType().equals(exportType)) {
            filePath = ReportConf.getJasperProductCartonReportPath(temPath) + folderName + Constants.SLASH;
        } else if (Enums.ExportType.INVENTORY.getType().equals(exportType)) {
            filePath = ReportConf.getJasperR009ProductInventoryChartPath(temPath) + folderName + Constants.SLASH;
        } else if (Enums.ExportType.SHIPPING_DESTINATION_KARTE.getType().equals(exportType)) {
            filePath = ReportConf.getJasperShippingDestinationKartePath(temPath) + folderName + Constants.SLASH;
        } else {
            return null;
        }

        File directory = new File(filePath);
        for (File file : directory.listFiles()) {
            if (fileName.equals(file.getName())) {
                return file;
            } else {
                String fileType = "png";
                if (fileName.contains("pdf")) {
                    fileType = "pdf";
                }
                if (file.getName().lastIndexOf(fileType) != -1) {
                    return file;
                }
            }
        }
        return null;
    }

    @Override
    public String sv00621GetJasperProductReportURI(String folderName, String fileName, Integer productType) {
        if (productType == 0) {
            return sv00624GetFriendlyJasperReportURI(folderName, fileName, Enums.ExportType.PRODUCT_SHAPE);
        } else if (productType == 1) {
            return sv00624GetFriendlyJasperReportURI(folderName, fileName, Enums.ExportType.PRODUCT_CARTON);
        } else {
            return null;
        }
    }

    @Override
    public String sv00622GetJasperQuotationReportURI(String folderName, String fileName) {
        return sv00624GetJasperReportURI(folderName, fileName, Enums.ExportType.QUOTATION);
    }

    @Override
    public String sv00622GetJasperInventoryReportURI(String folderName, String fileName) {
        return sv00624GetJasperReportURI(folderName, fileName, Enums.ExportType.INVENTORY);
    }


    private String getMinitype(String fileName, String extension) {
        FileNameMap fileNameMap = URLConnection.getFileNameMap();
        String mimeType = fileNameMap.getContentTypeFor(fileName);
        if (mimeType == null) {
            fileName = fileName + Constants.DOT + extension;
            // recheck mimetype of file
            mimeType = fileNameMap.getContentTypeFor(fileName);
        }
        return mimeType;
    }

    private boolean isImageFile(String fileName, String extension) {
        String mimeType = getMinitype(fileName, extension);
        return mimeType != null && mimeType.contains("image");
    }

    private boolean isPdfFile(String fileName, String extension) {
        String mimeType = getMinitype(fileName, extension);
        return mimeType != null && mimeType.contains("pdf");

    }

    private String getLatestPdf(String fileName) {
        String tempPath = getLocalTempPath();
        File fileDir = new File(tempPath);
        if(!fileDir.isDirectory())
        {
            return null;
        }
        IOFileFilter ioFileFilter = new IOFileFilter() {
            @Override
            public boolean accept(File dir, String name) {
                return fileName.equals(name);
            }

            @Override
            public boolean accept(File file) {
                return fileName.equals(file.getName());
            }
        };
        List<File> files = (List<File>) FileUtils.listFiles(fileDir, ioFileFilter, TrueFileFilter.INSTANCE);
        if (CollectionUtil.isNotEmpty(files)) {
            File selectedFile = null;
            for (File file : files) {
                if (selectedFile == null && file.getName().equals(fileName)) {
                    selectedFile = file;
                } else if (selectedFile != null && file.getName().equals(fileName) && file.lastModified() > selectedFile.lastModified()) {
                    selectedFile = file;
                }
            }
            if (selectedFile != null) {
                return selectedFile.getParentFile().getName();
            }
        }
        return null;
    }

    @Override
    public String sv00624GetJasperReportURI(String folderName, String fileName, ExportType exportType) {
        // ファイル名を UTF-8 エンコード    注記: 元仕様を引き継いだが、一律 URL エンコードしても問題ないと思う。
        switch (exportType) {
            case QUOTATION:
            case CUSTOMER_KARTE:
            case SHIPPING_DESTINATION_KARTE:
                try {
                    fileName = URLEncoder.encode(fileName, "UTF-8");
                } catch (UnsupportedEncodingException e) {
                    // 無視 (発生しないため)
                }
            default:
                // Do nothing
        }

        return WEB_API_REPORT + folderName + Constants.SLASH + fileName + Constants.SLASH + exportType.getType();
    }

    @Override
    public String sv00624GetFriendlyJasperReportURI(String folderName, String fileName, ExportType exportType) {
        try {
            fileName = URLEncoder.encode(fileName, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            // 無視 (発生しないため)
        }

        return WEB_API_REPORT_FRIENDLY + folderName + Constants.SLASH + exportType.getType() + Constants.SLASH + fileName;
   }
}
